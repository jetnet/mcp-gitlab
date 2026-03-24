/**
 * Environments and Deployments tool handlers
 */

import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { ToolHandler } from "../utils/handler-types.js";
import { formatResponse } from "../utils/response-formatter.js";

/**
 * List environments handler
 */
export const listEnvironments: ToolHandler = async (params, context) => {
  const { project_id, name, search, states, per_page, page } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/environments`,
    { params: { name, search, states, per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};

/**
 * Get environment details handler
 */
export const getEnvironment: ToolHandler = async (params, context) => {
  const { project_id, environment_id } = params.arguments || {};
  if (!project_id || !environment_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and environment_id are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/environments/${environment_id}`
  );
  return formatResponse(response.data);
};

/**
 * List deployments handler
 */
export const listDeployments: ToolHandler = async (params, context) => {
  const { project_id, environment, status, order_by, sort, per_page, page } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/deployments`,
    { params: { environment, status, order_by, sort, per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};

/**
 * Get deployment details handler
 */
export const getDeployment: ToolHandler = async (params, context) => {
  const { project_id, deployment_id } = params.arguments || {};
  if (!project_id || !deployment_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and deployment_id are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/deployments/${deployment_id}`
  );
  return formatResponse(response.data);
};
