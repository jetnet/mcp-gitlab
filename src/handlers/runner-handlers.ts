/**
 * Runner management tool handlers
 */

import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { ToolHandler } from "../utils/handler-types.js";
import { formatResponse } from "../utils/response-formatter.js";

/**
 * List all runners available to the user handler
 */
export const listRunners: ToolHandler = async (params, context) => {
  const { type, status, paused, tag_list, per_page, page } = params.arguments || {};

  const response = await context.axiosInstance.get(
    '/runners',
    { params: { type, status, paused, tag_list, per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};

/**
 * Get runner details handler
 */
export const getRunner: ToolHandler = async (params, context) => {
  const { runner_id } = params.arguments || {};
  if (!runner_id) {
    throw new McpError(ErrorCode.InvalidParams, 'runner_id is required');
  }

  const response = await context.axiosInstance.get(`/runners/${runner_id}`);
  return formatResponse(response.data);
};

/**
 * List project runners handler
 */
export const listProjectRunners: ToolHandler = async (params, context) => {
  const { project_id, type, status, paused, tag_list, per_page, page } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/runners`,
    { params: { type, status, paused, tag_list, per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};
