/**
 * Secret redaction for CI/CD variable payloads
 *
 * GitLab returns the cleartext value of every CI/CD variable through the REST API.
 * The masked flag only affects job log output: unless a variable was created with
 * the "masked and hidden" option (hidden: true, which makes the API return
 * value: null), the full value is present in every variable response.
 *
 * Per project policy, a variable flagged masked: true must never have its value
 * forwarded into the model context: the value is replaced with a redaction
 * placeholder while all other fields (key, environment_scope, description,
 * flags) stay intact, so administrative workflows (list, inspect, delete,
 * recreate) keep working without the secret.
 */

const REDACTED_VALUE = "[REDACTED]";

/**
 * Recursively replace non-null values of masked CI/CD variable objects
 * with a redaction placeholder.
 *
 * A variable object is recognized by a strict masked === true flag together
 * with a value field. Objects without that shape pass through unchanged,
 * so configuration variables keep their readable values.
 *
 * @param data Parsed API response (variable object, array of them, or nested wrapper)
 * @returns Data with masked values redacted
 */
export function redactMaskedVariableValues<T>(data: T): T {
  if (Array.isArray(data)) {
    return data.map((item) => redactMaskedVariableValues(item)) as unknown as T;
  }
  if (data === null || typeof data !== "object") {
    return data;
  }
  const obj = { ...(data as Record<string, unknown>) };
  for (const [key, value] of Object.entries(obj)) {
    obj[key] = redactMaskedVariableValues(value);
  }
  if (obj.masked === true && "value" in obj && obj.value !== null && obj.value !== undefined) {
    obj.value = REDACTED_VALUE;
  }
  return obj as T;
}
