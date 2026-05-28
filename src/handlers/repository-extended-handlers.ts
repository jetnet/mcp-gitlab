/**
 * Extended repository tool handlers - commits, tags, releases, tree, MR commits
 */

import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { ToolHandler } from "../utils/handler-types.js";
import { formatResponse } from "../utils/response-formatter.js";

/**
 * List commits handler
 */
export const listCommits: ToolHandler = async (params, context) => {
  const { project_id, ref_name, since, until, path, per_page, page } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/repository/commits`,
    { params: { ref_name, since, until, path, per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};

/**
 * Get commit details handler
 */
export const getCommit: ToolHandler = async (params, context) => {
  const { project_id, sha } = params.arguments || {};
  if (!project_id || !sha) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and sha are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/repository/commits/${encodeURIComponent(String(sha))}`
  );
  return formatResponse(response.data);
};

/**
 * List tags handler
 */
export const listTags: ToolHandler = async (params, context) => {
  const { project_id, search, order_by, sort, per_page, page } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/repository/tags`,
    { params: { search, order_by, sort, per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};

/**
 * Get tag details handler
 */
export const getTag: ToolHandler = async (params, context) => {
  const { project_id, tag_name } = params.arguments || {};
  if (!project_id || !tag_name) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and tag_name are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/repository/tags/${encodeURIComponent(String(tag_name))}`
  );
  return formatResponse(response.data);
};

/**
 * Create tag handler
 */
export const createTag: ToolHandler = async (params, context) => {
  const { project_id, tag_name, ref, message } = params.arguments || {};
  if (!project_id || !tag_name || !ref) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id, tag_name, and ref are required');
  }

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/repository/tags`,
    { tag_name, ref, message }
  );
  return formatResponse(response.data);
};

/**
 * Delete tag handler
 */
export const deleteTag: ToolHandler = async (params, context) => {
  const { project_id, tag_name } = params.arguments || {};
  if (!project_id || !tag_name) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and tag_name are required');
  }

  const response = await context.axiosInstance.delete(
    `/projects/${encodeURIComponent(String(project_id))}/repository/tags/${encodeURIComponent(String(tag_name))}`
  );
  return formatResponse(response.data || { status: 'deleted' });
};

/**
 * List releases handler
 */
export const listReleases: ToolHandler = async (params, context) => {
  const { project_id, per_page, page } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/releases`,
    { params: { per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};

/**
 * Get release details handler
 */
export const getRelease: ToolHandler = async (params, context) => {
  const { project_id, tag_name } = params.arguments || {};
  if (!project_id || !tag_name) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and tag_name are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/releases/${encodeURIComponent(String(tag_name))}`
  );
  return formatResponse(response.data);
};

/**
 * List repository tree handler
 */
export const listRepositoryTree: ToolHandler = async (params, context) => {
  const { project_id, path, ref, recursive, per_page, page } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/repository/tree`,
    { params: { path, ref, recursive, per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};

/**
 * List merge request commits handler
 */
export const listMergeRequestCommits: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid } = params.arguments || {};
  if (!project_id || !merge_request_iid) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and merge_request_iid are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/merge_requests/${merge_request_iid}/commits`
  );
  return formatResponse(response.data);
};

/**
 * Create release handler
 */
export const createRelease: ToolHandler = async (params, context) => {
  const { project_id, tag_name, name, description, ref, milestones, released_at } = params.arguments || {};
  if (!project_id || !tag_name) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and tag_name are required');
  }

  const body: any = { tag_name };
  if (name !== undefined) body.name = name;
  if (description !== undefined) body.description = description;
  if (ref !== undefined) body.ref = ref;
  if (milestones !== undefined) body.milestones = milestones;
  if (released_at !== undefined) body.released_at = released_at;

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/releases`,
    body
  );
  return formatResponse(response.data);
};

/**
 * Update release handler
 */
export const updateRelease: ToolHandler = async (params, context) => {
  const { project_id, tag_name, name, description, milestones, released_at } = params.arguments || {};
  if (!project_id || !tag_name) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and tag_name are required');
  }

  const body: any = {};
  if (name !== undefined) body.name = name;
  if (description !== undefined) body.description = description;
  if (milestones !== undefined) body.milestones = milestones;
  if (released_at !== undefined) body.released_at = released_at;

  const response = await context.axiosInstance.put(
    `/projects/${encodeURIComponent(String(project_id))}/releases/${encodeURIComponent(String(tag_name))}`,
    body
  );
  return formatResponse(response.data);
};

/**
 * Delete release handler
 */
export const deleteRelease: ToolHandler = async (params, context) => {
  const { project_id, tag_name } = params.arguments || {};
  if (!project_id || !tag_name) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and tag_name are required');
  }

  const response = await context.axiosInstance.delete(
    `/projects/${encodeURIComponent(String(project_id))}/releases/${encodeURIComponent(String(tag_name))}`
  );
  return formatResponse(response.data);
};
