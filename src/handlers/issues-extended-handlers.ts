/**
 * Extended issue handlers - issue CRUD, notes, labels, milestones, snippets
 */

import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { ToolHandler } from "../utils/handler-types.js";
import { formatResponse } from "../utils/response-formatter.js";

/**
 * Get issue details handler
 */
export const getIssue: ToolHandler = async (params, context) => {
  const { project_id, issue_iid } = params.arguments || {};
  if (!project_id || !issue_iid) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and issue_iid are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/issues/${issue_iid}`
  );
  return formatResponse(response.data);
};

/**
 * Create issue handler
 */
export const createIssue: ToolHandler = async (params, context) => {
  const { project_id, title, description, assignee_ids, labels, milestone_id, confidential } = params.arguments || {};
  if (!project_id || !title) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and title are required');
  }

  const body: any = { title };
  if (description !== undefined) body.description = description;
  if (assignee_ids !== undefined) body.assignee_ids = assignee_ids;
  if (labels !== undefined) body.labels = labels;
  if (milestone_id !== undefined) body.milestone_id = milestone_id;
  if (confidential !== undefined) body.confidential = confidential;

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/issues`,
    body
  );
  return formatResponse(response.data);
};

/**
 * Update issue handler
 */
export const updateIssue: ToolHandler = async (params, context) => {
  const { project_id, issue_iid, title, description, assignee_ids, labels, milestone_id, state_event, confidential } = params.arguments || {};
  if (!project_id || !issue_iid) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and issue_iid are required');
  }

  const body: any = {};
  if (title !== undefined) body.title = title;
  if (description !== undefined) body.description = description;
  if (assignee_ids !== undefined) body.assignee_ids = assignee_ids;
  if (labels !== undefined) body.labels = labels;
  if (milestone_id !== undefined) body.milestone_id = milestone_id;
  if (state_event !== undefined) body.state_event = state_event;
  if (confidential !== undefined) body.confidential = confidential;

  const response = await context.axiosInstance.put(
    `/projects/${encodeURIComponent(String(project_id))}/issues/${issue_iid}`,
    body
  );
  return formatResponse(response.data);
};

/**
 * Delete issue handler
 */
export const deleteIssue: ToolHandler = async (params, context) => {
  const { project_id, issue_iid } = params.arguments || {};
  if (!project_id || !issue_iid) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and issue_iid are required');
  }

  const response = await context.axiosInstance.delete(
    `/projects/${encodeURIComponent(String(project_id))}/issues/${issue_iid}`
  );
  return formatResponse(response.data || { status: 'deleted' });
};

/**
 * List issue notes handler
 */
export const listIssueNotes: ToolHandler = async (params, context) => {
  const { project_id, issue_iid, per_page, page } = params.arguments || {};
  if (!project_id || !issue_iid) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and issue_iid are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/issues/${issue_iid}/notes`,
    { params: { per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};

/**
 * Create issue note handler
 */
export const createIssueNote: ToolHandler = async (params, context) => {
  const { project_id, issue_iid, body: noteBody, internal } = params.arguments || {};
  if (!project_id || !issue_iid || !noteBody) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id, issue_iid, and body are required');
  }

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/issues/${issue_iid}/notes`,
    { body: noteBody, internal: internal === true }
  );
  return formatResponse(response.data);
};

/**
 * List labels handler
 */
export const listLabels: ToolHandler = async (params, context) => {
  const { project_id, search, per_page, page } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/labels`,
    { params: { search, per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};

/**
 * List milestones handler
 */
export const listMilestones: ToolHandler = async (params, context) => {
  const { project_id, state, search, per_page, page } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/milestones`,
    { params: { state, search, per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};

/**
 * List snippets handler
 */
export const listSnippets: ToolHandler = async (params, context) => {
  const { project_id, per_page, page } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/snippets`,
    { params: { per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};

/**
 * Get snippet details handler
 */
export const getSnippet: ToolHandler = async (params, context) => {
  const { project_id, snippet_id } = params.arguments || {};
  if (!project_id || !snippet_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and snippet_id are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/snippets/${snippet_id}`
  );
  return formatResponse(response.data);
};
