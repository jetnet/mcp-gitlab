/**
 * Pipeline schedule management tool handlers
 */

import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { ToolHandler } from "../utils/handler-types.js";
import { formatResponse } from "../utils/response-formatter.js";

/**
 * List pipeline schedules handler
 */
export const listPipelineSchedules: ToolHandler = async (params, context) => {
  const { project_id, scope, per_page, page } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/pipeline_schedules`,
    { params: { scope, per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};

/**
 * Get a single pipeline schedule handler
 */
export const getPipelineSchedule: ToolHandler = async (params, context) => {
  const { project_id, pipeline_schedule_id } = params.arguments || {};
  if (!project_id || !pipeline_schedule_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and pipeline_schedule_id are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/pipeline_schedules/${pipeline_schedule_id}`
  );
  return formatResponse(response.data);
};

/**
 * Create pipeline schedule handler
 */
export const createPipelineSchedule: ToolHandler = async (params, context) => {
  const { project_id, description, ref, cron, cron_timezone, active } = params.arguments || {};
  if (!project_id || !description || !ref || !cron) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id, description, ref, and cron are required');
  }

  const body: any = { description, ref, cron };
  if (cron_timezone !== undefined) body.cron_timezone = cron_timezone;
  if (active !== undefined) body.active = active;

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/pipeline_schedules`,
    body
  );
  return formatResponse(response.data);
};

/**
 * Update pipeline schedule handler
 */
export const updatePipelineSchedule: ToolHandler = async (params, context) => {
  const { project_id, pipeline_schedule_id, description, ref, cron, cron_timezone, active } = params.arguments || {};
  if (!project_id || !pipeline_schedule_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and pipeline_schedule_id are required');
  }

  const body: any = {};
  if (description !== undefined) body.description = description;
  if (ref !== undefined) body.ref = ref;
  if (cron !== undefined) body.cron = cron;
  if (cron_timezone !== undefined) body.cron_timezone = cron_timezone;
  if (active !== undefined) body.active = active;

  const response = await context.axiosInstance.put(
    `/projects/${encodeURIComponent(String(project_id))}/pipeline_schedules/${pipeline_schedule_id}`,
    body
  );
  return formatResponse(response.data);
};

/**
 * Delete pipeline schedule handler
 */
export const deletePipelineSchedule: ToolHandler = async (params, context) => {
  const { project_id, pipeline_schedule_id } = params.arguments || {};
  if (!project_id || !pipeline_schedule_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and pipeline_schedule_id are required');
  }

  const response = await context.axiosInstance.delete(
    `/projects/${encodeURIComponent(String(project_id))}/pipeline_schedules/${pipeline_schedule_id}`
  );
  return formatResponse(response.data || { status: 'deleted' });
};

/**
 * Run pipeline schedule immediately handler
 */
export const runPipelineSchedule: ToolHandler = async (params, context) => {
  const { project_id, pipeline_schedule_id } = params.arguments || {};
  if (!project_id || !pipeline_schedule_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and pipeline_schedule_id are required');
  }

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/pipeline_schedules/${pipeline_schedule_id}/play`
  );
  return formatResponse(response.data);
};
