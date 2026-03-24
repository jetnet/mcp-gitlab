/**
 * Tool definitions for GitLab MCP Server
 */

export const toolDefinitions = [
  // Repository tools
  {
    name: 'gitlab_list_projects',
    description: 'List GitLab projects accessible to the user',
    inputSchema: {
      type: 'object',
      properties: {
        search: {
          type: 'string',
          description: 'Search projects by name'
        },
        owned: {
          type: 'boolean',
          description: 'Limit to projects explicitly owned by the current user'
        },
        membership: {
          type: 'boolean',
          description: 'Limit to projects the current user is a member of'
        },
        per_page: {
          type: 'number',
          description: 'Number of projects to return per page (max 100)'
        }
      }
    }
  },
  {
    name: 'gitlab_get_project',
    description: 'Get details of a specific GitLab project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_list_branches',
    description: 'List branches of a GitLab project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        search: {
          type: 'string',
          description: 'Search branches by name'
        }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_list_merge_requests',
    description: 'List merge requests in a GitLab project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        state: {
          type: 'string',
          description: 'Return merge requests with specified state (opened, closed, locked, merged)',
          enum: ['opened', 'closed', 'locked', 'merged']
        },
        scope: {
          type: 'string',
          description: 'Return merge requests for the specified scope (created_by_me, assigned_to_me, all)',
          enum: ['created_by_me', 'assigned_to_me', 'all']
        }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_get_merge_request',
    description: 'Get details of a specific merge request',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        merge_request_iid: {
          type: 'number',
          description: 'The internal ID of the merge request'
        }
      },
      required: ['project_id', 'merge_request_iid']
    }
  },
  {
    name: 'gitlab_get_merge_request_changes',
    description: 'Get changes (diff) of a specific merge request',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        merge_request_iid: {
          type: 'number',
          description: 'The internal ID of the merge request'
        }
      },
      required: ['project_id', 'merge_request_iid']
    }
  },
  {
    name: 'gitlab_create_merge_request_note',
    description: 'Add a comment to a merge request',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        merge_request_iid: {
          type: 'number',
          description: 'The internal ID of the merge request'
        },
        body: {
          type: 'string',
          description: 'The content of the note/comment'
        }
      },
      required: ['project_id', 'merge_request_iid', 'body']
    }
  },
  {
    name: 'gitlab_create_merge_request_note_internal',
    description: 'Add a comment to a merge request with option to make it an internal note',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        merge_request_iid: {
          type: 'number',
          description: 'The internal ID of the merge request'
        },
        body: {
          type: 'string',
          description: 'The content of the note/comment'
        },
        internal: {
          type: 'boolean',
          description: 'If true, the note will be marked as an internal note visible only to project members'
        }
      },
      required: ['project_id', 'merge_request_iid', 'body']
    }
  },
  {
    name: 'gitlab_update_merge_request',
    description: 'Update a merge request title and description',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        merge_request_iid: {
          type: 'number',
          description: 'The internal ID of the merge request'
        },
        title: {
          type: 'string',
          description: 'The title of the merge request'
        },
        description: {
          type: 'string',
          description: 'The description of the merge request'
        }
      },
      required: ['project_id', 'merge_request_iid']
    }
  },
  {
    name: 'gitlab_create_merge_request',
    description: 'Create a new merge request in a GitLab project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        source_branch: {
          type: 'string',
          description: 'The source branch name'
        },
        target_branch: {
          type: 'string',
          description: 'The target branch name'
        },
        title: {
          type: 'string',
          description: 'The title of the merge request'
        },
        description: {
          type: 'string',
          description: 'The description of the merge request'
        },
        assignee_id: {
          type: 'number',
          description: 'The ID of the user to assign the merge request to'
        },
        labels: {
          type: 'string',
          description: 'Comma-separated list of labels'
        },
        remove_source_branch: {
          type: 'boolean',
          description: 'Whether to remove the source branch after merge'
        },
        squash: {
          type: 'boolean',
          description: 'Whether to squash commits when merging'
        }
      },
      required: ['project_id', 'source_branch', 'target_branch', 'title']
    }
  },
  {
    name: 'gitlab_list_issues',
    description: 'List issues in a GitLab project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        state: {
          type: 'string',
          description: 'Return issues with specified state (opened, closed)',
          enum: ['opened', 'closed']
        },
        labels: {
          type: 'string',
          description: 'Comma-separated list of label names'
        }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_get_repository_file',
    description: 'Get content of a file in a repository',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        file_path: {
          type: 'string',
          description: 'Path of the file in the repository'
        },
        ref: {
          type: 'string',
          description: 'The name of branch, tag or commit'
        }
      },
      required: ['project_id', 'file_path']
    }
  },
  {
    name: 'gitlab_compare_branches',
    description: 'Compare branches, tags or commits',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        from: {
          type: 'string',
          description: 'The commit SHA or branch name to compare from'
        },
        to: {
          type: 'string',
          description: 'The commit SHA or branch name to compare to'
        }
      },
      required: ['project_id', 'from', 'to']
    }
  },
  
  // Integration tools
  {
    name: 'gitlab_list_integrations',
    description: 'List all available project integrations/services',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_get_integration',
    description: 'Get integration details for a project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        integration: {
          type: 'string',
          description: 'The name of the integration (e.g., slack)'
        }
      },
      required: ['project_id', 'integration']
    }
  },
  {
    name: 'gitlab_update_slack_integration',
    description: 'Update Slack integration settings for a project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        webhook: {
          type: 'string',
          description: 'The Slack webhook URL'
        },
        username: {
          type: 'string',
          description: 'The Slack username'
        },
        channel: {
          type: 'string',
          description: 'The Slack channel name'
        }
      },
      required: ['project_id', 'webhook']
    }
  },
  {
    name: 'gitlab_disable_slack_integration',
    description: 'Disable Slack integration for a project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_list_webhooks',
    description: 'List webhooks for a project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_get_webhook',
    description: 'Get details of a specific webhook',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        webhook_id: {
          type: 'number',
          description: 'The ID of the webhook'
        }
      },
      required: ['project_id', 'webhook_id']
    }
  },
  {
    name: 'gitlab_add_webhook',
    description: 'Add a new webhook to a project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        url: {
          type: 'string',
          description: 'The webhook URL'
        },
        token: {
          type: 'string',
          description: 'Secret token to validate received payloads'
        },
        push_events: {
          type: 'boolean',
          description: 'Trigger webhook for push events'
        },
        issues_events: {
          type: 'boolean',
          description: 'Trigger webhook for issues events'
        },
        merge_requests_events: {
          type: 'boolean',
          description: 'Trigger webhook for merge request events'
        },
        enable_ssl_verification: {
          type: 'boolean',
          description: 'Enable SSL verification for the webhook'
        }
      },
      required: ['project_id', 'url']
    }
  },
  {
    name: 'gitlab_update_webhook',
    description: 'Update an existing webhook',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        webhook_id: {
          type: 'number',
          description: 'The ID of the webhook'
        },
        url: {
          type: 'string',
          description: 'The webhook URL'
        },
        token: {
          type: 'string',
          description: 'Secret token to validate received payloads'
        },
        push_events: {
          type: 'boolean',
          description: 'Trigger webhook for push events'
        },
        issues_events: {
          type: 'boolean',
          description: 'Trigger webhook for issues events'
        },
        merge_requests_events: {
          type: 'boolean',
          description: 'Trigger webhook for merge request events'
        },
        enable_ssl_verification: {
          type: 'boolean',
          description: 'Enable SSL verification for the webhook'
        }
      },
      required: ['project_id', 'webhook_id', 'url']
    }
  },
  {
    name: 'gitlab_delete_webhook',
    description: 'Delete a webhook',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        webhook_id: {
          type: 'number',
          description: 'The ID of the webhook'
        }
      },
      required: ['project_id', 'webhook_id']
    }
  },
  {
    name: 'gitlab_test_webhook',
    description: 'Test a webhook',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        webhook_id: {
          type: 'number',
          description: 'The ID of the webhook'
        }
      },
      required: ['project_id', 'webhook_id']
    }
  },

  // CI/CD tools
  {
    name: 'gitlab_list_trigger_tokens',
    description: 'List pipeline trigger tokens',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_get_trigger_token',
    description: 'Get details of a pipeline trigger token',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        trigger_id: {
          type: 'number',
          description: 'The ID of the trigger'
        }
      },
      required: ['project_id', 'trigger_id']
    }
  },
  {
    name: 'gitlab_create_trigger_token',
    description: 'Create a new pipeline trigger token',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        description: {
          type: 'string',
          description: 'The trigger description'
        }
      },
      required: ['project_id', 'description']
    }
  },
  {
    name: 'gitlab_update_trigger_token',
    description: 'Update a pipeline trigger token',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        trigger_id: {
          type: 'number',
          description: 'The ID of the trigger'
        },
        description: {
          type: 'string',
          description: 'The new trigger description'
        }
      },
      required: ['project_id', 'trigger_id', 'description']
    }
  },
  {
    name: 'gitlab_delete_trigger_token',
    description: 'Delete a pipeline trigger token',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        trigger_id: {
          type: 'number',
          description: 'The ID of the trigger'
        }
      },
      required: ['project_id', 'trigger_id']
    }
  },
  {
    name: 'gitlab_trigger_pipeline',
    description: 'Trigger a pipeline run',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        ref: {
          type: 'string',
          description: 'The branch or tag name to run the pipeline for'
        },
        token: {
          type: 'string',
          description: 'The trigger token'
        },
        variables: {
          type: 'object',
          description: 'Variables to pass to the pipeline',
          additionalProperties: { type: 'string' }
        }
      },
      required: ['project_id', 'ref', 'token']
    }
  },
  {
    name: 'gitlab_list_cicd_variables',
    description: 'List CI/CD variables for a project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_get_cicd_variable',
    description: 'Get a specific CI/CD variable',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        key: {
          type: 'string',
          description: 'The key of the variable'
        },
        filter: {
          type: 'object',
          description: 'Filter by environment_scope when multiple variables share the same key',
          properties: {
            environment_scope: {
              type: 'string',
              description: 'The environment scope to filter by'
            }
          }
        }
      },
      required: ['project_id', 'key']
    }
  },
  {
    name: 'gitlab_create_cicd_variable',
    description: 'Create a new CI/CD variable',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        key: {
          type: 'string',
          description: 'The key of the variable'
        },
        value: {
          type: 'string',
          description: 'The value of the variable'
        },
        protected: {
          type: 'boolean',
          description: 'Whether the variable is protected'
        },
        masked: {
          type: 'boolean',
          description: 'Whether the variable is masked'
        },
        masked_and_hidden: {
          type: 'boolean',
          description: 'Whether the variable is masked and hidden. Default: false'
        },
        raw: {
          type: 'boolean',
          description: 'Whether the variable is treated as a raw string. When true, variables in the value are not expanded. Default: false'
        },
        description: {
          type: 'string',
          description: 'The description of the variable (max 255 characters)'
        },
        variable_type: {
          type: 'string',
          description: 'The type of the variable: env_var (default) or file',
          enum: ['env_var', 'file']
        },
        environment_scope: {
          type: 'string',
          description: 'The environment scope of the variable. Default: *'
        }
      },
      required: ['project_id', 'key', 'value']
    }
  },
  {
    name: 'gitlab_update_cicd_variable',
    description: 'Update a CI/CD variable',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        key: {
          type: 'string',
          description: 'The key of the variable'
        },
        value: {
          type: 'string',
          description: 'The value of the variable'
        },
        protected: {
          type: 'boolean',
          description: 'Whether the variable is protected'
        },
        masked: {
          type: 'boolean',
          description: 'Whether the variable is masked'
        },
        raw: {
          type: 'boolean',
          description: 'Whether the variable is treated as a raw string. When true, variables in the value are not expanded. Default: false'
        },
        description: {
          type: 'string',
          description: 'The description of the variable (max 255 characters)'
        },
        variable_type: {
          type: 'string',
          description: 'The type of the variable: env_var (default) or file',
          enum: ['env_var', 'file']
        },
        environment_scope: {
          type: 'string',
          description: 'The environment scope of the variable'
        },
        filter: {
          type: 'object',
          description: 'Filter by environment_scope when multiple variables share the same key',
          properties: {
            environment_scope: {
              type: 'string',
              description: 'The environment scope to filter by'
            }
          }
        }
      },
      required: ['project_id', 'key', 'value']
    }
  },
  {
    name: 'gitlab_delete_cicd_variable',
    description: 'Delete a CI/CD variable',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        key: {
          type: 'string',
          description: 'The key of the variable'
        },
        filter: {
          type: 'object',
          description: 'Filter by environment_scope when multiple variables share the same key',
          properties: {
            environment_scope: {
              type: 'string',
              description: 'The environment scope to filter by'
            }
          }
        }
      },
      required: ['project_id', 'key']
    }
  },
  {
    name: 'gitlab_list_group_cicd_variables',
    description: 'List CI/CD variables for a group',
    inputSchema: {
      type: 'object',
      properties: {
        group_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the group'
        }
      },
      required: ['group_id']
    }
  },
  {
    name: 'gitlab_get_group_cicd_variable',
    description: 'Get a specific CI/CD variable for a group',
    inputSchema: {
      type: 'object',
      properties: {
        group_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the group'
        },
        key: {
          type: 'string',
          description: 'The key of the variable'
        },
        filter: {
          type: 'object',
          description: 'Filter by environment_scope when multiple variables share the same key',
          properties: {
            environment_scope: {
              type: 'string',
              description: 'The environment scope to filter by'
            }
          }
        }
      },
      required: ['group_id', 'key']
    }
  },
  {
    name: 'gitlab_create_group_cicd_variable',
    description: 'Create a new CI/CD variable for a group',
    inputSchema: {
      type: 'object',
      properties: {
        group_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the group'
        },
        key: {
          type: 'string',
          description: 'The key of the variable'
        },
        value: {
          type: 'string',
          description: 'The value of the variable'
        },
        protected: {
          type: 'boolean',
          description: 'Whether the variable is protected'
        },
        masked: {
          type: 'boolean',
          description: 'Whether the variable is masked'
        },
        masked_and_hidden: {
          type: 'boolean',
          description: 'Whether the variable is masked and hidden. Default: false'
        },
        raw: {
          type: 'boolean',
          description: 'Whether the variable is treated as a raw string. When true, variables in the value are not expanded. Default: false'
        },
        description: {
          type: 'string',
          description: 'The description of the variable (max 255 characters)'
        },
        variable_type: {
          type: 'string',
          description: 'The type of the variable: env_var (default) or file',
          enum: ['env_var', 'file']
        },
        environment_scope: {
          type: 'string',
          description: 'The environment scope of the variable. Premium and Ultimate only'
        }
      },
      required: ['group_id', 'key', 'value']
    }
  },
  {
    name: 'gitlab_update_group_cicd_variable',
    description: 'Update a CI/CD variable for a group',
    inputSchema: {
      type: 'object',
      properties: {
        group_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the group'
        },
        key: {
          type: 'string',
          description: 'The key of the variable'
        },
        value: {
          type: 'string',
          description: 'The value of the variable'
        },
        protected: {
          type: 'boolean',
          description: 'Whether the variable is protected'
        },
        masked: {
          type: 'boolean',
          description: 'Whether the variable is masked'
        },
        raw: {
          type: 'boolean',
          description: 'Whether the variable is treated as a raw string. When true, variables in the value are not expanded. Default: false'
        },
        description: {
          type: 'string',
          description: 'The description of the variable (max 255 characters)'
        },
        variable_type: {
          type: 'string',
          description: 'The type of the variable: env_var (default) or file',
          enum: ['env_var', 'file']
        },
        environment_scope: {
          type: 'string',
          description: 'The environment scope of the variable. Premium and Ultimate only'
        },
        filter: {
          type: 'object',
          description: 'Filter by environment_scope when multiple variables share the same key',
          properties: {
            environment_scope: {
              type: 'string',
              description: 'The environment scope to filter by'
            }
          }
        }
      },
      required: ['group_id', 'key', 'value']
    }
  },
  {
    name: 'gitlab_delete_group_cicd_variable',
    description: 'Delete a CI/CD variable for a group',
    inputSchema: {
      type: 'object',
      properties: {
        group_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the group'
        },
        key: {
          type: 'string',
          description: 'The key of the variable'
        },
        filter: {
          type: 'object',
          description: 'Filter by environment_scope when multiple variables share the same key',
          properties: {
            environment_scope: {
              type: 'string',
              description: 'The environment scope to filter by'
            }
          }
        }
      },
      required: ['group_id', 'key']
    }
  },

  // Users and Groups tools
  {
    name: 'gitlab_list_users',
    description: 'List GitLab users',
    inputSchema: {
      type: 'object',
      properties: {
        search: {
          type: 'string',
          description: 'Search users by username, name or email'
        },
        active: {
          type: 'boolean',
          description: 'Filter users by active status'
        }
      }
    }
  },
  {
    name: 'gitlab_get_user',
    description: 'Get details of a specific user',
    inputSchema: {
      type: 'object',
      properties: {
        user_id: {
          type: 'number',
          description: 'The ID of the user'
        }
      },
      required: ['user_id']
    }
  },
  {
    name: 'gitlab_list_groups',
    description: 'List GitLab groups',
    inputSchema: {
      type: 'object',
      properties: {
        search: {
          type: 'string',
          description: 'Search groups by name'
        },
        owned: {
          type: 'boolean',
          description: 'Limit to groups explicitly owned by the current user'
        }
      }
    }
  },
  {
    name: 'gitlab_get_group',
    description: 'Get details of a specific group',
    inputSchema: {
      type: 'object',
      properties: {
        group_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the group'
        }
      },
      required: ['group_id']
    }
  },
  {
    name: 'gitlab_list_group_members',
    description: 'List members of a group',
    inputSchema: {
      type: 'object',
      properties: {
        group_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the group'
        }
      },
      required: ['group_id']
    }
  },
  {
    name: 'gitlab_add_group_member',
    description: 'Add a user to a group',
    inputSchema: {
      type: 'object',
      properties: {
        group_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the group'
        },
        user_id: {
          type: 'number',
          description: 'The ID of the user'
        },
        access_level: {
          type: 'number',
          description: 'Access level (10=Guest, 20=Reporter, 30=Developer, 40=Maintainer, 50=Owner)',
          enum: [10, 20, 30, 40, 50]
        }
      },
      required: ['group_id', 'user_id', 'access_level']
    }
  },
  {
    name: 'gitlab_list_project_members',
    description: 'List members of a project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_add_project_member',
    description: 'Add a user to a project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: {
          type: 'string',
          description: 'The ID or URL-encoded path of the project'
        },
        user_id: {
          type: 'number',
          description: 'The ID of the user'
        },
        access_level: {
          type: 'number',
          description: 'Access level (10=Guest, 20=Reporter, 30=Developer, 40=Maintainer, 50=Owner)',
          enum: [10, 20, 30, 40, 50]
        }
      },
      required: ['project_id', 'user_id', 'access_level']
    }
  },

  // Pipeline tools
  {
    name: 'gitlab_list_pipelines',
    description: 'List pipelines in a GitLab project. Returns pipeline ID, status, ref, SHA, and timestamps.',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        status: { type: 'string', description: 'Filter by status', enum: ['created', 'waiting_for_resource', 'preparing', 'pending', 'running', 'success', 'failed', 'canceled', 'skipped', 'manual', 'scheduled'] },
        ref: { type: 'string', description: 'Filter by branch or tag name' },
        source: { type: 'string', description: 'Filter by pipeline source (push, web, trigger, schedule, api, merge_request_event, etc.)' },
        per_page: { type: 'number', description: 'Number of results per page (max 100)' },
        page: { type: 'number', description: 'Page number for pagination' }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_get_pipeline',
    description: 'Get details of a specific pipeline including status, duration, coverage, and user info',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        pipeline_id: { type: 'number', description: 'The ID of the pipeline' }
      },
      required: ['project_id', 'pipeline_id']
    }
  },
  {
    name: 'gitlab_create_pipeline',
    description: 'Create a new pipeline for a branch or tag',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        ref: { type: 'string', description: 'The branch or tag name to create the pipeline for' },
        variables: {
          type: 'array',
          description: 'Array of variables for the pipeline',
          items: {
            type: 'object',
            properties: {
              key: { type: 'string' },
              value: { type: 'string' },
              variable_type: { type: 'string', enum: ['env_var', 'file'] }
            }
          }
        }
      },
      required: ['project_id', 'ref']
    }
  },
  {
    name: 'gitlab_cancel_pipeline',
    description: 'Cancel all running/pending jobs in a pipeline',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        pipeline_id: { type: 'number', description: 'The ID of the pipeline' }
      },
      required: ['project_id', 'pipeline_id']
    }
  },
  {
    name: 'gitlab_retry_pipeline',
    description: 'Retry all failed jobs in a pipeline',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        pipeline_id: { type: 'number', description: 'The ID of the pipeline' }
      },
      required: ['project_id', 'pipeline_id']
    }
  },
  {
    name: 'gitlab_delete_pipeline',
    description: 'Delete a pipeline and all its jobs',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        pipeline_id: { type: 'number', description: 'The ID of the pipeline' }
      },
      required: ['project_id', 'pipeline_id']
    }
  },
  {
    name: 'gitlab_list_pipeline_jobs',
    description: 'List jobs for a specific pipeline. Returns job name, status, stage, duration, and runner info.',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        pipeline_id: { type: 'number', description: 'The ID of the pipeline' },
        scope: {
          type: 'string',
          description: 'Filter by job scope',
          enum: ['created', 'pending', 'running', 'failed', 'success', 'canceled', 'skipped', 'waiting_for_resource', 'manual']
        },
        per_page: { type: 'number', description: 'Number of results per page (max 100)' },
        page: { type: 'number', description: 'Page number for pagination' }
      },
      required: ['project_id', 'pipeline_id']
    }
  },
  {
    name: 'gitlab_get_job',
    description: 'Get details of a single job including status, stage, duration, artifacts, and runner info',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        job_id: { type: 'number', description: 'The ID of the job' }
      },
      required: ['project_id', 'job_id']
    }
  },
  {
    name: 'gitlab_get_job_log',
    description: 'Get the log (trace) output of a specific job. Returns the raw text log of the job execution.',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        job_id: { type: 'number', description: 'The ID of the job' }
      },
      required: ['project_id', 'job_id']
    }
  },
  {
    name: 'gitlab_cancel_job',
    description: 'Cancel a running job',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        job_id: { type: 'number', description: 'The ID of the job' }
      },
      required: ['project_id', 'job_id']
    }
  },
  {
    name: 'gitlab_retry_job',
    description: 'Retry a failed or cancelled job',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        job_id: { type: 'number', description: 'The ID of the job' }
      },
      required: ['project_id', 'job_id']
    }
  },
  {
    name: 'gitlab_list_pipeline_bridges',
    description: 'List bridge jobs (downstream pipeline triggers) for a pipeline',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        pipeline_id: { type: 'number', description: 'The ID of the pipeline' },
        scope: {
          type: 'string',
          description: 'Filter by job scope',
          enum: ['created', 'pending', 'running', 'failed', 'success', 'canceled', 'skipped', 'waiting_for_resource', 'manual']
        },
        per_page: { type: 'number', description: 'Number of results per page (max 100)' },
        page: { type: 'number', description: 'Page number for pagination' }
      },
      required: ['project_id', 'pipeline_id']
    }
  },

  // Repository extended tools
  {
    name: 'gitlab_list_commits',
    description: 'List repository commits with optional filters by branch, date range, and path',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        ref_name: { type: 'string', description: 'Branch name, tag, or commit SHA to list commits for' },
        since: { type: 'string', description: 'Only commits after this date (ISO 8601 format)' },
        until: { type: 'string', description: 'Only commits before this date (ISO 8601 format)' },
        path: { type: 'string', description: 'Only commits affecting this file path' },
        per_page: { type: 'number', description: 'Number of results per page (max 100)' },
        page: { type: 'number', description: 'Page number for pagination' }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_get_commit',
    description: 'Get details of a specific commit including diff stats and parent info',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        sha: { type: 'string', description: 'The commit SHA' }
      },
      required: ['project_id', 'sha']
    }
  },
  {
    name: 'gitlab_list_tags',
    description: 'List repository tags with optional search and ordering',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        search: { type: 'string', description: 'Search tags by name' },
        order_by: { type: 'string', description: 'Order by name, updated, or version', enum: ['name', 'updated', 'version'] },
        sort: { type: 'string', description: 'Sort direction', enum: ['asc', 'desc'] },
        per_page: { type: 'number', description: 'Number of results per page (max 100)' },
        page: { type: 'number', description: 'Page number for pagination' }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_get_tag',
    description: 'Get details of a specific tag including commit info and release notes',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        tag_name: { type: 'string', description: 'The name of the tag' }
      },
      required: ['project_id', 'tag_name']
    }
  },
  {
    name: 'gitlab_create_tag',
    description: 'Create a new tag in the repository',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        tag_name: { type: 'string', description: 'The name of the tag' },
        ref: { type: 'string', description: 'The branch name or commit SHA to create the tag from' },
        message: { type: 'string', description: 'Optional tag message (creates annotated tag)' }
      },
      required: ['project_id', 'tag_name', 'ref']
    }
  },
  {
    name: 'gitlab_delete_tag',
    description: 'Delete a tag from the repository',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        tag_name: { type: 'string', description: 'The name of the tag' }
      },
      required: ['project_id', 'tag_name']
    }
  },
  {
    name: 'gitlab_list_releases',
    description: 'List releases for a project, ordered by released_at',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        per_page: { type: 'number', description: 'Number of results per page (max 100)' },
        page: { type: 'number', description: 'Page number for pagination' }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_get_release',
    description: 'Get details of a specific release by its tag name',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        tag_name: { type: 'string', description: 'The tag name of the release' }
      },
      required: ['project_id', 'tag_name']
    }
  },
  {
    name: 'gitlab_list_repository_tree',
    description: 'List files and directories in a repository. Returns name, type (blob/tree), path, and mode.',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        path: { type: 'string', description: 'Path inside the repository to list (default: root)' },
        ref: { type: 'string', description: 'The branch name, tag, or commit SHA' },
        recursive: { type: 'boolean', description: 'If true, list files recursively' },
        per_page: { type: 'number', description: 'Number of results per page (max 100)' },
        page: { type: 'number', description: 'Page number for pagination' }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_list_merge_request_commits',
    description: 'List commits included in a merge request',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        merge_request_iid: { type: 'number', description: 'The internal ID of the merge request' }
      },
      required: ['project_id', 'merge_request_iid']
    }
  },

  // MR approvals, notes, merge, search
  {
    name: 'gitlab_get_merge_request_approvals',
    description: 'Get the approval state of a merge request including who approved and approval rules',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        merge_request_iid: { type: 'number', description: 'The internal ID of the merge request' }
      },
      required: ['project_id', 'merge_request_iid']
    }
  },
  {
    name: 'gitlab_list_merge_request_notes',
    description: 'List all notes/comments on a merge request',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        merge_request_iid: { type: 'number', description: 'The internal ID of the merge request' },
        per_page: { type: 'number', description: 'Number of results per page (max 100)' },
        page: { type: 'number', description: 'Page number for pagination' }
      },
      required: ['project_id', 'merge_request_iid']
    }
  },
  {
    name: 'gitlab_merge_merge_request',
    description: 'Accept and merge a merge request',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        merge_request_iid: { type: 'number', description: 'The internal ID of the merge request' },
        merge_commit_message: { type: 'string', description: 'Custom merge commit message' },
        squash_commit_message: { type: 'string', description: 'Custom squash commit message' },
        squash: { type: 'boolean', description: 'If true, squash all commits into one' },
        should_remove_source_branch: { type: 'boolean', description: 'If true, remove the source branch after merge' },
        merge_when_pipeline_succeeds: { type: 'boolean', description: 'If true, merge when the pipeline succeeds' },
        sha: { type: 'string', description: 'Expected HEAD SHA of the source branch; merge fails if different' }
      },
      required: ['project_id', 'merge_request_iid']
    }
  },
  {
    name: 'gitlab_search',
    description: 'Search across GitLab globally, within a group, or within a project. Supports searching projects, issues, merge_requests, milestones, snippet_titles, wiki_blobs, commits, blobs, notes, and users.',
    inputSchema: {
      type: 'object',
      properties: {
        scope: {
          type: 'string',
          description: 'The scope to search in',
          enum: ['projects', 'issues', 'merge_requests', 'milestones', 'snippet_titles', 'wiki_blobs', 'commits', 'blobs', 'notes', 'users']
        },
        search: { type: 'string', description: 'The search query' },
        project_id: { type: 'string', description: 'Optional: scope search to a specific project' },
        group_id: { type: 'string', description: 'Optional: scope search to a specific group' }
      },
      required: ['scope', 'search']
    }
  },

  // Issues extended tools
  {
    name: 'gitlab_get_issue',
    description: 'Get details of a specific issue',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        issue_iid: { type: 'number', description: 'The internal ID of the issue' }
      },
      required: ['project_id', 'issue_iid']
    }
  },
  {
    name: 'gitlab_create_issue',
    description: 'Create a new issue in a project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        title: { type: 'string', description: 'The title of the issue' },
        description: { type: 'string', description: 'The description of the issue (supports Markdown)' },
        assignee_ids: { type: 'array', description: 'Array of user IDs to assign', items: { type: 'number' } },
        labels: { type: 'string', description: 'Comma-separated list of label names' },
        milestone_id: { type: 'number', description: 'The milestone ID to associate' },
        confidential: { type: 'boolean', description: 'Whether the issue is confidential' }
      },
      required: ['project_id', 'title']
    }
  },
  {
    name: 'gitlab_update_issue',
    description: 'Update an existing issue',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        issue_iid: { type: 'number', description: 'The internal ID of the issue' },
        title: { type: 'string', description: 'New title' },
        description: { type: 'string', description: 'New description' },
        assignee_ids: { type: 'array', description: 'Array of user IDs to assign', items: { type: 'number' } },
        labels: { type: 'string', description: 'Comma-separated list of label names' },
        milestone_id: { type: 'number', description: 'The milestone ID to associate' },
        state_event: { type: 'string', description: 'State change event', enum: ['close', 'reopen'] },
        confidential: { type: 'boolean', description: 'Whether the issue is confidential' }
      },
      required: ['project_id', 'issue_iid']
    }
  },
  {
    name: 'gitlab_delete_issue',
    description: 'Delete an issue (requires admin or owner permissions)',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        issue_iid: { type: 'number', description: 'The internal ID of the issue' }
      },
      required: ['project_id', 'issue_iid']
    }
  },
  {
    name: 'gitlab_list_issue_notes',
    description: 'List notes/comments on an issue',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        issue_iid: { type: 'number', description: 'The internal ID of the issue' },
        per_page: { type: 'number', description: 'Number of results per page (max 100)' },
        page: { type: 'number', description: 'Page number for pagination' }
      },
      required: ['project_id', 'issue_iid']
    }
  },
  {
    name: 'gitlab_create_issue_note',
    description: 'Add a comment/note to an issue',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        issue_iid: { type: 'number', description: 'The internal ID of the issue' },
        body: { type: 'string', description: 'The content of the note/comment' },
        internal: { type: 'boolean', description: 'If true, creates an internal note (visible only to project members)' }
      },
      required: ['project_id', 'issue_iid', 'body']
    }
  },
  {
    name: 'gitlab_list_labels',
    description: 'List project labels',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        search: { type: 'string', description: 'Search labels by name' },
        per_page: { type: 'number', description: 'Number of results per page (max 100)' },
        page: { type: 'number', description: 'Page number for pagination' }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_list_milestones',
    description: 'List project milestones',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        state: { type: 'string', description: 'Filter by state', enum: ['active', 'closed'] },
        search: { type: 'string', description: 'Search milestones by title' },
        per_page: { type: 'number', description: 'Number of results per page (max 100)' },
        page: { type: 'number', description: 'Page number for pagination' }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_list_snippets',
    description: 'List project snippets',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        per_page: { type: 'number', description: 'Number of results per page (max 100)' },
        page: { type: 'number', description: 'Page number for pagination' }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_get_snippet',
    description: 'Get details of a specific project snippet',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        snippet_id: { type: 'number', description: 'The ID of the snippet' }
      },
      required: ['project_id', 'snippet_id']
    }
  },

  // Environments & Deployments tools
  {
    name: 'gitlab_list_environments',
    description: 'List environments for a project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        name: { type: 'string', description: 'Filter by exact environment name' },
        search: { type: 'string', description: 'Search environments by name' },
        states: { type: 'string', description: 'Filter by state', enum: ['available', 'stopping', 'stopped'] },
        per_page: { type: 'number', description: 'Number of results per page (max 100)' },
        page: { type: 'number', description: 'Page number for pagination' }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_get_environment',
    description: 'Get details of a specific environment including last deployment info',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        environment_id: { type: 'number', description: 'The ID of the environment' }
      },
      required: ['project_id', 'environment_id']
    }
  },
  {
    name: 'gitlab_list_deployments',
    description: 'List deployments for a project with optional filters',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        environment: { type: 'string', description: 'Filter by environment name' },
        status: { type: 'string', description: 'Filter by deployment status', enum: ['created', 'running', 'success', 'failed', 'canceled', 'blocked'] },
        order_by: { type: 'string', description: 'Order by field', enum: ['id', 'iid', 'created_at', 'updated_at', 'finished_at', 'ref'] },
        sort: { type: 'string', description: 'Sort direction', enum: ['asc', 'desc'] },
        per_page: { type: 'number', description: 'Number of results per page (max 100)' },
        page: { type: 'number', description: 'Page number for pagination' }
      },
      required: ['project_id']
    }
  },
  {
    name: 'gitlab_get_deployment',
    description: 'Get details of a specific deployment',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'The ID or URL-encoded path of the project' },
        deployment_id: { type: 'number', description: 'The ID of the deployment' }
      },
      required: ['project_id', 'deployment_id']
    }
  }
];
