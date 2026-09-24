// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SimulationRunPlanJob extends APIResource {
  /**
   * Returns a paginated list of simulation run plan jobs. Filter by status, plan ID,
   * or label to find specific simulation batches.
   *
   * @example
   * ```ts
   * const simulationRunPlanJobs =
   *   await client.simulationRunPlanJob.list();
   * ```
   */
  list(
    query: SimulationRunPlanJobListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationRunPlanJobListResponse> {
    return this._client.get('/v1/simulation/plan/jobs', { query, ...options });
  }

  /**
   * Stops a run that has not finished yet. Already-finished runs are left alone.
   *
   * Intended for CI: when a pipeline is cancelled or superseded, cancelling the run
   * stops it placing calls you no longer need. Safe to call more than once.
   *
   * @example
   * ```ts
   * const response = await client.simulationRunPlanJob.cancel(
   *   '7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f',
   * );
   * ```
   */
  cancel(jobID: string, options?: RequestOptions): APIPromise<SimulationRunPlanJobCancelResponse> {
    return this._client.post(path`/v1/simulation/plan/job/${jobID}/cancel`, options);
  }

  /**
   * Retrieve details of a simulation plan job including all associated simulation
   * jobs (calls)
   *
   * @example
   * ```ts
   * const response = await client.simulationRunPlanJob.getByID(
   *   '7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f',
   * );
   * ```
   */
  getByID(jobID: string, options?: RequestOptions): APIPromise<SimulationRunPlanJobGetByIDResponse> {
    return this._client.get(path`/v1/simulation/plan/job/${jobID}`, options);
  }

  /**
   * Deprecated: use POST /v1/simulation/run, which does the same thing and can also
   * take the plan configuration inline, so a one-off run does not have to create a
   * plan first.
   *
   * Creates and executes a job for an existing simulation run plan. Optionally
   * provide runtime variables to override plan-defined variables.
   *
   * @deprecated
   *
   * @example
   * ```ts
   * const response = await client.simulationRunPlanJob.start(
   *   '7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f',
   * );
   * ```
   */
  start(
    planID: string,
    body: SimulationRunPlanJobStartParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationRunPlanJobStartResponse> {
    return this._client.post(path`/v1/simulation/plan/${planID}/job`, { body, ...options });
  }
}

/**
 * Paginated list of simulation run plan jobs
 */
export interface SimulationRunPlanJobListResponse {
  data: Array<SimulationRunPlanJobListResponse.Data>;

  pagination: SimulationRunPlanJobListResponse.Pagination;
}

export namespace SimulationRunPlanJobListResponse {
  export interface Data {
    /**
     * When the job was created
     */
    createdAt: string;

    /**
     * ID of the simulation run plan
     */
    simulationRunPlanId: string;

    /**
     * ID of the simulation run plan job
     */
    simulationRunPlanJobId: string;

    /**
     * Job status
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

    /**
     * How the job was triggered (SCHEDULED, USER_TRIGGERED_FROM_UI,
     * TRIGGERED_FROM_API, RE_RUN, or SYSTEM). SYSTEM is used when the job was started
     * by an internal admin acting on behalf of the project (the original user identity
     * is not exposed).
     */
    triggeredBy: 'SCHEDULED' | 'USER_TRIGGERED_FROM_UI' | 'RE_RUN' | 'TRIGGERED_FROM_API' | 'SYSTEM';

    /**
     * When the job ended
     */
    endedAt?: string | null;

    /**
     * When the job started
     */
    startedAt?: string | null;
  }

  export interface Pagination {
    /**
     * Whether there are more results available
     */
    hasMore: boolean;

    /**
     * Total number of matching plan jobs
     */
    total: number;

    /**
     * Cursor to use for fetching the next page
     */
    nextCursor?: string | null;
  }
}

export interface SimulationRunPlanJobCancelResponse {
  /**
   * Result of cancelling a simulation plan job
   */
  data: SimulationRunPlanJobCancelResponse.Data;
}

export namespace SimulationRunPlanJobCancelResponse {
  /**
   * Result of cancelling a simulation plan job
   */
  export interface Data {
    /**
     * True when this request stopped the run. False when it had already finished,
     * which is not an error.
     */
    cancelled: boolean;

    simulationRunPlanJobId: string;

    /**
     * The job status after the request. Unchanged when the run had already finished.
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

export interface SimulationRunPlanJobGetByIDResponse {
  /**
   * Simulation run plan job with all associated simulation jobs
   */
  data: SimulationRunPlanJobGetByIDResponse.Data;
}

export namespace SimulationRunPlanJobGetByIDResponse {
  /**
   * Simulation run plan job with all associated simulation jobs
   */
  export interface Data {
    /**
     * When the job was created
     */
    createdAt: string;

    /**
     * List of simulation jobs (calls) in this run plan job
     */
    simulationJobs: Array<Data.SimulationJob>;

    /**
     * ID of the simulation run plan
     */
    simulationRunPlanId: string;

    /**
     * ID of the simulation run plan job
     */
    simulationRunPlanJobId: string;

    /**
     * Job status
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

    /**
     * When the job ended
     */
    endedAt?: string | null;

    /**
     * When the job started
     */
    startedAt?: string | null;

    /**
     * For a run that swept a property (accent, background noise, speech pace and so
     * on): which check failures the property caused.
     *
     * Each value is compared with every other value combined using a one-sided Fisher
     * exact test, and every comparison in the run is corrected together with
     * Benjamini-Hochberg. A value is only called worse when the difference is
     * statistically significant, so a value that happened to fail a few more
     * simulations by chance is not reported as a problem. Invalidated simulations and
     * simulations that failed on the Roark platform are left out.
     */
    sweepAttribution?: Data.SweepAttribution | null;

    /**
     * Pass/fail verdict for the run, judged against the success criteria pinned on the
     * run plan when the run started.
     */
    verdict?: Data.Verdict | null;
  }

  export namespace Data {
    export interface SimulationJob {
      /**
       * Agent endpoint used in a simulation
       */
      agentEndpoint: SimulationJob.AgentEndpoint;

      /**
       * When the simulation job was created
       */
      createdAt: string;

      /**
       * Present when the run was invalidated: the call ended before a step its flow
       * requires for a valid run, or a strict flow went off script at a step whose
       * policy invalidates the run. It keeps its transcript and recording, but nothing
       * scored it and it is excluded from every run total.
       */
      invalidation: SimulationJob.Invalidation | null;

      persona: SimulationJob.Persona;

      /**
       * Processing status. PENDING until the job starts connecting.
       */
      processingStatus:
        | 'PENDING'
        | 'RESERVING_CAPACITY'
        | 'CONNECTING'
        | 'WAITING_FOR_OUTBOUND_CALL'
        | 'SIMULATING'
        | 'ENDING'
        | 'ANALYZING'
        | 'WAITING_FOR_LIVE_CONVERSATION'
        | 'EVALUATING'
        | 'COLLECTING_METRICS'
        | 'COMPLETED';

      /**
       * Scenario used in a simulation
       */
      scenario: SimulationJob.Scenario;

      /**
       * Simulation job ID
       */
      simulationJobId: string;

      /**
       * Job status
       */
      status:
        | 'PENDING'
        | 'QUEUED'
        | 'PROCESSING'
        | 'COMPLETED'
        | 'FAILED'
        | 'TIMED_OUT'
        | 'CANCELLED'
        | 'CANCELLING';

      /**
       * ID of the call created for this simulation job. Null if the call has not been
       * created yet.
       */
      callId?: string | null;

      /**
       * When the simulation job completed
       */
      completedAt?: string | null;

      /**
       * Phone number provisioned by Roark for this simulation job in E.164 format. Null
       * if the simulation job is queued and has not been assigned a phone number yet.
       */
      roarkPhoneNumber?: string | null;

      /**
       * When the simulation job started
       */
      startedAt?: string | null;
    }

    export namespace SimulationJob {
      /**
       * Agent endpoint used in a simulation
       */
      export interface AgentEndpoint {
        /**
         * Agent endpoint ID
         */
        id: string;

        /**
         * Agent endpoint name
         */
        name: string;

        /**
         * Agent endpoint phone number
         */
        phoneNumber: string | null;

        /**
         * Agent endpoint type
         */
        type:
          | 'PHONE'
          | 'WEBSOCKET'
          | 'LIVEKIT'
          | 'SMALL_WEBRTC'
          | 'ELEVENLABS_WS'
          | 'KORE'
          | 'GOOGLE_CES'
          | 'DAILY';
      }

      /**
       * Present when the run was invalidated: the call ended before a step its flow
       * requires for a valid run, or a strict flow went off script at a step whose
       * policy invalidates the run. It keeps its transcript and recording, but nothing
       * scored it and it is excluded from every run total.
       */
      export interface Invalidation {
        /**
         * When the run was invalidated.
         */
        invalidatedAt: string;

        /**
         * Why the result does not count. `SCRIPT_DIVERGED`: a strict flow went off script
         * at a step whose off-script policy is HANG_UP_INVALIDATE.
         * `REQUIRED_STAGE_INCOMPLETE`: the call ended before it got through a stage its
         * flow requires. `CALLER_NEVER_TOOK_OVER`: the call opened on the persona of a
         * preceding flow, which never handed the phone to the persona under test, so none
         * of that persona's properties were exercised.
         */
        reason:
          | 'SCRIPT_DIVERGED'
          | 'REQUIRED_STEP_NOT_REACHED'
          | 'REQUIRED_STAGE_INCOMPLETE'
          | 'CALLER_NEVER_TOOK_OVER';

        /**
         * One sentence: where the script was left and what your agent did instead.
         */
        detail?: string | null;
      }

      export interface Persona {
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
         * How old the caller sounds and behaves. Only ages the persona's accent has a
         * voice for are accepted; defaults to ADULT, which every accent supports.
         */
        age: 'CHILD' | 'TEENAGER' | 'ADULT' | 'ELDERLY';

        /**
         * Background noise setting
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
          | 'TRAIN';

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
          | 'DISTRACTED'
          | 'ANGRY'
          | 'ANXIOUS'
          | 'SAD';

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
         * How much the persona talks over the agent while it is still speaking. OFF waits
         * its turn. BACKCHANNEL makes listening noises ("mm-hm") over the agent without
         * taking the floor, which tests whether the agent wrongly stops for them.
         * OCCASIONAL adds cutting in on some long agent turns, HEAVY on most of them.
         * Timing is randomised per turn, so two runs of the same persona do not interrupt
         * at identical moments.
         */
        interruption: 'OFF' | 'BACKCHANNEL' | 'OCCASIONAL' | 'HEAVY';

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
         * Deprecated and inert: it no longer affects the call. It set how long the persona
         * waited once the agent stopped talking, and measured across production
         * simulations it moved the reply gap by less than the noise floor, because model
         * and speech latency dominate it. Every persona now uses one voice-activity
         * profile. Use `interruption` for a caller who talks over the agent. Still
         * accepted and stored so existing clients keep working. BARGE_IN is stored as
         * `responseTiming: QUICK` with `interruption: OCCASIONAL`.
         */
        responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK' | 'BARGE_IN';

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
         * Label shown in place of the name across the dashboard (e.g. a short descriptor
         * like "Irate Escalator"). The persona still identifies as `name` on calls. Omit
         * or set null to display the name itself.
         */
        displayName?: string | null;

        /**
         * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
         */
        secondaryLanguage?: 'EN' | null;
      }

      /**
       * Scenario used in a simulation
       */
      export interface Scenario {
        /**
         * Scenario ID
         */
        id: string;

        /**
         * Scenario description
         */
        description?: string | null;
      }
    }

    /**
     * For a run that swept a property (accent, background noise, speech pace and so
     * on): which check failures the property caused.
     *
     * Each value is compared with every other value combined using a one-sided Fisher
     * exact test, and every comparison in the run is corrected together with
     * Benjamini-Hochberg. A value is only called worse when the difference is
     * statistically significant, so a value that happened to fail a few more
     * simulations by chance is not reported as a problem. Invalidated simulations and
     * simulations that failed on the Roark platform are left out.
     */
    export interface SweepAttribution {
      /**
       * Plain sentences on what this run could not see, ready to show to a reader.
       */
      caveats: Array<string>;

      /**
       * Every check the run was graded on: `PROPERTY_ATTRIBUTABLE` first, then
       * `FOUND_UNATTRIBUTED`, then `WITHIN_NOISE`.
       */
      checks: Array<SweepAttribution.Check>;

      /**
       * The Benjamini-Hochberg false discovery rate the comparisons are held to.
       */
      falseDiscoveryRate: number;

      /**
       * The overall failure rate, 0-100, at which a check with no standout value is
       * reported as `FOUND_UNATTRIBUTED`.
       */
      foundUnattributedFailureRate: number;

      /**
       * Counted simulations a value needs before it is compared.
       */
      minArmCalls: number;

      /**
       * Roughly how many percentage points more often a value would need to fail than
       * the rest of the run to be flagged at this sample size. Optimistic: it uses
       * simulation counts rather than the verdicts on each check and ignores the
       * correction, so checks graded on fewer simulations need larger gaps. Large when
       * few simulations ran per value: finding no significant difference then means the
       * run could not see one, not that none exists.
       */
      minimumDetectableGap: number | null;

      /**
       * How many values had enough counted simulations to be compared.
       */
      testableValueCount: number;

      /**
       * How many value and check pairs were actually tested. A value can have enough
       * simulations and still go untested (no other value graded that check, or too few
       * verdicts on it). When this is 0 no comparison ran, so an empty `worseValues`
       * everywhere means nothing was tested, not that no value did worse.
       */
      testedComparisonCount: number;

      /**
       * Every value of the swept property, baseline first.
       */
      values: Array<SweepAttribution.Value>;
    }

    export namespace SweepAttribution {
      /**
       * How one check's failures relate to the swept property.
       */
      export interface Check {
        /**
         * How this check relates to the swept property:
         *
         * - `PROPERTY_ATTRIBUTABLE`: at least one value failed it significantly more often
         *   than every other value combined. `worseValues` names them. This is the only
         *   case in which a value is called worse.
         * - `FOUND_UNATTRIBUTED`: no value stands out, but the check failed on at least
         *   `foundUnattributedFailureRate`% of counted simulations overall. A real issue
         *   with the agent on which no value stood out, so the run cannot tie it to the
         *   property. It does not show the property had no effect: a small run may be
         *   unable to see one.
         * - `WITHIN_NOISE`: neither. Any differences between values are within what chance
         *   produces.
         */
        attribution: 'PROPERTY_ATTRIBUTABLE' | 'FOUND_UNATTRIBUTED' | 'WITHIN_NOISE';

        evaluated: number;

        failed: number;

        /**
         * Share of counted simulations across every value that failed the check, 0-100.
         */
        failureRate: number | null;

        metricDefinitionId: string;

        metricName: string;

        /**
         * The values significantly worse than the rest, most significant first. Empty
         * unless `attribution` is `PROPERTY_ATTRIBUTABLE`.
         */
        worseValues: Array<Check.WorseValue>;
      }

      export namespace Check {
        /**
         * A value that failed a check significantly more often than the rest of the run.
         */
        export interface WorseValue {
          /**
           * How likely a difference at least this large would be by chance alone, after
           * correcting for every comparison in the run (Benjamini-Hochberg). The value is
           * called worse only when this is at most `falseDiscoveryRate`.
           */
          adjustedPValue: number;

          evaluated: number;

          failed: number;

          /**
           * Share of the counted simulations at this value that failed the check, 0-100.
           */
          failureRate: number | null;

          label: string;

          /**
           * The same share across every other value combined, 0-100. This is what the value
           * is compared with.
           */
          restFailureRate: number | null;

          value: string;
        }
      }

      /**
       * One value of the swept property.
       */
      export interface Value {
        /**
         * Simulations run at this value. Simulations that failed on the Roark platform are
         * left out, since they say nothing about your agent.
         */
        attempted: number;

        /**
         * Simulations that actually tested the property: not invalidated, and graded by at
         * least one check. Only these are used in the comparison.
         */
        counted: number;

        /**
         * Whether this is the baseline the plan named.
         */
        isBaseline: boolean;

        /**
         * The value in words, e.g. `American`.
         */
        label: string;

        /**
         * The mean of each check's pass rate at this value, 0-100, the same rule as the
         * run's `score`. Descriptive only: a lower score alone never makes a value worse.
         * Null when nothing counted.
         */
        score: number | null;

        /**
         * Whether this value had at least `minArmCalls` counted simulations. A value below
         * that is "insufficient data": it is reported with its numbers but never compared
         * or ranked, because a rate from one or two calls cannot be told apart from luck.
         */
        testable: boolean;

        /**
         * The stored value of the swept property, e.g. `US`.
         */
        value: string;
      }
    }

    /**
     * Pass/fail verdict for the run, judged against the success criteria pinned on the
     * run plan when the run started.
     */
    export interface Verdict {
      /**
       * Every check the run was judged on, with its rate and the minimum it had to
       * reach.
       *
       * Thresholds and authored yes/no metrics only. See `SimulationRunPlanJobCheck` for
       * why a provider reading is not one.
       */
      checks: Array<Verdict.Check>;

      /**
       * Every criterion the run missed. Empty when it passed.
       */
      failures: Array<
        Verdict.UnionMember0 | Verdict.UnionMember1 | Verdict.UnionMember2 | Verdict.UnionMember3
      >;

      /**
       * Whether every check cleared its own `minPassRate` (and the run completed with
       * full coverage). Use this as the CI exit status.
       *
       * Never derived from `score`: a run can score 95 and still fail, or score 40 and
       * still pass.
       */
      passed: boolean;

      /**
       * The run's headline quality number, 0-100: the mean of each check's own pass
       * rate.
       *
       * Every check weighs the same, however many simulations it evaluated, which is the
       * same way `passed` treats them. It is the number the Roark dashboard shows for
       * this run.
       *
       * REPORTING ONLY, for dashboards and trend lines. Nothing is judged against it.
       * Null when nothing was evaluated.
       */
      score: number | null;
    }

    export namespace Verdict {
      /**
       * How one check did. Present for every check the run was judged on, passing or
       * not.
       *
       * A check is a metric that yields a pass/fail: a threshold
       * (`Silence Duration <= 2s`) or a yes/no metric you authored. Provider readings
       * such as `Comprehension Failure` are observations, not checks: their `true` is
       * whatever the underlying field happens to mean, so they carry no passing side and
       * never appear here. Put a threshold on one to judge it.
       */
      export interface Check {
        evaluatedSims: number;

        /**
         * Whether `minPassRate` is the 80% default (`true`) or a minimum this metric set
         * for itself.
         */
        inherited: boolean;

        metricDefinitionId: string;

        /**
         * THE BAR it was judged against: the share of the run's simulations it had to
         * pass.
         */
        minPassRate: number;

        /**
         * This check's own pass rate, 0-100: the share of sims it evaluated that passed
         * it. Null when it evaluated nothing.
         */
        passRate: number | null;

        /**
         * `passRate >= minPassRate`.
         */
        passed: boolean;

        passedSims: number;

        metricName?: string | null;
      }

      export interface UnionMember0 {
        /**
         * The status the run actually ended in.
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

        type: 'RUN_NOT_COMPLETED';
      }

      export interface UnionMember1 {
        evaluatedCalls: number;

        expectedCalls: number;

        type: 'INCOMPLETE_COVERAGE';
      }

      export interface UnionMember2 {
        metricDefinitionId: string;

        type: 'METRIC_NOT_EVALUATED';

        /**
         * The check’s name, for rendering the failure.
         */
        metricName?: string | null;
      }

      export interface UnionMember3 {
        /**
         * Whether the missed minimum was the 80% default (`true`) or this metric's own.
         */
        inherited: boolean;

        metricDefinitionId: string;

        minPassRate: number;

        passRate: number;

        type: 'METRIC_BELOW_MIN_PASS_RATE';

        /**
         * The check’s name, for rendering the failure.
         */
        metricName?: string | null;
      }
    }
  }
}

export interface SimulationRunPlanJobStartResponse {
  /**
   * Response when triggering a simulation run plan
   */
  data: SimulationRunPlanJobStartResponse.Data;
}

export namespace SimulationRunPlanJobStartResponse {
  /**
   * Response when triggering a simulation run plan
   */
  export interface Data {
    /**
     * When the job was created
     */
    createdAt: string;

    /**
     * ID of the simulation run plan that was executed
     */
    simulationRunPlanId: string;

    /**
     * ID of the simulation run plan job that was created
     */
    simulationRunPlanJobId: string;

    /**
     * Initial status of the job
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

export interface SimulationRunPlanJobListParams {
  /**
   * Cursor for pagination - use the nextCursor value from a previous response
   */
  after?: string;

  /**
   * Filter by label ID attached to the plan job. Use this if you know the label ID.
   */
  labelId?: string;

  /**
   * Filter by label name attached to the plan job. More user-friendly alternative to
   * labelId. Case-insensitive.
   */
  labelName?: string;

  /**
   * Maximum number of plan jobs to return (default: 20, max: 50)
   */
  limit?: number;

  /**
   * Filter by simulation run plan ID
   */
  simulationRunPlanId?: string;

  /**
   * Filter by plan job status (PENDING, QUEUED, CREATING_SNAPSHOTS,
   * CREATING_SIMULATIONS, PREPARING_CAPACITY, RUNNING_SIMULATIONS, COMPLETED,
   * FAILED, TIMED_OUT, CANCELLED, CANCELLING, ENDING_SIMULATIONS)
   */
  status?:
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

export interface SimulationRunPlanJobStartParams {
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
    | Array<SimulationRunPlanJobStartParams.UnionMember1>
    | Array<SimulationRunPlanJobStartParams.UnionMember2>;
}

export namespace SimulationRunPlanJobStartParams {
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

export declare namespace SimulationRunPlanJob {
  export {
    type SimulationRunPlanJobListResponse as SimulationRunPlanJobListResponse,
    type SimulationRunPlanJobCancelResponse as SimulationRunPlanJobCancelResponse,
    type SimulationRunPlanJobGetByIDResponse as SimulationRunPlanJobGetByIDResponse,
    type SimulationRunPlanJobStartResponse as SimulationRunPlanJobStartResponse,
    type SimulationRunPlanJobListParams as SimulationRunPlanJobListParams,
    type SimulationRunPlanJobStartParams as SimulationRunPlanJobStartParams,
  };
}
