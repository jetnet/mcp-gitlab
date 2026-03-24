/**
 * Pipeline and Job related tool handlers
 */

import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { ToolHandler } from "../utils/handler-types.js";
import { formatResponse } from "../utils/response-formatter.js";

/**
 * List pipelines handler
 */
export const listPipelines: ToolHandler = async (params, context) => {
  const { project_id, status, ref, source, per_page, page } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/pipelines`,
    { params: { status, ref, source, per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};

/**
 * Get pipeline details handler
 */
export const getPipeline: ToolHandler = async (params, context) => {
  const { project_id, pipeline_id } = params.arguments || {};
  if (!project_id || !pipeline_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and pipeline_id are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/pipelines/${pipeline_id}`
  );
  return formatResponse(response.data);
};

/**
 * Create pipeline handler
 */
export const createPipeline: ToolHandler = async (params, context) => {
  const { project_id, ref, variables } = params.arguments || {};
  if (!project_id || !ref) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and ref are required');
  }

  const body: any = { ref };
  if (variables) {
    body.variables = variables;
  }

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/pipeline`,
    body
  );
  return formatResponse(response.data);
};

/**
 * Cancel pipeline handler
 */
export const cancelPipeline: ToolHandler = async (params, context) => {
  const { project_id, pipeline_id } = params.arguments || {};
  if (!project_id || !pipeline_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and pipeline_id are required');
  }

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/pipelines/${pipeline_id}/cancel`
  );
  return formatResponse(response.data);
};

/**
 * Retry pipeline handler
 */
export const retryPipeline: ToolHandler = async (params, context) => {
  const { project_id, pipeline_id } = params.arguments || {};
  if (!project_id || !pipeline_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and pipeline_id are required');
  }

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/pipelines/${pipeline_id}/retry`
  );
  return formatResponse(response.data);
};

/**
 * Delete pipeline handler
 */
export const deletePipeline: ToolHandler = async (params, context) => {
  const { project_id, pipeline_id } = params.arguments || {};
  if (!project_id || !pipeline_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and pipeline_id are required');
  }

  const response = await context.axiosInstance.delete(
    `/projects/${encodeURIComponent(String(project_id))}/pipelines/${pipeline_id}`
  );
  return formatResponse(response.data || { status: 'deleted' });
};

/**
 * List pipeline jobs handler
 */
export const listPipelineJobs: ToolHandler = async (params, context) => {
  const { project_id, pipeline_id, scope, per_page, page } = params.arguments || {};
  if (!project_id || !pipeline_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and pipeline_id are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/pipelines/${pipeline_id}/jobs`,
    { params: { scope, per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};

/**
 * Get job details handler
 */
export const getJob: ToolHandler = async (params, context) => {
  const { project_id, job_id } = params.arguments || {};
  if (!project_id || !job_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and job_id are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/jobs/${job_id}`
  );
  return formatResponse(response.data);
};

/**
 * Get job log/trace handler
 */
export const getJobLog: ToolHandler = async (params, context) => {
  const { project_id, job_id } = params.arguments || {};
  if (!project_id || !job_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and job_id are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/jobs/${job_id}/trace`,
    { headers: { 'Accept': 'text/plain' } }
  );
  return {
    content: [{
      type: 'text',
      text: typeof response.data === 'string' ? response.data : JSON.stringify(response.data, null, 2)
    }]
  };
};

/**
 * Cancel job handler
 */
export const cancelJob: ToolHandler = async (params, context) => {
  const { project_id, job_id } = params.arguments || {};
  if (!project_id || !job_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and job_id are required');
  }

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/jobs/${job_id}/cancel`
  );
  return formatResponse(response.data);
};

/**
 * Retry job handler
 */
export const retryJob: ToolHandler = async (params, context) => {
  const { project_id, job_id } = params.arguments || {};
  if (!project_id || !job_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and job_id are required');
  }

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/jobs/${job_id}/retry`
  );
  return formatResponse(response.data);
};

/**
 * List pipeline bridges (downstream pipeline triggers) handler
 */
export const listPipelineBridges: ToolHandler = async (params, context) => {
  const { project_id, pipeline_id, scope, per_page, page } = params.arguments || {};
  if (!project_id || !pipeline_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and pipeline_id are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/pipelines/${pipeline_id}/bridges`,
    { params: { scope, per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};
