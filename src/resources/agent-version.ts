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
   * Publishes a new version, numbered after the latest, with this version's settings
   * and makes it live. History stays append-only. An open draft started before this
   * is kept but can no longer be published (409 `agent_draft_base_changed`); discard
   * it or start a new one. Pass `expectedLiveVersionId` to be refused (409
   * `agent_live_version_changed`) if another version went live since you read it.
   *
   * @example
   * ```ts
   * const response = await client.agentVersion.rollback(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   * );
   * ```
   */
  rollback(
    versionID: string,
    params: AgentVersionRollbackParams,
    options?: RequestOptions,
  ): APIPromise<AgentVersionRollbackResponse> {
    const { agentId, ...body } = params;
    return this._client.post(path`/v1/agent/${agentId}/versions/${versionID}/rollback`, { body, ...options });
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
     * Increases with every edit to a draft. Send it back as expectedRevision when you
     * publish.
     */
    revision: number;

    /**
     * Set when this version rolls the agent back to an older one.
     */
    rolledBackFromVersionId: string | null;

    /**
     * DRAFT while being edited, PUBLISHED once it has been live.
     */
    status: 'DRAFT' | 'PUBLISHED' | 'DISCARDED';

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
     * A speaker in the conversation. A sub-agent without model configs runs on the
     * main agent's.
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
       * Up to three, in the order a call tries them. Empty on a sub-agent: it runs on
       * the main agent's. The main agent needs one.
       */
      modelConfigs: Array<SubAgent.AgentCascadeModelConfig | SubAgent.AgentSpeechToSpeechModelConfig>;

      /**
       * How the agent refers to this speaker.
       */
      name: string | null;

      /**
       * The speaker's prompt.
       */
      systemPrompt: string | null;

      tools: Array<SubAgent.Tool>;
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

      /**
       * A transcriber, a text model and a voice. A component that fails during a call
       * moves to its next entry; the others stay.
       */
      export interface AgentCascadeModelConfig {
        /**
         * One to three text models, in the order a call tries them.
         */
        llm: Array<AgentCascadeModelConfig.Llm>;

        /**
         * One to three transcribers, in the order a call tries them.
         */
        stt: Array<AgentCascadeModelConfig.Stt>;

        /**
         * One to three voices, in the order a call tries them.
         */
        tts: Array<AgentCascadeModelConfig.Tt>;

        type: 'CASCADE';
      }

      export namespace AgentCascadeModelConfig {
        /**
         * A text model. Null settings use the default.
         */
        export interface Llm {
          maxTokens: number | null;

          /**
           * Any text model id the provider accepts.
           */
          model: string;

          provider: 'OPENAI' | 'ANTHROPIC' | 'GOOGLE' | 'XAI' | 'ULTRAVOX' | 'AWS' | 'ELEVENLABS';

          /**
           * 0 to 2.
           */
          temperature: number | null;
        }

        /**
         * A transcriber. Null settings use the default.
         */
        export interface Stt {
          /**
           * How long the transcriber waits before it ends a turn.
           */
          endpointingMs: number | null;

          /**
           * Words and phrases the transcriber should listen for.
           */
          keyterms: Array<string>;

          /**
           * Any transcriber model id the provider accepts.
           */
          model: string;

          provider: 'DEEPGRAM' | 'OPENAI_WHISPER' | 'SPEECHMATICS' | 'ASSEMBLYAI' | 'ELEVENLABS';

          smartFormat: boolean | null;

          turnDetection: 'pipeline' | 'provider' | null;
        }

        /**
         * A voice. Null settings use the default.
         */
        export interface Tt {
          /**
           * Any voice model id the provider accepts.
           */
          model: string;

          provider: 'CARTESIA' | 'ELEVENLABS' | 'OPENAI' | 'RIME';

          /**
           * 0 to 1, ElevenLabs.
           */
          similarityBoost: number | null;

          /**
           * 0.5 to 2.
           */
          speed: number | null;

          /**
           * 0 to 1, ElevenLabs.
           */
          stability: number | null;

          /**
           * Any voice id the provider accepts, including your own voices.
           */
          voiceId: string;
        }
      }

      /**
       * One model that hears the caller and speaks with its own voice.
       */
      export interface AgentSpeechToSpeechModelConfig {
        /**
         * A model that hears the caller and speaks with its own voice. Null settings use
         * the default.
         */
        speechToSpeech: AgentSpeechToSpeechModelConfig.SpeechToSpeech;

        type: 'SPEECH_TO_SPEECH';
      }

      export namespace AgentSpeechToSpeechModelConfig {
        /**
         * A model that hears the caller and speaks with its own voice. Null settings use
         * the default.
         */
        export interface SpeechToSpeech {
          /**
           * OpenAI Live models only: the text model they delegate to.
           */
          backendModel: string | null;

          maxOutputTokens: number | null;

          /**
           * Any speech-to-speech model id the provider accepts.
           */
          model: string;

          provider: 'OPENAI' | 'ANTHROPIC' | 'GOOGLE' | 'XAI' | 'ULTRAVOX' | 'AWS' | 'ELEVENLABS';

          /**
           * 0 to 2.
           */
          temperature: number | null;

          /**
           * The model's own voice.
           */
          voice: string | null;
        }
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
     * Increases with every edit to a draft. Send it back as expectedRevision when you
     * publish.
     */
    revision: number;

    /**
     * Set when this version rolls the agent back to an older one.
     */
    rolledBackFromVersionId: string | null;

    /**
     * DRAFT while being edited, PUBLISHED once it has been live.
     */
    status: 'DRAFT' | 'PUBLISHED' | 'DISCARDED';

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
     * A speaker in the conversation. A sub-agent without model configs runs on the
     * main agent's.
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
       * Up to three, in the order a call tries them. Empty on a sub-agent: it runs on
       * the main agent's. The main agent needs one.
       */
      modelConfigs: Array<SubAgent.AgentCascadeModelConfig | SubAgent.AgentSpeechToSpeechModelConfig>;

      /**
       * How the agent refers to this speaker.
       */
      name: string | null;

      /**
       * The speaker's prompt.
       */
      systemPrompt: string | null;

      tools: Array<SubAgent.Tool>;
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

      /**
       * A transcriber, a text model and a voice. A component that fails during a call
       * moves to its next entry; the others stay.
       */
      export interface AgentCascadeModelConfig {
        /**
         * One to three text models, in the order a call tries them.
         */
        llm: Array<AgentCascadeModelConfig.Llm>;

        /**
         * One to three transcribers, in the order a call tries them.
         */
        stt: Array<AgentCascadeModelConfig.Stt>;

        /**
         * One to three voices, in the order a call tries them.
         */
        tts: Array<AgentCascadeModelConfig.Tt>;

        type: 'CASCADE';
      }

      export namespace AgentCascadeModelConfig {
        /**
         * A text model. Null settings use the default.
         */
        export interface Llm {
          maxTokens: number | null;

          /**
           * Any text model id the provider accepts.
           */
          model: string;

          provider: 'OPENAI' | 'ANTHROPIC' | 'GOOGLE' | 'XAI' | 'ULTRAVOX' | 'AWS' | 'ELEVENLABS';

          /**
           * 0 to 2.
           */
          temperature: number | null;
        }

        /**
         * A transcriber. Null settings use the default.
         */
        export interface Stt {
          /**
           * How long the transcriber waits before it ends a turn.
           */
          endpointingMs: number | null;

          /**
           * Words and phrases the transcriber should listen for.
           */
          keyterms: Array<string>;

          /**
           * Any transcriber model id the provider accepts.
           */
          model: string;

          provider: 'DEEPGRAM' | 'OPENAI_WHISPER' | 'SPEECHMATICS' | 'ASSEMBLYAI' | 'ELEVENLABS';

          smartFormat: boolean | null;

          turnDetection: 'pipeline' | 'provider' | null;
        }

        /**
         * A voice. Null settings use the default.
         */
        export interface Tt {
          /**
           * Any voice model id the provider accepts.
           */
          model: string;

          provider: 'CARTESIA' | 'ELEVENLABS' | 'OPENAI' | 'RIME';

          /**
           * 0 to 1, ElevenLabs.
           */
          similarityBoost: number | null;

          /**
           * 0.5 to 2.
           */
          speed: number | null;

          /**
           * 0 to 1, ElevenLabs.
           */
          stability: number | null;

          /**
           * Any voice id the provider accepts, including your own voices.
           */
          voiceId: string;
        }
      }

      /**
       * One model that hears the caller and speaks with its own voice.
       */
      export interface AgentSpeechToSpeechModelConfig {
        /**
         * A model that hears the caller and speaks with its own voice. Null settings use
         * the default.
         */
        speechToSpeech: AgentSpeechToSpeechModelConfig.SpeechToSpeech;

        type: 'SPEECH_TO_SPEECH';
      }

      export namespace AgentSpeechToSpeechModelConfig {
        /**
         * A model that hears the caller and speaks with its own voice. Null settings use
         * the default.
         */
        export interface SpeechToSpeech {
          /**
           * OpenAI Live models only: the text model they delegate to.
           */
          backendModel: string | null;

          maxOutputTokens: number | null;

          /**
           * Any speech-to-speech model id the provider accepts.
           */
          model: string;

          provider: 'OPENAI' | 'ANTHROPIC' | 'GOOGLE' | 'XAI' | 'ULTRAVOX' | 'AWS' | 'ELEVENLABS';

          /**
           * 0 to 2.
           */
          temperature: number | null;

          /**
           * The model's own voice.
           */
          voice: string | null;
        }
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

export interface AgentVersionRollbackResponse {
  /**
   * One version of a Roark-hosted agent's configuration. Null settings use the
   * runtime default.
   */
  data: AgentVersionRollbackResponse.Data;
}

export namespace AgentVersionRollbackResponse {
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
     * Increases with every edit to a draft. Send it back as expectedRevision when you
     * publish.
     */
    revision: number;

    /**
     * Set when this version rolls the agent back to an older one.
     */
    rolledBackFromVersionId: string | null;

    /**
     * DRAFT while being edited, PUBLISHED once it has been live.
     */
    status: 'DRAFT' | 'PUBLISHED' | 'DISCARDED';

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
     * A speaker in the conversation. A sub-agent without model configs runs on the
     * main agent's.
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
       * Up to three, in the order a call tries them. Empty on a sub-agent: it runs on
       * the main agent's. The main agent needs one.
       */
      modelConfigs: Array<SubAgent.AgentCascadeModelConfig | SubAgent.AgentSpeechToSpeechModelConfig>;

      /**
       * How the agent refers to this speaker.
       */
      name: string | null;

      /**
       * The speaker's prompt.
       */
      systemPrompt: string | null;

      tools: Array<SubAgent.Tool>;
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

      /**
       * A transcriber, a text model and a voice. A component that fails during a call
       * moves to its next entry; the others stay.
       */
      export interface AgentCascadeModelConfig {
        /**
         * One to three text models, in the order a call tries them.
         */
        llm: Array<AgentCascadeModelConfig.Llm>;

        /**
         * One to three transcribers, in the order a call tries them.
         */
        stt: Array<AgentCascadeModelConfig.Stt>;

        /**
         * One to three voices, in the order a call tries them.
         */
        tts: Array<AgentCascadeModelConfig.Tt>;

        type: 'CASCADE';
      }

      export namespace AgentCascadeModelConfig {
        /**
         * A text model. Null settings use the default.
         */
        export interface Llm {
          maxTokens: number | null;

          /**
           * Any text model id the provider accepts.
           */
          model: string;

          provider: 'OPENAI' | 'ANTHROPIC' | 'GOOGLE' | 'XAI' | 'ULTRAVOX' | 'AWS' | 'ELEVENLABS';

          /**
           * 0 to 2.
           */
          temperature: number | null;
        }

        /**
         * A transcriber. Null settings use the default.
         */
        export interface Stt {
          /**
           * How long the transcriber waits before it ends a turn.
           */
          endpointingMs: number | null;

          /**
           * Words and phrases the transcriber should listen for.
           */
          keyterms: Array<string>;

          /**
           * Any transcriber model id the provider accepts.
           */
          model: string;

          provider: 'DEEPGRAM' | 'OPENAI_WHISPER' | 'SPEECHMATICS' | 'ASSEMBLYAI' | 'ELEVENLABS';

          smartFormat: boolean | null;

          turnDetection: 'pipeline' | 'provider' | null;
        }

        /**
         * A voice. Null settings use the default.
         */
        export interface Tt {
          /**
           * Any voice model id the provider accepts.
           */
          model: string;

          provider: 'CARTESIA' | 'ELEVENLABS' | 'OPENAI' | 'RIME';

          /**
           * 0 to 1, ElevenLabs.
           */
          similarityBoost: number | null;

          /**
           * 0.5 to 2.
           */
          speed: number | null;

          /**
           * 0 to 1, ElevenLabs.
           */
          stability: number | null;

          /**
           * Any voice id the provider accepts, including your own voices.
           */
          voiceId: string;
        }
      }

      /**
       * One model that hears the caller and speaks with its own voice.
       */
      export interface AgentSpeechToSpeechModelConfig {
        /**
         * A model that hears the caller and speaks with its own voice. Null settings use
         * the default.
         */
        speechToSpeech: AgentSpeechToSpeechModelConfig.SpeechToSpeech;

        type: 'SPEECH_TO_SPEECH';
      }

      export namespace AgentSpeechToSpeechModelConfig {
        /**
         * A model that hears the caller and speaks with its own voice. Null settings use
         * the default.
         */
        export interface SpeechToSpeech {
          /**
           * OpenAI Live models only: the text model they delegate to.
           */
          backendModel: string | null;

          maxOutputTokens: number | null;

          /**
           * Any speech-to-speech model id the provider accepts.
           */
          model: string;

          provider: 'OPENAI' | 'ANTHROPIC' | 'GOOGLE' | 'XAI' | 'ULTRAVOX' | 'AWS' | 'ELEVENLABS';

          /**
           * 0 to 2.
           */
          temperature: number | null;

          /**
           * The model's own voice.
           */
          voice: string | null;
        }
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

export interface AgentVersionRollbackParams {
  /**
   * Path param
   */
  agentId: string;

  /**
   * Body param: The live version when you decided to roll back. When sent, the
   * rollback is refused with 409 if another version went live since.
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
    type AgentVersionRollbackResponse as AgentVersionRollbackResponse,
    type AgentVersionListParams as AgentVersionListParams,
    type AgentVersionGetByIDParams as AgentVersionGetByIDParams,
    type AgentVersionRollbackParams as AgentVersionRollbackParams,
  };
}
