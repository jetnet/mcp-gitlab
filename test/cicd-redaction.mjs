// Tests for masked CI/CD variable value redaction.
// Prerequisite: npm run build (imports the compiled output in build/).
// Run: npm test
import { CiCdManager } from '../build/ci-cd.js';
import { redactMaskedVariableValues } from '../build/utils/secret-redaction.js';

const RED = '[REDACTED]';
let pass = 0, fail = 0;
const t = (name, cond) => { cond ? pass++ : (fail++, console.log('FAIL: ' + name)); };

// --- Utility: redactMaskedVariableValues ---

// masked=true -> value redacted, all other fields intact (live-verified response shape)
const r1 = redactMaskedVariableValues({ key: 'KV_SECRET_X', value: 's3cr3t', masked: true, hidden: false, protected: false, raw: false, variable_type: 'env_var', environment_scope: '*', description: 'd' });
t('masked=true redacted', r1.value === RED);
t('masked=true key intact', r1.key === 'KV_SECRET_X');
t('masked=true other fields intact', r1.environment_scope === '*' && r1.hidden === false && r1.description === 'd');

// masked=false -> passthrough (policy: config values stay readable)
const r2 = redactMaskedVariableValues({ key: 'MAX_INSTANCES', value: '4', masked: false, hidden: false, variable_type: 'env_var', environment_scope: '*' });
t('masked=false passthrough', r2.value === '4');

// no masked flag -> passthrough
const r3 = redactMaskedVariableValues({ key: 'A', value: 'plain' });
t('no masked flag passthrough', r3.value === 'plain');

// string or number masked must NOT trigger redaction (strict flag check)
const r4 = redactMaskedVariableValues({ key: 'S', value: 'v', masked: 'true' });
t("masked:'true' string not redacted", r4.value === 'v');
const r4b = redactMaskedVariableValues({ key: 'S', value: 'v', masked: 1 });
t('masked:1 not redacted', r4b.value === 'v');

// hidden=true with value null -> stays null, no crash
const r5 = redactMaskedVariableValues({ key: 'H', value: null, masked: true, hidden: true });
t('hidden null untouched', r5.value === null);

// unmasked with null value -> untouched
const r6 = redactMaskedVariableValues({ key: 'N', value: null, masked: false });
t('unmasked null untouched', r6.value === null);

// file-type and raw-type masked vars also redacted
const r7 = redactMaskedVariableValues({ key: 'F', value: 'filecontent', masked: true, variable_type: 'file', environment_scope: '*' });
t('file-type masked redacted', r7.value === RED);
const r7b = redactMaskedVariableValues({ key: 'R', value: 'rawcontent', masked: true, raw: true });
t('raw-type masked redacted', r7b.value === RED);

// arrays of variables
const r8 = redactMaskedVariableValues([
  { key: 'S1', value: 'v1', masked: true, hidden: false },
  { key: 'C1', value: 'v2', masked: false, hidden: false },
]);
t('array: masked redacted', r8[0].value === RED);
t('array: unmasked intact', r8[1].value === 'v2');

// nested objects: wrapper fields intact, nested variable objects processed
const r9 = redactMaskedVariableValues({ id: 7, description: 'x', nested: [{ key: 'S', value: 'x', masked: true }] });
t('nested: wrapper intact', r9.id === 7 && r9.description === 'x');
t('nested: masked redacted', r9.nested[0].value === RED);
t('deep nested redacted', redactMaskedVariableValues({ a: { b: { masked: true, value: 'deep' } } }).a.b.value === RED);

// primitives pass through
t('null passthrough', redactMaskedVariableValues(null) === null);
t('string passthrough', redactMaskedVariableValues('abc') === 'abc');
t('number passthrough', redactMaskedVariableValues(42) === 42);

// input object is not mutated
const orig = { key: 'S', value: 'secret', masked: true, hidden: false, nested: { masked: true, value: 'x' } };
const copy = redactMaskedVariableValues(orig);
t('input not mutated', orig.value === 'secret' && orig.nested.value === 'x');
t('output is a new object', copy !== orig && copy.nested !== orig.nested);

// --- Manager call sites: redaction applied to every variable-returning method ---

// Page-aware stub: pagination loops must terminate (list methods loop until an empty page).
const makeStub = (data) => ({
  get: async (_url, config) => {
    const page = config && config.params ? config.params.page : undefined;
    return { data: page === undefined || page <= 1 ? data : [] };
  },
  post: async () => ({ data }),
  put: async () => ({ data }),
});

const maskedVar = { key: 'S', value: 'v', masked: true, hidden: false };
const unmaskedVar = { key: 'C', value: 'cfg', masked: false, hidden: false };

const m1 = new CiCdManager(makeStub([maskedVar, unmaskedVar]));
const q1 = await m1.listCiCdVariables(1);
t('manager list project: masked redacted', q1[0].value === RED);
t('manager list project: unmasked intact', q1[1].value === 'cfg');

const q2 = await new CiCdManager(makeStub(maskedVar)).getCiCdVariable(1, 'S');
t('manager get project: redacted', q2.value === RED);

const q3 = await new CiCdManager(makeStub({ key: 'NEW', value: 's', masked: true })).createCiCdVariable(1, { key: 'NEW', value: 's', masked: true });
t('manager create project echo: redacted', q3.value === RED);

const q4 = await new CiCdManager(makeStub({ key: 'S', value: 'v2', masked: true })).updateCiCdVariable(1, 'S', { value: 'v2', masked: true });
t('manager update project echo: redacted', q4.value === RED);

const q5 = await new CiCdManager(makeStub([maskedVar])).listGroupCiCdVariables(161);
t('manager list group: redacted', q5[0].value === RED);

const q6 = await new CiCdManager(makeStub(maskedVar)).getGroupCiCdVariable(161, 'S');
t('manager get group: redacted', q6.value === RED);

const q7 = await new CiCdManager(makeStub({ key: 'GN', value: 's', masked: true })).createGroupCiCdVariable(161, { key: 'GN', value: 's', masked: true });
t('manager create group echo: redacted', q7.value === RED);

const q8 = await new CiCdManager(makeStub({ key: 'S', value: 'v3', masked: true })).updateGroupCiCdVariable(161, 'S', { value: 'v3', masked: true });
t('manager update group echo: redacted', q8.value === RED);

// unmasked values pass through the manager path unchanged
const q9 = await new CiCdManager(makeStub(unmaskedVar)).getCiCdVariable(1, 'MAX_INSTANCES');
t('manager unmasked config value intact', q9.value === 'cfg');

// hidden=true (value null) passes through without crash
const q10 = await new CiCdManager(makeStub({ key: 'H', value: null, masked: true, hidden: true })).getCiCdVariable(1, 'H');
t('manager hidden null untouched', q10.value === null);

console.log(`PASS: ${pass} | FAIL: ${fail}`);
process.exit(fail ? 1 : 0);
