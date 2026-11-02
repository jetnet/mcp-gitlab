# GitLab MCP Server Tools

This document provides details on all available tools in the GitLab MCP server.

Each tool is designed to interact with GitLab APIs, allowing AI assistants to work with repositories, merge requests, issues, CI/CD pipelines, and more.

## Table of Contents

- [Repository Management](#repository-management)
- [Branch Management](#branch-management)
- [Commits, Tags & Releases](#commits,-tags-releases)
- [Issues & Tracking](#issues-tracking)
- [Wiki](#wiki)
- [Pipelines & Jobs](#pipelines-jobs)
- [CI/CD Variables & Triggers](#cicd-variables-triggers)
- [Runners](#runners)
- [Environments & Deployments](#environments-deployments)
- [Integrations & Webhooks](#integrations-webhooks)
- [User & Group Management](#user-group-management)
- [Other](#other)

## Repository Management

### gitlab_list_projects

List GitLab projects accessible to the user

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `search` | `string` | No | Search projects by name |
| `owned` | `boolean` | No | Limit to projects explicitly owned by the current user |
| `membership` | `boolean` | No | Limit to projects the current user is a member of |
| `per_page` | `number` | No | Number of projects to return per page (max 100) |

### gitlab_get_project

Get details of a specific GitLab project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |

### gitlab_list_merge_requests

List merge requests in a GitLab project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `state` | `string` | No | Return merge requests with specified state (opened, closed, locked, merged) |
| `scope` | `string` | No | Return merge requests for the specified scope (created_by_me, assigned_to_me, all) |

### gitlab_get_merge_request

Get details of a specific merge request

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |

### gitlab_get_merge_request_changes

Get changes (diff) of a specific merge request

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |

### gitlab_create_merge_request_note

Add a comment to a merge request

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `body` | `string` | Yes | The content of the note/comment |

### gitlab_create_merge_request_note_internal

Add a comment to a merge request with option to make it an internal note

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `body` | `string` | Yes | The content of the note/comment |
| `internal` | `boolean` | No | If true, the note will be marked as an internal note visible only to project members |

### gitlab_update_merge_request

Update a merge request title and description

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `title` | `string` | No | The title of the merge request |
| `description` | `string` | No | The description of the merge request |

### gitlab_create_merge_request

Create a new merge request in a GitLab project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `source_branch` | `string` | Yes | The source branch name |
| `target_branch` | `string` | Yes | The target branch name |
| `title` | `string` | Yes | The title of the merge request |
| `description` | `string` | No | The description of the merge request |
| `assignee_id` | `number` | No | The ID of the user to assign the merge request to |
| `labels` | `string` | No | Comma-separated list of labels |
| `remove_source_branch` | `boolean` | No | Whether to remove the source branch after merge |
| `squash` | `boolean` | No | Whether to squash commits when merging |

### gitlab_get_repository_file

Get content of a file in a repository

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `file_path` | `string` | Yes | Path of the file in the repository |
| `ref` | `string` | No | The name of branch, tag or commit |

### gitlab_compare_branches

Compare branches, tags or commits

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `from` | `string` | Yes | The commit SHA or branch name to compare from |
| `to` | `string` | Yes | The commit SHA or branch name to compare to |

### gitlab_list_project_members

List members of a project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |

### gitlab_add_project_member

Add a user to a project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `user_id` | `number` | Yes | The ID of the user |
| `access_level` | `number` | Yes | Access level (10=Guest, 20=Reporter, 30=Developer, 40=Maintainer, 50=Owner) |

### gitlab_list_repository_tree

List files and directories in a repository. Returns name, type (blob/tree), path, and mode.

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `path` | `string` | No | Path inside the repository to list (default: root) |
| `ref` | `string` | No | The branch name, tag, or commit SHA |
| `recursive` | `boolean` | No | If true, list files recursively |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_list_merge_request_commits

List commits included in a merge request

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |

### gitlab_get_merge_request_approvals

Get the approval state of a merge request including who approved and approval rules

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |

### gitlab_list_merge_request_notes

List all notes/comments on a merge request

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `sort` | `string` | No | Sort order: asc or desc |
| `order_by` | `string` | No | Order notes by created_at or updated_at |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_merge_merge_request

Accept and merge a merge request

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `merge_commit_message` | `string` | No | Custom merge commit message |
| `squash_commit_message` | `string` | No | Custom squash commit message |
| `squash` | `boolean` | No | If true, squash all commits into one |
| `should_remove_source_branch` | `boolean` | No | If true, remove the source branch after merge |
| `merge_when_pipeline_succeeds` | `boolean` | No | If true, merge when the pipeline succeeds |
| `sha` | `string` | No | Expected HEAD SHA of the source branch; merge fails if different |

### gitlab_search

Search across GitLab globally, within a group, or within a project. Supports searching projects, issues, merge_requests, milestones, snippet_titles, wiki_blobs, commits, blobs, notes, and users.

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `scope` | `string` | Yes | The scope to search in |
| `search` | `string` | Yes | The search query |
| `project_id` | `string` | No | Optional: scope search to a specific project |
| `group_id` | `string` | No | Optional: scope search to a specific group |

### gitlab_create_repository_file

Create a new file in a repository. The file content is committed to the specified branch.

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `file_path` | `string` | Yes | URL-encoded full path to the new file (e.g. lib%2Fclass%2Erb) |
| `branch` | `string` | Yes | Name of the branch to commit to |
| `content` | `string` | Yes | File content |
| `commit_message` | `string` | Yes | Commit message |
| `author_email` | `string` | No | Commit author email address |
| `author_name` | `string` | No | Commit author name |
| `encoding` | `string` | No | File encoding: text (default) or base64 |
| `start_branch` | `string` | No | Name of the base branch to create the new branch from |

### gitlab_update_repository_file

Update an existing file in a repository. The changes are committed to the specified branch.

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `file_path` | `string` | Yes | URL-encoded full path to the file |
| `branch` | `string` | Yes | Name of the branch to commit to |
| `content` | `string` | Yes | New file content |
| `commit_message` | `string` | Yes | Commit message |
| `author_email` | `string` | No | Commit author email address |
| `author_name` | `string` | No | Commit author name |
| `encoding` | `string` | No | File encoding: text (default) or base64 |
| `last_commit_id` | `string` | No | Last known file commit ID for optimistic locking |
| `start_branch` | `string` | No | Name of the base branch to create the new branch from |

### gitlab_delete_repository_file

Delete a file from a repository. The deletion is committed to the specified branch.

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `file_path` | `string` | Yes | URL-encoded full path to the file to delete |
| `branch` | `string` | Yes | Name of the branch to commit to |
| `commit_message` | `string` | Yes | Commit message |
| `author_email` | `string` | No | Commit author email address |
| `author_name` | `string` | No | Commit author name |
| `last_commit_id` | `string` | No | Last known file commit ID |
| `start_branch` | `string` | No | Name of the base branch |

### gitlab_approve_merge_request

Approve a merge request. Requires sufficient permissions.

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `sha` | `string` | No | The HEAD of the merge request. Optional safety check. |

### gitlab_unapprove_merge_request

Unapprove a previously approved merge request

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |

### gitlab_rebase_merge_request

Rebase the source branch of a merge request against its target branch

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `skip_ci` | `boolean` | No | Set to true to skip creating a CI pipeline |

### gitlab_list_project_runners

List all runners available in a project, including from ancestor groups and instance runners

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `type` | `string` | No | Type of runners to return |
| `status` | `string` | No | Status of runners to return |
| `paused` | `boolean` | No | Filter by paused state |
| `tag_list` | `string` | No | Comma-separated list of runner tags to filter by |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_merge_request_note

Retrieve a single note (comment) on a merge request

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `note_id` | `number` | Yes | The ID of the note |

### gitlab_update_merge_request_note

Edit the text of an existing note (comment) on a merge request

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `note_id` | `number` | Yes | The ID of the note to edit |
| `body` | `string` | Yes | The new content of the note. Limited to 1,000,000 characters |
| `confidential` | `boolean` | No | Deprecated. The confidential flag of the note |

### gitlab_delete_merge_request_note

Delete an existing note (comment) on a merge request

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `note_id` | `number` | Yes | The ID of the note to delete |

### gitlab_list_merge_request_discussions

List all discussion threads on a merge request, including diff threads and their resolved state

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_merge_request_discussion

Retrieve a single discussion thread on a merge request

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `discussion_id` | `string` | Yes | The ID of the discussion thread |

### gitlab_create_merge_request_discussion

Create a new discussion thread on a merge request, optionally anchored to a specific line in the diff via the position object

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `body` | `string` | Yes | The content of the thread |
| `commit_id` | `string` | No | SHA referencing the commit to start the thread on |
| `created_at` | `string` | No | ISO 8601 date time string (requires admin or owner rights) |
| `position` | `object` | No | Diff position for a code comment. Requires base_sha, head_sha, start_sha and position_type |
| `position.base_sha` | `string` | No | Base commit SHA in the source branch |
| `position.head_sha` | `string` | No | SHA referencing the HEAD of this merge request |
| `position.start_sha` | `string` | No | SHA referencing the commit in the target branch |
| `position.position_type` | `string` | No | Type of the position reference |
| `position.new_path` | `string` | No | File path after the change |
| `position.old_path` | `string` | No | File path before the change |
| `position.new_line` | `number` | No | Line number after the change (for added or unchanged lines) |
| `position.old_line` | `number` | No | Line number before the change (for removed or unchanged lines) |
| `position.line_range` | `object` | No | Line range for multiline comments, with start and end objects |
| `position.width` | `number` | No | For image diff notes, image width |
| `position.height` | `number` | No | For image diff notes, image height |
| `position.x` | `number` | No | For image diff notes, X coordinate |
| `position.y` | `number` | No | For image diff notes, Y coordinate |

### gitlab_resolve_merge_request_discussion

Resolve or reopen an entire discussion thread on a merge request

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `discussion_id` | `string` | Yes | The ID of the discussion thread |
| `resolved` | `boolean` | Yes | True to resolve the thread, false to reopen it |

### gitlab_add_merge_request_discussion_note

Add a reply note to an existing merge request discussion thread

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `discussion_id` | `string` | Yes | The ID of the discussion thread |
| `body` | `string` | Yes | The content of the reply |
| `created_at` | `string` | No | ISO 8601 date time string (requires admin or owner rights) |

### gitlab_update_merge_request_discussion_note

Edit the text of a note inside a merge request discussion thread, or resolve/unresolve that single note. Exactly one of body or resolved must be supplied

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `discussion_id` | `string` | Yes | The ID of the discussion thread |
| `note_id` | `number` | Yes | The ID of the thread note |
| `body` | `string` | No | The new content of the note. Mutually exclusive with resolved |
| `resolved` | `boolean` | No | Resolve or reopen the note. Mutually exclusive with body |

### gitlab_delete_merge_request_discussion_note

Delete a note from a merge request discussion thread

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `discussion_id` | `string` | Yes | The ID of the discussion thread |
| `note_id` | `number` | Yes | The ID of the thread note to delete |

## Branch Management

### gitlab_list_branches

List branches of a GitLab project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `search` | `string` | No | Search branches by name |

### gitlab_create_branch

Create a new branch in a repository

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `branch` | `string` | Yes | Name of the new branch |
| `ref` | `string` | Yes | Branch name or commit SHA to create the branch from |

### gitlab_delete_branch

Delete a branch from a repository. Cannot delete the default branch or protected branches.

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `branch` | `string` | Yes | Name of the branch to delete |

### gitlab_list_protected_branches

List protected branches of a project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `search` | `string` | No | Search for specific protected branches |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_protected_branch

Get details of a single protected branch

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `name` | `string` | Yes | Name of the protected branch |

### gitlab_protect_branch

Protect a repository branch. Sets access levels for push, merge, and unprotect.

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `name` | `string` | Yes | Name of the branch or wildcard pattern to protect |
| `push_access_level` | `number` | No | Access level for push (0=No access, 30=Developer, 40=Maintainer, 60=Admin) |
| `merge_access_level` | `number` | No | Access level for merge (0=No access, 30=Developer, 40=Maintainer, 60=Admin) |
| `unprotect_access_level` | `number` | No | Access level for unprotect (0=No access, 30=Developer, 40=Maintainer, 60=Admin) |
| `allow_force_push` | `boolean` | No | Allow force push to the branch |
| `code_owner_approval_required` | `boolean` | No | Require code owner approval (Premium/Ultimate) |

### gitlab_unprotect_branch

Unprotect a protected branch

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `name` | `string` | Yes | Name of the protected branch to unprotect |

## Commits, Tags & Releases

### gitlab_list_commits

List repository commits with optional filters by branch, date range, and path

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `ref_name` | `string` | No | Branch name, tag, or commit SHA to list commits for |
| `since` | `string` | No | Only commits after this date (ISO 8601 format) |
| `until` | `string` | No | Only commits before this date (ISO 8601 format) |
| `path` | `string` | No | Only commits affecting this file path |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_commit

Get details of a specific commit including diff stats and parent info

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `sha` | `string` | Yes | The commit SHA |

### gitlab_list_tags

List repository tags with optional search and ordering

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `search` | `string` | No | Search tags by name |
| `order_by` | `string` | No | Order by name, updated, or version |
| `sort` | `string` | No | Sort direction |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_tag

Get details of a specific tag including commit info and release notes

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `tag_name` | `string` | Yes | The name of the tag |

### gitlab_create_tag

Create a new tag in the repository

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `tag_name` | `string` | Yes | The name of the tag |
| `ref` | `string` | Yes | The branch name or commit SHA to create the tag from |
| `message` | `string` | No | Optional tag message (creates annotated tag) |

### gitlab_delete_tag

Delete a tag from the repository

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `tag_name` | `string` | Yes | The name of the tag |

### gitlab_list_releases

List releases for a project, ordered by released_at

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_release

Get details of a specific release by its tag name

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `tag_name` | `string` | Yes | The tag name of the release |

### gitlab_create_release

Create a new release for a project. Requires at least Developer role.

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `tag_name` | `string` | Yes | The tag where the release is created from |
| `name` | `string` | No | The release name |
| `description` | `string` | No | The description of the release (supports Markdown) |
| `ref` | `string` | No | If tag_name does not exist, the release is created from ref (commit SHA, branch name, or another tag) |
| `milestones` | `array` | No | Titles of milestones to associate with the release |
| `released_at` | `string` | No | The release date (ISO 8601 format) |

### gitlab_update_release

Update an existing release

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `tag_name` | `string` | Yes | The tag associated with the release |
| `name` | `string` | No | The new release name |
| `description` | `string` | No | The new description of the release (supports Markdown) |
| `milestones` | `array` | No | Titles of milestones to associate with the release |
| `released_at` | `string` | No | The release date (ISO 8601 format) |

### gitlab_delete_release

Delete a release. Does not delete the associated tag. Requires at least Developer role.

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `tag_name` | `string` | Yes | The tag associated with the release to delete |

### gitlab_list_commit_discussions

List all discussion threads on a commit

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `commit_id` | `string` | Yes | The SHA of the commit |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_commit_discussion

Retrieve a single discussion thread on a commit

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `commit_id` | `string` | Yes | The SHA of the commit |
| `discussion_id` | `string` | Yes | The ID of the discussion thread |

### gitlab_create_commit_discussion

Create a new discussion thread on a commit, optionally anchored to a diff position

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `commit_id` | `string` | Yes | The SHA of the commit |
| `body` | `string` | Yes | The content of the thread |
| `created_at` | `string` | No | ISO 8601 date time string (requires admin or owner rights) |
| `position` | `object` | No | Diff position for a code comment on the commit |
| `position.base_sha` | `string` | No | SHA of the parent commit |
| `position.head_sha` | `string` | No | SHA of this commit, same as commit_id |
| `position.start_sha` | `string` | No | SHA of the parent commit |
| `position.position_type` | `string` | No | Type of the position reference |
| `position.new_path` | `string` | No | File path after the change |
| `position.old_path` | `string` | No | File path before the change |
| `position.new_line` | `number` | No | Line number after the change |
| `position.old_line` | `number` | No | Line number before the change |
| `position.width` | `number` | No | For image diff notes, image width |
| `position.height` | `number` | No | For image diff notes, image height |
| `position.x` | `number` | No | For image diff notes, X coordinate |
| `position.y` | `number` | No | For image diff notes, Y coordinate |

### gitlab_add_commit_discussion_note

Add a reply note to an existing commit discussion thread

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `commit_id` | `string` | Yes | The SHA of the commit |
| `discussion_id` | `string` | Yes | The ID of the discussion thread |
| `body` | `string` | Yes | The content of the reply |
| `created_at` | `string` | No | ISO 8601 date time string (requires admin or owner rights) |

## Issues & Tracking

### gitlab_list_issues

List issues in a GitLab project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `state` | `string` | No | Return issues with specified state (opened, closed) |
| `labels` | `string` | No | Comma-separated list of label names |

### gitlab_get_issue

Get details of a specific issue

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `issue_iid` | `number` | Yes | The internal ID of the issue |

### gitlab_create_issue

Create a new issue in a project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `title` | `string` | Yes | The title of the issue |
| `description` | `string` | No | The description of the issue (supports Markdown) |
| `assignee_ids` | `array` | No | Array of user IDs to assign |
| `labels` | `string` | No | Comma-separated list of label names |
| `milestone_id` | `number` | No | The milestone ID to associate |
| `confidential` | `boolean` | No | Whether the issue is confidential |

### gitlab_update_issue

Update an existing issue

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `issue_iid` | `number` | Yes | The internal ID of the issue |
| `title` | `string` | No | New title |
| `description` | `string` | No | New description |
| `assignee_ids` | `array` | No | Array of user IDs to assign |
| `labels` | `string` | No | Comma-separated list of label names |
| `milestone_id` | `number` | No | The milestone ID to associate |
| `state_event` | `string` | No | State change event |
| `confidential` | `boolean` | No | Whether the issue is confidential |

### gitlab_delete_issue

Delete an issue (requires admin or owner permissions)

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `issue_iid` | `number` | Yes | The internal ID of the issue |

### gitlab_list_issue_notes

List notes/comments on an issue

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `issue_iid` | `number` | Yes | The internal ID of the issue |
| `sort` | `string` | No | Sort order: asc or desc |
| `order_by` | `string` | No | Order notes by created_at or updated_at |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_create_issue_note

Add a comment/note to an issue

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `issue_iid` | `number` | Yes | The internal ID of the issue |
| `body` | `string` | Yes | The content of the note/comment |
| `internal` | `boolean` | No | If true, creates an internal note (visible only to project members) |

### gitlab_list_labels

List project labels

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `search` | `string` | No | Search labels by name |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_list_milestones

List project milestones

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `state` | `string` | No | Filter by state |
| `search` | `string` | No | Search milestones by title |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_list_snippets

List project snippets

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_snippet

Get details of a specific project snippet

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `snippet_id` | `number` | Yes | The ID of the snippet |

### gitlab_get_issue_note

Retrieve a single note (comment) on an issue

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `issue_iid` | `number` | Yes | The internal ID of the issue |
| `note_id` | `number` | Yes | The ID of the note |

### gitlab_update_issue_note

Edit the text of an existing note (comment) on an issue

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `issue_iid` | `number` | Yes | The internal ID of the issue |
| `note_id` | `number` | Yes | The ID of the note to edit |
| `body` | `string` | Yes | The new content of the note. Limited to 1,000,000 characters |
| `confidential` | `boolean` | No | Deprecated. The confidential flag of the note |

### gitlab_delete_issue_note

Delete an existing note (comment) on an issue

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `issue_iid` | `number` | Yes | The internal ID of the issue |
| `note_id` | `number` | Yes | The ID of the note to delete |

### gitlab_list_snippet_notes

List all notes (comments) on a project snippet

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `snippet_id` | `number` | Yes | The ID of the snippet |
| `sort` | `string` | No | Sort order: asc or desc |
| `order_by` | `string` | No | Order notes by created_at or updated_at |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_snippet_note

Retrieve a single note (comment) on a project snippet

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `snippet_id` | `number` | Yes | The ID of the snippet |
| `note_id` | `number` | Yes | The ID of the note |

### gitlab_create_snippet_note

Add a note (comment) to a project snippet

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `snippet_id` | `number` | Yes | The ID of the snippet |
| `body` | `string` | Yes | The content of the note. Limited to 1,000,000 characters |
| `created_at` | `string` | No | ISO 8601 date time string (requires admin or owner rights) |

### gitlab_update_snippet_note

Edit the text of an existing note (comment) on a project snippet

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `snippet_id` | `number` | Yes | The ID of the snippet |
| `note_id` | `number` | Yes | The ID of the note to edit |
| `body` | `string` | Yes | The new content of the note |

### gitlab_delete_snippet_note

Delete an existing note (comment) on a project snippet

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `snippet_id` | `number` | Yes | The ID of the snippet |
| `note_id` | `number` | Yes | The ID of the note to delete |

### gitlab_list_issue_discussions

List all discussion threads on an issue, including all notes in each thread

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `issue_iid` | `number` | Yes | The internal ID of the issue |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_issue_discussion

Retrieve a single discussion thread on an issue

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `issue_iid` | `number` | Yes | The internal ID of the issue |
| `discussion_id` | `string` | Yes | The ID of the discussion thread |

### gitlab_create_issue_discussion

Create a new discussion thread on an issue. Unlike a plain note, replies can be added to it later

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `issue_iid` | `number` | Yes | The internal ID of the issue |
| `body` | `string` | Yes | The content of the thread |
| `created_at` | `string` | No | ISO 8601 date time string (requires admin or owner rights) |

### gitlab_add_issue_discussion_note

Add a reply note to an existing issue discussion thread

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `issue_iid` | `number` | Yes | The internal ID of the issue |
| `discussion_id` | `string` | Yes | The ID of the discussion thread |
| `body` | `string` | Yes | The content of the reply |
| `created_at` | `string` | No | ISO 8601 date time string (requires admin or owner rights) |

### gitlab_update_issue_discussion_note

Edit the text of an existing note inside an issue discussion thread

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `issue_iid` | `number` | Yes | The internal ID of the issue |
| `discussion_id` | `string` | Yes | The ID of the discussion thread |
| `note_id` | `number` | Yes | The ID of the thread note to edit |
| `body` | `string` | Yes | The new content of the note |

### gitlab_delete_issue_discussion_note

Delete a note from an issue discussion thread

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `issue_iid` | `number` | Yes | The internal ID of the issue |
| `discussion_id` | `string` | Yes | The ID of the discussion thread |
| `note_id` | `number` | Yes | The ID of the thread note to delete |

## Wiki

### gitlab_list_wiki_pages

List all wiki pages for a project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `with_content` | `boolean` | No | Include wiki page content in the response |

### gitlab_get_wiki_page

Get a specific wiki page by its slug

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `slug` | `string` | Yes | URL-encoded slug of the wiki page (e.g. dir%2Fpage_name) |
| `render_html` | `boolean` | No | Return rendered HTML of the wiki page |
| `version` | `string` | No | Wiki page version SHA |

### gitlab_create_wiki_page

Create a new wiki page for a project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `title` | `string` | Yes | Title of the wiki page |
| `content` | `string` | Yes | Content of the wiki page |
| `format` | `string` | No | Format of the wiki page |

### gitlab_update_wiki_page

Update an existing wiki page

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `slug` | `string` | Yes | URL-encoded slug of the wiki page |
| `title` | `string` | No | New title of the wiki page |
| `content` | `string` | No | New content of the wiki page |
| `format` | `string` | No | Format of the wiki page |

### gitlab_delete_wiki_page

Delete a wiki page

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `slug` | `string` | Yes | URL-encoded slug of the wiki page to delete |

### gitlab_list_wiki_page_notes

List all notes (comments) on a project wiki page. Requires GitLab 17.9 or later

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `wiki_page_meta_id` | `number` | Yes | The ID of the wiki page meta record |
| `sort` | `string` | No | Sort order: asc or desc |
| `order_by` | `string` | No | Order notes by created_at or updated_at |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_wiki_page_note

Retrieve a single note (comment) on a project wiki page. Requires GitLab 17.9 or later

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `wiki_page_meta_id` | `number` | Yes | The ID of the wiki page meta record |
| `note_id` | `number` | Yes | The ID of the note |

### gitlab_create_wiki_page_note

Add a note (comment) to a project wiki page. Requires GitLab 17.9 or later

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `wiki_page_meta_id` | `number` | Yes | The ID of the wiki page meta record |
| `body` | `string` | Yes | The content of the note. Limited to 1,000,000 characters |
| `internal` | `boolean` | No | If true, the note is internal and visible only to project members |

### gitlab_update_wiki_page_note

Edit the text of an existing note (comment) on a project wiki page. Requires GitLab 17.9 or later

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `wiki_page_meta_id` | `number` | Yes | The ID of the wiki page meta record |
| `note_id` | `number` | Yes | The ID of the note to edit |
| `body` | `string` | Yes | The new content of the note |

### gitlab_delete_wiki_page_note

Delete an existing note (comment) on a project wiki page. Requires GitLab 17.9 or later

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `wiki_page_meta_id` | `number` | Yes | The ID of the wiki page meta record |
| `note_id` | `number` | Yes | The ID of the note to delete |

## Pipelines & Jobs

### gitlab_trigger_pipeline

Trigger a pipeline run

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `ref` | `string` | Yes | The branch or tag name to run the pipeline for |
| `token` | `string` | Yes | The trigger token |
| `variables` | `object` | No | Variables to pass to the pipeline |

### gitlab_list_pipelines

List pipelines in a GitLab project. Returns pipeline ID, status, ref, SHA, and timestamps.

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `status` | `string` | No | Filter by status |
| `ref` | `string` | No | Filter by branch or tag name |
| `source` | `string` | No | Filter by pipeline source (push, web, trigger, schedule, api, merge_request_event, etc.) |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_pipeline

Get details of a specific pipeline including status, duration, coverage, and user info

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `pipeline_id` | `number` | Yes | The ID of the pipeline |

### gitlab_create_pipeline

Create a new pipeline for a branch or tag

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `ref` | `string` | Yes | The branch or tag name to create the pipeline for |
| `variables` | `array` | No | Array of variables for the pipeline |

### gitlab_cancel_pipeline

Cancel all running/pending jobs in a pipeline

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `pipeline_id` | `number` | Yes | The ID of the pipeline |

### gitlab_retry_pipeline

Retry all failed jobs in a pipeline

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `pipeline_id` | `number` | Yes | The ID of the pipeline |

### gitlab_delete_pipeline

Delete a pipeline and all its jobs

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `pipeline_id` | `number` | Yes | The ID of the pipeline |

### gitlab_list_pipeline_jobs

List jobs for a specific pipeline. Returns job name, status, stage, duration, and runner info.

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `pipeline_id` | `number` | Yes | The ID of the pipeline |
| `scope` | `string` | No | Filter by job scope |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_job

Get details of a single job including status, stage, duration, artifacts, and runner info

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `job_id` | `number` | Yes | The ID of the job |

### gitlab_get_job_log

Get the log (trace) output of a specific job. Returns the raw text log of the job execution.

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `job_id` | `number` | Yes | The ID of the job |

### gitlab_cancel_job

Cancel a running job

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `job_id` | `number` | Yes | The ID of the job |

### gitlab_retry_job

Retry a failed or cancelled job

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `job_id` | `number` | Yes | The ID of the job |

### gitlab_list_pipeline_bridges

List bridge jobs (downstream pipeline triggers) for a pipeline

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `pipeline_id` | `number` | Yes | The ID of the pipeline |
| `scope` | `string` | No | Filter by job scope |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_list_pipeline_schedules

List all pipeline schedules for a project. Warning: schedule variables values are returned as-is; schedule variables carry no masked flag, so masked-variable redaction does not apply to them

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `scope` | `string` | No | Scope of pipeline schedules |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_pipeline_schedule

Get details of a single pipeline schedule. Warning: schedule variables values are returned as-is; schedule variables carry no masked flag, so masked-variable redaction does not apply to them

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `pipeline_schedule_id` | `number` | Yes | The ID of the pipeline schedule |

### gitlab_create_pipeline_schedule

Create a new pipeline schedule for a project. Note: the response may include schedule variables whose values are returned as-is; schedule variables carry no masked flag, so masked-variable redaction does not apply to them

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `description` | `string` | Yes | Description of the pipeline schedule |
| `ref` | `string` | Yes | Branch or tag name that triggers the pipeline |
| `cron` | `string` | Yes | Cron schedule expression (e.g.  |
| `cron_timezone` | `string` | No | Timezone for the cron schedule (default: UTC) |
| `active` | `boolean` | No | Whether the schedule is active (default: true) |

### gitlab_update_pipeline_schedule

Update an existing pipeline schedule. Note: the response may include schedule variables whose values are returned as-is; schedule variables carry no masked flag, so masked-variable redaction does not apply to them

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `pipeline_schedule_id` | `number` | Yes | The ID of the pipeline schedule |
| `description` | `string` | No | Description of the pipeline schedule |
| `ref` | `string` | No | Branch or tag name that triggers the pipeline |
| `cron` | `string` | No | Cron schedule expression |
| `cron_timezone` | `string` | No | Timezone for the cron schedule |
| `active` | `boolean` | No | Whether the schedule is active |

### gitlab_delete_pipeline_schedule

Delete a pipeline schedule

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `pipeline_schedule_id` | `number` | Yes | The ID of the pipeline schedule |

### gitlab_run_pipeline_schedule

Run a pipeline schedule immediately. The next scheduled run is not affected.

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `pipeline_schedule_id` | `number` | Yes | The ID of the pipeline schedule |

### gitlab_get_job_artifacts

Get job artifacts information including download URL, artifact files, and expiration details

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `job_id` | `number` | Yes | The ID of the job |

## CI/CD Variables & Triggers

### gitlab_list_trigger_tokens

List pipeline trigger tokens

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |

### gitlab_get_trigger_token

Get details of a pipeline trigger token

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `trigger_id` | `number` | Yes | The ID of the trigger |

### gitlab_create_trigger_token

Create a new pipeline trigger token

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `description` | `string` | Yes | The trigger description |

### gitlab_update_trigger_token

Update a pipeline trigger token

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `trigger_id` | `number` | Yes | The ID of the trigger |
| `description` | `string` | Yes | The new trigger description |

### gitlab_delete_trigger_token

Delete a pipeline trigger token

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `trigger_id` | `number` | Yes | The ID of the trigger |

### gitlab_list_cicd_variables

List CI/CD variables for a project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |

### gitlab_get_cicd_variable

Get a specific CI/CD variable

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `key` | `string` | Yes | The key of the variable |
| `filter` | `object` | No | Filter by environment_scope when multiple variables share the same key |
| `filter.environment_scope` | `string` | No | The environment scope to filter by |

### gitlab_create_cicd_variable

Create a new CI/CD variable

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `key` | `string` | Yes | The key of the variable |
| `value` | `string` | Yes | The value of the variable |
| `protected` | `boolean` | No | Whether the variable is protected |
| `masked` | `boolean` | No | Whether the variable is masked |
| `masked_and_hidden` | `boolean` | No | Whether the variable is masked and hidden. Default: false |
| `raw` | `boolean` | No | Whether the variable is treated as a raw string. When true, variables in the value are not expanded. Default: false |
| `description` | `string` | No | The description of the variable (max 255 characters) |
| `variable_type` | `string` | No | The type of the variable: env_var (default) or file |
| `environment_scope` | `string` | No | The environment scope of the variable. Default: * |

### gitlab_update_cicd_variable

Update a CI/CD variable

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `key` | `string` | Yes | The key of the variable |
| `value` | `string` | Yes | The value of the variable |
| `protected` | `boolean` | No | Whether the variable is protected |
| `masked` | `boolean` | No | Whether the variable is masked |
| `raw` | `boolean` | No | Whether the variable is treated as a raw string. When true, variables in the value are not expanded. Default: false |
| `description` | `string` | No | The description of the variable (max 255 characters) |
| `variable_type` | `string` | No | The type of the variable: env_var (default) or file |
| `environment_scope` | `string` | No | The environment scope of the variable |
| `filter` | `object` | No | Filter by environment_scope when multiple variables share the same key |
| `filter.environment_scope` | `string` | No | The environment scope to filter by |

### gitlab_delete_cicd_variable

Delete a CI/CD variable

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `key` | `string` | Yes | The key of the variable |
| `filter` | `object` | No | Filter by environment_scope when multiple variables share the same key |
| `filter.environment_scope` | `string` | No | The environment scope to filter by |

### gitlab_list_group_cicd_variables

List CI/CD variables for a group

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `group_id` | `string` | Yes | The ID or URL-encoded path of the group |

### gitlab_get_group_cicd_variable

Get a specific CI/CD variable for a group

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `group_id` | `string` | Yes | The ID or URL-encoded path of the group |
| `key` | `string` | Yes | The key of the variable |
| `filter` | `object` | No | Filter by environment_scope when multiple variables share the same key |
| `filter.environment_scope` | `string` | No | The environment scope to filter by |

### gitlab_create_group_cicd_variable

Create a new CI/CD variable for a group

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `group_id` | `string` | Yes | The ID or URL-encoded path of the group |
| `key` | `string` | Yes | The key of the variable |
| `value` | `string` | Yes | The value of the variable |
| `protected` | `boolean` | No | Whether the variable is protected |
| `masked` | `boolean` | No | Whether the variable is masked |
| `masked_and_hidden` | `boolean` | No | Whether the variable is masked and hidden. Default: false |
| `raw` | `boolean` | No | Whether the variable is treated as a raw string. When true, variables in the value are not expanded. Default: false |
| `description` | `string` | No | The description of the variable (max 255 characters) |
| `variable_type` | `string` | No | The type of the variable: env_var (default) or file |
| `environment_scope` | `string` | No | The environment scope of the variable. Premium and Ultimate only |

### gitlab_update_group_cicd_variable

Update a CI/CD variable for a group

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `group_id` | `string` | Yes | The ID or URL-encoded path of the group |
| `key` | `string` | Yes | The key of the variable |
| `value` | `string` | Yes | The value of the variable |
| `protected` | `boolean` | No | Whether the variable is protected |
| `masked` | `boolean` | No | Whether the variable is masked |
| `raw` | `boolean` | No | Whether the variable is treated as a raw string. When true, variables in the value are not expanded. Default: false |
| `description` | `string` | No | The description of the variable (max 255 characters) |
| `variable_type` | `string` | No | The type of the variable: env_var (default) or file |
| `environment_scope` | `string` | No | The environment scope of the variable. Premium and Ultimate only |
| `filter` | `object` | No | Filter by environment_scope when multiple variables share the same key |
| `filter.environment_scope` | `string` | No | The environment scope to filter by |

### gitlab_delete_group_cicd_variable

Delete a CI/CD variable for a group

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `group_id` | `string` | Yes | The ID or URL-encoded path of the group |
| `key` | `string` | Yes | The key of the variable |
| `filter` | `object` | No | Filter by environment_scope when multiple variables share the same key |
| `filter.environment_scope` | `string` | No | The environment scope to filter by |

## Runners

### gitlab_list_runners

List all runners available to the authenticated user

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `type` | `string` | No | Type of runners to return |
| `status` | `string` | No | Status of runners to return |
| `paused` | `boolean` | No | Filter by paused state |
| `tag_list` | `string` | No | Comma-separated list of runner tags to filter by |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_runner

Get details of a specific runner

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `runner_id` | `number` | Yes | The ID of the runner |

## Environments & Deployments

### gitlab_list_environments

List environments for a project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `name` | `string` | No | Filter by exact environment name |
| `search` | `string` | No | Search environments by name |
| `states` | `string` | No | Filter by state |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_environment

Get details of a specific environment including last deployment info

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `environment_id` | `number` | Yes | The ID of the environment |

### gitlab_list_deployments

List deployments for a project with optional filters

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `environment` | `string` | No | Filter by environment name |
| `status` | `string` | No | Filter by deployment status |
| `order_by` | `string` | No | Order by field |
| `sort` | `string` | No | Sort direction |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_deployment

Get details of a specific deployment

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `deployment_id` | `number` | Yes | The ID of the deployment |

## Integrations & Webhooks

### gitlab_list_integrations

List all available project integrations/services

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |

### gitlab_get_integration

Get integration details for a project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `integration` | `string` | Yes | The name of the integration (e.g., slack) |

### gitlab_update_slack_integration

Update Slack integration settings for a project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `webhook` | `string` | Yes | The Slack webhook URL |
| `username` | `string` | No | The Slack username |
| `channel` | `string` | No | The Slack channel name |

### gitlab_disable_slack_integration

Disable Slack integration for a project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |

### gitlab_list_webhooks

List webhooks for a project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |

### gitlab_get_webhook

Get details of a specific webhook

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `webhook_id` | `number` | Yes | The ID of the webhook |

### gitlab_add_webhook

Add a new webhook to a project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `url` | `string` | Yes | The webhook URL |
| `token` | `string` | No | Secret token to validate received payloads |
| `push_events` | `boolean` | No | Trigger webhook for push events |
| `issues_events` | `boolean` | No | Trigger webhook for issues events |
| `merge_requests_events` | `boolean` | No | Trigger webhook for merge request events |
| `enable_ssl_verification` | `boolean` | No | Enable SSL verification for the webhook |

### gitlab_update_webhook

Update an existing webhook

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `webhook_id` | `number` | Yes | The ID of the webhook |
| `url` | `string` | Yes | The webhook URL |
| `token` | `string` | No | Secret token to validate received payloads |
| `push_events` | `boolean` | No | Trigger webhook for push events |
| `issues_events` | `boolean` | No | Trigger webhook for issues events |
| `merge_requests_events` | `boolean` | No | Trigger webhook for merge request events |
| `enable_ssl_verification` | `boolean` | No | Enable SSL verification for the webhook |

### gitlab_delete_webhook

Delete a webhook

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `webhook_id` | `number` | Yes | The ID of the webhook |

### gitlab_test_webhook

Test a webhook

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `webhook_id` | `number` | Yes | The ID of the webhook |

## User & Group Management

### gitlab_list_users

List GitLab users

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `search` | `string` | No | Search users by username, name or email |
| `active` | `boolean` | No | Filter users by active status |

### gitlab_get_user

Get details of a specific user

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `user_id` | `number` | Yes | The ID of the user |

### gitlab_list_groups

List GitLab groups

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `search` | `string` | No | Search groups by name |
| `owned` | `boolean` | No | Limit to groups explicitly owned by the current user |

### gitlab_get_group

Get details of a specific group

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `group_id` | `string` | Yes | The ID or URL-encoded path of the group |

### gitlab_list_group_members

List members of a group

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `group_id` | `string` | Yes | The ID or URL-encoded path of the group |

### gitlab_add_group_member

Add a user to a group

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `group_id` | `string` | Yes | The ID or URL-encoded path of the group |
| `user_id` | `number` | Yes | The ID of the user |
| `access_level` | `number` | Yes | Access level (10=Guest, 20=Reporter, 30=Developer, 40=Maintainer, 50=Owner) |

## Other

### gitlab_list_epic_notes

List all notes (comments) on a group epic

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `group_id` | `string` | Yes | The ID or URL-encoded path of the group |
| `epic_id` | `number` | Yes | The ID of the epic |
| `sort` | `string` | No | Sort order: asc or desc |
| `order_by` | `string` | No | Order notes by created_at or updated_at |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_epic_note

Retrieve a single note (comment) on a group epic

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `group_id` | `string` | Yes | The ID or URL-encoded path of the group |
| `epic_id` | `number` | Yes | The ID of the epic |
| `note_id` | `number` | Yes | The ID of the note |

### gitlab_create_epic_note

Add a note (comment) to a group epic

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `group_id` | `string` | Yes | The ID or URL-encoded path of the group |
| `epic_id` | `number` | Yes | The ID of the epic |
| `body` | `string` | Yes | The content of the note. Limited to 1,000,000 characters |
| `confidential` | `boolean` | No | Deprecated. The confidential flag of the note |
| `created_at` | `string` | No | ISO 8601 date time string, e.g. 2016-03-11T03:45:40Z (requires admin or owner rights) |

### gitlab_update_epic_note

Edit the text of an existing note (comment) on a group epic

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `group_id` | `string` | Yes | The ID or URL-encoded path of the group |
| `epic_id` | `number` | Yes | The ID of the epic |
| `note_id` | `number` | Yes | The ID of the note to edit |
| `body` | `string` | Yes | The new content of the note |

### gitlab_delete_epic_note

Delete an existing note (comment) on a group epic

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `group_id` | `string` | Yes | The ID or URL-encoded path of the group |
| `epic_id` | `number` | Yes | The ID of the epic |
| `note_id` | `number` | Yes | The ID of the note to delete |

### gitlab_list_draft_notes

List all unpublished draft notes on a merge request

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |

### gitlab_get_draft_note

Retrieve a single unpublished draft note on a merge request

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `draft_note_id` | `number` | Yes | The ID of the draft note |

### gitlab_create_draft_note

Create an unpublished draft note on a merge request, for batching review comments before publishing

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `note` | `string` | Yes | The content of the draft note |
| `in_reply_to_discussion_id` | `string` | No | The ID of a thread this draft note replies to |
| `resolve_discussion` | `boolean` | No | If true, resolve the thread referenced by in_reply_to_discussion_id when published |
| `commit_id` | `string` | No | SHA referencing the commit to start the thread on |
| `position` | `object` | No | Diff position for a code comment |
| `position.base_sha` | `string` | No | Base commit SHA in the source branch |
| `position.head_sha` | `string` | No | SHA referencing the HEAD of this merge request |
| `position.start_sha` | `string` | No | SHA referencing the commit in the target branch |
| `position.position_type` | `string` | No | Type of the position reference |
| `position.new_path` | `string` | No | File path after the change |
| `position.old_path` | `string` | No | File path before the change |
| `position.new_line` | `number` | No | Line number after the change |
| `position.old_line` | `number` | No | Line number before the change |
| `position.line_range` | `object` | No | Line range for multiline comments |

### gitlab_update_draft_note

Edit an existing unpublished draft note on a merge request

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `draft_note_id` | `number` | Yes | The ID of the draft note to edit |
| `note` | `string` | No | The new content of the draft note |
| `position` | `object` | No | Updated diff position for the draft note |

### gitlab_delete_draft_note

Delete an unpublished draft note on a merge request

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `draft_note_id` | `number` | Yes | The ID of the draft note to delete |

### gitlab_publish_draft_note

Publish a single draft note on a merge request, turning it into a visible comment

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `draft_note_id` | `number` | Yes | The ID of the draft note to publish |

### gitlab_bulk_publish_draft_notes

Publish all pending draft notes on a merge request that belong to the current user, optionally with a summary note and review state

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `merge_request_iid` | `number` | Yes | The internal ID of the merge request |
| `note` | `string` | No | Text of a summary note to add to the merge request |
| `internal` | `boolean` | No | If true, the summary note is internal |
| `reviewer_state` | `string` | No | Sets the review state after publishing. Does not record a formal approval |

---

Generated automatically from `src/utils/tools-data.ts`
