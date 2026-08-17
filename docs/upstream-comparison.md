# Upstream Comparison: mcp-gitlab vs zereight-gitlab-mcp

## Tool Count

| Metric | Count |
|--------|-------|
| This repo (before the MR discussion change) | 117 tools |
| This repo (after the MR discussion change) | 123 tools (+6 MR discussion/thread tools) |
| This repo (after the notes/discussions change) | 162 tools (+39 net) |
| Upstream (zereight-gitlab-mcp tools/registry.ts) | 196 tools |
| Raw tool-count delta | 34 tools |

The upstream repo covers a broader surface area of the GitLab API (work items, GraphQL
endpoints, merge request versions, etc.). This repo does not claim to port all remaining
upstream API capabilities. Draft notes are no longer a gap — they were added in the
notes/discussions change described below.

## AI Workflow Support Comparison

| Asset category | Upstream | This repo (before) | This repo (after) |
|----------------|----------|-------------------|-------------------|
| Agents (.github/agents/*.md) | 28 | 0 | 0 |
| Skills (.github/skills/**/SKILL.md) | 22 | 0 | 0 |
| Prompts (.github/prompts/*.md) | 3 | 0 | 0 |
| Hooks (.github/hooks/*.sh) | 2 | 0 | 0 |
| copilot-instructions.md | 1 | 0 | 0 |

The upstream project ships an oh-my-githubcopilot workflow layer with agents, skills,
prompts, hooks, and Copilot instructions. Those assets were reviewed but not ported in
this change because they are broad assistant-orchestration infrastructure rather than
GitLab MCP API implementation, and the executable hooks introduce repository-local side
effects. Porting them should be a separate product decision.

## Scoped Changes: MR Discussion/Thread Workflow Tools

An earlier change added six tools enabling AI review loops over merge request discussions.
Those tools were subsequently renamed for consistency with the wider notes/discussions work
described below; see the naming note at the end of this document.

## Scoped Changes: Notes, Discussions and Draft Notes

This change adds 45 tools covering the GitLab Notes, Discussions and Draft Notes APIs, of
which 39 are net new after reconciling with the six MR discussion tools above.

**Note CRUD** — previously the server could only create and list comments. It can now
retrieve, **edit** and delete them:

- Issues and merge requests: `gitlab_get_*_note`, `gitlab_update_*_note`, `gitlab_delete_*_note`
- Epics, snippets and wiki pages: full list/get/create/update/delete
  (wiki page notes require GitLab 17.9 or later)

**Discussion threads** — issues, merge requests and commits, including diff-anchored code
comments through the `position` object (multiline via `position.line_range`) and thread
resolve/reopen.

**Draft notes** — batched merge request review comments with individual and bulk publish,
including `reviewer_state` on bulk publish.

This change does **not** attempt to port all remaining API coverage differences between
the two repositories.

## Naming Convention

Merge request discussion tools use `_discussion` rather than `_thread`, so that issue,
merge request and commit discussions share one consistent naming scheme. Three tools added
by the earlier MR discussion change were renamed accordingly:

| Previous name | Current name |
|---------------|--------------|
| `gitlab_create_merge_request_thread` | `gitlab_create_merge_request_discussion` |
| `gitlab_resolve_merge_request_thread` | `gitlab_resolve_merge_request_discussion` |
| `gitlab_create_merge_request_discussion_note` | `gitlab_add_merge_request_discussion_note` |

`gitlab_list_merge_request_discussions`, `gitlab_update_merge_request_discussion_note` and
`gitlab_delete_merge_request_discussion_note` kept their names. The renamed tools also gained
a sibling, `gitlab_get_merge_request_discussion`, for retrieving a single thread.
