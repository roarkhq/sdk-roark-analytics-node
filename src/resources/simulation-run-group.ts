// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SimulationRunGroup extends APIResource {
  /**
   * Groups several simulation runs so they read as one, and starts generating the
   * group report: one document across every run, with a scorecard summed across them
   * and the issues found, each merged from the per-run debriefs.
   *
   * Send `simulationRunPlanJobIds` to group runs that already exist (runs still in
   * progress are fine: the report waits for them). Send `simulationRunPlanIds` to
   * start one run of each plan and group those; this places real calls, exactly as
   * starting each plan would.
   *
   * Poll GET /v1/simulation/run-group/{groupId} until `latestReport.status` is
   * READY.
   *
   * @example
   * ```ts
   * const simulationRunGroup =
   *   await client.simulationRunGroup.create();
   * ```
   */
  create(
    body: SimulationRunGroupCreateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationRunGroupCreateResponse> {
    return this._client.post('/v1/simulation/run-group', { body, ...options });
  }

  /**
   * Returns the run groups in the project, newest first, with their runs and where
   * each group report stands. Read a report document from GET
   * /v1/simulation/run-group/{groupId}.
   *
   * @example
   * ```ts
   * const simulationRunGroups =
   *   await client.simulationRunGroup.list();
   * ```
   */
  list(
    query: SimulationRunGroupListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationRunGroupListResponse> {
    return this._client.get('/v1/simulation/run-group', { query, ...options });
  }

  /**
   * Deletes a run group. Its runs, and their results, are untouched.
   *
   * @example
   * ```ts
   * const simulationRunGroup =
   *   await client.simulationRunGroup.delete(
   *     '5b6c7d8e-9f0a-4b1c-8d2e-3f4a5b6c7d8e',
   *   );
   * ```
   */
  delete(groupID: string, options?: RequestOptions): APIPromise<SimulationRunGroupDeleteResponse> {
    return this._client.delete(path`/v1/simulation/run-group/${groupID}`, options);
  }

  /**
   * Returns a run group with its runs in group order and its latest group report,
   * including the report document once READY.
   *
   * @example
   * ```ts
   * const response = await client.simulationRunGroup.getByID(
   *   '5b6c7d8e-9f0a-4b1c-8d2e-3f4a5b6c7d8e',
   * );
   * ```
   */
  getByID(groupID: string, options?: RequestOptions): APIPromise<SimulationRunGroupGetByIDResponse> {
    return this._client.get(path`/v1/simulation/run-group/${groupID}`, options);
  }

  /**
   * Generates the group report again over the latest state of its runs. Returns the
   * report generation; if one is already in flight it is returned instead of
   * starting another. Poll GET /v1/simulation/run-group/{groupId} until
   * `latestReport.status` is READY.
   *
   * @example
   * ```ts
   * const response =
   *   await client.simulationRunGroup.regenerateReport(
   *     '5b6c7d8e-9f0a-4b1c-8d2e-3f4a5b6c7d8e',
   *   );
   * ```
   */
  regenerateReport(
    groupID: string,
    options?: RequestOptions,
  ): APIPromise<SimulationRunGroupRegenerateReportResponse> {
    return this._client.post(path`/v1/simulation/run-group/${groupID}/report`, options);
  }
}

export interface SimulationRunGroupCreateResponse {
  /**
   * Several simulation runs read as one.
   */
  data: SimulationRunGroupCreateResponse.Data;
}

export namespace SimulationRunGroupCreateResponse {
  /**
   * Several simulation runs read as one.
   */
  export interface Data {
    id: string;

    /**
     * ISO 8601
     */
    createdAt: string;

    /**
     * One generation of the group report.
     */
    latestReport: Data.LatestReport | null;

    name: string;

    runCount: number;

    runs: Array<Data.Run>;
  }

  export namespace Data {
    /**
     * One generation of the group report.
     */
    export interface LatestReport {
      id: string;

      /**
       * ISO 8601. Null until the report settles.
       */
      completedAt: string | null;

      /**
       * ISO 8601
       */
      createdAt: string;

      /**
       * The group report: the runs it covers, a scorecard summed across them, what went
       * well, and the issues found, each merged from the per-run debriefs with
       * call-level evidence. Every figure is computed from the runs; the prose is
       * AI-written around those facts.
       */
      document: LatestReport.Document | null;

      errorMessage: string | null;

      /**
       * PENDING and GENERATING are in flight; READY carries the document; FAILED carries
       * errorMessage.
       */
      status: 'PENDING' | 'GENERATING' | 'READY' | 'FAILED';
    }

    export namespace LatestReport {
      /**
       * The group report: the runs it covers, a scorecard summed across them, what went
       * well, and the issues found, each merged from the per-run debriefs with
       * call-level evidence. Every figure is computed from the runs; the prose is
       * AI-written around those facts.
       */
      export interface Document {
        aggregates: Array<Document.Aggregate>;

        executiveSummary: Array<Document.ExecutiveSummary>;

        generatedAtIso: string;

        headline: Document.Headline;

        issues: Array<Document.Issue>;

        methodology: string;

        model: string;

        recommendations: Array<Document.Recommendation>;

        runs: Array<Document.Run>;

        scorecard: Array<Document.Scorecard>;

        simulationRunGroupId: string;

        smallerItems: Array<Document.SmallerItem>;

        version: 1;

        wentWell: Array<Document.WentWell>;
      }

      export namespace Document {
        export interface Aggregate {
          averageLabel: string | null;

          evaluatedCount: number;

          medianLabel: string | null;

          metricName: string;

          p95Label: string | null;
        }

        export interface ExecutiveSummary {
          body: string;

          heading: string;
        }

        export interface Headline {
          callCount: number;

          completedAtIso: string | null;

          groupName: string;

          passedRunCount: number;

          reportedRunCount: number;

          runCount: number;

          statTiles: Array<Headline.StatTile>;

          verdict: 'PASSED' | 'THRESHOLD_FAILED';

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

        export interface Issue {
          affectedCallCount: number;

          body: string;

          calls: Array<Issue.Call>;

          checkNames: Array<string>;

          evidence: Array<Issue.Evidence>;

          order: number;

          rootCauseChannel:
            | 'PROMPT'
            | 'VOICE_CONFIG'
            | 'STT'
            | 'SPEECH_MODEL'
            | 'LLM_MODEL'
            | 'INFRA'
            | 'EXTERNAL'
            | null;

          runLabels: Array<string>;

          severity: 'HIGH' | 'MEDIUM' | 'LOW';

          sourceThemes: Array<Issue.SourceTheme>;

          title: string;
        }

        export namespace Issue {
          export interface Call {
            callId: string | null;

            conversationId: string;

            cueMs: number | null;

            personaName: string | null;

            simulationRunPlanJobId: string;
          }

          export interface Evidence {
            callId: string | null;

            conversationId: string;

            cueMs: number | null;

            personaName: string | null;

            simulationRunPlanJobId: string;

            text: string;
          }

          export interface SourceTheme {
            simulationRunPlanJobId: string;

            slug: string;
          }
        }

        export interface Recommendation {
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

          issueOrders: Array<number>;

          order: number;

          title: string;
        }

        export interface Run {
          callCount: number;

          checksPassed: number;

          checksTotal: number;

          completedAtIso: string | null;

          runLabel: string;

          runNumber: number | null;

          simulationRunPlanJobId: string;

          status:
            | 'PENDING'
            | 'QUEUED'
            | 'CREATING_SNAPSHOTS'
            | 'CREATING_SIMULATIONS'
            | 'PREPARING_CAPACITY'
            | 'RUNNING_SIMULATIONS'
            | 'COMPLETED'
            | 'FAILED'
            | 'TIMED_OUT'
            | 'CANCELLED'
            | 'CANCELLING'
            | 'ENDING_SIMULATIONS';

          summary: string | null;

          themeCount: number;

          verdict: 'PASSED' | 'THRESHOLD_FAILED' | null;
        }

        export interface Scorecard {
          checkName: string;

          evaluatedCount: number;

          failedCount: number;

          failedRunCount: number;

          passRatePct: number | null;

          runCount: number;
        }

        export interface SmallerItem {
          affectedCallCount: number;

          body: string;

          calls: Array<SmallerItem.Call>;

          checkNames: Array<string>;

          evidence: Array<SmallerItem.Evidence>;

          order: number;

          rootCauseChannel:
            | 'PROMPT'
            | 'VOICE_CONFIG'
            | 'STT'
            | 'SPEECH_MODEL'
            | 'LLM_MODEL'
            | 'INFRA'
            | 'EXTERNAL'
            | null;

          runLabels: Array<string>;

          severity: 'HIGH' | 'MEDIUM' | 'LOW';

          sourceThemes: Array<SmallerItem.SourceTheme>;

          title: string;
        }

        export namespace SmallerItem {
          export interface Call {
            callId: string | null;

            conversationId: string;

            cueMs: number | null;

            personaName: string | null;

            simulationRunPlanJobId: string;
          }

          export interface Evidence {
            callId: string | null;

            conversationId: string;

            cueMs: number | null;

            personaName: string | null;

            simulationRunPlanJobId: string;

            text: string;
          }

          export interface SourceTheme {
            simulationRunPlanJobId: string;

            slug: string;
          }
        }

        export interface WentWell {
          body: string;

          evidence: Array<WentWell.Evidence>;

          title: string;
        }

        export namespace WentWell {
          export interface Evidence {
            callId: string | null;

            conversationId: string;

            cueMs: number | null;

            personaName: string | null;

            simulationRunPlanJobId: string;

            text: string;
          }
        }
      }
    }

    /**
     * One run in the group, in group order.
     */
    export interface Run {
      /**
       * ISO 8601
       */
      createdAt: string;

      endedAt: string | null;

      /**
       * The name of the plan the run ran. Null when the plan was deleted.
       */
      planName: string | null;

      /**
       * Per-project run number, shown as SR-42 in the app.
       */
      runNumber: number | null;

      simulationRunPlanId: string;

      /**
       * The run, readable at GET /v1/simulation/plan/job/{jobId}
       */
      simulationRunPlanJobId: string;

      startedAt: string | null;

      status:
        | 'PENDING'
        | 'QUEUED'
        | 'CREATING_SNAPSHOTS'
        | 'CREATING_SIMULATIONS'
        | 'PREPARING_CAPACITY'
        | 'RUNNING_SIMULATIONS'
        | 'COMPLETED'
        | 'FAILED'
        | 'TIMED_OUT'
        | 'CANCELLED'
        | 'CANCELLING'
        | 'ENDING_SIMULATIONS';
    }
  }
}

export interface SimulationRunGroupListResponse {
  data: Array<SimulationRunGroupListResponse.Data>;

  pagination: SimulationRunGroupListResponse.Pagination;
}

export namespace SimulationRunGroupListResponse {
  export interface Data {
    id: string;

    /**
     * ISO 8601
     */
    createdAt: string;

    /**
     * Where the group report stands, without its document.
     */
    latestReport: Data.LatestReport | null;

    name: string;

    runCount: number;

    runs: Array<Data.Run>;
  }

  export namespace Data {
    /**
     * Where the group report stands, without its document.
     */
    export interface LatestReport {
      id: string;

      /**
       * ISO 8601. Null until the report settles.
       */
      completedAt: string | null;

      /**
       * ISO 8601
       */
      createdAt: string;

      errorMessage: string | null;

      /**
       * PENDING and GENERATING are in flight; READY carries the document; FAILED carries
       * errorMessage.
       */
      status: 'PENDING' | 'GENERATING' | 'READY' | 'FAILED';
    }

    /**
     * One run in the group, in group order.
     */
    export interface Run {
      /**
       * ISO 8601
       */
      createdAt: string;

      endedAt: string | null;

      /**
       * The name of the plan the run ran. Null when the plan was deleted.
       */
      planName: string | null;

      /**
       * Per-project run number, shown as SR-42 in the app.
       */
      runNumber: number | null;

      simulationRunPlanId: string;

      /**
       * The run, readable at GET /v1/simulation/plan/job/{jobId}
       */
      simulationRunPlanJobId: string;

      startedAt: string | null;

      status:
        | 'PENDING'
        | 'QUEUED'
        | 'CREATING_SNAPSHOTS'
        | 'CREATING_SIMULATIONS'
        | 'PREPARING_CAPACITY'
        | 'RUNNING_SIMULATIONS'
        | 'COMPLETED'
        | 'FAILED'
        | 'TIMED_OUT'
        | 'CANCELLED'
        | 'CANCELLING'
        | 'ENDING_SIMULATIONS';
    }
  }

  export interface Pagination {
    hasMore: boolean;

    limit: number;

    offset: number;

    /**
     * Total run groups in the project, ignoring this page.
     */
    total: number;
  }
}

export interface SimulationRunGroupDeleteResponse {
  data: SimulationRunGroupDeleteResponse.Data;
}

export namespace SimulationRunGroupDeleteResponse {
  export interface Data {
    /**
     * Whether the run group was deleted
     */
    deleted: boolean;
  }
}

export interface SimulationRunGroupGetByIDResponse {
  /**
   * Several simulation runs read as one.
   */
  data: SimulationRunGroupGetByIDResponse.Data;
}

export namespace SimulationRunGroupGetByIDResponse {
  /**
   * Several simulation runs read as one.
   */
  export interface Data {
    id: string;

    /**
     * ISO 8601
     */
    createdAt: string;

    /**
     * One generation of the group report.
     */
    latestReport: Data.LatestReport | null;

    name: string;

    runCount: number;

    runs: Array<Data.Run>;
  }

  export namespace Data {
    /**
     * One generation of the group report.
     */
    export interface LatestReport {
      id: string;

      /**
       * ISO 8601. Null until the report settles.
       */
      completedAt: string | null;

      /**
       * ISO 8601
       */
      createdAt: string;

      /**
       * The group report: the runs it covers, a scorecard summed across them, what went
       * well, and the issues found, each merged from the per-run debriefs with
       * call-level evidence. Every figure is computed from the runs; the prose is
       * AI-written around those facts.
       */
      document: LatestReport.Document | null;

      errorMessage: string | null;

      /**
       * PENDING and GENERATING are in flight; READY carries the document; FAILED carries
       * errorMessage.
       */
      status: 'PENDING' | 'GENERATING' | 'READY' | 'FAILED';
    }

    export namespace LatestReport {
      /**
       * The group report: the runs it covers, a scorecard summed across them, what went
       * well, and the issues found, each merged from the per-run debriefs with
       * call-level evidence. Every figure is computed from the runs; the prose is
       * AI-written around those facts.
       */
      export interface Document {
        aggregates: Array<Document.Aggregate>;

        executiveSummary: Array<Document.ExecutiveSummary>;

        generatedAtIso: string;

        headline: Document.Headline;

        issues: Array<Document.Issue>;

        methodology: string;

        model: string;

        recommendations: Array<Document.Recommendation>;

        runs: Array<Document.Run>;

        scorecard: Array<Document.Scorecard>;

        simulationRunGroupId: string;

        smallerItems: Array<Document.SmallerItem>;

        version: 1;

        wentWell: Array<Document.WentWell>;
      }

      export namespace Document {
        export interface Aggregate {
          averageLabel: string | null;

          evaluatedCount: number;

          medianLabel: string | null;

          metricName: string;

          p95Label: string | null;
        }

        export interface ExecutiveSummary {
          body: string;

          heading: string;
        }

        export interface Headline {
          callCount: number;

          completedAtIso: string | null;

          groupName: string;

          passedRunCount: number;

          reportedRunCount: number;

          runCount: number;

          statTiles: Array<Headline.StatTile>;

          verdict: 'PASSED' | 'THRESHOLD_FAILED';

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

        export interface Issue {
          affectedCallCount: number;

          body: string;

          calls: Array<Issue.Call>;

          checkNames: Array<string>;

          evidence: Array<Issue.Evidence>;

          order: number;

          rootCauseChannel:
            | 'PROMPT'
            | 'VOICE_CONFIG'
            | 'STT'
            | 'SPEECH_MODEL'
            | 'LLM_MODEL'
            | 'INFRA'
            | 'EXTERNAL'
            | null;

          runLabels: Array<string>;

          severity: 'HIGH' | 'MEDIUM' | 'LOW';

          sourceThemes: Array<Issue.SourceTheme>;

          title: string;
        }

        export namespace Issue {
          export interface Call {
            callId: string | null;

            conversationId: string;

            cueMs: number | null;

            personaName: string | null;

            simulationRunPlanJobId: string;
          }

          export interface Evidence {
            callId: string | null;

            conversationId: string;

            cueMs: number | null;

            personaName: string | null;

            simulationRunPlanJobId: string;

            text: string;
          }

          export interface SourceTheme {
            simulationRunPlanJobId: string;

            slug: string;
          }
        }

        export interface Recommendation {
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

          issueOrders: Array<number>;

          order: number;

          title: string;
        }

        export interface Run {
          callCount: number;

          checksPassed: number;

          checksTotal: number;

          completedAtIso: string | null;

          runLabel: string;

          runNumber: number | null;

          simulationRunPlanJobId: string;

          status:
            | 'PENDING'
            | 'QUEUED'
            | 'CREATING_SNAPSHOTS'
            | 'CREATING_SIMULATIONS'
            | 'PREPARING_CAPACITY'
            | 'RUNNING_SIMULATIONS'
            | 'COMPLETED'
            | 'FAILED'
            | 'TIMED_OUT'
            | 'CANCELLED'
            | 'CANCELLING'
            | 'ENDING_SIMULATIONS';

          summary: string | null;

          themeCount: number;

          verdict: 'PASSED' | 'THRESHOLD_FAILED' | null;
        }

        export interface Scorecard {
          checkName: string;

          evaluatedCount: number;

          failedCount: number;

          failedRunCount: number;

          passRatePct: number | null;

          runCount: number;
        }

        export interface SmallerItem {
          affectedCallCount: number;

          body: string;

          calls: Array<SmallerItem.Call>;

          checkNames: Array<string>;

          evidence: Array<SmallerItem.Evidence>;

          order: number;

          rootCauseChannel:
            | 'PROMPT'
            | 'VOICE_CONFIG'
            | 'STT'
            | 'SPEECH_MODEL'
            | 'LLM_MODEL'
            | 'INFRA'
            | 'EXTERNAL'
            | null;

          runLabels: Array<string>;

          severity: 'HIGH' | 'MEDIUM' | 'LOW';

          sourceThemes: Array<SmallerItem.SourceTheme>;

          title: string;
        }

        export namespace SmallerItem {
          export interface Call {
            callId: string | null;

            conversationId: string;

            cueMs: number | null;

            personaName: string | null;

            simulationRunPlanJobId: string;
          }

          export interface Evidence {
            callId: string | null;

            conversationId: string;

            cueMs: number | null;

            personaName: string | null;

            simulationRunPlanJobId: string;

            text: string;
          }

          export interface SourceTheme {
            simulationRunPlanJobId: string;

            slug: string;
          }
        }

        export interface WentWell {
          body: string;

          evidence: Array<WentWell.Evidence>;

          title: string;
        }

        export namespace WentWell {
          export interface Evidence {
            callId: string | null;

            conversationId: string;

            cueMs: number | null;

            personaName: string | null;

            simulationRunPlanJobId: string;

            text: string;
          }
        }
      }
    }

    /**
     * One run in the group, in group order.
     */
    export interface Run {
      /**
       * ISO 8601
       */
      createdAt: string;

      endedAt: string | null;

      /**
       * The name of the plan the run ran. Null when the plan was deleted.
       */
      planName: string | null;

      /**
       * Per-project run number, shown as SR-42 in the app.
       */
      runNumber: number | null;

      simulationRunPlanId: string;

      /**
       * The run, readable at GET /v1/simulation/plan/job/{jobId}
       */
      simulationRunPlanJobId: string;

      startedAt: string | null;

      status:
        | 'PENDING'
        | 'QUEUED'
        | 'CREATING_SNAPSHOTS'
        | 'CREATING_SIMULATIONS'
        | 'PREPARING_CAPACITY'
        | 'RUNNING_SIMULATIONS'
        | 'COMPLETED'
        | 'FAILED'
        | 'TIMED_OUT'
        | 'CANCELLED'
        | 'CANCELLING'
        | 'ENDING_SIMULATIONS';
    }
  }
}

export interface SimulationRunGroupRegenerateReportResponse {
  /**
   * One generation of the group report.
   */
  data: SimulationRunGroupRegenerateReportResponse.Data;
}

export namespace SimulationRunGroupRegenerateReportResponse {
  /**
   * One generation of the group report.
   */
  export interface Data {
    id: string;

    /**
     * ISO 8601. Null until the report settles.
     */
    completedAt: string | null;

    /**
     * ISO 8601
     */
    createdAt: string;

    /**
     * The group report: the runs it covers, a scorecard summed across them, what went
     * well, and the issues found, each merged from the per-run debriefs with
     * call-level evidence. Every figure is computed from the runs; the prose is
     * AI-written around those facts.
     */
    document: Data.Document | null;

    errorMessage: string | null;

    /**
     * PENDING and GENERATING are in flight; READY carries the document; FAILED carries
     * errorMessage.
     */
    status: 'PENDING' | 'GENERATING' | 'READY' | 'FAILED';
  }

  export namespace Data {
    /**
     * The group report: the runs it covers, a scorecard summed across them, what went
     * well, and the issues found, each merged from the per-run debriefs with
     * call-level evidence. Every figure is computed from the runs; the prose is
     * AI-written around those facts.
     */
    export interface Document {
      aggregates: Array<Document.Aggregate>;

      executiveSummary: Array<Document.ExecutiveSummary>;

      generatedAtIso: string;

      headline: Document.Headline;

      issues: Array<Document.Issue>;

      methodology: string;

      model: string;

      recommendations: Array<Document.Recommendation>;

      runs: Array<Document.Run>;

      scorecard: Array<Document.Scorecard>;

      simulationRunGroupId: string;

      smallerItems: Array<Document.SmallerItem>;

      version: 1;

      wentWell: Array<Document.WentWell>;
    }

    export namespace Document {
      export interface Aggregate {
        averageLabel: string | null;

        evaluatedCount: number;

        medianLabel: string | null;

        metricName: string;

        p95Label: string | null;
      }

      export interface ExecutiveSummary {
        body: string;

        heading: string;
      }

      export interface Headline {
        callCount: number;

        completedAtIso: string | null;

        groupName: string;

        passedRunCount: number;

        reportedRunCount: number;

        runCount: number;

        statTiles: Array<Headline.StatTile>;

        verdict: 'PASSED' | 'THRESHOLD_FAILED';

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

      export interface Issue {
        affectedCallCount: number;

        body: string;

        calls: Array<Issue.Call>;

        checkNames: Array<string>;

        evidence: Array<Issue.Evidence>;

        order: number;

        rootCauseChannel:
          | 'PROMPT'
          | 'VOICE_CONFIG'
          | 'STT'
          | 'SPEECH_MODEL'
          | 'LLM_MODEL'
          | 'INFRA'
          | 'EXTERNAL'
          | null;

        runLabels: Array<string>;

        severity: 'HIGH' | 'MEDIUM' | 'LOW';

        sourceThemes: Array<Issue.SourceTheme>;

        title: string;
      }

      export namespace Issue {
        export interface Call {
          callId: string | null;

          conversationId: string;

          cueMs: number | null;

          personaName: string | null;

          simulationRunPlanJobId: string;
        }

        export interface Evidence {
          callId: string | null;

          conversationId: string;

          cueMs: number | null;

          personaName: string | null;

          simulationRunPlanJobId: string;

          text: string;
        }

        export interface SourceTheme {
          simulationRunPlanJobId: string;

          slug: string;
        }
      }

      export interface Recommendation {
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

        issueOrders: Array<number>;

        order: number;

        title: string;
      }

      export interface Run {
        callCount: number;

        checksPassed: number;

        checksTotal: number;

        completedAtIso: string | null;

        runLabel: string;

        runNumber: number | null;

        simulationRunPlanJobId: string;

        status:
          | 'PENDING'
          | 'QUEUED'
          | 'CREATING_SNAPSHOTS'
          | 'CREATING_SIMULATIONS'
          | 'PREPARING_CAPACITY'
          | 'RUNNING_SIMULATIONS'
          | 'COMPLETED'
          | 'FAILED'
          | 'TIMED_OUT'
          | 'CANCELLED'
          | 'CANCELLING'
          | 'ENDING_SIMULATIONS';

        summary: string | null;

        themeCount: number;

        verdict: 'PASSED' | 'THRESHOLD_FAILED' | null;
      }

      export interface Scorecard {
        checkName: string;

        evaluatedCount: number;

        failedCount: number;

        failedRunCount: number;

        passRatePct: number | null;

        runCount: number;
      }

      export interface SmallerItem {
        affectedCallCount: number;

        body: string;

        calls: Array<SmallerItem.Call>;

        checkNames: Array<string>;

        evidence: Array<SmallerItem.Evidence>;

        order: number;

        rootCauseChannel:
          | 'PROMPT'
          | 'VOICE_CONFIG'
          | 'STT'
          | 'SPEECH_MODEL'
          | 'LLM_MODEL'
          | 'INFRA'
          | 'EXTERNAL'
          | null;

        runLabels: Array<string>;

        severity: 'HIGH' | 'MEDIUM' | 'LOW';

        sourceThemes: Array<SmallerItem.SourceTheme>;

        title: string;
      }

      export namespace SmallerItem {
        export interface Call {
          callId: string | null;

          conversationId: string;

          cueMs: number | null;

          personaName: string | null;

          simulationRunPlanJobId: string;
        }

        export interface Evidence {
          callId: string | null;

          conversationId: string;

          cueMs: number | null;

          personaName: string | null;

          simulationRunPlanJobId: string;

          text: string;
        }

        export interface SourceTheme {
          simulationRunPlanJobId: string;

          slug: string;
        }
      }

      export interface WentWell {
        body: string;

        evidence: Array<WentWell.Evidence>;

        title: string;
      }

      export namespace WentWell {
        export interface Evidence {
          callId: string | null;

          conversationId: string;

          cueMs: number | null;

          personaName: string | null;

          simulationRunPlanJobId: string;

          text: string;
        }
      }
    }
  }
}

export interface SimulationRunGroupCreateParams {
  /**
   * What to call the group. Defaults to the plans' names when starting plans, and to
   * the runs' plan names when grouping existing runs.
   */
  name?: string;

  /**
   * Plans to run once each, in display order (2 to 20). Each plan starts a run,
   * exactly as POST /v1/simulation/plan/{planId}/job would. Send this or
   * `simulationRunPlanJobIds`, not both.
   */
  simulationRunPlanIds?: Array<string>;

  /**
   * Runs that already exist, in display order (2 to 20). Runs still in progress are
   * fine: the group report waits for them. Send this or `simulationRunPlanIds`, not
   * both.
   */
  simulationRunPlanJobIds?: Array<string>;
}

export interface SimulationRunGroupListParams {
  /**
   * Maximum number of run groups to return (default: 20, max: 100)
   */
  limit?: number;

  /**
   * Pagination offset
   */
  offset?: number;
}

export declare namespace SimulationRunGroup {
  export {
    type SimulationRunGroupCreateResponse as SimulationRunGroupCreateResponse,
    type SimulationRunGroupListResponse as SimulationRunGroupListResponse,
    type SimulationRunGroupDeleteResponse as SimulationRunGroupDeleteResponse,
    type SimulationRunGroupGetByIDResponse as SimulationRunGroupGetByIDResponse,
    type SimulationRunGroupRegenerateReportResponse as SimulationRunGroupRegenerateReportResponse,
    type SimulationRunGroupCreateParams as SimulationRunGroupCreateParams,
    type SimulationRunGroupListParams as SimulationRunGroupListParams,
  };
}
