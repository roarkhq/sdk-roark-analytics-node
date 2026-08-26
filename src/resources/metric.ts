// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

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
   *   analysisPackageId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
   * Fetch all metric definitions available in the project, including both
   * system-generated and custom metrics.
   *
   * @example
   * ```ts
   * const response = await client.metric.listDefinitions();
   * ```
   */
  listDefinitions(options?: RequestOptions): APIPromise<MetricListDefinitionsResponse> {
    return this._client.get('/v1/metric/definitions', options);
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
     * Metric evaluated by an LLM against a prompt.
     */
    calculationType: 'LLM_JUDGE';

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

export interface MetricListDefinitionsResponse {
  /**
   * Metrics response payload
   */
  data: Array<
    | MetricListDefinitionsResponse.LlmJudgeMetricResponse
    | MetricListDefinitionsResponse.ProviderMetricResponse
    | MetricListDefinitionsResponse.ThresholdMetricResponse
    | MetricListDefinitionsResponse.FormulaMetricResponse
    | MetricListDefinitionsResponse.PatternMetricResponse
  >;
}

export namespace MetricListDefinitionsResponse {
  export interface LlmJudgeMetricResponse {
    /**
     * Unique identifier for the metric definition
     */
    id: string;

    /**
     * Metric evaluated by an LLM against a prompt.
     */
    calculationType: 'LLM_JUDGE';

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

export type MetricCreateDefinitionParams =
  | MetricCreateDefinitionParams.PromptMetricInput
  | MetricCreateDefinitionParams.FormulaMetricInput
  | MetricCreateDefinitionParams.PatternMetricInput;

export declare namespace MetricCreateDefinitionParams {
  export interface PromptMetricInput {
    /**
     * ID of the analysis package to add this metric to
     */
    analysisPackageId: string;

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
     * ID of the analysis package to add this metric to
     */
    analysisPackageId: string;

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
     * ID of the analysis package to add this metric to
     */
    analysisPackageId: string;

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

export declare namespace Metric {
  export {
    type MetricCreateDefinitionResponse as MetricCreateDefinitionResponse,
    type MetricListDefinitionsResponse as MetricListDefinitionsResponse,
    type MetricCreateDefinitionParams as MetricCreateDefinitionParams,
  };
}
