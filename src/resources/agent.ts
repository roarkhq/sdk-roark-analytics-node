// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Agent extends APIResource {
  /**
   * Creates a new agent for the authenticated project.
   *
   * @example
   * ```ts
   * const agent = await client.agent.create({ name: 'x' });
   * ```
   */
  create(body: AgentCreateParams, options?: RequestOptions): APIPromise<AgentCreateResponse> {
    return this._client.post('/v1/agent', { body, ...options });
  }

  /**
   * Updates an existing agent by its ID.
   *
   * @example
   * ```ts
   * const agent = await client.agent.update('agentId');
   * ```
   */
  update(
    agentID: string,
    body: AgentUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentUpdateResponse> {
    return this._client.put(path`/v1/agent/${agentID}`, { body, ...options });
  }

  /**
   * Returns a paginated list of agents for the authenticated project.
   *
   * @example
   * ```ts
   * const agents = await client.agent.list();
   * ```
   */
  list(
    query: AgentListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentListResponse> {
    return this._client.get('/v1/agent', { query, ...options });
  }

  /**
   * Creates a new Roark-hosted agent from a one-line job description. Roark authors
   * the system prompt and hosts the config, so the agent is live and self-improvable
   * from creation.
   *
   * @example
   * ```ts
   * const response = await client.agent.build({
   *   jobDescription: 'x',
   *   name: 'x',
   * });
   * ```
   */
  build(body: AgentBuildParams, options?: RequestOptions): APIPromise<AgentBuildResponse> {
    return this._client.post('/v1/agent/build', { body, ...options });
  }

  /**
   * Returns a specific agent by its ID.
   *
   * @example
   * ```ts
   * const response = await client.agent.getByID('agentId');
   * ```
   */
  getByID(agentID: string, options?: RequestOptions): APIPromise<AgentGetByIDResponse> {
    return this._client.get(path`/v1/agent/${agentID}`, options);
  }
}

export interface AgentCreateResponse {
  data: AgentCreateResponse.Data;
}

export namespace AgentCreateResponse {
  export interface Data {
    /**
     * Unique identifier of the agent
     */
    id: string;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Custom identifier for the agent
     */
    customId: string | null;

    /**
     * Description of the agent
     */
    description: string | null;

    /**
     * The industry the agent serves
     */
    industry:
      | 'HEALTHCARE'
      | 'FINANCIAL_SERVICES'
      | 'INSURANCE'
      | 'DEBT_COLLECTION'
      | 'RETAIL'
      | 'TRAVEL_AND_HOSPITALITY'
      | 'TELECOMMUNICATIONS'
      | 'TECHNOLOGY'
      | 'PUBLIC_SECTOR'
      | 'UTILITIES'
      | 'LOGISTICS'
      | 'AUTOMOTIVE'
      | 'HOME_SERVICES'
      | 'RESTAURANTS'
      | 'EDUCATION'
      | 'OTHER'
      | null;

    /**
     * Name of the agent
     */
    name: string;

    /**
     * The tests Roark generated for an agent, and why
     */
    setup: Data.Setup | null;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }

  export namespace Data {
    /**
     * The tests Roark generated for an agent, and why
     */
    export interface Setup {
      /**
       * Setup ID
       */
      id: string;

      /**
       * What setup did and said, in order
       */
      activity: Array<Setup.Activity>;

      agentId: string;

      capabilities: Array<
        | 'APPOINTMENT_BOOKING'
        | 'FAQ'
        | 'IDENTITY_VERIFICATION'
        | 'ACCOUNT_MANAGEMENT'
        | 'BILLING_AND_PAYMENTS'
        | 'ORDER_MANAGEMENT'
        | 'TROUBLESHOOTING'
        | 'CALL_ROUTING'
        | 'LEAD_QUALIFICATION'
        | 'COLLECTIONS'
        | 'OUTBOUND_CALLING'
      >;

      completedAt: string | null;

      createdAt: string;

      errorMessage: string | null;

      explore: Setup.Explore;

      industry:
        | 'HEALTHCARE'
        | 'FINANCIAL_SERVICES'
        | 'INSURANCE'
        | 'DEBT_COLLECTION'
        | 'RETAIL'
        | 'TRAVEL_AND_HOSPITALITY'
        | 'TELECOMMUNICATIONS'
        | 'TECHNOLOGY'
        | 'PUBLIC_SECTOR'
        | 'UTILITIES'
        | 'LOGISTICS'
        | 'AUTOMOTIVE'
        | 'HOME_SERVICES'
        | 'RESTAURANTS'
        | 'EDUCATION'
        | 'OTHER'
        | null;

      items: Array<Setup.Item>;

      /**
       * The checklist setup works through
       */
      layers: Array<Setup.Layer>;

      /**
       * The question setup is waiting on, while NEEDS_INPUT
       */
      question: Setup.Question | null;

      /**
       * The run plan to start once setup completes
       */
      runPlanId: string | null;

      /**
       * PENDING, RUNNING, NEEDS_INPUT (waiting on a question; it goes ahead with the
       * default if nobody answers), COMPLETED, FAILED or CANCELLED
       */
      status: 'PENDING' | 'RUNNING' | 'NEEDS_INPUT' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

      /**
       * Test data the agent asked for that Roark did not have
       */
      testDataNeeded: Array<Setup.TestDataNeeded>;
    }

    export namespace Setup {
      /**
       * One thing setup did or said, in order
       */
      export interface Activity {
        createdAt: string;

        /**
         * STATUS, REASONING, ACTION, GUIDANCE, QUESTION, ANSWER, EXPLORATION or ERROR
         */
        kind:
          | 'STATUS'
          | 'REASONING'
          | 'ACTION'
          | 'GUIDANCE'
          | 'QUESTION'
          | 'ANSWER'
          | 'EXPLORATION'
          | 'ERROR';

        text: string;
      }

      export interface Explore {
        conversationsUsed: number;

        enabled: boolean;

        maxConversationMinutes: number;

        maxConversations: number;
      }

      /**
       * Something setup created or chose to leave out, and why
       */
      export interface Item {
        id: string;

        /**
         * CREATED, or SKIPPED with the reason
         */
        action: 'CREATED' | 'SKIPPED';

        capability:
          | 'APPOINTMENT_BOOKING'
          | 'FAQ'
          | 'IDENTITY_VERIFICATION'
          | 'ACCOUNT_MANAGEMENT'
          | 'BILLING_AND_PAYMENTS'
          | 'ORDER_MANAGEMENT'
          | 'TROUBLESHOOTING'
          | 'CALL_ROUTING'
          | 'LEAD_QUALIFICATION'
          | 'COLLECTIONS'
          | 'OUTBOUND_CALLING'
          | null;

        /**
         * A flow, a metric, or a pass or fail check
         */
        kind: 'FLOW' | 'METRIC' | 'CHECK' | 'LAYER';

        label: string;

        /**
         * Why it exists: CORE (every agent), INDUSTRY, CAPABILITY, AGENT_CONTEXT (your
         * prompt or website), EXPLORATION or CUSTOMER_INSTRUCTIONS
         */
        layer: 'CORE' | 'INDUSTRY' | 'CAPABILITY' | 'AGENT_CONTEXT' | 'EXPLORATION' | 'CUSTOMER_INSTRUCTIONS';

        /**
         * Exploration only: DISCOVERED on a call, or INFERRED from a path the agent
         * offered
         */
        origin: 'DISCOVERED' | 'INFERRED' | null;

        reason: string;

        /**
         * The flow or metric it created
         */
        resourceId: string | null;

        source: Item.Source;
      }

      export namespace Item {
        export interface Source {
          /**
           * The exploration call it came from
           */
          callId: string | null;

          /**
           * Where in the call
           */
          offsetMs: number | null;

          /**
           * The words in the source that led to it
           */
          quote: string | null;

          type: 'CATALOGUE' | 'PROMPT' | 'DESCRIPTION' | 'WEBSITE' | 'EXPLORATION_CALL' | 'INSTRUCTIONS';

          /**
           * The page it came from, for website sources
           */
          url: string | null;
        }
      }

      /**
       * Where one part of testing the agent stands
       */
      export interface Layer {
        layer: 'CORE' | 'INDUSTRY' | 'CAPABILITY' | 'AGENT_CONTEXT' | 'EXPLORATION' | 'CUSTOMER_INSTRUCTIONS';

        /**
         * COVERED: tests exist for it, or are added when setup finishes. SKIPPED: setup
         * could not test it and said why. OPEN: not covered yet; setup does not finish
         * while a layer is open. NOT_APPLICABLE: nothing to test it from.
         */
        status: 'COVERED' | 'SKIPPED' | 'OPEN' | 'NOT_APPLICABLE';

        summary: string;
      }

      /**
       * The question setup is waiting on, while NEEDS_INPUT
       */
      export interface Question {
        defaultOption: string;

        options: Array<string>;

        question: string;
      }

      export interface TestDataNeeded {
        callId: string | null;

        label: string;

        reason: string;
      }
    }
  }
}

export interface AgentUpdateResponse {
  data: AgentUpdateResponse.Data;
}

export namespace AgentUpdateResponse {
  export interface Data {
    /**
     * Unique identifier of the agent
     */
    id: string;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Custom identifier for the agent
     */
    customId: string | null;

    /**
     * Description of the agent
     */
    description: string | null;

    /**
     * The industry the agent serves
     */
    industry:
      | 'HEALTHCARE'
      | 'FINANCIAL_SERVICES'
      | 'INSURANCE'
      | 'DEBT_COLLECTION'
      | 'RETAIL'
      | 'TRAVEL_AND_HOSPITALITY'
      | 'TELECOMMUNICATIONS'
      | 'TECHNOLOGY'
      | 'PUBLIC_SECTOR'
      | 'UTILITIES'
      | 'LOGISTICS'
      | 'AUTOMOTIVE'
      | 'HOME_SERVICES'
      | 'RESTAURANTS'
      | 'EDUCATION'
      | 'OTHER'
      | null;

    /**
     * Name of the agent
     */
    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }
}

export interface AgentListResponse {
  data: Array<AgentListResponse.Data>;

  pagination: AgentListResponse.Pagination;
}

export namespace AgentListResponse {
  export interface Data {
    /**
     * Unique identifier of the agent
     */
    id: string;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Custom identifier for the agent
     */
    customId: string | null;

    /**
     * Description of the agent
     */
    description: string | null;

    /**
     * The industry the agent serves
     */
    industry:
      | 'HEALTHCARE'
      | 'FINANCIAL_SERVICES'
      | 'INSURANCE'
      | 'DEBT_COLLECTION'
      | 'RETAIL'
      | 'TRAVEL_AND_HOSPITALITY'
      | 'TELECOMMUNICATIONS'
      | 'TECHNOLOGY'
      | 'PUBLIC_SECTOR'
      | 'UTILITIES'
      | 'LOGISTICS'
      | 'AUTOMOTIVE'
      | 'HOME_SERVICES'
      | 'RESTAURANTS'
      | 'EDUCATION'
      | 'OTHER'
      | null;

    /**
     * Name of the agent
     */
    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
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

export interface AgentBuildResponse {
  data: AgentBuildResponse.Data;
}

export namespace AgentBuildResponse {
  export interface Data {
    /**
     * Unique identifier of the agent
     */
    id: string;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Custom identifier for the agent
     */
    customId: string | null;

    /**
     * Description of the agent
     */
    description: string | null;

    /**
     * The industry the agent serves
     */
    industry:
      | 'HEALTHCARE'
      | 'FINANCIAL_SERVICES'
      | 'INSURANCE'
      | 'DEBT_COLLECTION'
      | 'RETAIL'
      | 'TRAVEL_AND_HOSPITALITY'
      | 'TELECOMMUNICATIONS'
      | 'TECHNOLOGY'
      | 'PUBLIC_SECTOR'
      | 'UTILITIES'
      | 'LOGISTICS'
      | 'AUTOMOTIVE'
      | 'HOME_SERVICES'
      | 'RESTAURANTS'
      | 'EDUCATION'
      | 'OTHER'
      | null;

    /**
     * Name of the agent
     */
    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }
}

export interface AgentGetByIDResponse {
  data: AgentGetByIDResponse.Data;
}

export namespace AgentGetByIDResponse {
  export interface Data {
    /**
     * Unique identifier of the agent
     */
    id: string;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Custom identifier for the agent
     */
    customId: string | null;

    /**
     * Description of the agent
     */
    description: string | null;

    /**
     * The industry the agent serves
     */
    industry:
      | 'HEALTHCARE'
      | 'FINANCIAL_SERVICES'
      | 'INSURANCE'
      | 'DEBT_COLLECTION'
      | 'RETAIL'
      | 'TRAVEL_AND_HOSPITALITY'
      | 'TELECOMMUNICATIONS'
      | 'TECHNOLOGY'
      | 'PUBLIC_SECTOR'
      | 'UTILITIES'
      | 'LOGISTICS'
      | 'AUTOMOTIVE'
      | 'HOME_SERVICES'
      | 'RESTAURANTS'
      | 'EDUCATION'
      | 'OTHER'
      | null;

    /**
     * Name of the agent
     */
    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }
}

export interface AgentCreateParams {
  /**
   * Name of the agent
   */
  name: string;

  /**
   * Controls the flows, metrics and run plan Roark generates for the agent
   */
  autoSetup?: AgentCreateParams.AutoSetup | null;

  /**
   * Custom identifier for the agent. Must be unique in the project.
   */
  customId?: string | null;

  /**
   * Description of the agent
   */
  description?: string | null;

  /**
   * The phone number or connection Roark calls to test the agent
   */
  endpoint?: AgentCreateParams.Endpoint | null;

  /**
   * The industry the agent serves. Picks the default capabilities and industry
   * checks setup adds.
   */
  industry?:
    | 'HEALTHCARE'
    | 'FINANCIAL_SERVICES'
    | 'INSURANCE'
    | 'DEBT_COLLECTION'
    | 'RETAIL'
    | 'TRAVEL_AND_HOSPITALITY'
    | 'TELECOMMUNICATIONS'
    | 'TECHNOLOGY'
    | 'PUBLIC_SECTOR'
    | 'UTILITIES'
    | 'LOGISTICS'
    | 'AUTOMOTIVE'
    | 'HOME_SERVICES'
    | 'RESTAURANTS'
    | 'EDUCATION'
    | 'OTHER'
    | null;

  /**
   * The agent's system prompt. Setup reads it to decide what to test.
   */
  prompt?: string | null;

  /**
   * What you want tested, in your own words. Each scenario you describe becomes a
   * flow.
   */
  testingInstructions?: string | null;

  /**
   * A page Roark reads to learn about the business.
   */
  websiteUrl?: string | null;
}

export namespace AgentCreateParams {
  /**
   * Controls the flows, metrics and run plan Roark generates for the agent
   */
  export interface AutoSetup {
    /**
     * The capabilities to test. Omit to let Roark work them out from the agent.
     */
    capabilities?: Array<
      | 'APPOINTMENT_BOOKING'
      | 'FAQ'
      | 'IDENTITY_VERIFICATION'
      | 'ACCOUNT_MANAGEMENT'
      | 'BILLING_AND_PAYMENTS'
      | 'ORDER_MANAGEMENT'
      | 'TROUBLESHOOTING'
      | 'CALL_ROUTING'
      | 'LEAD_QUALIFICATION'
      | 'COLLECTIONS'
      | 'OUTBOUND_CALLING'
    >;

    /**
     * Set to false to skip setup. When omitted, setup runs if you pass a prompt,
     * endpoint, website or testing instructions.
     */
    enabled?: boolean;

    /**
     * Exploration settings
     */
    explore?: AutoSetup.Explore;
  }

  export namespace AutoSetup {
    /**
     * Exploration settings
     */
    export interface Explore {
      /**
       * Whether Roark calls the agent to discover what it does before finishing setup.
       * Exploration calls are billed.
       */
      enabled?: boolean;

      /**
       * The longest a single exploration call may last, in minutes.
       */
      maxConversationMinutes?: number;

      /**
       * The most exploration calls Roark places.
       */
      maxConversations?: number;
    }
  }

  /**
   * The phone number or connection Roark calls to test the agent
   */
  export interface Endpoint {
    /**
     * Call direction: INCOMING, OUTGOING, or INCOMING_AND_OUTGOING
     */
    direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

    /**
     * Environment name (default: production)
     */
    environment?: string;

    /**
     * ID of the HTTP request definition for outbound dialing (required when
     * outboundDialType is HTTP_REQUEST)
     */
    outboundDialHttpRequestDefinitionId?: string | null;

    /**
     * Outbound dial type: NONE or HTTP_REQUEST (default: NONE)
     */
    outboundDialType?: 'NONE' | 'HTTP_REQUEST';

    /**
     * Phone number in E.164 format (e.g., +12345678900). Optional when direction is
     * OUTGOING, for an agent that calls from numbers you do not know up front.
     */
    value?: string | null;
  }
}

export interface AgentUpdateParams {
  /**
   * Description of the agent
   */
  description?: string | null;

  /**
   * Name of the agent
   */
  name?: string;
}

export interface AgentListParams {
  after?: string;

  limit?: number;

  searchText?: string;
}

export interface AgentBuildParams {
  /**
   * One-line description of what the agent should do. Roark authors the system
   * prompt from this.
   */
  jobDescription: string;

  /**
   * Name of the agent
   */
  name: string;

  /**
   * Optional text model the hosted agent thinks with. Roark's default when omitted
   */
  llm?: AgentBuildParams.Llm | null;

  /**
   * Optional transcriber the hosted agent hears with. Roark's default when omitted
   */
  stt?: AgentBuildParams.Stt | null;

  /**
   * Optional provider voice the hosted agent speaks with
   */
  tts?: AgentBuildParams.Tts | null;

  /**
   * Optional display name of the agent's voice. The authored prompt matches its
   * delivery to it.
   */
  voice?: string | null;
}

export namespace AgentBuildParams {
  /**
   * Optional text model the hosted agent thinks with. Roark's default when omitted
   */
  export interface Llm {
    /**
     * The provider's model id, for example gpt-4.1
     */
    model: string;

    /**
     * Text model provider, for example OPENAI
     */
    provider:
      | 'OPENAI'
      | 'ANTHROPIC'
      | 'GOOGLE'
      | 'XAI'
      | 'ULTRAVOX'
      | 'AWS'
      | 'ELEVENLABS'
      | 'GROQ'
      | 'META'
      | 'RIME'
      | 'PHONIC';
  }

  /**
   * Optional transcriber the hosted agent hears with. Roark's default when omitted
   */
  export interface Stt {
    /**
     * The provider's model id, for example nova-3
     */
    model: string;

    /**
     * Speech-to-text provider, for example DEEPGRAM
     */
    provider: 'DEEPGRAM' | 'OPENAI_WHISPER' | 'SPEECHMATICS' | 'ASSEMBLYAI' | 'ELEVENLABS' | 'SONIOX';
  }

  /**
   * Optional provider voice the hosted agent speaks with
   */
  export interface Tts {
    /**
     * Text-to-speech provider, for example ELEVENLABS
     */
    provider: 'CARTESIA' | 'ELEVENLABS' | 'OPENAI' | 'RIME' | 'ASSEMBLYAI' | 'DEEPGRAM' | 'FISH_AUDIO';

    /**
     * The provider's id for the voice
     */
    voiceId: string;

    /**
     * The provider's voice model, for example eleven_flash_v2_5. Its current one when
     * omitted
     */
    model?: string | null;
  }
}

export declare namespace Agent {
  export {
    type AgentCreateResponse as AgentCreateResponse,
    type AgentUpdateResponse as AgentUpdateResponse,
    type AgentListResponse as AgentListResponse,
    type AgentBuildResponse as AgentBuildResponse,
    type AgentGetByIDResponse as AgentGetByIDResponse,
    type AgentCreateParams as AgentCreateParams,
    type AgentUpdateParams as AgentUpdateParams,
    type AgentListParams as AgentListParams,
    type AgentBuildParams as AgentBuildParams,
  };
}
