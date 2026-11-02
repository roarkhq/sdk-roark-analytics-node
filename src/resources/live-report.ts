// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class LiveReport extends APIResource {
  /**
   * Saves a report on the project's live calls. Simulations are never included.
   *
   * Targets are analytics measures held to a bar: a threshold metric is read as its
   * pass rate (`value` is a percentage, 0-100, held AT_LEAST by default); a numeric
   * metric as its average (held AT_MOST by default). Every target is read for the
   * period and the period before it, so the report says whether each was met and how
   * it moved.
   *
   * Scheduled reports are written `deliveryHour` hours into the day after each
   * period ends in `timezone` (a week runs Monday to Sunday), then emailed and
   * posted per `notifications`. With `generateNow` (the default) the report for the
   * latest closed period is written right away and not sent.
   *
   * @example
   * ```ts
   * const liveReport = await client.liveReport.create({
   *   name: 'x',
   * });
   * ```
   */
  create(body: LiveReportCreateParams, options?: RequestOptions): APIPromise<LiveReportCreateResponse> {
    return this._client.post('/v1/live-report', { body, ...options });
  }

  /**
   * Changes the fields sent. Set `status` to PAUSED to stop scheduled reports.
   *
   * @example
   * ```ts
   * const liveReport = await client.liveReport.update(
   *   '5c6d7e8f-9a0b-4c1d-8e2f-3a4b5c6d7e8f',
   * );
   * ```
   */
  update(
    reportID: string,
    body: LiveReportUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<LiveReportUpdateResponse> {
    return this._client.patch(path`/v1/live-report/${reportID}`, { body, ...options });
  }

  /**
   * Lists the project's saved live call reports, newest first.
   *
   * @example
   * ```ts
   * const liveReports = await client.liveReport.list();
   * ```
   */
  list(
    query: LiveReportListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<LiveReportListResponse> {
    return this._client.get('/v1/live-report', { query, ...options });
  }

  /**
   * Deletes the report and stops its scheduled reports.
   *
   * @example
   * ```ts
   * const liveReport = await client.liveReport.delete(
   *   '5c6d7e8f-9a0b-4c1d-8e2f-3a4b5c6d7e8f',
   * );
   * ```
   */
  delete(reportID: string, options?: RequestOptions): APIPromise<LiveReportDeleteResponse> {
    return this._client.delete(path`/v1/live-report/${reportID}`, options);
  }

  /**
   * Get a live report
   *
   * @example
   * ```ts
   * const response = await client.liveReport.getByID(
   *   '5c6d7e8f-9a0b-4c1d-8e2f-3a4b5c6d7e8f',
   * );
   * ```
   */
  getByID(reportID: string, options?: RequestOptions): APIPromise<LiveReportGetByIDResponse> {
    return this._client.get(path`/v1/live-report/${reportID}`, options);
  }

  /**
   * Returns one written report. `document` is null until `status` is READY. Theme
   * excerpts and grader quotes (call transcript text) are included only for keys
   * with transcript:read.
   *
   * @example
   * ```ts
   * const response = await client.liveReport.getDocument(
   *   '9e8d7c6b-5a4f-4e3d-8c2b-1a0f9e8d7c6b',
   *   { reportId: '5c6d7e8f-9a0b-4c1d-8e2f-3a4b5c6d7e8f' },
   * );
   * ```
   */
  getDocument(
    documentID: string,
    params: LiveReportGetDocumentParams,
    options?: RequestOptions,
  ): APIPromise<LiveReportGetDocumentResponse> {
    const { reportId } = params;
    return this._client.get(path`/v1/live-report/${reportId}/document/${documentID}`, options);
  }

  /**
   * Lists a report's documents, newest period first.
   *
   * @example
   * ```ts
   * const response =
   *   await client.liveReport.listDocuments('reportId');
   * ```
   */
  listDocuments(
    reportID: string,
    query: LiveReportListDocumentsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<LiveReportListDocumentsResponse> {
    return this._client.get(path`/v1/live-report/${reportID}/document`, { query, ...options });
  }

  /**
   * Writes the report now, for its latest closed period or a custom window
   * (`periodStart` + `periodEnd`, at most 92 days, ended). Returns 202 with the
   * document in PENDING; poll GET /v1/live-report/{reportId}/document/{documentId}
   * until `status` is READY or FAILED (typically a few minutes). An identical
   * request already in flight is returned as-is. A generated document is not
   * emailed.
   *
   * @example
   * ```ts
   * const response = await client.liveReport.run(
   *   '5c6d7e8f-9a0b-4c1d-8e2f-3a4b5c6d7e8f',
   * );
   * ```
   */
  run(
    reportID: string,
    body: LiveReportRunParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<LiveReportRunResponse> {
    return this._client.post(path`/v1/live-report/${reportID}/generate`, { body, ...options });
  }
}

export interface LiveReportCreateResponse {
  data: LiveReportCreateResponse.Data;
}

export namespace LiveReportCreateResponse {
  export interface Data {
    id: string;

    agentId: string | null;

    cadence: 'DAILY' | 'WEEKLY' | 'MONTHLY';

    configKey: string | null;

    /**
     * Managed by config as code: read-only here (edits return 409).
     */
    configManaged: boolean;

    createdAt: string;

    dashboardId: string | null;

    deliveryHour: number;

    description: string | null;

    filters: Array<Data.Filter>;

    includeTranscriptExcerpts: boolean;

    name: string;

    /**
     * When the next scheduled report is written. Null while the report is paused.
     */
    nextDeliveryAt: string | null;

    notifications: Data.Notifications;

    projectId: string;

    status: 'ACTIVE' | 'PAUSED';

    targets: Array<Data.Target>;

    timezone: string;

    updatedAt: string;
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
       * Defaults to EQUALS. IS_SET / IS_NOT_SET (CALL_PROPERTY only) keep conversations
       * where the property is set, whatever the value, or missing (never sent, sent as
       * null, or removed); they take no value.
       */
      operator?:
        | 'EQUALS'
        | 'NOT_EQUALS'
        | 'GREATER_THAN'
        | 'GREATER_THAN_OR_EQUAL_TO'
        | 'LESS_THAN'
        | 'LESS_THAN_OR_EQUAL_TO'
        | 'CONTAINS'
        | 'STARTS_WITH'
        | 'IS_SET'
        | 'IS_NOT_SET';

      /**
       * The property to compare. Required for CALL_PROPERTY and METRIC_PROPERTY; may be
       * omitted for AGENT_PROPERTY, DATASET, MODALITY and CALL_ID.
       */
      property?: string;

      /**
       * The value to compare against (an agent id, "call" / "chat", a property value).
       * Required except with IS_SET / IS_NOT_SET.
       */
      value?: string | number | boolean;
    }

    export interface Notifications {
      email: Notifications.Email;

      slack: Array<Notifications.Slack>;

      fromConfig?: boolean;
    }

    export namespace Notifications {
      export interface Email {
        enabled: boolean;

        recipients: Array<string>;
      }

      export interface Slack {
        channelId: string;

        channelName: string;

        notificationConfigId: string;
      }
    }

    export interface Target {
      /**
       * The metric's slug (e.g. `task_completion`) or id.
       */
      metric: string;

      /**
       * The bar, in display units. A PASS_RATE bar is a percentage, 0-100.
       */
      value: number;

      /**
       * Defaults to PASS_RATE for thresholds and booleans, AVG for anything numeric.
       */
      aggregation?: 'PASS_RATE' | 'AVG' | 'MEDIAN' | 'PERCENTILE' | 'MIN' | 'MAX';

      /**
       * AT_LEAST (default for PASS_RATE) or AT_MOST (default for every other
       * aggregation).
       */
      comparator?: 'AT_LEAST' | 'AT_MOST';

      /**
       * Shown instead of the metric's name.
       */
      label?: string;

      /**
       * PASS_RATE on a metric that isn't a threshold: the per-call condition a call
       * passes on.
       */
      passOperator?:
        | 'EQUALS'
        | 'NOT_EQUALS'
        | 'GREATER_THAN'
        | 'GREATER_THAN_OR_EQUAL_TO'
        | 'LESS_THAN'
        | 'LESS_THAN_OR_EQUAL_TO';

      passValue?: string | number | boolean;

      /**
       * Required with PERCENTILE, e.g. 95.
       */
      percentile?: number;
    }
  }
}

export interface LiveReportUpdateResponse {
  data: LiveReportUpdateResponse.Data;
}

export namespace LiveReportUpdateResponse {
  export interface Data {
    id: string;

    agentId: string | null;

    cadence: 'DAILY' | 'WEEKLY' | 'MONTHLY';

    configKey: string | null;

    /**
     * Managed by config as code: read-only here (edits return 409).
     */
    configManaged: boolean;

    createdAt: string;

    dashboardId: string | null;

    deliveryHour: number;

    description: string | null;

    filters: Array<Data.Filter>;

    includeTranscriptExcerpts: boolean;

    name: string;

    /**
     * When the next scheduled report is written. Null while the report is paused.
     */
    nextDeliveryAt: string | null;

    notifications: Data.Notifications;

    projectId: string;

    status: 'ACTIVE' | 'PAUSED';

    targets: Array<Data.Target>;

    timezone: string;

    updatedAt: string;
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
       * Defaults to EQUALS. IS_SET / IS_NOT_SET (CALL_PROPERTY only) keep conversations
       * where the property is set, whatever the value, or missing (never sent, sent as
       * null, or removed); they take no value.
       */
      operator?:
        | 'EQUALS'
        | 'NOT_EQUALS'
        | 'GREATER_THAN'
        | 'GREATER_THAN_OR_EQUAL_TO'
        | 'LESS_THAN'
        | 'LESS_THAN_OR_EQUAL_TO'
        | 'CONTAINS'
        | 'STARTS_WITH'
        | 'IS_SET'
        | 'IS_NOT_SET';

      /**
       * The property to compare. Required for CALL_PROPERTY and METRIC_PROPERTY; may be
       * omitted for AGENT_PROPERTY, DATASET, MODALITY and CALL_ID.
       */
      property?: string;

      /**
       * The value to compare against (an agent id, "call" / "chat", a property value).
       * Required except with IS_SET / IS_NOT_SET.
       */
      value?: string | number | boolean;
    }

    export interface Notifications {
      email: Notifications.Email;

      slack: Array<Notifications.Slack>;

      fromConfig?: boolean;
    }

    export namespace Notifications {
      export interface Email {
        enabled: boolean;

        recipients: Array<string>;
      }

      export interface Slack {
        channelId: string;

        channelName: string;

        notificationConfigId: string;
      }
    }

    export interface Target {
      /**
       * The metric's slug (e.g. `task_completion`) or id.
       */
      metric: string;

      /**
       * The bar, in display units. A PASS_RATE bar is a percentage, 0-100.
       */
      value: number;

      /**
       * Defaults to PASS_RATE for thresholds and booleans, AVG for anything numeric.
       */
      aggregation?: 'PASS_RATE' | 'AVG' | 'MEDIAN' | 'PERCENTILE' | 'MIN' | 'MAX';

      /**
       * AT_LEAST (default for PASS_RATE) or AT_MOST (default for every other
       * aggregation).
       */
      comparator?: 'AT_LEAST' | 'AT_MOST';

      /**
       * Shown instead of the metric's name.
       */
      label?: string;

      /**
       * PASS_RATE on a metric that isn't a threshold: the per-call condition a call
       * passes on.
       */
      passOperator?:
        | 'EQUALS'
        | 'NOT_EQUALS'
        | 'GREATER_THAN'
        | 'GREATER_THAN_OR_EQUAL_TO'
        | 'LESS_THAN'
        | 'LESS_THAN_OR_EQUAL_TO';

      passValue?: string | number | boolean;

      /**
       * Required with PERCENTILE, e.g. 95.
       */
      percentile?: number;
    }
  }
}

export interface LiveReportListResponse {
  data: LiveReportListResponse.Data;
}

export namespace LiveReportListResponse {
  export interface Data {
    items: Array<Data.Item>;

    totalCount: number;
  }

  export namespace Data {
    export interface Item {
      id: string;

      agentId: string | null;

      cadence: 'DAILY' | 'WEEKLY' | 'MONTHLY';

      configKey: string | null;

      /**
       * Managed by config as code: read-only here (edits return 409).
       */
      configManaged: boolean;

      createdAt: string;

      dashboardId: string | null;

      deliveryHour: number;

      description: string | null;

      filters: Array<Item.Filter>;

      includeTranscriptExcerpts: boolean;

      name: string;

      /**
       * When the next scheduled report is written. Null while the report is paused.
       */
      nextDeliveryAt: string | null;

      notifications: Item.Notifications;

      projectId: string;

      status: 'ACTIVE' | 'PAUSED';

      targets: Array<Item.Target>;

      timezone: string;

      updatedAt: string;
    }

    export namespace Item {
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
         * Defaults to EQUALS. IS_SET / IS_NOT_SET (CALL_PROPERTY only) keep conversations
         * where the property is set, whatever the value, or missing (never sent, sent as
         * null, or removed); they take no value.
         */
        operator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUAL_TO'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUAL_TO'
          | 'CONTAINS'
          | 'STARTS_WITH'
          | 'IS_SET'
          | 'IS_NOT_SET';

        /**
         * The property to compare. Required for CALL_PROPERTY and METRIC_PROPERTY; may be
         * omitted for AGENT_PROPERTY, DATASET, MODALITY and CALL_ID.
         */
        property?: string;

        /**
         * The value to compare against (an agent id, "call" / "chat", a property value).
         * Required except with IS_SET / IS_NOT_SET.
         */
        value?: string | number | boolean;
      }

      export interface Notifications {
        email: Notifications.Email;

        slack: Array<Notifications.Slack>;

        fromConfig?: boolean;
      }

      export namespace Notifications {
        export interface Email {
          enabled: boolean;

          recipients: Array<string>;
        }

        export interface Slack {
          channelId: string;

          channelName: string;

          notificationConfigId: string;
        }
      }

      export interface Target {
        /**
         * The metric's slug (e.g. `task_completion`) or id.
         */
        metric: string;

        /**
         * The bar, in display units. A PASS_RATE bar is a percentage, 0-100.
         */
        value: number;

        /**
         * Defaults to PASS_RATE for thresholds and booleans, AVG for anything numeric.
         */
        aggregation?: 'PASS_RATE' | 'AVG' | 'MEDIAN' | 'PERCENTILE' | 'MIN' | 'MAX';

        /**
         * AT_LEAST (default for PASS_RATE) or AT_MOST (default for every other
         * aggregation).
         */
        comparator?: 'AT_LEAST' | 'AT_MOST';

        /**
         * Shown instead of the metric's name.
         */
        label?: string;

        /**
         * PASS_RATE on a metric that isn't a threshold: the per-call condition a call
         * passes on.
         */
        passOperator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUAL_TO'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUAL_TO';

        passValue?: string | number | boolean;

        /**
         * Required with PERCENTILE, e.g. 95.
         */
        percentile?: number;
      }
    }
  }
}

export interface LiveReportDeleteResponse {
  data: LiveReportDeleteResponse.Data;
}

export namespace LiveReportDeleteResponse {
  export interface Data {
    id: string;

    deleted: true;
  }
}

export interface LiveReportGetByIDResponse {
  data: LiveReportGetByIDResponse.Data;
}

export namespace LiveReportGetByIDResponse {
  export interface Data {
    id: string;

    agentId: string | null;

    cadence: 'DAILY' | 'WEEKLY' | 'MONTHLY';

    configKey: string | null;

    /**
     * Managed by config as code: read-only here (edits return 409).
     */
    configManaged: boolean;

    createdAt: string;

    dashboardId: string | null;

    deliveryHour: number;

    description: string | null;

    filters: Array<Data.Filter>;

    includeTranscriptExcerpts: boolean;

    name: string;

    /**
     * When the next scheduled report is written. Null while the report is paused.
     */
    nextDeliveryAt: string | null;

    notifications: Data.Notifications;

    projectId: string;

    status: 'ACTIVE' | 'PAUSED';

    targets: Array<Data.Target>;

    timezone: string;

    updatedAt: string;
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
       * Defaults to EQUALS. IS_SET / IS_NOT_SET (CALL_PROPERTY only) keep conversations
       * where the property is set, whatever the value, or missing (never sent, sent as
       * null, or removed); they take no value.
       */
      operator?:
        | 'EQUALS'
        | 'NOT_EQUALS'
        | 'GREATER_THAN'
        | 'GREATER_THAN_OR_EQUAL_TO'
        | 'LESS_THAN'
        | 'LESS_THAN_OR_EQUAL_TO'
        | 'CONTAINS'
        | 'STARTS_WITH'
        | 'IS_SET'
        | 'IS_NOT_SET';

      /**
       * The property to compare. Required for CALL_PROPERTY and METRIC_PROPERTY; may be
       * omitted for AGENT_PROPERTY, DATASET, MODALITY and CALL_ID.
       */
      property?: string;

      /**
       * The value to compare against (an agent id, "call" / "chat", a property value).
       * Required except with IS_SET / IS_NOT_SET.
       */
      value?: string | number | boolean;
    }

    export interface Notifications {
      email: Notifications.Email;

      slack: Array<Notifications.Slack>;

      fromConfig?: boolean;
    }

    export namespace Notifications {
      export interface Email {
        enabled: boolean;

        recipients: Array<string>;
      }

      export interface Slack {
        channelId: string;

        channelName: string;

        notificationConfigId: string;
      }
    }

    export interface Target {
      /**
       * The metric's slug (e.g. `task_completion`) or id.
       */
      metric: string;

      /**
       * The bar, in display units. A PASS_RATE bar is a percentage, 0-100.
       */
      value: number;

      /**
       * Defaults to PASS_RATE for thresholds and booleans, AVG for anything numeric.
       */
      aggregation?: 'PASS_RATE' | 'AVG' | 'MEDIAN' | 'PERCENTILE' | 'MIN' | 'MAX';

      /**
       * AT_LEAST (default for PASS_RATE) or AT_MOST (default for every other
       * aggregation).
       */
      comparator?: 'AT_LEAST' | 'AT_MOST';

      /**
       * Shown instead of the metric's name.
       */
      label?: string;

      /**
       * PASS_RATE on a metric that isn't a threshold: the per-call condition a call
       * passes on.
       */
      passOperator?:
        | 'EQUALS'
        | 'NOT_EQUALS'
        | 'GREATER_THAN'
        | 'GREATER_THAN_OR_EQUAL_TO'
        | 'LESS_THAN'
        | 'LESS_THAN_OR_EQUAL_TO';

      passValue?: string | number | boolean;

      /**
       * Required with PERCENTILE, e.g. 95.
       */
      percentile?: number;
    }
  }
}

export interface LiveReportGetDocumentResponse {
  /**
   * One written report over one period. `document` is null until `status` is READY;
   * every number in it comes from the analytics engine (the same reads GET
   * /v1/dashboard/{dashboardId}/data makes over the same window and filters).
   */
  data: LiveReportGetDocumentResponse.Data;
}

export namespace LiveReportGetDocumentResponse {
  /**
   * One written report over one period. `document` is null until `status` is READY;
   * every number in it comes from the analytics engine (the same reads GET
   * /v1/dashboard/{dashboardId}/data makes over the same window and filters).
   */
  export interface Data {
    id: string;

    announcedAt: string | null;

    cadence: 'DAILY' | 'WEEKLY' | 'MONTHLY' | null;

    completedAt: string | null;

    createdAt: string;

    definition: Data.Definition;

    document: Data.Document | null;

    errorMessage: string | null;

    liveReportId: string | null;

    periodEnd: string;

    periodStart: string;

    projectId: string;

    status: 'PENDING' | 'GENERATING' | 'READY' | 'FAILED';

    timezone: string;

    trigger: 'SCHEDULED' | 'MANUAL';
  }

  export namespace Data {
    export interface Definition {
      agentId: string | null;

      agentName: string | null;

      dashboardId: string | null;

      description: string | null;

      filters: Array<Definition.Filter>;

      includeTranscriptExcerpts: boolean;

      name: string;

      targets: Array<Definition.Target>;
    }

    export namespace Definition {
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
         * Defaults to EQUALS. IS_SET / IS_NOT_SET (CALL_PROPERTY only) keep conversations
         * where the property is set, whatever the value, or missing (never sent, sent as
         * null, or removed); they take no value.
         */
        operator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUAL_TO'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUAL_TO'
          | 'CONTAINS'
          | 'STARTS_WITH'
          | 'IS_SET'
          | 'IS_NOT_SET';

        /**
         * The property to compare. Required for CALL_PROPERTY and METRIC_PROPERTY; may be
         * omitted for AGENT_PROPERTY, DATASET, MODALITY and CALL_ID.
         */
        property?: string;

        /**
         * The value to compare against (an agent id, "call" / "chat", a property value).
         * Required except with IS_SET / IS_NOT_SET.
         */
        value?: string | number | boolean;
      }

      export interface Target {
        /**
         * The metric's slug (e.g. `task_completion`) or id.
         */
        metric: string;

        /**
         * The bar, in display units. A PASS_RATE bar is a percentage, 0-100.
         */
        value: number;

        /**
         * Defaults to PASS_RATE for thresholds and booleans, AVG for anything numeric.
         */
        aggregation?: 'PASS_RATE' | 'AVG' | 'MEDIAN' | 'PERCENTILE' | 'MIN' | 'MAX';

        /**
         * AT_LEAST (default for PASS_RATE) or AT_MOST (default for every other
         * aggregation).
         */
        comparator?: 'AT_LEAST' | 'AT_MOST';

        /**
         * Shown instead of the metric's name.
         */
        label?: string;

        /**
         * PASS_RATE on a metric that isn't a threshold: the per-call condition a call
         * passes on.
         */
        passOperator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUAL_TO'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUAL_TO';

        passValue?: string | number | boolean;

        /**
         * Required with PERCENTILE, e.g. 95.
         */
        percentile?: number;
      }
    }

    export interface Document {
      agents: Array<Document.Agent>;

      appendix: Document.Appendix;

      charts: Array<Document.Chart>;

      checks: Array<Document.Check>;

      evidence: Document.Evidence;

      executiveSummary: Document.ExecutiveSummary;

      generatedAtIso: string;

      headline: Document.Headline;

      liveReportId: string | null;

      model: string;

      recommendations: Array<Document.Recommendation>;

      targets: Array<Document.Target>;

      themes: Array<Document.Theme>;

      version: 1;

      volume: Document.Volume;
    }

    export namespace Document {
      export interface Agent {
        agentId: string;

        agentName: string;

        conversationCount: number;

        sharePct: number;

        targets: Array<Agent.Target>;
      }

      export namespace Agent {
        export interface Target {
          actual: number | null;

          actualLabel: string | null;

          key: string;

          status: 'MET' | 'MISSED' | 'NO_DATA';
        }
      }

      export interface Appendix {
        methodology: string;

        notes: Array<string>;
      }

      export interface Chart {
        blocked: boolean;

        description: string | null;

        display: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

        error: string | null;

        interval: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

        name: string;

        omittedSeries: number;

        series: Array<Chart.Sery>;
      }

      export namespace Chart {
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

      export interface Check {
        checkName: string;

        comparable: boolean;

        deltaPts: number | null;

        evaluatedCount: number;

        failedCount: number;

        isTarget: boolean;

        metricDefinitionId: string;

        metricSlug: string;

        passRatePct: number | null;

        previousPassRatePct: number | null;
      }

      export interface Evidence {
        failingConversationCount: number;

        failingCountIsLowerBound: boolean;

        readConversationCount: number;

        sampled: boolean;
      }

      export interface ExecutiveSummary {
        keyFindings: Array<ExecutiveSummary.KeyFinding>;

        paragraphs: Array<string>;

        sections?: Array<ExecutiveSummary.Section>;
      }

      export namespace ExecutiveSummary {
        export interface KeyFinding {
          body: string;

          title: string;

          calls?: Array<KeyFinding.Call>;
        }

        export namespace KeyFinding {
          export interface Call {
            callId: string | null;

            conversationId: string;

            cueMs: number | null;

            personaName: string | null;
          }
        }

        export interface Section {
          body: string;

          heading: string | null;
        }
      }

      export interface Headline {
        agentName: string | null;

        cadence: 'DAILY' | 'WEEKLY' | 'MONTHLY' | null;

        periodEndIso: string;

        periodLabel: string;

        periodStartIso: string;

        reportName: string;

        statTiles: Array<Headline.StatTile>;

        timezone: string;

        verdict: 'ON_TARGET' | 'OFF_TARGET' | 'NO_TARGETS' | 'NO_DATA';

        verdictProse: string;
      }

      export namespace Headline {
        export interface StatTile {
          deltaDirection: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | null;

          label: string;

          sub: string | null;

          value: string;
        }
      }

      export interface Recommendation {
        afterText: string | null;

        beforeText: string | null;

        body: string;

        channel:
          | 'PROMPT'
          | 'VOICE_CONFIG'
          | 'STT'
          | 'SPEECH_MODEL'
          | 'LLM_MODEL'
          | 'INFRA'
          | 'EXTERNAL'
          | null;

        order: number;

        promptOptimizationFindingId: string | null;

        severity: 'HIGH' | 'MEDIUM' | 'LOW' | null;

        source: 'PROMPT_OPTIMIZER' | 'DEBRIEF';

        themeSlugs: Array<string>;

        title: string;
      }

      export interface Target {
        actual: number | null;

        actualLabel: string | null;

        aggregation: 'PASS_RATE' | 'AVG' | 'MEDIAN' | 'PERCENTILE' | 'MIN' | 'MAX';

        comparator: 'AT_LEAST' | 'AT_MOST';

        deltaDirection: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | null;

        deltaLabel: string | null;

        error: string | null;

        failingConversationCount: number | null;

        key: string;

        label: string;

        lifecycle: 'NEW_MISS' | 'STILL_MISSED' | 'RECOVERED' | 'HOLDING' | null;

        metricDefinitionId: string | null;

        metricName: string;

        metricSlug: string;

        percentile: number | null;

        previous: number | null;

        previousLabel: string | null;

        sampleSize: number;

        series: Array<Target.Sery>;

        status: 'MET' | 'MISSED' | 'NO_DATA';

        targetLabel: string;

        targetValue: number;

        unit: 'PERCENT' | 'VALUE';
      }

      export namespace Target {
        export interface Sery {
          date: string;

          sampleSize: number | null;

          value: number | null;
        }
      }

      export interface Theme {
        affectedConversationCount: number;

        analysis: string;

        checkNames: Array<string>;

        collectorQuote: Theme.CollectorQuote | null;

        estimatedAffectedConversationCount: number | null;

        excerpts: Array<Theme.Excerpt>;

        flaggedForImpact: boolean;

        impact: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | null;

        impactReason: string | null;

        issue: Theme.Issue | null;

        lifecycle: 'NEW' | 'PERSISTENT' | 'IMPROVING' | 'FIXED' | null;

        memberConversationIds: Array<string>;

        metricDefinitionIds: Array<string>;

        prevalence: 'WIDESPREAD' | 'RECURRING' | 'ISOLATED' | null;

        rootCauseChannel:
          | 'PROMPT'
          | 'VOICE_CONFIG'
          | 'STT'
          | 'SPEECH_MODEL'
          | 'LLM_MODEL'
          | 'INFRA'
          | 'EXTERNAL'
          | null;

        severity: 'HIGH' | 'MEDIUM' | 'LOW';

        slug: string;

        title: string;

        totalConversationCount: number;

        memberCalls?: Array<Theme.MemberCall>;
      }

      export namespace Theme {
        export interface CollectorQuote {
          conversationId: string;

          metricName: string;

          quote: string;
        }

        export interface Excerpt {
          callId: string | null;

          caption: string | null;

          conversationId: string;

          personaName: string | null;

          scenarioName: string | null;

          turns: Array<Excerpt.Turn>;
        }

        export namespace Excerpt {
          export interface Turn {
            flagNote: string | null;

            flagged: boolean;

            offsetMs: number | null;

            role: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER';

            text: string;
          }
        }

        export interface Issue {
          id: string;

          firstSeenAtIso: string | null;

          status: string;

          title: string;
        }

        export interface MemberCall {
          callId: string | null;

          conversationId: string;

          cueMs: number | null;

          personaName: string | null;
        }
      }

      export interface Volume {
        conversationCount: number;

        deltaPct: number | null;

        endings: Array<Volume.Ending>;

        previousConversationCount: number | null;

        series: Array<Volume.Sery>;
      }

      export namespace Volume {
        export interface Ending {
          count: number;

          label: string;

          sharePct: number;

          value: string;
        }

        export interface Sery {
          date: string;

          sampleSize: number | null;

          value: number | null;
        }
      }
    }
  }
}

export interface LiveReportListDocumentsResponse {
  data: LiveReportListDocumentsResponse.Data;
}

export namespace LiveReportListDocumentsResponse {
  export interface Data {
    items: Array<Data.Item>;

    totalCount: number;
  }

  export namespace Data {
    /**
     * One written report over one period. `document` is null until `status` is READY;
     * every number in it comes from the analytics engine (the same reads GET
     * /v1/dashboard/{dashboardId}/data makes over the same window and filters).
     */
    export interface Item {
      id: string;

      announcedAt: string | null;

      cadence: 'DAILY' | 'WEEKLY' | 'MONTHLY' | null;

      completedAt: string | null;

      createdAt: string;

      definition: Item.Definition;

      document: Item.Document | null;

      errorMessage: string | null;

      liveReportId: string | null;

      periodEnd: string;

      periodStart: string;

      projectId: string;

      status: 'PENDING' | 'GENERATING' | 'READY' | 'FAILED';

      timezone: string;

      trigger: 'SCHEDULED' | 'MANUAL';
    }

    export namespace Item {
      export interface Definition {
        agentId: string | null;

        agentName: string | null;

        dashboardId: string | null;

        description: string | null;

        filters: Array<Definition.Filter>;

        includeTranscriptExcerpts: boolean;

        name: string;

        targets: Array<Definition.Target>;
      }

      export namespace Definition {
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
           * Defaults to EQUALS. IS_SET / IS_NOT_SET (CALL_PROPERTY only) keep conversations
           * where the property is set, whatever the value, or missing (never sent, sent as
           * null, or removed); they take no value.
           */
          operator?:
            | 'EQUALS'
            | 'NOT_EQUALS'
            | 'GREATER_THAN'
            | 'GREATER_THAN_OR_EQUAL_TO'
            | 'LESS_THAN'
            | 'LESS_THAN_OR_EQUAL_TO'
            | 'CONTAINS'
            | 'STARTS_WITH'
            | 'IS_SET'
            | 'IS_NOT_SET';

          /**
           * The property to compare. Required for CALL_PROPERTY and METRIC_PROPERTY; may be
           * omitted for AGENT_PROPERTY, DATASET, MODALITY and CALL_ID.
           */
          property?: string;

          /**
           * The value to compare against (an agent id, "call" / "chat", a property value).
           * Required except with IS_SET / IS_NOT_SET.
           */
          value?: string | number | boolean;
        }

        export interface Target {
          /**
           * The metric's slug (e.g. `task_completion`) or id.
           */
          metric: string;

          /**
           * The bar, in display units. A PASS_RATE bar is a percentage, 0-100.
           */
          value: number;

          /**
           * Defaults to PASS_RATE for thresholds and booleans, AVG for anything numeric.
           */
          aggregation?: 'PASS_RATE' | 'AVG' | 'MEDIAN' | 'PERCENTILE' | 'MIN' | 'MAX';

          /**
           * AT_LEAST (default for PASS_RATE) or AT_MOST (default for every other
           * aggregation).
           */
          comparator?: 'AT_LEAST' | 'AT_MOST';

          /**
           * Shown instead of the metric's name.
           */
          label?: string;

          /**
           * PASS_RATE on a metric that isn't a threshold: the per-call condition a call
           * passes on.
           */
          passOperator?:
            | 'EQUALS'
            | 'NOT_EQUALS'
            | 'GREATER_THAN'
            | 'GREATER_THAN_OR_EQUAL_TO'
            | 'LESS_THAN'
            | 'LESS_THAN_OR_EQUAL_TO';

          passValue?: string | number | boolean;

          /**
           * Required with PERCENTILE, e.g. 95.
           */
          percentile?: number;
        }
      }

      export interface Document {
        agents: Array<Document.Agent>;

        appendix: Document.Appendix;

        charts: Array<Document.Chart>;

        checks: Array<Document.Check>;

        evidence: Document.Evidence;

        executiveSummary: Document.ExecutiveSummary;

        generatedAtIso: string;

        headline: Document.Headline;

        liveReportId: string | null;

        model: string;

        recommendations: Array<Document.Recommendation>;

        targets: Array<Document.Target>;

        themes: Array<Document.Theme>;

        version: 1;

        volume: Document.Volume;
      }

      export namespace Document {
        export interface Agent {
          agentId: string;

          agentName: string;

          conversationCount: number;

          sharePct: number;

          targets: Array<Agent.Target>;
        }

        export namespace Agent {
          export interface Target {
            actual: number | null;

            actualLabel: string | null;

            key: string;

            status: 'MET' | 'MISSED' | 'NO_DATA';
          }
        }

        export interface Appendix {
          methodology: string;

          notes: Array<string>;
        }

        export interface Chart {
          blocked: boolean;

          description: string | null;

          display: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

          error: string | null;

          interval: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

          name: string;

          omittedSeries: number;

          series: Array<Chart.Sery>;
        }

        export namespace Chart {
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

        export interface Check {
          checkName: string;

          comparable: boolean;

          deltaPts: number | null;

          evaluatedCount: number;

          failedCount: number;

          isTarget: boolean;

          metricDefinitionId: string;

          metricSlug: string;

          passRatePct: number | null;

          previousPassRatePct: number | null;
        }

        export interface Evidence {
          failingConversationCount: number;

          failingCountIsLowerBound: boolean;

          readConversationCount: number;

          sampled: boolean;
        }

        export interface ExecutiveSummary {
          keyFindings: Array<ExecutiveSummary.KeyFinding>;

          paragraphs: Array<string>;

          sections?: Array<ExecutiveSummary.Section>;
        }

        export namespace ExecutiveSummary {
          export interface KeyFinding {
            body: string;

            title: string;

            calls?: Array<KeyFinding.Call>;
          }

          export namespace KeyFinding {
            export interface Call {
              callId: string | null;

              conversationId: string;

              cueMs: number | null;

              personaName: string | null;
            }
          }

          export interface Section {
            body: string;

            heading: string | null;
          }
        }

        export interface Headline {
          agentName: string | null;

          cadence: 'DAILY' | 'WEEKLY' | 'MONTHLY' | null;

          periodEndIso: string;

          periodLabel: string;

          periodStartIso: string;

          reportName: string;

          statTiles: Array<Headline.StatTile>;

          timezone: string;

          verdict: 'ON_TARGET' | 'OFF_TARGET' | 'NO_TARGETS' | 'NO_DATA';

          verdictProse: string;
        }

        export namespace Headline {
          export interface StatTile {
            deltaDirection: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | null;

            label: string;

            sub: string | null;

            value: string;
          }
        }

        export interface Recommendation {
          afterText: string | null;

          beforeText: string | null;

          body: string;

          channel:
            | 'PROMPT'
            | 'VOICE_CONFIG'
            | 'STT'
            | 'SPEECH_MODEL'
            | 'LLM_MODEL'
            | 'INFRA'
            | 'EXTERNAL'
            | null;

          order: number;

          promptOptimizationFindingId: string | null;

          severity: 'HIGH' | 'MEDIUM' | 'LOW' | null;

          source: 'PROMPT_OPTIMIZER' | 'DEBRIEF';

          themeSlugs: Array<string>;

          title: string;
        }

        export interface Target {
          actual: number | null;

          actualLabel: string | null;

          aggregation: 'PASS_RATE' | 'AVG' | 'MEDIAN' | 'PERCENTILE' | 'MIN' | 'MAX';

          comparator: 'AT_LEAST' | 'AT_MOST';

          deltaDirection: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | null;

          deltaLabel: string | null;

          error: string | null;

          failingConversationCount: number | null;

          key: string;

          label: string;

          lifecycle: 'NEW_MISS' | 'STILL_MISSED' | 'RECOVERED' | 'HOLDING' | null;

          metricDefinitionId: string | null;

          metricName: string;

          metricSlug: string;

          percentile: number | null;

          previous: number | null;

          previousLabel: string | null;

          sampleSize: number;

          series: Array<Target.Sery>;

          status: 'MET' | 'MISSED' | 'NO_DATA';

          targetLabel: string;

          targetValue: number;

          unit: 'PERCENT' | 'VALUE';
        }

        export namespace Target {
          export interface Sery {
            date: string;

            sampleSize: number | null;

            value: number | null;
          }
        }

        export interface Theme {
          affectedConversationCount: number;

          analysis: string;

          checkNames: Array<string>;

          collectorQuote: Theme.CollectorQuote | null;

          estimatedAffectedConversationCount: number | null;

          excerpts: Array<Theme.Excerpt>;

          flaggedForImpact: boolean;

          impact: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | null;

          impactReason: string | null;

          issue: Theme.Issue | null;

          lifecycle: 'NEW' | 'PERSISTENT' | 'IMPROVING' | 'FIXED' | null;

          memberConversationIds: Array<string>;

          metricDefinitionIds: Array<string>;

          prevalence: 'WIDESPREAD' | 'RECURRING' | 'ISOLATED' | null;

          rootCauseChannel:
            | 'PROMPT'
            | 'VOICE_CONFIG'
            | 'STT'
            | 'SPEECH_MODEL'
            | 'LLM_MODEL'
            | 'INFRA'
            | 'EXTERNAL'
            | null;

          severity: 'HIGH' | 'MEDIUM' | 'LOW';

          slug: string;

          title: string;

          totalConversationCount: number;

          memberCalls?: Array<Theme.MemberCall>;
        }

        export namespace Theme {
          export interface CollectorQuote {
            conversationId: string;

            metricName: string;

            quote: string;
          }

          export interface Excerpt {
            callId: string | null;

            caption: string | null;

            conversationId: string;

            personaName: string | null;

            scenarioName: string | null;

            turns: Array<Excerpt.Turn>;
          }

          export namespace Excerpt {
            export interface Turn {
              flagNote: string | null;

              flagged: boolean;

              offsetMs: number | null;

              role: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER';

              text: string;
            }
          }

          export interface Issue {
            id: string;

            firstSeenAtIso: string | null;

            status: string;

            title: string;
          }

          export interface MemberCall {
            callId: string | null;

            conversationId: string;

            cueMs: number | null;

            personaName: string | null;
          }
        }

        export interface Volume {
          conversationCount: number;

          deltaPct: number | null;

          endings: Array<Volume.Ending>;

          previousConversationCount: number | null;

          series: Array<Volume.Sery>;
        }

        export namespace Volume {
          export interface Ending {
            count: number;

            label: string;

            sharePct: number;

            value: string;
          }

          export interface Sery {
            date: string;

            sampleSize: number | null;

            value: number | null;
          }
        }
      }
    }
  }
}

export interface LiveReportRunResponse {
  /**
   * One written report over one period. `document` is null until `status` is READY;
   * every number in it comes from the analytics engine (the same reads GET
   * /v1/dashboard/{dashboardId}/data makes over the same window and filters).
   */
  data: LiveReportRunResponse.Data;
}

export namespace LiveReportRunResponse {
  /**
   * One written report over one period. `document` is null until `status` is READY;
   * every number in it comes from the analytics engine (the same reads GET
   * /v1/dashboard/{dashboardId}/data makes over the same window and filters).
   */
  export interface Data {
    id: string;

    announcedAt: string | null;

    cadence: 'DAILY' | 'WEEKLY' | 'MONTHLY' | null;

    completedAt: string | null;

    createdAt: string;

    definition: Data.Definition;

    document: Data.Document | null;

    errorMessage: string | null;

    liveReportId: string | null;

    periodEnd: string;

    periodStart: string;

    projectId: string;

    status: 'PENDING' | 'GENERATING' | 'READY' | 'FAILED';

    timezone: string;

    trigger: 'SCHEDULED' | 'MANUAL';
  }

  export namespace Data {
    export interface Definition {
      agentId: string | null;

      agentName: string | null;

      dashboardId: string | null;

      description: string | null;

      filters: Array<Definition.Filter>;

      includeTranscriptExcerpts: boolean;

      name: string;

      targets: Array<Definition.Target>;
    }

    export namespace Definition {
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
         * Defaults to EQUALS. IS_SET / IS_NOT_SET (CALL_PROPERTY only) keep conversations
         * where the property is set, whatever the value, or missing (never sent, sent as
         * null, or removed); they take no value.
         */
        operator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUAL_TO'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUAL_TO'
          | 'CONTAINS'
          | 'STARTS_WITH'
          | 'IS_SET'
          | 'IS_NOT_SET';

        /**
         * The property to compare. Required for CALL_PROPERTY and METRIC_PROPERTY; may be
         * omitted for AGENT_PROPERTY, DATASET, MODALITY and CALL_ID.
         */
        property?: string;

        /**
         * The value to compare against (an agent id, "call" / "chat", a property value).
         * Required except with IS_SET / IS_NOT_SET.
         */
        value?: string | number | boolean;
      }

      export interface Target {
        /**
         * The metric's slug (e.g. `task_completion`) or id.
         */
        metric: string;

        /**
         * The bar, in display units. A PASS_RATE bar is a percentage, 0-100.
         */
        value: number;

        /**
         * Defaults to PASS_RATE for thresholds and booleans, AVG for anything numeric.
         */
        aggregation?: 'PASS_RATE' | 'AVG' | 'MEDIAN' | 'PERCENTILE' | 'MIN' | 'MAX';

        /**
         * AT_LEAST (default for PASS_RATE) or AT_MOST (default for every other
         * aggregation).
         */
        comparator?: 'AT_LEAST' | 'AT_MOST';

        /**
         * Shown instead of the metric's name.
         */
        label?: string;

        /**
         * PASS_RATE on a metric that isn't a threshold: the per-call condition a call
         * passes on.
         */
        passOperator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUAL_TO'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUAL_TO';

        passValue?: string | number | boolean;

        /**
         * Required with PERCENTILE, e.g. 95.
         */
        percentile?: number;
      }
    }

    export interface Document {
      agents: Array<Document.Agent>;

      appendix: Document.Appendix;

      charts: Array<Document.Chart>;

      checks: Array<Document.Check>;

      evidence: Document.Evidence;

      executiveSummary: Document.ExecutiveSummary;

      generatedAtIso: string;

      headline: Document.Headline;

      liveReportId: string | null;

      model: string;

      recommendations: Array<Document.Recommendation>;

      targets: Array<Document.Target>;

      themes: Array<Document.Theme>;

      version: 1;

      volume: Document.Volume;
    }

    export namespace Document {
      export interface Agent {
        agentId: string;

        agentName: string;

        conversationCount: number;

        sharePct: number;

        targets: Array<Agent.Target>;
      }

      export namespace Agent {
        export interface Target {
          actual: number | null;

          actualLabel: string | null;

          key: string;

          status: 'MET' | 'MISSED' | 'NO_DATA';
        }
      }

      export interface Appendix {
        methodology: string;

        notes: Array<string>;
      }

      export interface Chart {
        blocked: boolean;

        description: string | null;

        display: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

        error: string | null;

        interval: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

        name: string;

        omittedSeries: number;

        series: Array<Chart.Sery>;
      }

      export namespace Chart {
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

      export interface Check {
        checkName: string;

        comparable: boolean;

        deltaPts: number | null;

        evaluatedCount: number;

        failedCount: number;

        isTarget: boolean;

        metricDefinitionId: string;

        metricSlug: string;

        passRatePct: number | null;

        previousPassRatePct: number | null;
      }

      export interface Evidence {
        failingConversationCount: number;

        failingCountIsLowerBound: boolean;

        readConversationCount: number;

        sampled: boolean;
      }

      export interface ExecutiveSummary {
        keyFindings: Array<ExecutiveSummary.KeyFinding>;

        paragraphs: Array<string>;

        sections?: Array<ExecutiveSummary.Section>;
      }

      export namespace ExecutiveSummary {
        export interface KeyFinding {
          body: string;

          title: string;

          calls?: Array<KeyFinding.Call>;
        }

        export namespace KeyFinding {
          export interface Call {
            callId: string | null;

            conversationId: string;

            cueMs: number | null;

            personaName: string | null;
          }
        }

        export interface Section {
          body: string;

          heading: string | null;
        }
      }

      export interface Headline {
        agentName: string | null;

        cadence: 'DAILY' | 'WEEKLY' | 'MONTHLY' | null;

        periodEndIso: string;

        periodLabel: string;

        periodStartIso: string;

        reportName: string;

        statTiles: Array<Headline.StatTile>;

        timezone: string;

        verdict: 'ON_TARGET' | 'OFF_TARGET' | 'NO_TARGETS' | 'NO_DATA';

        verdictProse: string;
      }

      export namespace Headline {
        export interface StatTile {
          deltaDirection: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | null;

          label: string;

          sub: string | null;

          value: string;
        }
      }

      export interface Recommendation {
        afterText: string | null;

        beforeText: string | null;

        body: string;

        channel:
          | 'PROMPT'
          | 'VOICE_CONFIG'
          | 'STT'
          | 'SPEECH_MODEL'
          | 'LLM_MODEL'
          | 'INFRA'
          | 'EXTERNAL'
          | null;

        order: number;

        promptOptimizationFindingId: string | null;

        severity: 'HIGH' | 'MEDIUM' | 'LOW' | null;

        source: 'PROMPT_OPTIMIZER' | 'DEBRIEF';

        themeSlugs: Array<string>;

        title: string;
      }

      export interface Target {
        actual: number | null;

        actualLabel: string | null;

        aggregation: 'PASS_RATE' | 'AVG' | 'MEDIAN' | 'PERCENTILE' | 'MIN' | 'MAX';

        comparator: 'AT_LEAST' | 'AT_MOST';

        deltaDirection: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' | null;

        deltaLabel: string | null;

        error: string | null;

        failingConversationCount: number | null;

        key: string;

        label: string;

        lifecycle: 'NEW_MISS' | 'STILL_MISSED' | 'RECOVERED' | 'HOLDING' | null;

        metricDefinitionId: string | null;

        metricName: string;

        metricSlug: string;

        percentile: number | null;

        previous: number | null;

        previousLabel: string | null;

        sampleSize: number;

        series: Array<Target.Sery>;

        status: 'MET' | 'MISSED' | 'NO_DATA';

        targetLabel: string;

        targetValue: number;

        unit: 'PERCENT' | 'VALUE';
      }

      export namespace Target {
        export interface Sery {
          date: string;

          sampleSize: number | null;

          value: number | null;
        }
      }

      export interface Theme {
        affectedConversationCount: number;

        analysis: string;

        checkNames: Array<string>;

        collectorQuote: Theme.CollectorQuote | null;

        estimatedAffectedConversationCount: number | null;

        excerpts: Array<Theme.Excerpt>;

        flaggedForImpact: boolean;

        impact: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | null;

        impactReason: string | null;

        issue: Theme.Issue | null;

        lifecycle: 'NEW' | 'PERSISTENT' | 'IMPROVING' | 'FIXED' | null;

        memberConversationIds: Array<string>;

        metricDefinitionIds: Array<string>;

        prevalence: 'WIDESPREAD' | 'RECURRING' | 'ISOLATED' | null;

        rootCauseChannel:
          | 'PROMPT'
          | 'VOICE_CONFIG'
          | 'STT'
          | 'SPEECH_MODEL'
          | 'LLM_MODEL'
          | 'INFRA'
          | 'EXTERNAL'
          | null;

        severity: 'HIGH' | 'MEDIUM' | 'LOW';

        slug: string;

        title: string;

        totalConversationCount: number;

        memberCalls?: Array<Theme.MemberCall>;
      }

      export namespace Theme {
        export interface CollectorQuote {
          conversationId: string;

          metricName: string;

          quote: string;
        }

        export interface Excerpt {
          callId: string | null;

          caption: string | null;

          conversationId: string;

          personaName: string | null;

          scenarioName: string | null;

          turns: Array<Excerpt.Turn>;
        }

        export namespace Excerpt {
          export interface Turn {
            flagNote: string | null;

            flagged: boolean;

            offsetMs: number | null;

            role: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER';

            text: string;
          }
        }

        export interface Issue {
          id: string;

          firstSeenAtIso: string | null;

          status: string;

          title: string;
        }

        export interface MemberCall {
          callId: string | null;

          conversationId: string;

          cueMs: number | null;

          personaName: string | null;
        }
      }

      export interface Volume {
        conversationCount: number;

        deltaPct: number | null;

        endings: Array<Volume.Ending>;

        previousConversationCount: number | null;

        series: Array<Volume.Sery>;
      }

      export namespace Volume {
        export interface Ending {
          count: number;

          label: string;

          sharePct: number;

          value: string;
        }

        export interface Sery {
          date: string;

          sampleSize: number | null;

          value: number | null;
        }
      }
    }
  }
}

export interface LiveReportCreateParams {
  name: string;

  agentId?: string | null;

  cadence?: 'DAILY' | 'WEEKLY' | 'MONTHLY';

  dashboardId?: string | null;

  deliveryHour?: number;

  description?: string | null;

  filters?: Array<LiveReportCreateParams.Filter>;

  /**
   * Write the report for the latest closed period right away. Default true.
   */
  generateNow?: boolean;

  includeTranscriptExcerpts?: boolean;

  notifications?: LiveReportCreateParams.Notifications;

  status?: 'ACTIVE' | 'PAUSED';

  targets?: Array<LiveReportCreateParams.Target>;

  timezone?: string;
}

export namespace LiveReportCreateParams {
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
     * Defaults to EQUALS. IS_SET / IS_NOT_SET (CALL_PROPERTY only) keep conversations
     * where the property is set, whatever the value, or missing (never sent, sent as
     * null, or removed); they take no value.
     */
    operator?:
      | 'EQUALS'
      | 'NOT_EQUALS'
      | 'GREATER_THAN'
      | 'GREATER_THAN_OR_EQUAL_TO'
      | 'LESS_THAN'
      | 'LESS_THAN_OR_EQUAL_TO'
      | 'CONTAINS'
      | 'STARTS_WITH'
      | 'IS_SET'
      | 'IS_NOT_SET';

    /**
     * The property to compare. Required for CALL_PROPERTY and METRIC_PROPERTY; may be
     * omitted for AGENT_PROPERTY, DATASET, MODALITY and CALL_ID.
     */
    property?: string;

    /**
     * The value to compare against (an agent id, "call" / "chat", a property value).
     * Required except with IS_SET / IS_NOT_SET.
     */
    value?: string | number | boolean;
  }

  export interface Notifications {
    email: Notifications.Email;

    slack: Array<Notifications.Slack>;
  }

  export namespace Notifications {
    export interface Email {
      enabled: boolean;

      recipients: Array<string>;
    }

    export interface Slack {
      channelId: string;

      channelName: string;
    }
  }

  export interface Target {
    /**
     * The metric's slug (e.g. `task_completion`) or id.
     */
    metric: string;

    /**
     * The bar, in display units. A PASS_RATE bar is a percentage, 0-100.
     */
    value: number;

    /**
     * Defaults to PASS_RATE for thresholds and booleans, AVG for anything numeric.
     */
    aggregation?: 'PASS_RATE' | 'AVG' | 'MEDIAN' | 'PERCENTILE' | 'MIN' | 'MAX';

    /**
     * AT_LEAST (default for PASS_RATE) or AT_MOST (default for every other
     * aggregation).
     */
    comparator?: 'AT_LEAST' | 'AT_MOST';

    /**
     * Shown instead of the metric's name.
     */
    label?: string;

    /**
     * PASS_RATE on a metric that isn't a threshold: the per-call condition a call
     * passes on.
     */
    passOperator?:
      | 'EQUALS'
      | 'NOT_EQUALS'
      | 'GREATER_THAN'
      | 'GREATER_THAN_OR_EQUAL_TO'
      | 'LESS_THAN'
      | 'LESS_THAN_OR_EQUAL_TO';

    passValue?: string | number | boolean;

    /**
     * Required with PERCENTILE, e.g. 95.
     */
    percentile?: number;
  }
}

export interface LiveReportUpdateParams {
  agentId?: string | null;

  cadence?: 'DAILY' | 'WEEKLY' | 'MONTHLY';

  dashboardId?: string | null;

  deliveryHour?: number;

  description?: string | null;

  filters?: Array<LiveReportUpdateParams.Filter>;

  includeTranscriptExcerpts?: boolean;

  name?: string;

  notifications?: LiveReportUpdateParams.Notifications;

  status?: 'ACTIVE' | 'PAUSED';

  targets?: Array<LiveReportUpdateParams.Target>;

  timezone?: string;
}

export namespace LiveReportUpdateParams {
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
     * Defaults to EQUALS. IS_SET / IS_NOT_SET (CALL_PROPERTY only) keep conversations
     * where the property is set, whatever the value, or missing (never sent, sent as
     * null, or removed); they take no value.
     */
    operator?:
      | 'EQUALS'
      | 'NOT_EQUALS'
      | 'GREATER_THAN'
      | 'GREATER_THAN_OR_EQUAL_TO'
      | 'LESS_THAN'
      | 'LESS_THAN_OR_EQUAL_TO'
      | 'CONTAINS'
      | 'STARTS_WITH'
      | 'IS_SET'
      | 'IS_NOT_SET';

    /**
     * The property to compare. Required for CALL_PROPERTY and METRIC_PROPERTY; may be
     * omitted for AGENT_PROPERTY, DATASET, MODALITY and CALL_ID.
     */
    property?: string;

    /**
     * The value to compare against (an agent id, "call" / "chat", a property value).
     * Required except with IS_SET / IS_NOT_SET.
     */
    value?: string | number | boolean;
  }

  export interface Notifications {
    email: Notifications.Email;

    slack: Array<Notifications.Slack>;
  }

  export namespace Notifications {
    export interface Email {
      enabled: boolean;

      recipients: Array<string>;
    }

    export interface Slack {
      channelId: string;

      channelName: string;
    }
  }

  export interface Target {
    /**
     * The metric's slug (e.g. `task_completion`) or id.
     */
    metric: string;

    /**
     * The bar, in display units. A PASS_RATE bar is a percentage, 0-100.
     */
    value: number;

    /**
     * Defaults to PASS_RATE for thresholds and booleans, AVG for anything numeric.
     */
    aggregation?: 'PASS_RATE' | 'AVG' | 'MEDIAN' | 'PERCENTILE' | 'MIN' | 'MAX';

    /**
     * AT_LEAST (default for PASS_RATE) or AT_MOST (default for every other
     * aggregation).
     */
    comparator?: 'AT_LEAST' | 'AT_MOST';

    /**
     * Shown instead of the metric's name.
     */
    label?: string;

    /**
     * PASS_RATE on a metric that isn't a threshold: the per-call condition a call
     * passes on.
     */
    passOperator?:
      | 'EQUALS'
      | 'NOT_EQUALS'
      | 'GREATER_THAN'
      | 'GREATER_THAN_OR_EQUAL_TO'
      | 'LESS_THAN'
      | 'LESS_THAN_OR_EQUAL_TO';

    passValue?: string | number | boolean;

    /**
     * Required with PERCENTILE, e.g. 95.
     */
    percentile?: number;
  }
}

export interface LiveReportListParams {
  /**
   * Page size, at most 100.
   */
  limit?: number;

  offset?: number;
}

export interface LiveReportGetDocumentParams {
  /**
   * The live report ID
   */
  reportId: string;
}

export interface LiveReportListDocumentsParams {
  /**
   * Page size, at most 100.
   */
  limit?: number;

  offset?: number;
}

export interface LiveReportRunParams {
  /**
   * ISO 8601 end (exclusive) of a custom window. Requires periodStart.
   */
  periodEnd?: string;

  /**
   * ISO 8601 start of a custom window. Omit both for the latest closed period.
   */
  periodStart?: string;
}

export declare namespace LiveReport {
  export {
    type LiveReportCreateResponse as LiveReportCreateResponse,
    type LiveReportUpdateResponse as LiveReportUpdateResponse,
    type LiveReportListResponse as LiveReportListResponse,
    type LiveReportDeleteResponse as LiveReportDeleteResponse,
    type LiveReportGetByIDResponse as LiveReportGetByIDResponse,
    type LiveReportGetDocumentResponse as LiveReportGetDocumentResponse,
    type LiveReportListDocumentsResponse as LiveReportListDocumentsResponse,
    type LiveReportRunResponse as LiveReportRunResponse,
    type LiveReportCreateParams as LiveReportCreateParams,
    type LiveReportUpdateParams as LiveReportUpdateParams,
    type LiveReportListParams as LiveReportListParams,
    type LiveReportGetDocumentParams as LiveReportGetDocumentParams,
    type LiveReportListDocumentsParams as LiveReportListDocumentsParams,
    type LiveReportRunParams as LiveReportRunParams,
  };
}
