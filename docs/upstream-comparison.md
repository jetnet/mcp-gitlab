# Upstream Comparison: mcp-gitlab vs zereight-gitlab-mcp

## Tool Count

| Metric | Count |
|--------|-------|
| This repo (before this change) | 117 tools |
| This repo (after this change) | 123 tools (+6 MR discussion/thread tools) |
| Upstream (zereight-gitlab-mcp tools/registry.ts) | 196 tools |
| Raw tool-count delta after this change | 73 tools |

The upstream repo covers a broader surface area of the GitLab API (draft notes, work items,
GraphQL endpoints, merge request versions, etc.). This repo does not claim to port all
remaining upstream API capabilities; the normalized comparison found about 130 missing
upstream capabilities before this scoped change and about 124 after adding these six tools.

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

## Scoped Changes in This Update

This change adds **MR Discussion/Thread Workflow Tools** — six new tools enabling AI review
loops over merge request discussions:

- `gitlab_list_merge_request_discussions` — list all threads on an MR
- `gitlab_create_merge_request_thread` — start a new thread (supports diff position)
- `gitlab_resolve_merge_request_thread` — resolve/unresolve a thread
- `gitlab_create_merge_request_discussion_note` — reply to an existing thread
- `gitlab_update_merge_request_discussion_note` — edit a thread reply
- `gitlab_delete_merge_request_discussion_note` — delete a thread reply

This change does **not** attempt to port all remaining API coverage differences between
the two repositories.
