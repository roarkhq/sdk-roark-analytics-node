// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SimulationGroup extends APIResource {
  /**
   * Saves a named set of plans to run together, again and again. Nothing runs yet:
   * POST /v1/simulation/group/{groupId}/run starts one run of every plan and groups
   * them into a run group with one combined report.
   *
   * Slack channels need Slack connected to the project. Email is on by default.
   *
   * @example
   * ```ts
   * const simulationGroup = await client.simulationGroup.create(
   *   {
   *     name: 'Release regression',
   *     simulationRunPlanIds: [
   *       '3c1d2e4f-5a6b-4c7d-8e9f-0a1b2c3d4e5f',
   *       '6d7e8f9a-0b1c-4d2e-9f3a-4b5c6d7e8f9a',
   *     ],
   *   },
   * );
   * ```
   */
  create(
    body: SimulationGroupCreateParams,
    options?: RequestOptions,
  ): APIPromise<SimulationGroupCreateResponse> {
    return this._client.post('/v1/simulation/group', { body, ...options });
  }

  /**
   * Edits a saved simulation group. Omitted fields keep their current value;
   * `notifications`, when sent, replaces the settings as a whole. Run groups it
   * already started keep theirs.
   *
   * A group managed by config as code (`configManaged: true`) returns 409: change it
   * in the config file.
   *
   * @example
   * ```ts
   * const simulationGroup = await client.simulationGroup.update(
   *   '2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d',
   * );
   * ```
   */
  update(
    groupID: string,
    body: SimulationGroupUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationGroupUpdateResponse> {
    return this._client.put(path`/v1/simulation/group/${groupID}`, { body, ...options });
  }

  /**
   * Returns the saved simulation groups in the project, most recently edited first,
   * each with its plans in run order and notification settings.
   *
   * @example
   * ```ts
   * const simulationGroups =
   *   await client.simulationGroup.list();
   * ```
   */
  list(
    query: SimulationGroupListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationGroupListResponse> {
    return this._client.get('/v1/simulation/group', { query, ...options });
  }

  /**
   * Deletes a saved simulation group and any schedules that run it. Run groups it
   * already started, and their reports, stay. A group managed by config as code
   * returns 409.
   *
   * @example
   * ```ts
   * const simulationGroup = await client.simulationGroup.delete(
   *   '2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d',
   * );
   * ```
   */
  delete(groupID: string, options?: RequestOptions): APIPromise<SimulationGroupDeleteResponse> {
    return this._client.delete(path`/v1/simulation/group/${groupID}`, options);
  }

  /**
   * Returns a saved simulation group with its plans in run order and notification
   * settings.
   *
   * @example
   * ```ts
   * const response = await client.simulationGroup.getByID(
   *   '2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d',
   * );
   * ```
   */
  getByID(groupID: string, options?: RequestOptions): APIPromise<SimulationGroupGetByIDResponse> {
    return this._client.get(path`/v1/simulation/group/${groupID}`, options);
  }

  /**
   * Starts one run of every plan in the group, exactly as POST
   * /v1/simulation/plan/{planId}/job would for each, and groups the runs into a run
   * group whose combined report is announced through the group's notification
   * settings once it is ready. This places real calls. Config-managed groups can be
   * run here too.
   *
   * Returns the run group. Poll GET /v1/simulation/run-group/{groupId} until
   * `latestReport.status` is READY.
   *
   * If a plan cannot start after others did, the runs that started are still grouped
   * and the 400 names the run group id.
   *
   * @example
   * ```ts
   * const response = await client.simulationGroup.run(
   *   '2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d',
   * );
   * ```
   */
  run(groupID: string, options?: RequestOptions): APIPromise<SimulationGroupRunResponse> {
    return this._client.post(path`/v1/simulation/group/${groupID}/run`, options);
  }
}

export interface SimulationGroupCreateResponse {
  /**
   * A saved, repeatable set of plans that run together. Each run starts one run of
   * every plan and groups them into a run group with one combined report.
   */
  data: SimulationGroupCreateResponse.Data;
}

export namespace SimulationGroupCreateResponse {
  /**
   * A saved, repeatable set of plans that run together. Each run starts one run of
   * every plan and groups them into a run group with one combined report.
   */
  export interface Data {
    id: string;

    /**
     * Whether this group is managed by config as code. A managed group can be run
     * here, but PUT and DELETE on it return 409: change it in the config file.
     */
    configManaged: boolean;

    /**
     * ISO 8601
     */
    createdAt: string;

    description: string | null;

    /**
     * ISO 8601. Null when it has never run.
     */
    lastRunAt: string | null;

    /**
     * The most recent run group it started, readable at GET
     * /v1/simulation/run-group/{groupId}. Null when it has never run.
     */
    latestRunGroupId: string | null;

    name: string;

    /**
     * Where each run's group report announces itself once it is ready.
     */
    notifications: Data.Notifications;

    /**
     * The plans in run order. A plan deleted since it was added is left out.
     */
    plans: Array<Data.Plan>;

    /**
     * ISO 8601
     */
    updatedAt: string;
  }

  export namespace Data {
    /**
     * Where each run's group report announces itself once it is ready.
     */
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

    export interface Plan {
      /**
       * The plan, readable at GET /v1/simulation/plan/{planId}
       */
      id: string;

      name: string;
    }
  }
}

export interface SimulationGroupUpdateResponse {
  /**
   * A saved, repeatable set of plans that run together. Each run starts one run of
   * every plan and groups them into a run group with one combined report.
   */
  data: SimulationGroupUpdateResponse.Data;
}

export namespace SimulationGroupUpdateResponse {
  /**
   * A saved, repeatable set of plans that run together. Each run starts one run of
   * every plan and groups them into a run group with one combined report.
   */
  export interface Data {
    id: string;

    /**
     * Whether this group is managed by config as code. A managed group can be run
     * here, but PUT and DELETE on it return 409: change it in the config file.
     */
    configManaged: boolean;

    /**
     * ISO 8601
     */
    createdAt: string;

    description: string | null;

    /**
     * ISO 8601. Null when it has never run.
     */
    lastRunAt: string | null;

    /**
     * The most recent run group it started, readable at GET
     * /v1/simulation/run-group/{groupId}. Null when it has never run.
     */
    latestRunGroupId: string | null;

    name: string;

    /**
     * Where each run's group report announces itself once it is ready.
     */
    notifications: Data.Notifications;

    /**
     * The plans in run order. A plan deleted since it was added is left out.
     */
    plans: Array<Data.Plan>;

    /**
     * ISO 8601
     */
    updatedAt: string;
  }

  export namespace Data {
    /**
     * Where each run's group report announces itself once it is ready.
     */
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

    export interface Plan {
      /**
       * The plan, readable at GET /v1/simulation/plan/{planId}
       */
      id: string;

      name: string;
    }
  }
}

export interface SimulationGroupListResponse {
  data: Array<SimulationGroupListResponse.Data>;

  pagination: SimulationGroupListResponse.Pagination;
}

export namespace SimulationGroupListResponse {
  /**
   * A saved, repeatable set of plans that run together. Each run starts one run of
   * every plan and groups them into a run group with one combined report.
   */
  export interface Data {
    id: string;

    /**
     * Whether this group is managed by config as code. A managed group can be run
     * here, but PUT and DELETE on it return 409: change it in the config file.
     */
    configManaged: boolean;

    /**
     * ISO 8601
     */
    createdAt: string;

    description: string | null;

    /**
     * ISO 8601. Null when it has never run.
     */
    lastRunAt: string | null;

    /**
     * The most recent run group it started, readable at GET
     * /v1/simulation/run-group/{groupId}. Null when it has never run.
     */
    latestRunGroupId: string | null;

    name: string;

    /**
     * Where each run's group report announces itself once it is ready.
     */
    notifications: Data.Notifications;

    /**
     * The plans in run order. A plan deleted since it was added is left out.
     */
    plans: Array<Data.Plan>;

    /**
     * ISO 8601
     */
    updatedAt: string;
  }

  export namespace Data {
    /**
     * Where each run's group report announces itself once it is ready.
     */
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

    export interface Plan {
      /**
       * The plan, readable at GET /v1/simulation/plan/{planId}
       */
      id: string;

      name: string;
    }
  }

  export interface Pagination {
    hasMore: boolean;

    limit: number;

    offset: number;

    /**
     * Total groups in the project, ignoring this page.
     */
    total: number;
  }
}

export interface SimulationGroupDeleteResponse {
  data: SimulationGroupDeleteResponse.Data;
}

export namespace SimulationGroupDeleteResponse {
  export interface Data {
    /**
     * Whether the group was deleted
     */
    deleted: boolean;
  }
}

export interface SimulationGroupGetByIDResponse {
  /**
   * A saved, repeatable set of plans that run together. Each run starts one run of
   * every plan and groups them into a run group with one combined report.
   */
  data: SimulationGroupGetByIDResponse.Data;
}

export namespace SimulationGroupGetByIDResponse {
  /**
   * A saved, repeatable set of plans that run together. Each run starts one run of
   * every plan and groups them into a run group with one combined report.
   */
  export interface Data {
    id: string;

    /**
     * Whether this group is managed by config as code. A managed group can be run
     * here, but PUT and DELETE on it return 409: change it in the config file.
     */
    configManaged: boolean;

    /**
     * ISO 8601
     */
    createdAt: string;

    description: string | null;

    /**
     * ISO 8601. Null when it has never run.
     */
    lastRunAt: string | null;

    /**
     * The most recent run group it started, readable at GET
     * /v1/simulation/run-group/{groupId}. Null when it has never run.
     */
    latestRunGroupId: string | null;

    name: string;

    /**
     * Where each run's group report announces itself once it is ready.
     */
    notifications: Data.Notifications;

    /**
     * The plans in run order. A plan deleted since it was added is left out.
     */
    plans: Array<Data.Plan>;

    /**
     * ISO 8601
     */
    updatedAt: string;
  }

  export namespace Data {
    /**
     * Where each run's group report announces itself once it is ready.
     */
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

    export interface Plan {
      /**
       * The plan, readable at GET /v1/simulation/plan/{planId}
       */
      id: string;

      name: string;
    }
  }
}

export interface SimulationGroupRunResponse {
  /**
   * Several simulation runs read as one.
   */
  data: SimulationGroupRunResponse.Data;
}

export namespace SimulationGroupRunResponse {
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

export interface SimulationGroupCreateParams {
  /**
   * What to call the group.
   */
  name: string;

  /**
   * The plans to run together, in run order (2 to 20). Duplicates are dropped.
   */
  simulationRunPlanIds: Array<string>;

  /**
   * What the group is for.
   */
  description?: string | null;

  /**
   * Defaults to email on (to the default audience) and no Slack.
   */
  notifications?: SimulationGroupCreateParams.Notifications;
}

export namespace SimulationGroupCreateParams {
  /**
   * Defaults to email on (to the default audience) and no Slack.
   */
  export interface Notifications {
    email?: Notifications.Email;

    /**
     * Channels in the project's connected Slack workspace to post the report to (at
     * most 10). Slack must be connected to the project first.
     */
    slack?: Array<Notifications.Slack>;
  }

  export namespace Notifications {
    export interface Email {
      /**
       * Whether each run's group report is emailed when it is ready.
       */
      enabled: boolean;

      /**
       * Addresses to email (at most 50), Roark users or not: the email attaches the
       * report PDF. Empty emails every member of the project.
       */
      recipients?: Array<string>;
    }

    export interface Slack {
      /**
       * The Slack channel id
       */
      channelId: string;

      /**
       * The channel name, shown in Roark
       */
      channelName: string;
    }
  }
}

export interface SimulationGroupUpdateParams {
  /**
   * Send null to clear it.
   */
  description?: string | null;

  name?: string;

  /**
   * Replaces the notification settings as a whole.
   */
  notifications?: SimulationGroupUpdateParams.Notifications;

  /**
   * Replaces the plans, in run order.
   */
  simulationRunPlanIds?: Array<string>;
}

export namespace SimulationGroupUpdateParams {
  /**
   * Replaces the notification settings as a whole.
   */
  export interface Notifications {
    email?: Notifications.Email;

    /**
     * Channels in the project's connected Slack workspace to post the report to (at
     * most 10). Slack must be connected to the project first.
     */
    slack?: Array<Notifications.Slack>;
  }

  export namespace Notifications {
    export interface Email {
      /**
       * Whether each run's group report is emailed when it is ready.
       */
      enabled: boolean;

      /**
       * Addresses to email (at most 50), Roark users or not: the email attaches the
       * report PDF. Empty emails every member of the project.
       */
      recipients?: Array<string>;
    }

    export interface Slack {
      /**
       * The Slack channel id
       */
      channelId: string;

      /**
       * The channel name, shown in Roark
       */
      channelName: string;
    }
  }
}

export interface SimulationGroupListParams {
  /**
   * Maximum number of groups to return (default: 20, max: 100)
   */
  limit?: number;

  /**
   * Pagination offset
   */
  offset?: number;
}

export declare namespace SimulationGroup {
  export {
    type SimulationGroupCreateResponse as SimulationGroupCreateResponse,
    type SimulationGroupUpdateResponse as SimulationGroupUpdateResponse,
    type SimulationGroupListResponse as SimulationGroupListResponse,
    type SimulationGroupDeleteResponse as SimulationGroupDeleteResponse,
    type SimulationGroupGetByIDResponse as SimulationGroupGetByIDResponse,
    type SimulationGroupRunResponse as SimulationGroupRunResponse,
    type SimulationGroupCreateParams as SimulationGroupCreateParams,
    type SimulationGroupUpdateParams as SimulationGroupUpdateParams,
    type SimulationGroupListParams as SimulationGroupListParams,
  };
}
