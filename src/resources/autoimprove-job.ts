// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AutoimproveJobAPI from './autoimprove-job';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AutoimproveJob extends APIResource {
  /**
   * Commission Roark on an objective. It clones the agent into a staging shadow (or
   * uses your designated staging agent), authors a validation suite of simulated
   * callers, measures a baseline, changes the staging configuration, and re-tests
   * until the objective metric passes its target. Production is never touched by the
   * loop; verified changes wait for promotion.
   *
   * Requires an active provider integration (Vapi, Retell, or ElevenLabs) with agent
   * config writes enabled. One live job per agent: starting a second returns a
   * conflict.
   *
   * The job runs asynchronously; poll GET /v1/autoimprove/job/{jobId} or watch it in
   * the dashboard. When its status is NEEDS_INPUT, answer via the answer endpoint;
   * when AWAITING_PROMOTE, promote or dismiss.
   *
   * @example
   * ```ts
   * const autoimproveJob = await client.autoimproveJob.create({
   *   agentId: 'b3b0c8e2-4c1d-4f6a-9e2b-1a2b3c4d5e6f',
   *   objectiveLabel: 'Consent collection should pass',
   *   objectiveMetricDefinitionId:
   *     'f2f0c8e2-4c1d-4f6a-9e2b-1a2b3c4d5e6f',
   * });
   * ```
   */
  create(
    body: AutoimproveJobCreateParams,
    options?: RequestOptions,
  ): APIPromise<AutoimproveJobCreateResponse> {
    return this._client.post('/v1/autoimprove/job', { body, ...options });
  }

  /**
   * List the Autoimprove jobs in this project, most recent first, capped at 100.
   *
   * A job is one autonomous engagement: Roark improving one agent toward one
   * objective metric on a staging copy, with a human-gated promote to production at
   * the end.
   *
   * @example
   * ```ts
   * const autoimproveJobs = await client.autoimproveJob.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<AutoimproveJobListResponse> {
    return this._client.get('/v1/autoimprove/job', options);
  }

  /**
   * Answer the question a job is blocked on. Only meaningful while the job status is
   * NEEDS_INPUT (the open QUESTION entry carries the offered options; free text is
   * also accepted). Otherwise returns a conflict.
   *
   * @example
   * ```ts
   * const response = await client.autoimproveJob.answerQuestion(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     text: 'Keep the current voice; focus on the closing confirmation.',
   *   },
   * );
   * ```
   */
  answerQuestion(
    jobID: string,
    body: AutoimproveJobAnswerQuestionParams,
    options?: RequestOptions,
  ): APIPromise<AutoimproveJobAnswerQuestionResponse> {
    return this._client.post(path`/v1/autoimprove/job/${jobID}/answer`, { body, ...options });
  }

  /**
   * Stop a live job. Production is never changed by a cancel; everything the job set
   * up (the shadow agent, its phone number, authored test flows and run plan) is
   * cleaned up automatically.
   *
   * @example
   * ```ts
   * const response = await client.autoimproveJob.cancel(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  cancel(jobID: string, options?: RequestOptions): APIPromise<AutoimproveJobCancelResponse> {
    return this._client.post(path`/v1/autoimprove/job/${jobID}/cancel`, options);
  }

  /**
   * Discard a verified job without promoting: production stays untouched and the
   * staging resources are cleaned up. Only a job in AWAITING_PROMOTE can be
   * dismissed.
   *
   * @example
   * ```ts
   * const response = await client.autoimproveJob.dismiss(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  dismiss(jobID: string, options?: RequestOptions): APIPromise<AutoimproveJobDismissResponse> {
    return this._client.post(path`/v1/autoimprove/job/${jobID}/dismiss`, options);
  }

  /**
   * Fetch one job with its full worklog: every step Roark took, the validation
   * batches with their pass-rate movement, any question it is waiting on, and its
   * final report once concluded.
   *
   * @example
   * ```ts
   * const response = await client.autoimproveJob.getByID(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  getByID(jobID: string, options?: RequestOptions): APIPromise<AutoimproveJobGetByIDResponse> {
    return this._client.get(path`/v1/autoimprove/job/${jobID}`, options);
  }

  /**
   * Apply the verified staging changes to the PRODUCTION agent. Only a job in
   * AWAITING_PROMOTE can be promoted.
   *
   * A snapshot of the production configuration is taken immediately before the
   * write, so the promote is fully rollbackable. After the promote the staging
   * shadow and its phone number are cleaned up.
   *
   * @example
   * ```ts
   * const response = await client.autoimproveJob.promote(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  promote(jobID: string, options?: RequestOptions): APIPromise<AutoimproveJobPromoteResponse> {
    return this._client.post(path`/v1/autoimprove/job/${jobID}/promote`, options);
  }

  /**
   * Steer Roark mid-job. The message is folded into its next decision and is
   * binding. Accepted while the job is live (RUNNING, NEEDS_INPUT, or PAUSED); a
   * concluded job returns a conflict.
   *
   * @example
   * ```ts
   * const response = await client.autoimproveJob.sendGuidance(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     text: 'Keep the current voice; focus on the closing confirmation.',
   *   },
   * );
   * ```
   */
  sendGuidance(
    jobID: string,
    body: AutoimproveJobSendGuidanceParams,
    options?: RequestOptions,
  ): APIPromise<AutoimproveJobSendGuidanceResponse> {
    return this._client.post(path`/v1/autoimprove/job/${jobID}/guidance`, { body, ...options });
  }
}

/**
 * One entry in the job's worklog: what Roark did or observed at that step.
 * VALIDATION entries carry the batch's trial count and pass-rate movement;
 * QUESTION entries carry the quick-reply options Roark is waiting on.
 */
export interface AutoimproveLogEntry {
  id: string;

  configPushId: string | null;

  /**
   * When the entry was written (ISO 8601).
   */
  createdAt: string;

  kind:
    | 'STARTED'
    | 'REASONING'
    | 'CHANGE'
    | 'VALIDATION'
    | 'VERDICT'
    | 'SLEEP'
    | 'QUESTION'
    | 'GUIDANCE'
    | 'STATUS'
    | 'SETUP'
    | 'SUITE';

  orderIndex: number;

  passRateAfter: number | null;

  passRateBefore: number | null;

  questionOptions: Array<string> | null;

  simulationRunPlanJobId: string | null;

  text: string;

  trialCount: number | null;
}

export interface AutoimproveJobCreateResponse {
  /**
   * One Autoimprove job: Roark autonomously improving one agent toward one objective
   * metric. Roark only ever changes the staging agent (a shadow clone by default);
   * production changes exactly once, when verified changes are promoted.
   */
  data: AutoimproveJobCreateResponse.Data;
}

export namespace AutoimproveJobCreateResponse {
  /**
   * One Autoimprove job: Roark autonomously improving one agent toward one objective
   * metric. Roark only ever changes the staging agent (a shadow clone by default);
   * production changes exactly once, when verified changes are promoted.
   */
  export interface Data {
    id: string;

    agentId: string;

    baselineValue: number | null;

    /**
     * When the job reached a terminal status (ISO 8601).
     */
    concludedAt: string | null;

    /**
     * When the job was created (ISO 8601).
     */
    createdAt: string;

    currentValue: number | null;

    customerIntegrationId: string | null;

    finalReport: string | null;

    initiatedByUserId: string | null;

    issueId: string | null;

    iterationCount: number;

    maxIterations: number;

    maxSimCalls: number;

    objectiveId: string | null;

    objectiveLabel: string;

    objectiveMetricDefinitionId: string;

    organizationId: string;

    projectId: string;

    simCallsUsed: number;

    stagingAgentId: string;

    stagingKind: 'DESIGNATED' | 'SHADOW' | 'CHANNEL';

    status:
      | 'RUNNING'
      | 'NEEDS_INPUT'
      | 'PAUSED'
      | 'AWAITING_PROMOTE'
      | 'PROMOTED'
      | 'NO_FIX'
      | 'CANCELLED'
      | 'FAILED';

    targetValue: number;

    trigger: 'ISSUE' | 'RUN_THRESHOLD_FAILED' | 'USER' | 'DEGRADATION';

    /**
     * When the job last changed (ISO 8601).
     */
    updatedAt: string;

    validationRunPlanId: string | null;

    workingMemory: string | null;
  }
}

export interface AutoimproveJobListResponse {
  data: Array<AutoimproveJobListResponse.Data>;
}

export namespace AutoimproveJobListResponse {
  /**
   * One Autoimprove job: Roark autonomously improving one agent toward one objective
   * metric. Roark only ever changes the staging agent (a shadow clone by default);
   * production changes exactly once, when verified changes are promoted.
   */
  export interface Data {
    id: string;

    agentId: string;

    baselineValue: number | null;

    /**
     * When the job reached a terminal status (ISO 8601).
     */
    concludedAt: string | null;

    /**
     * When the job was created (ISO 8601).
     */
    createdAt: string;

    currentValue: number | null;

    customerIntegrationId: string | null;

    finalReport: string | null;

    initiatedByUserId: string | null;

    issueId: string | null;

    iterationCount: number;

    maxIterations: number;

    maxSimCalls: number;

    objectiveId: string | null;

    objectiveLabel: string;

    objectiveMetricDefinitionId: string;

    organizationId: string;

    projectId: string;

    simCallsUsed: number;

    stagingAgentId: string;

    stagingKind: 'DESIGNATED' | 'SHADOW' | 'CHANNEL';

    status:
      | 'RUNNING'
      | 'NEEDS_INPUT'
      | 'PAUSED'
      | 'AWAITING_PROMOTE'
      | 'PROMOTED'
      | 'NO_FIX'
      | 'CANCELLED'
      | 'FAILED';

    targetValue: number;

    trigger: 'ISSUE' | 'RUN_THRESHOLD_FAILED' | 'USER' | 'DEGRADATION';

    /**
     * When the job last changed (ISO 8601).
     */
    updatedAt: string;

    validationRunPlanId: string | null;

    workingMemory: string | null;
  }
}

export interface AutoimproveJobAnswerQuestionResponse {
  data: AutoimproveJobAnswerQuestionResponse.Data;
}

export namespace AutoimproveJobAnswerQuestionResponse {
  export interface Data {
    accepted: true;
  }
}

export interface AutoimproveJobCancelResponse {
  data: AutoimproveJobCancelResponse.Data;
}

export namespace AutoimproveJobCancelResponse {
  export interface Data {
    accepted: true;
  }
}

export interface AutoimproveJobDismissResponse {
  /**
   * One Autoimprove job: Roark autonomously improving one agent toward one objective
   * metric. Roark only ever changes the staging agent (a shadow clone by default);
   * production changes exactly once, when verified changes are promoted.
   */
  data: AutoimproveJobDismissResponse.Data;
}

export namespace AutoimproveJobDismissResponse {
  /**
   * One Autoimprove job: Roark autonomously improving one agent toward one objective
   * metric. Roark only ever changes the staging agent (a shadow clone by default);
   * production changes exactly once, when verified changes are promoted.
   */
  export interface Data {
    id: string;

    agentId: string;

    baselineValue: number | null;

    /**
     * When the job reached a terminal status (ISO 8601).
     */
    concludedAt: string | null;

    /**
     * When the job was created (ISO 8601).
     */
    createdAt: string;

    currentValue: number | null;

    customerIntegrationId: string | null;

    finalReport: string | null;

    initiatedByUserId: string | null;

    issueId: string | null;

    iterationCount: number;

    maxIterations: number;

    maxSimCalls: number;

    objectiveId: string | null;

    objectiveLabel: string;

    objectiveMetricDefinitionId: string;

    organizationId: string;

    projectId: string;

    simCallsUsed: number;

    stagingAgentId: string;

    stagingKind: 'DESIGNATED' | 'SHADOW' | 'CHANNEL';

    status:
      | 'RUNNING'
      | 'NEEDS_INPUT'
      | 'PAUSED'
      | 'AWAITING_PROMOTE'
      | 'PROMOTED'
      | 'NO_FIX'
      | 'CANCELLED'
      | 'FAILED';

    targetValue: number;

    trigger: 'ISSUE' | 'RUN_THRESHOLD_FAILED' | 'USER' | 'DEGRADATION';

    /**
     * When the job last changed (ISO 8601).
     */
    updatedAt: string;

    validationRunPlanId: string | null;

    workingMemory: string | null;
  }
}

export interface AutoimproveJobGetByIDResponse {
  data: AutoimproveJobGetByIDResponse.Data;
}

export namespace AutoimproveJobGetByIDResponse {
  /**
   * One Autoimprove job: Roark autonomously improving one agent toward one objective
   * metric. Roark only ever changes the staging agent (a shadow clone by default);
   * production changes exactly once, when verified changes are promoted.
   */
  export interface Data {
    id: string;

    agentId: string;

    baselineValue: number | null;

    /**
     * When the job reached a terminal status (ISO 8601).
     */
    concludedAt: string | null;

    /**
     * When the job was created (ISO 8601).
     */
    createdAt: string;

    currentValue: number | null;

    customerIntegrationId: string | null;

    finalReport: string | null;

    initiatedByUserId: string | null;

    issueId: string | null;

    iterationCount: number;

    /**
     * The full worklog, oldest first.
     */
    logEntries: Array<AutoimproveJobAPI.AutoimproveLogEntry>;

    maxIterations: number;

    maxSimCalls: number;

    objectiveId: string | null;

    objectiveLabel: string;

    objectiveMetricDefinitionId: string;

    organizationId: string;

    projectId: string;

    simCallsUsed: number;

    stagingAgentId: string;

    stagingKind: 'DESIGNATED' | 'SHADOW' | 'CHANNEL';

    status:
      | 'RUNNING'
      | 'NEEDS_INPUT'
      | 'PAUSED'
      | 'AWAITING_PROMOTE'
      | 'PROMOTED'
      | 'NO_FIX'
      | 'CANCELLED'
      | 'FAILED';

    targetValue: number;

    trigger: 'ISSUE' | 'RUN_THRESHOLD_FAILED' | 'USER' | 'DEGRADATION';

    /**
     * When the job last changed (ISO 8601).
     */
    updatedAt: string;

    validationRunPlanId: string | null;

    workingMemory: string | null;
  }
}

export interface AutoimproveJobPromoteResponse {
  /**
   * One Autoimprove job: Roark autonomously improving one agent toward one objective
   * metric. Roark only ever changes the staging agent (a shadow clone by default);
   * production changes exactly once, when verified changes are promoted.
   */
  data: AutoimproveJobPromoteResponse.Data;
}

export namespace AutoimproveJobPromoteResponse {
  /**
   * One Autoimprove job: Roark autonomously improving one agent toward one objective
   * metric. Roark only ever changes the staging agent (a shadow clone by default);
   * production changes exactly once, when verified changes are promoted.
   */
  export interface Data {
    id: string;

    agentId: string;

    baselineValue: number | null;

    /**
     * When the job reached a terminal status (ISO 8601).
     */
    concludedAt: string | null;

    /**
     * When the job was created (ISO 8601).
     */
    createdAt: string;

    currentValue: number | null;

    customerIntegrationId: string | null;

    finalReport: string | null;

    initiatedByUserId: string | null;

    issueId: string | null;

    iterationCount: number;

    maxIterations: number;

    maxSimCalls: number;

    objectiveId: string | null;

    objectiveLabel: string;

    objectiveMetricDefinitionId: string;

    organizationId: string;

    projectId: string;

    simCallsUsed: number;

    stagingAgentId: string;

    stagingKind: 'DESIGNATED' | 'SHADOW' | 'CHANNEL';

    status:
      | 'RUNNING'
      | 'NEEDS_INPUT'
      | 'PAUSED'
      | 'AWAITING_PROMOTE'
      | 'PROMOTED'
      | 'NO_FIX'
      | 'CANCELLED'
      | 'FAILED';

    targetValue: number;

    trigger: 'ISSUE' | 'RUN_THRESHOLD_FAILED' | 'USER' | 'DEGRADATION';

    /**
     * When the job last changed (ISO 8601).
     */
    updatedAt: string;

    validationRunPlanId: string | null;

    workingMemory: string | null;
  }
}

export interface AutoimproveJobSendGuidanceResponse {
  data: AutoimproveJobSendGuidanceResponse.Data;
}

export namespace AutoimproveJobSendGuidanceResponse {
  export interface Data {
    accepted: true;
  }
}

export interface AutoimproveJobCreateParams {
  /**
   * The production agent to improve. It is never modified until you promote.
   */
  agentId: string;

  /**
   * Human-readable label for the objective, shown everywhere the job appears.
   */
  objectiveLabel: string;

  /**
   * The metric that defines success: a pass/fail metric, or a threshold variant of a
   * scale metric (for example "PII Handling >= 4"). Roark measures the pass rate of
   * this metric across simulated calls.
   */
  objectiveMetricDefinitionId: string;

  /**
   * The provider integration whose credentials Roark uses. Omit to use the project's
   * active integration for the agent's provider. The integration must have agent
   * config writes enabled.
   */
  customerIntegrationId?: string;

  /**
   * Cap on decision turns. Defaults to 50.
   */
  maxIterations?: number;

  /**
   * Cap on simulated calls dialed. Defaults to 200.
   */
  maxSimCalls?: number;

  /**
   * An existing agent to stage changes on instead of the default shadow clone. Must
   * be a different agent from agentId, on the same provider.
   */
  stagingAgentId?: string;

  /**
   * The pass-rate percentage that counts as fixed. Defaults to 90.
   */
  targetValue?: number;

  /**
   * An existing simulation run plan to validate with. Omit to let Roark author its
   * own suite.
   */
  validationRunPlanId?: string;
}

export interface AutoimproveJobAnswerQuestionParams {
  /**
   * The message for Roark.
   */
  text: string;
}

export interface AutoimproveJobSendGuidanceParams {
  /**
   * The message for Roark.
   */
  text: string;
}

export declare namespace AutoimproveJob {
  export {
    type AutoimproveLogEntry as AutoimproveLogEntry,
    type AutoimproveJobCreateResponse as AutoimproveJobCreateResponse,
    type AutoimproveJobListResponse as AutoimproveJobListResponse,
    type AutoimproveJobAnswerQuestionResponse as AutoimproveJobAnswerQuestionResponse,
    type AutoimproveJobCancelResponse as AutoimproveJobCancelResponse,
    type AutoimproveJobDismissResponse as AutoimproveJobDismissResponse,
    type AutoimproveJobGetByIDResponse as AutoimproveJobGetByIDResponse,
    type AutoimproveJobPromoteResponse as AutoimproveJobPromoteResponse,
    type AutoimproveJobSendGuidanceResponse as AutoimproveJobSendGuidanceResponse,
    type AutoimproveJobCreateParams as AutoimproveJobCreateParams,
    type AutoimproveJobAnswerQuestionParams as AutoimproveJobAnswerQuestionParams,
    type AutoimproveJobSendGuidanceParams as AutoimproveJobSendGuidanceParams,
  };
}
