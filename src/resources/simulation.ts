// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Simulation extends APIResource {
  /**
   * Starts a simulation and returns the run.
   *
   * Send `template` to run one of the built-in templates: it supplies the metrics
   * and checks, and for some templates the flows too, so the request only names the
   * agent and the direction. Send `plan` to describe a simulation yourself and run
   * it once. Send `planId` to run a plan you already have.
   *
   * `template` and `plan` both resolve to a run plan, returned as
   * `simulationRunPlanId`. Add `saveAsPlan` to keep it, or read it back to see
   * exactly what ran. A plan built from a template is a snapshot: retuning the
   * template later never changes what that plan runs, which is what makes a saved
   * one safe to pin in CI.
   *
   * @example
   * ```ts
   * const response = await client.simulation.run({
   *   plan: {
   *     agentEndpoints: [
   *       { id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
   *     ],
   *     direction: 'INBOUND',
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
  | SimulationRunParams.RunSimulationFromPlanID
  | SimulationRunParams.RunSimulationFromTemplate;

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
       * Merge the customer's own recording of the real call into each simulation, so
       * metrics can be scored against the live leg as well as the simulated one. This is
       * the API equivalent of the dashboard's live-enrichment toggle.
       *
       * With this on, the run provisions a phone number and holds each call open for up
       * to 15 minutes waiting for a matching call to be posted to POST /v1/call. A call
       * matches on the provisioned number (`roarkPhoneNumber` on the job) with a start
       * time inside the simulation window. If nothing arrives, the simulation still
       * completes and any `LIVE`-sourced metric produces no value.
       *
       * Required by any metric whose `requiresLiveConversation` is true: without it that
       * metric is silently skipped.
       */
      enrichWithLiveConversation?: boolean;

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
       * Also collect each attached flow's own metrics, on top of the `metrics` named
       * here.
       *
       * Default true, which is what you want when you brought your own flows and their
       * graders. Set false for a run whose metric list is meant to be exhaustive: a
       * template like Load Testing or Voicemail deliberately grades a narrow set, and
       * inheriting every flow metric on top multiplies analysis cost across the volume
       * without adding signal.
       *
       * GET /v1/simulation/template returns the value each template expects.
       */
      includeFlowMetrics?: boolean;

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
         * Which side of an enriched run this metric is scored on. Only meaningful with
         * `enrichWithLiveConversation: true`, where a run has both a simulated
         * conversation and the customer's own live recording of it.
         *
         * Defaults to `SIMULATED`. Use `LIVE` for a metric that must be measured against
         * the real recording (audio quality, provider latency) rather than the simulated
         * leg. `null` means the same as omitting it, so a plan read back from GET can be
         * sent straight to PUT.
         */
        conversationSource?: 'SIMULATED' | 'LIVE' | null;

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
        id?: string;

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
         * The Roark-curated flow to run, by its stable slug. Use instead of `id` for a run
         * you keep in version control: a curated flow’s id differs between deployments,
         * its slug does not. Your own flows have no slug and are named by `id`.
         */
        slug?: string;

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
          id?: string;

          /**
           * Run this one as that persona instead of its own.
           */
          personaOverrideId?: string | null;

          /**
           * The edge case to run, by its stable slug, matched within this flow. Use instead
           * of `id` for a run you keep in version control: a curated edge case’s id differs
           * between deployments and changes outright if it is renamed. Your own edge cases
           * have no slug and are named by `id`.
           */
          slug?: string;

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

  export interface RunSimulationFromTemplate {
    /**
     * The agent endpoints to call. No template can know these.
     */
    agentEndpoints: Array<RunSimulationFromTemplate.AgentEndpoint>;

    /**
     * Direction of the simulation (INBOUND or OUTBOUND)
     */
    direction: 'INBOUND' | 'OUTBOUND';

    /**
     * The template to run, as listed by GET /v1/simulation/template.
     */
    template: string;

    /**
     * Phrases that trigger end of call. Empty array disables the feature.
     */
    endCallPhrases?: Array<string>;

    /**
     * Semantic conditions that trigger end of call. The LLM evaluates the conversation
     * against these conditions. Defaults to the template's `defaultEndCallReasons`, as
     * returned by GET /v1/simulation/template. Pass an empty array to run with none.
     */
    endCallReasons?: Array<string>;

    /**
     * Merge the customer's own recording of the real call into each simulation, so
     * metrics can be scored against the live leg as well as the simulated one. This is
     * the API equivalent of the dashboard's live-enrichment toggle.
     *
     * With this on, the run provisions a phone number and holds each call open for up
     * to 15 minutes waiting for a matching call to be posted to POST /v1/call. A call
     * matches on the provisioned number (`roarkPhoneNumber` on the job) with a start
     * time inside the simulation window. If nothing arrives, the simulation still
     * completes and any `LIVE`-sourced metric produces no value.
     *
     * Required by any metric whose `requiresLiveConversation` is true: without it that
     * metric is silently skipped.
     */
    enrichWithLiveConversation?: boolean;

    /**
     * Execution mode (PARALLEL or SEQUENTIAL)
     */
    executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

    /**
     * The flows to run, in the same shape a run plan takes them.
     *
     * Required when the template lists no flows of its own: it presets what to
     * measure, and this says what to measure it on. Optional when it does, where these
     * REPLACE the ones it would have run, so you can narrow a suite to the cases you
     * care about. Either way, GET /v1/simulation/template lists the flows and variant
     * ids each template covers.
     */
    flows?: Array<RunSimulationFromTemplate.Flow>;

    /**
     * Number of iterations to run for each test case (1-10000)
     */
    iterationCount?: number;

    /**
     * Maximum number of concurrent simulation jobs
     */
    maxConcurrentJobs?: number;

    /**
     * Defaults to the template's `defaultMaxSimulationDurationSeconds`, as returned by
     * GET /v1/simulation/template.
     */
    maxSimulationDurationSeconds?: number;

    /**
     * What to call this. Defaults to the template's name and the date, and required
     * with `saveAsPlan`.
     */
    name?: string;

    /**
     * Keeps the resolved configuration as a run plan, listed by GET
     * /v1/simulation/plan and re-runnable with `planId`. Requires `name`.
     */
    saveAsPlan?: boolean;

    /**
     * Timeout in seconds for silence detection
     */
    silenceTimeoutSeconds?: number;

    /**
     * Values for the {{variables}} the run resolves. An object applies them
     * everywhere; an array targets a flow, its happy path, or one of its edge cases
     * with `flowId`.
     *
     * The scenario-scoped form the other variants accept is not valid here: a template
     * run is always flow-based, so there would be no scenario for it to reach.
     */
    variables?: { [key: string]: string } | Array<RunSimulationFromTemplate.UnionMember1>;
  }

  export namespace RunSimulationFromTemplate {
    export interface AgentEndpoint {
      id: string;
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
      id?: string;

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
       * The Roark-curated flow to run, by its stable slug. Use instead of `id` for a run
       * you keep in version control: a curated flow’s id differs between deployments,
       * its slug does not. Your own flows have no slug and are named by `id`.
       */
      slug?: string;

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
        id?: string;

        /**
         * Run this one as that persona instead of its own.
         */
        personaOverrideId?: string | null;

        /**
         * The edge case to run, by its stable slug, matched within this flow. Use instead
         * of `id` for a run you keep in version control: a curated edge case’s id differs
         * between deployments and changes outright if it is renamed. Your own edge cases
         * have no slug and are named by `id`.
         */
        slug?: string;

        /**
         * Values for this one only.
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
  }
}

export declare namespace Simulation {
  export {
    type SimulationRunResponse as SimulationRunResponse,
    type SimulationRunParams as SimulationRunParams,
  };
}
