// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class MetricPolicy extends APIResource {
  /**
   * Creates a new metric policy. Policies define which metrics to collect and under
   * what conditions.
   *
   * @example
   * ```ts
   * const metricPolicy = await client.metricPolicy.create({
   *   metrics: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
   *   modality: 'call',
   *   name: 'Evaluate all inbound calls',
   * });
   * ```
   */
  create(body: MetricPolicyCreateParams, options?: RequestOptions): APIPromise<MetricPolicyCreateResponse> {
    return this._client.post('/v1/metric/policies', { body, ...options });
  }

  /**
   * Updates an existing metric policy. System policies cannot be modified.
   *
   * @example
   * ```ts
   * const metricPolicy = await client.metricPolicy.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  update(
    policyID: string,
    body: MetricPolicyUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MetricPolicyUpdateResponse> {
    return this._client.put(path`/v1/metric/policies/${policyID}`, { body, ...options });
  }

  /**
   * Returns a paginated list of metric policies for the project, including system
   * policies.
   *
   * @example
   * ```ts
   * const metricPolicies = await client.metricPolicy.list();
   * ```
   */
  list(
    query: MetricPolicyListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MetricPolicyListResponse> {
    return this._client.get('/v1/metric/policies', { query, ...options });
  }

  /**
   * Soft-deletes a metric policy. System policies cannot be deleted.
   *
   * @example
   * ```ts
   * const metricPolicy = await client.metricPolicy.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  delete(policyID: string, options?: RequestOptions): APIPromise<MetricPolicyDeleteResponse> {
    return this._client.delete(path`/v1/metric/policies/${policyID}`, options);
  }

  /**
   * Returns a specific metric policy with its conditions and metrics.
   *
   * @example
   * ```ts
   * const response = await client.metricPolicy.getByID(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  getByID(policyID: string, options?: RequestOptions): APIPromise<MetricPolicyGetByIDResponse> {
    return this._client.get(path`/v1/metric/policies/${policyID}`, options);
  }
}

export interface MetricPolicyCreateResponse {
  /**
   * A metric policy defining when metrics should be collected
   */
  data: MetricPolicyCreateResponse.Data;
}

export namespace MetricPolicyCreateResponse {
  /**
   * A metric policy defining when metrics should be collected
   */
  export interface Data {
    /**
     * Unique identifier of the metric policy
     */
    id: string;

    /**
     * Condition groups for this policy. Null means the policy matches all calls.
     */
    conditions: Array<Data.Condition> | null;

    /**
     * When the policy was created
     */
    createdAt: string;

    /**
     * Metric definitions associated with this policy
     */
    metrics: Array<Data.Metric>;

    /**
     * Name of the metric policy
     */
    name: string;

    /**
     * Status of the metric policy (ACTIVE or INACTIVE)
     */
    status: 'ACTIVE' | 'INACTIVE';

    /**
     * Type of the metric policy (SYSTEM or USER)
     */
    type: 'SYSTEM' | 'USER';

    /**
     * When the policy was last updated
     */
    updatedAt: string;
  }

  export namespace Data {
    export interface Condition {
      conditions: Array<Condition.Condition>;
    }

    export namespace Condition {
      export interface Condition {
        /**
         * Key to match against. For AGENT: the agent ID. For CALL_SOURCE: the source name.
         * For CALL_PROPERTY: the property key.
         */
        conditionKey: string;

        /**
         * Comparison operator. Required for CALL_PROPERTY conditions.
         */
        conditionOperator:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'CONTAINS'
          | 'STARTS_WITH'
          | 'GREATER_THAN'
          | 'LESS_THAN'
          | 'GREATER_THAN_OR_EQUALS'
          | 'LESS_THAN_OR_EQUALS'
          | null;

        /**
         * Type of condition: AGENT (match by agent ID), CALL_SOURCE (match by source e.g.
         * VAPI, RETELL), CALL_PROPERTY (match by call property key/value)
         */
        conditionType: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION';

        /**
         * Value to compare against. Required for CALL_PROPERTY conditions.
         */
        conditionValue: string | null;
      }
    }

    export interface Metric {
      id: string;

      /**
       * The metric's per-collector setting. A metric takes at most one field, and which
       * one depends on the metric: verifiedProperties for Property Verification,
       * excludedPhrases for voice consistency, voicemailScript for voicemail,
       * screeningBrief for call screening, toolDefinitionIds for tool invocation,
       * knowledgeBaseDocumentIds for knowledge grounding. A field the metric doesn't
       * take is rejected with a 400.
       */
      settings: Metric.Settings | null;
    }

    export namespace Metric {
      /**
       * The metric's per-collector setting. A metric takes at most one field, and which
       * one depends on the metric: verifiedProperties for Property Verification,
       * excludedPhrases for voice consistency, voicemailScript for voicemail,
       * screeningBrief for call screening, toolDefinitionIds for tool invocation,
       * knowledgeBaseDocumentIds for knowledge grounding. A field the metric doesn't
       * take is rejected with a 400.
       */
      export interface Settings {
        /**
         * Voice consistency metrics: phrases whose agent lines are not judged, such as a
         * recorded prompt in a different voice.
         */
        excludedPhrases?: Array<string>;

        /**
         * Knowledge grounding metrics: the knowledge base documents to ground against, in
         * priority order. Empty or omitted uses every knowledge base in the project.
         */
        knowledgeBaseDocumentIds?: Array<string>;

        /**
         * Call screening metrics: what the agent should say when a screener asks who is
         * calling and why.
         */
        screeningBrief?: string;

        /**
         * Tool invocation metrics: the tool definitions to score. Empty or omitted scores
         * every tool the agent has.
         */
        toolDefinitionIds?: Array<string>;

        /**
         * Property Verification metrics: the conversation properties to check against the
         * transcript. Empty or omitted checks every custom property.
         */
        verifiedProperties?: Array<string>;

        /**
         * Voicemail metrics: the message the agent is expected to leave on voicemail.
         */
        voicemailScript?: string;
      }
    }
  }
}

export interface MetricPolicyUpdateResponse {
  /**
   * A metric policy defining when metrics should be collected
   */
  data: MetricPolicyUpdateResponse.Data;
}

export namespace MetricPolicyUpdateResponse {
  /**
   * A metric policy defining when metrics should be collected
   */
  export interface Data {
    /**
     * Unique identifier of the metric policy
     */
    id: string;

    /**
     * Condition groups for this policy. Null means the policy matches all calls.
     */
    conditions: Array<Data.Condition> | null;

    /**
     * When the policy was created
     */
    createdAt: string;

    /**
     * Metric definitions associated with this policy
     */
    metrics: Array<Data.Metric>;

    /**
     * Name of the metric policy
     */
    name: string;

    /**
     * Status of the metric policy (ACTIVE or INACTIVE)
     */
    status: 'ACTIVE' | 'INACTIVE';

    /**
     * Type of the metric policy (SYSTEM or USER)
     */
    type: 'SYSTEM' | 'USER';

    /**
     * When the policy was last updated
     */
    updatedAt: string;
  }

  export namespace Data {
    export interface Condition {
      conditions: Array<Condition.Condition>;
    }

    export namespace Condition {
      export interface Condition {
        /**
         * Key to match against. For AGENT: the agent ID. For CALL_SOURCE: the source name.
         * For CALL_PROPERTY: the property key.
         */
        conditionKey: string;

        /**
         * Comparison operator. Required for CALL_PROPERTY conditions.
         */
        conditionOperator:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'CONTAINS'
          | 'STARTS_WITH'
          | 'GREATER_THAN'
          | 'LESS_THAN'
          | 'GREATER_THAN_OR_EQUALS'
          | 'LESS_THAN_OR_EQUALS'
          | null;

        /**
         * Type of condition: AGENT (match by agent ID), CALL_SOURCE (match by source e.g.
         * VAPI, RETELL), CALL_PROPERTY (match by call property key/value)
         */
        conditionType: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION';

        /**
         * Value to compare against. Required for CALL_PROPERTY conditions.
         */
        conditionValue: string | null;
      }
    }

    export interface Metric {
      id: string;

      /**
       * The metric's per-collector setting. A metric takes at most one field, and which
       * one depends on the metric: verifiedProperties for Property Verification,
       * excludedPhrases for voice consistency, voicemailScript for voicemail,
       * screeningBrief for call screening, toolDefinitionIds for tool invocation,
       * knowledgeBaseDocumentIds for knowledge grounding. A field the metric doesn't
       * take is rejected with a 400.
       */
      settings: Metric.Settings | null;
    }

    export namespace Metric {
      /**
       * The metric's per-collector setting. A metric takes at most one field, and which
       * one depends on the metric: verifiedProperties for Property Verification,
       * excludedPhrases for voice consistency, voicemailScript for voicemail,
       * screeningBrief for call screening, toolDefinitionIds for tool invocation,
       * knowledgeBaseDocumentIds for knowledge grounding. A field the metric doesn't
       * take is rejected with a 400.
       */
      export interface Settings {
        /**
         * Voice consistency metrics: phrases whose agent lines are not judged, such as a
         * recorded prompt in a different voice.
         */
        excludedPhrases?: Array<string>;

        /**
         * Knowledge grounding metrics: the knowledge base documents to ground against, in
         * priority order. Empty or omitted uses every knowledge base in the project.
         */
        knowledgeBaseDocumentIds?: Array<string>;

        /**
         * Call screening metrics: what the agent should say when a screener asks who is
         * calling and why.
         */
        screeningBrief?: string;

        /**
         * Tool invocation metrics: the tool definitions to score. Empty or omitted scores
         * every tool the agent has.
         */
        toolDefinitionIds?: Array<string>;

        /**
         * Property Verification metrics: the conversation properties to check against the
         * transcript. Empty or omitted checks every custom property.
         */
        verifiedProperties?: Array<string>;

        /**
         * Voicemail metrics: the message the agent is expected to leave on voicemail.
         */
        voicemailScript?: string;
      }
    }
  }
}

/**
 * Paginated list of metric policies
 */
export interface MetricPolicyListResponse {
  data: Array<MetricPolicyListResponse.Data>;

  pagination: MetricPolicyListResponse.Pagination;
}

export namespace MetricPolicyListResponse {
  /**
   * A metric policy defining when metrics should be collected
   */
  export interface Data {
    /**
     * Unique identifier of the metric policy
     */
    id: string;

    /**
     * Condition groups for this policy. Null means the policy matches all calls.
     */
    conditions: Array<Data.Condition> | null;

    /**
     * When the policy was created
     */
    createdAt: string;

    /**
     * Metric definitions associated with this policy
     */
    metrics: Array<Data.Metric>;

    /**
     * Name of the metric policy
     */
    name: string;

    /**
     * Status of the metric policy (ACTIVE or INACTIVE)
     */
    status: 'ACTIVE' | 'INACTIVE';

    /**
     * Type of the metric policy (SYSTEM or USER)
     */
    type: 'SYSTEM' | 'USER';

    /**
     * When the policy was last updated
     */
    updatedAt: string;
  }

  export namespace Data {
    export interface Condition {
      conditions: Array<Condition.Condition>;
    }

    export namespace Condition {
      export interface Condition {
        /**
         * Key to match against. For AGENT: the agent ID. For CALL_SOURCE: the source name.
         * For CALL_PROPERTY: the property key.
         */
        conditionKey: string;

        /**
         * Comparison operator. Required for CALL_PROPERTY conditions.
         */
        conditionOperator:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'CONTAINS'
          | 'STARTS_WITH'
          | 'GREATER_THAN'
          | 'LESS_THAN'
          | 'GREATER_THAN_OR_EQUALS'
          | 'LESS_THAN_OR_EQUALS'
          | null;

        /**
         * Type of condition: AGENT (match by agent ID), CALL_SOURCE (match by source e.g.
         * VAPI, RETELL), CALL_PROPERTY (match by call property key/value)
         */
        conditionType: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION';

        /**
         * Value to compare against. Required for CALL_PROPERTY conditions.
         */
        conditionValue: string | null;
      }
    }

    export interface Metric {
      id: string;

      /**
       * The metric's per-collector setting. A metric takes at most one field, and which
       * one depends on the metric: verifiedProperties for Property Verification,
       * excludedPhrases for voice consistency, voicemailScript for voicemail,
       * screeningBrief for call screening, toolDefinitionIds for tool invocation,
       * knowledgeBaseDocumentIds for knowledge grounding. A field the metric doesn't
       * take is rejected with a 400.
       */
      settings: Metric.Settings | null;
    }

    export namespace Metric {
      /**
       * The metric's per-collector setting. A metric takes at most one field, and which
       * one depends on the metric: verifiedProperties for Property Verification,
       * excludedPhrases for voice consistency, voicemailScript for voicemail,
       * screeningBrief for call screening, toolDefinitionIds for tool invocation,
       * knowledgeBaseDocumentIds for knowledge grounding. A field the metric doesn't
       * take is rejected with a 400.
       */
      export interface Settings {
        /**
         * Voice consistency metrics: phrases whose agent lines are not judged, such as a
         * recorded prompt in a different voice.
         */
        excludedPhrases?: Array<string>;

        /**
         * Knowledge grounding metrics: the knowledge base documents to ground against, in
         * priority order. Empty or omitted uses every knowledge base in the project.
         */
        knowledgeBaseDocumentIds?: Array<string>;

        /**
         * Call screening metrics: what the agent should say when a screener asks who is
         * calling and why.
         */
        screeningBrief?: string;

        /**
         * Tool invocation metrics: the tool definitions to score. Empty or omitted scores
         * every tool the agent has.
         */
        toolDefinitionIds?: Array<string>;

        /**
         * Property Verification metrics: the conversation properties to check against the
         * transcript. Empty or omitted checks every custom property.
         */
        verifiedProperties?: Array<string>;

        /**
         * Voicemail metrics: the message the agent is expected to leave on voicemail.
         */
        voicemailScript?: string;
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

export interface MetricPolicyDeleteResponse {
  data: MetricPolicyDeleteResponse.Data;
}

export namespace MetricPolicyDeleteResponse {
  export interface Data {
    /**
     * Whether the policy was deleted
     */
    deleted: boolean;
  }
}

export interface MetricPolicyGetByIDResponse {
  /**
   * A metric policy defining when metrics should be collected
   */
  data: MetricPolicyGetByIDResponse.Data;
}

export namespace MetricPolicyGetByIDResponse {
  /**
   * A metric policy defining when metrics should be collected
   */
  export interface Data {
    /**
     * Unique identifier of the metric policy
     */
    id: string;

    /**
     * Condition groups for this policy. Null means the policy matches all calls.
     */
    conditions: Array<Data.Condition> | null;

    /**
     * When the policy was created
     */
    createdAt: string;

    /**
     * Metric definitions associated with this policy
     */
    metrics: Array<Data.Metric>;

    /**
     * Name of the metric policy
     */
    name: string;

    /**
     * Status of the metric policy (ACTIVE or INACTIVE)
     */
    status: 'ACTIVE' | 'INACTIVE';

    /**
     * Type of the metric policy (SYSTEM or USER)
     */
    type: 'SYSTEM' | 'USER';

    /**
     * When the policy was last updated
     */
    updatedAt: string;
  }

  export namespace Data {
    export interface Condition {
      conditions: Array<Condition.Condition>;
    }

    export namespace Condition {
      export interface Condition {
        /**
         * Key to match against. For AGENT: the agent ID. For CALL_SOURCE: the source name.
         * For CALL_PROPERTY: the property key.
         */
        conditionKey: string;

        /**
         * Comparison operator. Required for CALL_PROPERTY conditions.
         */
        conditionOperator:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'CONTAINS'
          | 'STARTS_WITH'
          | 'GREATER_THAN'
          | 'LESS_THAN'
          | 'GREATER_THAN_OR_EQUALS'
          | 'LESS_THAN_OR_EQUALS'
          | null;

        /**
         * Type of condition: AGENT (match by agent ID), CALL_SOURCE (match by source e.g.
         * VAPI, RETELL), CALL_PROPERTY (match by call property key/value)
         */
        conditionType: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION';

        /**
         * Value to compare against. Required for CALL_PROPERTY conditions.
         */
        conditionValue: string | null;
      }
    }

    export interface Metric {
      id: string;

      /**
       * The metric's per-collector setting. A metric takes at most one field, and which
       * one depends on the metric: verifiedProperties for Property Verification,
       * excludedPhrases for voice consistency, voicemailScript for voicemail,
       * screeningBrief for call screening, toolDefinitionIds for tool invocation,
       * knowledgeBaseDocumentIds for knowledge grounding. A field the metric doesn't
       * take is rejected with a 400.
       */
      settings: Metric.Settings | null;
    }

    export namespace Metric {
      /**
       * The metric's per-collector setting. A metric takes at most one field, and which
       * one depends on the metric: verifiedProperties for Property Verification,
       * excludedPhrases for voice consistency, voicemailScript for voicemail,
       * screeningBrief for call screening, toolDefinitionIds for tool invocation,
       * knowledgeBaseDocumentIds for knowledge grounding. A field the metric doesn't
       * take is rejected with a 400.
       */
      export interface Settings {
        /**
         * Voice consistency metrics: phrases whose agent lines are not judged, such as a
         * recorded prompt in a different voice.
         */
        excludedPhrases?: Array<string>;

        /**
         * Knowledge grounding metrics: the knowledge base documents to ground against, in
         * priority order. Empty or omitted uses every knowledge base in the project.
         */
        knowledgeBaseDocumentIds?: Array<string>;

        /**
         * Call screening metrics: what the agent should say when a screener asks who is
         * calling and why.
         */
        screeningBrief?: string;

        /**
         * Tool invocation metrics: the tool definitions to score. Empty or omitted scores
         * every tool the agent has.
         */
        toolDefinitionIds?: Array<string>;

        /**
         * Property Verification metrics: the conversation properties to check against the
         * transcript. Empty or omitted checks every custom property.
         */
        verifiedProperties?: Array<string>;

        /**
         * Voicemail metrics: the message the agent is expected to leave on voicemail.
         */
        voicemailScript?: string;
      }
    }
  }
}

export interface MetricPolicyCreateParams {
  /**
   * Metric definitions to collect when this policy matches, each with an optional
   * setting
   */
  metrics: Array<MetricPolicyCreateParams.Metric>;

  /**
   * Modality this policy targets. A policy fires for exactly one modality and can
   * only reference metrics that support that modality.
   */
  modality: 'call' | 'chat';

  /**
   * Name of the metric policy
   */
  name: string;

  /**
   * Condition groups. Omit to match all calls.
   */
  conditions?: Array<MetricPolicyCreateParams.Condition>;

  /**
   * Status of the policy (default: ACTIVE)
   */
  status?: 'ACTIVE' | 'INACTIVE';
}

export namespace MetricPolicyCreateParams {
  export interface Metric {
    /**
     * The metric definition to collect
     */
    id: string;

    /**
     * The metric's per-collector setting. A metric takes at most one field, and which
     * one depends on the metric: verifiedProperties for Property Verification,
     * excludedPhrases for voice consistency, voicemailScript for voicemail,
     * screeningBrief for call screening, toolDefinitionIds for tool invocation,
     * knowledgeBaseDocumentIds for knowledge grounding. A field the metric doesn't
     * take is rejected with a 400.
     */
    settings?: Metric.Settings | null;
  }

  export namespace Metric {
    /**
     * The metric's per-collector setting. A metric takes at most one field, and which
     * one depends on the metric: verifiedProperties for Property Verification,
     * excludedPhrases for voice consistency, voicemailScript for voicemail,
     * screeningBrief for call screening, toolDefinitionIds for tool invocation,
     * knowledgeBaseDocumentIds for knowledge grounding. A field the metric doesn't
     * take is rejected with a 400.
     */
    export interface Settings {
      /**
       * Voice consistency metrics: phrases whose agent lines are not judged, such as a
       * recorded prompt in a different voice.
       */
      excludedPhrases?: Array<string>;

      /**
       * Knowledge grounding metrics: the knowledge base documents to ground against, in
       * priority order. Empty or omitted uses every knowledge base in the project.
       */
      knowledgeBaseDocumentIds?: Array<string>;

      /**
       * Call screening metrics: what the agent should say when a screener asks who is
       * calling and why.
       */
      screeningBrief?: string;

      /**
       * Tool invocation metrics: the tool definitions to score. Empty or omitted scores
       * every tool the agent has.
       */
      toolDefinitionIds?: Array<string>;

      /**
       * Property Verification metrics: the conversation properties to check against the
       * transcript. Empty or omitted checks every custom property.
       */
      verifiedProperties?: Array<string>;

      /**
       * Voicemail metrics: the message the agent is expected to leave on voicemail.
       */
      voicemailScript?: string;
    }
  }

  export interface Condition {
    conditions: Array<Condition.Condition>;
  }

  export namespace Condition {
    export interface Condition {
      /**
       * Key to match against. For AGENT: the agent ID. For CALL_SOURCE: the source name.
       * For CALL_PROPERTY: the property key.
       */
      conditionKey: string;

      /**
       * Type of condition: AGENT (match by agent ID), CALL_SOURCE (match by source e.g.
       * VAPI, RETELL), CALL_PROPERTY (match by call property key/value)
       */
      conditionType: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION';

      /**
       * Comparison operator. Required for CALL_PROPERTY conditions.
       */
      conditionOperator?:
        | 'EQUALS'
        | 'NOT_EQUALS'
        | 'CONTAINS'
        | 'STARTS_WITH'
        | 'GREATER_THAN'
        | 'LESS_THAN'
        | 'GREATER_THAN_OR_EQUALS'
        | 'LESS_THAN_OR_EQUALS'
        | null;

      /**
       * Value to compare against. Required for CALL_PROPERTY conditions.
       */
      conditionValue?: string | null;
    }
  }
}

export interface MetricPolicyUpdateParams {
  /**
   * Condition groups. Omit to keep existing, provide empty array to remove all
   * conditions.
   */
  conditions?: Array<MetricPolicyUpdateParams.Condition>;

  /**
   * Metric definitions to collect when this policy matches. Replaces the policy's
   * whole metric list: a metric sent without settings goes back to its default, so
   * resend a metric's settings to keep them. Omit to keep the current metrics.
   */
  metrics?: Array<MetricPolicyUpdateParams.Metric>;

  /**
   * Name of the metric policy
   */
  name?: string;

  /**
   * Status of the policy
   */
  status?: 'ACTIVE' | 'INACTIVE';
}

export namespace MetricPolicyUpdateParams {
  export interface Condition {
    conditions: Array<Condition.Condition>;
  }

  export namespace Condition {
    export interface Condition {
      /**
       * Key to match against. For AGENT: the agent ID. For CALL_SOURCE: the source name.
       * For CALL_PROPERTY: the property key.
       */
      conditionKey: string;

      /**
       * Type of condition: AGENT (match by agent ID), CALL_SOURCE (match by source e.g.
       * VAPI, RETELL), CALL_PROPERTY (match by call property key/value)
       */
      conditionType: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION';

      /**
       * Comparison operator. Required for CALL_PROPERTY conditions.
       */
      conditionOperator?:
        | 'EQUALS'
        | 'NOT_EQUALS'
        | 'CONTAINS'
        | 'STARTS_WITH'
        | 'GREATER_THAN'
        | 'LESS_THAN'
        | 'GREATER_THAN_OR_EQUALS'
        | 'LESS_THAN_OR_EQUALS'
        | null;

      /**
       * Value to compare against. Required for CALL_PROPERTY conditions.
       */
      conditionValue?: string | null;
    }
  }

  export interface Metric {
    /**
     * The metric definition to collect
     */
    id: string;

    /**
     * The metric's per-collector setting. A metric takes at most one field, and which
     * one depends on the metric: verifiedProperties for Property Verification,
     * excludedPhrases for voice consistency, voicemailScript for voicemail,
     * screeningBrief for call screening, toolDefinitionIds for tool invocation,
     * knowledgeBaseDocumentIds for knowledge grounding. A field the metric doesn't
     * take is rejected with a 400.
     */
    settings?: Metric.Settings | null;
  }

  export namespace Metric {
    /**
     * The metric's per-collector setting. A metric takes at most one field, and which
     * one depends on the metric: verifiedProperties for Property Verification,
     * excludedPhrases for voice consistency, voicemailScript for voicemail,
     * screeningBrief for call screening, toolDefinitionIds for tool invocation,
     * knowledgeBaseDocumentIds for knowledge grounding. A field the metric doesn't
     * take is rejected with a 400.
     */
    export interface Settings {
      /**
       * Voice consistency metrics: phrases whose agent lines are not judged, such as a
       * recorded prompt in a different voice.
       */
      excludedPhrases?: Array<string>;

      /**
       * Knowledge grounding metrics: the knowledge base documents to ground against, in
       * priority order. Empty or omitted uses every knowledge base in the project.
       */
      knowledgeBaseDocumentIds?: Array<string>;

      /**
       * Call screening metrics: what the agent should say when a screener asks who is
       * calling and why.
       */
      screeningBrief?: string;

      /**
       * Tool invocation metrics: the tool definitions to score. Empty or omitted scores
       * every tool the agent has.
       */
      toolDefinitionIds?: Array<string>;

      /**
       * Property Verification metrics: the conversation properties to check against the
       * transcript. Empty or omitted checks every custom property.
       */
      verifiedProperties?: Array<string>;

      /**
       * Voicemail metrics: the message the agent is expected to leave on voicemail.
       */
      voicemailScript?: string;
    }
  }
}

export interface MetricPolicyListParams {
  /**
   * Cursor for pagination - use the nextCursor value from a previous response
   */
  after?: string;

  /**
   * Maximum number of policies to return (default: 20, max: 50)
   */
  limit?: number;

  /**
   * Filter by policy status
   */
  status?: 'ACTIVE' | 'INACTIVE';
}

export declare namespace MetricPolicy {
  export {
    type MetricPolicyCreateResponse as MetricPolicyCreateResponse,
    type MetricPolicyUpdateResponse as MetricPolicyUpdateResponse,
    type MetricPolicyListResponse as MetricPolicyListResponse,
    type MetricPolicyDeleteResponse as MetricPolicyDeleteResponse,
    type MetricPolicyGetByIDResponse as MetricPolicyGetByIDResponse,
    type MetricPolicyCreateParams as MetricPolicyCreateParams,
    type MetricPolicyUpdateParams as MetricPolicyUpdateParams,
    type MetricPolicyListParams as MetricPolicyListParams,
  };
}
