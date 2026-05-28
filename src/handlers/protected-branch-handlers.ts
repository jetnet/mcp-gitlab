/**
 * Protected branch management tool handlers
 */

import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { ToolHandler } from "../utils/handler-types.js";
import { formatResponse } from "../utils/response-formatter.js";

/**
 * List protected branches handler
 */
export const listProtectedBranches: ToolHandler = async (params, context) => {
  const { project_id, search, per_page, page } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/protected_branches`,
    { params: { search, per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};

/**
 * Get a single protected branch handler
 */
export const getProtectedBranch: ToolHandler = async (params, context) => {
  const { project_id, name } = params.arguments || {};
  if (!project_id || !name) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and name are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/protected_branches/${encodeURIComponent(String(name))}`
  );
  return formatResponse(response.data);
};

/**
 * Protect a branch handler
 */
export const protectBranch: ToolHandler = async (params, context) => {
  const { project_id, name, push_access_level, merge_access_level, unprotect_access_level, allow_force_push, code_owner_approval_required } = params.arguments || {};
  if (!project_id || !name) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and name are required');
  }

  const body: any = { name };
  if (push_access_level !== undefined) body.push_access_level = push_access_level;
  if (merge_access_level !== undefined) body.merge_access_level = merge_access_level;
  if (unprotect_access_level !== undefined) body.unprotect_access_level = unprotect_access_level;
  if (allow_force_push !== undefined) body.allow_force_push = allow_force_push;
  if (code_owner_approval_required !== undefined) body.code_owner_approval_required = code_owner_approval_required;

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/protected_branches`,
    body
  );
  return formatResponse(response.data);
};

/**
 * Unprotect a branch handler
 */
export const unprotectBranch: ToolHandler = async (params, context) => {
  const { project_id, name } = params.arguments || {};
  if (!project_id || !name) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and name are required');
  }

  await context.axiosInstance.delete(
    `/projects/${encodeURIComponent(String(project_id))}/protected_branches/${encodeURIComponent(String(name))}`
  );
  return formatResponse({ status: 'unprotected' });
};
