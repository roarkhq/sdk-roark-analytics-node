// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AgentDraft extends APIResource {
  /**
   * Opens the agent's one shared draft, a copy of the live version or of an older
   * published version. Fails with 409 when a draft is already open.
   *
   * @example
   * ```ts
   * const agentDraft = await client.agentDraft.create(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  create(
    agentID: string,
    body: AgentDraftCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentDraftCreateResponse> {
    return this._client.post(path`/v1/agent/${agentID}/draft`, { body, ...options });
  }

  /**
   * Changes settings on the draft. Omitted settings stay as they are. Pass the
   * revision you read as expectedRevision to fail with 409 if anyone edited the
   * draft since, instead of applying on top of their edit.
   *
   * @example
   * ```ts
   * const agentDraft = await client.agentDraft.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { settings: {} },
   * );
   * ```
   */
  update(
    agentID: string,
    body: AgentDraftUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AgentDraftUpdateResponse> {
    return this._client.patch(path`/v1/agent/${agentID}/draft`, { body, ...options });
  }

  /**
   * Throws the open draft away and returns it. The live version is unchanged.
   *
   * @example
   * ```ts
   * const agentDraft = await client.agentDraft.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  delete(agentID: string, options?: RequestOptions): APIPromise<AgentDraftDeleteResponse> {
    return this._client.delete(path`/v1/agent/${agentID}/draft`, options);
  }

  /**
   * The agent's open draft, with the issues that would stop it from being published.
   *
   * @example
   * ```ts
   * const agentDraft = await client.agentDraft.get(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  get(agentID: string, options?: RequestOptions): APIPromise<AgentDraftGetResponse> {
    return this._client.get(path`/v1/agent/${agentID}/draft`, options);
  }

  /**
   * Makes the draft the live version, numbered v1, v2, ... Fails with 409 if the
   * draft was edited after expectedRevision, if another version was published since
   * the draft started, or if it changes nothing; with 400 and the issues if the
   * version cannot run.
   *
   * @example
   * ```ts
   * const response = await client.agentDraft.publish(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { expectedRevision: 1 },
   * );
   * ```
   */
  publish(
    agentID: string,
    body: AgentDraftPublishParams,
    options?: RequestOptions,
  ): APIPromise<AgentDraftPublishResponse> {
    return this._client.post(path`/v1/agent/${agentID}/draft/publish`, { body, ...options });
  }
}

export interface AgentDraftCreateResponse {
  /**
   * One version of a Roark-hosted agent's configuration. Null settings use the
   * runtime default.
   */
  data: AgentDraftCreateResponse.Data;
}

export namespace AgentDraftCreateResponse {
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

export interface AgentDraftUpdateResponse {
  /**
   * One version of a Roark-hosted agent's configuration. Null settings use the
   * runtime default.
   */
  data: AgentDraftUpdateResponse.Data;
}

export namespace AgentDraftUpdateResponse {
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

export interface AgentDraftDeleteResponse {
  /**
   * One version of a Roark-hosted agent's configuration. Null settings use the
   * runtime default.
   */
  data: AgentDraftDeleteResponse.Data;
}

export namespace AgentDraftDeleteResponse {
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

export interface AgentDraftGetResponse {
  /**
   * One version of a Roark-hosted agent's configuration. Null settings use the
   * runtime default.
   */
  data: AgentDraftGetResponse.Data;
}

export namespace AgentDraftGetResponse {
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

export interface AgentDraftPublishResponse {
  /**
   * One version of a Roark-hosted agent's configuration. Null settings use the
   * runtime default.
   */
  data: AgentDraftPublishResponse.Data;
}

export namespace AgentDraftPublishResponse {
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

export interface AgentDraftCreateParams {
  /**
   * Start from this published version instead of the live one.
   */
  fromVersionId?: string;
}

export interface AgentDraftUpdateParams {
  /**
   * The settings to change. Omitted settings stay as they are; null clears one to
   * the runtime default. subAgents replaces every speaker and must include `main`.
   */
  settings: AgentDraftUpdateParams.Settings;

  /**
   * The draft's revision when you read it. When sent, the edit is refused if the
   * draft changed since; when omitted, it applies on top of the latest edit.
   */
  expectedRevision?: number;
}

export namespace AgentDraftUpdateParams {
  /**
   * The settings to change. Omitted settings stay as they are; null clears one to
   * the runtime default. subAgents replaces every speaker and must include `main`.
   */
  export interface Settings {
    backgroundNoise?:
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

    backgroundNoiseUrl?: string | null;

    backgroundNoiseVolume?: number | null;

    callMaxDurationSeconds?: number | null;

    callSilenceTimeoutSeconds?: number | null;

    chatInactivityTimeoutSeconds?: number | null;

    chatMaxDurationSeconds?: number | null;

    endCallGoodbyeMessage?: string | null;

    endDetectionPhrases?: Array<string>;

    endDetectionReasons?: Array<string>;

    firstMessage?: string | null;

    firstMessageAudioUrl?: string | null;

    firstMessageMode?: 'SPEAK_TEXT' | 'PLAY_AUDIO' | 'WAIT_FOR_CALLER' | null;

    idleMaxCount?: number | null;

    idleMessages?: Array<string>;

    idleTimeoutSeconds?: number | null;

    interruptionMode?: 'ALLOW' | 'BLOCK' | null;

    language?: string | null;

    llmBackendModel?: string | null;

    llmMaxTokens?: number | null;

    llmModel?: string | null;

    llmProvider?: 'OPENAI' | 'ANTHROPIC' | 'GOOGLE' | 'XAI' | 'ULTRAVOX' | 'AWS' | 'ELEVENLABS' | null;

    llmTemperature?: number | null;

    llmVoice?: string | null;

    modalities?: Array<'call' | 'chat'>;

    sttEndpointingMs?: number | null;

    sttKeyterms?: Array<string>;

    sttModel?: string | null;

    sttProvider?: 'DEEPGRAM' | 'OPENAI_WHISPER' | 'SPEECHMATICS' | 'ASSEMBLYAI' | 'ELEVENLABS' | null;

    sttSmartFormat?: boolean | null;

    sttTurnDetection?: 'pipeline' | 'provider' | null;

    subAgents?: Array<Settings.SubAgent>;

    vadStartSecs?: number | null;

    vadStopSecs?: number | null;
  }

  export namespace Settings {
    export interface SubAgent {
      handoffs: Array<SubAgent.Handoff>;

      isInitial: boolean;

      key: 'main' | string;

      name: string | null;

      systemPrompt: string | null;

      tools: Array<SubAgent.Tool>;

      ttsModel: string | null;

      ttsProvider: 'CARTESIA' | 'ELEVENLABS' | 'OPENAI' | 'RIME' | null;

      ttsSimilarityBoost: number | null;

      ttsSpeed: number | null;

      ttsStability: number | null;

      ttsVoiceId: string | null;
    }

    export namespace SubAgent {
      export interface Handoff {
        description: string;

        history: 'SHARED' | 'NONE';

        note: string | null;

        once: boolean;

        to: 'main' | string;
      }

      export interface Tool {
        pinnedVersion: number | null;

        toolDefinitionId: string;
      }
    }
  }
}

export interface AgentDraftPublishParams {
  /**
   * The draft revision you reviewed.
   */
  expectedRevision: number;

  /**
   * What changed.
   */
  summary?: string;
}

export declare namespace AgentDraft {
  export {
    type AgentDraftCreateResponse as AgentDraftCreateResponse,
    type AgentDraftUpdateResponse as AgentDraftUpdateResponse,
    type AgentDraftDeleteResponse as AgentDraftDeleteResponse,
    type AgentDraftGetResponse as AgentDraftGetResponse,
    type AgentDraftPublishResponse as AgentDraftPublishResponse,
    type AgentDraftCreateParams as AgentDraftCreateParams,
    type AgentDraftUpdateParams as AgentDraftUpdateParams,
    type AgentDraftPublishParams as AgentDraftPublishParams,
  };
}
