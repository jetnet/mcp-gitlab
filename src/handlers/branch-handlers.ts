/**
 * Branch management tool handlers - create/delete branches
 */

import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { ToolHandler } from "../utils/handler-types.js";
import { formatResponse } from "../utils/response-formatter.js";

/**
 * Create branch handler
 */
export const createBranch: ToolHandler = async (params, context) => {
  const { project_id, branch, ref } = params.arguments || {};
  if (!project_id || !branch || !ref) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id, branch, and ref are required');
  }

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/repository/branches`,
    { branch, ref }
  );
  return formatResponse(response.data);
};

/**
 * Delete branch handler
 */
export const deleteBranch: ToolHandler = async (params, context) => {
  const { project_id, branch } = params.arguments || {};
  if (!project_id || !branch) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and branch are required');
  }

  await context.axiosInstance.delete(
    `/projects/${encodeURIComponent(String(project_id))}/repository/branches/${encodeURIComponent(String(branch))}`
  );
  return formatResponse({ status: 'deleted' });
};
