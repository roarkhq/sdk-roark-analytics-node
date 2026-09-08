// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class SimulationTemplate extends APIResource {
  /**
   * Returns the built-in simulation templates, each resolved against this project:
   * the metric and check definitions it collects, and the flows it runs with the
   * variants it covers.
   *
   * A template is a preset rather than a stored object, so building a run from one
   * produces an ordinary run plan you own and can edit afterwards. Pass a `slug` as
   * `template` to POST /v1/simulation/run.
   *
   * Every entry is complete, so there is no per-template endpoint to follow up with,
   * and the list is a fixed catalogue rather than a paginated one. Only templates a
   * request can actually run are listed.
   *
   * @example
   * ```ts
   * const simulationTemplates =
   *   await client.simulationTemplate.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<SimulationTemplateListResponse> {
    return this._client.get('/v1/simulation/template', options);
  }
}

/**
 * The built-in simulation templates.
 */
export interface SimulationTemplateListResponse {
  data: Array<SimulationTemplateListResponse.Data>;
}

export namespace SimulationTemplateListResponse {
  /**
   * A built-in simulation template, resolved against this project: what it measures
   * and what it runs.
   */
  export interface Data {
    /**
     * Grouping used in the dashboard library
     */
    category: string;

    /**
     * The per-simulation cap a run from this template uses unless the request sets its
     * own.
     */
    defaultMaxSimulationDurationSeconds: number;

    /**
     * What this template tests
     */
    description: string;

    /**
     * The flows this template runs, and which of their ways of running it covers.
     *
     * Empty means the template presets only what to measure, and a run has to say what
     * to measure it on: pass `flows` to POST /v1/simulation/run. When it is not empty
     * you can still pass `flows` to narrow it, naming a subset of the ids listed here.
     */
    flows: Array<Data.Flow>;

    /**
     * Whether runs from this template also collect each attached flow's own metrics,
     * on top of the template's set.
     */
    includeFlowMetrics: boolean;

    /**
     * The metrics this template collects, resolved to this project's definitions.
     */
    metrics: Array<Data.Metric>;

    /**
     * Stable identifier. Name this in a run request.
     */
    slug: string;

    /**
     * The Pass/Fail checks this template attaches alongside its metrics.
     */
    thresholds: Array<Data.Threshold>;

    /**
     * Display name
     */
    title: string;
  }

  export namespace Data {
    export interface Flow {
      /**
       * Customer flow ID
       */
      id: string;

      /**
       * The other ways of running this flow that this template covers.
       */
      edgeCases: Array<Flow.EdgeCase>;

      /**
       * The flow's default way of running, when this template covers it. Null when it
       * does not, or the flow has none.
       */
      happyPath: Flow.HappyPath | null;

      /**
       * The stable slug of a Roark-curated flow, null for one of your own.
       *
       * Prefer this over `id` when you are storing a run in version control: a curated
       * flow is a global row, so its id is the same for every project but differs
       * between deployments, while the slug is stable wherever the flow exists. Both are
       * accepted by a run request.
       */
      slug: string | null;

      /**
       * Flow title
       */
      title: string;
    }

    export namespace Flow {
      export interface EdgeCase {
        /**
         * Customer flow variant ID
         */
        id: string;

        /**
         * The stable slug of a Roark-curated edge case, null for one of your own.
         *
         * Prefer this over `id` in a run you keep in version control. A curated edge case
         * is a global row, so its id differs between deployments, and renaming one
         * replaces the row and its id outright. The slug survives both.
         */
        slug: string | null;

        /**
         * What this way of running the flow is called
         */
        title: string;
      }

      /**
       * The flow's default way of running, when this template covers it. Null when it
       * does not, or the flow has none.
       */
      export interface HappyPath {
        title: string;
      }
    }

    export interface Metric {
      /**
       * Metric definition ID
       */
      id: string;

      /**
       * Stable metric slug, e.g. "response_time"
       */
      slug: string;
    }

    export interface Threshold {
      /**
       * Metric definition ID
       */
      id: string;

      /**
       * Stable metric slug, e.g. "response_time"
       */
      slug: string;
    }
  }
}

export declare namespace SimulationTemplate {
  export { type SimulationTemplateListResponse as SimulationTemplateListResponse };
}
