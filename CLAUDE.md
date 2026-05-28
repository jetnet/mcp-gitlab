# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a GitLab MCP (Model Context Protocol) server that enables AI assistants to interact with GitLab repositories. It provides tools for repository management, merge requests, CI/CD, integrations, and user/group administration.

## Build and Development Commands

```bash
# Install dependencies
npm install

# Build the TypeScript server
npm run build

# Watch mode for development (recompiles on changes)
npm run watch

# Run MCP inspector for debugging
npm run inspector

# Install git hooks (generates TOOLS.md when tools-data.ts changes)
npm run install-hooks
```

## Architecture

### Core Components

- **Entry Point** (`src/index.ts`): `GitLabServer` class initializes the MCP server, sets up request handlers, and manages the Axios instance for GitLab API communication.

- **Tool Definitions** (`src/utils/tools-data.ts`): Contains all tool definitions with input schemas. This is the source of truth for available tools. When modified, run `node scripts/generate-tools-md.js` to update TOOLS.md.

- **Tool Registry** (`src/utils/tool-registry.ts`): Maps tool names to their handler functions. Each tool is registered with a corresponding handler.

- **Handler Types** (`src/utils/handler-types.ts`): Defines `HandlerContext` interface (axios instance + domain managers) and `ToolHandler` type signature.

### Domain Organization

The codebase is organized by GitLab API domains:

1. **Repository** (`src/handlers/repository-handlers.ts`): Projects, merge requests, issues, file read, search
2. **Repository Extended** (`src/handlers/repository-extended-handlers.ts`): Commits, tags, releases (CRUD), tree, MR commits
3. **Repository Files** (`src/handlers/repository-files-handlers.ts`): File create, update, delete
4. **Branch** (`src/handlers/branch-handlers.ts`): Branch create, delete
5. **Protected Branches** (`src/handlers/protected-branch-handlers.ts`): List, protect, unprotect
6. **Merge Request Extended** (`src/handlers/merge-request-extended-handlers.ts`): Approve, unapprove, rebase
7. **Issues Extended** (`src/handlers/issues-extended-handlers.ts`): Issue CRUD, notes, labels, milestones, snippets
8. **Wiki** (`src/handlers/wiki-handlers.ts`): Wiki page CRUD
9. **Pipelines** (`src/handlers/pipeline-handlers.ts`): Pipeline CRUD, jobs, bridges, artifacts
10. **Pipeline Schedules** (`src/handlers/pipeline-schedule-handlers.ts`): Schedule CRUD, run
11. **Runners** (`src/handlers/runner-handlers.ts`): List runners (global, project)
12. **Integrations** (`src/handlers/integration-handlers.ts`): Webhooks, Slack integration
13. **CI/CD** (`src/handlers/cicd-handlers.ts`): Pipeline triggers, CI/CD variables
14. **Environments** (`src/handlers/environments-handlers.ts`): Environments, deployments
15. **Users/Groups** (`src/handlers/users-groups-handlers.ts`): User and group management

### Manager Classes

Domain logic is encapsulated in manager classes instantiated in `GitLabServer`:

- `IntegrationsManager` (`src/integrations.ts`)
- `CiCdManager` (`src/ci-cd.ts`)
- `UsersGroupsManager` (`src/users-groups.ts`)

### Handler Pattern

All handlers follow the same pattern:

```typescript
export const handlerName: ToolHandler = async (params, context) => {
  const { param1, param2 } = params.arguments || {};
  // Validate required params
  if (!param1) {
    throw new McpError(ErrorCode.InvalidParams, 'param1 is required');
  }
  // Make API call via context.axiosInstance
  const response = await context.axiosInstance.get('/endpoint');
  return formatResponse(response.data);
};
```

## Environment Variables

- `GITLAB_API_TOKEN` (required): GitLab API token for authentication
- `GITLAB_API_URL` (optional): GitLab API URL (defaults to `https://gitlab.com/api/v4`)

## Adding a New Tool

1. Add tool definition to `src/utils/tools-data.ts` with name, description, and inputSchema
2. Create handler in appropriate `src/handlers/*.ts` file
3. Register handler in `src/utils/tool-registry.ts`
4. Run `node scripts/generate-tools-md.js` to update TOOLS.md

## Git Hooks

A pre-commit hook automatically regenerates `TOOLS.md` when `src/utils/tools-data.ts` changes. Install with `npm run install-hooks`.