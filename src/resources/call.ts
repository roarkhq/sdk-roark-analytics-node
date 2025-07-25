// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import * as Core from '../core';

export class Call extends APIResource {
  /**
   * Fetch evaluation run results for a specific call.
   */
  getEvaluationRun(id: string, options?: Core.RequestOptions): Core.APIPromise<CallGetEvaluationRunResponse> {
    return this._client.get(`/v1/call/${id}/evaluation-run`, options);
  }

  /**
   * Fetch detailed sentiment analysis results for a specific call, including
   * emotional tone, key phrases, and sentiment scores.
   */
  getSentimentRun(id: string, options?: Core.RequestOptions): Core.APIPromise<CallGetSentimentRunResponse> {
    return this._client.get(`/v1/call/${id}/sentiment-run`, options);
  }
}

export interface CallGetEvaluationRunResponse {
  /**
   * Evaluation run response payload
   */
  data: Array<CallGetEvaluationRunResponse.Data>;
}

export namespace CallGetEvaluationRunResponse {
  export interface Data {
    /**
     * All block runs for this evaluator, including skipped ones
     */
    blockRuns: Array<Data.BlockRun>;

    evaluator: Data.Evaluator;

    evidence: Array<Data.Evidence>;

    metrics: Array<Data.Metric>;

    /**
     * Status of the evaluator run
     */
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

    /**
     * ID of the evaluator run
     */
    id?: string;

    /**
     * When the evaluator run completed
     */
    completedAt?: string | null;

    /**
     * Score of the evaluation run (0-1)
     */
    score?: number | null;

    /**
     * Score classification of the evaluator run based on score threshold (IRRELEVANT
     * is mapped to SKIPPED)
     */
    scoreClassification?: 'SUCCESS' | 'FAILURE' | 'SKIPPED' | null;

    /**
     * When the evaluator run started
     */
    startedAt?: string | null;

    /**
     * Summary of the evaluation run
     */
    summary?: string | null;
  }

  export namespace Data {
    export interface BlockRun {
      /**
       * ID of the block definition
       */
      blockDefinitionId: string;

      /**
       * Name of the evaluation block
       */
      blockName: string;

      /**
       * ID of the block run instance
       */
      blockRunId: string;

      /**
       * When the block run was created
       */
      createdAt: string;

      /**
       * Reason for the outcome (pass/fail explanation or skip reason)
       */
      reason: string | null;

      /**
       * Result of the block run
       */
      result: 'PASSED' | 'FAILED' | 'SKIPPED' | null;

      /**
       * Score of the block run (0-1)
       */
      score: number | null;

      /**
       * Status of the block run
       */
      status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
    }

    export interface Evaluator {
      /**
       * ID of the evaluator
       */
      id: string;

      /**
       * Name of the evaluator
       */
      name: string;

      /**
       * Weight of the evaluator
       */
      weight?: number;
    }

    export interface Evidence {
      /**
       * Comment text of the evidence
       */
      commentText: string | null;

      /**
       * Created at of the evidence
       */
      createdAt: string;

      /**
       * Is positive of the evidence
       */
      isPositive: boolean;

      /**
       * Snippet text of the evidence
       */
      snippetText: string;
    }

    export interface Metric {
      /**
       * Boolean value of the metric
       */
      booleanValue: boolean | null;

      /**
       * Confidence level of the metric (0-1)
       */
      confidence: number | null;

      /**
       * Created at of the metric
       */
      createdAt: string;

      /**
       * Name of the metric
       */
      name: string;

      /**
       * Numeric value of the metric
       */
      numericValue: number | null;

      /**
       * Reasoning of the metric
       */
      reasoning: string | null;

      /**
       * Role of the metric
       */
      role: string;

      /**
       * Text value of the metric
       */
      textValue: string | null;

      /**
       * Value type of the metric
       */
      valueType: string;
    }
  }
}

export interface CallGetSentimentRunResponse {
  /**
   * Sentiment run response payload
   */
  data: CallGetSentimentRunResponse.Data;
}

export namespace CallGetSentimentRunResponse {
  /**
   * Sentiment run response payload
   */
  export interface Data {
    /**
     * Status of the sentiment run
     */
    status: string;

    /**
     * NEUTRAL / NEGATIVE / POSITIVE
     */
    averageCategoricalSentiment?: string;

    /**
     * Average sentiment score between 0-1 of the call
     */
    averageSentiment?: number;

    /**
     * Common emotion of the call
     */
    commonEmotion?: string;
  }
}

export declare namespace Call {
  export {
    type CallGetEvaluationRunResponse as CallGetEvaluationRunResponse,
    type CallGetSentimentRunResponse as CallGetSentimentRunResponse,
  };
}
