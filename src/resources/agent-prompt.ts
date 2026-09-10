// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AgentPrompt extends APIResource {
  /**
   * Returns the agent's prompt lineages. Each lineage is an independent version
   * history, labelled by its `source` (USER, API, CONFIG, or a provider
   * integration). `prompt` is the current content.
   *
   * @example
   * ```ts
   * const agentPrompts = await client.agentPrompt.list(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  list(agentID: string, options?: RequestOptions): APIPromise<AgentPromptListResponse> {
    return this._client.get(path`/v1/agent/${agentID}/prompts`, options);
  }

  /**
   * Returns the full version history of a single prompt lineage, newest first.
   *
   * @example
   * ```ts
   * const response = await client.agentPrompt.listVersions(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  listVersions(
    promptID: string,
    params: AgentPromptListVersionsParams,
    options?: RequestOptions,
  ): APIPromise<AgentPromptListVersionsResponse> {
    const { agentId } = params;
    return this._client.get(path`/v1/agent/${agentId}/prompts/${promptID}/versions`, options);
  }
}

export interface AgentPromptListResponse {
  data: Array<AgentPromptListResponse.Data>;
}

export namespace AgentPromptListResponse {
  /**
   * A prompt lineage on an agent.
   */
  export interface Data {
    /**
     * Prompt lineage ID (its own version history).
     */
    id: string;

    /**
     * When this prompt lineage was first created (ISO 8601).
     */
    createdAt: string;

    /**
     * Current prompt content (the latest version).
     */
    prompt: string;

    /**
     * Where this prompt came from: USER (edited in the app), API (provided via the API
     * or on calls), CONFIG (managed by config-as-code), or a provider integration.
     */
    source:
      | 'USER'
      | 'RETELL_INTEGRATION'
      | 'VAPI_INTEGRATION'
      | 'ELEVEN_LABS_INTEGRATION'
      | 'BLAND_INTEGRATION'
      | 'PIPECAT_CLOUD_INTEGRATION'
      | 'PIPECAT_SELF_HOSTED_INTEGRATION'
      | 'LIVEKIT_SELF_HOSTED_INTEGRATION'
      | 'API'
      | 'CONFIG';

    /**
     * When the current version was recorded (ISO 8601).
     */
    updatedAt: string;
  }
}

export interface AgentPromptListVersionsResponse {
  data: Array<AgentPromptListVersionsResponse.Data>;
}

export namespace AgentPromptListVersionsResponse {
  export interface Data {
    /**
     * When this version was recorded (ISO 8601).
     */
    createdAt: string;

    /**
     * Prompt content at this version.
     */
    prompt: string;

    /**
     * Version number: 1-based and increasing.
     */
    versionNumber: number;
  }
}

export interface AgentPromptListVersionsParams {
  agentId: string;
}

export declare namespace AgentPrompt {
  export {
    type AgentPromptListResponse as AgentPromptListResponse,
    type AgentPromptListVersionsResponse as AgentPromptListVersionsResponse,
    type AgentPromptListVersionsParams as AgentPromptListVersionsParams,
  };
}
