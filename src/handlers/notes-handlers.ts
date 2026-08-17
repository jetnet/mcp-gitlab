/**
 * Notes handlers - full CRUD for notes (comments) on issues, merge requests,
 * epics, snippets and wiki pages.
 *
 * Reference: https://docs.gitlab.com/api/notes/
 */

import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { ToolHandler } from "../utils/handler-types.js";
import { formatResponse } from "../utils/response-formatter.js";

/** URL-encode a project/group id or path */
const enc = (id: unknown): string => encodeURIComponent(String(id));

/** Build the standard list query for note endpoints */
const listParams = (args: Record<string, any>) => {
  const { sort, order_by, per_page, page } = args;
  const query: Record<string, any> = { per_page: per_page || 20 };
  if (page !== undefined) query.page = page;
  if (sort !== undefined) query.sort = sort;
  if (order_by !== undefined) query.order_by = order_by;
  return query;
};

const assertParams = (condition: unknown, message: string) => {
  if (!condition) {
    throw new McpError(ErrorCode.InvalidParams, message);
  }
};

/* -------------------------------------------------------------------------- */
/* Issue notes                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Retrieve a single issue note
 * GET /projects/:id/issues/:issue_iid/notes/:note_id
 */
export const getIssueNote: ToolHandler = async (params, context) => {
  const { project_id, issue_iid, note_id } = params.arguments || {};
  assertParams(project_id && issue_iid && note_id, 'project_id, issue_iid, and note_id are required');

  const response = await context.axiosInstance.get(
    `/projects/${enc(project_id)}/issues/${issue_iid}/notes/${note_id}`
  );
  return formatResponse(response.data);
};

/**
 * Update (edit) an existing issue note
 * PUT /projects/:id/issues/:issue_iid/notes/:note_id
 */
export const updateIssueNote: ToolHandler = async (params, context) => {
  const { project_id, issue_iid, note_id, body: noteBody, confidential } = params.arguments || {};
  assertParams(project_id && issue_iid && note_id, 'project_id, issue_iid, and note_id are required');
  assertParams(noteBody !== undefined, 'body is required');

  const payload: Record<string, any> = { body: noteBody };
  if (confidential !== undefined) payload.confidential = confidential;

  const response = await context.axiosInstance.put(
    `/projects/${enc(project_id)}/issues/${issue_iid}/notes/${note_id}`,
    payload
  );
  return formatResponse(response.data);
};

/**
 * Delete an issue note
 * DELETE /projects/:id/issues/:issue_iid/notes/:note_id
 */
export const deleteIssueNote: ToolHandler = async (params, context) => {
  const { project_id, issue_iid, note_id } = params.arguments || {};
  assertParams(project_id && issue_iid && note_id, 'project_id, issue_iid, and note_id are required');

  const response = await context.axiosInstance.delete(
    `/projects/${enc(project_id)}/issues/${issue_iid}/notes/${note_id}`
  );
  return formatResponse(response.data || { status: 'deleted', note_id });
};

/* -------------------------------------------------------------------------- */
/* Merge request notes                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Retrieve a single merge request note
 * GET /projects/:id/merge_requests/:merge_request_iid/notes/:note_id
 */
export const getMergeRequestNote: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, note_id } = params.arguments || {};
  assertParams(project_id && merge_request_iid && note_id, 'project_id, merge_request_iid, and note_id are required');

  const response = await context.axiosInstance.get(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/notes/${note_id}`
  );
  return formatResponse(response.data);
};

/**
 * Update (edit) an existing merge request note
 * PUT /projects/:id/merge_requests/:merge_request_iid/notes/:note_id
 */
export const updateMergeRequestNote: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, note_id, body: noteBody, confidential } = params.arguments || {};
  assertParams(project_id && merge_request_iid && note_id, 'project_id, merge_request_iid, and note_id are required');
  assertParams(noteBody !== undefined, 'body is required');

  const payload: Record<string, any> = { body: noteBody };
  if (confidential !== undefined) payload.confidential = confidential;

  const response = await context.axiosInstance.put(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/notes/${note_id}`,
    payload
  );
  return formatResponse(response.data);
};

/**
 * Delete a merge request note
 * DELETE /projects/:id/merge_requests/:merge_request_iid/notes/:note_id
 */
export const deleteMergeRequestNote: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, note_id } = params.arguments || {};
  assertParams(project_id && merge_request_iid && note_id, 'project_id, merge_request_iid, and note_id are required');

  const response = await context.axiosInstance.delete(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/notes/${note_id}`
  );
  return formatResponse(response.data || { status: 'deleted', note_id });
};

/* -------------------------------------------------------------------------- */
/* Epic notes (group level)                                                   */
/* -------------------------------------------------------------------------- */

/**
 * List all epic notes
 * GET /groups/:id/epics/:epic_id/notes
 */
export const listEpicNotes: ToolHandler = async (params, context) => {
  const args = params.arguments || {};
  const { group_id, epic_id } = args;
  assertParams(group_id && epic_id, 'group_id and epic_id are required');

  const response = await context.axiosInstance.get(
    `/groups/${enc(group_id)}/epics/${epic_id}/notes`,
    { params: listParams(args) }
  );
  return formatResponse(response.data);
};

/**
 * Retrieve a single epic note
 * GET /groups/:id/epics/:epic_id/notes/:note_id
 */
export const getEpicNote: ToolHandler = async (params, context) => {
  const { group_id, epic_id, note_id } = params.arguments || {};
  assertParams(group_id && epic_id && note_id, 'group_id, epic_id, and note_id are required');

  const response = await context.axiosInstance.get(
    `/groups/${enc(group_id)}/epics/${epic_id}/notes/${note_id}`
  );
  return formatResponse(response.data);
};

/**
 * Create an epic note
 * POST /groups/:id/epics/:epic_id/notes
 */
export const createEpicNote: ToolHandler = async (params, context) => {
  const { group_id, epic_id, body: noteBody, confidential, created_at } = params.arguments || {};
  assertParams(group_id && epic_id, 'group_id and epic_id are required');
  assertParams(noteBody, 'body is required');

  const payload: Record<string, any> = { body: noteBody };
  if (confidential !== undefined) payload.confidential = confidential;
  if (created_at !== undefined) payload.created_at = created_at;

  const response = await context.axiosInstance.post(
    `/groups/${enc(group_id)}/epics/${epic_id}/notes`,
    payload
  );
  return formatResponse(response.data);
};

/**
 * Update (edit) an existing epic note
 * PUT /groups/:id/epics/:epic_id/notes/:note_id
 */
export const updateEpicNote: ToolHandler = async (params, context) => {
  const { group_id, epic_id, note_id, body: noteBody } = params.arguments || {};
  assertParams(group_id && epic_id && note_id, 'group_id, epic_id, and note_id are required');
  assertParams(noteBody !== undefined, 'body is required');

  const response = await context.axiosInstance.put(
    `/groups/${enc(group_id)}/epics/${epic_id}/notes/${note_id}`,
    { body: noteBody }
  );
  return formatResponse(response.data);
};

/**
 * Delete an epic note
 * DELETE /groups/:id/epics/:epic_id/notes/:note_id
 */
export const deleteEpicNote: ToolHandler = async (params, context) => {
  const { group_id, epic_id, note_id } = params.arguments || {};
  assertParams(group_id && epic_id && note_id, 'group_id, epic_id, and note_id are required');

  const response = await context.axiosInstance.delete(
    `/groups/${enc(group_id)}/epics/${epic_id}/notes/${note_id}`
  );
  return formatResponse(response.data || { status: 'deleted', note_id });
};

/* -------------------------------------------------------------------------- */
/* Snippet notes                                                              */
/* -------------------------------------------------------------------------- */

/**
 * List all snippet notes
 * GET /projects/:id/snippets/:snippet_id/notes
 */
export const listSnippetNotes: ToolHandler = async (params, context) => {
  const args = params.arguments || {};
  const { project_id, snippet_id } = args;
  assertParams(project_id && snippet_id, 'project_id and snippet_id are required');

  const response = await context.axiosInstance.get(
    `/projects/${enc(project_id)}/snippets/${snippet_id}/notes`,
    { params: listParams(args) }
  );
  return formatResponse(response.data);
};

/**
 * Retrieve a single snippet note
 * GET /projects/:id/snippets/:snippet_id/notes/:note_id
 */
export const getSnippetNote: ToolHandler = async (params, context) => {
  const { project_id, snippet_id, note_id } = params.arguments || {};
  assertParams(project_id && snippet_id && note_id, 'project_id, snippet_id, and note_id are required');

  const response = await context.axiosInstance.get(
    `/projects/${enc(project_id)}/snippets/${snippet_id}/notes/${note_id}`
  );
  return formatResponse(response.data);
};

/**
 * Create a snippet note
 * POST /projects/:id/snippets/:snippet_id/notes
 */
export const createSnippetNote: ToolHandler = async (params, context) => {
  const { project_id, snippet_id, body: noteBody, created_at } = params.arguments || {};
  assertParams(project_id && snippet_id, 'project_id and snippet_id are required');
  assertParams(noteBody, 'body is required');

  const payload: Record<string, any> = { body: noteBody };
  if (created_at !== undefined) payload.created_at = created_at;

  const response = await context.axiosInstance.post(
    `/projects/${enc(project_id)}/snippets/${snippet_id}/notes`,
    payload
  );
  return formatResponse(response.data);
};

/**
 * Update (edit) an existing snippet note
 * PUT /projects/:id/snippets/:snippet_id/notes/:note_id
 */
export const updateSnippetNote: ToolHandler = async (params, context) => {
  const { project_id, snippet_id, note_id, body: noteBody } = params.arguments || {};
  assertParams(project_id && snippet_id && note_id, 'project_id, snippet_id, and note_id are required');
  assertParams(noteBody !== undefined, 'body is required');

  const response = await context.axiosInstance.put(
    `/projects/${enc(project_id)}/snippets/${snippet_id}/notes/${note_id}`,
    { body: noteBody }
  );
  return formatResponse(response.data);
};

/**
 * Delete a snippet note
 * DELETE /projects/:id/snippets/:snippet_id/notes/:note_id
 */
export const deleteSnippetNote: ToolHandler = async (params, context) => {
  const { project_id, snippet_id, note_id } = params.arguments || {};
  assertParams(project_id && snippet_id && note_id, 'project_id, snippet_id, and note_id are required');

  const response = await context.axiosInstance.delete(
    `/projects/${enc(project_id)}/snippets/${snippet_id}/notes/${note_id}`
  );
  return formatResponse(response.data || { status: 'deleted', note_id });
};

/* -------------------------------------------------------------------------- */
/* Wiki page notes (GitLab 17.9+)                                             */
/* -------------------------------------------------------------------------- */

/**
 * List all wiki page notes
 * GET /projects/:id/wiki_pages/:wiki_page_meta_id/notes
 */
export const listWikiPageNotes: ToolHandler = async (params, context) => {
  const args = params.arguments || {};
  const { project_id, wiki_page_meta_id } = args;
  assertParams(project_id && wiki_page_meta_id, 'project_id and wiki_page_meta_id are required');

  const response = await context.axiosInstance.get(
    `/projects/${enc(project_id)}/wiki_pages/${wiki_page_meta_id}/notes`,
    { params: listParams(args) }
  );
  return formatResponse(response.data);
};

/**
 * Retrieve a single wiki page note
 * GET /projects/:id/wiki_pages/:wiki_page_meta_id/notes/:note_id
 */
export const getWikiPageNote: ToolHandler = async (params, context) => {
  const { project_id, wiki_page_meta_id, note_id } = params.arguments || {};
  assertParams(project_id && wiki_page_meta_id && note_id, 'project_id, wiki_page_meta_id, and note_id are required');

  const response = await context.axiosInstance.get(
    `/projects/${enc(project_id)}/wiki_pages/${wiki_page_meta_id}/notes/${note_id}`
  );
  return formatResponse(response.data);
};

/**
 * Create a wiki page note
 * POST /projects/:id/wiki_pages/:wiki_page_meta_id/notes
 */
export const createWikiPageNote: ToolHandler = async (params, context) => {
  const { project_id, wiki_page_meta_id, body: noteBody, internal } = params.arguments || {};
  assertParams(project_id && wiki_page_meta_id, 'project_id and wiki_page_meta_id are required');
  assertParams(noteBody, 'body is required');

  const payload: Record<string, any> = { body: noteBody };
  if (internal !== undefined) payload.internal = internal;

  const response = await context.axiosInstance.post(
    `/projects/${enc(project_id)}/wiki_pages/${wiki_page_meta_id}/notes`,
    payload
  );
  return formatResponse(response.data);
};

/**
 * Update (edit) an existing wiki page note
 * PUT /projects/:id/wiki_pages/:wiki_page_meta_id/notes/:note_id
 */
export const updateWikiPageNote: ToolHandler = async (params, context) => {
  const { project_id, wiki_page_meta_id, note_id, body: noteBody } = params.arguments || {};
  assertParams(project_id && wiki_page_meta_id && note_id, 'project_id, wiki_page_meta_id, and note_id are required');
  assertParams(noteBody !== undefined, 'body is required');

  const response = await context.axiosInstance.put(
    `/projects/${enc(project_id)}/wiki_pages/${wiki_page_meta_id}/notes/${note_id}`,
    { body: noteBody }
  );
  return formatResponse(response.data);
};

/**
 * Delete a wiki page note
 * DELETE /projects/:id/wiki_pages/:wiki_page_meta_id/notes/:note_id
 */
export const deleteWikiPageNote: ToolHandler = async (params, context) => {
  const { project_id, wiki_page_meta_id, note_id } = params.arguments || {};
  assertParams(project_id && wiki_page_meta_id && note_id, 'project_id, wiki_page_meta_id, and note_id are required');

  const response = await context.axiosInstance.delete(
    `/projects/${enc(project_id)}/wiki_pages/${wiki_page_meta_id}/notes/${note_id}`
  );
  return formatResponse(response.data || { status: 'deleted', note_id });
};
