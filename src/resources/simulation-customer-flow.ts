// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SimulationCustomerFlowAPI from './simulation-customer-flow';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SimulationCustomerFlow extends APIResource {
  /**
   * Creates a customer flow. A SCRIPTED flow carries a step graph and gets one
   * variant per path through it; an UNSCRIPTED flow carries briefs and gets the
   * variants you send.
   *
   * @example
   * ```ts
   * const simulationCustomerFlow =
   *   await client.simulationCustomerFlow.create({
   *     agentIds: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
   *     mode: 'UNSCRIPTED',
   *     title: 'Reschedule an appointment',
   *   });
   * ```
   */
  create(
    body: SimulationCustomerFlowCreateParams,
    options?: RequestOptions,
  ): APIPromise<SimulationCustomerFlowCreateResponse> {
    return this._client.post('/v1/simulation/customer-flow', { body, ...options });
  }

  /**
   * Updates a flow's title, description, branching mode, linked agents or flow-level
   * expectations. The step graph is replaced through PUT /steps.
   *
   * @example
   * ```ts
   * const simulationCustomerFlow =
   *   await client.simulationCustomerFlow.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  update(
    flowID: string,
    body: SimulationCustomerFlowUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationCustomerFlowUpdateResponse> {
    return this._client.put(path`/v1/simulation/customer-flow/${flowID}`, { body, ...options });
  }

  /**
   * Returns a paginated list of customer flows with their agents, expectations and
   * variants. The step graph is the one field omitted: reading it walks the
   * project's whole step graph, so it comes back from the single-flow endpoint
   * instead.
   *
   * @example
   * ```ts
   * const simulationCustomerFlows =
   *   await client.simulationCustomerFlow.list();
   * ```
   */
  list(
    query: SimulationCustomerFlowListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationCustomerFlowListResponse> {
    return this._client.get('/v1/simulation/customer-flow', { query, ...options });
  }

  /**
   * Soft-deletes a customer flow along with its variants, expectations and (for
   * scripted flows) its step graph. Run plans that linked it drop it from their test
   * cases.
   *
   * @example
   * ```ts
   * const simulationCustomerFlow =
   *   await client.simulationCustomerFlow.delete(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  delete(flowID: string, options?: RequestOptions): APIPromise<SimulationCustomerFlowDeleteResponse> {
    return this._client.delete(path`/v1/simulation/customer-flow/${flowID}`, options);
  }

  /**
   * Returns a customer flow with its variants, expectations and linked agents.
   * Scripted flows also carry their step graph.
   *
   * @example
   * ```ts
   * const response =
   *   await client.simulationCustomerFlow.getByID(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  getByID(flowID: string, options?: RequestOptions): APIPromise<SimulationCustomerFlowGetByIDResponse> {
    return this._client.get(path`/v1/simulation/customer-flow/${flowID}`, options);
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
export interface FlowStep {
  type:
    | 'AGENT_TURN'
    | 'CUSTOMER_TURN'
    | 'CUSTOMER_FIRST_MESSAGE'
    | 'CUSTOMER_SILENCE'
    | 'CUSTOMER_DTMF'
    | 'VOICEMAIL'
    | 'SCENARIO_LINK';

  content?: string | null;

  dtmfDigits?: string | null;

  linkedCustomerFlowId?: string | null;

  linkedCustomerFlowVariantId?: string | null;

  mergeIntoNodeIds?: Array<string>;

  nodeId?: string;

  ref?: string;

  silenceDurationSeconds?: number | null;

  steps?: Array<FlowStep>;
}

export interface SimulationCustomerFlowCreateResponse {
  /**
   * A customer flow: the conversation a simulated customer has with the agent under
   * test. Flows with source SYSTEM are curated by Roark, shared across projects, and
   * read-only.
   */
  data: SimulationCustomerFlowCreateResponse.Data;
}

export namespace SimulationCustomerFlowCreateResponse {
  /**
   * A customer flow: the conversation a simulated customer has with the agent under
   * test. Flows with source SYSTEM are curated by Roark, shared across projects, and
   * read-only.
   */
  export interface Data {
    id: string;

    agentExpectations: Array<Data.AgentExpectation>;

    /**
     * Agents this flow exercises
     */
    agentIds: Array<string>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    mode: 'UNSCRIPTED' | 'SCRIPTED' | 'VOICEMAIL';

    scriptedBranchingMode: 'DETERMINISTIC' | 'ADAPTIVE';

    source: 'SYSTEM' | 'CUSTOM';

    startNodeId: string | null;

    title: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    variants: Array<Data.Variant>;

    description?: string | null;

    /**
     * The conversation, as a tree of steps. Scripted flows only.
     */
    steps?: Array<SimulationCustomerFlowAPI.FlowStep>;

    /**
     * Steps that another flow also uses. Removing one of these detaches it from this
     * flow rather than deleting it, so the other flow keeps working.
     */
    stepsSharedWithOtherFlows?: Array<string>;

    systemKey?: string | null;
  }

  export namespace Data {
    /**
     * An expectation the agent under test is graded against. On a scripted flow these
     * are derived from the agent turns in the graph, so they are read-only there.
     */
    export interface AgentExpectation {
      id: string;

      llmPrompt: string;

      orderIndex: number;

      sourceStepNodeId: string | null;
    }

    /**
     * One way of running a flow. Exactly one variant per flow is the default; the
     * others inherit its persona and environment wherever they leave those unset. On a
     * scripted flow each variant is bound to one path through the graph and the path
     * engine owns that binding.
     */
    export interface Variant {
      id: string;

      additionalExpectations: Array<Variant.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      customerFlowId: string;

      environmentId: string | null;

      isAutoGeneratedTitle: boolean;

      isDefault: boolean;

      isGenerated: boolean;

      latestPathId: string | null;

      personaId: string | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      prompt?: string | null;
    }

    export namespace Variant {
      /**
       * An expectation the agent under test is graded against. On a scripted flow these
       * are derived from the agent turns in the graph, so they are read-only there.
       */
      export interface AdditionalExpectation {
        id: string;

        llmPrompt: string;

        orderIndex: number;

        sourceStepNodeId: string | null;
      }
    }
  }
}

export interface SimulationCustomerFlowUpdateResponse {
  /**
   * A customer flow: the conversation a simulated customer has with the agent under
   * test. Flows with source SYSTEM are curated by Roark, shared across projects, and
   * read-only.
   */
  data: SimulationCustomerFlowUpdateResponse.Data;
}

export namespace SimulationCustomerFlowUpdateResponse {
  /**
   * A customer flow: the conversation a simulated customer has with the agent under
   * test. Flows with source SYSTEM are curated by Roark, shared across projects, and
   * read-only.
   */
  export interface Data {
    id: string;

    agentExpectations: Array<Data.AgentExpectation>;

    /**
     * Agents this flow exercises
     */
    agentIds: Array<string>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    mode: 'UNSCRIPTED' | 'SCRIPTED' | 'VOICEMAIL';

    scriptedBranchingMode: 'DETERMINISTIC' | 'ADAPTIVE';

    source: 'SYSTEM' | 'CUSTOM';

    startNodeId: string | null;

    title: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    variants: Array<Data.Variant>;

    description?: string | null;

    /**
     * The conversation, as a tree of steps. Scripted flows only.
     */
    steps?: Array<SimulationCustomerFlowAPI.FlowStep>;

    /**
     * Steps that another flow also uses. Removing one of these detaches it from this
     * flow rather than deleting it, so the other flow keeps working.
     */
    stepsSharedWithOtherFlows?: Array<string>;

    systemKey?: string | null;
  }

  export namespace Data {
    /**
     * An expectation the agent under test is graded against. On a scripted flow these
     * are derived from the agent turns in the graph, so they are read-only there.
     */
    export interface AgentExpectation {
      id: string;

      llmPrompt: string;

      orderIndex: number;

      sourceStepNodeId: string | null;
    }

    /**
     * One way of running a flow. Exactly one variant per flow is the default; the
     * others inherit its persona and environment wherever they leave those unset. On a
     * scripted flow each variant is bound to one path through the graph and the path
     * engine owns that binding.
     */
    export interface Variant {
      id: string;

      additionalExpectations: Array<Variant.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      customerFlowId: string;

      environmentId: string | null;

      isAutoGeneratedTitle: boolean;

      isDefault: boolean;

      isGenerated: boolean;

      latestPathId: string | null;

      personaId: string | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      prompt?: string | null;
    }

    export namespace Variant {
      /**
       * An expectation the agent under test is graded against. On a scripted flow these
       * are derived from the agent turns in the graph, so they are read-only there.
       */
      export interface AdditionalExpectation {
        id: string;

        llmPrompt: string;

        orderIndex: number;

        sourceStepNodeId: string | null;
      }
    }
  }
}

/**
 * Paginated list of customer flows
 */
export interface SimulationCustomerFlowListResponse {
  data: Array<SimulationCustomerFlowListResponse.Data>;

  pagination: SimulationCustomerFlowListResponse.Pagination;
}

export namespace SimulationCustomerFlowListResponse {
  /**
   * A customer flow: the conversation a simulated customer has with the agent under
   * test. Flows with source SYSTEM are curated by Roark, shared across projects, and
   * read-only.
   */
  export interface Data {
    id: string;

    agentExpectations: Array<Data.AgentExpectation>;

    /**
     * Agents this flow exercises
     */
    agentIds: Array<string>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    mode: 'UNSCRIPTED' | 'SCRIPTED' | 'VOICEMAIL';

    scriptedBranchingMode: 'DETERMINISTIC' | 'ADAPTIVE';

    source: 'SYSTEM' | 'CUSTOM';

    startNodeId: string | null;

    title: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    variants: Array<Data.Variant>;

    description?: string | null;

    /**
     * The conversation, as a tree of steps. Scripted flows only.
     */
    steps?: Array<SimulationCustomerFlowAPI.FlowStep>;

    /**
     * Steps that another flow also uses. Removing one of these detaches it from this
     * flow rather than deleting it, so the other flow keeps working.
     */
    stepsSharedWithOtherFlows?: Array<string>;

    systemKey?: string | null;
  }

  export namespace Data {
    /**
     * An expectation the agent under test is graded against. On a scripted flow these
     * are derived from the agent turns in the graph, so they are read-only there.
     */
    export interface AgentExpectation {
      id: string;

      llmPrompt: string;

      orderIndex: number;

      sourceStepNodeId: string | null;
    }

    /**
     * One way of running a flow. Exactly one variant per flow is the default; the
     * others inherit its persona and environment wherever they leave those unset. On a
     * scripted flow each variant is bound to one path through the graph and the path
     * engine owns that binding.
     */
    export interface Variant {
      id: string;

      additionalExpectations: Array<Variant.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      customerFlowId: string;

      environmentId: string | null;

      isAutoGeneratedTitle: boolean;

      isDefault: boolean;

      isGenerated: boolean;

      latestPathId: string | null;

      personaId: string | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      prompt?: string | null;
    }

    export namespace Variant {
      /**
       * An expectation the agent under test is graded against. On a scripted flow these
       * are derived from the agent turns in the graph, so they are read-only there.
       */
      export interface AdditionalExpectation {
        id: string;

        llmPrompt: string;

        orderIndex: number;

        sourceStepNodeId: string | null;
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

export interface SimulationCustomerFlowDeleteResponse {
  data: SimulationCustomerFlowDeleteResponse.Data;
}

export namespace SimulationCustomerFlowDeleteResponse {
  export interface Data {
    /**
     * Whether the flow was deleted
     */
    deleted: boolean;
  }
}

export interface SimulationCustomerFlowGetByIDResponse {
  /**
   * A customer flow: the conversation a simulated customer has with the agent under
   * test. Flows with source SYSTEM are curated by Roark, shared across projects, and
   * read-only.
   */
  data: SimulationCustomerFlowGetByIDResponse.Data;
}

export namespace SimulationCustomerFlowGetByIDResponse {
  /**
   * A customer flow: the conversation a simulated customer has with the agent under
   * test. Flows with source SYSTEM are curated by Roark, shared across projects, and
   * read-only.
   */
  export interface Data {
    id: string;

    agentExpectations: Array<Data.AgentExpectation>;

    /**
     * Agents this flow exercises
     */
    agentIds: Array<string>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    mode: 'UNSCRIPTED' | 'SCRIPTED' | 'VOICEMAIL';

    scriptedBranchingMode: 'DETERMINISTIC' | 'ADAPTIVE';

    source: 'SYSTEM' | 'CUSTOM';

    startNodeId: string | null;

    title: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    variants: Array<Data.Variant>;

    description?: string | null;

    /**
     * The conversation, as a tree of steps. Scripted flows only.
     */
    steps?: Array<SimulationCustomerFlowAPI.FlowStep>;

    /**
     * Steps that another flow also uses. Removing one of these detaches it from this
     * flow rather than deleting it, so the other flow keeps working.
     */
    stepsSharedWithOtherFlows?: Array<string>;

    systemKey?: string | null;
  }

  export namespace Data {
    /**
     * An expectation the agent under test is graded against. On a scripted flow these
     * are derived from the agent turns in the graph, so they are read-only there.
     */
    export interface AgentExpectation {
      id: string;

      llmPrompt: string;

      orderIndex: number;

      sourceStepNodeId: string | null;
    }

    /**
     * One way of running a flow. Exactly one variant per flow is the default; the
     * others inherit its persona and environment wherever they leave those unset. On a
     * scripted flow each variant is bound to one path through the graph and the path
     * engine owns that binding.
     */
    export interface Variant {
      id: string;

      additionalExpectations: Array<Variant.AdditionalExpectation>;

      /**
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      customerFlowId: string;

      environmentId: string | null;

      isAutoGeneratedTitle: boolean;

      isDefault: boolean;

      isGenerated: boolean;

      latestPathId: string | null;

      personaId: string | null;

      precededByCustomerFlowId: string | null;

      precededByCustomerFlowVariantId: string | null;

      title: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      prompt?: string | null;
    }

    export namespace Variant {
      /**
       * An expectation the agent under test is graded against. On a scripted flow these
       * are derived from the agent turns in the graph, so they are read-only there.
       */
      export interface AdditionalExpectation {
        id: string;

        llmPrompt: string;

        orderIndex: number;

        sourceStepNodeId: string | null;
      }
    }
  }
}

export interface SimulationCustomerFlowCreateParams {
  /**
   * Agents this flow exercises. At least one is required.
   */
  agentIds: Array<string>;

  /**
   * SCRIPTED follows a step graph you author; UNSCRIPTED gives the simulated
   * customer a brief and lets it improvise.
   */
  mode: 'UNSCRIPTED' | 'SCRIPTED';

  title: string;

  agentExpectations?: Array<SimulationCustomerFlowCreateParams.AgentExpectation>;

  description?: string | null;

  /**
   * Scripted flows only. DETERMINISTIC runs one variant per path through the graph;
   * ADAPTIVE collapses the paths into one call the customer adapts across.
   */
  scriptedBranchingMode?: 'DETERMINISTIC' | 'ADAPTIVE';

  /**
   * Required for SCRIPTED flows. At most 100 steps across at most 25 paths.
   */
  steps?: Array<FlowStep>;

  /**
   * Required for UNSCRIPTED flows: the briefs to run. Scripted flows get one variant
   * per path from the graph instead.
   */
  variants?: Array<SimulationCustomerFlowCreateParams.Variant>;
}

export namespace SimulationCustomerFlowCreateParams {
  export interface AgentExpectation {
    llmPrompt: string;
  }

  export interface Variant {
    title: string;

    environmentId?: string | null;

    isDefault?: boolean;

    personaId?: string | null;

    precededByCustomerFlowId?: string | null;

    precededByCustomerFlowVariantId?: string | null;

    prompt?: string | null;
  }
}

export interface SimulationCustomerFlowUpdateParams {
  /**
   * Replaces the flow-level expectations. Omit to leave them unchanged.
   */
  agentExpectations?: Array<SimulationCustomerFlowUpdateParams.AgentExpectation>;

  /**
   * Replaces the linked agents. Omit to leave them unchanged.
   */
  agentIds?: Array<string>;

  description?: string | null;

  scriptedBranchingMode?: 'DETERMINISTIC' | 'ADAPTIVE';

  title?: string;
}

export namespace SimulationCustomerFlowUpdateParams {
  export interface AgentExpectation {
    llmPrompt: string;
  }
}

export interface SimulationCustomerFlowListParams {
  after?: string;

  includeSystem?: 'true' | 'false';

  limit?: number;

  mode?: 'UNSCRIPTED' | 'SCRIPTED' | 'VOICEMAIL';

  searchText?: string;
}

export declare namespace SimulationCustomerFlow {
  export {
    type FlowStep as FlowStep,
    type SimulationCustomerFlowCreateResponse as SimulationCustomerFlowCreateResponse,
    type SimulationCustomerFlowUpdateResponse as SimulationCustomerFlowUpdateResponse,
    type SimulationCustomerFlowListResponse as SimulationCustomerFlowListResponse,
    type SimulationCustomerFlowDeleteResponse as SimulationCustomerFlowDeleteResponse,
    type SimulationCustomerFlowGetByIDResponse as SimulationCustomerFlowGetByIDResponse,
    type SimulationCustomerFlowCreateParams as SimulationCustomerFlowCreateParams,
    type SimulationCustomerFlowUpdateParams as SimulationCustomerFlowUpdateParams,
    type SimulationCustomerFlowListParams as SimulationCustomerFlowListParams,
  };
}
