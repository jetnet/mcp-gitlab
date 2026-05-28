/**
 * Repository file CRUD handlers - create, update, delete files
 */

import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { ToolHandler } from "../utils/handler-types.js";
import { formatResponse } from "../utils/response-formatter.js";

/**
 * Create a file in a repository handler
 */
export const createRepositoryFile: ToolHandler = async (params, context) => {
  const { project_id, file_path, branch, content, commit_message, author_email, author_name, encoding, start_branch } = params.arguments || {};
  if (!project_id || !file_path || !branch || !content || !commit_message) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id, file_path, branch, content, and commit_message are required');
  }

  const body: any = { branch, content, commit_message };
  if (author_email !== undefined) body.author_email = author_email;
  if (author_name !== undefined) body.author_name = author_name;
  if (encoding !== undefined) body.encoding = encoding;
  if (start_branch !== undefined) body.start_branch = start_branch;

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/repository/files/${encodeURIComponent(String(file_path))}`,
    body
  );
  return formatResponse(response.data);
};

/**
 * Update a file in a repository handler
 */
export const updateRepositoryFile: ToolHandler = async (params, context) => {
  const { project_id, file_path, branch, content, commit_message, author_email, author_name, encoding, last_commit_id, start_branch } = params.arguments || {};
  if (!project_id || !file_path || !branch || !content || !commit_message) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id, file_path, branch, content, and commit_message are required');
  }

  const body: any = { branch, content, commit_message };
  if (author_email !== undefined) body.author_email = author_email;
  if (author_name !== undefined) body.author_name = author_name;
  if (encoding !== undefined) body.encoding = encoding;
  if (last_commit_id !== undefined) body.last_commit_id = last_commit_id;
  if (start_branch !== undefined) body.start_branch = start_branch;

  const response = await context.axiosInstance.put(
    `/projects/${encodeURIComponent(String(project_id))}/repository/files/${encodeURIComponent(String(file_path))}`,
    body
  );
  return formatResponse(response.data);
};

/**
 * Delete a file in a repository handler
 */
export const deleteRepositoryFile: ToolHandler = async (params, context) => {
  const { project_id, file_path, branch, commit_message, author_email, author_name, last_commit_id, start_branch } = params.arguments || {};
  if (!project_id || !file_path || !branch || !commit_message) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id, file_path, branch, and commit_message are required');
  }

  const response = await context.axiosInstance.delete(
    `/projects/${encodeURIComponent(String(project_id))}/repository/files/${encodeURIComponent(String(file_path))}`,
    {
      data: {
        branch,
        commit_message,
        ...(author_email !== undefined && { author_email }),
        ...(author_name !== undefined && { author_name }),
        ...(last_commit_id !== undefined && { last_commit_id }),
        ...(start_branch !== undefined && { start_branch })
      }
    }
  );
  return formatResponse(response.data || { status: 'deleted' });
};
