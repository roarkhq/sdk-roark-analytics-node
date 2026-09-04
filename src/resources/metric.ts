// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Metric extends APIResource {
  /**
   * Create a new metric definition. The `calculationType` field selects the variant:
   * LLM_JUDGE (LLM-evaluated), FORMULA (computed from a math expression over other
   * metrics), or PATTERN (detects a trigger→outcome pattern within a window). To
   * create a threshold on top of an existing metric, use
   * `POST /metric/definitions/{idOrSlug}/thresholds` instead.
   *
   * @example
   * ```ts
   * const response = await client.metric.createDefinition({
   *   calculationType: 'LLM_JUDGE',
   *   name: 'Customer Satisfaction',
   *   outputType: 'BOOLEAN',
   * });
   * ```
   */
  createDefinition(
    body: MetricCreateDefinitionParams,
    options?: RequestOptions,
  ): APIPromise<MetricCreateDefinitionResponse> {
    return this._client.post('/v1/metric/definitions', { body, ...options });
  }

  /**
   * Fetch metric definitions available in the project, including both
   * system-generated and custom metrics. Results are ordered by immutable definition
   * ID; pass `nextCursor` to retrieve the following page.
   *
   * @example
   * ```ts
   * const response = await client.metric.listDefinitions();
   * ```
   */
  listDefinitions(
    query: MetricListDefinitionsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MetricListDefinitionsResponse> {
    return this._client.get('/v1/metric/definitions', { query, ...options });
  }

  /**
   * Update the editable subset of a custom metric definition, addressed by its UUID
   * or its stable `slug`. Only the supplied fields are changed; omitted fields are
   * left unchanged. Every update creates a new immutable version; the response
   * carries the advanced `versionId`. Immutable fields (scope, outputType, calcType,
   * …) are rejected, and which fields are editable depends on the metric (e.g.
   * derived metrics only allow `name`). Roark's own metrics are rejected here: this
   * endpoint edits the shared definition, which every workspace sees. To change one
   * for your workspace alone, edit its variant with PUT
   * /v1/metric/definitions/{idOrSlug}/variants/{variantId}, which forks it for you
   * and leaves every other workspace on the original.
   *
   * @example
   * ```ts
   * const response =
   *   await client.metric.updateDefinition('idOrSlug');
   * ```
   */
  updateDefinition(
    idOrSlug: string,
    body: MetricUpdateDefinitionParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MetricUpdateDefinitionResponse> {
    return this._client.put(path`/v1/metric/definitions/${idOrSlug}`, { body, ...options });
  }
}

export interface MetricCreateDefinitionResponse {
  /**
   * The created metric definition. The variant is selected by `calculationType`.
   */
  data:
    | MetricCreateDefinitionResponse.LlmJudgeMetricResponse
    | MetricCreateDefinitionResponse.FormulaMetricResponse
    | MetricCreateDefinitionResponse.PatternMetricResponse;
}

export namespace MetricCreateDefinitionResponse {
  export interface LlmJudgeMetricResponse {
    /**
     * Unique identifier for the metric definition
     */
    id: string;

    /**
     * For a BOOLEAN metric, what a `false` value means. Also given to the judge as its
     * polarity rule.
     */
    booleanFalseLabel: string | null;

    /**
     * For a BOOLEAN metric, what a `true` value means. Also given to the judge as its
     * polarity rule.
     */
    booleanTrueLabel: string | null;

    /**
     * Metric evaluated by an LLM against a prompt.
     */
    calculationType: 'LLM_JUDGE';

    /**
     * Description of what the metric measures
     */
    description: string;

    /**
     * The rubric this judge applies, as stored. Read it back to confirm which criteria
     * are live after a create or update.
     */
    llmPrompt: string | null;

    /**
     * Alias of `slug` retained for backwards compatibility. Same value as `slug`.
     */
    metricId: string;

    /**
     * Name of the metric
     */
    name: string;

    /**
     * True when this metric can only be scored from a live recording
     * (`supportedConversationSources` is `["LIVE"]`). Selecting one of these on a
     * simulation run forces live enrichment: the run waits for your recording and, if
     * none arrives, the metric produces no value. Check this before a run rather than
     * discovering the wait afterwards.
     */
    requiresLiveConversation: boolean;

    /**
     * Whether metric is global or per-participant
     */
    scope: 'GLOBAL' | 'PER_PARTICIPANT';

    /**
     * Stable metric slug (e.g. "call_reason", "customer_satisfaction")
     */
    slug: string;

    /**
     * Which levels this metric can produce values at
     */
    supportedContexts: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    /**
     * Which kinds of conversation this metric can be scored on. `null` means both.
     * `["LIVE"]` marks a metric that can only be scored from your own recording of a
     * real call, and `["SIMULATED"]` one that only applies to simulations.
     */
    supportedConversationSources: Array<'SIMULATED' | 'LIVE'> | null;

    /**
     * Whether you can create a variant of this metric with POST
     * /v1/metric/definitions/{idOrSlug}/variants. False for threshold metrics (their
     * configuration comes from the metric they derive from), for provider-computed
     * metrics whose calculation lives in the collector rather than an editable prompt,
     * and for metrics in a package that manages its own variants. Most of Roark’s own
     * metrics are false, so read this rather than discovering it from a 403.
     */
    supportsVariants: boolean;

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * The resolved variant this response reflects (org-scoped Default if the org has
     * customized it, otherwise the system Default). Pass this as sourceVariantId when
     * building a derived metric off this one to pin the exact config.
     */
    variantId: string;

    /**
     * The variant's current version. Immutable snapshot of the config — editing the
     * metric produces a new versionId. Use it to detect config changes.
     */
    versionId: string;

    /**
     * Unit information if applicable
     */
    unit?: LlmJudgeMetricResponse.Unit;
  }

  export namespace LlmJudgeMetricResponse {
    /**
     * Unit information if applicable
     */
    export interface Unit {
      /**
       * Name of the unit
       */
      name: string;

      /**
       * Symbol for the unit
       */
      symbol: string | null;
    }
  }

  export interface FormulaMetricResponse {
    /**
     * Unique identifier for the metric definition
     */
    id: string;

    /**
     * Metric computed by evaluating an expression over other metrics.
     */
    calculationType: 'FORMULA';

    /**
     * Description of what the metric measures
     */
    description: string;

    /**
     * Formula configuration.
     */
    formula: FormulaMetricResponse.Formula;

    /**
     * Alias of `slug` retained for backwards compatibility. Same value as `slug`.
     */
    metricId: string;

    /**
     * Name of the metric
     */
    name: string;

    /**
     * True when this metric can only be scored from a live recording
     * (`supportedConversationSources` is `["LIVE"]`). Selecting one of these on a
     * simulation run forces live enrichment: the run waits for your recording and, if
     * none arrives, the metric produces no value. Check this before a run rather than
     * discovering the wait afterwards.
     */
    requiresLiveConversation: boolean;

    /**
     * Whether metric is global or per-participant
     */
    scope: 'GLOBAL' | 'PER_PARTICIPANT';

    /**
     * Stable metric slug (e.g. "call_reason", "customer_satisfaction")
     */
    slug: string;

    /**
     * Which levels this metric can produce values at
     */
    supportedContexts: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    /**
     * Which kinds of conversation this metric can be scored on. `null` means both.
     * `["LIVE"]` marks a metric that can only be scored from your own recording of a
     * real call, and `["SIMULATED"]` one that only applies to simulations.
     */
    supportedConversationSources: Array<'SIMULATED' | 'LIVE'> | null;

    /**
     * Whether you can create a variant of this metric with POST
     * /v1/metric/definitions/{idOrSlug}/variants. False for threshold metrics (their
     * configuration comes from the metric they derive from), for provider-computed
     * metrics whose calculation lives in the collector rather than an editable prompt,
     * and for metrics in a package that manages its own variants. Most of Roark’s own
     * metrics are false, so read this rather than discovering it from a 403.
     */
    supportsVariants: boolean;

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * The resolved variant this response reflects (org-scoped Default if the org has
     * customized it, otherwise the system Default). Pass this as sourceVariantId when
     * building a derived metric off this one to pin the exact config.
     */
    variantId: string;

    /**
     * The variant's current version. Immutable snapshot of the config — editing the
     * metric produces a new versionId. Use it to detect config changes.
     */
    versionId: string;

    /**
     * Unit information if applicable
     */
    unit?: FormulaMetricResponse.Unit;
  }

  export namespace FormulaMetricResponse {
    /**
     * Formula configuration.
     */
    export interface Formula {
      expression: string;

      sources: Array<Formula.Source>;
    }

    export namespace Formula {
      export interface Source {
        sourceMetricDefinitionId: string;

        sourceVariantId: string | null;
      }
    }

    /**
     * Unit information if applicable
     */
    export interface Unit {
      /**
       * Name of the unit
       */
      name: string;

      /**
       * Symbol for the unit
       */
      symbol: string | null;
    }
  }

  export interface PatternMetricResponse {
    /**
     * Unique identifier for the metric definition
     */
    id: string;

    /**
     * Metric detecting a trigger condition followed by an outcome within a window.
     */
    calculationType: 'PATTERN';

    /**
     * Description of what the metric measures
     */
    description: string;

    /**
     * Alias of `slug` retained for backwards compatibility. Same value as `slug`.
     */
    metricId: string;

    /**
     * Name of the metric
     */
    name: string;

    /**
     * Pattern configuration.
     */
    pattern: PatternMetricResponse.Pattern;

    /**
     * True when this metric can only be scored from a live recording
     * (`supportedConversationSources` is `["LIVE"]`). Selecting one of these on a
     * simulation run forces live enrichment: the run waits for your recording and, if
     * none arrives, the metric produces no value. Check this before a run rather than
     * discovering the wait afterwards.
     */
    requiresLiveConversation: boolean;

    /**
     * Whether metric is global or per-participant
     */
    scope: 'GLOBAL' | 'PER_PARTICIPANT';

    /**
     * Stable metric slug (e.g. "call_reason", "customer_satisfaction")
     */
    slug: string;

    /**
     * Which levels this metric can produce values at
     */
    supportedContexts: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    /**
     * Which kinds of conversation this metric can be scored on. `null` means both.
     * `["LIVE"]` marks a metric that can only be scored from your own recording of a
     * real call, and `["SIMULATED"]` one that only applies to simulations.
     */
    supportedConversationSources: Array<'SIMULATED' | 'LIVE'> | null;

    /**
     * Whether you can create a variant of this metric with POST
     * /v1/metric/definitions/{idOrSlug}/variants. False for threshold metrics (their
     * configuration comes from the metric they derive from), for provider-computed
     * metrics whose calculation lives in the collector rather than an editable prompt,
     * and for metrics in a package that manages its own variants. Most of Roark’s own
     * metrics are false, so read this rather than discovering it from a 403.
     */
    supportsVariants: boolean;

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * The resolved variant this response reflects (org-scoped Default if the org has
     * customized it, otherwise the system Default). Pass this as sourceVariantId when
     * building a derived metric off this one to pin the exact config.
     */
    variantId: string;

    /**
     * The variant's current version. Immutable snapshot of the config — editing the
     * metric produces a new versionId. Use it to detect config changes.
     */
    versionId: string;

    /**
     * Unit information if applicable
     */
    unit?: PatternMetricResponse.Unit;
  }

  export namespace PatternMetricResponse {
    /**
     * Pattern configuration.
     */
    export interface Pattern {
      operation: 'PATTERN_EXISTS' | 'PATTERN_COUNT' | 'OUTCOME_AGGREGATE';

      outcome: Pattern.Outcome | null;

      triggerCombinator: 'AND' | 'OR' | null;

      triggers: Array<Pattern.Trigger>;

      windowMode: string | null;
    }

    export namespace Pattern {
      export interface Outcome {
        operator:
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUALS'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUALS'
          | 'EQUALS'
          | 'NOT_EQUALS';

        sourceMetricDefinitionId: string;

        sourceParticipantRole: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER' | null;

        sourceVariantId: string | null;

        thresholdValue: string;

        windowAfter: number | null;

        windowBefore: number | null;
      }

      export interface Trigger {
        operator:
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUALS'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUALS'
          | 'EQUALS'
          | 'NOT_EQUALS';

        sourceMetricDefinitionId: string;

        sourceParticipantRole: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER' | null;

        sourceVariantId: string | null;

        thresholdValue: string;
      }
    }

    /**
     * Unit information if applicable
     */
    export interface Unit {
      /**
       * Name of the unit
       */
      name: string;

      /**
       * Symbol for the unit
       */
      symbol: string | null;
    }
  }
}

/**
 * Cursor-paginated metric definitions available in the project
 */
export interface MetricListDefinitionsResponse {
  data: Array<
    | MetricListDefinitionsResponse.LlmJudgeMetricResponse
    | MetricListDefinitionsResponse.ProviderMetricResponse
    | MetricListDefinitionsResponse.ThresholdMetricResponse
    | MetricListDefinitionsResponse.FormulaMetricResponse
    | MetricListDefinitionsResponse.PatternMetricResponse
  >;

  pagination: MetricListDefinitionsResponse.Pagination;
}

export namespace MetricListDefinitionsResponse {
  export interface LlmJudgeMetricResponse {
    /**
     * Unique identifier for the metric definition
     */
    id: string;

    /**
     * For a BOOLEAN metric, what a `false` value means. Also given to the judge as its
     * polarity rule.
     */
    booleanFalseLabel: string | null;

    /**
     * For a BOOLEAN metric, what a `true` value means. Also given to the judge as its
     * polarity rule.
     */
    booleanTrueLabel: string | null;

    /**
     * Metric evaluated by an LLM against a prompt.
     */
    calculationType: 'LLM_JUDGE';

    /**
     * Description of what the metric measures
     */
    description: string;

    /**
     * The rubric this judge applies, as stored. Read it back to confirm which criteria
     * are live after a create or update.
     */
    llmPrompt: string | null;

    /**
     * Alias of `slug` retained for backwards compatibility. Same value as `slug`.
     */
    metricId: string;

    /**
     * Name of the metric
     */
    name: string;

    /**
     * True when this metric can only be scored from a live recording
     * (`supportedConversationSources` is `["LIVE"]`). Selecting one of these on a
     * simulation run forces live enrichment: the run waits for your recording and, if
     * none arrives, the metric produces no value. Check this before a run rather than
     * discovering the wait afterwards.
     */
    requiresLiveConversation: boolean;

    /**
     * Whether metric is global or per-participant
     */
    scope: 'GLOBAL' | 'PER_PARTICIPANT';

    /**
     * Stable metric slug (e.g. "call_reason", "customer_satisfaction")
     */
    slug: string;

    /**
     * Which levels this metric can produce values at
     */
    supportedContexts: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    /**
     * Which kinds of conversation this metric can be scored on. `null` means both.
     * `["LIVE"]` marks a metric that can only be scored from your own recording of a
     * real call, and `["SIMULATED"]` one that only applies to simulations.
     */
    supportedConversationSources: Array<'SIMULATED' | 'LIVE'> | null;

    /**
     * Whether you can create a variant of this metric with POST
     * /v1/metric/definitions/{idOrSlug}/variants. False for threshold metrics (their
     * configuration comes from the metric they derive from), for provider-computed
     * metrics whose calculation lives in the collector rather than an editable prompt,
     * and for metrics in a package that manages its own variants. Most of Roark’s own
     * metrics are false, so read this rather than discovering it from a 403.
     */
    supportsVariants: boolean;

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * The resolved variant this response reflects (org-scoped Default if the org has
     * customized it, otherwise the system Default). Pass this as sourceVariantId when
     * building a derived metric off this one to pin the exact config.
     */
    variantId: string;

    /**
     * The variant's current version. Immutable snapshot of the config — editing the
     * metric produces a new versionId. Use it to detect config changes.
     */
    versionId: string;

    /**
     * Unit information if applicable
     */
    unit?: LlmJudgeMetricResponse.Unit;
  }

  export namespace LlmJudgeMetricResponse {
    /**
     * Unit information if applicable
     */
    export interface Unit {
      /**
       * Name of the unit
       */
      name: string;

      /**
       * Symbol for the unit
       */
      symbol: string | null;
    }
  }

  export interface ProviderMetricResponse {
    /**
     * Unique identifier for the metric definition
     */
    id: string;

    /**
     * System-managed metric produced by an analysis provider.
     */
    calculationType: 'PROVIDER';

    /**
     * Description of what the metric measures
     */
    description: string;

    /**
     * Alias of `slug` retained for backwards compatibility. Same value as `slug`.
     */
    metricId: string;

    /**
     * Name of the metric
     */
    name: string;

    /**
     * True when this metric can only be scored from a live recording
     * (`supportedConversationSources` is `["LIVE"]`). Selecting one of these on a
     * simulation run forces live enrichment: the run waits for your recording and, if
     * none arrives, the metric produces no value. Check this before a run rather than
     * discovering the wait afterwards.
     */
    requiresLiveConversation: boolean;

    /**
     * Whether metric is global or per-participant
     */
    scope: 'GLOBAL' | 'PER_PARTICIPANT';

    /**
     * Stable metric slug (e.g. "call_reason", "customer_satisfaction")
     */
    slug: string;

    /**
     * Which levels this metric can produce values at
     */
    supportedContexts: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    /**
     * Which kinds of conversation this metric can be scored on. `null` means both.
     * `["LIVE"]` marks a metric that can only be scored from your own recording of a
     * real call, and `["SIMULATED"]` one that only applies to simulations.
     */
    supportedConversationSources: Array<'SIMULATED' | 'LIVE'> | null;

    /**
     * Whether you can create a variant of this metric with POST
     * /v1/metric/definitions/{idOrSlug}/variants. False for threshold metrics (their
     * configuration comes from the metric they derive from), for provider-computed
     * metrics whose calculation lives in the collector rather than an editable prompt,
     * and for metrics in a package that manages its own variants. Most of Roark’s own
     * metrics are false, so read this rather than discovering it from a 403.
     */
    supportsVariants: boolean;

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * The resolved variant this response reflects (org-scoped Default if the org has
     * customized it, otherwise the system Default). Pass this as sourceVariantId when
     * building a derived metric off this one to pin the exact config.
     */
    variantId: string;

    /**
     * The variant's current version. Immutable snapshot of the config — editing the
     * metric produces a new versionId. Use it to detect config changes.
     */
    versionId: string;

    /**
     * Unit information if applicable
     */
    unit?: ProviderMetricResponse.Unit;
  }

  export namespace ProviderMetricResponse {
    /**
     * Unit information if applicable
     */
    export interface Unit {
      /**
       * Name of the unit
       */
      name: string;

      /**
       * Symbol for the unit
       */
      symbol: string | null;
    }
  }

  export interface ThresholdMetricResponse {
    /**
     * Unique identifier for the metric definition
     */
    id: string;

    /**
     * Boolean metric derived by comparing a source metric against a threshold.
     */
    calculationType: 'THRESHOLD';

    /**
     * Description of what the metric measures
     */
    description: string;

    /**
     * Alias of `slug` retained for backwards compatibility. Same value as `slug`.
     */
    metricId: string;

    /**
     * Name of the metric
     */
    name: string;

    /**
     * True when this metric can only be scored from a live recording
     * (`supportedConversationSources` is `["LIVE"]`). Selecting one of these on a
     * simulation run forces live enrichment: the run waits for your recording and, if
     * none arrives, the metric produces no value. Check this before a run rather than
     * discovering the wait afterwards.
     */
    requiresLiveConversation: boolean;

    /**
     * Whether metric is global or per-participant
     */
    scope: 'GLOBAL' | 'PER_PARTICIPANT';

    /**
     * Stable metric slug (e.g. "call_reason", "customer_satisfaction")
     */
    slug: string;

    /**
     * Which levels this metric can produce values at
     */
    supportedContexts: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    /**
     * Which kinds of conversation this metric can be scored on. `null` means both.
     * `["LIVE"]` marks a metric that can only be scored from your own recording of a
     * real call, and `["SIMULATED"]` one that only applies to simulations.
     */
    supportedConversationSources: Array<'SIMULATED' | 'LIVE'> | null;

    /**
     * Whether you can create a variant of this metric with POST
     * /v1/metric/definitions/{idOrSlug}/variants. False for threshold metrics (their
     * configuration comes from the metric they derive from), for provider-computed
     * metrics whose calculation lives in the collector rather than an editable prompt,
     * and for metrics in a package that manages its own variants. Most of Roark’s own
     * metrics are false, so read this rather than discovering it from a 403.
     */
    supportsVariants: boolean;

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * The resolved variant this response reflects (org-scoped Default if the org has
     * customized it, otherwise the system Default). Pass this as sourceVariantId when
     * building a derived metric off this one to pin the exact config.
     */
    variantId: string;

    /**
     * The variant's current version. Immutable snapshot of the config — editing the
     * metric produces a new versionId. Use it to detect config changes.
     */
    versionId: string;

    /**
     * Threshold configuration.
     */
    threshold?: ThresholdMetricResponse.Threshold;

    /**
     * Unit information if applicable
     */
    unit?: ThresholdMetricResponse.Unit;
  }

  export namespace ThresholdMetricResponse {
    /**
     * Threshold configuration.
     */
    export interface Threshold {
      aggregationMode: 'EACH' | 'COUNT' | 'AVERAGE' | 'MIN' | 'MAX' | 'MEDIAN' | 'P95' | 'P99' | 'SUM';

      countThreshold: number | null;

      operator:
        | 'GREATER_THAN'
        | 'GREATER_THAN_OR_EQUALS'
        | 'LESS_THAN'
        | 'LESS_THAN_OR_EQUALS'
        | 'EQUALS'
        | 'NOT_EQUALS';

      sourceMetricDefinitionId: string;

      sourceParticipantRole: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER' | null;

      sourceVariantId: string | null;

      thresholdValue: string;
    }

    /**
     * Unit information if applicable
     */
    export interface Unit {
      /**
       * Name of the unit
       */
      name: string;

      /**
       * Symbol for the unit
       */
      symbol: string | null;
    }
  }

  export interface FormulaMetricResponse {
    /**
     * Unique identifier for the metric definition
     */
    id: string;

    /**
     * Metric computed by evaluating an expression over other metrics.
     */
    calculationType: 'FORMULA';

    /**
     * Description of what the metric measures
     */
    description: string;

    /**
     * Formula configuration.
     */
    formula: FormulaMetricResponse.Formula;

    /**
     * Alias of `slug` retained for backwards compatibility. Same value as `slug`.
     */
    metricId: string;

    /**
     * Name of the metric
     */
    name: string;

    /**
     * True when this metric can only be scored from a live recording
     * (`supportedConversationSources` is `["LIVE"]`). Selecting one of these on a
     * simulation run forces live enrichment: the run waits for your recording and, if
     * none arrives, the metric produces no value. Check this before a run rather than
     * discovering the wait afterwards.
     */
    requiresLiveConversation: boolean;

    /**
     * Whether metric is global or per-participant
     */
    scope: 'GLOBAL' | 'PER_PARTICIPANT';

    /**
     * Stable metric slug (e.g. "call_reason", "customer_satisfaction")
     */
    slug: string;

    /**
     * Which levels this metric can produce values at
     */
    supportedContexts: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    /**
     * Which kinds of conversation this metric can be scored on. `null` means both.
     * `["LIVE"]` marks a metric that can only be scored from your own recording of a
     * real call, and `["SIMULATED"]` one that only applies to simulations.
     */
    supportedConversationSources: Array<'SIMULATED' | 'LIVE'> | null;

    /**
     * Whether you can create a variant of this metric with POST
     * /v1/metric/definitions/{idOrSlug}/variants. False for threshold metrics (their
     * configuration comes from the metric they derive from), for provider-computed
     * metrics whose calculation lives in the collector rather than an editable prompt,
     * and for metrics in a package that manages its own variants. Most of Roark’s own
     * metrics are false, so read this rather than discovering it from a 403.
     */
    supportsVariants: boolean;

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * The resolved variant this response reflects (org-scoped Default if the org has
     * customized it, otherwise the system Default). Pass this as sourceVariantId when
     * building a derived metric off this one to pin the exact config.
     */
    variantId: string;

    /**
     * The variant's current version. Immutable snapshot of the config — editing the
     * metric produces a new versionId. Use it to detect config changes.
     */
    versionId: string;

    /**
     * Unit information if applicable
     */
    unit?: FormulaMetricResponse.Unit;
  }

  export namespace FormulaMetricResponse {
    /**
     * Formula configuration.
     */
    export interface Formula {
      expression: string;

      sources: Array<Formula.Source>;
    }

    export namespace Formula {
      export interface Source {
        sourceMetricDefinitionId: string;

        sourceVariantId: string | null;
      }
    }

    /**
     * Unit information if applicable
     */
    export interface Unit {
      /**
       * Name of the unit
       */
      name: string;

      /**
       * Symbol for the unit
       */
      symbol: string | null;
    }
  }

  export interface PatternMetricResponse {
    /**
     * Unique identifier for the metric definition
     */
    id: string;

    /**
     * Metric detecting a trigger condition followed by an outcome within a window.
     */
    calculationType: 'PATTERN';

    /**
     * Description of what the metric measures
     */
    description: string;

    /**
     * Alias of `slug` retained for backwards compatibility. Same value as `slug`.
     */
    metricId: string;

    /**
     * Name of the metric
     */
    name: string;

    /**
     * Pattern configuration.
     */
    pattern: PatternMetricResponse.Pattern;

    /**
     * True when this metric can only be scored from a live recording
     * (`supportedConversationSources` is `["LIVE"]`). Selecting one of these on a
     * simulation run forces live enrichment: the run waits for your recording and, if
     * none arrives, the metric produces no value. Check this before a run rather than
     * discovering the wait afterwards.
     */
    requiresLiveConversation: boolean;

    /**
     * Whether metric is global or per-participant
     */
    scope: 'GLOBAL' | 'PER_PARTICIPANT';

    /**
     * Stable metric slug (e.g. "call_reason", "customer_satisfaction")
     */
    slug: string;

    /**
     * Which levels this metric can produce values at
     */
    supportedContexts: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    /**
     * Which kinds of conversation this metric can be scored on. `null` means both.
     * `["LIVE"]` marks a metric that can only be scored from your own recording of a
     * real call, and `["SIMULATED"]` one that only applies to simulations.
     */
    supportedConversationSources: Array<'SIMULATED' | 'LIVE'> | null;

    /**
     * Whether you can create a variant of this metric with POST
     * /v1/metric/definitions/{idOrSlug}/variants. False for threshold metrics (their
     * configuration comes from the metric they derive from), for provider-computed
     * metrics whose calculation lives in the collector rather than an editable prompt,
     * and for metrics in a package that manages its own variants. Most of Roark’s own
     * metrics are false, so read this rather than discovering it from a 403.
     */
    supportsVariants: boolean;

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * The resolved variant this response reflects (org-scoped Default if the org has
     * customized it, otherwise the system Default). Pass this as sourceVariantId when
     * building a derived metric off this one to pin the exact config.
     */
    variantId: string;

    /**
     * The variant's current version. Immutable snapshot of the config — editing the
     * metric produces a new versionId. Use it to detect config changes.
     */
    versionId: string;

    /**
     * Unit information if applicable
     */
    unit?: PatternMetricResponse.Unit;
  }

  export namespace PatternMetricResponse {
    /**
     * Pattern configuration.
     */
    export interface Pattern {
      operation: 'PATTERN_EXISTS' | 'PATTERN_COUNT' | 'OUTCOME_AGGREGATE';

      outcome: Pattern.Outcome | null;

      triggerCombinator: 'AND' | 'OR' | null;

      triggers: Array<Pattern.Trigger>;

      windowMode: string | null;
    }

    export namespace Pattern {
      export interface Outcome {
        operator:
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUALS'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUALS'
          | 'EQUALS'
          | 'NOT_EQUALS';

        sourceMetricDefinitionId: string;

        sourceParticipantRole: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER' | null;

        sourceVariantId: string | null;

        thresholdValue: string;

        windowAfter: number | null;

        windowBefore: number | null;
      }

      export interface Trigger {
        operator:
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUALS'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUALS'
          | 'EQUALS'
          | 'NOT_EQUALS';

        sourceMetricDefinitionId: string;

        sourceParticipantRole: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER' | null;

        sourceVariantId: string | null;

        thresholdValue: string;
      }
    }

    /**
     * Unit information if applicable
     */
    export interface Unit {
      /**
       * Name of the unit
       */
      name: string;

      /**
       * Symbol for the unit
       */
      symbol: string | null;
    }
  }

  export interface Pagination {
    hasMore: boolean;

    limit: number;

    nextCursor: string | null;
  }
}

export interface MetricUpdateDefinitionResponse {
  /**
   * The updated metric definition. The variant is selected by `calculationType`.
   */
  data:
    | MetricUpdateDefinitionResponse.LlmJudgeMetricResponse
    | MetricUpdateDefinitionResponse.FormulaMetricResponse
    | MetricUpdateDefinitionResponse.PatternMetricResponse
    | MetricUpdateDefinitionResponse.ThresholdMetricResponse;
}

export namespace MetricUpdateDefinitionResponse {
  export interface LlmJudgeMetricResponse {
    /**
     * Unique identifier for the metric definition
     */
    id: string;

    /**
     * For a BOOLEAN metric, what a `false` value means. Also given to the judge as its
     * polarity rule.
     */
    booleanFalseLabel: string | null;

    /**
     * For a BOOLEAN metric, what a `true` value means. Also given to the judge as its
     * polarity rule.
     */
    booleanTrueLabel: string | null;

    /**
     * Metric evaluated by an LLM against a prompt.
     */
    calculationType: 'LLM_JUDGE';

    /**
     * Description of what the metric measures
     */
    description: string;

    /**
     * The rubric this judge applies, as stored. Read it back to confirm which criteria
     * are live after a create or update.
     */
    llmPrompt: string | null;

    /**
     * Alias of `slug` retained for backwards compatibility. Same value as `slug`.
     */
    metricId: string;

    /**
     * Name of the metric
     */
    name: string;

    /**
     * True when this metric can only be scored from a live recording
     * (`supportedConversationSources` is `["LIVE"]`). Selecting one of these on a
     * simulation run forces live enrichment: the run waits for your recording and, if
     * none arrives, the metric produces no value. Check this before a run rather than
     * discovering the wait afterwards.
     */
    requiresLiveConversation: boolean;

    /**
     * Whether metric is global or per-participant
     */
    scope: 'GLOBAL' | 'PER_PARTICIPANT';

    /**
     * Stable metric slug (e.g. "call_reason", "customer_satisfaction")
     */
    slug: string;

    /**
     * Which levels this metric can produce values at
     */
    supportedContexts: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    /**
     * Which kinds of conversation this metric can be scored on. `null` means both.
     * `["LIVE"]` marks a metric that can only be scored from your own recording of a
     * real call, and `["SIMULATED"]` one that only applies to simulations.
     */
    supportedConversationSources: Array<'SIMULATED' | 'LIVE'> | null;

    /**
     * Whether you can create a variant of this metric with POST
     * /v1/metric/definitions/{idOrSlug}/variants. False for threshold metrics (their
     * configuration comes from the metric they derive from), for provider-computed
     * metrics whose calculation lives in the collector rather than an editable prompt,
     * and for metrics in a package that manages its own variants. Most of Roark’s own
     * metrics are false, so read this rather than discovering it from a 403.
     */
    supportsVariants: boolean;

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * The resolved variant this response reflects (org-scoped Default if the org has
     * customized it, otherwise the system Default). Pass this as sourceVariantId when
     * building a derived metric off this one to pin the exact config.
     */
    variantId: string;

    /**
     * The variant's current version. Immutable snapshot of the config — editing the
     * metric produces a new versionId. Use it to detect config changes.
     */
    versionId: string;

    /**
     * Unit information if applicable
     */
    unit?: LlmJudgeMetricResponse.Unit;
  }

  export namespace LlmJudgeMetricResponse {
    /**
     * Unit information if applicable
     */
    export interface Unit {
      /**
       * Name of the unit
       */
      name: string;

      /**
       * Symbol for the unit
       */
      symbol: string | null;
    }
  }

  export interface FormulaMetricResponse {
    /**
     * Unique identifier for the metric definition
     */
    id: string;

    /**
     * Metric computed by evaluating an expression over other metrics.
     */
    calculationType: 'FORMULA';

    /**
     * Description of what the metric measures
     */
    description: string;

    /**
     * Formula configuration.
     */
    formula: FormulaMetricResponse.Formula;

    /**
     * Alias of `slug` retained for backwards compatibility. Same value as `slug`.
     */
    metricId: string;

    /**
     * Name of the metric
     */
    name: string;

    /**
     * True when this metric can only be scored from a live recording
     * (`supportedConversationSources` is `["LIVE"]`). Selecting one of these on a
     * simulation run forces live enrichment: the run waits for your recording and, if
     * none arrives, the metric produces no value. Check this before a run rather than
     * discovering the wait afterwards.
     */
    requiresLiveConversation: boolean;

    /**
     * Whether metric is global or per-participant
     */
    scope: 'GLOBAL' | 'PER_PARTICIPANT';

    /**
     * Stable metric slug (e.g. "call_reason", "customer_satisfaction")
     */
    slug: string;

    /**
     * Which levels this metric can produce values at
     */
    supportedContexts: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    /**
     * Which kinds of conversation this metric can be scored on. `null` means both.
     * `["LIVE"]` marks a metric that can only be scored from your own recording of a
     * real call, and `["SIMULATED"]` one that only applies to simulations.
     */
    supportedConversationSources: Array<'SIMULATED' | 'LIVE'> | null;

    /**
     * Whether you can create a variant of this metric with POST
     * /v1/metric/definitions/{idOrSlug}/variants. False for threshold metrics (their
     * configuration comes from the metric they derive from), for provider-computed
     * metrics whose calculation lives in the collector rather than an editable prompt,
     * and for metrics in a package that manages its own variants. Most of Roark’s own
     * metrics are false, so read this rather than discovering it from a 403.
     */
    supportsVariants: boolean;

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * The resolved variant this response reflects (org-scoped Default if the org has
     * customized it, otherwise the system Default). Pass this as sourceVariantId when
     * building a derived metric off this one to pin the exact config.
     */
    variantId: string;

    /**
     * The variant's current version. Immutable snapshot of the config — editing the
     * metric produces a new versionId. Use it to detect config changes.
     */
    versionId: string;

    /**
     * Unit information if applicable
     */
    unit?: FormulaMetricResponse.Unit;
  }

  export namespace FormulaMetricResponse {
    /**
     * Formula configuration.
     */
    export interface Formula {
      expression: string;

      sources: Array<Formula.Source>;
    }

    export namespace Formula {
      export interface Source {
        sourceMetricDefinitionId: string;

        sourceVariantId: string | null;
      }
    }

    /**
     * Unit information if applicable
     */
    export interface Unit {
      /**
       * Name of the unit
       */
      name: string;

      /**
       * Symbol for the unit
       */
      symbol: string | null;
    }
  }

  export interface PatternMetricResponse {
    /**
     * Unique identifier for the metric definition
     */
    id: string;

    /**
     * Metric detecting a trigger condition followed by an outcome within a window.
     */
    calculationType: 'PATTERN';

    /**
     * Description of what the metric measures
     */
    description: string;

    /**
     * Alias of `slug` retained for backwards compatibility. Same value as `slug`.
     */
    metricId: string;

    /**
     * Name of the metric
     */
    name: string;

    /**
     * Pattern configuration.
     */
    pattern: PatternMetricResponse.Pattern;

    /**
     * True when this metric can only be scored from a live recording
     * (`supportedConversationSources` is `["LIVE"]`). Selecting one of these on a
     * simulation run forces live enrichment: the run waits for your recording and, if
     * none arrives, the metric produces no value. Check this before a run rather than
     * discovering the wait afterwards.
     */
    requiresLiveConversation: boolean;

    /**
     * Whether metric is global or per-participant
     */
    scope: 'GLOBAL' | 'PER_PARTICIPANT';

    /**
     * Stable metric slug (e.g. "call_reason", "customer_satisfaction")
     */
    slug: string;

    /**
     * Which levels this metric can produce values at
     */
    supportedContexts: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    /**
     * Which kinds of conversation this metric can be scored on. `null` means both.
     * `["LIVE"]` marks a metric that can only be scored from your own recording of a
     * real call, and `["SIMULATED"]` one that only applies to simulations.
     */
    supportedConversationSources: Array<'SIMULATED' | 'LIVE'> | null;

    /**
     * Whether you can create a variant of this metric with POST
     * /v1/metric/definitions/{idOrSlug}/variants. False for threshold metrics (their
     * configuration comes from the metric they derive from), for provider-computed
     * metrics whose calculation lives in the collector rather than an editable prompt,
     * and for metrics in a package that manages its own variants. Most of Roark’s own
     * metrics are false, so read this rather than discovering it from a 403.
     */
    supportsVariants: boolean;

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * The resolved variant this response reflects (org-scoped Default if the org has
     * customized it, otherwise the system Default). Pass this as sourceVariantId when
     * building a derived metric off this one to pin the exact config.
     */
    variantId: string;

    /**
     * The variant's current version. Immutable snapshot of the config — editing the
     * metric produces a new versionId. Use it to detect config changes.
     */
    versionId: string;

    /**
     * Unit information if applicable
     */
    unit?: PatternMetricResponse.Unit;
  }

  export namespace PatternMetricResponse {
    /**
     * Pattern configuration.
     */
    export interface Pattern {
      operation: 'PATTERN_EXISTS' | 'PATTERN_COUNT' | 'OUTCOME_AGGREGATE';

      outcome: Pattern.Outcome | null;

      triggerCombinator: 'AND' | 'OR' | null;

      triggers: Array<Pattern.Trigger>;

      windowMode: string | null;
    }

    export namespace Pattern {
      export interface Outcome {
        operator:
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUALS'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUALS'
          | 'EQUALS'
          | 'NOT_EQUALS';

        sourceMetricDefinitionId: string;

        sourceParticipantRole: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER' | null;

        sourceVariantId: string | null;

        thresholdValue: string;

        windowAfter: number | null;

        windowBefore: number | null;
      }

      export interface Trigger {
        operator:
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUALS'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUALS'
          | 'EQUALS'
          | 'NOT_EQUALS';

        sourceMetricDefinitionId: string;

        sourceParticipantRole: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER' | null;

        sourceVariantId: string | null;

        thresholdValue: string;
      }
    }

    /**
     * Unit information if applicable
     */
    export interface Unit {
      /**
       * Name of the unit
       */
      name: string;

      /**
       * Symbol for the unit
       */
      symbol: string | null;
    }
  }

  export interface ThresholdMetricResponse {
    /**
     * Unique identifier for the metric definition
     */
    id: string;

    /**
     * Boolean metric derived by comparing a source metric against a threshold.
     */
    calculationType: 'THRESHOLD';

    /**
     * Description of what the metric measures
     */
    description: string;

    /**
     * Alias of `slug` retained for backwards compatibility. Same value as `slug`.
     */
    metricId: string;

    /**
     * Name of the metric
     */
    name: string;

    /**
     * True when this metric can only be scored from a live recording
     * (`supportedConversationSources` is `["LIVE"]`). Selecting one of these on a
     * simulation run forces live enrichment: the run waits for your recording and, if
     * none arrives, the metric produces no value. Check this before a run rather than
     * discovering the wait afterwards.
     */
    requiresLiveConversation: boolean;

    /**
     * Whether metric is global or per-participant
     */
    scope: 'GLOBAL' | 'PER_PARTICIPANT';

    /**
     * Stable metric slug (e.g. "call_reason", "customer_satisfaction")
     */
    slug: string;

    /**
     * Which levels this metric can produce values at
     */
    supportedContexts: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    /**
     * Which kinds of conversation this metric can be scored on. `null` means both.
     * `["LIVE"]` marks a metric that can only be scored from your own recording of a
     * real call, and `["SIMULATED"]` one that only applies to simulations.
     */
    supportedConversationSources: Array<'SIMULATED' | 'LIVE'> | null;

    /**
     * Whether you can create a variant of this metric with POST
     * /v1/metric/definitions/{idOrSlug}/variants. False for threshold metrics (their
     * configuration comes from the metric they derive from), for provider-computed
     * metrics whose calculation lives in the collector rather than an editable prompt,
     * and for metrics in a package that manages its own variants. Most of Roark’s own
     * metrics are false, so read this rather than discovering it from a 403.
     */
    supportsVariants: boolean;

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * The resolved variant this response reflects (org-scoped Default if the org has
     * customized it, otherwise the system Default). Pass this as sourceVariantId when
     * building a derived metric off this one to pin the exact config.
     */
    variantId: string;

    /**
     * The variant's current version. Immutable snapshot of the config — editing the
     * metric produces a new versionId. Use it to detect config changes.
     */
    versionId: string;

    /**
     * Threshold configuration.
     */
    threshold?: ThresholdMetricResponse.Threshold;

    /**
     * Unit information if applicable
     */
    unit?: ThresholdMetricResponse.Unit;
  }

  export namespace ThresholdMetricResponse {
    /**
     * Threshold configuration.
     */
    export interface Threshold {
      aggregationMode: 'EACH' | 'COUNT' | 'AVERAGE' | 'MIN' | 'MAX' | 'MEDIAN' | 'P95' | 'P99' | 'SUM';

      countThreshold: number | null;

      operator:
        | 'GREATER_THAN'
        | 'GREATER_THAN_OR_EQUALS'
        | 'LESS_THAN'
        | 'LESS_THAN_OR_EQUALS'
        | 'EQUALS'
        | 'NOT_EQUALS';

      sourceMetricDefinitionId: string;

      sourceParticipantRole: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER' | null;

      sourceVariantId: string | null;

      thresholdValue: string;
    }

    /**
     * Unit information if applicable
     */
    export interface Unit {
      /**
       * Name of the unit
       */
      name: string;

      /**
       * Symbol for the unit
       */
      symbol: string | null;
    }
  }
}

export type MetricCreateDefinitionParams =
  | MetricCreateDefinitionParams.PromptMetricInput
  | MetricCreateDefinitionParams.FormulaMetricInput
  | MetricCreateDefinitionParams.PatternMetricInput;

export declare namespace MetricCreateDefinitionParams {
  export interface PromptMetricInput {
    /**
     * LLM-evaluated metric.
     */
    calculationType: 'LLM_JUDGE';

    /**
     * Name of the metric
     */
    name: string;

    /**
     * Type of value this metric produces
     */
    outputType: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * ID of the analysis package to add this metric to. Optional: when omitted, the
     * metric is added to a default "Custom Metrics" package for your project (created
     * automatically the first time).
     */
    analysisPackageId?: string;

    /**
     * Label for the false case (only for BOOLEAN type)
     */
    booleanFalseLabel?: string;

    /**
     * Label for the true case (only for BOOLEAN type)
     */
    booleanTrueLabel?: string;

    /**
     * Options for classification. Required for CLASSIFICATION type.
     */
    classificationOptions?: Array<PromptMetricInput.ClassificationOption>;

    /**
     * LLM prompt/criteria for evaluating this metric. Required for BOOLEAN, NUMERIC,
     * TEXT, and SCALE types.
     */
    llmPrompt?: string;

    /**
     * Maximum number of classifications that can be selected (only for CLASSIFICATION
     * type)
     */
    maxClassifications?: number;

    /**
     * Alias of `slug` accepted for backwards compatibility. Use `slug` for new
     * integrations.
     */
    metricId?: string;

    /**
     * Participant role to evaluate. Required when scope is PER_PARTICIPANT.
     */
    participantRole?: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER';

    /**
     * Labels for scale ranges (only for SCALE type)
     */
    scaleLabels?: Array<PromptMetricInput.ScaleLabel>;

    /**
     * Maximum value for scale. Required for SCALE type.
     */
    scaleMax?: number;

    /**
     * Minimum value for scale. Required for SCALE type.
     */
    scaleMin?: number;

    /**
     * Whether metric is global or per-participant (default: GLOBAL)
     */
    scope?: 'GLOBAL' | 'PER_PARTICIPANT';

    /**
     * Stable slug for the metric. Auto-generated from name if omitted.
     */
    slug?: string;

    /**
     * Which levels this metric can produce values at (default: ["CALL"])
     */
    supportedContexts?: Array<'CALL' | 'SEGMENT' | 'TURN'>;
  }

  export namespace PromptMetricInput {
    /**
     * Option for classification metrics.
     */
    export interface ClassificationOption {
      description: string;

      displayOrder: number;

      label: string;
    }

    export interface ScaleLabel {
      /**
       * Display order of this label
       */
      displayOrder: number;

      /**
       * Label for this range
       */
      label: string;

      /**
       * Maximum value for this label range
       */
      rangeMax: number;

      /**
       * Minimum value for this label range
       */
      rangeMin: number;

      /**
       * Hex color code for this label (e.g. "#FF0000")
       */
      colorHex?: string;

      /**
       * Description of what this range means
       */
      description?: string;
    }
  }

  export interface FormulaMetricInput {
    /**
     * Metric computed by evaluating a mathematical expression over other metrics.
     */
    calculationType: 'FORMULA';

    /**
     * Formula expression using `{{id:<uuid>}}` references to source metrics. Operators
     * depend on output type: +, -, \*, / for NUMERIC; ==, !=, >=, <=, >, < for
     * BOOLEAN.
     */
    formula: string;

    /**
     * Name of the metric
     */
    name: string;

    /**
     * Output type of the formula. NUMERIC for arithmetic expressions, BOOLEAN for
     * comparison expressions.
     */
    outputType: 'NUMERIC' | 'BOOLEAN';

    /**
     * Source metrics referenced by the formula. Minimum 2.
     */
    sources: Array<FormulaMetricInput.Source>;

    /**
     * ID of the analysis package to add this metric to. Optional: when omitted, the
     * metric is added to a default "Custom Metrics" package for your project (created
     * automatically the first time).
     */
    analysisPackageId?: string;

    /**
     * Alias of `slug` accepted for backwards compatibility. Use `slug` for new
     * integrations.
     */
    metricId?: string;

    /**
     * Stable slug for the metric. Auto-generated from name if omitted.
     */
    slug?: string;
  }

  export namespace FormulaMetricInput {
    export interface Source {
      /**
       * ID of a metric referenced in the formula
       */
      sourceMetricDefinitionId: string;

      /**
       * Variant of the source metric to use
       */
      sourceVariantId?: string;
    }
  }

  export interface PatternMetricInput {
    /**
     * Metric detecting temporal patterns: a trigger condition followed by an outcome
     * within a window.
     */
    calculationType: 'PATTERN';

    /**
     * Name of the metric
     */
    name: string;

    /**
     * Pattern operation. PATTERN_EXISTS produces a BOOLEAN; PATTERN_COUNT produces a
     * NUMERIC count; OUTCOME_AGGREGATE aggregates a numeric outcome.
     */
    operation: 'PATTERN_EXISTS' | 'PATTERN_COUNT' | 'OUTCOME_AGGREGATE';

    /**
     * Outcome condition evaluated within the window relative to the trigger.
     */
    outcome: PatternMetricInput.Outcome;

    /**
     * ID of the analysis package to add this metric to. Optional: when omitted, the
     * metric is added to a default "Custom Metrics" package for your project (created
     * automatically the first time).
     */
    analysisPackageId?: string;

    /**
     * Alias of `slug` accepted for backwards compatibility. Use `slug` for new
     * integrations.
     */
    metricId?: string;

    /**
     * Stable slug for the metric. Auto-generated from name if omitted.
     */
    slug?: string;

    /**
     * Single trigger condition. Use either trigger or triggers + triggerCombinator.
     */
    trigger?: PatternMetricInput.Trigger;

    /**
     * How to combine multiple triggers. Required when triggers has more than 1 entry.
     */
    triggerCombinator?: 'AND' | 'OR';

    /**
     * Multiple trigger conditions. Use with triggerCombinator.
     */
    triggers?: Array<PatternMetricInput.Trigger>;

    /**
     * Unit for trigger/outcome window values (default: seconds)
     */
    windowMode?: 'seconds' | 'segments';
  }

  export namespace PatternMetricInput {
    /**
     * Outcome condition evaluated within the window relative to the trigger.
     */
    export interface Outcome {
      operator:
        | 'GREATER_THAN'
        | 'GREATER_THAN_OR_EQUALS'
        | 'LESS_THAN'
        | 'LESS_THAN_OR_EQUALS'
        | 'EQUALS'
        | 'NOT_EQUALS';

      sourceMetricDefinitionId: string;

      thresholdValue: string;

      /**
       * How far after the trigger to look for the outcome (in seconds or segments, see
       * windowMode)
       */
      windowAfter: number;

      sourceParticipantRole?: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER';

      sourceVariantId?: string;

      /**
       * How far before the trigger to look for the outcome (default: 0)
       */
      windowBefore?: number;
    }

    /**
     * Single trigger condition. Use either trigger or triggers + triggerCombinator.
     */
    export interface Trigger {
      operator:
        | 'GREATER_THAN'
        | 'GREATER_THAN_OR_EQUALS'
        | 'LESS_THAN'
        | 'LESS_THAN_OR_EQUALS'
        | 'EQUALS'
        | 'NOT_EQUALS';

      sourceMetricDefinitionId: string;

      thresholdValue: string;

      sourceParticipantRole?: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER';

      sourceVariantId?: string;
    }
  }
}

export interface MetricListDefinitionsParams {
  after?: string;

  limit?: number;
}

export interface MetricUpdateDefinitionParams {
  analysisPackageId?: unknown;

  /**
   * New label for the false case (BOOLEAN output only)
   */
  booleanFalseLabel?: string;

  /**
   * New label for the true case (BOOLEAN output only)
   */
  booleanTrueLabel?: string;

  calcType?: unknown;

  /**
   * Optional free-text audit note recorded on the new version.
   */
  changeReason?: string;

  /**
   * Replacement set of classification options (CLASSIFICATION output only)
   */
  classificationOptions?: Array<MetricUpdateDefinitionParams.ClassificationOption>;

  /**
   * New formula expression (FORMULA only). Pass `sources` alongside if the
   * referenced metrics change.
   */
  formula?: string;

  /**
   * New LLM prompt (only for LLM_JUDGE metrics whose prompt is editable)
   */
  llmPrompt?: string;

  /**
   * New maximum number of classifications (CLASSIFICATION output only)
   */
  maxClassifications?: number;

  metricId?: unknown;

  /**
   * New name (only for metrics whose name is editable)
   */
  name?: string;

  organizationId?: unknown;

  outputType?: unknown;

  participantRole?: unknown;

  projectId?: unknown;

  /**
   * Replacement set of scale-range labels (SCALE output only)
   */
  scaleLabels?: Array<MetricUpdateDefinitionParams.ScaleLabel>;

  /**
   * New scale maximum (SCALE output only)
   */
  scaleMax?: number;

  /**
   * New scale minimum (SCALE output only)
   */
  scaleMin?: number;

  scope?: unknown;

  slug?: unknown;

  source?: unknown;

  /**
   * Replacement formula sources, required when `formula` changes the referenced
   * metrics (FORMULA only).
   */
  sources?: Array<MetricUpdateDefinitionParams.Source>;

  /**
   * Replacement set of supported contexts. Omit to leave unchanged.
   */
  supportedContexts?: Array<'CALL' | 'SEGMENT' | 'TURN'>;

  supportsMultipleVariants?: unknown;

  /**
   * Replacement set of scoped tool-definition ids (only for metrics whose tool
   * scoping is editable)
   */
  toolDefinitionIds?: Array<string>;
}

export namespace MetricUpdateDefinitionParams {
  /**
   * Option for classification metrics.
   */
  export interface ClassificationOption {
    description: string;

    displayOrder: number;

    label: string;
  }

  export interface ScaleLabel {
    /**
     * Display order of this label
     */
    displayOrder: number;

    /**
     * Label for this range
     */
    label: string;

    /**
     * Maximum value for this label range
     */
    rangeMax: number;

    /**
     * Minimum value for this label range
     */
    rangeMin: number;

    /**
     * Hex color code for this label (e.g. "#FF0000")
     */
    colorHex?: string;

    /**
     * Description of what this range means
     */
    description?: string;
  }

  export interface Source {
    /**
     * ID of a metric referenced in the formula
     */
    sourceMetricDefinitionId: string;

    /**
     * Variant of the source metric to use
     */
    sourceVariantId?: string;
  }
}

export declare namespace Metric {
  export {
    type MetricCreateDefinitionResponse as MetricCreateDefinitionResponse,
    type MetricListDefinitionsResponse as MetricListDefinitionsResponse,
    type MetricUpdateDefinitionResponse as MetricUpdateDefinitionResponse,
    type MetricCreateDefinitionParams as MetricCreateDefinitionParams,
    type MetricListDefinitionsParams as MetricListDefinitionsParams,
    type MetricUpdateDefinitionParams as MetricUpdateDefinitionParams,
  };
}
