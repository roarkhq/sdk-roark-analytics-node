// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AgentPrompt extends APIResource {
  /**
   * Sets the agent's API-managed prompt. This is its own version history
   * (`source: API_MANAGED`), separate from prompts observed on calls, edited in the
   * app, or managed by config-as-code. Setting the same content twice is a no-op (no
   * new version). Roark does not run your agent and no metric reads this prompt: it
   * is stored and versioned for your reference.
   *
   * @example
   * ```ts
   * const agentPrompt = await client.agentPrompt.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { prompt: 'x' },
   * );
   * ```
   */
  update(
    agentID: string,
    body: AgentPromptUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AgentPromptUpdateResponse> {
    return this._client.put(path`/v1/agent/${agentID}/prompts`, { body, ...options });
  }

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

export interface AgentPromptUpdateResponse {
  data: AgentPromptUpdateResponse.Data;
}

export namespace AgentPromptUpdateResponse {
  export interface Data {
    /**
     * True if a new version was appended; false if the content matched the current
     * version (no-op).
     */
    changed: boolean;

    /**
     * The ID of the API-managed prompt lineage.
     */
    promptId: string;

    /**
     * The current version number after the set.
     */
    versionNumber: number;
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
      | 'CONFIG'
      | 'API_MANAGED';

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

export interface AgentPromptUpdateParams {
  /**
   * The prompt content to set.
   */
  prompt: string;
}

export interface AgentPromptListVersionsParams {
  agentId: string;
}

export declare namespace AgentPrompt {
  export {
    type AgentPromptUpdateResponse as AgentPromptUpdateResponse,
    type AgentPromptListResponse as AgentPromptListResponse,
    type AgentPromptListVersionsResponse as AgentPromptListVersionsResponse,
    type AgentPromptUpdateParams as AgentPromptUpdateParams,
    type AgentPromptListVersionsParams as AgentPromptListVersionsParams,
  };
}
