// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AgentVersion extends APIResource {
  /**
   * The open draft first, if there is one, then published versions newest first.
   * Paginated: pass `pagination.nextCursor` as `after` for the next page.
   *
   * @example
   * ```ts
   * const agentVersions =
   *   await client.agentVersion.list('agentId');
   * ```
   */
  list(
    agentID: string,
    query: AgentVersionListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentVersionListResponse> {
    return this._client.get(path`/v1/agent/${agentID}/versions`, { query, ...options });
  }

  /**
   * One version with every setting, plus the issues that stop it from running, if
   * any.
   *
   * @example
   * ```ts
   * const response = await client.agentVersion.getByID(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  getByID(
    versionID: string,
    params: AgentVersionGetByIDParams,
    options?: RequestOptions,
  ): APIPromise<AgentVersionGetByIDResponse> {
    const { agentId } = params;
    return this._client.get(path`/v1/agent/${agentId}/versions/${versionID}`, options);
  }

  /**
   * Roll back: publishes a new version, numbered after the latest, with this
   * version's settings and makes it live. History stays append-only. An open draft
   * started before this is kept but can no longer be published (409
   * `agent_draft_base_changed`); discard it or start a new one. Pass
   * `expectedLiveVersionId` to be refused (409 `agent_live_version_changed`) if
   * another version went live since you read it.
   *
   * @example
   * ```ts
   * const response = await client.agentVersion.restore(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  restore(
    versionID: string,
    params: AgentVersionRestoreParams,
    options?: RequestOptions,
  ): APIPromise<AgentVersionRestoreResponse> {
    const { agentId, ...body } = params;
    return this._client.post(path`/v1/agent/${agentId}/versions/${versionID}/restore`, { body, ...options });
  }
}

export interface AgentVersionListResponse {
  data: Array<AgentVersionListResponse.Data>;

  pagination: AgentVersionListResponse.Pagination;
}

export namespace AgentVersionListResponse {
  /**
   * One version of a Roark-hosted agent's configuration. Null settings use the
   * runtime default.
   */
  export interface Data {
    id: string;

    agentId: string;

    /**
     * A background preset.
     */
    backgroundNoise:
      | 'NONE'
      | 'AIRPORT'
      | 'CHILDREN_PLAYING'
      | 'CITY'
      | 'COFFEE_SHOP'
      | 'CONSTRUCTION'
      | 'CRYING_BABY'
      | 'DRIVING'
      | 'LIBRARY'
      | 'OFFICE'
      | 'THUNDERSTORM'
      | 'TRAIN'
      | null;

    /**
     * A custom background recording, instead of a preset.
     */
    backgroundNoiseUrl: string | null;

    /**
     * 0 to 1.
     */
    backgroundNoiseVolume: number | null;

    /**
     * The published version a draft started from.
     */
    baseVersionId: string | null;

    callMaxDurationSeconds: number | null;

    callSilenceTimeoutSeconds: number | null;

    chatInactivityTimeoutSeconds: number | null;

    chatMaxDurationSeconds: number | null;

    /**
     * ISO 8601.
     */
    createdAt: string;

    createdById: string | null;

    createdByType: 'USER' | 'API' | 'CONFIG' | 'AUTOIMPROVE' | 'INTEGRATION' | 'SYSTEM';

    endCallGoodbyeMessage: string | null;

    /**
     * Phrases that end the call when the caller says them, matched anywhere in what
     * they say.
     */
    endDetectionPhrases: Array<string>;

    /**
     * When the agent may decide to end the call itself.
     */
    endDetectionReasons: Array<string>;

    /**
     * What the agent says first, with firstMessageMode SPEAK_TEXT.
     */
    firstMessage: string | null;

    /**
     * The audio a call opens with, with firstMessageMode PLAY_AUDIO.
     */
    firstMessageAudioUrl: string | null;

    firstMessageMode: 'SPEAK_TEXT' | 'PLAY_AUDIO' | 'WAIT_FOR_CALLER' | null;

    idleMaxCount: number | null;

    idleMessages: Array<string>;

    idleTimeoutSeconds: number | null;

    interruptionMode: 'ALLOW' | 'BLOCK' | null;

    /**
     * ISO 639-1, e.g. en.
     */
    language: string | null;

    /**
     * OpenAI Live models only: the text model they delegate to.
     */
    llmBackendModel: string | null;

    llmMaxTokens: number | null;

    /**
     * Any model id the provider accepts. One model serves every speaker.
     */
    llmModel: string | null;

    llmProvider: 'OPENAI' | 'ANTHROPIC' | 'GOOGLE' | 'XAI' | 'ULTRAVOX' | 'AWS' | 'ELEVENLABS' | null;

    /**
     * 0 to 2.
     */
    llmTemperature: number | null;

    /**
     * Speech-to-speech models only: the model's own voice.
     */
    llmVoice: string | null;

    /**
     * Whether the agent takes calls, chats, or both.
     */
    modalities: Array<'call' | 'chat'>;

    /**
     * ISO 8601.
     */
    publishedAt: string | null;

    publishedById: string | null;

    publishedByType: 'USER' | 'API' | 'CONFIG' | 'AUTOIMPROVE' | 'INTEGRATION' | 'SYSTEM' | null;

    /**
     * Set when this version restores an older one.
     */
    restoredFromVersionId: string | null;

    /**
     * Increases with every edit to a draft. Send it back as expectedRevision when you
     * publish.
     */
    revision: number;

    /**
     * DRAFT while being edited, PUBLISHED once it has been live.
     */
    status: 'DRAFT' | 'PUBLISHED' | 'DISCARDED';

    sttEndpointingMs: number | null;

    /**
     * Words and phrases the transcriber should listen for.
     */
    sttKeyterms: Array<string>;

    sttModel: string | null;

    sttProvider: 'DEEPGRAM' | 'OPENAI_WHISPER' | 'SPEECHMATICS' | 'ASSEMBLYAI' | 'ELEVENLABS' | null;

    sttSmartFormat: boolean | null;

    sttTurnDetection: 'pipeline' | 'provider' | null;

    /**
     * The main agent (key `main`) first, then the sub-agents it can hand the call to.
     */
    subAgents: Array<Data.SubAgent>;

    /**
     * What changed, written on publish.
     */
    summary: string | null;

    /**
     * ISO 8601.
     */
    updatedAt: string;

    vadStartSecs: number | null;

    vadStopSecs: number | null;

    /**
     * v1, v2, ... assigned on publish; null on a draft.
     */
    versionNumber: number | null;

    /**
     * Why this version cannot run; empty when it can be published. Returned when
     * reading one version.
     */
    issues?: Array<Data.Issue>;
  }

  export namespace Data {
    /**
     * A speaker in the conversation. On a sub-agent, null voice settings use the main
     * agent's.
     */
    export interface SubAgent {
      handoffs: Array<SubAgent.Handoff>;

      /**
       * The call opens as this sub-agent instead of the main agent.
       */
      isInitial: boolean;

      /**
       * `main` for the main agent; otherwise letters, digits, `_` or `-`.
       */
      key: string;

      /**
       * How the agent refers to this speaker.
       */
      name: string | null;

      /**
       * The speaker's prompt.
       */
      systemPrompt: string | null;

      tools: Array<SubAgent.Tool>;

      ttsModel: string | null;

      ttsProvider: 'CARTESIA' | 'ELEVENLABS' | 'OPENAI' | 'RIME' | null;

      /**
       * 0 to 1, ElevenLabs.
       */
      ttsSimilarityBoost: number | null;

      /**
       * 0.5 to 2.
       */
      ttsSpeed: number | null;

      /**
       * 0 to 1, ElevenLabs.
       */
      ttsStability: number | null;

      /**
       * Any voice id the provider accepts, including your own voices.
       */
      ttsVoiceId: string | null;
    }

    export namespace SubAgent {
      export interface Handoff {
        /**
         * When to hand off, in the words the model is given.
         */
        description: string;

        /**
         * SHARED: the new speaker hears the conversation so far. NONE: it starts fresh.
         */
        history: 'SHARED' | 'NONE';

        /**
         * Added to the new speaker's prompt at the handoff, such as a warm-transfer brief.
         */
        note: string | null;

        /**
         * At most once per call.
         */
        once: boolean;

        /**
         * The key of the sub-agent that takes over; `main` for the main agent.
         */
        to: string;
      }

      export interface Tool {
        /**
         * The tool version the agent runs; null runs the tool's latest declared version.
         */
        pinnedVersion: number | null;

        toolDefinitionId: string;
      }
    }

    /**
     * Something that stops a version from running.
     */
    export interface Issue {
      /**
       * The setting the issue is about.
       */
      field: string;

      message: string;
    }
  }

  export interface Pagination {
    /**
     * Whether there are more items to fetch
     */
    hasMore: boolean;

    /**
     * Cursor for the next page of items
     */
    nextCursor: string | null;

    /**
     * Total number of items
     */
    total: number;
  }
}

export interface AgentVersionGetByIDResponse {
  /**
   * One version of a Roark-hosted agent's configuration. Null settings use the
   * runtime default.
   */
  data: AgentVersionGetByIDResponse.Data;
}

export namespace AgentVersionGetByIDResponse {
  /**
   * One version of a Roark-hosted agent's configuration. Null settings use the
   * runtime default.
   */
  export interface Data {
    id: string;

    agentId: string;

    /**
     * A background preset.
     */
    backgroundNoise:
      | 'NONE'
      | 'AIRPORT'
      | 'CHILDREN_PLAYING'
      | 'CITY'
      | 'COFFEE_SHOP'
      | 'CONSTRUCTION'
      | 'CRYING_BABY'
      | 'DRIVING'
      | 'LIBRARY'
      | 'OFFICE'
      | 'THUNDERSTORM'
      | 'TRAIN'
      | null;

    /**
     * A custom background recording, instead of a preset.
     */
    backgroundNoiseUrl: string | null;

    /**
     * 0 to 1.
     */
    backgroundNoiseVolume: number | null;

    /**
     * The published version a draft started from.
     */
    baseVersionId: string | null;

    callMaxDurationSeconds: number | null;

    callSilenceTimeoutSeconds: number | null;

    chatInactivityTimeoutSeconds: number | null;

    chatMaxDurationSeconds: number | null;

    /**
     * ISO 8601.
     */
    createdAt: string;

    createdById: string | null;

    createdByType: 'USER' | 'API' | 'CONFIG' | 'AUTOIMPROVE' | 'INTEGRATION' | 'SYSTEM';

    endCallGoodbyeMessage: string | null;

    /**
     * Phrases that end the call when the caller says them, matched anywhere in what
     * they say.
     */
    endDetectionPhrases: Array<string>;

    /**
     * When the agent may decide to end the call itself.
     */
    endDetectionReasons: Array<string>;

    /**
     * What the agent says first, with firstMessageMode SPEAK_TEXT.
     */
    firstMessage: string | null;

    /**
     * The audio a call opens with, with firstMessageMode PLAY_AUDIO.
     */
    firstMessageAudioUrl: string | null;

    firstMessageMode: 'SPEAK_TEXT' | 'PLAY_AUDIO' | 'WAIT_FOR_CALLER' | null;

    idleMaxCount: number | null;

    idleMessages: Array<string>;

    idleTimeoutSeconds: number | null;

    interruptionMode: 'ALLOW' | 'BLOCK' | null;

    /**
     * ISO 639-1, e.g. en.
     */
    language: string | null;

    /**
     * OpenAI Live models only: the text model they delegate to.
     */
    llmBackendModel: string | null;

    llmMaxTokens: number | null;

    /**
     * Any model id the provider accepts. One model serves every speaker.
     */
    llmModel: string | null;

    llmProvider: 'OPENAI' | 'ANTHROPIC' | 'GOOGLE' | 'XAI' | 'ULTRAVOX' | 'AWS' | 'ELEVENLABS' | null;

    /**
     * 0 to 2.
     */
    llmTemperature: number | null;

    /**
     * Speech-to-speech models only: the model's own voice.
     */
    llmVoice: string | null;

    /**
     * Whether the agent takes calls, chats, or both.
     */
    modalities: Array<'call' | 'chat'>;

    /**
     * ISO 8601.
     */
    publishedAt: string | null;

    publishedById: string | null;

    publishedByType: 'USER' | 'API' | 'CONFIG' | 'AUTOIMPROVE' | 'INTEGRATION' | 'SYSTEM' | null;

    /**
     * Set when this version restores an older one.
     */
    restoredFromVersionId: string | null;

    /**
     * Increases with every edit to a draft. Send it back as expectedRevision when you
     * publish.
     */
    revision: number;

    /**
     * DRAFT while being edited, PUBLISHED once it has been live.
     */
    status: 'DRAFT' | 'PUBLISHED' | 'DISCARDED';

    sttEndpointingMs: number | null;

    /**
     * Words and phrases the transcriber should listen for.
     */
    sttKeyterms: Array<string>;

    sttModel: string | null;

    sttProvider: 'DEEPGRAM' | 'OPENAI_WHISPER' | 'SPEECHMATICS' | 'ASSEMBLYAI' | 'ELEVENLABS' | null;

    sttSmartFormat: boolean | null;

    sttTurnDetection: 'pipeline' | 'provider' | null;

    /**
     * The main agent (key `main`) first, then the sub-agents it can hand the call to.
     */
    subAgents: Array<Data.SubAgent>;

    /**
     * What changed, written on publish.
     */
    summary: string | null;

    /**
     * ISO 8601.
     */
    updatedAt: string;

    vadStartSecs: number | null;

    vadStopSecs: number | null;

    /**
     * v1, v2, ... assigned on publish; null on a draft.
     */
    versionNumber: number | null;

    /**
     * Why this version cannot run; empty when it can be published. Returned when
     * reading one version.
     */
    issues?: Array<Data.Issue>;
  }

  export namespace Data {
    /**
     * A speaker in the conversation. On a sub-agent, null voice settings use the main
     * agent's.
     */
    export interface SubAgent {
      handoffs: Array<SubAgent.Handoff>;

      /**
       * The call opens as this sub-agent instead of the main agent.
       */
      isInitial: boolean;

      /**
       * `main` for the main agent; otherwise letters, digits, `_` or `-`.
       */
      key: string;

      /**
       * How the agent refers to this speaker.
       */
      name: string | null;

      /**
       * The speaker's prompt.
       */
      systemPrompt: string | null;

      tools: Array<SubAgent.Tool>;

      ttsModel: string | null;

      ttsProvider: 'CARTESIA' | 'ELEVENLABS' | 'OPENAI' | 'RIME' | null;

      /**
       * 0 to 1, ElevenLabs.
       */
      ttsSimilarityBoost: number | null;

      /**
       * 0.5 to 2.
       */
      ttsSpeed: number | null;

      /**
       * 0 to 1, ElevenLabs.
       */
      ttsStability: number | null;

      /**
       * Any voice id the provider accepts, including your own voices.
       */
      ttsVoiceId: string | null;
    }

    export namespace SubAgent {
      export interface Handoff {
        /**
         * When to hand off, in the words the model is given.
         */
        description: string;

        /**
         * SHARED: the new speaker hears the conversation so far. NONE: it starts fresh.
         */
        history: 'SHARED' | 'NONE';

        /**
         * Added to the new speaker's prompt at the handoff, such as a warm-transfer brief.
         */
        note: string | null;

        /**
         * At most once per call.
         */
        once: boolean;

        /**
         * The key of the sub-agent that takes over; `main` for the main agent.
         */
        to: string;
      }

      export interface Tool {
        /**
         * The tool version the agent runs; null runs the tool's latest declared version.
         */
        pinnedVersion: number | null;

        toolDefinitionId: string;
      }
    }

    /**
     * Something that stops a version from running.
     */
    export interface Issue {
      /**
       * The setting the issue is about.
       */
      field: string;

      message: string;
    }
  }
}

export interface AgentVersionRestoreResponse {
  /**
   * One version of a Roark-hosted agent's configuration. Null settings use the
   * runtime default.
   */
  data: AgentVersionRestoreResponse.Data;
}

export namespace AgentVersionRestoreResponse {
  /**
   * One version of a Roark-hosted agent's configuration. Null settings use the
   * runtime default.
   */
  export interface Data {
    id: string;

    agentId: string;

    /**
     * A background preset.
     */
    backgroundNoise:
      | 'NONE'
      | 'AIRPORT'
      | 'CHILDREN_PLAYING'
      | 'CITY'
      | 'COFFEE_SHOP'
      | 'CONSTRUCTION'
      | 'CRYING_BABY'
      | 'DRIVING'
      | 'LIBRARY'
      | 'OFFICE'
      | 'THUNDERSTORM'
      | 'TRAIN'
      | null;

    /**
     * A custom background recording, instead of a preset.
     */
    backgroundNoiseUrl: string | null;

    /**
     * 0 to 1.
     */
    backgroundNoiseVolume: number | null;

    /**
     * The published version a draft started from.
     */
    baseVersionId: string | null;

    callMaxDurationSeconds: number | null;

    callSilenceTimeoutSeconds: number | null;

    chatInactivityTimeoutSeconds: number | null;

    chatMaxDurationSeconds: number | null;

    /**
     * ISO 8601.
     */
    createdAt: string;

    createdById: string | null;

    createdByType: 'USER' | 'API' | 'CONFIG' | 'AUTOIMPROVE' | 'INTEGRATION' | 'SYSTEM';

    endCallGoodbyeMessage: string | null;

    /**
     * Phrases that end the call when the caller says them, matched anywhere in what
     * they say.
     */
    endDetectionPhrases: Array<string>;

    /**
     * When the agent may decide to end the call itself.
     */
    endDetectionReasons: Array<string>;

    /**
     * What the agent says first, with firstMessageMode SPEAK_TEXT.
     */
    firstMessage: string | null;

    /**
     * The audio a call opens with, with firstMessageMode PLAY_AUDIO.
     */
    firstMessageAudioUrl: string | null;

    firstMessageMode: 'SPEAK_TEXT' | 'PLAY_AUDIO' | 'WAIT_FOR_CALLER' | null;

    idleMaxCount: number | null;

    idleMessages: Array<string>;

    idleTimeoutSeconds: number | null;

    interruptionMode: 'ALLOW' | 'BLOCK' | null;

    /**
     * ISO 639-1, e.g. en.
     */
    language: string | null;

    /**
     * OpenAI Live models only: the text model they delegate to.
     */
    llmBackendModel: string | null;

    llmMaxTokens: number | null;

    /**
     * Any model id the provider accepts. One model serves every speaker.
     */
    llmModel: string | null;

    llmProvider: 'OPENAI' | 'ANTHROPIC' | 'GOOGLE' | 'XAI' | 'ULTRAVOX' | 'AWS' | 'ELEVENLABS' | null;

    /**
     * 0 to 2.
     */
    llmTemperature: number | null;

    /**
     * Speech-to-speech models only: the model's own voice.
     */
    llmVoice: string | null;

    /**
     * Whether the agent takes calls, chats, or both.
     */
    modalities: Array<'call' | 'chat'>;

    /**
     * ISO 8601.
     */
    publishedAt: string | null;

    publishedById: string | null;

    publishedByType: 'USER' | 'API' | 'CONFIG' | 'AUTOIMPROVE' | 'INTEGRATION' | 'SYSTEM' | null;

    /**
     * Set when this version restores an older one.
     */
    restoredFromVersionId: string | null;

    /**
     * Increases with every edit to a draft. Send it back as expectedRevision when you
     * publish.
     */
    revision: number;

    /**
     * DRAFT while being edited, PUBLISHED once it has been live.
     */
    status: 'DRAFT' | 'PUBLISHED' | 'DISCARDED';

    sttEndpointingMs: number | null;

    /**
     * Words and phrases the transcriber should listen for.
     */
    sttKeyterms: Array<string>;

    sttModel: string | null;

    sttProvider: 'DEEPGRAM' | 'OPENAI_WHISPER' | 'SPEECHMATICS' | 'ASSEMBLYAI' | 'ELEVENLABS' | null;

    sttSmartFormat: boolean | null;

    sttTurnDetection: 'pipeline' | 'provider' | null;

    /**
     * The main agent (key `main`) first, then the sub-agents it can hand the call to.
     */
    subAgents: Array<Data.SubAgent>;

    /**
     * What changed, written on publish.
     */
    summary: string | null;

    /**
     * ISO 8601.
     */
    updatedAt: string;

    vadStartSecs: number | null;

    vadStopSecs: number | null;

    /**
     * v1, v2, ... assigned on publish; null on a draft.
     */
    versionNumber: number | null;

    /**
     * Why this version cannot run; empty when it can be published. Returned when
     * reading one version.
     */
    issues?: Array<Data.Issue>;
  }

  export namespace Data {
    /**
     * A speaker in the conversation. On a sub-agent, null voice settings use the main
     * agent's.
     */
    export interface SubAgent {
      handoffs: Array<SubAgent.Handoff>;

      /**
       * The call opens as this sub-agent instead of the main agent.
       */
      isInitial: boolean;

      /**
       * `main` for the main agent; otherwise letters, digits, `_` or `-`.
       */
      key: string;

      /**
       * How the agent refers to this speaker.
       */
      name: string | null;

      /**
       * The speaker's prompt.
       */
      systemPrompt: string | null;

      tools: Array<SubAgent.Tool>;

      ttsModel: string | null;

      ttsProvider: 'CARTESIA' | 'ELEVENLABS' | 'OPENAI' | 'RIME' | null;

      /**
       * 0 to 1, ElevenLabs.
       */
      ttsSimilarityBoost: number | null;

      /**
       * 0.5 to 2.
       */
      ttsSpeed: number | null;

      /**
       * 0 to 1, ElevenLabs.
       */
      ttsStability: number | null;

      /**
       * Any voice id the provider accepts, including your own voices.
       */
      ttsVoiceId: string | null;
    }

    export namespace SubAgent {
      export interface Handoff {
        /**
         * When to hand off, in the words the model is given.
         */
        description: string;

        /**
         * SHARED: the new speaker hears the conversation so far. NONE: it starts fresh.
         */
        history: 'SHARED' | 'NONE';

        /**
         * Added to the new speaker's prompt at the handoff, such as a warm-transfer brief.
         */
        note: string | null;

        /**
         * At most once per call.
         */
        once: boolean;

        /**
         * The key of the sub-agent that takes over; `main` for the main agent.
         */
        to: string;
      }

      export interface Tool {
        /**
         * The tool version the agent runs; null runs the tool's latest declared version.
         */
        pinnedVersion: number | null;

        toolDefinitionId: string;
      }
    }

    /**
     * Something that stops a version from running.
     */
    export interface Issue {
      /**
       * The setting the issue is about.
       */
      field: string;

      message: string;
    }
  }
}

export interface AgentVersionListParams {
  after?: string;

  limit?: number;
}

export interface AgentVersionGetByIDParams {
  agentId: string;
}

export interface AgentVersionRestoreParams {
  /**
   * Path param
   */
  agentId: string;

  /**
   * Body param: The live version when you decided to restore. When sent, the restore
   * is refused with 409 if another version went live since.
   */
  expectedLiveVersionId?: string;

  /**
   * Body param
   */
  summary?: string;
}

export declare namespace AgentVersion {
  export {
    type AgentVersionListResponse as AgentVersionListResponse,
    type AgentVersionGetByIDResponse as AgentVersionGetByIDResponse,
    type AgentVersionRestoreResponse as AgentVersionRestoreResponse,
    type AgentVersionListParams as AgentVersionListParams,
    type AgentVersionGetByIDParams as AgentVersionGetByIDParams,
    type AgentVersionRestoreParams as AgentVersionRestoreParams,
  };
}
