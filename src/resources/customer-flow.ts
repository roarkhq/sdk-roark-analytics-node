// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CustomerFlowAPI from './customer-flow';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class CustomerFlow extends APIResource {
  /**
   * Creates a customer flow. A SCRIPTED flow carries a step graph and gets one way
   * of running it per path through the graph; an IMPROV flow carries the briefs you
   * send.
   *
   * @example
   * ```ts
   * const customerFlow = await client.customerFlow.create({
   *   agentIds: ['7c9e6679-7425-40de-944b-e07fc1f90ae7'],
   *   graph: [{ type: 'CUSTOMER_FIRST_MESSAGE' }],
   *   title: 'Reschedule an appointment',
   *   type: 'SCRIPTED',
   * });
   * ```
   */
  create(body: CustomerFlowCreateParams, options?: RequestOptions): APIPromise<CustomerFlowCreateResponse> {
    return this._client.post('/v1/customer-flow', { body, ...options });
  }

  /**
   * Updates a flow's title, description, branching mode, linked agents or flow-level
   * expectations. The step graph is replaced through PUT /graph.
   */
  update(
    flowID: string,
    body: CustomerFlowUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CustomerFlowUpdateResponse> {
    return this._client.put(path`/v1/customer-flow/${flowID}`, { body, ...options });
  }

  /**
   * Returns a paginated list of customer flows with their agents, expectations,
   * happy path and edge cases. The step graph is the one field omitted: reading it
   * walks the project's whole step graph, so it comes back from the single-flow
   * endpoint instead.
   */
  list(
    query: CustomerFlowListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CustomerFlowListResponse> {
    return this._client.get('/v1/customer-flow', { query, ...options });
  }

  /**
   * Soft-deletes a customer flow along with its edge cases, expectations and (for
   * scripted flows) its step graph. Run plans that linked it drop it from their test
   * cases.
   */
  delete(flowID: string, options?: RequestOptions): APIPromise<CustomerFlowDeleteResponse> {
    return this._client.delete(path`/v1/customer-flow/${flowID}`, options);
  }

  /**
   * Returns a customer flow with its happy path, edge cases, expectations and linked
   * agents. Scripted flows also carry their step graph.
   */
  getByID(flowID: string, options?: RequestOptions): APIPromise<CustomerFlowGetByIDResponse> {
    return this._client.get(path`/v1/customer-flow/${flowID}`, options);
  }

  /**
   * Replaces a scripted flow's conversation graph with the tree you send. This is a
   * full replace, not a merge: a step you omit is removed.
   *
   * Include `nodeId` on a step to update the existing one, omit it to create a new
   * step. Where two branches rejoin, keep the `mergeIntoNodeIds` references a read
   * gave you. Dropping them un-merges those branches and is refused unless
   * `allowUnmerge` is set.
   *
   * A change to the set of paths re-seeds how the flow runs, which the response
   * reports as `variantsReshaped` along with the resulting happy path and edge
   * cases.
   */
  replaceGraph(
    flowID: string,
    body: CustomerFlowReplaceGraphParams,
    options?: RequestOptions,
  ): APIPromise<CustomerFlowReplaceGraphResponse> {
    return this._client.put(path`/v1/customer-flow/${flowID}/graph`, { body, ...options });
  }

  /**
   * Updates the happy path's title, persona, environment, brief or expectations.
   * Omitted fields are left alone; `additionalExpectations` replaces the set
   * wholesale rather than appending.
   *
   * Its persona and environment are what the edge cases inherit, so changing them
   * here changes every edge case that does not name its own.
   */
  updateHappyPath(
    flowID: string,
    body: CustomerFlowUpdateHappyPathParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CustomerFlowUpdateHappyPathResponse> {
    return this._client.put(path`/v1/customer-flow/${flowID}/happy-path`, { body, ...options });
  }
}

/**
 * One step in a scripted flow's conversation.
 *
 * `nodeId` is the identity contract: include it to update the existing step, omit
 * it to create a new one. A step continues into `steps` (more than one child is a
 * branch point) and/or `mergeIntoNodeIds`, which names steps elsewhere in the same
 * request that this step rejoins. Branches that come back together are represented
 * that way rather than by repeating the shared step, so reading a flow, editing it
 * and writing it back preserves it exactly.
 *
 * A merge target is named by its `nodeId` when it already exists, or by `ref` when
 * it is being created in the same request. `ref` is a label you choose, it is
 * request-local, and it is never stored or returned. Put the shared step inline
 * under the first branch that reaches it and point the others at it: a top-level
 * step is a root wired straight from the start of the flow, so a merge target
 * parked there would also be reachable directly.
 */
export type FlowStep =
  | FlowStep.UnionMember0
  | FlowStep.UnionMember1
  | FlowStep.UnionMember2
  | FlowStep.UnionMember3
  | FlowStep.UnionMember4
  | FlowStep.UnionMember5
  | FlowStep.UnionMember6;

export namespace FlowStep {
  export interface UnionMember0 {
    type: 'AGENT_TURN';

    content?: string | null;

    mergeIntoNodeIds?: Array<string>;

    nodeId?: string;

    ref?: string;

    steps?: Array<CustomerFlowAPI.FlowStep>;
  }

  export interface UnionMember1 {
    type: 'CUSTOMER_TURN';

    content?: string | null;

    mergeIntoNodeIds?: Array<string>;

    nodeId?: string;

    ref?: string;

    steps?: Array<CustomerFlowAPI.FlowStep>;
  }

  export interface UnionMember2 {
    type: 'CUSTOMER_FIRST_MESSAGE';

    content?: string | null;

    mergeIntoNodeIds?: Array<string>;

    nodeId?: string;

    ref?: string;

    steps?: Array<CustomerFlowAPI.FlowStep>;
  }

  export interface UnionMember3 {
    type: 'CUSTOMER_SILENCE';

    mergeIntoNodeIds?: Array<string>;

    nodeId?: string;

    ref?: string;

    silenceDurationSeconds?: number | null;

    steps?: Array<CustomerFlowAPI.FlowStep>;
  }

  export interface UnionMember4 {
    type: 'CUSTOMER_DTMF';

    dtmfDigits?: string | null;

    mergeIntoNodeIds?: Array<string>;

    nodeId?: string;

    ref?: string;

    steps?: Array<CustomerFlowAPI.FlowStep>;
  }

  export interface UnionMember5 {
    type: 'VOICEMAIL';

    mergeIntoNodeIds?: Array<string>;

    nodeId?: string;

    ref?: string;

    steps?: Array<CustomerFlowAPI.FlowStep>;
  }

  export interface UnionMember6 {
    type: 'SCENARIO_LINK';

    linkedCustomerFlowId?: string | null;

    linkedCustomerFlowVariantId?: string | null;

    mergeIntoNodeIds?: Array<string>;

    nodeId?: string;

    ref?: string;

    steps?: Array<CustomerFlowAPI.FlowStep>;
  }
}

export interface CustomerFlowCreateResponse {
  /**
   * The conversation a simulated customer has with the agent under test.
   */
  data:
    | CustomerFlowCreateResponse.ScriptedCustomerFlow
    | CustomerFlowCreateResponse.ImprovCustomerFlow
    | CustomerFlowCreateResponse.VoicemailCustomerFlow;
}

export namespace CustomerFlowCreateResponse {
  /**
   * A flow whose conversation is written out as a graph of turns.
   */
  export interface ScriptedCustomerFlow {
    id: string;

    agentExpectations: Array<ScriptedCustomerFlow.AgentExpectation>;

    /**
     * The agents this flow is run against.
     */
    agents: Array<ScriptedCustomerFlow.Agent>;

    /**
     * DETERMINISTIC runs one variant per path through the graph. ADAPTIVE collapses
     * the paths into a single variant the simulated customer adapts across.
     */
    branchingMode: 'DETERMINISTIC' | 'ADAPTIVE';

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Every other way of running this flow.
     */
    edgeCases: Array<ScriptedCustomerFlow.EdgeCase>;

    /**
     * One path through a scripted flow. The path engine owns which paths exist, so
     * editing the graph is what creates and removes these.
     */
    happyPath: ScriptedCustomerFlow.HappyPath | null;

    source: 'SYSTEM' | 'CUSTOM';

    title: string;

    type: 'SCRIPTED';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    description?: string | null;

    /**
     * The conversation, as a graph of steps. Present on a single flow; omitted from
     * the list, where reading it would mean walking the project step graph once per
     * row.
     */
    graph?: Array<CustomerFlowAPI.FlowStep>;
  }

  export namespace ScriptedCustomerFlow {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AgentExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    export interface Agent {
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
       * Name of the agent
       */
      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    /**
     * One path through a scripted flow. The path engine owns which paths exist, so
     * editing the graph is what creates and removes these.
     */
    export interface EdgeCase {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<EdgeCase.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: EdgeCase.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: EdgeCase.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      /**
       * The one path through the graph this variant runs, in order. Linear by
       * construction, so these steps never nest.
       */
      steps: Array<CustomerFlowAPI.FlowStep>;

      title: string;

      type: 'SCRIPTED';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace EdgeCase {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One path through a scripted flow. The path engine owns which paths exist, so
     * editing the graph is what creates and removes these.
     */
    export interface HappyPath {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<HappyPath.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: HappyPath.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: HappyPath.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      /**
       * The one path through the graph this variant runs, in order. Linear by
       * construction, so these steps never nest.
       */
      steps: Array<CustomerFlowAPI.FlowStep>;

      title: string;

      type: 'SCRIPTED';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace HappyPath {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }
  }

  /**
   * A flow whose conversation is not written out: each variant gives the simulated
   * customer a brief and lets it improvise.
   */
  export interface ImprovCustomerFlow {
    id: string;

    agentExpectations: Array<ImprovCustomerFlow.AgentExpectation>;

    /**
     * The agents this flow is run against.
     */
    agents: Array<ImprovCustomerFlow.Agent>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Every other way of running this flow.
     */
    edgeCases: Array<ImprovCustomerFlow.EdgeCase>;

    /**
     * One brief to run an improv flow with.
     */
    happyPath: ImprovCustomerFlow.HappyPath | null;

    source: 'SYSTEM' | 'CUSTOM';

    title: string;

    type: 'IMPROV';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    description?: string | null;
  }

  export namespace ImprovCustomerFlow {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AgentExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    export interface Agent {
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
       * Name of the agent
       */
      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    /**
     * One brief to run an improv flow with.
     */
    export interface EdgeCase {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<EdgeCase.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: EdgeCase.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: EdgeCase.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'IMPROV';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      /**
       * The brief the simulated customer improvises from.
       */
      prompt?: string | null;
    }

    export namespace EdgeCase {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One brief to run an improv flow with.
     */
    export interface HappyPath {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<HappyPath.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: HappyPath.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: HappyPath.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'IMPROV';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      /**
       * The brief the simulated customer improvises from.
       */
      prompt?: string | null;
    }

    export namespace HappyPath {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }
  }

  /**
   * A flow that leaves a voicemail. Curated by Roark, read-only.
   */
  export interface VoicemailCustomerFlow {
    id: string;

    agentExpectations: Array<VoicemailCustomerFlow.AgentExpectation>;

    /**
     * The agents this flow is run against.
     */
    agents: Array<VoicemailCustomerFlow.Agent>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Every other way of running this flow.
     */
    edgeCases: Array<VoicemailCustomerFlow.EdgeCase>;

    /**
     * One voicemail greeting.
     */
    happyPath: VoicemailCustomerFlow.HappyPath | null;

    source: 'SYSTEM' | 'CUSTOM';

    title: string;

    type: 'VOICEMAIL';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    description?: string | null;
  }

  export namespace VoicemailCustomerFlow {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AgentExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    export interface Agent {
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
       * Name of the agent
       */
      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    /**
     * One voicemail greeting.
     */
    export interface EdgeCase {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<EdgeCase.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: EdgeCase.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: EdgeCase.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'VOICEMAIL';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace EdgeCase {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One voicemail greeting.
     */
    export interface HappyPath {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<HappyPath.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: HappyPath.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: HappyPath.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'VOICEMAIL';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace HappyPath {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }
  }
}

export interface CustomerFlowUpdateResponse {
  /**
   * The conversation a simulated customer has with the agent under test.
   */
  data:
    | CustomerFlowUpdateResponse.ScriptedCustomerFlow
    | CustomerFlowUpdateResponse.ImprovCustomerFlow
    | CustomerFlowUpdateResponse.VoicemailCustomerFlow;
}

export namespace CustomerFlowUpdateResponse {
  /**
   * A flow whose conversation is written out as a graph of turns.
   */
  export interface ScriptedCustomerFlow {
    id: string;

    agentExpectations: Array<ScriptedCustomerFlow.AgentExpectation>;

    /**
     * The agents this flow is run against.
     */
    agents: Array<ScriptedCustomerFlow.Agent>;

    /**
     * DETERMINISTIC runs one variant per path through the graph. ADAPTIVE collapses
     * the paths into a single variant the simulated customer adapts across.
     */
    branchingMode: 'DETERMINISTIC' | 'ADAPTIVE';

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Every other way of running this flow.
     */
    edgeCases: Array<ScriptedCustomerFlow.EdgeCase>;

    /**
     * One path through a scripted flow. The path engine owns which paths exist, so
     * editing the graph is what creates and removes these.
     */
    happyPath: ScriptedCustomerFlow.HappyPath | null;

    source: 'SYSTEM' | 'CUSTOM';

    title: string;

    type: 'SCRIPTED';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    description?: string | null;

    /**
     * The conversation, as a graph of steps. Present on a single flow; omitted from
     * the list, where reading it would mean walking the project step graph once per
     * row.
     */
    graph?: Array<CustomerFlowAPI.FlowStep>;
  }

  export namespace ScriptedCustomerFlow {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AgentExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    export interface Agent {
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
       * Name of the agent
       */
      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    /**
     * One path through a scripted flow. The path engine owns which paths exist, so
     * editing the graph is what creates and removes these.
     */
    export interface EdgeCase {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<EdgeCase.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: EdgeCase.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: EdgeCase.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      /**
       * The one path through the graph this variant runs, in order. Linear by
       * construction, so these steps never nest.
       */
      steps: Array<CustomerFlowAPI.FlowStep>;

      title: string;

      type: 'SCRIPTED';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace EdgeCase {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One path through a scripted flow. The path engine owns which paths exist, so
     * editing the graph is what creates and removes these.
     */
    export interface HappyPath {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<HappyPath.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: HappyPath.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: HappyPath.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      /**
       * The one path through the graph this variant runs, in order. Linear by
       * construction, so these steps never nest.
       */
      steps: Array<CustomerFlowAPI.FlowStep>;

      title: string;

      type: 'SCRIPTED';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace HappyPath {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }
  }

  /**
   * A flow whose conversation is not written out: each variant gives the simulated
   * customer a brief and lets it improvise.
   */
  export interface ImprovCustomerFlow {
    id: string;

    agentExpectations: Array<ImprovCustomerFlow.AgentExpectation>;

    /**
     * The agents this flow is run against.
     */
    agents: Array<ImprovCustomerFlow.Agent>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Every other way of running this flow.
     */
    edgeCases: Array<ImprovCustomerFlow.EdgeCase>;

    /**
     * One brief to run an improv flow with.
     */
    happyPath: ImprovCustomerFlow.HappyPath | null;

    source: 'SYSTEM' | 'CUSTOM';

    title: string;

    type: 'IMPROV';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    description?: string | null;
  }

  export namespace ImprovCustomerFlow {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AgentExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    export interface Agent {
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
       * Name of the agent
       */
      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    /**
     * One brief to run an improv flow with.
     */
    export interface EdgeCase {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<EdgeCase.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: EdgeCase.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: EdgeCase.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'IMPROV';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      /**
       * The brief the simulated customer improvises from.
       */
      prompt?: string | null;
    }

    export namespace EdgeCase {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One brief to run an improv flow with.
     */
    export interface HappyPath {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<HappyPath.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: HappyPath.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: HappyPath.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'IMPROV';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      /**
       * The brief the simulated customer improvises from.
       */
      prompt?: string | null;
    }

    export namespace HappyPath {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }
  }

  /**
   * A flow that leaves a voicemail. Curated by Roark, read-only.
   */
  export interface VoicemailCustomerFlow {
    id: string;

    agentExpectations: Array<VoicemailCustomerFlow.AgentExpectation>;

    /**
     * The agents this flow is run against.
     */
    agents: Array<VoicemailCustomerFlow.Agent>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Every other way of running this flow.
     */
    edgeCases: Array<VoicemailCustomerFlow.EdgeCase>;

    /**
     * One voicemail greeting.
     */
    happyPath: VoicemailCustomerFlow.HappyPath | null;

    source: 'SYSTEM' | 'CUSTOM';

    title: string;

    type: 'VOICEMAIL';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    description?: string | null;
  }

  export namespace VoicemailCustomerFlow {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AgentExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    export interface Agent {
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
       * Name of the agent
       */
      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    /**
     * One voicemail greeting.
     */
    export interface EdgeCase {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<EdgeCase.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: EdgeCase.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: EdgeCase.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'VOICEMAIL';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace EdgeCase {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One voicemail greeting.
     */
    export interface HappyPath {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<HappyPath.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: HappyPath.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: HappyPath.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'VOICEMAIL';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace HappyPath {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }
  }
}

/**
 * Paginated list of customer flows
 */
export interface CustomerFlowListResponse {
  data: Array<
    | CustomerFlowListResponse.ScriptedCustomerFlow
    | CustomerFlowListResponse.ImprovCustomerFlow
    | CustomerFlowListResponse.VoicemailCustomerFlow
  >;

  pagination: CustomerFlowListResponse.Pagination;
}

export namespace CustomerFlowListResponse {
  /**
   * A flow whose conversation is written out as a graph of turns.
   */
  export interface ScriptedCustomerFlow {
    id: string;

    agentExpectations: Array<ScriptedCustomerFlow.AgentExpectation>;

    /**
     * The agents this flow is run against.
     */
    agents: Array<ScriptedCustomerFlow.Agent>;

    /**
     * DETERMINISTIC runs one variant per path through the graph. ADAPTIVE collapses
     * the paths into a single variant the simulated customer adapts across.
     */
    branchingMode: 'DETERMINISTIC' | 'ADAPTIVE';

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Every other way of running this flow.
     */
    edgeCases: Array<ScriptedCustomerFlow.EdgeCase>;

    /**
     * One path through a scripted flow. The path engine owns which paths exist, so
     * editing the graph is what creates and removes these.
     */
    happyPath: ScriptedCustomerFlow.HappyPath | null;

    source: 'SYSTEM' | 'CUSTOM';

    title: string;

    type: 'SCRIPTED';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    description?: string | null;

    /**
     * The conversation, as a graph of steps. Present on a single flow; omitted from
     * the list, where reading it would mean walking the project step graph once per
     * row.
     */
    graph?: Array<CustomerFlowAPI.FlowStep>;
  }

  export namespace ScriptedCustomerFlow {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AgentExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    export interface Agent {
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
       * Name of the agent
       */
      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    /**
     * One path through a scripted flow. The path engine owns which paths exist, so
     * editing the graph is what creates and removes these.
     */
    export interface EdgeCase {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<EdgeCase.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: EdgeCase.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: EdgeCase.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      /**
       * The one path through the graph this variant runs, in order. Linear by
       * construction, so these steps never nest.
       */
      steps: Array<CustomerFlowAPI.FlowStep>;

      title: string;

      type: 'SCRIPTED';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace EdgeCase {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One path through a scripted flow. The path engine owns which paths exist, so
     * editing the graph is what creates and removes these.
     */
    export interface HappyPath {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<HappyPath.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: HappyPath.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: HappyPath.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      /**
       * The one path through the graph this variant runs, in order. Linear by
       * construction, so these steps never nest.
       */
      steps: Array<CustomerFlowAPI.FlowStep>;

      title: string;

      type: 'SCRIPTED';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace HappyPath {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }
  }

  /**
   * A flow whose conversation is not written out: each variant gives the simulated
   * customer a brief and lets it improvise.
   */
  export interface ImprovCustomerFlow {
    id: string;

    agentExpectations: Array<ImprovCustomerFlow.AgentExpectation>;

    /**
     * The agents this flow is run against.
     */
    agents: Array<ImprovCustomerFlow.Agent>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Every other way of running this flow.
     */
    edgeCases: Array<ImprovCustomerFlow.EdgeCase>;

    /**
     * One brief to run an improv flow with.
     */
    happyPath: ImprovCustomerFlow.HappyPath | null;

    source: 'SYSTEM' | 'CUSTOM';

    title: string;

    type: 'IMPROV';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    description?: string | null;
  }

  export namespace ImprovCustomerFlow {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AgentExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    export interface Agent {
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
       * Name of the agent
       */
      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    /**
     * One brief to run an improv flow with.
     */
    export interface EdgeCase {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<EdgeCase.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: EdgeCase.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: EdgeCase.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'IMPROV';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      /**
       * The brief the simulated customer improvises from.
       */
      prompt?: string | null;
    }

    export namespace EdgeCase {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One brief to run an improv flow with.
     */
    export interface HappyPath {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<HappyPath.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: HappyPath.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: HappyPath.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'IMPROV';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      /**
       * The brief the simulated customer improvises from.
       */
      prompt?: string | null;
    }

    export namespace HappyPath {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }
  }

  /**
   * A flow that leaves a voicemail. Curated by Roark, read-only.
   */
  export interface VoicemailCustomerFlow {
    id: string;

    agentExpectations: Array<VoicemailCustomerFlow.AgentExpectation>;

    /**
     * The agents this flow is run against.
     */
    agents: Array<VoicemailCustomerFlow.Agent>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Every other way of running this flow.
     */
    edgeCases: Array<VoicemailCustomerFlow.EdgeCase>;

    /**
     * One voicemail greeting.
     */
    happyPath: VoicemailCustomerFlow.HappyPath | null;

    source: 'SYSTEM' | 'CUSTOM';

    title: string;

    type: 'VOICEMAIL';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    description?: string | null;
  }

  export namespace VoicemailCustomerFlow {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AgentExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    export interface Agent {
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
       * Name of the agent
       */
      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    /**
     * One voicemail greeting.
     */
    export interface EdgeCase {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<EdgeCase.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: EdgeCase.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: EdgeCase.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'VOICEMAIL';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace EdgeCase {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One voicemail greeting.
     */
    export interface HappyPath {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<HappyPath.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: HappyPath.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: HappyPath.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'VOICEMAIL';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace HappyPath {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
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

export interface CustomerFlowDeleteResponse {
  data: CustomerFlowDeleteResponse.Data;
}

export namespace CustomerFlowDeleteResponse {
  export interface Data {
    /**
     * Whether the flow was deleted
     */
    deleted: boolean;
  }
}

export interface CustomerFlowGetByIDResponse {
  /**
   * The conversation a simulated customer has with the agent under test.
   */
  data:
    | CustomerFlowGetByIDResponse.ScriptedCustomerFlow
    | CustomerFlowGetByIDResponse.ImprovCustomerFlow
    | CustomerFlowGetByIDResponse.VoicemailCustomerFlow;
}

export namespace CustomerFlowGetByIDResponse {
  /**
   * A flow whose conversation is written out as a graph of turns.
   */
  export interface ScriptedCustomerFlow {
    id: string;

    agentExpectations: Array<ScriptedCustomerFlow.AgentExpectation>;

    /**
     * The agents this flow is run against.
     */
    agents: Array<ScriptedCustomerFlow.Agent>;

    /**
     * DETERMINISTIC runs one variant per path through the graph. ADAPTIVE collapses
     * the paths into a single variant the simulated customer adapts across.
     */
    branchingMode: 'DETERMINISTIC' | 'ADAPTIVE';

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Every other way of running this flow.
     */
    edgeCases: Array<ScriptedCustomerFlow.EdgeCase>;

    /**
     * One path through a scripted flow. The path engine owns which paths exist, so
     * editing the graph is what creates and removes these.
     */
    happyPath: ScriptedCustomerFlow.HappyPath | null;

    source: 'SYSTEM' | 'CUSTOM';

    title: string;

    type: 'SCRIPTED';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    description?: string | null;

    /**
     * The conversation, as a graph of steps. Present on a single flow; omitted from
     * the list, where reading it would mean walking the project step graph once per
     * row.
     */
    graph?: Array<CustomerFlowAPI.FlowStep>;
  }

  export namespace ScriptedCustomerFlow {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AgentExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    export interface Agent {
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
       * Name of the agent
       */
      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    /**
     * One path through a scripted flow. The path engine owns which paths exist, so
     * editing the graph is what creates and removes these.
     */
    export interface EdgeCase {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<EdgeCase.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: EdgeCase.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: EdgeCase.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      /**
       * The one path through the graph this variant runs, in order. Linear by
       * construction, so these steps never nest.
       */
      steps: Array<CustomerFlowAPI.FlowStep>;

      title: string;

      type: 'SCRIPTED';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace EdgeCase {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One path through a scripted flow. The path engine owns which paths exist, so
     * editing the graph is what creates and removes these.
     */
    export interface HappyPath {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<HappyPath.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: HappyPath.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: HappyPath.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      /**
       * The one path through the graph this variant runs, in order. Linear by
       * construction, so these steps never nest.
       */
      steps: Array<CustomerFlowAPI.FlowStep>;

      title: string;

      type: 'SCRIPTED';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace HappyPath {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }
  }

  /**
   * A flow whose conversation is not written out: each variant gives the simulated
   * customer a brief and lets it improvise.
   */
  export interface ImprovCustomerFlow {
    id: string;

    agentExpectations: Array<ImprovCustomerFlow.AgentExpectation>;

    /**
     * The agents this flow is run against.
     */
    agents: Array<ImprovCustomerFlow.Agent>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Every other way of running this flow.
     */
    edgeCases: Array<ImprovCustomerFlow.EdgeCase>;

    /**
     * One brief to run an improv flow with.
     */
    happyPath: ImprovCustomerFlow.HappyPath | null;

    source: 'SYSTEM' | 'CUSTOM';

    title: string;

    type: 'IMPROV';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    description?: string | null;
  }

  export namespace ImprovCustomerFlow {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AgentExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    export interface Agent {
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
       * Name of the agent
       */
      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    /**
     * One brief to run an improv flow with.
     */
    export interface EdgeCase {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<EdgeCase.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: EdgeCase.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: EdgeCase.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'IMPROV';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      /**
       * The brief the simulated customer improvises from.
       */
      prompt?: string | null;
    }

    export namespace EdgeCase {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One brief to run an improv flow with.
     */
    export interface HappyPath {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<HappyPath.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: HappyPath.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: HappyPath.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'IMPROV';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      /**
       * The brief the simulated customer improvises from.
       */
      prompt?: string | null;
    }

    export namespace HappyPath {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }
  }

  /**
   * A flow that leaves a voicemail. Curated by Roark, read-only.
   */
  export interface VoicemailCustomerFlow {
    id: string;

    agentExpectations: Array<VoicemailCustomerFlow.AgentExpectation>;

    /**
     * The agents this flow is run against.
     */
    agents: Array<VoicemailCustomerFlow.Agent>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * Every other way of running this flow.
     */
    edgeCases: Array<VoicemailCustomerFlow.EdgeCase>;

    /**
     * One voicemail greeting.
     */
    happyPath: VoicemailCustomerFlow.HappyPath | null;

    source: 'SYSTEM' | 'CUSTOM';

    title: string;

    type: 'VOICEMAIL';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    description?: string | null;
  }

  export namespace VoicemailCustomerFlow {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AgentExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    export interface Agent {
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
       * Name of the agent
       */
      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    /**
     * One voicemail greeting.
     */
    export interface EdgeCase {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<EdgeCase.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: EdgeCase.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: EdgeCase.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'VOICEMAIL';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace EdgeCase {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One voicemail greeting.
     */
    export interface HappyPath {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<HappyPath.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: HappyPath.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: HappyPath.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'VOICEMAIL';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace HappyPath {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }
  }
}

export interface CustomerFlowReplaceGraphResponse {
  data: CustomerFlowReplaceGraphResponse.Data;
}

export namespace CustomerFlowReplaceGraphResponse {
  export interface Data {
    /**
     * The edge cases after the write.
     */
    edgeCases: Array<Data.ScriptedFlowVariant | Data.ImprovFlowVariant | Data.VoicemailFlowVariant>;

    graph: Array<CustomerFlowAPI.FlowStep>;

    /**
     * The way a customer flow is meant to go.
     */
    happyPath: Data.ScriptedFlowVariant | Data.ImprovFlowVariant | Data.VoicemailFlowVariant | null;

    /**
     * True when the write changed the set of paths, so the flow's variants were
     * re-seeded and any variant id you were holding may no longer exist.
     */
    variantsReshaped: boolean;

    warnings: Array<string>;
  }

  export namespace Data {
    /**
     * One path through a scripted flow. The path engine owns which paths exist, so
     * editing the graph is what creates and removes these.
     */
    export interface ScriptedFlowVariant {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<ScriptedFlowVariant.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: ScriptedFlowVariant.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: ScriptedFlowVariant.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      /**
       * The one path through the graph this variant runs, in order. Linear by
       * construction, so these steps never nest.
       */
      steps: Array<CustomerFlowAPI.FlowStep>;

      title: string;

      type: 'SCRIPTED';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace ScriptedFlowVariant {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One brief to run an improv flow with.
     */
    export interface ImprovFlowVariant {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<ImprovFlowVariant.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: ImprovFlowVariant.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: ImprovFlowVariant.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'IMPROV';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      /**
       * The brief the simulated customer improvises from.
       */
      prompt?: string | null;
    }

    export namespace ImprovFlowVariant {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One voicemail greeting.
     */
    export interface VoicemailFlowVariant {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<VoicemailFlowVariant.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: VoicemailFlowVariant.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: VoicemailFlowVariant.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'VOICEMAIL';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace VoicemailFlowVariant {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One path through a scripted flow. The path engine owns which paths exist, so
     * editing the graph is what creates and removes these.
     */
    export interface ScriptedFlowVariant {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<ScriptedFlowVariant.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: ScriptedFlowVariant.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: ScriptedFlowVariant.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      /**
       * The one path through the graph this variant runs, in order. Linear by
       * construction, so these steps never nest.
       */
      steps: Array<CustomerFlowAPI.FlowStep>;

      title: string;

      type: 'SCRIPTED';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace ScriptedFlowVariant {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One brief to run an improv flow with.
     */
    export interface ImprovFlowVariant {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<ImprovFlowVariant.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: ImprovFlowVariant.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: ImprovFlowVariant.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'IMPROV';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      /**
       * The brief the simulated customer improvises from.
       */
      prompt?: string | null;
    }

    export namespace ImprovFlowVariant {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }

    /**
     * One voicemail greeting.
     */
    export interface VoicemailFlowVariant {
      id: string;

      /**
       * Graded on top of the flow's own expectations, for this variant only.
       */
      additionalExpectations: Array<VoicemailFlowVariant.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      environment: VoicemailFlowVariant.Environment | null;

      isGenerated: boolean;

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      personaOverride: VoicemailFlowVariant.PersonaOverride | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      type: 'VOICEMAIL';

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;
    }

    export namespace VoicemailFlowVariant {
      /**
       * One thing the agent under test is graded against.
       */
      export interface AdditionalExpectation {
        id: string;

        /**
         * What the agent under test is graded against.
         */
        prompt: string;
      }

      /**
       * A simulation environment: the ambient conditions a customer flow variant runs
       * under. The list includes both your own and the ones Roark curates for every
       * project.
       */
      export interface Environment {
        id: string;

        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Creation timestamp in ISO 8601 format
         */
        createdAt: string;

        name: string;

        /**
         * Last update timestamp in ISO 8601 format
         */
        updatedAt: string;

        description?: string | null;
      }

      /**
       * The persona this runs as instead of the happy path's. Null means it inherits.
       */
      export interface PersonaOverride {
        /**
         * Unique identifier of the persona
         */
        id: string;

        /**
         * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
         * optional variants
         */
        accent:
          | 'US'
          | 'US_X_SOUTH'
          | 'GB'
          | 'ES'
          | 'DE'
          | 'IN'
          | 'FR'
          | 'NL'
          | 'SA'
          | 'GR'
          | 'AU'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JP'
          | 'NZ'
          | 'PH'
          | 'SG'
          | 'MY'
          | 'HK'
          | 'TR'
          | 'PT'
          | 'IL';

        /**
         * Background noise setting
         */
        backgroundNoise:
          | 'NONE'
          | 'AIRPORT'
          | 'CHILDREN_PLAYING'
          | 'CITY'
          | 'COFFEE_SHOP'
          | 'DRIVING'
          | 'OFFICE'
          | 'THUNDERSTORM';

        /**
         * Base emotional state of the persona
         */
        baseEmotion:
          | 'NEUTRAL'
          | 'CHEERFUL'
          | 'CONFUSED'
          | 'FRUSTRATED'
          | 'SKEPTICAL'
          | 'RUSHED'
          | 'DISTRACTED';

        /**
         * How the persona confirms information
         */
        confirmationStyle: 'EXPLICIT' | 'VAGUE';

        /**
         * Creation timestamp
         */
        createdAt: string;

        /**
         * Gender of the persona
         */
        gender: 'MALE' | 'FEMALE';

        /**
         * Whether the persona uses filler words like "um" and "uh"
         */
        hasDisfluencies: boolean;

        /**
         * Maximum number of idle messages the persona will send before giving up
         */
        idleMessageMaxSpokenCount: number;

        /**
         * Whether the idle message counter resets when the agent speaks
         */
        idleMessageResetCountOnUserSpeechEnabled: boolean;

        /**
         * Messages the persona will say when the agent goes silent during a call. null =
         * "Automatic": language-appropriate defaults are used at call time.
         */
        idleMessages: Array<string> | null;

        /**
         * Seconds of silence before the persona sends an idle message
         */
        idleTimeoutSeconds: number;

        /**
         * How clearly the persona expresses their intentions
         */
        intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

        /**
         * Primary language ISO 639-1 code for the persona
         */
        language:
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE';

        /**
         * How reliable the persona's memory is
         */
        memoryReliability: 'HIGH' | 'LOW';

        /**
         * The name the agent will identify as during conversations
         */
        name: string;

        /**
         * Additional custom properties about the persona
         */
        properties: { [key: string]: unknown };

        /**
         * Controls how quickly the persona responds to pauses in conversation (QUICK,
         * NORMAL, RELAXED)
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

        /**
         * Speech clarity of the persona
         */
        speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

        /**
         * Speech pace of the persona
         */
        speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

        /**
         * Languages the persona can understand. Multilingual combinations are limited by
         * multilingual speech recognition support.
         */
        understoodLanguages: Array<
          | 'EN'
          | 'ES'
          | 'DE'
          | 'HI'
          | 'FR'
          | 'NL'
          | 'AR'
          | 'EL'
          | 'IT'
          | 'ID'
          | 'TH'
          | 'JA'
          | 'TL'
          | 'MS'
          | 'ZH'
          | 'TR'
          | 'PT'
          | 'HE'
        >;

        /**
         * Last update timestamp
         */
        updatedAt: string;

        /**
         * Background story and behavioral patterns for the persona
         */
        backstoryPrompt?: string | null;

        /**
         * Human-readable description of the persona
         */
        description?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }
    }
  }
}

export interface CustomerFlowUpdateHappyPathResponse {
  /**
   * One way of running a customer flow.
   */
  data:
    | CustomerFlowUpdateHappyPathResponse.ScriptedFlowVariant
    | CustomerFlowUpdateHappyPathResponse.ImprovFlowVariant
    | CustomerFlowUpdateHappyPathResponse.VoicemailFlowVariant;
}

export namespace CustomerFlowUpdateHappyPathResponse {
  /**
   * One path through a scripted flow. The path engine owns which paths exist, so
   * editing the graph is what creates and removes these.
   */
  export interface ScriptedFlowVariant {
    id: string;

    /**
     * Graded on top of the flow's own expectations, for this variant only.
     */
    additionalExpectations: Array<ScriptedFlowVariant.AdditionalExpectation>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    environment: ScriptedFlowVariant.Environment | null;

    isGenerated: boolean;

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    personaOverride: ScriptedFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    /**
     * The one path through the graph this variant runs, in order. Linear by
     * construction, so these steps never nest.
     */
    steps: Array<CustomerFlowAPI.FlowStep>;

    title: string;

    type: 'SCRIPTED';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }

  export namespace ScriptedFlowVariant {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AdditionalExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    export interface Environment {
      id: string;

      backgroundNoise:
        | 'NONE'
        | 'AIRPORT'
        | 'CHILDREN_PLAYING'
        | 'CITY'
        | 'COFFEE_SHOP'
        | 'DRIVING'
        | 'OFFICE'
        | 'THUNDERSTORM';

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      description?: string | null;
    }

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    export interface PersonaOverride {
      /**
       * Unique identifier of the persona
       */
      id: string;

      /**
       * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
       * optional variants
       */
      accent:
        | 'US'
        | 'US_X_SOUTH'
        | 'GB'
        | 'ES'
        | 'DE'
        | 'IN'
        | 'FR'
        | 'NL'
        | 'SA'
        | 'GR'
        | 'AU'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JP'
        | 'NZ'
        | 'PH'
        | 'SG'
        | 'MY'
        | 'HK'
        | 'TR'
        | 'PT'
        | 'IL';

      /**
       * Background noise setting
       */
      backgroundNoise:
        | 'NONE'
        | 'AIRPORT'
        | 'CHILDREN_PLAYING'
        | 'CITY'
        | 'COFFEE_SHOP'
        | 'DRIVING'
        | 'OFFICE'
        | 'THUNDERSTORM';

      /**
       * Base emotional state of the persona
       */
      baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED';

      /**
       * How the persona confirms information
       */
      confirmationStyle: 'EXPLICIT' | 'VAGUE';

      /**
       * Creation timestamp
       */
      createdAt: string;

      /**
       * Gender of the persona
       */
      gender: 'MALE' | 'FEMALE';

      /**
       * Whether the persona uses filler words like "um" and "uh"
       */
      hasDisfluencies: boolean;

      /**
       * Maximum number of idle messages the persona will send before giving up
       */
      idleMessageMaxSpokenCount: number;

      /**
       * Whether the idle message counter resets when the agent speaks
       */
      idleMessageResetCountOnUserSpeechEnabled: boolean;

      /**
       * Messages the persona will say when the agent goes silent during a call. null =
       * "Automatic": language-appropriate defaults are used at call time.
       */
      idleMessages: Array<string> | null;

      /**
       * Seconds of silence before the persona sends an idle message
       */
      idleTimeoutSeconds: number;

      /**
       * How clearly the persona expresses their intentions
       */
      intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

      /**
       * Primary language ISO 639-1 code for the persona
       */
      language:
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE';

      /**
       * How reliable the persona's memory is
       */
      memoryReliability: 'HIGH' | 'LOW';

      /**
       * The name the agent will identify as during conversations
       */
      name: string;

      /**
       * Additional custom properties about the persona
       */
      properties: { [key: string]: unknown };

      /**
       * Controls how quickly the persona responds to pauses in conversation (QUICK,
       * NORMAL, RELAXED)
       */
      responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

      /**
       * Speech clarity of the persona
       */
      speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

      /**
       * Speech pace of the persona
       */
      speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

      /**
       * Languages the persona can understand. Multilingual combinations are limited by
       * multilingual speech recognition support.
       */
      understoodLanguages: Array<
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE'
      >;

      /**
       * Last update timestamp
       */
      updatedAt: string;

      /**
       * Background story and behavioral patterns for the persona
       */
      backstoryPrompt?: string | null;

      /**
       * Human-readable description of the persona
       */
      description?: string | null;

      /**
       * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
       */
      secondaryLanguage?: 'EN' | null;
    }
  }

  /**
   * One brief to run an improv flow with.
   */
  export interface ImprovFlowVariant {
    id: string;

    /**
     * Graded on top of the flow's own expectations, for this variant only.
     */
    additionalExpectations: Array<ImprovFlowVariant.AdditionalExpectation>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    environment: ImprovFlowVariant.Environment | null;

    isGenerated: boolean;

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    personaOverride: ImprovFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    title: string;

    type: 'IMPROV';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    /**
     * The brief the simulated customer improvises from.
     */
    prompt?: string | null;
  }

  export namespace ImprovFlowVariant {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AdditionalExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    export interface Environment {
      id: string;

      backgroundNoise:
        | 'NONE'
        | 'AIRPORT'
        | 'CHILDREN_PLAYING'
        | 'CITY'
        | 'COFFEE_SHOP'
        | 'DRIVING'
        | 'OFFICE'
        | 'THUNDERSTORM';

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      description?: string | null;
    }

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    export interface PersonaOverride {
      /**
       * Unique identifier of the persona
       */
      id: string;

      /**
       * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
       * optional variants
       */
      accent:
        | 'US'
        | 'US_X_SOUTH'
        | 'GB'
        | 'ES'
        | 'DE'
        | 'IN'
        | 'FR'
        | 'NL'
        | 'SA'
        | 'GR'
        | 'AU'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JP'
        | 'NZ'
        | 'PH'
        | 'SG'
        | 'MY'
        | 'HK'
        | 'TR'
        | 'PT'
        | 'IL';

      /**
       * Background noise setting
       */
      backgroundNoise:
        | 'NONE'
        | 'AIRPORT'
        | 'CHILDREN_PLAYING'
        | 'CITY'
        | 'COFFEE_SHOP'
        | 'DRIVING'
        | 'OFFICE'
        | 'THUNDERSTORM';

      /**
       * Base emotional state of the persona
       */
      baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED';

      /**
       * How the persona confirms information
       */
      confirmationStyle: 'EXPLICIT' | 'VAGUE';

      /**
       * Creation timestamp
       */
      createdAt: string;

      /**
       * Gender of the persona
       */
      gender: 'MALE' | 'FEMALE';

      /**
       * Whether the persona uses filler words like "um" and "uh"
       */
      hasDisfluencies: boolean;

      /**
       * Maximum number of idle messages the persona will send before giving up
       */
      idleMessageMaxSpokenCount: number;

      /**
       * Whether the idle message counter resets when the agent speaks
       */
      idleMessageResetCountOnUserSpeechEnabled: boolean;

      /**
       * Messages the persona will say when the agent goes silent during a call. null =
       * "Automatic": language-appropriate defaults are used at call time.
       */
      idleMessages: Array<string> | null;

      /**
       * Seconds of silence before the persona sends an idle message
       */
      idleTimeoutSeconds: number;

      /**
       * How clearly the persona expresses their intentions
       */
      intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

      /**
       * Primary language ISO 639-1 code for the persona
       */
      language:
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE';

      /**
       * How reliable the persona's memory is
       */
      memoryReliability: 'HIGH' | 'LOW';

      /**
       * The name the agent will identify as during conversations
       */
      name: string;

      /**
       * Additional custom properties about the persona
       */
      properties: { [key: string]: unknown };

      /**
       * Controls how quickly the persona responds to pauses in conversation (QUICK,
       * NORMAL, RELAXED)
       */
      responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

      /**
       * Speech clarity of the persona
       */
      speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

      /**
       * Speech pace of the persona
       */
      speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

      /**
       * Languages the persona can understand. Multilingual combinations are limited by
       * multilingual speech recognition support.
       */
      understoodLanguages: Array<
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE'
      >;

      /**
       * Last update timestamp
       */
      updatedAt: string;

      /**
       * Background story and behavioral patterns for the persona
       */
      backstoryPrompt?: string | null;

      /**
       * Human-readable description of the persona
       */
      description?: string | null;

      /**
       * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
       */
      secondaryLanguage?: 'EN' | null;
    }
  }

  /**
   * One voicemail greeting.
   */
  export interface VoicemailFlowVariant {
    id: string;

    /**
     * Graded on top of the flow's own expectations, for this variant only.
     */
    additionalExpectations: Array<VoicemailFlowVariant.AdditionalExpectation>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    environment: VoicemailFlowVariant.Environment | null;

    isGenerated: boolean;

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    personaOverride: VoicemailFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    title: string;

    type: 'VOICEMAIL';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }

  export namespace VoicemailFlowVariant {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AdditionalExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    export interface Environment {
      id: string;

      backgroundNoise:
        | 'NONE'
        | 'AIRPORT'
        | 'CHILDREN_PLAYING'
        | 'CITY'
        | 'COFFEE_SHOP'
        | 'DRIVING'
        | 'OFFICE'
        | 'THUNDERSTORM';

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      description?: string | null;
    }

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    export interface PersonaOverride {
      /**
       * Unique identifier of the persona
       */
      id: string;

      /**
       * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
       * optional variants
       */
      accent:
        | 'US'
        | 'US_X_SOUTH'
        | 'GB'
        | 'ES'
        | 'DE'
        | 'IN'
        | 'FR'
        | 'NL'
        | 'SA'
        | 'GR'
        | 'AU'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JP'
        | 'NZ'
        | 'PH'
        | 'SG'
        | 'MY'
        | 'HK'
        | 'TR'
        | 'PT'
        | 'IL';

      /**
       * Background noise setting
       */
      backgroundNoise:
        | 'NONE'
        | 'AIRPORT'
        | 'CHILDREN_PLAYING'
        | 'CITY'
        | 'COFFEE_SHOP'
        | 'DRIVING'
        | 'OFFICE'
        | 'THUNDERSTORM';

      /**
       * Base emotional state of the persona
       */
      baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED';

      /**
       * How the persona confirms information
       */
      confirmationStyle: 'EXPLICIT' | 'VAGUE';

      /**
       * Creation timestamp
       */
      createdAt: string;

      /**
       * Gender of the persona
       */
      gender: 'MALE' | 'FEMALE';

      /**
       * Whether the persona uses filler words like "um" and "uh"
       */
      hasDisfluencies: boolean;

      /**
       * Maximum number of idle messages the persona will send before giving up
       */
      idleMessageMaxSpokenCount: number;

      /**
       * Whether the idle message counter resets when the agent speaks
       */
      idleMessageResetCountOnUserSpeechEnabled: boolean;

      /**
       * Messages the persona will say when the agent goes silent during a call. null =
       * "Automatic": language-appropriate defaults are used at call time.
       */
      idleMessages: Array<string> | null;

      /**
       * Seconds of silence before the persona sends an idle message
       */
      idleTimeoutSeconds: number;

      /**
       * How clearly the persona expresses their intentions
       */
      intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

      /**
       * Primary language ISO 639-1 code for the persona
       */
      language:
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE';

      /**
       * How reliable the persona's memory is
       */
      memoryReliability: 'HIGH' | 'LOW';

      /**
       * The name the agent will identify as during conversations
       */
      name: string;

      /**
       * Additional custom properties about the persona
       */
      properties: { [key: string]: unknown };

      /**
       * Controls how quickly the persona responds to pauses in conversation (QUICK,
       * NORMAL, RELAXED)
       */
      responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

      /**
       * Speech clarity of the persona
       */
      speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

      /**
       * Speech pace of the persona
       */
      speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

      /**
       * Languages the persona can understand. Multilingual combinations are limited by
       * multilingual speech recognition support.
       */
      understoodLanguages: Array<
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE'
      >;

      /**
       * Last update timestamp
       */
      updatedAt: string;

      /**
       * Background story and behavioral patterns for the persona
       */
      backstoryPrompt?: string | null;

      /**
       * Human-readable description of the persona
       */
      description?: string | null;

      /**
       * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
       */
      secondaryLanguage?: 'EN' | null;
    }
  }
}

export type CustomerFlowCreateParams =
  | CustomerFlowCreateParams.CreateScriptedCustomerFlowInput
  | CustomerFlowCreateParams.CreateImprovCustomerFlowInput;

export declare namespace CustomerFlowCreateParams {
  export interface CreateScriptedCustomerFlowInput {
    /**
     * Agents this flow exercises. At least one is required.
     */
    agentIds: Array<string>;

    /**
     * The conversation, as a graph of steps. At most 100 steps across at most 25
     * paths. The variants come from the graph: one per path, so they are not sent
     * here.
     */
    graph: Array<FlowStep>;

    title: string;

    type: 'SCRIPTED';

    agentExpectations?: Array<CreateScriptedCustomerFlowInput.AgentExpectation>;

    /**
     * DETERMINISTIC (the default) runs one variant per path through the graph;
     * ADAPTIVE collapses the paths into one call the simulated customer adapts across.
     */
    branchingMode?: 'DETERMINISTIC' | 'ADAPTIVE';

    description?: string | null;
  }

  export namespace CreateScriptedCustomerFlowInput {
    export interface AgentExpectation {
      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }
  }

  export interface CreateImprovCustomerFlowInput {
    /**
     * Agents this flow exercises. At least one is required.
     */
    agentIds: Array<string>;

    /**
     * The way this flow is meant to go.
     */
    happyPath: CreateImprovCustomerFlowInput.HappyPath;

    title: string;

    type: 'IMPROV';

    agentExpectations?: Array<CreateImprovCustomerFlowInput.AgentExpectation>;

    description?: string | null;

    /**
     * Other ways of running it, each inheriting from the happy path what it does not
     * name.
     */
    edgeCases?: Array<CreateImprovCustomerFlowInput.EdgeCase>;
  }

  export namespace CreateImprovCustomerFlowInput {
    /**
     * The way this flow is meant to go.
     */
    export interface HappyPath {
      /**
       * The conditions this flow runs under. Edge cases inherit them unless they name
       * their own.
       */
      environmentId: string;

      /**
       * The persona this flow runs as. Edge cases inherit it unless they name their own.
       */
      personaOverrideId: string;

      title: string;

      precededByCustomerFlowId?: string | null;

      precededByCustomerFlowVariantId?: string | null;

      prompt?: string | null;
    }

    export interface AgentExpectation {
      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    export interface EdgeCase {
      title: string;

      environmentId?: string | null;

      /**
       * The persona this runs as. Omit to inherit the happy path's.
       */
      personaOverrideId?: string | null;

      precededByCustomerFlowId?: string | null;

      precededByCustomerFlowVariantId?: string | null;

      prompt?: string | null;
    }
  }
}

export interface CustomerFlowUpdateParams {
  /**
   * Replaces the flow-level expectations. Omit to leave them unchanged.
   */
  agentExpectations?: Array<CustomerFlowUpdateParams.AgentExpectation>;

  /**
   * Replaces the linked agents. Omit to leave them unchanged.
   */
  agentIds?: Array<string>;

  /**
   * Scripted flows only.
   */
  branchingMode?: 'DETERMINISTIC' | 'ADAPTIVE';

  description?: string | null;

  title?: string;
}

export namespace CustomerFlowUpdateParams {
  export interface AgentExpectation {
    /**
     * What the agent under test is graded against.
     */
    prompt: string;
  }
}

export interface CustomerFlowListParams {
  after?: string;

  includeSystem?: 'true' | 'false';

  limit?: number;

  searchText?: string;

  type?: 'SCRIPTED' | 'IMPROV' | 'VOICEMAIL';
}

export interface CustomerFlowReplaceGraphParams {
  /**
   * The complete graph. This replaces the flow's existing steps rather than merging
   * into them.
   */
  graph: Array<FlowStep>;

  /**
   * Confirms a write that drops branches which currently rejoin. Only needed when
   * the request omits mergeIntoNodeIds references the flow already had; a faithful
   * round trip never needs it.
   */
  allowUnmerge?: boolean;
}

export interface CustomerFlowUpdateHappyPathParams {
  /**
   * Replaces the expectations that apply to this variant on top of the flow's. Omit
   * to leave them alone, send [] to clear. Improv flows only: a scripted variant's
   * expectations come from the agent turns on its path and are rewritten on the next
   * graph edit.
   */
  additionalExpectations?: Array<CustomerFlowUpdateHappyPathParams.AdditionalExpectation>;

  environmentId?: string | null;

  /**
   * The persona this runs as. Null on an edge case inherits the happy path's.
   */
  personaOverrideId?: string | null;

  precededByCustomerFlowId?: string | null;

  precededByCustomerFlowVariantId?: string | null;

  prompt?: string | null;

  title?: string;
}

export namespace CustomerFlowUpdateHappyPathParams {
  export interface AdditionalExpectation {
    /**
     * What the agent under test is graded against.
     */
    prompt: string;
  }
}

export declare namespace CustomerFlow {
  export {
    type FlowStep as FlowStep,
    type CustomerFlowCreateResponse as CustomerFlowCreateResponse,
    type CustomerFlowUpdateResponse as CustomerFlowUpdateResponse,
    type CustomerFlowListResponse as CustomerFlowListResponse,
    type CustomerFlowDeleteResponse as CustomerFlowDeleteResponse,
    type CustomerFlowGetByIDResponse as CustomerFlowGetByIDResponse,
    type CustomerFlowReplaceGraphResponse as CustomerFlowReplaceGraphResponse,
    type CustomerFlowUpdateHappyPathResponse as CustomerFlowUpdateHappyPathResponse,
    type CustomerFlowCreateParams as CustomerFlowCreateParams,
    type CustomerFlowUpdateParams as CustomerFlowUpdateParams,
    type CustomerFlowListParams as CustomerFlowListParams,
    type CustomerFlowReplaceGraphParams as CustomerFlowReplaceGraphParams,
    type CustomerFlowUpdateHappyPathParams as CustomerFlowUpdateHappyPathParams,
  };
}
