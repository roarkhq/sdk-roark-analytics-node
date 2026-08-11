// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CustomerFlowAPI from './customer-flow';

export class CustomerFlow extends APIResource {}

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

export declare namespace CustomerFlow {
  export { type FlowStep as FlowStep };
}
