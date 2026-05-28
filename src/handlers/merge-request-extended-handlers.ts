/**
 * Extended merge request tool handlers - approve, unapprove, rebase
 */

import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { ToolHandler } from "../utils/handler-types.js";
import { formatResponse } from "../utils/response-formatter.js";

/**
 * Approve a merge request handler
 */
export const approveMergeRequest: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, sha } = params.arguments || {};
  if (!project_id || !merge_request_iid) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and merge_request_iid are required');
  }

  const body: any = {};
  if (sha !== undefined) body.sha = sha;

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/merge_requests/${merge_request_iid}/approve`,
    body
  );
  return formatResponse(response.data);
};

/**
 * Unapprove a merge request handler
 */
export const unapproveMergeRequest: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid } = params.arguments || {};
  if (!project_id || !merge_request_iid) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and merge_request_iid are required');
  }

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/merge_requests/${merge_request_iid}/unapprove`
  );
  return formatResponse(response.data);
};

/**
 * Rebase a merge request handler
 */
export const rebaseMergeRequest: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, skip_ci } = params.arguments || {};
  if (!project_id || !merge_request_iid) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and merge_request_iid are required');
  }

  const body: any = {};
  if (skip_ci !== undefined) body.skip_ci = skip_ci;

  const response = await context.axiosInstance.put(
    `/projects/${encodeURIComponent(String(project_id))}/merge_requests/${merge_request_iid}/rebase`,
    body
  );
  return formatResponse(response.data);
};
