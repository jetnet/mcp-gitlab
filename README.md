# GitLab MCP Server

A Model Context Protocol (MCP) server that enables you to interact with your GitLab account. Get diffs, analyze merge requests, review code, cherry-pick changes, and more. This is an extended version of the [MCP GitLab Server](https://github.com/modelcontextprotocol/servers/tree/main/src/gitlab) from the Model Context Protocol project.

<a href="https://glama.ai/mcp/servers/@rifqi96/mcp-gitlab">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@rifqi96/mcp-gitlab/badge" alt="GitLab Server MCP server" />
</a>

## Features

This MCP server provides comprehensive tools for interacting with GitLab repositories, including:

### Core Repository Features
- Listing projects and retrieving details
- Managing branches and repositories
- Working with merge requests and diffs
- Adding comments and internal notes to merge requests
- Updating merge request attributes
- Listing and working with issues
- Getting and comparing repository file contents

### Project Settings & Integrations
- Managing project integrations and services
- Configuring and controlling Slack integration
- Setting up, updating, and testing webhooks

### CI/CD Management
- Working with pipeline trigger tokens
- Managing CI/CD variables
- Triggering and controlling pipelines

### User & Group Administration
- Listing and managing users
- Working with groups and group memberships
- Managing project members and access levels

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm
- A GitLab account with an API token

### Setup

1. Clone the repository:

```bash
git clone https://github.com/rifqi96/mcp-gitlab.git
cd mcp-gitlab
```

2. Install dependencies:

```bash
npm install
```

3. Build the server:

```bash
npm run build
```

4. Install git hooks (optional, but recommended for contributors):

```bash
npm run install-hooks
```

This installs a pre-commit hook that automatically regenerates TOOLS.md when src/utils/tools-data.ts changes.

5. Configure your GitLab API token:

You need to provide your GitLab API token in the MCP settings configuration file. The token is used to authenticate with the GitLab API.

For Cursor/Roo Cline, add the following to your MCP settings file (`~/Library/Application Support/Cursor/User/globalStorage/rooveterinaryinc.roo-cline/settings/cline_mcp_settings.json`):

```json
{
  "mcpServers": {
    "gitlab": {
      "command": "node",
      "args": [
        "/path/to/mcp-gitlab/build/index.js"
      ],
      "env": {
        "GITLAB_API_TOKEN": "YOUR_GITLAB_API_TOKEN",
        "GITLAB_API_URL": "https://gitlab.com/api/v4"
      }
    }
  }
}
```

For Claude Desktop, add the following to your MCP settings file (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "gitlab": {
      "command": "node",
      "args": [
        "/path/to/mcp-gitlab/build/index.js"
      ],
      "env": {
        "GITLAB_API_TOKEN": "YOUR_GITLAB_API_TOKEN",
        "GITLAB_API_URL": "https://gitlab.com/api/v4"
      }
    }
  }
}
```

Replace `YOUR_GITLAB_API_TOKEN` with your actual GitLab API token. You can generate a token in your GitLab account under Settings > Access Tokens.

## Available Tools

For full parameter details, see [TOOLS.md](./TOOLS.md).

### Repository Management (14 tools)

| Tool | Description |
|------|-------------|
| `gitlab_list_projects` | List GitLab projects accessible to the user |
| `gitlab_get_project` | Get details of a specific project |
| `gitlab_list_branches` | List branches of a project |
| `gitlab_list_merge_requests` | List merge requests in a project |
| `gitlab_get_merge_request` | Get details of a specific merge request |
| `gitlab_get_merge_request_changes` | Get changes (diff) of a merge request |
| `gitlab_create_merge_request` | Create a new merge request |
| `gitlab_create_merge_request_note` | Add a comment to a merge request |
| `gitlab_create_merge_request_note_internal` | Add an internal note to a merge request |
| `gitlab_update_merge_request` | Update a merge request title and description |
| `gitlab_list_issues` | List issues in a project |
| `gitlab_get_repository_file` | Get content of a file in a repository |
| `gitlab_compare_branches` | Compare branches, tags or commits |
| `gitlab_list_project_members` | List members of a project |

### Integrations & Webhooks (8 tools)

| Tool | Description |
|------|-------------|
| `gitlab_list_integrations` | List all available project integrations/services |
| `gitlab_get_integration` | Get integration details for a project |
| `gitlab_update_slack_integration` | Update Slack integration settings |
| `gitlab_disable_slack_integration` | Disable Slack integration |
| `gitlab_list_webhooks` | List webhooks for a project |
| `gitlab_get_webhook` | Get details of a specific webhook |
| `gitlab_add_webhook` | Add a new webhook to a project |
| `gitlab_update_webhook` | Update an existing webhook |
| `gitlab_delete_webhook` | Delete a webhook |
| `gitlab_test_webhook` | Test a webhook |

### CI/CD Management (18 tools)

| Tool | Description |
|------|-------------|
| `gitlab_list_trigger_tokens` | List pipeline trigger tokens |
| `gitlab_get_trigger_token` | Get details of a trigger token |
| `gitlab_create_trigger_token` | Create a new trigger token |
| `gitlab_update_trigger_token` | Update a trigger token |
| `gitlab_delete_trigger_token` | Delete a trigger token |
| `gitlab_trigger_pipeline` | Trigger a pipeline run |
| `gitlab_list_cicd_variables` | List CI/CD variables for a project |
| `gitlab_get_cicd_variable` | Get a specific project CI/CD variable |
| `gitlab_create_cicd_variable` | Create a new project CI/CD variable |
| `gitlab_update_cicd_variable` | Update a project CI/CD variable |
| `gitlab_delete_cicd_variable` | Delete a project CI/CD variable |
| `gitlab_list_group_cicd_variables` | List CI/CD variables for a group |
| `gitlab_get_group_cicd_variable` | Get a specific group CI/CD variable |
| `gitlab_create_group_cicd_variable` | Create a new group CI/CD variable |
| `gitlab_update_group_cicd_variable` | Update a group CI/CD variable |
| `gitlab_delete_group_cicd_variable` | Delete a group CI/CD variable |

> CI/CD variable tools support all GitLab API parameters including `raw`, `masked`, `masked_and_hidden`, `description`, `variable_type`, `environment_scope`, and `filter`.

### User & Group Administration (6 tools)

| Tool | Description |
|------|-------------|
| `gitlab_list_users` | List GitLab users |
| `gitlab_get_user` | Get details of a specific user |
| `gitlab_list_groups` | List GitLab groups |
| `gitlab_get_group` | Get details of a specific group |
| `gitlab_list_group_members` | List members of a group |
| `gitlab_add_group_member` | Add a user to a group |
| `gitlab_add_project_member` | Add a user to a project |

## Example Usage

Here are examples of how to use these tools with AI assistants that support MCP:

### List your projects

```
Could you list my GitLab projects?
```

### Get information about a specific merge request

```
Can you show me the details of merge request with ID 123 in the project 'mygroup/myproject'?
```

### Add a comment to a merge request

```
Please add a comment to merge request 123 in project 'mygroup/myproject' saying "This looks good, but please add more tests."
```

### Add an internal note to a merge request

```
Add an internal note to merge request 123 in project 'mygroup/myproject' that says "Needs security review before merging." Make sure it's only visible to team members.
```

### Update a merge request title and description

```
Update the title of merge request 123 in project 'mygroup/myproject' to "Fix login page performance issues" and update the description to include "This PR addresses the slow loading times on the login page by optimizing database queries."
```

### Compare branches

```
Compare the 'feature-branch' with 'main' in the project 'mygroup/myproject' and show me the differences.
```

## Practical Workflows

### Reviewing a Merge Request

```
1. Show me merge request 123 in project 'mygroup/myproject'
2. Show me the changes for this merge request
3. Add an internal note with my review comments
4. Update the merge request title to better reflect the changes
```

### Project Exploration

```
1. List all my GitLab projects
2. Show me the details of project 'mygroup/myproject'
3. List all branches in this project
4. Show me the content of the README.md file in the main branch
```

## Available Resources

### gitlab://projects

List of GitLab projects accessible with your API token.

## Integration with AI Assistants

The GitLab MCP Server integrates with AI assistants that support the Model Context Protocol (MCP). 

### Capabilities

When connected to an AI assistant, this server enables the assistant to:

1. **View and analyze code**: The assistant can fetch file contents, view branch differences, and examine merge request changes for better code understanding.

2. **Provide code reviews**: The assistant can analyze merge requests and provide feedback through comments or internal notes.

3. **Manage project workflows**: The assistant can update merge request attributes, add comments, and help with repository management tasks.

4. **Explore project structure**: The assistant can browse projects, branches, and files to understand the codebase structure.

5. **Configure CI/CD and integrations**: The assistant can help set up webhooks, manage CI/CD variables, and configure project integrations.

### Getting the Most from AI Assistant Integration

- Be specific when asking about projects, merge requests, or files
- Provide project IDs or paths when possible
- Use the assistant for code review by asking it to analyze specific merge requests
- Have the assistant help with repository configuration and management tasks
- Use internal notes for team-only feedback on merge requests

## License

MIT