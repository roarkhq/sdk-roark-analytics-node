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
    return this._client.put(path`/v1/agent/${agentID}/draft`, { body, ...options });
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

export interface AgentDraftCreateParams {
  /**
   * Start from this published version instead of the live one.
   */
  fromVersionId?: string;
}

export interface AgentDraftUpdateParams {
  /**
   * The settings to change. Omitted settings stay as they are; null clears one to
   * the runtime default. subAgents replaces every speaker, model configs included,
   * and must include `main`; in a model config, omitted fields use the runtime
   * default.
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
   * the runtime default. subAgents replaces every speaker, model configs included,
   * and must include `main`; in a model config, omitted fields use the runtime
   * default.
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

    modalities?: Array<'call' | 'chat'>;

    subAgents?: Array<Settings.SubAgent>;

    vadStartSecs?: number | null;

    vadStopSecs?: number | null;
  }

  export namespace Settings {
    export interface SubAgent {
      handoffs: Array<SubAgent.Handoff>;

      isInitial: boolean;

      key: 'main' | string;

      modelConfigs: Array<SubAgent.UnionMember0 | SubAgent.UnionMember1>;

      name: string | null;

      systemPrompt: string | null;

      tools: Array<SubAgent.Tool>;
    }

    export namespace SubAgent {
      export interface Handoff {
        description: string;

        history: 'SHARED' | 'NONE';

        note: string | null;

        once: boolean;

        to: 'main' | string;
      }

      export interface UnionMember0 {
        llm: Array<UnionMember0.Llm>;

        stt: Array<UnionMember0.Stt>;

        tts: Array<UnionMember0.Tt>;

        type: 'CASCADE';
      }

      export namespace UnionMember0 {
        export interface Llm {
          model: string;

          provider: 'OPENAI' | 'ANTHROPIC' | 'GOOGLE' | 'XAI' | 'ULTRAVOX' | 'AWS' | 'ELEVENLABS';

          maxTokens?: number | null;

          temperature?: number | null;
        }

        export interface Stt {
          model: string;

          provider: 'DEEPGRAM' | 'OPENAI_WHISPER' | 'SPEECHMATICS' | 'ASSEMBLYAI' | 'ELEVENLABS';

          endpointingMs?: number | null;

          keyterms?: Array<string>;

          smartFormat?: boolean | null;

          turnDetection?: 'pipeline' | 'provider' | null;
        }

        export interface Tt {
          model: string;

          provider: 'CARTESIA' | 'ELEVENLABS' | 'OPENAI' | 'RIME';

          voiceId: string;

          similarityBoost?: number | null;

          speed?: number | null;

          stability?: number | null;
        }
      }

      export interface UnionMember1 {
        speechToSpeech: UnionMember1.SpeechToSpeech;

        type: 'SPEECH_TO_SPEECH';
      }

      export namespace UnionMember1 {
        export interface SpeechToSpeech {
          model: string;

          provider: 'OPENAI' | 'ANTHROPIC' | 'GOOGLE' | 'XAI' | 'ULTRAVOX' | 'AWS' | 'ELEVENLABS';

          backendModel?: string | null;

          maxOutputTokens?: number | null;

          temperature?: number | null;

          voice?: string | null;
        }
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
