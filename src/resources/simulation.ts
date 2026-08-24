// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Simulation extends APIResource {
  /**
   * Starts a simulation and returns the run.
   *
   * Send `plan` to describe a simulation and run it once. Add `saveAsPlan` to keep
   * that configuration as a reusable run plan. Send `planId` instead to run a plan
   * you already have.
   *
   * @example
   * ```ts
   * const response = await client.simulation.run({
   *   plan: {
   *     agentEndpoints: [
   *       { id: '7c9e6679-7425-40de-944b-e07fc1f90ae7' },
   *     ],
   *     direction: 'OUTBOUND',
   *     maxSimulationDurationSeconds: 300,
   *     metrics: [{}],
   *   },
   * });
   * ```
   */
  run(body: SimulationRunParams, options?: RequestOptions): APIPromise<SimulationRunResponse> {
    return this._client.post('/v1/simulation/run', { body, ...options });
  }
}

export interface SimulationRunResponse {
  /**
   * A started simulation run.
   */
  data: SimulationRunResponse.Data;
}

export namespace SimulationRunResponse {
  /**
   * A started simulation run.
   */
  export interface Data {
    /**
     * When the run was created, ISO 8601.
     */
    createdAt: string;

    /**
     * Whether that plan is listed by GET /v1/simulation/plan. False for an unsaved
     * run, whose plan is hidden.
     */
    savedAsPlan: boolean;

    /**
     * How many simulated calls this run places.
     */
    simulationJobCount: number;

    /**
     * The run plan behind this run, present whether or not it was saved. Pass it back
     * as `planId` to run the same configuration again.
     */
    simulationRunPlanId: string;

    /**
     * The run. Poll it with GET /v1/simulation/plan/job/{jobId}.
     */
    simulationRunPlanJobId: string;

    /**
     * Initial status. PENDING normally, or QUEUED when the plan runs sequentially and
     * another job of its is still active.
     */
    status:
      | 'PENDING'
      | 'QUEUED'
      | 'CREATING_SNAPSHOTS'
      | 'CREATING_SIMULATIONS'
      | 'PREPARING_CAPACITY'
      | 'RUNNING_SIMULATIONS'
      | 'COMPLETED'
      | 'FAILED'
      | 'TIMED_OUT'
      | 'CANCELLED'
      | 'CANCELLING'
      | 'ENDING_SIMULATIONS';
  }
}

export type SimulationRunParams =
  | SimulationRunParams.RunSimulationFromConfig
  | SimulationRunParams.RunSimulationFromPlanID;

export declare namespace SimulationRunParams {
  export interface RunSimulationFromConfig {
    /**
     * The simulation to run: what to call, who calls it, and what to measure.
     */
    plan: RunSimulationFromConfig.Plan;

    /**
     * Keeps this configuration as a run plan, listed by GET /v1/simulation/plan and
     * re-runnable with `planId`. Requires `plan.name`, since a plan you meant to keep
     * should not be filed under a generated one.
     *
     * Omitted or false gives a one-off. The run still needs a plan to execute, so one
     * is created either way, but it is hidden: it carries this run and nothing else.
     */
    saveAsPlan?: boolean;

    /**
     * Values for the {{variables}} the run resolves, overriding whatever the plan has
     * pinned.
     *
     * An object applies them to the whole run:
     *
     * { "orderNumber": "12345", "tier": "gold" }
     *
     * An array applies them per flow, or to just its happy path or one of its edge
     * cases, when a single set will not do. Each entry carries what it applies to:
     *
     * [ { "flowId": "550e8400-...", "variables": { "orderNumber": "12345" } }, {
     * "flowId": "550e8400-...", "happyPath": true, "variables": { "orderNumber":
     * "55555" } }, { "flowId": "550e8400-...", "edgeCaseId": "7a3d2e1f-...",
     * "variables": { "orderNumber": "67890" } } ]
     *
     * An entry that narrows to neither covers everything that flow resolves. A flow
     * this plan does not attach, or an edge case that does not belong to the flow, is
     * rejected rather than ignored.
     *
     * A plan built on scenarios rather than customer flows targets them the same way,
     * with `scenarioId` in place of `flowId`. That form is deprecated alongside
     * scenarios themselves, and still accepted so runs against those plans keep
     * working.
     */
    variables?:
      | { [key: string]: string }
      | Array<RunSimulationFromConfig.UnionMember1>
      | Array<RunSimulationFromConfig.UnionMember2>;
  }

  export namespace RunSimulationFromConfig {
    /**
     * The simulation to run: what to call, who calls it, and what to measure.
     */
    export interface Plan {
      /**
       * Agent endpoints to include in this run plan
       */
      agentEndpoints: Array<Plan.AgentEndpoint>;

      /**
       * Direction of the simulation (INBOUND or OUTBOUND)
       */
      direction: 'INBOUND' | 'OUTBOUND';

      /**
       * Maximum duration in seconds for each simulation
       */
      maxSimulationDurationSeconds: number;

      /**
       * Metric definitions to include in this run plan. Reference each by `id` (UUID) or
       * `slug`.
       */
      metrics: Array<Plan.Metric>;

      /**
       * Description of the run plan
       */
      description?: string;

      /**
       * Phrases that trigger end of call. Empty array disables the feature.
       */
      endCallPhrases?: Array<string>;

      /**
       * Semantic conditions that trigger end of call. The LLM evaluates the conversation
       * against these conditions. Empty array disables the feature.
       */
      endCallReasons?: Array<string>;

      /**
       * Execution mode (PARALLEL or SEQUENTIAL)
       */
      executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

      /**
       * Customer flows to include in this run plan. The same flow can appear more than
       * once with a different persona override or different variables.
       */
      flows?: Array<Plan.Flow>;

      /**
       * Number of iterations to run for each test case (1-10000)
       */
      iterationCount?: number;

      /**
       * Maximum number of concurrent simulation jobs
       */
      maxConcurrentJobs?: number;

      /**
       * What to call this. Generated from the date when omitted, and required with
       * `saveAsPlan`.
       */
      name?: string;

      /**
       * Personas to include in this run plan. Required with `scenarios`; ignored with
       * `flows`, where each variant carries its own persona.
       */
      personas?: Array<Plan.Persona>;

      /**
       * @deprecated Deprecated: use `flows` instead. Scenarios to include in this run
       * plan. The same scenario ID can appear multiple times with different variables.
       */
      scenarios?: Array<Plan.Scenario>;

      /**
       * Timeout in seconds for silence detection
       */
      silenceTimeoutSeconds?: number;
    }

    export namespace Plan {
      export interface AgentEndpoint {
        id: string;
      }

      export interface Metric {
        /**
         * Metric definition UUID. Provide either this or `slug`, not both.
         */
        id?: string;

        /**
         * Alias of `slug` accepted for backwards compatibility. Use `slug` for new
         * integrations.
         */
        metricId?: string;

        /**
         * Stable metric slug (e.g. `customer_satisfaction`). Provide either this or `id`,
         * not both.
         */
        slug?: string;
      }

      /**
       * One customer flow attached to a run plan, and which of its ways of running you
       * cover.
       *
       * Attaching the same flow more than once with different overrides is how you fan
       * it out across personas or values.
       */
      export interface Flow {
        /**
         * The customer flow to run.
         */
        id: string;

        /**
         * `"ALL"` runs every edge case the flow has when the run starts, so one added
         * later is covered. An array runs only the ones you name, each able to carry its
         * own persona override and values.
         */
        edgeCases?: 'ALL' | Array<Flow.UnionMember1>;

        /**
         * Run the flow's happy path. Resolved when the run starts, so it follows the flow.
         */
        happyPath?: boolean;

        /**
         * Runs everything this attachment resolves as that persona instead of its own.
         */
        personaOverrideId?: string | null;

        /**
         * Values for everything it resolves.
         */
        variables?: { [key: string]: string };
      }

      export namespace Flow {
        export interface UnionMember1 {
          /**
           * The edge case to run.
           */
          id: string;

          /**
           * Run this one as that persona instead of its own.
           */
          personaOverrideId?: string | null;

          /**
           * Values for this one only.
           */
          variables?: { [key: string]: string };
        }
      }

      export interface Persona {
        id: string;
      }

      export interface Scenario {
        /**
         * Scenario ID
         */
        id: string;

        /**
         * Template variables for this scenario instance. The same scenario can appear
         * multiple times with different variables.
         */
        variables?: { [key: string]: string };
      }
    }

    export interface UnionMember1 {
      /**
       * A customer flow this plan runs.
       */
      flowId: string;

      /**
       * The values to apply.
       */
      variables: { [key: string]: string };

      /**
       * Narrow to one edge case of that flow.
       */
      edgeCaseId?: string;

      /**
       * Narrow to the flow's happy path.
       */
      happyPath?: true;
    }

    export interface UnionMember2 {
      /**
       * ID of the scenario to apply variables to
       */
      scenarioId: string;

      /**
       * Key-value pairs for this scenario
       */
      variables: { [key: string]: string };
    }
  }

  export interface RunSimulationFromPlanID {
    /**
     * The run plan to run, saved or hidden. Rename or unhide it with PUT
     * /v1/simulation/plan/{planId}.
     */
    planId: string;

    /**
     * Values for the {{variables}} the run resolves, overriding whatever the plan has
     * pinned.
     *
     * An object applies them to the whole run:
     *
     * { "orderNumber": "12345", "tier": "gold" }
     *
     * An array applies them per flow, or to just its happy path or one of its edge
     * cases, when a single set will not do. Each entry carries what it applies to:
     *
     * [ { "flowId": "550e8400-...", "variables": { "orderNumber": "12345" } }, {
     * "flowId": "550e8400-...", "happyPath": true, "variables": { "orderNumber":
     * "55555" } }, { "flowId": "550e8400-...", "edgeCaseId": "7a3d2e1f-...",
     * "variables": { "orderNumber": "67890" } } ]
     *
     * An entry that narrows to neither covers everything that flow resolves. A flow
     * this plan does not attach, or an edge case that does not belong to the flow, is
     * rejected rather than ignored.
     *
     * A plan built on scenarios rather than customer flows targets them the same way,
     * with `scenarioId` in place of `flowId`. That form is deprecated alongside
     * scenarios themselves, and still accepted so runs against those plans keep
     * working.
     */
    variables?:
      | { [key: string]: string }
      | Array<RunSimulationFromPlanID.UnionMember1>
      | Array<RunSimulationFromPlanID.UnionMember2>;
  }

  export namespace RunSimulationFromPlanID {
    export interface UnionMember1 {
      /**
       * A customer flow this plan runs.
       */
      flowId: string;

      /**
       * The values to apply.
       */
      variables: { [key: string]: string };

      /**
       * Narrow to one edge case of that flow.
       */
      edgeCaseId?: string;

      /**
       * Narrow to the flow's happy path.
       */
      happyPath?: true;
    }

    export interface UnionMember2 {
      /**
       * ID of the scenario to apply variables to
       */
      scenarioId: string;

      /**
       * Key-value pairs for this scenario
       */
      variables: { [key: string]: string };
    }
  }
}

export declare namespace Simulation {
  export {
    type SimulationRunResponse as SimulationRunResponse,
    type SimulationRunParams as SimulationRunParams,
  };
}
