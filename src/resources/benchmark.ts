// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Benchmark extends APIResource {
  /**
   * Returns one ranked page of a suite version’s published targets, each with the
   * metric cells it is judged on. Ranking happens in the database, so paging through
   * the board is consistent. Every default the server applies (suite version,
   * condition, sort metric, sort direction) is echoed on the response, so a page can
   * be cited without guessing how it was ordered.
   *
   * @example
   * ```ts
   * const response = await client.benchmark.getLeaderboard({
   *   suite: 'x',
   * });
   * ```
   */
  getLeaderboard(
    query: BenchmarkGetLeaderboardParams,
    options?: RequestOptions,
  ): APIPromise<BenchmarkGetLeaderboardResponse> {
    return this._client.get('/v1/benchmark/leaderboard', { query, ...options });
  }

  /**
   * Returns a target’s published sweep and every one of its aggregate cells: the
   * overall rollup plus a set per condition. Defaults to the current sweep; pass
   * `publicationId` from the history endpoint to read a superseded one, which is how
   * a regression is compared generation to generation. Numbers only — no transcript
   * and no audio.
   *
   * @example
   * ```ts
   * const response = await client.benchmark.getTarget(
   *   'targetKey',
   *   { suite: 'x' },
   * );
   * ```
   */
  getTarget(
    targetKey: string,
    query: BenchmarkGetTargetParams,
    options?: RequestOptions,
  ): APIPromise<BenchmarkGetTargetResponse> {
    return this._client.get(path`/v1/benchmark/target/${targetKey}`, { query, ...options });
  }

  /**
   * Returns the metrics a suite version published, each with the direction that
   * counts as better. Use it to pick a valid `sortBy` for the leaderboard: a metric
   * key outside this list is rejected rather than silently ranking every target
   * null.
   *
   * @example
   * ```ts
   * const response = await client.benchmark.listMetrics({
   *   suite: 'x',
   * });
   * ```
   */
  listMetrics(
    query: BenchmarkListMetricsParams,
    options?: RequestOptions,
  ): APIPromise<BenchmarkListMetricsResponse> {
    return this._client.get('/v1/benchmark/metric', { query, ...options });
  }

  /**
   * Returns every benchmark suite with published results, along with the suite
   * version the other endpoints default to. Start here: the suite name is a required
   * parameter everywhere else and there is no other way to discover it.
   *
   * @example
   * ```ts
   * const response = await client.benchmark.listSuites();
   * ```
   */
  listSuites(options?: RequestOptions): APIPromise<BenchmarkListSuitesResponse> {
    return this._client.get('/v1/benchmark/suite', options);
  }

  /**
   * Returns every sweep published for a target, newest first, including superseded
   * ones. This is the trend read: it answers "did this model regress?" from Roark’s
   * own published record. Metadata only — pass a row’s `publicationId` to GET
   * /v1/benchmark/target/{targetKey} for that generation’s numbers.
   *
   * @example
   * ```ts
   * const response = await client.benchmark.listTargetHistory(
   *   'targetKey',
   *   { suite: 'x' },
   * );
   * ```
   */
  listTargetHistory(
    targetKey: string,
    query: BenchmarkListTargetHistoryParams,
    options?: RequestOptions,
  ): APIPromise<BenchmarkListTargetHistoryResponse> {
    return this._client.get(path`/v1/benchmark/target/${targetKey}/history`, { query, ...options });
  }

  /**
   * Returns the individual scored calls behind a target’s aggregate cells, each with
   * the scorer’s rationale — the "why is this number what it is" read. Filter to one
   * cell with `conditionKey` and `metricKey`. Metrics computed without a rationale
   * (latencies, counts) contribute no samples. Returns reasoning only: no transcript
   * and no audio.
   *
   * @example
   * ```ts
   * const response =
   *   await client.benchmark.listTargetScoreSamples(
   *     'targetKey',
   *     { suite: 'x' },
   *   );
   * ```
   */
  listTargetScoreSamples(
    targetKey: string,
    query: BenchmarkListTargetScoreSamplesParams,
    options?: RequestOptions,
  ): APIPromise<BenchmarkListTargetScoreSamplesResponse> {
    return this._client.get(path`/v1/benchmark/target/${targetKey}/score-sample`, { query, ...options });
  }
}

export interface BenchmarkGetLeaderboardResponse {
  conditionKey: string;

  data: Array<BenchmarkGetLeaderboardResponse.Data>;

  pagination: BenchmarkGetLeaderboardResponse.Pagination;

  /**
   * The ranking this page was produced under
   */
  sortedBy: BenchmarkGetLeaderboardResponse.SortedBy;

  suite: string;

  /**
   * The version actually read, after defaulting.
   */
  suiteVersion: string;
}

export namespace BenchmarkGetLeaderboardResponse {
  export interface Data {
    /**
     * The projected cells for this row, measured under the requested condition.
     */
    metrics: Array<Data.Metric>;

    /**
     * A model or stack with a published result on a benchmark suite
     */
    target: Data.Target;
  }

  export namespace Data {
    /**
     * One aggregate cell: a metric measured for one target under one condition
     */
    export interface Metric {
      ciHigh: number | null;

      /**
       * Low bound of the 95% CI of the mean (NUMERIC metrics).
       */
      ciLow: number | null;

      /**
       * The flow variant these numbers were measured under. The empty string is the
       * overall rollup across all conditions.
       */
      conditionKey: string;

      conditionLabel: string;

      mean: number | null;

      /**
       * Stable metric id, e.g. `response_time`.
       */
      metricKey: string;

      /**
       * Which statistics are populated on a result. NUMERIC fills p50/p95/mean/ci;
       * BOOLEAN fills passRate and its interval.
       */
      metricKind: 'NUMERIC' | 'BOOLEAN';

      metricName: string;

      /**
       * Scored samples behind this aggregate.
       */
      n: number;

      p50: number | null;

      p95: number | null;

      /**
       * Fraction passed, 0..1 (BOOLEAN metrics).
       */
      passRate: number | null;

      passRateCiHigh: number | null;

      /**
       * Low bound of the 95% Wilson interval on the pass rate.
       */
      passRateCiLow: number | null;

      /**
       * Display unit for numeric metrics, e.g. `ms`.
       */
      unitSymbol: string | null;
    }

    /**
     * A model or stack with a published result on a benchmark suite
     */
    export interface Target {
      /**
       * Whether these are the numbers Roark publishes for this target today.
       */
      isCurrent: boolean;

      /**
       * Calls the sweep requested per condition.
       */
      iterations: number;

      /**
       * Id of this one sweep. Changes every time the target is re-published, so it is a
       * render key, not an identity.
       */
      publicationId: string;

      /**
       * When this sweep was published (ISO-8601), i.e. data freshness.
       */
      publishedAt: string;

      /**
       * Executed calls that contributed at least one score to these numbers.
       */
      sampleCallCount: number;

      suite: string;

      suiteVersion: string;

      /**
       * When a later sweep replaced this one. Null means it is the current generation.
       */
      supersededAt: string | null;

      /**
       * Stable identity of the model/stack across sweeps. Cite this, and pass it to the
       * target endpoints.
       */
      targetKey: string;

      /**
       * Human-readable name of the model/stack.
       */
      targetName: string;
    }
  }

  export interface Pagination {
    hasMore: boolean;

    limit: number;

    offset: number;

    /**
     * Total matching records, ignoring this page.
     */
    total: number;
  }

  /**
   * The ranking this page was produced under
   */
  export interface SortedBy {
    metricKey: string;

    order: 'asc' | 'desc';
  }
}

export interface BenchmarkGetTargetResponse {
  data: BenchmarkGetTargetResponse.Data;
}

export namespace BenchmarkGetTargetResponse {
  export interface Data {
    /**
     * Every cell of this sweep: the overall rollup plus one set per condition.
     */
    results: Array<Data.Result>;

    /**
     * A model or stack with a published result on a benchmark suite
     */
    target: Data.Target;
  }

  export namespace Data {
    /**
     * One aggregate cell: a metric measured for one target under one condition
     */
    export interface Result {
      ciHigh: number | null;

      /**
       * Low bound of the 95% CI of the mean (NUMERIC metrics).
       */
      ciLow: number | null;

      /**
       * The flow variant these numbers were measured under. The empty string is the
       * overall rollup across all conditions.
       */
      conditionKey: string;

      conditionLabel: string;

      mean: number | null;

      /**
       * Stable metric id, e.g. `response_time`.
       */
      metricKey: string;

      /**
       * Which statistics are populated on a result. NUMERIC fills p50/p95/mean/ci;
       * BOOLEAN fills passRate and its interval.
       */
      metricKind: 'NUMERIC' | 'BOOLEAN';

      metricName: string;

      /**
       * Scored samples behind this aggregate.
       */
      n: number;

      p50: number | null;

      p95: number | null;

      /**
       * Fraction passed, 0..1 (BOOLEAN metrics).
       */
      passRate: number | null;

      passRateCiHigh: number | null;

      /**
       * Low bound of the 95% Wilson interval on the pass rate.
       */
      passRateCiLow: number | null;

      /**
       * Display unit for numeric metrics, e.g. `ms`.
       */
      unitSymbol: string | null;
    }

    /**
     * A model or stack with a published result on a benchmark suite
     */
    export interface Target {
      /**
       * Whether these are the numbers Roark publishes for this target today.
       */
      isCurrent: boolean;

      /**
       * Calls the sweep requested per condition.
       */
      iterations: number;

      /**
       * Id of this one sweep. Changes every time the target is re-published, so it is a
       * render key, not an identity.
       */
      publicationId: string;

      /**
       * When this sweep was published (ISO-8601), i.e. data freshness.
       */
      publishedAt: string;

      /**
       * Executed calls that contributed at least one score to these numbers.
       */
      sampleCallCount: number;

      suite: string;

      suiteVersion: string;

      /**
       * When a later sweep replaced this one. Null means it is the current generation.
       */
      supersededAt: string | null;

      /**
       * Stable identity of the model/stack across sweeps. Cite this, and pass it to the
       * target endpoints.
       */
      targetKey: string;

      /**
       * Human-readable name of the model/stack.
       */
      targetName: string;
    }
  }
}

export interface BenchmarkListMetricsResponse {
  data: Array<BenchmarkListMetricsResponse.Data>;

  suite: string;

  suiteVersion: string;
}

export namespace BenchmarkListMetricsResponse {
  /**
   * A metric a suite version published, and the direction that counts as better
   */
  export interface Data {
    /**
     * Which end of the scale is better. `higher` and `lower` can be ranked; `neutral`
     * is an observational metric that describes a conversation rather than grading it,
     * so sorting on it names no winner.
     */
    goal: 'higher' | 'lower' | 'neutral';

    metricKey: string;

    /**
     * Which statistics are populated on a result. NUMERIC fills p50/p95/mean/ci;
     * BOOLEAN fills passRate and its interval.
     */
    metricKind: 'NUMERIC' | 'BOOLEAN';

    metricName: string;

    unitSymbol: string | null;
  }
}

export interface BenchmarkListSuitesResponse {
  data: Array<BenchmarkListSuitesResponse.Data>;
}

export namespace BenchmarkListSuitesResponse {
  /**
   * A benchmark suite with published results
   */
  export interface Data {
    latestPublishedAt: string;

    /**
     * The version every endpoint defaults to for this suite.
     */
    latestSuiteVersion: string;

    suite: string;

    /**
     * Targets currently published under the latest version.
     */
    targetCount: number;
  }
}

export interface BenchmarkListTargetHistoryResponse {
  data: Array<BenchmarkListTargetHistoryResponse.Data>;

  pagination: BenchmarkListTargetHistoryResponse.Pagination;
}

export namespace BenchmarkListTargetHistoryResponse {
  /**
   * One published sweep of a target, current or superseded — an entry in its history
   */
  export interface Data {
    /**
     * Whether this is the generation the other endpoints return.
     */
    isCurrent: boolean;

    iterations: number;

    publicationId: string;

    publishedAt: string;

    sampleCallCount: number;

    suite: string;

    suiteVersion: string;

    /**
     * When a later sweep replaced this generation. Null means it is the current one.
     */
    supersededAt: string | null;

    targetKey: string;

    targetName: string;
  }

  export interface Pagination {
    hasMore: boolean;

    limit: number;

    offset: number;

    /**
     * Total matching records, ignoring this page.
     */
    total: number;
  }
}

export interface BenchmarkListTargetScoreSamplesResponse {
  data: Array<BenchmarkListTargetScoreSamplesResponse.Data>;

  pagination: BenchmarkListTargetScoreSamplesResponse.Pagination;

  /**
   * A model or stack with a published result on a benchmark suite
   */
  target: BenchmarkListTargetScoreSamplesResponse.Target;
}

export namespace BenchmarkListTargetScoreSamplesResponse {
  /**
   * One un-aggregated score behind a result cell, with the reasoning that produced
   * it
   */
  export interface Data {
    booleanValue: boolean | null;

    conditionKey: string;

    metricKey: string;

    numericValue: number | null;

    /**
     * The scorer's rationale for this individual score.
     */
    reasoning: string;

    /**
     * Opaque id of the call this single score came from. Groups samples that share a
     * call; it is not resolvable through this API.
     */
    sourceCallId: string;
  }

  export interface Pagination {
    hasMore: boolean;

    limit: number;

    offset: number;

    /**
     * Total matching records, ignoring this page.
     */
    total: number;
  }

  /**
   * A model or stack with a published result on a benchmark suite
   */
  export interface Target {
    /**
     * Whether these are the numbers Roark publishes for this target today.
     */
    isCurrent: boolean;

    /**
     * Calls the sweep requested per condition.
     */
    iterations: number;

    /**
     * Id of this one sweep. Changes every time the target is re-published, so it is a
     * render key, not an identity.
     */
    publicationId: string;

    /**
     * When this sweep was published (ISO-8601), i.e. data freshness.
     */
    publishedAt: string;

    /**
     * Executed calls that contributed at least one score to these numbers.
     */
    sampleCallCount: number;

    suite: string;

    suiteVersion: string;

    /**
     * When a later sweep replaced this one. Null means it is the current generation.
     */
    supersededAt: string | null;

    /**
     * Stable identity of the model/stack across sweeps. Cite this, and pass it to the
     * target endpoints.
     */
    targetKey: string;

    /**
     * Human-readable name of the model/stack.
     */
    targetName: string;
  }
}

export interface BenchmarkGetLeaderboardParams {
  suite: string;

  conditionKey?: string;

  /**
   * Maximum number of records to return (default: 20, max: 100)
   */
  limit?: number;

  /**
   * Comma-separated metric keys to project per row. Defaults to the headline set.
   */
  metrics?: string;

  /**
   * Pagination offset
   */
  offset?: number;

  order?: 'asc' | 'desc';

  sortBy?: string;

  suiteVersion?: string;
}

export interface BenchmarkGetTargetParams {
  suite: string;

  publicationId?: string;

  suiteVersion?: string;
}

export interface BenchmarkListMetricsParams {
  suite: string;

  suiteVersion?: string;
}

export interface BenchmarkListTargetHistoryParams {
  suite: string;

  /**
   * Maximum number of records to return (default: 20, max: 100)
   */
  limit?: number;

  /**
   * Pagination offset
   */
  offset?: number;

  suiteVersion?: string;
}

export interface BenchmarkListTargetScoreSamplesParams {
  suite: string;

  conditionKey?: string;

  /**
   * Maximum number of records to return (default: 20, max: 100)
   */
  limit?: number;

  metricKey?: string;

  /**
   * Pagination offset
   */
  offset?: number;

  suiteVersion?: string;
}

export declare namespace Benchmark {
  export {
    type BenchmarkGetLeaderboardResponse as BenchmarkGetLeaderboardResponse,
    type BenchmarkGetTargetResponse as BenchmarkGetTargetResponse,
    type BenchmarkListMetricsResponse as BenchmarkListMetricsResponse,
    type BenchmarkListSuitesResponse as BenchmarkListSuitesResponse,
    type BenchmarkListTargetHistoryResponse as BenchmarkListTargetHistoryResponse,
    type BenchmarkListTargetScoreSamplesResponse as BenchmarkListTargetScoreSamplesResponse,
    type BenchmarkGetLeaderboardParams as BenchmarkGetLeaderboardParams,
    type BenchmarkGetTargetParams as BenchmarkGetTargetParams,
    type BenchmarkListMetricsParams as BenchmarkListMetricsParams,
    type BenchmarkListTargetHistoryParams as BenchmarkListTargetHistoryParams,
    type BenchmarkListTargetScoreSamplesParams as BenchmarkListTargetScoreSamplesParams,
  };
}
