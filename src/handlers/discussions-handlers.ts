/**
 * Discussions (threads) and draft notes handlers.
 *
 * References:
 *  - https://docs.gitlab.com/api/discussions/
 *  - https://docs.gitlab.com/api/draft_notes/
 */

import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { ToolHandler } from "../utils/handler-types.js";
import { formatResponse } from "../utils/response-formatter.js";

/** URL-encode a project/group id or path */
const enc = (id: unknown): string => encodeURIComponent(String(id));

const assertParams = (condition: unknown, message: string) => {
  if (!condition) {
    throw new McpError(ErrorCode.InvalidParams, message);
  }
};

/** Standard pagination query for discussion list endpoints */
const pageParams = (args: Record<string, any>) => {
  const query: Record<string, any> = { per_page: args.per_page || 20 };
  if (args.page !== undefined) query.page = args.page;
  return query;
};

/* -------------------------------------------------------------------------- */
/* Issue discussions                                                          */
/* -------------------------------------------------------------------------- */

/**
 * List all issue discussion items (threads)
 * GET /projects/:id/issues/:issue_iid/discussions
 */
export const listIssueDiscussions: ToolHandler = async (params, context) => {
  const args = params.arguments || {};
  const { project_id, issue_iid } = args;
  assertParams(project_id && issue_iid, 'project_id and issue_iid are required');

  const response = await context.axiosInstance.get(
    `/projects/${enc(project_id)}/issues/${issue_iid}/discussions`,
    { params: pageParams(args) }
  );
  return formatResponse(response.data);
};

/**
 * Retrieve a single issue discussion item
 * GET /projects/:id/issues/:issue_iid/discussions/:discussion_id
 */
export const getIssueDiscussion: ToolHandler = async (params, context) => {
  const { project_id, issue_iid, discussion_id } = params.arguments || {};
  assertParams(project_id && issue_iid && discussion_id, 'project_id, issue_iid, and discussion_id are required');

  const response = await context.axiosInstance.get(
    `/projects/${enc(project_id)}/issues/${issue_iid}/discussions/${enc(discussion_id)}`
  );
  return formatResponse(response.data);
};

/**
 * Create a new issue thread
 * POST /projects/:id/issues/:issue_iid/discussions
 */
export const createIssueDiscussion: ToolHandler = async (params, context) => {
  const { project_id, issue_iid, body: noteBody, created_at } = params.arguments || {};
  assertParams(project_id && issue_iid, 'project_id and issue_iid are required');
  assertParams(noteBody, 'body is required');

  const payload: Record<string, any> = { body: noteBody };
  if (created_at !== undefined) payload.created_at = created_at;

  const response = await context.axiosInstance.post(
    `/projects/${enc(project_id)}/issues/${issue_iid}/discussions`,
    payload
  );
  return formatResponse(response.data);
};

/**
 * Add a note (reply) to an existing issue thread
 * POST /projects/:id/issues/:issue_iid/discussions/:discussion_id/notes
 */
export const addIssueDiscussionNote: ToolHandler = async (params, context) => {
  const { project_id, issue_iid, discussion_id, body: noteBody, created_at } = params.arguments || {};
  assertParams(project_id && issue_iid && discussion_id, 'project_id, issue_iid, and discussion_id are required');
  assertParams(noteBody, 'body is required');

  const payload: Record<string, any> = { body: noteBody };
  if (created_at !== undefined) payload.created_at = created_at;

  const response = await context.axiosInstance.post(
    `/projects/${enc(project_id)}/issues/${issue_iid}/discussions/${enc(discussion_id)}/notes`,
    payload
  );
  return formatResponse(response.data);
};

/**
 * Update (edit) an existing issue thread note
 * PUT /projects/:id/issues/:issue_iid/discussions/:discussion_id/notes/:note_id
 */
export const updateIssueDiscussionNote: ToolHandler = async (params, context) => {
  const { project_id, issue_iid, discussion_id, note_id, body: noteBody } = params.arguments || {};
  assertParams(project_id && issue_iid && discussion_id && note_id, 'project_id, issue_iid, discussion_id, and note_id are required');
  assertParams(noteBody !== undefined, 'body is required');

  const response = await context.axiosInstance.put(
    `/projects/${enc(project_id)}/issues/${issue_iid}/discussions/${enc(discussion_id)}/notes/${note_id}`,
    { body: noteBody }
  );
  return formatResponse(response.data);
};

/**
 * Delete an issue thread note
 * DELETE /projects/:id/issues/:issue_iid/discussions/:discussion_id/notes/:note_id
 */
export const deleteIssueDiscussionNote: ToolHandler = async (params, context) => {
  const { project_id, issue_iid, discussion_id, note_id } = params.arguments || {};
  assertParams(project_id && issue_iid && discussion_id && note_id, 'project_id, issue_iid, discussion_id, and note_id are required');

  const response = await context.axiosInstance.delete(
    `/projects/${enc(project_id)}/issues/${issue_iid}/discussions/${enc(discussion_id)}/notes/${note_id}`
  );
  return formatResponse(response.data || { status: 'deleted', note_id });
};

/* -------------------------------------------------------------------------- */
/* Merge request discussions                                                  */
/* -------------------------------------------------------------------------- */

/**
 * List all merge request discussion items (threads)
 * GET /projects/:id/merge_requests/:merge_request_iid/discussions
 */
export const listMergeRequestDiscussions: ToolHandler = async (params, context) => {
  const args = params.arguments || {};
  const { project_id, merge_request_iid } = args;
  assertParams(project_id && merge_request_iid, 'project_id and merge_request_iid are required');

  const response = await context.axiosInstance.get(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/discussions`,
    { params: pageParams(args) }
  );
  return formatResponse(response.data);
};

/**
 * Retrieve a single merge request discussion item
 * GET /projects/:id/merge_requests/:merge_request_iid/discussions/:discussion_id
 */
export const getMergeRequestDiscussion: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, discussion_id } = params.arguments || {};
  assertParams(project_id && merge_request_iid && discussion_id, 'project_id, merge_request_iid, and discussion_id are required');

  const response = await context.axiosInstance.get(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/discussions/${enc(discussion_id)}`
  );
  return formatResponse(response.data);
};

/**
 * Create a new merge request thread, optionally anchored to a diff position
 * POST /projects/:id/merge_requests/:merge_request_iid/discussions
 */
export const createMergeRequestDiscussion: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, body: noteBody, position, commit_id, created_at } = params.arguments || {};
  assertParams(project_id && merge_request_iid, 'project_id and merge_request_iid are required');
  assertParams(noteBody, 'body is required');

  const payload: Record<string, any> = { body: noteBody };
  if (position !== undefined) payload.position = position;
  if (commit_id !== undefined) payload.commit_id = commit_id;
  if (created_at !== undefined) payload.created_at = created_at;

  const response = await context.axiosInstance.post(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/discussions`,
    payload
  );
  return formatResponse(response.data);
};

/**
 * Resolve or reopen a merge request thread
 * PUT /projects/:id/merge_requests/:merge_request_iid/discussions/:discussion_id
 */
export const resolveMergeRequestDiscussion: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, discussion_id, resolved } = params.arguments || {};
  assertParams(project_id && merge_request_iid && discussion_id, 'project_id, merge_request_iid, and discussion_id are required');
  assertParams(resolved !== undefined, 'resolved is required');

  const response = await context.axiosInstance.put(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/discussions/${enc(discussion_id)}`,
    { resolved }
  );
  return formatResponse(response.data);
};

/**
 * Add a note (reply) to an existing merge request thread
 * POST /projects/:id/merge_requests/:merge_request_iid/discussions/:discussion_id/notes
 */
export const addMergeRequestDiscussionNote: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, discussion_id, body: noteBody, created_at } = params.arguments || {};
  assertParams(project_id && merge_request_iid && discussion_id, 'project_id, merge_request_iid, and discussion_id are required');
  assertParams(noteBody, 'body is required');

  const payload: Record<string, any> = { body: noteBody };
  if (created_at !== undefined) payload.created_at = created_at;

  const response = await context.axiosInstance.post(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/discussions/${enc(discussion_id)}/notes`,
    payload
  );
  return formatResponse(response.data);
};

/**
 * Update (edit) or resolve an existing merge request thread note.
 * Exactly one of body or resolved must be supplied.
 * PUT /projects/:id/merge_requests/:merge_request_iid/discussions/:discussion_id/notes/:note_id
 */
export const updateMergeRequestDiscussionNote: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, discussion_id, note_id, body: noteBody, resolved } = params.arguments || {};
  assertParams(project_id && merge_request_iid && discussion_id && note_id, 'project_id, merge_request_iid, discussion_id, and note_id are required');

  const hasBody = noteBody !== undefined;
  const hasResolved = resolved !== undefined;
  if (hasBody === hasResolved) {
    throw new McpError(ErrorCode.InvalidParams, 'Exactly one of body or resolved must be set');
  }

  const payload: Record<string, any> = hasBody ? { body: noteBody } : { resolved };

  const response = await context.axiosInstance.put(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/discussions/${enc(discussion_id)}/notes/${note_id}`,
    payload
  );
  return formatResponse(response.data);
};

/**
 * Delete a merge request thread note
 * DELETE /projects/:id/merge_requests/:merge_request_iid/discussions/:discussion_id/notes/:note_id
 */
export const deleteMergeRequestDiscussionNote: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, discussion_id, note_id } = params.arguments || {};
  assertParams(project_id && merge_request_iid && discussion_id && note_id, 'project_id, merge_request_iid, discussion_id, and note_id are required');

  const response = await context.axiosInstance.delete(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/discussions/${enc(discussion_id)}/notes/${note_id}`
  );
  return formatResponse(response.data || { status: 'deleted', note_id });
};

/* -------------------------------------------------------------------------- */
/* Commit discussions                                                         */
/* -------------------------------------------------------------------------- */

/**
 * List all commit discussion items
 * GET /projects/:id/repository/commits/:commit_id/discussions
 */
export const listCommitDiscussions: ToolHandler = async (params, context) => {
  const args = params.arguments || {};
  const { project_id, commit_id } = args;
  assertParams(project_id && commit_id, 'project_id and commit_id are required');

  const response = await context.axiosInstance.get(
    `/projects/${enc(project_id)}/repository/commits/${enc(commit_id)}/discussions`,
    { params: pageParams(args) }
  );
  return formatResponse(response.data);
};

/**
 * Retrieve a single commit discussion item
 * GET /projects/:id/repository/commits/:commit_id/discussions/:discussion_id
 */
export const getCommitDiscussion: ToolHandler = async (params, context) => {
  const { project_id, commit_id, discussion_id } = params.arguments || {};
  assertParams(project_id && commit_id && discussion_id, 'project_id, commit_id, and discussion_id are required');

  const response = await context.axiosInstance.get(
    `/projects/${enc(project_id)}/repository/commits/${enc(commit_id)}/discussions/${enc(discussion_id)}`
  );
  return formatResponse(response.data);
};

/**
 * Create a new commit thread
 * POST /projects/:id/repository/commits/:commit_id/discussions
 */
export const createCommitDiscussion: ToolHandler = async (params, context) => {
  const { project_id, commit_id, body: noteBody, position, created_at } = params.arguments || {};
  assertParams(project_id && commit_id, 'project_id and commit_id are required');
  assertParams(noteBody, 'body is required');

  const payload: Record<string, any> = { body: noteBody };
  if (position !== undefined) payload.position = position;
  if (created_at !== undefined) payload.created_at = created_at;

  const response = await context.axiosInstance.post(
    `/projects/${enc(project_id)}/repository/commits/${enc(commit_id)}/discussions`,
    payload
  );
  return formatResponse(response.data);
};

/**
 * Add a note (reply) to an existing commit thread
 * POST /projects/:id/repository/commits/:commit_id/discussions/:discussion_id/notes
 */
export const addCommitDiscussionNote: ToolHandler = async (params, context) => {
  const { project_id, commit_id, discussion_id, body: noteBody, created_at } = params.arguments || {};
  assertParams(project_id && commit_id && discussion_id, 'project_id, commit_id, and discussion_id are required');
  assertParams(noteBody, 'body is required');

  const payload: Record<string, any> = { body: noteBody };
  if (created_at !== undefined) payload.created_at = created_at;

  const response = await context.axiosInstance.post(
    `/projects/${enc(project_id)}/repository/commits/${enc(commit_id)}/discussions/${enc(discussion_id)}/notes`,
    payload
  );
  return formatResponse(response.data);
};

/* -------------------------------------------------------------------------- */
/* Draft notes (pending merge request review comments)                        */
/* -------------------------------------------------------------------------- */

/**
 * List all merge request draft notes
 * GET /projects/:id/merge_requests/:merge_request_iid/draft_notes
 */
export const listDraftNotes: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid } = params.arguments || {};
  assertParams(project_id && merge_request_iid, 'project_id and merge_request_iid are required');

  const response = await context.axiosInstance.get(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/draft_notes`
  );
  return formatResponse(response.data);
};

/**
 * Retrieve a single draft note
 * GET /projects/:id/merge_requests/:merge_request_iid/draft_notes/:draft_note_id
 */
export const getDraftNote: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, draft_note_id } = params.arguments || {};
  assertParams(project_id && merge_request_iid && draft_note_id, 'project_id, merge_request_iid, and draft_note_id are required');

  const response = await context.axiosInstance.get(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/draft_notes/${draft_note_id}`
  );
  return formatResponse(response.data);
};

/**
 * Create a draft note
 * POST /projects/:id/merge_requests/:merge_request_iid/draft_notes
 */
export const createDraftNote: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, note, in_reply_to_discussion_id, resolve_discussion, position, commit_id } = params.arguments || {};
  assertParams(project_id && merge_request_iid, 'project_id and merge_request_iid are required');
  assertParams(note, 'note is required');

  const payload: Record<string, any> = { note };
  if (in_reply_to_discussion_id !== undefined) payload.in_reply_to_discussion_id = in_reply_to_discussion_id;
  if (resolve_discussion !== undefined) payload.resolve_discussion = resolve_discussion;
  if (position !== undefined) payload.position = position;
  if (commit_id !== undefined) payload.commit_id = commit_id;

  const response = await context.axiosInstance.post(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/draft_notes`,
    payload
  );
  return formatResponse(response.data);
};

/**
 * Update (edit) an existing draft note
 * PUT /projects/:id/merge_requests/:merge_request_iid/draft_notes/:draft_note_id
 */
export const updateDraftNote: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, draft_note_id, note, position } = params.arguments || {};
  assertParams(project_id && merge_request_iid && draft_note_id, 'project_id, merge_request_iid, and draft_note_id are required');
  assertParams(note !== undefined || position !== undefined, 'at least one of note or position is required');

  const payload: Record<string, any> = {};
  if (note !== undefined) payload.note = note;
  if (position !== undefined) payload.position = position;

  const response = await context.axiosInstance.put(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/draft_notes/${draft_note_id}`,
    payload
  );
  return formatResponse(response.data);
};

/**
 * Delete a draft note
 * DELETE /projects/:id/merge_requests/:merge_request_iid/draft_notes/:draft_note_id
 */
export const deleteDraftNote: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, draft_note_id } = params.arguments || {};
  assertParams(project_id && merge_request_iid && draft_note_id, 'project_id, merge_request_iid, and draft_note_id are required');

  const response = await context.axiosInstance.delete(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/draft_notes/${draft_note_id}`
  );
  return formatResponse(response.data || { status: 'deleted', draft_note_id });
};

/**
 * Publish a single draft note
 * PUT /projects/:id/merge_requests/:merge_request_iid/draft_notes/:draft_note_id/publish
 */
export const publishDraftNote: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, draft_note_id } = params.arguments || {};
  assertParams(project_id && merge_request_iid && draft_note_id, 'project_id, merge_request_iid, and draft_note_id are required');

  const response = await context.axiosInstance.put(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/draft_notes/${draft_note_id}/publish`
  );
  return formatResponse(response.data || { status: 'published', draft_note_id });
};

/**
 * Publish all pending draft notes belonging to the current user
 * POST /projects/:id/merge_requests/:merge_request_iid/draft_notes/bulk_publish
 */
export const bulkPublishDraftNotes: ToolHandler = async (params, context) => {
  const { project_id, merge_request_iid, note, internal, reviewer_state } = params.arguments || {};
  assertParams(project_id && merge_request_iid, 'project_id and merge_request_iid are required');

  const payload: Record<string, any> = {};
  if (note !== undefined) payload.note = note;
  if (internal !== undefined) payload.internal = internal;
  if (reviewer_state !== undefined) payload.reviewer_state = reviewer_state;

  const response = await context.axiosInstance.post(
    `/projects/${enc(project_id)}/merge_requests/${merge_request_iid}/draft_notes/bulk_publish`,
    payload
  );
  return formatResponse(response.data || { status: 'published' });
};
