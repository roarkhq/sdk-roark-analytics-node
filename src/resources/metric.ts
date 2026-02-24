// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Metric extends APIResource {
  /**
   * Create a new custom metric definition. The metric will be added to the specified
   * analysis package and can be used for evaluating calls.
   *
   * @example
   * ```ts
   * const response = await client.metric.createDefinition({
   *   analysisPackageId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
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
   * system-generated and custom metrics. Only returns metrics from enabled analysis
   * packages.
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
   * Metric definition data
   */
  data: MetricCreateDefinitionResponse.Data;
}

export namespace MetricCreateDefinitionResponse {
  /**
   * Metric definition data
   */
  export interface Data {
    /**
     * Unique identifier for the metric definition
     */
    id: string;

    /**
     * Description of what the metric measures
     */
    description: string;

    /**
     * Stable metric identifier (e.g. "call_reason", "customer_satisfaction")
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
     * Which levels this metric can produce values at
     */
    supportedContexts: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * Unit information if applicable
     */
    unit?: Data.Unit;
  }

  export namespace Data {
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
  data: Array<MetricListDefinitionsResponse.Data>;
}

export namespace MetricListDefinitionsResponse {
  /**
   * Metric definition data
   */
  export interface Data {
    /**
     * Unique identifier for the metric definition
     */
    id: string;

    /**
     * Description of what the metric measures
     */
    description: string;

    /**
     * Stable metric identifier (e.g. "call_reason", "customer_satisfaction")
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
     * Which levels this metric can produce values at
     */
    supportedContexts: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    /**
     * Type of value this metric produces
     */
    type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

    /**
     * Unit information if applicable
     */
    unit?: Data.Unit;
  }

  export namespace Data {
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

export interface MetricCreateDefinitionParams {
  /**
   * ID of the analysis package to add this metric to
   */
  analysisPackageId: string;

  /**
   * Name of the metric
   */
  name: string;

  /**
   * Type of value this metric produces
   */
  outputType: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';

  /**
   * Label for the false/negative case (only for BOOLEAN type)
   */
  booleanFalseLabel?: string;

  /**
   * Label for the true/positive case (only for BOOLEAN type)
   */
  booleanTrueLabel?: string;

  /**
   * Options for classification. Required for CLASSIFICATION type.
   */
  classificationOptions?: Array<MetricCreateDefinitionParams.ClassificationOption>;

  /**
   * LLM prompt/criteria for evaluating this metric. Used to instruct the model on
   * how to score. Required for BOOLEAN, NUMERIC, TEXT, and SCALE types.
   */
  llmPrompt?: string;

  /**
   * Maximum number of classifications that can be selected (only for CLASSIFICATION
   * type)
   */
  maxClassifications?: number;

  /**
   * Unique identifier for the metric (e.g. "customer_satisfaction"). Auto-generated
   * from name if not provided.
   */
  metricId?: string;

  /**
   * Participant role to evaluate. Required when scope is PER_PARTICIPANT.
   */
  participantRole?: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER';

  /**
   * Labels for scale ranges (only for SCALE type)
   */
  scaleLabels?: Array<MetricCreateDefinitionParams.ScaleLabel>;

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
   * Which levels this metric can produce values at (default: ["CALL"])
   */
  supportedContexts?: Array<'CALL' | 'SEGMENT' | 'TURN'>;
}

export namespace MetricCreateDefinitionParams {
  export interface ClassificationOption {
    /**
     * Description of what this option means
     */
    description: string;

    /**
     * Display order of this option
     */
    displayOrder: number;

    /**
     * Label for this classification option
     */
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

export declare namespace Metric {
  export {
    type MetricCreateDefinitionResponse as MetricCreateDefinitionResponse,
    type MetricListDefinitionsResponse as MetricListDefinitionsResponse,
    type MetricCreateDefinitionParams as MetricCreateDefinitionParams,
  };
}
