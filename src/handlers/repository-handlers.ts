/**
 * Repository-related tool handlers
 */

import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { ToolHandler } from "../utils/handler-types.js";
import { formatResponse } from "../utils/response-formatter.js";

/**
 * List projects handler
 */
export const listProjects: ToolHandler = async (params, context) => {
  const { search, owned, membership, per_page } = params.arguments || {};
  const response = await context.axiosInstance.get('/projects', {
    params: {
      search,
      owned: owned === true ? true : undefined,
      membership: membership === true ? true : undefined,
      per_page: per_page || 20
    }
  });
  
  return formatResponse(response.data);
};

/**
 * Get project details handler
 */
export const getProject: ToolHandler = async (params, context) => {
  const { project_id } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }
  
  const response = await context.axiosInstance.get(`/projects/${encodeURIComponent(String(project_id))}`);
  return formatResponse(response.data);
};

/**
 * List branches handler
 */
export const listBranches: ToolHandler = async (params, context) => {
  const { project_id, search } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }
  
  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/repository/branches`,
    { params: { search } }
  );
  return formatResponse(response.data);
};

/**
 * List merge requests handler
 */
export const listMergeRequests: ToolHandler = async (params, context) => {
  const { project_id, state, scope } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }
  
  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/merge_requests`,
    { params: { state, scope } }
  );
  return formatResponse(response.data);
};

/**
 * Get merge request details handler
 */
export const getMergeRequest: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid } = params.arguments || {};
  if (!project_id || !merge_request_iid) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and merge_request_iid are required');
  }
  
  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/merge_requests/${merge_request_iid}`
  );
  return formatResponse(response.data);
};

/**
 * Get merge request changes handler
 */
export const getMergeRequestChanges: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid } = params.arguments || {};
  if (!project_id || !merge_request_iid) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and merge_request_iid are required');
  }
  
  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/merge_requests/${merge_request_iid}/changes`
  );
  return formatResponse(response.data);
};

/**
 * Create merge request note handler
 */
export const createMergeRequestNote: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, body } = params.arguments || {};
  if (!project_id || !merge_request_iid || !body) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id, merge_request_iid, and body are required');
  }
  
  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/merge_requests/${merge_request_iid}/notes`,
    { body }
  );
  return formatResponse(response.data);
};

/**
 * List issues handler
 */
export const listIssues: ToolHandler = async (params, context) => {
  const { project_id, state, labels } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }
  
  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/issues`,
    { params: { state, labels } }
  );
  return formatResponse(response.data);
};

/**
 * Get repository file handler
 */
export const getRepositoryFile: ToolHandler = async (params, context) => {
  const { project_id, file_path, ref } = params.arguments || {};
  if (!project_id || !file_path) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and file_path are required');
  }
  
  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/repository/files/${encodeURIComponent(String(file_path))}`,
    { params: { ref: ref || 'main' } }
  );
  return formatResponse(response.data);
};

/**
 * Compare branches handler
 */
export const compareBranches: ToolHandler = async (params, context) => {
  const { project_id, from, to } = params.arguments || {};
  if (!project_id || !from || !to) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id, from, and to are required');
  }
  
  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/repository/compare`,
    { params: { from, to } }
  );
  return formatResponse(response.data);
};

/**
 * Update merge request title and description handler
 */
export const updateMergeRequest: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, title, description } = params.arguments || {};
  if (!project_id || !merge_request_iid) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and merge_request_iid are required');
  }

  if (!title && !description) {
    throw new McpError(ErrorCode.InvalidParams, 'At least one of title or description is required');
  }

  const response = await context.axiosInstance.put(
    `/projects/${encodeURIComponent(String(project_id))}/merge_requests/${merge_request_iid}`,
    { title, description }
  );
  return formatResponse(response.data);
};

/**
 * Create merge request handler
 */
export const createMergeRequest: ToolHandler = async (params, context) => {
  const {
    project_id,
    source_branch,
    target_branch,
    title,
    description,
    assignee_id,
    labels,
    remove_source_branch,
    squash
  } = params.arguments || {};

  if (!project_id || !source_branch || !target_branch || !title) {
    throw new McpError(
      ErrorCode.InvalidParams,
      'project_id, source_branch, target_branch, and title are required'
    );
  }

  const requestBody: any = {
    source_branch,
    target_branch,
    title
  };

  // Add optional parameters if provided
  if (description !== undefined) requestBody.description = description;
  if (assignee_id !== undefined) requestBody.assignee_id = assignee_id;
  if (labels !== undefined) requestBody.labels = labels;
  if (remove_source_branch !== undefined) requestBody.remove_source_branch = remove_source_branch;
  if (squash !== undefined) requestBody.squash = squash;

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/merge_requests`,
    requestBody
  );

  return formatResponse(response.data);
};

/**
 * Create merge request note handler with internal note option
 */
export const createMergeRequestNoteInternal: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, body, internal } = params.arguments || {};
  if (!project_id || !merge_request_iid || !body) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id, merge_request_iid, and body are required');
  }
  
  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/merge_requests/${merge_request_iid}/notes`,
    { body, internal: internal === true }
  );
  return formatResponse(response.data);
};

/**
 * Get merge request approvals handler
 */
export const getMergeRequestApprovals: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid } = params.arguments || {};
  if (!project_id || !merge_request_iid) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and merge_request_iid are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/merge_requests/${merge_request_iid}/approvals`
  );
  return formatResponse(response.data);
};

/**
 * List merge request notes handler
 */
export const listMergeRequestNotes: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, per_page, page } = params.arguments || {};
  if (!project_id || !merge_request_iid) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and merge_request_iid are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/merge_requests/${merge_request_iid}/notes`,
    { params: { per_page: per_page || 20, page } }
  );
  return formatResponse(response.data);
};

/**
 * Merge (accept) a merge request handler
 */
export const mergeMergeRequest: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, merge_commit_message, squash_commit_message, squash, should_remove_source_branch, merge_when_pipeline_succeeds, sha } = params.arguments || {};
  if (!project_id || !merge_request_iid) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and merge_request_iid are required');
  }

  const body: any = {};
  if (merge_commit_message !== undefined) body.merge_commit_message = merge_commit_message;
  if (squash_commit_message !== undefined) body.squash_commit_message = squash_commit_message;
  if (squash !== undefined) body.squash = squash;
  if (should_remove_source_branch !== undefined) body.should_remove_source_branch = should_remove_source_branch;
  if (merge_when_pipeline_succeeds !== undefined) body.merge_when_pipeline_succeeds = merge_when_pipeline_succeeds;
  if (sha !== undefined) body.sha = sha;

  const response = await context.axiosInstance.put(
    `/projects/${encodeURIComponent(String(project_id))}/merge_requests/${merge_request_iid}/merge`,
    body
  );
  return formatResponse(response.data);
};

/**
 * Search across GitLab handler
 */
export const search: ToolHandler = async (params, context) => {
  const { scope, search: searchQuery, project_id, group_id } = params.arguments || {};
  if (!scope || !searchQuery) {
    throw new McpError(ErrorCode.InvalidParams, 'scope and search are required');
  }

  let url = '';
  if (project_id) {
    url = `/projects/${encodeURIComponent(String(project_id))}/search`;
  } else if (group_id) {
    url = `/groups/${encodeURIComponent(String(group_id))}/search`;
  } else {
    url = '/search';
  }

  const response = await context.axiosInstance.get(url, {
    params: { scope, search: searchQuery }
  });
  return formatResponse(response.data);
}; 