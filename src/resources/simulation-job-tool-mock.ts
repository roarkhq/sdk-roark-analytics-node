// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SimulationJobToolMock extends APIResource {
  /**
   * Every guarded tool invocation Roark answered during this simulation: what the
   * agent tried to call, with what arguments, and the simulated response it
   * received. Use this to assert tool behavior in CI after a test call, with zero
   * real side effects. Empty when the agent's tools are not guarded (see the tool
   * guard docs).
   *
   * @example
   * ```ts
   * const simulationJobToolMocks =
   *   await client.simulationJobToolMock.list(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  list(jobID: string, options?: RequestOptions): APIPromise<SimulationJobToolMockListResponse> {
    return this._client.get(path`/v1/simulation/job/${jobID}/tool-mock`, options);
  }
}

export interface SimulationJobToolMockListResponse {
  data: Array<SimulationJobToolMockListResponse.Data>;
}

export namespace SimulationJobToolMockListResponse {
  /**
   * One guarded tool invocation during a test call: what the agent tried to call,
   * and what it got.
   */
  export interface Data {
    id: string;

    /**
     * ISO 8601.
     */
    createdAt: string;

    sessionId: string | null;

    /**
     * GENERATED = the scenario-aware model answered; FIXTURE = a pinned deterministic
     * response.
     */
    source: 'GENERATED' | 'FIXTURE';

    toolName: string;

    /**
     * What the agent called the tool with, verbatim.
     */
    arguments?: unknown;

    /**
     * The simulated response the agent received.
     */
    result?: unknown;
  }
}

export declare namespace SimulationJobToolMock {
  export { type SimulationJobToolMockListResponse as SimulationJobToolMockListResponse };
}
