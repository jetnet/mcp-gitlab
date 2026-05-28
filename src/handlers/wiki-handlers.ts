/**
 * Wiki page management tool handlers
 */

import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { ToolHandler } from "../utils/handler-types.js";
import { formatResponse } from "../utils/response-formatter.js";

/**
 * List wiki pages handler
 */
export const listWikiPages: ToolHandler = async (params, context) => {
  const { project_id, with_content } = params.arguments || {};
  if (!project_id) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id is required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/wikis`,
    { params: { with_content } }
  );
  return formatResponse(response.data);
};

/**
 * Get wiki page handler
 */
export const getWikiPage: ToolHandler = async (params, context) => {
  const { project_id, slug, render_html, version } = params.arguments || {};
  if (!project_id || !slug) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and slug are required');
  }

  const response = await context.axiosInstance.get(
    `/projects/${encodeURIComponent(String(project_id))}/wikis/${encodeURIComponent(String(slug))}`,
    { params: { render_html, version } }
  );
  return formatResponse(response.data);
};

/**
 * Create wiki page handler
 */
export const createWikiPage: ToolHandler = async (params, context) => {
  const { project_id, title, content, format } = params.arguments || {};
  if (!project_id || !title || !content) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id, title, and content are required');
  }

  const body: any = { title, content };
  if (format !== undefined) body.format = format;

  const response = await context.axiosInstance.post(
    `/projects/${encodeURIComponent(String(project_id))}/wikis`,
    body
  );
  return formatResponse(response.data);
};

/**
 * Update wiki page handler
 */
export const updateWikiPage: ToolHandler = async (params, context) => {
  const { project_id, slug, title, content, format } = params.arguments || {};
  if (!project_id || !slug) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and slug are required');
  }
  if (!title && !content) {
    throw new McpError(ErrorCode.InvalidParams, 'at least one of title or content is required');
  }

  const body: any = {};
  if (title !== undefined) body.title = title;
  if (content !== undefined) body.content = content;
  if (format !== undefined) body.format = format;

  const response = await context.axiosInstance.put(
    `/projects/${encodeURIComponent(String(project_id))}/wikis/${encodeURIComponent(String(slug))}`,
    body
  );
  return formatResponse(response.data);
};

/**
 * Delete wiki page handler
 */
export const deleteWikiPage: ToolHandler = async (params, context) => {
  const { project_id, slug } = params.arguments || {};
  if (!project_id || !slug) {
    throw new McpError(ErrorCode.InvalidParams, 'project_id and slug are required');
  }

  await context.axiosInstance.delete(
    `/projects/${encodeURIComponent(String(project_id))}/wikis/${encodeURIComponent(String(slug))}`
  );
  return formatResponse({ status: 'deleted' });
};
