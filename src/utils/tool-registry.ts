/**
 * Tool registry - maps tool names to handler functions
 */

import { ToolRegistry } from "./handler-types.js";

// Import repository handlers
import * as repoHandlers from "../handlers/repository-handlers.js";

// Import repository extended handlers
import * as repoExtHandlers from "../handlers/repository-extended-handlers.js";

// Import integration handlers
import * as integrationHandlers from "../handlers/integration-handlers.js";

// Import CI/CD handlers
import * as cicdHandlers from "../handlers/cicd-handlers.js";

// Import pipeline handlers
import * as pipelineHandlers from "../handlers/pipeline-handlers.js";

// Import users and groups handlers
import * as usersGroupsHandlers from "../handlers/users-groups-handlers.js";

// Import issues extended handlers
import * as issuesExtHandlers from "../handlers/issues-extended-handlers.js";

// Import environments handlers
import * as environmentsHandlers from "../handlers/environments-handlers.js";

// Import branch handlers
import * as branchHandlers from "../handlers/branch-handlers.js";

// Import repository files handlers
import * as repoFilesHandlers from "../handlers/repository-files-handlers.js";

// Import wiki handlers
import * as wikiHandlers from "../handlers/wiki-handlers.js";

// Import protected branch handlers
import * as protectedBranchHandlers from "../handlers/protected-branch-handlers.js";

// Import runner handlers
import * as runnerHandlers from "../handlers/runner-handlers.js";

// Import pipeline schedule handlers
import * as pipelineScheduleHandlers from "../handlers/pipeline-schedule-handlers.js";

// Import merge request extended handlers
import * as mrExtHandlers from "../handlers/merge-request-extended-handlers.js";

/**
 * Registry of all available tools mapped to their handler functions
 */
export const toolRegistry: ToolRegistry = {
  // Repository tools
  gitlab_list_projects: repoHandlers.listProjects,
  gitlab_get_project: repoHandlers.getProject,
  gitlab_list_branches: repoHandlers.listBranches,
  gitlab_list_merge_requests: repoHandlers.listMergeRequests,
  gitlab_get_merge_request: repoHandlers.getMergeRequest,
  gitlab_get_merge_request_changes: repoHandlers.getMergeRequestChanges,
  gitlab_create_merge_request_note: repoHandlers.createMergeRequestNote,
  gitlab_create_merge_request_note_internal: repoHandlers.createMergeRequestNoteInternal,
  gitlab_update_merge_request: repoHandlers.updateMergeRequest,
  gitlab_create_merge_request: repoHandlers.createMergeRequest,
  gitlab_list_issues: repoHandlers.listIssues,
  gitlab_get_repository_file: repoHandlers.getRepositoryFile,
  gitlab_compare_branches: repoHandlers.compareBranches,
  gitlab_get_merge_request_approvals: repoHandlers.getMergeRequestApprovals,
  gitlab_list_merge_request_notes: repoHandlers.listMergeRequestNotes,
  gitlab_merge_merge_request: repoHandlers.mergeMergeRequest,
  gitlab_search: repoHandlers.search,

  // Repository extended tools
  gitlab_list_commits: repoExtHandlers.listCommits,
  gitlab_get_commit: repoExtHandlers.getCommit,
  gitlab_list_tags: repoExtHandlers.listTags,
  gitlab_get_tag: repoExtHandlers.getTag,
  gitlab_create_tag: repoExtHandlers.createTag,
  gitlab_delete_tag: repoExtHandlers.deleteTag,
  gitlab_list_releases: repoExtHandlers.listReleases,
  gitlab_get_release: repoExtHandlers.getRelease,
  gitlab_list_repository_tree: repoExtHandlers.listRepositoryTree,
  gitlab_list_merge_request_commits: repoExtHandlers.listMergeRequestCommits,

  // Integration tools
  gitlab_list_integrations: integrationHandlers.listIntegrations,
  gitlab_get_integration: integrationHandlers.getIntegration,
  gitlab_update_slack_integration: integrationHandlers.updateSlackIntegration,
  gitlab_disable_slack_integration: integrationHandlers.disableSlackIntegration,
  gitlab_list_webhooks: integrationHandlers.listWebhooks,
  gitlab_get_webhook: integrationHandlers.getWebhook,
  gitlab_add_webhook: integrationHandlers.addWebhook,
  gitlab_update_webhook: integrationHandlers.updateWebhook,
  gitlab_delete_webhook: integrationHandlers.deleteWebhook,
  gitlab_test_webhook: integrationHandlers.testWebhook,

  // CI/CD tools
  gitlab_list_trigger_tokens: cicdHandlers.listTriggerTokens,
  gitlab_get_trigger_token: cicdHandlers.getTriggerToken,
  gitlab_create_trigger_token: cicdHandlers.createTriggerToken,
  gitlab_update_trigger_token: cicdHandlers.updateTriggerToken,
  gitlab_delete_trigger_token: cicdHandlers.deleteTriggerToken,
  gitlab_trigger_pipeline: cicdHandlers.triggerPipeline,
  gitlab_list_cicd_variables: cicdHandlers.listCiCdVariables,
  gitlab_get_cicd_variable: cicdHandlers.getCiCdVariable,
  gitlab_create_cicd_variable: cicdHandlers.createCiCdVariable,
  gitlab_update_cicd_variable: cicdHandlers.updateCiCdVariable,
  gitlab_delete_cicd_variable: cicdHandlers.deleteCiCdVariable,
  gitlab_list_group_cicd_variables: cicdHandlers.listGroupCiCdVariables,
  gitlab_get_group_cicd_variable: cicdHandlers.getGroupCiCdVariable,
  gitlab_create_group_cicd_variable: cicdHandlers.createGroupCiCdVariable,
  gitlab_update_group_cicd_variable: cicdHandlers.updateGroupCiCdVariable,
  gitlab_delete_group_cicd_variable: cicdHandlers.deleteGroupCiCdVariable,

  // Pipeline tools
  gitlab_list_pipelines: pipelineHandlers.listPipelines,
  gitlab_get_pipeline: pipelineHandlers.getPipeline,
  gitlab_create_pipeline: pipelineHandlers.createPipeline,
  gitlab_cancel_pipeline: pipelineHandlers.cancelPipeline,
  gitlab_retry_pipeline: pipelineHandlers.retryPipeline,
  gitlab_delete_pipeline: pipelineHandlers.deletePipeline,
  gitlab_list_pipeline_jobs: pipelineHandlers.listPipelineJobs,
  gitlab_get_job: pipelineHandlers.getJob,
  gitlab_get_job_log: pipelineHandlers.getJobLog,
  gitlab_cancel_job: pipelineHandlers.cancelJob,
  gitlab_retry_job: pipelineHandlers.retryJob,
  gitlab_list_pipeline_bridges: pipelineHandlers.listPipelineBridges,

  // Issues extended tools
  gitlab_get_issue: issuesExtHandlers.getIssue,
  gitlab_create_issue: issuesExtHandlers.createIssue,
  gitlab_update_issue: issuesExtHandlers.updateIssue,
  gitlab_delete_issue: issuesExtHandlers.deleteIssue,
  gitlab_list_issue_notes: issuesExtHandlers.listIssueNotes,
  gitlab_create_issue_note: issuesExtHandlers.createIssueNote,
  gitlab_list_labels: issuesExtHandlers.listLabels,
  gitlab_list_milestones: issuesExtHandlers.listMilestones,
  gitlab_list_snippets: issuesExtHandlers.listSnippets,
  gitlab_get_snippet: issuesExtHandlers.getSnippet,

  // Environments & Deployments tools
  gitlab_list_environments: environmentsHandlers.listEnvironments,
  gitlab_get_environment: environmentsHandlers.getEnvironment,
  gitlab_list_deployments: environmentsHandlers.listDeployments,
  gitlab_get_deployment: environmentsHandlers.getDeployment,

  // Users and Groups tools
  gitlab_list_users: usersGroupsHandlers.listUsers,
  gitlab_get_user: usersGroupsHandlers.getUser,
  gitlab_list_groups: usersGroupsHandlers.listGroups,
  gitlab_get_group: usersGroupsHandlers.getGroup,
  gitlab_list_group_members: usersGroupsHandlers.listGroupMembers,
  gitlab_add_group_member: usersGroupsHandlers.addGroupMember,
  gitlab_list_project_members: usersGroupsHandlers.listProjectMembers,
  gitlab_add_project_member: usersGroupsHandlers.addProjectMember,

  // Branch tools
  gitlab_create_branch: branchHandlers.createBranch,
  gitlab_delete_branch: branchHandlers.deleteBranch,

  // Repository file CRUD tools
  gitlab_create_repository_file: repoFilesHandlers.createRepositoryFile,
  gitlab_update_repository_file: repoFilesHandlers.updateRepositoryFile,
  gitlab_delete_repository_file: repoFilesHandlers.deleteRepositoryFile,

  // Release CRUD tools
  gitlab_create_release: repoExtHandlers.createRelease,
  gitlab_update_release: repoExtHandlers.updateRelease,
  gitlab_delete_release: repoExtHandlers.deleteRelease,

  // Merge request extended tools
  gitlab_approve_merge_request: mrExtHandlers.approveMergeRequest,
  gitlab_unapprove_merge_request: mrExtHandlers.unapproveMergeRequest,
  gitlab_rebase_merge_request: mrExtHandlers.rebaseMergeRequest,

  // Wiki tools
  gitlab_list_wiki_pages: wikiHandlers.listWikiPages,
  gitlab_get_wiki_page: wikiHandlers.getWikiPage,
  gitlab_create_wiki_page: wikiHandlers.createWikiPage,
  gitlab_update_wiki_page: wikiHandlers.updateWikiPage,
  gitlab_delete_wiki_page: wikiHandlers.deleteWikiPage,

  // Protected branch tools
  gitlab_list_protected_branches: protectedBranchHandlers.listProtectedBranches,
  gitlab_get_protected_branch: protectedBranchHandlers.getProtectedBranch,
  gitlab_protect_branch: protectedBranchHandlers.protectBranch,
  gitlab_unprotect_branch: protectedBranchHandlers.unprotectBranch,

  // Runner tools
  gitlab_list_runners: runnerHandlers.listRunners,
  gitlab_get_runner: runnerHandlers.getRunner,
  gitlab_list_project_runners: runnerHandlers.listProjectRunners,

  // Pipeline schedule tools
  gitlab_list_pipeline_schedules: pipelineScheduleHandlers.listPipelineSchedules,
  gitlab_get_pipeline_schedule: pipelineScheduleHandlers.getPipelineSchedule,
  gitlab_create_pipeline_schedule: pipelineScheduleHandlers.createPipelineSchedule,
  gitlab_update_pipeline_schedule: pipelineScheduleHandlers.updatePipelineSchedule,
  gitlab_delete_pipeline_schedule: pipelineScheduleHandlers.deletePipelineSchedule,
  gitlab_run_pipeline_schedule: pipelineScheduleHandlers.runPipelineSchedule,

  // Job artifacts tools
  gitlab_get_job_artifacts: pipelineHandlers.getJobArtifacts
};
