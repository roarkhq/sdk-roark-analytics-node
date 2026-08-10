// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Simulation extends APIResource {
  /**
   * Runs a simulation and returns the run that was started.
   *
   * Describe the simulation in `plan`, or name an existing one with `planId`. Every
   * run is backed by a run plan, but you only get one you can see and re-use if you
   * ask for it with `saveAsPlanName`; otherwise the plan is created hidden and
   * simply carries the run.
   *
   * This replaces creating a plan and then starting a job against it. The response
   * carries `simulationJobCount`, the number of calls the run places, each of which
   * is billed.
   *
   * @example
   * ```ts
   * const response = await client.simulation.run();
   * ```
   */
  run(
    body: SimulationRunParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationRunResponse> {
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
     * How many simulated calls this run places. Each is billed.
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
      | 'RUNNING_SIMULATIONS'
      | 'COMPLETED'
      | 'FAILED'
      | 'TIMED_OUT'
      | 'CANCELLED'
      | 'CANCELLING'
      | 'ENDING_SIMULATIONS';
  }
}

export interface SimulationRunParams {
  /**
   * Runtime variable overrides targeted at the plan’s customer flows, taking
   * precedence over the values pinned on the flow attachment.
   *
   * An entry without `variantId` applies to every variant the attachment resolves. A
   * flow that is not attached to this plan, or a variant that does not belong to the
   * flow, is rejected rather than ignored.
   */
  flowVariables?: Array<SimulationRunParams.FlowVariable>;

  /**
   * The simulation to run. A run plan is created for it behind the scenes.
   */
  plan?: SimulationRunParams.Plan;

  /**
   * Run a plan that already exists instead of describing one. Mutually exclusive
   * with `plan`.
   */
  planId?: string;

  /**
   * Keep this run as a reusable plan under this name.
   *
   * Left unset, the run still needs a plan to execute, but it is created hidden: it
   * does not appear in GET /v1/simulation/plan and exists only to carry the run.
   * Applies only alongside `plan`, since `planId` names a plan that already exists.
   */
  saveAsPlanName?: string;

  /**
   * Runtime variables that override the values defined on the plan. Accepts one of
   * two formats:
   *
   * Option 1, global (a flat key-value object): { "orderNumber": "12345",
   * "environment": "staging" }
   *
   * Option 2, per-scenario (an array of objects with scenarioId + variables): [ {
   * "scenarioId": "550e8400-...", "variables": { "orderNumber": "12345" } }, {
   * "scenarioId": "7a3d2e1f-...", "variables": { "orderNumber": "67890" } } ]
   *
   * On a flow-based plan the global format applies to every variant the run
   * resolves. The per-scenario format targets scenarios, so use `flowVariables` to
   * override a specific flow or variant instead.
   */
  variables?: { [key: string]: string } | Array<SimulationRunParams.UnionMember1>;
}

export namespace SimulationRunParams {
  export interface FlowVariable {
    /**
     * ID of a customer flow attached to this plan
     */
    flowId: string;

    /**
     * Key-value pairs to apply
     */
    variables: { [key: string]: string };

    /**
     * Target a single variant. Omit to apply to every variant this plan runs for the
     * flow.
     */
    variantId?: string;
  }

  /**
   * The simulation to run. A run plan is created for it behind the scenes.
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
     * One customer flow attached to a run plan.
     *
     * To run specific variants, list them in `variants`. Each entry may carry its own
     * `personaOverrideId` and `variables`, so pinning two variants of one flow at
     * different values is a single attachment.
     *
     * To let the run resolve the variants instead, leave `variants` out and set
     * `variantSelectionMode`: ALL_VARIANTS: every variant the flow has when the run
     * starts DEFAULT_VARIANT: only its default, so it follows the flow as the default
     * moves
     *
     * There is no default mode. Each variant is a separate simulated call, so a
     * forgotten field would quietly change how many calls a run places.
     *
     * `personaOverrideId` runs a variant as that persona instead of its own. Set it on
     * the attachment to apply to every variant it resolves, or on a `variants` entry
     * for one. The entry wins. Attaching the same flow more than once with different
     * overrides is how you fan it out across personas.
     *
     * `variables` pins {{variable}} values the same way. Anything left unset is asked
     * for when the run starts.
     */
    export interface Flow {
      customerFlowId: string;

      variants: Array<Flow.Variant>;

      personaOverrideId?: string | null;

      variables?: { [key: string]: string };

      variantSelectionMode?: 'ALL_VARIANTS' | 'DEFAULT_VARIANT' | 'SPECIFIC_VARIANT';
    }

    export namespace Flow {
      export interface Variant {
        id: string;

        personaOverrideId?: string | null;

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
     * ID of the scenario to apply variables to
     */
    scenarioId: string;

    /**
     * Key-value pairs for this scenario
     */
    variables: { [key: string]: string };
  }
}

export declare namespace Simulation {
  export {
    type SimulationRunResponse as SimulationRunResponse,
    type SimulationRunParams as SimulationRunParams,
  };
}
