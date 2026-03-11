/**
 * GitLab CI/CD Manager
 * 
 * This module provides functions for managing GitLab CI/CD pipelines, variables,
 * triggers, and runners through the GitLab API.
 */

import axios, { AxiosInstance } from "axios";

/**
 * Class to manage GitLab CI/CD features
 */
export class CiCdManager {
  private axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  /**
   * List pipeline trigger tokens for a project
   * 
   * @param projectId ID or URL-encoded path of the project
   * @returns List of pipeline trigger tokens
   */
  async listTriggerTokens(projectId: string | number) {
    try {
      const response = await this.axiosInstance.get(`/projects/${encodeURIComponent(String(projectId))}/triggers`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to list trigger tokens');
    }
  }

  /**
   * Get details of a specific trigger token
   * 
   * @param projectId ID or URL-encoded path of the project
   * @param triggerId ID of the trigger token
   * @returns Trigger token details
   */
  async getTriggerToken(projectId: string | number, triggerId: number) {
    try {
      const response = await this.axiosInstance.get(
        `/projects/${encodeURIComponent(String(projectId))}/triggers/${triggerId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to get trigger token: ${triggerId}`);
    }
  }

  /**
   * Create a new trigger token for a project
   * 
   * @param projectId ID or URL-encoded path of the project
   * @param description Description of the trigger token
   * @returns Created trigger token details
   */
  async createTriggerToken(projectId: string | number, description: string) {
    try {
      const response = await this.axiosInstance.post(
        `/projects/${encodeURIComponent(String(projectId))}/triggers`,
        { description }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to create trigger token');
    }
  }

  /**
   * Update a trigger token
   * 
   * @param projectId ID or URL-encoded path of the project
   * @param triggerId ID of the trigger token
   * @param description New description for the trigger token
   * @returns Updated trigger token details
   */
  async updateTriggerToken(projectId: string | number, triggerId: number, description: string) {
    try {
      const response = await this.axiosInstance.put(
        `/projects/${encodeURIComponent(String(projectId))}/triggers/${triggerId}`,
        { description }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to update trigger token: ${triggerId}`);
    }
  }

  /**
   * Delete a trigger token
   * 
   * @param projectId ID or URL-encoded path of the project
   * @param triggerId ID of the trigger token
   * @returns Response data
   */
  async deleteTriggerToken(projectId: string | number, triggerId: number) {
    try {
      const response = await this.axiosInstance.delete(
        `/projects/${encodeURIComponent(String(projectId))}/triggers/${triggerId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to delete trigger token: ${triggerId}`);
    }
  }

  /**
   * Trigger a pipeline with a token
   * 
   * @param projectId ID or URL-encoded path of the project
   * @param ref Branch or tag name to run the pipeline on
   * @param token Trigger token or CI/CD job token
   * @param variables Variables to pass to the pipeline
   * @returns Triggered pipeline details
   */
  async triggerPipeline(
    projectId: string | number, 
    ref: string, 
    token: string, 
    variables?: Record<string, string>
  ) {
    try {
      const params = { token, ref };
      const response = await this.axiosInstance.post(
        `/projects/${encodeURIComponent(String(projectId))}/trigger/pipeline`,
        { variables },
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to trigger pipeline');
    }
  }

  /**
   * List project CI/CD variables
   * 
   * @param projectId ID or URL-encoded path of the project
   * @returns List of CI/CD variables
   */
  async listCiCdVariables(projectId: string | number) {
    try {
      let page = 1;
      const perPage = 100;
      let allVariables: any[] = [];
      let hasMore = true;

      while (hasMore) {
        const response = await this.axiosInstance.get(`/projects/${encodeURIComponent(String(projectId))}/variables`, {
          params: {
            page,
            per_page: perPage,
          },
        });

        if (response.data.length > 0) {
          allVariables = allVariables.concat(response.data);
          page++;
        } else {
          hasMore = false;
        }
      }

      return allVariables;
    } catch (error) {
      throw this.handleError(error, 'Failed to list CI/CD variables');
    }
  }

  /**
   * Get a specific CI/CD variable
   * 
   * @param projectId ID or URL-encoded path of the project
   * @param key Key of the variable
   * @returns Variable details
   */
  async getCiCdVariable(projectId: string | number, key: string, filter?: {
    environment_scope?: string;
  }) {
    try {
      const params: Record<string, string> = {};
      if (filter?.environment_scope) {
        params['filter[environment_scope]'] = filter.environment_scope;
      }
      const response = await this.axiosInstance.get(
        `/projects/${encodeURIComponent(String(projectId))}/variables/${encodeURIComponent(key)}`,
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to get CI/CD variable: ${key}`);
    }
  }

  /**
   * Create a new CI/CD variable
   * 
   * @param projectId ID or URL-encoded path of the project
   * @param options Variable options
   * @returns Created variable details
   */
  async createCiCdVariable(projectId: string | number, options: {
    key: string;
    value: string;
    protected?: boolean;
    masked?: boolean;
    masked_and_hidden?: boolean;
    raw?: boolean;
    description?: string;
    environment_scope?: string;
    variable_type?: 'env_var' | 'file';
  }) {
    try {
      const response = await this.axiosInstance.post(
        `/projects/${encodeURIComponent(String(projectId))}/variables`,
        options
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to create CI/CD variable: ${options.key}`);
    }
  }

  /**
   * Update a CI/CD variable
   * 
   * @param projectId ID or URL-encoded path of the project
   * @param key Key of the variable to update
   * @param options Variable options to update
   * @returns Updated variable details
   */
  async updateCiCdVariable(projectId: string | number, key: string, options: {
    value: string;
    protected?: boolean;
    masked?: boolean;
    raw?: boolean;
    description?: string;
    environment_scope?: string;
    variable_type?: 'env_var' | 'file';
    filter?: { environment_scope?: string };
  }) {
    try {
      const params: Record<string, string> = {};
      if (options.filter?.environment_scope) {
        params['filter[environment_scope]'] = options.filter.environment_scope;
      }
      const { filter, ...body } = options;
      const response = await this.axiosInstance.put(
        `/projects/${encodeURIComponent(String(projectId))}/variables/${encodeURIComponent(key)}`,
        body,
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to update CI/CD variable: ${key}`);
    }
  }

  /**
   * Delete a CI/CD variable
   * 
   * @param projectId ID or URL-encoded path of the project
   * @param key Key of the variable to delete
   * @returns Response data
   */
  async deleteCiCdVariable(projectId: string | number, key: string, filter?: {
    environment_scope?: string;
  }) {
    try {
      const params: Record<string, string> = {};
      if (filter?.environment_scope) {
        params['filter[environment_scope]'] = filter.environment_scope;
      }
      const response = await this.axiosInstance.delete(
        `/projects/${encodeURIComponent(String(projectId))}/variables/${encodeURIComponent(key)}`,
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to delete CI/CD variable: ${key}`);
    }
  }

  /**
   * List group CI/CD variables
   *
   * @param groupId ID or URL-encoded path of the group
   * @returns List of CI/CD variables
   */
  async listGroupCiCdVariables(groupId: string | number) {
    try {
      let page = 1;
      const perPage = 100;
      let allVariables: any[] = [];
      let hasMore = true;

      while (hasMore) {
        const response = await this.axiosInstance.get(`/groups/${encodeURIComponent(String(groupId))}/variables`, {
          params: {
            page,
            per_page: perPage,
          },
        });

        if (response.data.length > 0) {
          allVariables = allVariables.concat(response.data);
          page++;
        } else {
          hasMore = false;
        }
      }

      return allVariables;
    } catch (error) {
      throw this.handleError(error, 'Failed to list group CI/CD variables');
    }
  }

  /**
   * Get a specific group CI/CD variable
   *
   * @param groupId ID or URL-encoded path of the group
   * @param key Key of the variable
   * @returns Variable details
   */
  async getGroupCiCdVariable(groupId: string | number, key: string, filter?: {
    environment_scope?: string;
  }) {
    try {
      const params: Record<string, string> = {};
      if (filter?.environment_scope) {
        params['filter[environment_scope]'] = filter.environment_scope;
      }
      const response = await this.axiosInstance.get(
        `/groups/${encodeURIComponent(String(groupId))}/variables/${encodeURIComponent(key)}`,
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to get group CI/CD variable: ${key}`);
    }
  }

  /**
   * Create a new group CI/CD variable
   *
   * @param groupId ID or URL-encoded path of the group
   * @param options Variable options
   * @returns Created variable details
   */
  async createGroupCiCdVariable(groupId: string | number, options: {
    key: string;
    value: string;
    protected?: boolean;
    masked?: boolean;
    masked_and_hidden?: boolean;
    raw?: boolean;
    description?: string;
    environment_scope?: string;
    variable_type?: 'env_var' | 'file';
  }) {
    try {
      const response = await this.axiosInstance.post(
        `/groups/${encodeURIComponent(String(groupId))}/variables`,
        options
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to create group CI/CD variable: ${options.key}`);
    }
  }

  /**
   * Update a group CI/CD variable
   *
   * @param groupId ID or URL-encoded path of the group
   * @param key Key of the variable to update
   * @param options Variable options to update
   * @returns Updated variable details
   */
  async updateGroupCiCdVariable(groupId: string | number, key: string, options: {
    value: string;
    protected?: boolean;
    masked?: boolean;
    raw?: boolean;
    description?: string;
    environment_scope?: string;
    variable_type?: 'env_var' | 'file';
    filter?: { environment_scope?: string };
  }) {
    try {
      const params: Record<string, string> = {};
      if (options.filter?.environment_scope) {
        params['filter[environment_scope]'] = options.filter.environment_scope;
      }
      const { filter, ...body } = options;
      const response = await this.axiosInstance.put(
        `/groups/${encodeURIComponent(String(groupId))}/variables/${encodeURIComponent(key)}`,
        body,
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to update group CI/CD variable: ${key}`);
    }
  }

  /**
   * Delete a group CI/CD variable
   *
   * @param groupId ID or URL-encoded path of the group
   * @param key Key of the variable to delete
   * @returns Response data
   */
  async deleteGroupCiCdVariable(groupId: string | number, key: string, filter?: {
    environment_scope?: string;
  }) {
    try {
      const params: Record<string, string> = {};
      if (filter?.environment_scope) {
        params['filter[environment_scope]'] = filter.environment_scope;
      }
      const response = await this.axiosInstance.delete(
        `/groups/${encodeURIComponent(String(groupId))}/variables/${encodeURIComponent(key)}`,
        { params }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to delete group CI/CD variable: ${key}`);
    }
  }

  /**
   * List project runners
   * 
   * @param projectId ID or URL-encoded path of the project
   * @returns List of project runners
   */
  async listRunners(projectId: string | number) {
    try {
      const response = await this.axiosInstance.get(`/projects/${encodeURIComponent(String(projectId))}/runners`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to list runners');
    }
  }

  /**
   * Enable a runner for a project
   * 
   * @param projectId ID or URL-encoded path of the project
   * @param runnerId ID of the runner to enable
   * @returns Response data
   */
  async enableRunner(projectId: string | number, runnerId: number) {
    try {
      const response = await this.axiosInstance.post(
        `/projects/${encodeURIComponent(String(projectId))}/runners`,
        { runner_id: runnerId }
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to enable runner: ${runnerId}`);
    }
  }

  /**
   * Disable a runner for a project
   * 
   * @param projectId ID or URL-encoded path of the project
   * @param runnerId ID of the runner to disable
   * @returns Response data
   */
  async disableRunner(projectId: string | number, runnerId: number) {
    try {
      const response = await this.axiosInstance.delete(
        `/projects/${encodeURIComponent(String(projectId))}/runners/${runnerId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to disable runner: ${runnerId}`);
    }
  }

  /**
   * List pipeline schedules
   * 
   * @param projectId ID or URL-encoded path of the project
   * @returns List of pipeline schedules
   */
  async listPipelineSchedules(projectId: string | number) {
    try {
      const response = await this.axiosInstance.get(`/projects/${encodeURIComponent(String(projectId))}/pipeline_schedules`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to list pipeline schedules');
    }
  }

  /**
   * Get a specific pipeline schedule
   * 
   * @param projectId ID or URL-encoded path of the project
   * @param scheduleId ID of the pipeline schedule
   * @returns Pipeline schedule details
   */
  async getPipelineSchedule(projectId: string | number, scheduleId: number) {
    try {
      const response = await this.axiosInstance.get(
        `/projects/${encodeURIComponent(String(projectId))}/pipeline_schedules/${scheduleId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to get pipeline schedule: ${scheduleId}`);
    }
  }

  /**
   * Create a new pipeline schedule
   * 
   * @param projectId ID or URL-encoded path of the project
   * @param options Pipeline schedule options
   * @returns Created pipeline schedule details
   */
  async createPipelineSchedule(projectId: string | number, options: {
    description: string;
    ref: string;
    cron: string;
    cron_timezone?: string;
    active?: boolean;
  }) {
    try {
      const response = await this.axiosInstance.post(
        `/projects/${encodeURIComponent(String(projectId))}/pipeline_schedules`,
        options
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to create pipeline schedule');
    }
  }

  /**
   * Update a pipeline schedule
   * 
   * @param projectId ID or URL-encoded path of the project
   * @param scheduleId ID of the pipeline schedule
   * @param options Pipeline schedule options to update
   * @returns Updated pipeline schedule details
   */
  async updatePipelineSchedule(projectId: string | number, scheduleId: number, options: {
    description?: string;
    ref?: string;
    cron?: string;
    cron_timezone?: string;
    active?: boolean;
  }) {
    try {
      const response = await this.axiosInstance.put(
        `/projects/${encodeURIComponent(String(projectId))}/pipeline_schedules/${scheduleId}`,
        options
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to update pipeline schedule: ${scheduleId}`);
    }
  }

  /**
   * Delete a pipeline schedule
   * 
   * @param projectId ID or URL-encoded path of the project
   * @param scheduleId ID of the pipeline schedule
   * @returns Response data
   */
  async deletePipelineSchedule(projectId: string | number, scheduleId: number) {
    try {
      const response = await this.axiosInstance.delete(
        `/projects/${encodeURIComponent(String(projectId))}/pipeline_schedules/${scheduleId}`
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error, `Failed to delete pipeline schedule: ${scheduleId}`);
    }
  }

  /**
   * Handle API errors
   * 
   * @param error Error object
   * @param defaultMessage Default error message
   * @returns Error object with appropriate message
   */
  private handleError(error: any, defaultMessage: string) {
    if (axios.isAxiosError(error)) {
      return new Error(`${defaultMessage}: ${error.response?.data?.message || error.message}`);
    }
    return new Error(`${defaultMessage}: ${error.message}`);
  }
}
