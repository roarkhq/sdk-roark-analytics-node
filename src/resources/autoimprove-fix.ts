// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AutoimproveFixAPI from './autoimprove-fix';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AutoimproveFix extends APIResource {
  /**
   * Commission Roark on an objective. It clones the agent into a staging shadow (or
   * uses your designated staging agent), authors a validation suite of simulated
   * callers, measures a baseline, changes the staging configuration, and re-tests
   * until the objective metric passes its target. Production is never touched by the
   * loop; a verified fix waits for promotion.
   *
   * Requires an active provider integration (Vapi or Retell) with agent config
   * writes enabled. One live fix per agent: starting a second returns a conflict.
   *
   * The fix runs asynchronously; poll GET /v1/autoimprove/fix/{fixId} or watch it in
   * the dashboard. When its status is NEEDS_INPUT, answer via the answer endpoint;
   * when AWAITING_PROMOTE, promote or dismiss.
   *
   * @example
   * ```ts
   * const autoimproveFix = await client.autoimproveFix.create({
   *   agentId: 'b3b0c8e2-4c1d-4f6a-9e2b-1a2b3c4d5e6f',
   *   objectiveLabel: 'Consent collection should pass',
   *   objectiveMetricDefinitionId:
   *     'f2f0c8e2-4c1d-4f6a-9e2b-1a2b3c4d5e6f',
   * });
   * ```
   */
  create(
    body: AutoimproveFixCreateParams,
    options?: RequestOptions,
  ): APIPromise<AutoimproveFixCreateResponse> {
    return this._client.post('/v1/autoimprove/fix', { body, ...options });
  }

  /**
   * List the Autoimprove fixes in this project, most recent first, capped at 100.
   *
   * A fix is one autonomous engagement: Roark improving one agent toward one
   * objective metric on a staging copy, with a human-gated promote to production at
   * the end.
   *
   * @example
   * ```ts
   * const autoimproveFixes = await client.autoimproveFix.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<AutoimproveFixListResponse> {
    return this._client.get('/v1/autoimprove/fix', options);
  }

  /**
   * Answer the question a fix is blocked on. Only meaningful while the fix status is
   * NEEDS_INPUT (the open QUESTION entry carries the offered options; free text is
   * also accepted). Otherwise returns a conflict.
   *
   * @example
   * ```ts
   * const response = await client.autoimproveFix.answerQuestion(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     text: 'Keep the current voice; focus on the closing confirmation.',
   *   },
   * );
   * ```
   */
  answerQuestion(
    fixID: string,
    body: AutoimproveFixAnswerQuestionParams,
    options?: RequestOptions,
  ): APIPromise<AutoimproveFixAnswerQuestionResponse> {
    return this._client.post(path`/v1/autoimprove/fix/${fixID}/answer`, { body, ...options });
  }

  /**
   * Stop a live fix. Production is never changed by a cancel; everything the fix set
   * up (the shadow agent, its phone number, authored test flows and run plan) is
   * cleaned up automatically.
   *
   * @example
   * ```ts
   * const response = await client.autoimproveFix.cancel(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  cancel(fixID: string, options?: RequestOptions): APIPromise<AutoimproveFixCancelResponse> {
    return this._client.post(path`/v1/autoimprove/fix/${fixID}/cancel`, options);
  }

  /**
   * Discard a verified fix without promoting: production stays untouched and the
   * staging resources are cleaned up. Only a fix in AWAITING_PROMOTE can be
   * dismissed.
   *
   * @example
   * ```ts
   * const response = await client.autoimproveFix.dismiss(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  dismiss(fixID: string, options?: RequestOptions): APIPromise<AutoimproveFixDismissResponse> {
    return this._client.post(path`/v1/autoimprove/fix/${fixID}/dismiss`, options);
  }

  /**
   * Fetch one fix with its full worklog: every step Roark took, the validation
   * batches with their pass-rate movement, any question it is waiting on, and its
   * final report once concluded.
   *
   * @example
   * ```ts
   * const response = await client.autoimproveFix.getByID(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  getByID(fixID: string, options?: RequestOptions): APIPromise<AutoimproveFixGetByIDResponse> {
    return this._client.get(path`/v1/autoimprove/fix/${fixID}`, options);
  }

  /**
   * Apply the verified staging changes to the PRODUCTION agent. Only a fix in
   * AWAITING_PROMOTE can be promoted.
   *
   * A snapshot of the production configuration is taken immediately before the
   * write, so the promote is fully rollbackable. After the promote the staging
   * shadow and its phone number are cleaned up.
   *
   * @example
   * ```ts
   * const response = await client.autoimproveFix.promote(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  promote(fixID: string, options?: RequestOptions): APIPromise<AutoimproveFixPromoteResponse> {
    return this._client.post(path`/v1/autoimprove/fix/${fixID}/promote`, options);
  }

  /**
   * Steer Roark mid-fix. The message is folded into its next decision and is
   * binding. Accepted while the fix is live (RUNNING, NEEDS_INPUT, or PAUSED); a
   * concluded fix returns a conflict.
   *
   * @example
   * ```ts
   * const response = await client.autoimproveFix.sendGuidance(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   {
   *     text: 'Keep the current voice; focus on the closing confirmation.',
   *   },
   * );
   * ```
   */
  sendGuidance(
    fixID: string,
    body: AutoimproveFixSendGuidanceParams,
    options?: RequestOptions,
  ): APIPromise<AutoimproveFixSendGuidanceResponse> {
    return this._client.post(path`/v1/autoimprove/fix/${fixID}/guidance`, { body, ...options });
  }
}

/**
 * One entry in the fix's worklog: what Roark did or observed at that step.
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

export interface AutoimproveFixCreateResponse {
  /**
   * One Autoimprove engagement: Roark autonomously improving one agent toward one
   * objective metric. Roark only ever changes the staging agent (a shadow clone by
   * default); production changes exactly once, when a verified fix is promoted.
   */
  data: AutoimproveFixCreateResponse.Data;
}

export namespace AutoimproveFixCreateResponse {
  /**
   * One Autoimprove engagement: Roark autonomously improving one agent toward one
   * objective metric. Roark only ever changes the staging agent (a shadow clone by
   * default); production changes exactly once, when a verified fix is promoted.
   */
  export interface Data {
    id: string;

    agentId: string;

    baselineValue: number | null;

    /**
     * When the fix reached a terminal status (ISO 8601).
     */
    concludedAt: string | null;

    /**
     * When the fix was created (ISO 8601).
     */
    createdAt: string;

    currentValue: number | null;

    customerIntegrationId: string;

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

    stagingKind: 'DESIGNATED' | 'SHADOW';

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
     * When the fix last changed (ISO 8601).
     */
    updatedAt: string;

    validationRunPlanId: string | null;

    workingMemory: string | null;
  }
}

export interface AutoimproveFixListResponse {
  data: Array<AutoimproveFixListResponse.Data>;
}

export namespace AutoimproveFixListResponse {
  /**
   * One Autoimprove engagement: Roark autonomously improving one agent toward one
   * objective metric. Roark only ever changes the staging agent (a shadow clone by
   * default); production changes exactly once, when a verified fix is promoted.
   */
  export interface Data {
    id: string;

    agentId: string;

    baselineValue: number | null;

    /**
     * When the fix reached a terminal status (ISO 8601).
     */
    concludedAt: string | null;

    /**
     * When the fix was created (ISO 8601).
     */
    createdAt: string;

    currentValue: number | null;

    customerIntegrationId: string;

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

    stagingKind: 'DESIGNATED' | 'SHADOW';

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
     * When the fix last changed (ISO 8601).
     */
    updatedAt: string;

    validationRunPlanId: string | null;

    workingMemory: string | null;
  }
}

export interface AutoimproveFixAnswerQuestionResponse {
  data: AutoimproveFixAnswerQuestionResponse.Data;
}

export namespace AutoimproveFixAnswerQuestionResponse {
  export interface Data {
    accepted: true;
  }
}

export interface AutoimproveFixCancelResponse {
  data: AutoimproveFixCancelResponse.Data;
}

export namespace AutoimproveFixCancelResponse {
  export interface Data {
    accepted: true;
  }
}

export interface AutoimproveFixDismissResponse {
  /**
   * One Autoimprove engagement: Roark autonomously improving one agent toward one
   * objective metric. Roark only ever changes the staging agent (a shadow clone by
   * default); production changes exactly once, when a verified fix is promoted.
   */
  data: AutoimproveFixDismissResponse.Data;
}

export namespace AutoimproveFixDismissResponse {
  /**
   * One Autoimprove engagement: Roark autonomously improving one agent toward one
   * objective metric. Roark only ever changes the staging agent (a shadow clone by
   * default); production changes exactly once, when a verified fix is promoted.
   */
  export interface Data {
    id: string;

    agentId: string;

    baselineValue: number | null;

    /**
     * When the fix reached a terminal status (ISO 8601).
     */
    concludedAt: string | null;

    /**
     * When the fix was created (ISO 8601).
     */
    createdAt: string;

    currentValue: number | null;

    customerIntegrationId: string;

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

    stagingKind: 'DESIGNATED' | 'SHADOW';

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
     * When the fix last changed (ISO 8601).
     */
    updatedAt: string;

    validationRunPlanId: string | null;

    workingMemory: string | null;
  }
}

export interface AutoimproveFixGetByIDResponse {
  data: AutoimproveFixGetByIDResponse.Data;
}

export namespace AutoimproveFixGetByIDResponse {
  /**
   * One Autoimprove engagement: Roark autonomously improving one agent toward one
   * objective metric. Roark only ever changes the staging agent (a shadow clone by
   * default); production changes exactly once, when a verified fix is promoted.
   */
  export interface Data {
    id: string;

    agentId: string;

    baselineValue: number | null;

    /**
     * When the fix reached a terminal status (ISO 8601).
     */
    concludedAt: string | null;

    /**
     * When the fix was created (ISO 8601).
     */
    createdAt: string;

    currentValue: number | null;

    customerIntegrationId: string;

    finalReport: string | null;

    initiatedByUserId: string | null;

    issueId: string | null;

    iterationCount: number;

    /**
     * The full worklog, oldest first.
     */
    logEntries: Array<AutoimproveFixAPI.AutoimproveLogEntry>;

    maxIterations: number;

    maxSimCalls: number;

    objectiveId: string | null;

    objectiveLabel: string;

    objectiveMetricDefinitionId: string;

    organizationId: string;

    projectId: string;

    simCallsUsed: number;

    stagingAgentId: string;

    stagingKind: 'DESIGNATED' | 'SHADOW';

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
     * When the fix last changed (ISO 8601).
     */
    updatedAt: string;

    validationRunPlanId: string | null;

    workingMemory: string | null;
  }
}

export interface AutoimproveFixPromoteResponse {
  /**
   * One Autoimprove engagement: Roark autonomously improving one agent toward one
   * objective metric. Roark only ever changes the staging agent (a shadow clone by
   * default); production changes exactly once, when a verified fix is promoted.
   */
  data: AutoimproveFixPromoteResponse.Data;
}

export namespace AutoimproveFixPromoteResponse {
  /**
   * One Autoimprove engagement: Roark autonomously improving one agent toward one
   * objective metric. Roark only ever changes the staging agent (a shadow clone by
   * default); production changes exactly once, when a verified fix is promoted.
   */
  export interface Data {
    id: string;

    agentId: string;

    baselineValue: number | null;

    /**
     * When the fix reached a terminal status (ISO 8601).
     */
    concludedAt: string | null;

    /**
     * When the fix was created (ISO 8601).
     */
    createdAt: string;

    currentValue: number | null;

    customerIntegrationId: string;

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

    stagingKind: 'DESIGNATED' | 'SHADOW';

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
     * When the fix last changed (ISO 8601).
     */
    updatedAt: string;

    validationRunPlanId: string | null;

    workingMemory: string | null;
  }
}

export interface AutoimproveFixSendGuidanceResponse {
  data: AutoimproveFixSendGuidanceResponse.Data;
}

export namespace AutoimproveFixSendGuidanceResponse {
  export interface Data {
    accepted: true;
  }
}

export interface AutoimproveFixCreateParams {
  /**
   * The production agent to improve. It is never modified until you promote.
   */
  agentId: string;

  /**
   * Human-readable label for the objective, shown everywhere the fix appears.
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
   * Cap on decision turns. Defaults to 10.
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

export interface AutoimproveFixAnswerQuestionParams {
  /**
   * The message for Roark.
   */
  text: string;
}

export interface AutoimproveFixSendGuidanceParams {
  /**
   * The message for Roark.
   */
  text: string;
}

export declare namespace AutoimproveFix {
  export {
    type AutoimproveLogEntry as AutoimproveLogEntry,
    type AutoimproveFixCreateResponse as AutoimproveFixCreateResponse,
    type AutoimproveFixListResponse as AutoimproveFixListResponse,
    type AutoimproveFixAnswerQuestionResponse as AutoimproveFixAnswerQuestionResponse,
    type AutoimproveFixCancelResponse as AutoimproveFixCancelResponse,
    type AutoimproveFixDismissResponse as AutoimproveFixDismissResponse,
    type AutoimproveFixGetByIDResponse as AutoimproveFixGetByIDResponse,
    type AutoimproveFixPromoteResponse as AutoimproveFixPromoteResponse,
    type AutoimproveFixSendGuidanceResponse as AutoimproveFixSendGuidanceResponse,
    type AutoimproveFixCreateParams as AutoimproveFixCreateParams,
    type AutoimproveFixAnswerQuestionParams as AutoimproveFixAnswerQuestionParams,
    type AutoimproveFixSendGuidanceParams as AutoimproveFixSendGuidanceParams,
  };
}
