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

## Repository Management

### gitlab_list_projects

List GitLab projects accessible to the user

This tool does not require any parameters.

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
| `released_at` | `string` | No | The release date (ISO 8601 format) |

### gitlab_delete_release

Delete a release. Does not delete the associated tag. Requires at least Developer role.

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `tag_name` | `string` | Yes | The tag associated with the release to delete |

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

List all pipeline schedules for a project

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `scope` | `string` | No | Scope of pipeline schedules |
| `per_page` | `number` | No | Number of results per page (max 100) |
| `page` | `number` | No | Page number for pagination |

### gitlab_get_pipeline_schedule

Get details of a single pipeline schedule

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `pipeline_schedule_id` | `number` | Yes | The ID of the pipeline schedule |

### gitlab_create_pipeline_schedule

Create a new pipeline schedule for a project

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

Update an existing pipeline schedule

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

### gitlab_delete_cicd_variable

Delete a CI/CD variable

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `project_id` | `string` | Yes | The ID or URL-encoded path of the project |
| `key` | `string` | Yes | The key of the variable |
| `filter` | `object` | No | Filter by environment_scope when multiple variables share the same key |

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

### gitlab_delete_group_cicd_variable

Delete a CI/CD variable for a group

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `group_id` | `string` | Yes | The ID or URL-encoded path of the group |
| `key` | `string` | Yes | The key of the variable |
| `filter` | `object` | No | Filter by environment_scope when multiple variables share the same key |

## Runners

### gitlab_list_runners

List all runners available to the authenticated user

This tool does not require any parameters.

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

This tool does not require any parameters.

### gitlab_get_user

Get details of a specific user

**Parameters:**

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `user_id` | `number` | Yes | The ID of the user |

### gitlab_list_groups

List GitLab groups

This tool does not require any parameters.

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

---

Generated automatically from `src/utils/tools-data.ts`
