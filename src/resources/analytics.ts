// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Analytics extends APIResource {
  /**
   * Lists what can go into an analytics query for this project: every metric by slug
   * with its output type, default aggregation and the aggregations it supports; the
   * measure types; the filter and breakdown types with the properties each accepts;
   * and the custom call properties seen in the project. Read this first when
   * building a query.
   *
   * @example
   * ```ts
   * const response = await client.analytics.getSchema();
   * ```
   */
  getSchema(options?: RequestOptions): APIPromise<AnalyticsGetSchemaResponse> {
    return this._client.get('/v1/analytics/schema', options);
  }

  /**
   * Aggregates metric values and conversation counts over a time window and returns
   * one series per measure, with a total for the window and per-interval buckets.
   * The same query a dashboard widget runs, without saving anything.
   *
   * - `measures`: what to aggregate. A METRIC measure names its metric by slug;
   *   CONVERSATION counts conversations; UPTIME reads health checks. The aggregation
   *   defaults by the metric's output type.
   * - `timeRange`: LAST n DAYS/WEEKS/MONTHS, a CALENDAR_ALIGNED period (TODAY,
   *   THIS_MONTH, ...), FIXED from/to, or SINCE. Defaults to the last 30 days; at
   *   most 731 days. Calendar periods and buckets align to `timezone` (IANA, default
   *   UTC).
   * - `filters` apply to every measure; a measure's own `filters` add to them.
   * - `breakdown` on a measure returns one series per value (largest 50 kept).
   * - `comparisonGroups` (2 to 5) run every measure once per named filter set;
   *   `comparisonMode: PREVIOUS_PERIOD` adds the preceding window's values.
   *
   * Values are in the metric's display units. A PASS_RATE is a 0 to 1 share;
   * `sampleSize` 0 means no data. A query the analytics store cannot answer returns
   * 400 naming the unsupported part.
   *
   * @example
   * ```ts
   * const response = await client.analytics.query({
   *   measures: [{}],
   * });
   * ```
   */
  query(body: AnalyticsQueryParams, options?: RequestOptions): APIPromise<AnalyticsQueryResponse> {
    return this._client.post('/v1/analytics/query', { body, ...options });
  }
}

export interface AnalyticsGetSchemaResponse {
  /**
   * What can be queried in this project: metrics (by slug), measure types, filters,
   * breakdowns.
   */
  data: AnalyticsGetSchemaResponse.Data;
}

export namespace AnalyticsGetSchemaResponse {
  /**
   * What can be queried in this project: metrics (by slug), measure types, filters,
   * breakdowns.
   */
  export interface Data {
    breakdowns: Array<Data.Breakdown>;

    callProperties: Array<Data.CallProperty>;

    displayTypes: Array<'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE'>;

    filters: Array<Data.Filter>;

    intervals: Array<'HOUR' | 'DAY' | 'WEEK' | 'MONTH'>;

    measureTypes: Array<Data.MeasureType>;

    metrics: Array<Data.Metric>;

    operators: Array<
      | 'EQUALS'
      | 'NOT_EQUALS'
      | 'GREATER_THAN'
      | 'GREATER_THAN_OR_EQUAL_TO'
      | 'LESS_THAN'
      | 'LESS_THAN_OR_EQUAL_TO'
      | 'CONTAINS'
      | 'STARTS_WITH'
    >;
  }

  export namespace Data {
    export interface Breakdown {
      description: string;

      type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'DATASET';
    }

    export interface CallProperty {
      isSystem: boolean;

      name: string;

      valueType: string;
    }

    export interface Filter {
      description: string;

      properties: Array<Filter.Property>;

      type:
        | 'METRIC_PROPERTY'
        | 'CALL_PROPERTY'
        | 'AGENT_PROPERTY'
        | 'CALL_ID'
        | 'MODALITY'
        | 'DATASET'
        | 'METRIC_VALUE';
    }

    export namespace Filter {
      export interface Property {
        description: string;

        property: string;
      }
    }

    export interface MeasureType {
      aggregations: Array<'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE'>;

      description: string;

      type: 'METRIC' | 'CONVERSATION' | 'UPTIME';
    }

    export interface Metric {
      id: string;

      aggregations: Array<'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE'>;

      defaultAggregation: 'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE';

      isThreshold: boolean;

      name: string;

      outputType: string;

      slug: string;
    }
  }
}

export interface AnalyticsQueryResponse {
  /**
   * One series per measure (or per breakdown value / comparison group). `value` is
   * the aggregate over the whole window; `buckets` hold the per-interval values.
   */
  data: AnalyticsQueryResponse.Data;
}

export namespace AnalyticsQueryResponse {
  /**
   * One series per measure (or per breakdown value / comparison group). `value` is
   * the aggregate over the whole window; `buckets` hold the per-interval values.
   */
  export interface Data {
    from: string;

    interval: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

    omittedSeries: number;

    series: Array<Data.Sery>;

    timezone: string;

    to: string;
  }

  export namespace Data {
    export interface Sery {
      aggregation: 'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE';

      breakdownValue: string | null;

      buckets: Array<Sery.Bucket>;

      comparisonGroup: string | null;

      comparisonValue: number | null;

      measureIndex: number;

      metric: string | null;

      percentageOfBaseline: number | null;

      sampleSize: number | null;

      type: 'METRIC' | 'CONVERSATION' | 'UPTIME';

      value: number;
    }

    export namespace Sery {
      export interface Bucket {
        date: string;

        value: number;

        comparisonDate?: string;

        comparisonValue?: number;

        passed?: number;

        percentageOfBaseline?: number;

        sampleSize?: number;
      }
    }
  }
}

export interface AnalyticsQueryParams {
  /**
   * What to aggregate: 1 to 10 measures.
   */
  measures: Array<AnalyticsQueryParams.Measure>;

  /**
   * Run every measure once per named filter set, e.g. one group per agent.
   */
  comparisonGroups?: Array<AnalyticsQueryParams.ComparisonGroup>;

  /**
   * PREVIOUS_PERIOD adds the preceding window of the same length to every series.
   */
  comparisonMode?: 'NONE' | 'PREVIOUS_PERIOD';

  /**
   * Applied to every measure, on top of each measure's own filters.
   */
  filters?: Array<AnalyticsQueryParams.Filter>;

  /**
   * Set false to return only the window totals.
   */
  includeBuckets?: boolean;

  /**
   * Bucket size. Defaults from the window's length and steps coarser when the window
   * would exceed 500 buckets.
   */
  interval?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

  /**
   * Defaults to the last 30 days.
   */
  timeRange?:
    | AnalyticsQueryParams.UnionMember0
    | AnalyticsQueryParams.UnionMember1
    | AnalyticsQueryParams.UnionMember2
    | AnalyticsQueryParams.UnionMember3;

  /**
   * IANA zone that buckets and calendar periods align to, e.g. America/New_York.
   * Defaults to UTC.
   */
  timezone?: string;
}

export namespace AnalyticsQueryParams {
  export interface Measure {
    /**
     * Defaults by output type: AVG for numeric metrics, COUNT (split by value) for
     * classification and text, PASS_RATE for thresholds and uptime, COUNT for
     * conversations.
     */
    aggregation?: 'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE';

    /**
     * Split the measure into one series per value of this dimension (the largest 50
     * are returned). Ignored while comparisonGroups are set: each group is then one
     * series.
     */
    breakdown?: Measure.Breakdown;

    /**
     * Chart color on a dashboard.
     */
    color?:
      | 'GREEN'
      | 'RED'
      | 'ORANGE'
      | 'PURPLE'
      | 'GREY'
      | 'BLUE'
      | 'PEACH'
      | 'TEAL'
      | 'INDIGO'
      | 'AMBER'
      | 'ROSE'
      | 'CYAN';

    /**
     * CALL (default for metrics) folds each conversation to one value first, so a long
     * call does not outweigh a short one. NONE aggregates every value.
     */
    distinctBy?: 'NONE' | 'CALL';

    /**
     * Filters for this measure only, on top of the query's filters.
     */
    filters?: Array<Measure.Filter>;

    /**
     * Mark one measure as the baseline: every series also reports its value as a
     * percentage of it.
     */
    isBaseline?: boolean;

    /**
     * The metric's slug (e.g. `task_completion`) or id. Required for METRIC.
     */
    metric?: string;

    /**
     * How each conversation is folded when distinctBy is CALL. Defaults to SUM under
     * SUM, else AVG.
     */
    nestedAggregation?: 'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE';

    nestedAggregationPercentile?: number;

    /**
     * PASS_RATE condition operator. Omit for a threshold metric: its own condition is
     * used.
     */
    passOperator?:
      | 'EQUALS'
      | 'NOT_EQUALS'
      | 'GREATER_THAN'
      | 'GREATER_THAN_OR_EQUAL_TO'
      | 'LESS_THAN'
      | 'LESS_THAN_OR_EQUAL_TO'
      | 'CONTAINS'
      | 'STARTS_WITH';

    /**
     * PASS_RATE condition value, e.g. 4 or "resolved".
     */
    passValue?: string | number | boolean;

    /**
     * Required with PERCENTILE, e.g. 95.
     */
    percentile?: number;

    /**
     * METRIC (default): a metric's values. CONVERSATION: conversation counts. UPTIME:
     * health-check outcomes.
     */
    type?: 'METRIC' | 'CONVERSATION' | 'UPTIME';
  }

  export namespace Measure {
    /**
     * Split the measure into one series per value of this dimension (the largest 50
     * are returned). Ignored while comparisonGroups are set: each group is then one
     * series.
     */
    export interface Breakdown {
      type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'DATASET';

      /**
       * The property to split by. Required for CALL_PROPERTY and METRIC_PROPERTY.
       */
      property?: string;
    }

    export interface Filter {
      /**
       * What the filter narrows on. GET /v1/analytics/schema lists each type.
       */
      type:
        | 'METRIC_PROPERTY'
        | 'CALL_PROPERTY'
        | 'AGENT_PROPERTY'
        | 'CALL_ID'
        | 'MODALITY'
        | 'DATASET'
        | 'METRIC_VALUE';

      /**
       * The value to compare against (an agent id, "call" / "chat", a property value).
       */
      value: string | number | boolean;

      /**
       * Defaults to EQUALS.
       */
      operator?:
        | 'EQUALS'
        | 'NOT_EQUALS'
        | 'GREATER_THAN'
        | 'GREATER_THAN_OR_EQUAL_TO'
        | 'LESS_THAN'
        | 'LESS_THAN_OR_EQUAL_TO'
        | 'CONTAINS'
        | 'STARTS_WITH';

      /**
       * The property to compare. Required for CALL_PROPERTY and METRIC_PROPERTY; may be
       * omitted for AGENT_PROPERTY, DATASET, MODALITY and CALL_ID.
       */
      property?: string;
    }
  }

  export interface ComparisonGroup {
    filters: Array<ComparisonGroup.Filter>;

    /**
     * The series label; unique within the query.
     */
    name: string;

    color?:
      | 'GREEN'
      | 'RED'
      | 'ORANGE'
      | 'PURPLE'
      | 'GREY'
      | 'BLUE'
      | 'PEACH'
      | 'TEAL'
      | 'INDIGO'
      | 'AMBER'
      | 'ROSE'
      | 'CYAN';
  }

  export namespace ComparisonGroup {
    export interface Filter {
      /**
       * What the filter narrows on. GET /v1/analytics/schema lists each type.
       */
      type:
        | 'METRIC_PROPERTY'
        | 'CALL_PROPERTY'
        | 'AGENT_PROPERTY'
        | 'CALL_ID'
        | 'MODALITY'
        | 'DATASET'
        | 'METRIC_VALUE';

      /**
       * The value to compare against (an agent id, "call" / "chat", a property value).
       */
      value: string | number | boolean;

      /**
       * Defaults to EQUALS.
       */
      operator?:
        | 'EQUALS'
        | 'NOT_EQUALS'
        | 'GREATER_THAN'
        | 'GREATER_THAN_OR_EQUAL_TO'
        | 'LESS_THAN'
        | 'LESS_THAN_OR_EQUAL_TO'
        | 'CONTAINS'
        | 'STARTS_WITH';

      /**
       * The property to compare. Required for CALL_PROPERTY and METRIC_PROPERTY; may be
       * omitted for AGENT_PROPERTY, DATASET, MODALITY and CALL_ID.
       */
      property?: string;
    }
  }

  export interface Filter {
    /**
     * What the filter narrows on. GET /v1/analytics/schema lists each type.
     */
    type:
      | 'METRIC_PROPERTY'
      | 'CALL_PROPERTY'
      | 'AGENT_PROPERTY'
      | 'CALL_ID'
      | 'MODALITY'
      | 'DATASET'
      | 'METRIC_VALUE';

    /**
     * The value to compare against (an agent id, "call" / "chat", a property value).
     */
    value: string | number | boolean;

    /**
     * Defaults to EQUALS.
     */
    operator?:
      | 'EQUALS'
      | 'NOT_EQUALS'
      | 'GREATER_THAN'
      | 'GREATER_THAN_OR_EQUAL_TO'
      | 'LESS_THAN'
      | 'LESS_THAN_OR_EQUAL_TO'
      | 'CONTAINS'
      | 'STARTS_WITH';

    /**
     * The property to compare. Required for CALL_PROPERTY and METRIC_PROPERTY; may be
     * omitted for AGENT_PROPERTY, DATASET, MODALITY and CALL_ID.
     */
    property?: string;
  }

  export interface UnionMember0 {
    type: 'LAST';

    unit: 'DAYS' | 'WEEKS' | 'MONTHS';

    value: number;
  }

  export interface UnionMember1 {
    period:
      | 'TODAY'
      | 'YESTERDAY'
      | 'THIS_WEEK'
      | 'LAST_WEEK'
      | 'THIS_MONTH'
      | 'LAST_MONTH'
      | 'THIS_YEAR'
      | 'LAST_YEAR';

    type: 'CALENDAR_ALIGNED';
  }

  export interface UnionMember2 {
    from: string;

    to: string;

    type: 'FIXED';
  }

  export interface UnionMember3 {
    from: string;

    type: 'SINCE';
  }
}

export declare namespace Analytics {
  export {
    type AnalyticsGetSchemaResponse as AnalyticsGetSchemaResponse,
    type AnalyticsQueryResponse as AnalyticsQueryResponse,
    type AnalyticsQueryParams as AnalyticsQueryParams,
  };
}
