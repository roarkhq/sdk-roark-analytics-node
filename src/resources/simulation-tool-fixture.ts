// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SimulationToolFixture extends APIResource {
  /**
   * Create-or-replace by scope: one fixture per tool project-wide, plus one per
   * (tool, flow variant). Setting the same scope twice replaces the response, so CI
   * can apply fixtures idempotently. During Roark test calls the tool guard answers
   * with the fixture verbatim instead of generating a response; real callers are
   * never affected.
   *
   * @example
   * ```ts
   * const simulationToolFixture =
   *   await client.simulationToolFixture.create({
   *     toolName: 'lookup_availability',
   *   });
   * ```
   */
  create(
    body: SimulationToolFixtureCreateParams,
    options?: RequestOptions,
  ): APIPromise<SimulationToolFixtureCreateResponse> {
    return this._client.post('/v1/simulation/tool-fixture', { body, ...options });
  }

  /**
   * Change the response, description, or enabled state of an existing fixture.
   *
   * @example
   * ```ts
   * const simulationToolFixture =
   *   await client.simulationToolFixture.update(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  update(
    fixtureID: string,
    body: SimulationToolFixtureUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationToolFixtureUpdateResponse> {
    return this._client.put(path`/v1/simulation/tool-fixture/${fixtureID}`, { body, ...options });
  }

  /**
   * All deterministic tool responses configured for this project, optionally
   * filtered by tool.
   *
   * @example
   * ```ts
   * const simulationToolFixtures =
   *   await client.simulationToolFixture.list();
   * ```
   */
  list(
    query: SimulationToolFixtureListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationToolFixtureListResponse> {
    return this._client.get('/v1/simulation/tool-fixture', { query, ...options });
  }

  /**
   * The tool goes back to scenario-aware generated responses in test calls.
   *
   * @example
   * ```ts
   * const simulationToolFixture =
   *   await client.simulationToolFixture.delete(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  delete(fixtureID: string, options?: RequestOptions): APIPromise<SimulationToolFixtureDeleteResponse> {
    return this._client.delete(path`/v1/simulation/tool-fixture/${fixtureID}`, options);
  }
}

export interface SimulationToolFixtureCreateResponse {
  /**
   * A deterministic tool response for Roark test calls: where the scenario-aware
   * model makes mocked tools plausible, a fixture makes one exact, so a simulation
   * can force the branch under test. Never applies to real callers.
   */
  data: SimulationToolFixtureCreateResponse.Data;
}

export namespace SimulationToolFixtureCreateResponse {
  /**
   * A deterministic tool response for Roark test calls: where the scenario-aware
   * model makes mocked tools plausible, a fixture makes one exact, so a simulation
   * can force the branch under test. Never applies to real callers.
   */
  export interface Data {
    id: string;

    /**
     * ISO 8601.
     */
    createdAt: string;

    /**
     * The flow variant this fixture is pinned to. Null = project-wide.
     */
    customerFlowVariantId: string | null;

    /**
     * Why this fixture exists.
     */
    description: string | null;

    enabled: boolean;

    toolName: string;

    /**
     * ISO 8601.
     */
    updatedAt: string;

    /**
     * The exact JSON the tool returns during Roark test calls.
     */
    response?: unknown;
  }
}

export interface SimulationToolFixtureUpdateResponse {
  /**
   * A deterministic tool response for Roark test calls: where the scenario-aware
   * model makes mocked tools plausible, a fixture makes one exact, so a simulation
   * can force the branch under test. Never applies to real callers.
   */
  data: SimulationToolFixtureUpdateResponse.Data;
}

export namespace SimulationToolFixtureUpdateResponse {
  /**
   * A deterministic tool response for Roark test calls: where the scenario-aware
   * model makes mocked tools plausible, a fixture makes one exact, so a simulation
   * can force the branch under test. Never applies to real callers.
   */
  export interface Data {
    id: string;

    /**
     * ISO 8601.
     */
    createdAt: string;

    /**
     * The flow variant this fixture is pinned to. Null = project-wide.
     */
    customerFlowVariantId: string | null;

    /**
     * Why this fixture exists.
     */
    description: string | null;

    enabled: boolean;

    toolName: string;

    /**
     * ISO 8601.
     */
    updatedAt: string;

    /**
     * The exact JSON the tool returns during Roark test calls.
     */
    response?: unknown;
  }
}

export interface SimulationToolFixtureListResponse {
  data: Array<SimulationToolFixtureListResponse.Data>;
}

export namespace SimulationToolFixtureListResponse {
  /**
   * A deterministic tool response for Roark test calls: where the scenario-aware
   * model makes mocked tools plausible, a fixture makes one exact, so a simulation
   * can force the branch under test. Never applies to real callers.
   */
  export interface Data {
    id: string;

    /**
     * ISO 8601.
     */
    createdAt: string;

    /**
     * The flow variant this fixture is pinned to. Null = project-wide.
     */
    customerFlowVariantId: string | null;

    /**
     * Why this fixture exists.
     */
    description: string | null;

    enabled: boolean;

    toolName: string;

    /**
     * ISO 8601.
     */
    updatedAt: string;

    /**
     * The exact JSON the tool returns during Roark test calls.
     */
    response?: unknown;
  }
}

export interface SimulationToolFixtureDeleteResponse {
  data: SimulationToolFixtureDeleteResponse.Data;
}

export namespace SimulationToolFixtureDeleteResponse {
  export interface Data {
    deleted: boolean;
  }
}

export interface SimulationToolFixtureCreateParams {
  /**
   * The tool this fixture answers for.
   */
  toolName: string;

  /**
   * Pin the fixture to one flow variant (scenario). Omit for a project-wide fixture.
   * A variant-pinned fixture beats the project-wide one.
   */
  customerFlowVariantId?: string;

  /**
   * Why this fixture exists.
   */
  description?: string;

  /**
   * Defaults to true.
   */
  enabled?: boolean;

  /**
   * The exact JSON to return.
   */
  response?: unknown;
}

export interface SimulationToolFixtureUpdateParams {
  description?: string | null;

  enabled?: boolean;

  response?: unknown;
}

export interface SimulationToolFixtureListParams {
  /**
   * Only fixtures for this tool.
   */
  toolName?: string;
}

export declare namespace SimulationToolFixture {
  export {
    type SimulationToolFixtureCreateResponse as SimulationToolFixtureCreateResponse,
    type SimulationToolFixtureUpdateResponse as SimulationToolFixtureUpdateResponse,
    type SimulationToolFixtureListResponse as SimulationToolFixtureListResponse,
    type SimulationToolFixtureDeleteResponse as SimulationToolFixtureDeleteResponse,
    type SimulationToolFixtureCreateParams as SimulationToolFixtureCreateParams,
    type SimulationToolFixtureUpdateParams as SimulationToolFixtureUpdateParams,
    type SimulationToolFixtureListParams as SimulationToolFixtureListParams,
  };
}
