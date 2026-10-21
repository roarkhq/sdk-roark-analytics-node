// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Dashboard extends APIResource {
  /**
   * Creates a dashboard with its widgets. Each widget is an analytics query (see
   * POST /v1/analytics/query) with a name unique on the dashboard, a `display`
   * (LINE, NUMBER, RADAR, STACKED_BAR, TABLE) and a `size` (SMALL, MEDIUM, LARGE,
   * EXTRA_LARGE). Widgets render top to bottom in the order given.
   *
   * Dashboard `filters` apply over every widget and must be conversation-level:
   * AGENT_PROPERTY, CALL_PROPERTY, MODALITY, DATASET or METRIC_VALUE. On a field a
   * widget already filters, the dashboard's wins.
   *
   * @example
   * ```ts
   * const dashboard = await client.dashboard.create({
   *   name: 'x',
   * });
   * ```
   */
  create(body: DashboardCreateParams, options?: RequestOptions): APIPromise<DashboardCreateResponse> {
    return this._client.post('/v1/dashboard', { body, ...options });
  }

  /**
   * Edits a dashboard. Omitted fields keep their current value. `widgets`, when
   * sent, replaces the list: widgets are matched by name, so a widget that keeps its
   * name keeps its id; a new name adds a widget and a name no longer listed removes
   * it. To change one widget, PUT /v1/dashboard/{dashboardId}/widget/{widgetId}.
   *
   * @example
   * ```ts
   * const dashboard = await client.dashboard.update(
   *   '6f1d2c3b-4a5e-4f60-8b71-9c0d1e2f3a4b',
   * );
   * ```
   */
  update(
    dashboardID: string,
    body: DashboardUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DashboardUpdateResponse> {
    return this._client.put(path`/v1/dashboard/${dashboardID}`, { body, ...options });
  }

  /**
   * Lists the project's dashboards, the default first. GET
   * /v1/dashboard/{dashboardId} returns the widgets.
   *
   * @example
   * ```ts
   * const dashboards = await client.dashboard.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<DashboardListResponse> {
    return this._client.get('/v1/dashboard', options);
  }

  /**
   * Deletes a dashboard and its widgets. If it was the default, another dashboard
   * becomes the default. A dashboard managed by config as code returns 409.
   *
   * @example
   * ```ts
   * const dashboard = await client.dashboard.delete(
   *   '6f1d2c3b-4a5e-4f60-8b71-9c0d1e2f3a4b',
   * );
   * ```
   */
  delete(dashboardID: string, options?: RequestOptions): APIPromise<DashboardDeleteResponse> {
    return this._client.delete(path`/v1/dashboard/${dashboardID}`, options);
  }

  /**
   * Adds a widget to the top of a dashboard. Its name must be unique on the
   * dashboard.
   *
   * @example
   * ```ts
   * const response = await client.dashboard.createWidget(
   *   '6f1d2c3b-4a5e-4f60-8b71-9c0d1e2f3a4b',
   *   { measures: [{}], name: 'x' },
   * );
   * ```
   */
  createWidget(
    dashboardID: string,
    body: DashboardCreateWidgetParams,
    options?: RequestOptions,
  ): APIPromise<DashboardCreateWidgetResponse> {
    return this._client.post(path`/v1/dashboard/${dashboardID}/widget`, { body, ...options });
  }

  /**
   * Removes a widget from a dashboard.
   *
   * @example
   * ```ts
   * const response = await client.dashboard.deleteWidget(
   *   '7a8b9c0d-1e2f-4a3b-8c4d-5e6f7a8b9c0d',
   *   { dashboardId: '6f1d2c3b-4a5e-4f60-8b71-9c0d1e2f3a4b' },
   * );
   * ```
   */
  deleteWidget(
    widgetID: string,
    params: DashboardDeleteWidgetParams,
    options?: RequestOptions,
  ): APIPromise<DashboardDeleteWidgetResponse> {
    const { dashboardId } = params;
    return this._client.delete(path`/v1/dashboard/${dashboardId}/widget/${widgetID}`, options);
  }

  /**
   * Returns a dashboard with its widgets top to bottom, each in the shape POST
   * /v1/dashboard accepts, so a dashboard can be read, edited and written back.
   *
   * @example
   * ```ts
   * const response = await client.dashboard.getByID(
   *   '6f1d2c3b-4a5e-4f60-8b71-9c0d1e2f3a4b',
   * );
   * ```
   */
  getByID(dashboardID: string, options?: RequestOptions): APIPromise<DashboardGetByIDResponse> {
    return this._client.get(path`/v1/dashboard/${dashboardID}`, options);
  }

  /**
   * Runs every widget on the dashboard and returns each one's series, exactly as the
   * dashboard shows them: over the dashboard's saved window and with its filters
   * applied. Pass `from` (and optionally `to`) to read a different window, and
   * `timezone` to align buckets to a zone.
   *
   * @example
   * ```ts
   * const response =
   *   await client.dashboard.getData('dashboardId');
   * ```
   */
  getData(
    dashboardID: string,
    query: DashboardGetDataParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DashboardGetDataResponse> {
    return this._client.get(path`/v1/dashboard/${dashboardID}/data`, { query, ...options });
  }

  /**
   * Runs one widget and returns its series, as it reads on its dashboard (the
   * dashboard's window and filters). Accepts the same `from` / `to` / `timezone`
   * overrides as GET /v1/dashboard/{dashboardId}/data.
   *
   * @example
   * ```ts
   * const response = await client.dashboard.getWidgetData(
   *   'widgetId',
   *   { dashboardId: 'dashboardId' },
   * );
   * ```
   */
  getWidgetData(
    widgetID: string,
    params: DashboardGetWidgetDataParams,
    options?: RequestOptions,
  ): APIPromise<DashboardGetWidgetDataResponse> {
    const { dashboardId, ...query } = params;
    return this._client.get(path`/v1/dashboard/${dashboardId}/widget/${widgetID}/data`, {
      query,
      ...options,
    });
  }

  /**
   * Replaces a widget's definition. It keeps its id and its place on the dashboard.
   *
   * @example
   * ```ts
   * const response = await client.dashboard.updateWidget(
   *   '7a8b9c0d-1e2f-4a3b-8c4d-5e6f7a8b9c0d',
   *   {
   *     dashboardId: '6f1d2c3b-4a5e-4f60-8b71-9c0d1e2f3a4b',
   *     measures: [{}],
   *     name: 'x',
   *   },
   * );
   * ```
   */
  updateWidget(
    widgetID: string,
    params: DashboardUpdateWidgetParams,
    options?: RequestOptions,
  ): APIPromise<DashboardUpdateWidgetResponse> {
    const { dashboardId, ...body } = params;
    return this._client.put(path`/v1/dashboard/${dashboardId}/widget/${widgetID}`, { body, ...options });
  }
}

export interface DashboardCreateResponse {
  data: DashboardCreateResponse.Data;
}

export namespace DashboardCreateResponse {
  export interface Data {
    id: string;

    /**
     * Managed by config as code (`kind: dashboard`). A managed dashboard is read-only
     * here: edits return 409; change it in the config file.
     */
    configManaged: boolean;

    createdAt: string;

    description: string | null;

    filters: Array<Data.Filter>;

    isDefault: boolean;

    name: string;

    /**
     * The window: LAST n DAYS/WEEKS/MONTHS up to now, a CALENDAR_ALIGNED period
     * (TODAY, YESTERDAY, THIS_WEEK, LAST_WEEK, THIS_MONTH, LAST_MONTH, THIS_YEAR,
     * LAST_YEAR), FIXED from/to, or SINCE a date. At most 731 days (two years).
     */
    timeRange: Data.UnionMember0 | Data.UnionMember1 | Data.UnionMember2 | Data.UnionMember3 | null;

    updatedAt: string;

    widgets: Array<Data.Widget>;
  }

  export namespace Data {
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

    export interface Widget {
      id: string;

      /**
       * What to aggregate: 1 to 10 measures.
       */
      measures: Array<Widget.Measure>;

      /**
       * Unique on the dashboard: how the widget is matched on update.
       */
      name: string;

      /**
       * Run every measure once per named filter set, e.g. one group per agent.
       */
      comparisonGroups?: Array<Widget.ComparisonGroup>;

      /**
       * PREVIOUS_PERIOD adds the preceding window of the same length to every series.
       */
      comparisonMode?: 'NONE' | 'PREVIOUS_PERIOD';

      description?: string;

      /**
       * Chart type. Defaults to LINE.
       */
      display?: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

      /**
       * Applied to every measure, on top of each measure's own filters.
       */
      filters?: Array<Widget.Filter>;

      /**
       * Bucket size. Defaults from the window's length and steps coarser when the window
       * would exceed 500 buckets.
       */
      interval?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

      /**
       * Grid width. Defaults to MEDIUM.
       */
      size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
    }

    export namespace Widget {
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
    }
  }
}

export interface DashboardUpdateResponse {
  data: DashboardUpdateResponse.Data;
}

export namespace DashboardUpdateResponse {
  export interface Data {
    id: string;

    /**
     * Managed by config as code (`kind: dashboard`). A managed dashboard is read-only
     * here: edits return 409; change it in the config file.
     */
    configManaged: boolean;

    createdAt: string;

    description: string | null;

    filters: Array<Data.Filter>;

    isDefault: boolean;

    name: string;

    /**
     * The window: LAST n DAYS/WEEKS/MONTHS up to now, a CALENDAR_ALIGNED period
     * (TODAY, YESTERDAY, THIS_WEEK, LAST_WEEK, THIS_MONTH, LAST_MONTH, THIS_YEAR,
     * LAST_YEAR), FIXED from/to, or SINCE a date. At most 731 days (two years).
     */
    timeRange: Data.UnionMember0 | Data.UnionMember1 | Data.UnionMember2 | Data.UnionMember3 | null;

    updatedAt: string;

    widgets: Array<Data.Widget>;
  }

  export namespace Data {
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

    export interface Widget {
      id: string;

      /**
       * What to aggregate: 1 to 10 measures.
       */
      measures: Array<Widget.Measure>;

      /**
       * Unique on the dashboard: how the widget is matched on update.
       */
      name: string;

      /**
       * Run every measure once per named filter set, e.g. one group per agent.
       */
      comparisonGroups?: Array<Widget.ComparisonGroup>;

      /**
       * PREVIOUS_PERIOD adds the preceding window of the same length to every series.
       */
      comparisonMode?: 'NONE' | 'PREVIOUS_PERIOD';

      description?: string;

      /**
       * Chart type. Defaults to LINE.
       */
      display?: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

      /**
       * Applied to every measure, on top of each measure's own filters.
       */
      filters?: Array<Widget.Filter>;

      /**
       * Bucket size. Defaults from the window's length and steps coarser when the window
       * would exceed 500 buckets.
       */
      interval?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

      /**
       * Grid width. Defaults to MEDIUM.
       */
      size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
    }

    export namespace Widget {
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
    }
  }
}

export interface DashboardListResponse {
  data: Array<DashboardListResponse.Data>;
}

export namespace DashboardListResponse {
  export interface Data {
    id: string;

    /**
     * Managed by config as code (`kind: dashboard`). A managed dashboard is read-only
     * here: edits return 409; change it in the config file.
     */
    configManaged: boolean;

    createdAt: string;

    description: string | null;

    isDefault: boolean;

    name: string;

    /**
     * The window: LAST n DAYS/WEEKS/MONTHS up to now, a CALENDAR_ALIGNED period
     * (TODAY, YESTERDAY, THIS_WEEK, LAST_WEEK, THIS_MONTH, LAST_MONTH, THIS_YEAR,
     * LAST_YEAR), FIXED from/to, or SINCE a date. At most 731 days (two years).
     */
    timeRange: Data.UnionMember0 | Data.UnionMember1 | Data.UnionMember2 | Data.UnionMember3 | null;

    updatedAt: string;
  }

  export namespace Data {
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
}

export interface DashboardDeleteResponse {
  data: DashboardDeleteResponse.Data;
}

export namespace DashboardDeleteResponse {
  export interface Data {
    id: string;

    deleted: true;
  }
}

export interface DashboardCreateWidgetResponse {
  data: DashboardCreateWidgetResponse.Data;
}

export namespace DashboardCreateWidgetResponse {
  export interface Data {
    id: string;

    /**
     * What to aggregate: 1 to 10 measures.
     */
    measures: Array<Data.Measure>;

    /**
     * Unique on the dashboard: how the widget is matched on update.
     */
    name: string;

    /**
     * Run every measure once per named filter set, e.g. one group per agent.
     */
    comparisonGroups?: Array<Data.ComparisonGroup>;

    /**
     * PREVIOUS_PERIOD adds the preceding window of the same length to every series.
     */
    comparisonMode?: 'NONE' | 'PREVIOUS_PERIOD';

    description?: string;

    /**
     * Chart type. Defaults to LINE.
     */
    display?: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

    /**
     * Applied to every measure, on top of each measure's own filters.
     */
    filters?: Array<Data.Filter>;

    /**
     * Bucket size. Defaults from the window's length and steps coarser when the window
     * would exceed 500 buckets.
     */
    interval?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

    /**
     * Grid width. Defaults to MEDIUM.
     */
    size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
  }

  export namespace Data {
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
  }
}

export interface DashboardDeleteWidgetResponse {
  data: DashboardDeleteWidgetResponse.Data;
}

export namespace DashboardDeleteWidgetResponse {
  export interface Data {
    id: string;

    deleted: true;
  }
}

export interface DashboardGetByIDResponse {
  data: DashboardGetByIDResponse.Data;
}

export namespace DashboardGetByIDResponse {
  export interface Data {
    id: string;

    /**
     * Managed by config as code (`kind: dashboard`). A managed dashboard is read-only
     * here: edits return 409; change it in the config file.
     */
    configManaged: boolean;

    createdAt: string;

    description: string | null;

    filters: Array<Data.Filter>;

    isDefault: boolean;

    name: string;

    /**
     * The window: LAST n DAYS/WEEKS/MONTHS up to now, a CALENDAR_ALIGNED period
     * (TODAY, YESTERDAY, THIS_WEEK, LAST_WEEK, THIS_MONTH, LAST_MONTH, THIS_YEAR,
     * LAST_YEAR), FIXED from/to, or SINCE a date. At most 731 days (two years).
     */
    timeRange: Data.UnionMember0 | Data.UnionMember1 | Data.UnionMember2 | Data.UnionMember3 | null;

    updatedAt: string;

    widgets: Array<Data.Widget>;
  }

  export namespace Data {
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

    export interface Widget {
      id: string;

      /**
       * What to aggregate: 1 to 10 measures.
       */
      measures: Array<Widget.Measure>;

      /**
       * Unique on the dashboard: how the widget is matched on update.
       */
      name: string;

      /**
       * Run every measure once per named filter set, e.g. one group per agent.
       */
      comparisonGroups?: Array<Widget.ComparisonGroup>;

      /**
       * PREVIOUS_PERIOD adds the preceding window of the same length to every series.
       */
      comparisonMode?: 'NONE' | 'PREVIOUS_PERIOD';

      description?: string;

      /**
       * Chart type. Defaults to LINE.
       */
      display?: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

      /**
       * Applied to every measure, on top of each measure's own filters.
       */
      filters?: Array<Widget.Filter>;

      /**
       * Bucket size. Defaults from the window's length and steps coarser when the window
       * would exceed 500 buckets.
       */
      interval?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

      /**
       * Grid width. Defaults to MEDIUM.
       */
      size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
    }

    export namespace Widget {
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
    }
  }
}

export interface DashboardGetDataResponse {
  /**
   * Every widget's series over the window, top to bottom. A widget that fails on its
   * own (say its metric was deleted) carries `error` and no series; the others still
   * return.
   */
  data: DashboardGetDataResponse.Data;
}

export namespace DashboardGetDataResponse {
  /**
   * Every widget's series over the window, top to bottom. A widget that fails on its
   * own (say its metric was deleted) carries `error` and no series; the others still
   * return.
   */
  export interface Data {
    dashboardId: string;

    from: string;

    timezone: string;

    to: string;

    widgets: Array<Data.Widget>;
  }

  export namespace Data {
    export interface Widget {
      blocked: boolean;

      error: string | null;

      interval: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

      name: string;

      omittedSeries: number;

      series: Array<Widget.Sery>;

      widgetId: string;
    }

    export namespace Widget {
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
}

export interface DashboardGetWidgetDataResponse {
  data: DashboardGetWidgetDataResponse.Data;
}

export namespace DashboardGetWidgetDataResponse {
  export interface Data {
    blocked: boolean;

    error: string | null;

    from: string;

    interval: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

    name: string;

    omittedSeries: number;

    series: Array<Data.Sery>;

    timezone: string;

    to: string;

    widgetId: string;
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

export interface DashboardUpdateWidgetResponse {
  data: DashboardUpdateWidgetResponse.Data;
}

export namespace DashboardUpdateWidgetResponse {
  export interface Data {
    id: string;

    /**
     * What to aggregate: 1 to 10 measures.
     */
    measures: Array<Data.Measure>;

    /**
     * Unique on the dashboard: how the widget is matched on update.
     */
    name: string;

    /**
     * Run every measure once per named filter set, e.g. one group per agent.
     */
    comparisonGroups?: Array<Data.ComparisonGroup>;

    /**
     * PREVIOUS_PERIOD adds the preceding window of the same length to every series.
     */
    comparisonMode?: 'NONE' | 'PREVIOUS_PERIOD';

    description?: string;

    /**
     * Chart type. Defaults to LINE.
     */
    display?: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

    /**
     * Applied to every measure, on top of each measure's own filters.
     */
    filters?: Array<Data.Filter>;

    /**
     * Bucket size. Defaults from the window's length and steps coarser when the window
     * would exceed 500 buckets.
     */
    interval?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

    /**
     * Grid width. Defaults to MEDIUM.
     */
    size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
  }

  export namespace Data {
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
  }
}

export interface DashboardCreateParams {
  name: string;

  description?: string;

  filters?: Array<DashboardCreateParams.Filter>;

  isDefault?: boolean;

  /**
   * The window: LAST n DAYS/WEEKS/MONTHS up to now, a CALENDAR_ALIGNED period
   * (TODAY, YESTERDAY, THIS_WEEK, LAST_WEEK, THIS_MONTH, LAST_MONTH, THIS_YEAR,
   * LAST_YEAR), FIXED from/to, or SINCE a date. At most 731 days (two years).
   */
  timeRange?:
    | DashboardCreateParams.UnionMember0
    | DashboardCreateParams.UnionMember1
    | DashboardCreateParams.UnionMember2
    | DashboardCreateParams.UnionMember3;

  widgets?: Array<DashboardCreateParams.Widget>;
}

export namespace DashboardCreateParams {
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

  export interface Widget {
    /**
     * What to aggregate: 1 to 10 measures.
     */
    measures: Array<Widget.Measure>;

    /**
     * Unique on the dashboard: how the widget is matched on update.
     */
    name: string;

    /**
     * Run every measure once per named filter set, e.g. one group per agent.
     */
    comparisonGroups?: Array<Widget.ComparisonGroup>;

    /**
     * PREVIOUS_PERIOD adds the preceding window of the same length to every series.
     */
    comparisonMode?: 'NONE' | 'PREVIOUS_PERIOD';

    description?: string;

    /**
     * Chart type. Defaults to LINE.
     */
    display?: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

    /**
     * Applied to every measure, on top of each measure's own filters.
     */
    filters?: Array<Widget.Filter>;

    /**
     * Bucket size. Defaults from the window's length and steps coarser when the window
     * would exceed 500 buckets.
     */
    interval?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

    /**
     * Grid width. Defaults to MEDIUM.
     */
    size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
  }

  export namespace Widget {
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
  }
}

export interface DashboardUpdateParams {
  description?: string;

  filters?: Array<DashboardUpdateParams.Filter>;

  isDefault?: boolean;

  name?: string;

  /**
   * The window: LAST n DAYS/WEEKS/MONTHS up to now, a CALENDAR_ALIGNED period
   * (TODAY, YESTERDAY, THIS_WEEK, LAST_WEEK, THIS_MONTH, LAST_MONTH, THIS_YEAR,
   * LAST_YEAR), FIXED from/to, or SINCE a date. At most 731 days (two years).
   */
  timeRange?:
    | DashboardUpdateParams.UnionMember0
    | DashboardUpdateParams.UnionMember1
    | DashboardUpdateParams.UnionMember2
    | DashboardUpdateParams.UnionMember3;

  widgets?: Array<DashboardUpdateParams.Widget>;
}

export namespace DashboardUpdateParams {
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

  export interface Widget {
    /**
     * What to aggregate: 1 to 10 measures.
     */
    measures: Array<Widget.Measure>;

    /**
     * Unique on the dashboard: how the widget is matched on update.
     */
    name: string;

    /**
     * Run every measure once per named filter set, e.g. one group per agent.
     */
    comparisonGroups?: Array<Widget.ComparisonGroup>;

    /**
     * PREVIOUS_PERIOD adds the preceding window of the same length to every series.
     */
    comparisonMode?: 'NONE' | 'PREVIOUS_PERIOD';

    description?: string;

    /**
     * Chart type. Defaults to LINE.
     */
    display?: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

    /**
     * Applied to every measure, on top of each measure's own filters.
     */
    filters?: Array<Widget.Filter>;

    /**
     * Bucket size. Defaults from the window's length and steps coarser when the window
     * would exceed 500 buckets.
     */
    interval?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

    /**
     * Grid width. Defaults to MEDIUM.
     */
    size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
  }

  export namespace Widget {
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
  }
}

export interface DashboardCreateWidgetParams {
  /**
   * What to aggregate: 1 to 10 measures.
   */
  measures: Array<DashboardCreateWidgetParams.Measure>;

  /**
   * Unique on the dashboard: how the widget is matched on update.
   */
  name: string;

  /**
   * Run every measure once per named filter set, e.g. one group per agent.
   */
  comparisonGroups?: Array<DashboardCreateWidgetParams.ComparisonGroup>;

  /**
   * PREVIOUS_PERIOD adds the preceding window of the same length to every series.
   */
  comparisonMode?: 'NONE' | 'PREVIOUS_PERIOD';

  description?: string;

  /**
   * Chart type. Defaults to LINE.
   */
  display?: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

  /**
   * Applied to every measure, on top of each measure's own filters.
   */
  filters?: Array<DashboardCreateWidgetParams.Filter>;

  /**
   * Bucket size. Defaults from the window's length and steps coarser when the window
   * would exceed 500 buckets.
   */
  interval?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

  /**
   * Grid width. Defaults to MEDIUM.
   */
  size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
}

export namespace DashboardCreateWidgetParams {
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
}

export interface DashboardDeleteWidgetParams {
  /**
   * The dashboard ID
   */
  dashboardId: string;
}

export interface DashboardGetDataParams {
  /**
   * ISO 8601 start. Overrides the saved window; without `to`, runs until now.
   */
  from?: string;

  /**
   * IANA zone buckets and calendar periods align to. Default UTC.
   */
  timezone?: string;

  /**
   * ISO 8601 end. Requires `from`.
   */
  to?: string;
}

export interface DashboardGetWidgetDataParams {
  /**
   * Path param
   */
  dashboardId: string;

  /**
   * Query param: ISO 8601 start. Overrides the saved window; without `to`, runs
   * until now.
   */
  from?: string;

  /**
   * Query param: IANA zone buckets and calendar periods align to. Default UTC.
   */
  timezone?: string;

  /**
   * Query param: ISO 8601 end. Requires `from`.
   */
  to?: string;
}

export interface DashboardUpdateWidgetParams {
  /**
   * Path param: The dashboard ID
   */
  dashboardId: string;

  /**
   * Body param: What to aggregate: 1 to 10 measures.
   */
  measures: Array<DashboardUpdateWidgetParams.Measure>;

  /**
   * Body param: Unique on the dashboard: how the widget is matched on update.
   */
  name: string;

  /**
   * Body param: Run every measure once per named filter set, e.g. one group per
   * agent.
   */
  comparisonGroups?: Array<DashboardUpdateWidgetParams.ComparisonGroup>;

  /**
   * Body param: PREVIOUS_PERIOD adds the preceding window of the same length to
   * every series.
   */
  comparisonMode?: 'NONE' | 'PREVIOUS_PERIOD';

  /**
   * Body param
   */
  description?: string;

  /**
   * Body param: Chart type. Defaults to LINE.
   */
  display?: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

  /**
   * Body param: Applied to every measure, on top of each measure's own filters.
   */
  filters?: Array<DashboardUpdateWidgetParams.Filter>;

  /**
   * Body param: Bucket size. Defaults from the window's length and steps coarser
   * when the window would exceed 500 buckets.
   */
  interval?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

  /**
   * Body param: Grid width. Defaults to MEDIUM.
   */
  size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
}

export namespace DashboardUpdateWidgetParams {
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
}

export declare namespace Dashboard {
  export {
    type DashboardCreateResponse as DashboardCreateResponse,
    type DashboardUpdateResponse as DashboardUpdateResponse,
    type DashboardListResponse as DashboardListResponse,
    type DashboardDeleteResponse as DashboardDeleteResponse,
    type DashboardCreateWidgetResponse as DashboardCreateWidgetResponse,
    type DashboardDeleteWidgetResponse as DashboardDeleteWidgetResponse,
    type DashboardGetByIDResponse as DashboardGetByIDResponse,
    type DashboardGetDataResponse as DashboardGetDataResponse,
    type DashboardGetWidgetDataResponse as DashboardGetWidgetDataResponse,
    type DashboardUpdateWidgetResponse as DashboardUpdateWidgetResponse,
    type DashboardCreateParams as DashboardCreateParams,
    type DashboardUpdateParams as DashboardUpdateParams,
    type DashboardCreateWidgetParams as DashboardCreateWidgetParams,
    type DashboardDeleteWidgetParams as DashboardDeleteWidgetParams,
    type DashboardGetDataParams as DashboardGetDataParams,
    type DashboardGetWidgetDataParams as DashboardGetWidgetDataParams,
    type DashboardUpdateWidgetParams as DashboardUpdateWidgetParams,
  };
}
