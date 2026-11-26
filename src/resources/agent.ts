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
     * What the agent handles. Null until it has been said.
     */
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
    > | null;

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
      | 'RECRUITING_AND_STAFFING'
      | 'OTHER'
      | null;

    /**
     * The industry in the customer's own words, when none of the listed ones fits
     * (industry OTHER)
     */
    industryDescription: string | null;

    /**
     * Name of the agent
     */
    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    /**
     * The business's website, which simulation setup reads
     */
    websiteUrl: string | null;
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
     * What the agent handles. Null until it has been said.
     */
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
    > | null;

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
      | 'RECRUITING_AND_STAFFING'
      | 'OTHER'
      | null;

    /**
     * The industry in the customer's own words, when none of the listed ones fits
     * (industry OTHER)
     */
    industryDescription: string | null;

    /**
     * Name of the agent
     */
    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    /**
     * The business's website, which simulation setup reads
     */
    websiteUrl: string | null;
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
     * What the agent handles. Null until it has been said.
     */
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
    > | null;

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
      | 'RECRUITING_AND_STAFFING'
      | 'OTHER'
      | null;

    /**
     * The industry in the customer's own words, when none of the listed ones fits
     * (industry OTHER)
     */
    industryDescription: string | null;

    /**
     * Name of the agent
     */
    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    /**
     * The business's website, which simulation setup reads
     */
    websiteUrl: string | null;
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
     * What the agent handles. Null until it has been said.
     */
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
    > | null;

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
      | 'RECRUITING_AND_STAFFING'
      | 'OTHER'
      | null;

    /**
     * The industry in the customer's own words, when none of the listed ones fits
     * (industry OTHER)
     */
    industryDescription: string | null;

    /**
     * Name of the agent
     */
    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    /**
     * The business's website, which simulation setup reads
     */
    websiteUrl: string | null;
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
     * What the agent handles. Null until it has been said.
     */
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
    > | null;

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
      | 'RECRUITING_AND_STAFFING'
      | 'OTHER'
      | null;

    /**
     * The industry in the customer's own words, when none of the listed ones fits
     * (industry OTHER)
     */
    industryDescription: string | null;

    /**
     * Name of the agent
     */
    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    /**
     * The business's website, which simulation setup reads
     */
    websiteUrl: string | null;
  }
}

export interface AgentCreateParams {
  /**
   * Name of the agent
   */
  name: string;

  /**
   * What the agent handles. Simulation setup tests each one.
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
  > | null;

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
   * The industry the agent serves.
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
    | 'RECRUITING_AND_STAFFING'
    | 'OTHER'
    | null;

  /**
   * The industry in your own words, when none of the listed ones fits. Use it with
   * industry OTHER.
   */
  industryDescription?: string | null;

  /**
   * The agent's system prompt.
   */
  prompt?: string | null;

  /**
   * The business's website. Simulation setup reads it.
   */
  websiteUrl?: string | null;
}

export namespace AgentCreateParams {
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
   * What the agent handles. Simulation setup tests each one.
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
  > | null;

  /**
   * Description of the agent
   */
  description?: string | null;

  /**
   * The industry the agent serves.
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
    | 'RECRUITING_AND_STAFFING'
    | 'OTHER'
    | null;

  /**
   * The industry in your own words, when none of the listed ones fits. Use it with
   * industry OTHER.
   */
  industryDescription?: string | null;

  /**
   * Name of the agent
   */
  name?: string;

  /**
   * The business's website. Simulation setup reads it.
   */
  websiteUrl?: string | null;
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
   * What the agent handles. Recorded on the agent, so its simulation setup tests
   * each.
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
  > | null;

  /**
   * The industry the agent serves. Recorded on the agent, so its simulation setup
   * starts from that industry.
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
    | 'RECRUITING_AND_STAFFING'
    | 'OTHER'
    | null;

  /**
   * The industry in your own words, when none of the listed ones fits. Use it with
   * industry OTHER.
   */
  industryDescription?: string | null;

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

  /**
   * The business's website. The agent's prompt is written from the facts it states.
   */
  websiteUrl?: string | null;
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
      | 'PHONIC'
      | 'SMALLEST';
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
    provider:
      | 'DEEPGRAM'
      | 'OPENAI_WHISPER'
      | 'SPEECHMATICS'
      | 'ASSEMBLYAI'
      | 'ELEVENLABS'
      | 'SONIOX'
      | 'SMALLEST';
  }

  /**
   * Optional provider voice the hosted agent speaks with
   */
  export interface Tts {
    /**
     * Text-to-speech provider, for example ELEVENLABS
     */
    provider:
      | 'CARTESIA'
      | 'ELEVENLABS'
      | 'OPENAI'
      | 'RIME'
      | 'ASSEMBLYAI'
      | 'DEEPGRAM'
      | 'FISH_AUDIO'
      | 'SMALLEST';

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
