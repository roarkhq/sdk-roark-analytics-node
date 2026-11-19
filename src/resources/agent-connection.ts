// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AgentConnection extends APIResource {
  /**
   * Connects the platform a project’s agents run on. The body is shaped by
   * `provider`; `GET /v1/connections/agent/providers` lists what each needs. Retell,
   * Vapi, ElevenLabs and Bland keys are checked by listing agents first, so a
   * refused key returns 400 and nothing is stored. Platforms that pull agents start
   * syncing straight away. For LIVEKIT_SELF_HOSTED and the Pipecat providers, the
   * response carries `observerApiKey`, shown once, for your SDK to report calls
   * with. Most platforms connect once per project, and a second create returns 409;
   * LiveKit Cloud may connect several accounts.
   *
   * @example
   * ```ts
   * const agentConnection = await client.agentConnection.create(
   *   {
   *     apiKey: 'x',
   *     name: 'Production Retell',
   *     provider: 'RETELL',
   *   },
   * );
   * ```
   */
  create(
    body: AgentConnectionCreateParams,
    options?: RequestOptions,
  ): APIPromise<AgentConnectionCreateResponse> {
    return this._client.post('/v1/connections/agent', { body, ...options });
  }

  /**
   * Changes a connection’s settings or rotates its credential. Send `provider` (it
   * must match the connection’s) and only the fields to change; the rest keep their
   * stored values. A new Retell, Vapi, ElevenLabs or Bland key is checked by listing
   * agents first. Set `status` to INACTIVE to pause syncing without deleting
   * anything.
   *
   * @example
   * ```ts
   * const agentConnection = await client.agentConnection.update(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   { provider: 'RETELL' },
   * );
   * ```
   */
  update(
    connectionID: string,
    body: AgentConnectionUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AgentConnectionUpdateResponse> {
    return this._client.patch(path`/v1/connections/agent/${connectionID}`, { body, ...options });
  }

  /**
   * The project's connections to the platforms its agents run on (Retell, Vapi,
   * LiveKit, Pipecat and others), each with its settings and latest sync.
   * Credentials are never returned.
   *
   * @example
   * ```ts
   * const agentConnections =
   *   await client.agentConnection.list();
   * ```
   */
  list(
    query: AgentConnectionListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentConnectionListResponse> {
    return this._client.get('/v1/connections/agent', { query, ...options });
  }

  /**
   * Deletes the connection and its stored credential, and stops syncing. Agents and
   * calls it already brought in stay in the project. Alerts that notify through it
   * stop notifying.
   *
   * @example
   * ```ts
   * const agentConnection = await client.agentConnection.delete(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  delete(connectionID: string, options?: RequestOptions): APIPromise<AgentConnectionDeleteResponse> {
    return this._client.delete(path`/v1/connections/agent/${connectionID}`, options);
  }

  /**
   * Stops a running backfill. Calls it already imported stay.
   *
   * @example
   * ```ts
   * const response =
   *   await client.agentConnection.cancelBackfill(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     {
   *       connectionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     },
   *   );
   * ```
   */
  cancelBackfill(
    backfillID: string,
    params: AgentConnectionCancelBackfillParams,
    options?: RequestOptions,
  ): APIPromise<AgentConnectionCancelBackfillResponse> {
    const { connectionId } = params;
    return this._client.post(
      path`/v1/connections/agent/${connectionId}/backfills/${backfillID}/cancel`,
      options,
    );
  }

  /**
   * Starts a backfill that imports up to `maxCalls` of the most recent past calls
   * from a Retell, Vapi, ElevenLabs or Leaping connection. Other platforms
   * return 400.
   *
   * @example
   * ```ts
   * const response =
   *   await client.agentConnection.createBackfill(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *     { maxCalls: 250 },
   *   );
   * ```
   */
  createBackfill(
    connectionID: string,
    body: AgentConnectionCreateBackfillParams,
    options?: RequestOptions,
  ): APIPromise<AgentConnectionCreateBackfillResponse> {
    return this._client.post(path`/v1/connections/agent/${connectionID}/backfills`, { body, ...options });
  }

  /**
   * Lists the agents a Retell, Vapi, ElevenLabs or Bland API key can see, without
   * storing anything. Use it to check a key and to pick `agentIds` before
   * connecting. Any failure returns 400: `invalid_credentials` when the platform
   * refuses the key, `too_many_requests` when it rate limits the request, and
   * `dependency_failure` when it returns an error.
   *
   * @example
   * ```ts
   * const response = await client.agentConnection.discover({
   *   apiKey: 'x',
   *   provider: 'RETELL',
   * });
   * ```
   */
  discover(
    body: AgentConnectionDiscoverParams,
    options?: RequestOptions,
  ): APIPromise<AgentConnectionDiscoverResponse> {
    return this._client.post('/v1/connections/agent/discover', { body, ...options });
  }

  /**
   * One connection, with its settings and latest sync. Credentials are never
   * returned.
   *
   * @example
   * ```ts
   * const response = await client.agentConnection.getByID(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  getByID(connectionID: string, options?: RequestOptions): APIPromise<AgentConnectionGetByIDResponse> {
    return this._client.get(path`/v1/connections/agent/${connectionID}`, options);
  }

  /**
   * A connection's imports of past calls, newest first.
   *
   * @example
   * ```ts
   * const response = await client.agentConnection.listBackfills(
   *   '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   * );
   * ```
   */
  listBackfills(
    connectionID: string,
    options?: RequestOptions,
  ): APIPromise<AgentConnectionListBackfillsResponse> {
    return this._client.get(path`/v1/connections/agent/${connectionID}/backfills`, options);
  }

  /**
   * Every platform a project can connect, with the fields its create body needs, how
   * its calls reach Roark, and which settings apply. Read this before connecting
   * one.
   *
   * @example
   * ```ts
   * const response =
   *   await client.agentConnection.listProviders();
   * ```
   */
  listProviders(options?: RequestOptions): APIPromise<AgentConnectionListProvidersResponse> {
    return this._client.get('/v1/connections/agent/providers', options);
  }
}

export interface AgentConnectionCreateResponse {
  /**
   * A connection to the platform a project’s agents run on. Credentials are never
   * returned; the API key Roark mints for an SDK-driven platform is returned once,
   * on create.
   */
  data: AgentConnectionCreateResponse.Data;

  /**
   * For LIVEKIT_SELF_HOSTED and the Pipecat providers: the Roark API key your SDK
   * reports calls with, bound to this connection. Returned only here; store it now.
   * Null for every other provider, and if minting failed.
   */
  observerApiKey: string | null;
}

export namespace AgentConnectionCreateResponse {
  /**
   * A connection to the platform a project’s agents run on. Credentials are never
   * returned; the API key Roark mints for an SDK-driven platform is returned once,
   * on create.
   */
  export interface Data {
    id: string;

    /**
     * The platform's ids of the SELECTED agents.
     */
    agentIds: Array<string>;

    /**
     * Agents created by name.
     */
    agentNames: Array<string>;

    /**
     * Null for platforms that do not scope by agent.
     */
    agentScope: 'ALL' | 'SELECTED' | null;

    capabilities: Array<'PULL_AGENTS' | 'PULL_CALLS' | 'PUSH_AGENT_CONFIG'>;

    /**
     * ISO 8601
     */
    createdAt: string;

    /**
     * Set for GOOGLE_CES only.
     */
    googleCes: Data.GoogleCes | null;

    /**
     * Set for KORE only.
     */
    kore: Data.Kore | null;

    /**
     * Set for LIVEKIT only.
     */
    livekit: Data.Livekit | null;

    name: string;

    /**
     * Set for the Pipecat providers only. Secrets are reported only as present or
     * absent.
     */
    pipecat: Data.Pipecat | null;

    /**
     * The platform the agents run on. LIVEKIT is LiveKit Cloud; LIVEKIT_SELF_HOSTED is
     * the LiveKit Agents SDK reporting through the Roark plugin.
     * PIPECAT_CLOUD_INTEGRATION and PIPECAT_SELF_HOSTED_INTEGRATION are Pipecat Cloud
     * and a self-hosted Pipecat bot. `GET /v1/connections/agent/providers` describes
     * what each one needs.
     */
    provider:
      | 'RETELL'
      | 'VAPI'
      | 'ELEVEN_LABS'
      | 'BLAND'
      | 'LEAPING'
      | 'LIVEKIT'
      | 'LIVEKIT_SELF_HOSTED'
      | 'PIPECAT_CLOUD_INTEGRATION'
      | 'PIPECAT_SELF_HOSTED_INTEGRATION'
      | 'KORE'
      | 'GOOGLE_CES';

    samplingRate: number;

    /**
     * INACTIVE pauses syncing and call import without deleting anything.
     */
    status: 'ACTIVE' | 'INACTIVE';

    /**
     * The latest scheduled sync. Null for platforms that report calls themselves
     * rather than being pulled.
     */
    sync: Data.Sync | null;

    /**
     * Agents the latest sync could not bring in, and why. Empty when the sync is
     * healthy.
     */
    syncProblems: Array<Data.SyncProblem>;

    /**
     * ISO 8601
     */
    updatedAt: string | null;

    /**
     * Set for VAPI only.
     */
    vapi: Data.Vapi | null;
  }

  export namespace Data {
    /**
     * Set for GOOGLE_CES only.
     */
    export interface GoogleCes {
      appId: string;

      deploymentId: string;

      gcpProjectId: string;

      location: string;

      serviceAccountEmail: string;

      versionId: string | null;
    }

    /**
     * Set for KORE only.
     */
    export interface Kore {
      appId: string;

      baseUrl: string | null;

      envName: string;
    }

    /**
     * Set for LIVEKIT only.
     */
    export interface Livekit {
      metadataEgressStrategy: 'EAGER' | 'DEFERRED';

      metadataFilteringEnabled: boolean;

      url: string;
    }

    /**
     * Set for the Pipecat providers only. Secrets are reported only as present or
     * absent.
     */
    export interface Pipecat {
      appendAgentId: boolean;

      baseSignalingUrl: string | null;

      hasAuthToken: boolean;

      hasPccPublicKey: boolean;

      pccRoomProperties: { [key: string]: unknown } | null;

      pccStartBody: { [key: string]: unknown } | null;
    }

    /**
     * The latest scheduled sync. Null for platforms that report calls themselves
     * rather than being pulled.
     */
    export interface Sync {
      /**
       * Agents the latest run brought in.
       */
      createdAgentCount: number | null;

      /**
       * ISO 8601
       */
      endedAt: string | null;

      /**
       * How often the connection syncs.
       */
      intervalMinutes: number | null;

      isUpToDate: boolean | null;

      /**
       * ISO 8601
       */
      startedAt: string | null;

      /**
       * How the latest sync run went.
       */
      status: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | null;
    }

    export interface SyncProblem {
      /**
       * The platform's id of the agent the problem is with
       */
      agentId: string | null;

      agentName: string | null;

      /**
       * ISO 8601
       */
      at: string;

      /**
       * Why the sync failed for it, such as INVALID_API_KEY or AGENT_NOT_FOUND.
       */
      reason: string | null;
    }

    /**
     * Set for VAPI only.
     */
    export interface Vapi {
      outboundRequestBodyTemplate: { [key: string]: unknown } | null;
    }
  }
}

export interface AgentConnectionUpdateResponse {
  /**
   * A connection to the platform a project’s agents run on. Credentials are never
   * returned; the API key Roark mints for an SDK-driven platform is returned once,
   * on create.
   */
  data: AgentConnectionUpdateResponse.Data;
}

export namespace AgentConnectionUpdateResponse {
  /**
   * A connection to the platform a project’s agents run on. Credentials are never
   * returned; the API key Roark mints for an SDK-driven platform is returned once,
   * on create.
   */
  export interface Data {
    id: string;

    /**
     * The platform's ids of the SELECTED agents.
     */
    agentIds: Array<string>;

    /**
     * Agents created by name.
     */
    agentNames: Array<string>;

    /**
     * Null for platforms that do not scope by agent.
     */
    agentScope: 'ALL' | 'SELECTED' | null;

    capabilities: Array<'PULL_AGENTS' | 'PULL_CALLS' | 'PUSH_AGENT_CONFIG'>;

    /**
     * ISO 8601
     */
    createdAt: string;

    /**
     * Set for GOOGLE_CES only.
     */
    googleCes: Data.GoogleCes | null;

    /**
     * Set for KORE only.
     */
    kore: Data.Kore | null;

    /**
     * Set for LIVEKIT only.
     */
    livekit: Data.Livekit | null;

    name: string;

    /**
     * Set for the Pipecat providers only. Secrets are reported only as present or
     * absent.
     */
    pipecat: Data.Pipecat | null;

    /**
     * The platform the agents run on. LIVEKIT is LiveKit Cloud; LIVEKIT_SELF_HOSTED is
     * the LiveKit Agents SDK reporting through the Roark plugin.
     * PIPECAT_CLOUD_INTEGRATION and PIPECAT_SELF_HOSTED_INTEGRATION are Pipecat Cloud
     * and a self-hosted Pipecat bot. `GET /v1/connections/agent/providers` describes
     * what each one needs.
     */
    provider:
      | 'RETELL'
      | 'VAPI'
      | 'ELEVEN_LABS'
      | 'BLAND'
      | 'LEAPING'
      | 'LIVEKIT'
      | 'LIVEKIT_SELF_HOSTED'
      | 'PIPECAT_CLOUD_INTEGRATION'
      | 'PIPECAT_SELF_HOSTED_INTEGRATION'
      | 'KORE'
      | 'GOOGLE_CES';

    samplingRate: number;

    /**
     * INACTIVE pauses syncing and call import without deleting anything.
     */
    status: 'ACTIVE' | 'INACTIVE';

    /**
     * The latest scheduled sync. Null for platforms that report calls themselves
     * rather than being pulled.
     */
    sync: Data.Sync | null;

    /**
     * Agents the latest sync could not bring in, and why. Empty when the sync is
     * healthy.
     */
    syncProblems: Array<Data.SyncProblem>;

    /**
     * ISO 8601
     */
    updatedAt: string | null;

    /**
     * Set for VAPI only.
     */
    vapi: Data.Vapi | null;
  }

  export namespace Data {
    /**
     * Set for GOOGLE_CES only.
     */
    export interface GoogleCes {
      appId: string;

      deploymentId: string;

      gcpProjectId: string;

      location: string;

      serviceAccountEmail: string;

      versionId: string | null;
    }

    /**
     * Set for KORE only.
     */
    export interface Kore {
      appId: string;

      baseUrl: string | null;

      envName: string;
    }

    /**
     * Set for LIVEKIT only.
     */
    export interface Livekit {
      metadataEgressStrategy: 'EAGER' | 'DEFERRED';

      metadataFilteringEnabled: boolean;

      url: string;
    }

    /**
     * Set for the Pipecat providers only. Secrets are reported only as present or
     * absent.
     */
    export interface Pipecat {
      appendAgentId: boolean;

      baseSignalingUrl: string | null;

      hasAuthToken: boolean;

      hasPccPublicKey: boolean;

      pccRoomProperties: { [key: string]: unknown } | null;

      pccStartBody: { [key: string]: unknown } | null;
    }

    /**
     * The latest scheduled sync. Null for platforms that report calls themselves
     * rather than being pulled.
     */
    export interface Sync {
      /**
       * Agents the latest run brought in.
       */
      createdAgentCount: number | null;

      /**
       * ISO 8601
       */
      endedAt: string | null;

      /**
       * How often the connection syncs.
       */
      intervalMinutes: number | null;

      isUpToDate: boolean | null;

      /**
       * ISO 8601
       */
      startedAt: string | null;

      /**
       * How the latest sync run went.
       */
      status: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | null;
    }

    export interface SyncProblem {
      /**
       * The platform's id of the agent the problem is with
       */
      agentId: string | null;

      agentName: string | null;

      /**
       * ISO 8601
       */
      at: string;

      /**
       * Why the sync failed for it, such as INVALID_API_KEY or AGENT_NOT_FOUND.
       */
      reason: string | null;
    }

    /**
     * Set for VAPI only.
     */
    export interface Vapi {
      outboundRequestBodyTemplate: { [key: string]: unknown } | null;
    }
  }
}

export interface AgentConnectionListResponse {
  data: Array<AgentConnectionListResponse.Data>;
}

export namespace AgentConnectionListResponse {
  /**
   * A connection to the platform a project’s agents run on. Credentials are never
   * returned; the API key Roark mints for an SDK-driven platform is returned once,
   * on create.
   */
  export interface Data {
    id: string;

    /**
     * The platform's ids of the SELECTED agents.
     */
    agentIds: Array<string>;

    /**
     * Agents created by name.
     */
    agentNames: Array<string>;

    /**
     * Null for platforms that do not scope by agent.
     */
    agentScope: 'ALL' | 'SELECTED' | null;

    capabilities: Array<'PULL_AGENTS' | 'PULL_CALLS' | 'PUSH_AGENT_CONFIG'>;

    /**
     * ISO 8601
     */
    createdAt: string;

    /**
     * Set for GOOGLE_CES only.
     */
    googleCes: Data.GoogleCes | null;

    /**
     * Set for KORE only.
     */
    kore: Data.Kore | null;

    /**
     * Set for LIVEKIT only.
     */
    livekit: Data.Livekit | null;

    name: string;

    /**
     * Set for the Pipecat providers only. Secrets are reported only as present or
     * absent.
     */
    pipecat: Data.Pipecat | null;

    /**
     * The platform the agents run on. LIVEKIT is LiveKit Cloud; LIVEKIT_SELF_HOSTED is
     * the LiveKit Agents SDK reporting through the Roark plugin.
     * PIPECAT_CLOUD_INTEGRATION and PIPECAT_SELF_HOSTED_INTEGRATION are Pipecat Cloud
     * and a self-hosted Pipecat bot. `GET /v1/connections/agent/providers` describes
     * what each one needs.
     */
    provider:
      | 'RETELL'
      | 'VAPI'
      | 'ELEVEN_LABS'
      | 'BLAND'
      | 'LEAPING'
      | 'LIVEKIT'
      | 'LIVEKIT_SELF_HOSTED'
      | 'PIPECAT_CLOUD_INTEGRATION'
      | 'PIPECAT_SELF_HOSTED_INTEGRATION'
      | 'KORE'
      | 'GOOGLE_CES';

    samplingRate: number;

    /**
     * INACTIVE pauses syncing and call import without deleting anything.
     */
    status: 'ACTIVE' | 'INACTIVE';

    /**
     * The latest scheduled sync. Null for platforms that report calls themselves
     * rather than being pulled.
     */
    sync: Data.Sync | null;

    /**
     * Agents the latest sync could not bring in, and why. Empty when the sync is
     * healthy.
     */
    syncProblems: Array<Data.SyncProblem>;

    /**
     * ISO 8601
     */
    updatedAt: string | null;

    /**
     * Set for VAPI only.
     */
    vapi: Data.Vapi | null;
  }

  export namespace Data {
    /**
     * Set for GOOGLE_CES only.
     */
    export interface GoogleCes {
      appId: string;

      deploymentId: string;

      gcpProjectId: string;

      location: string;

      serviceAccountEmail: string;

      versionId: string | null;
    }

    /**
     * Set for KORE only.
     */
    export interface Kore {
      appId: string;

      baseUrl: string | null;

      envName: string;
    }

    /**
     * Set for LIVEKIT only.
     */
    export interface Livekit {
      metadataEgressStrategy: 'EAGER' | 'DEFERRED';

      metadataFilteringEnabled: boolean;

      url: string;
    }

    /**
     * Set for the Pipecat providers only. Secrets are reported only as present or
     * absent.
     */
    export interface Pipecat {
      appendAgentId: boolean;

      baseSignalingUrl: string | null;

      hasAuthToken: boolean;

      hasPccPublicKey: boolean;

      pccRoomProperties: { [key: string]: unknown } | null;

      pccStartBody: { [key: string]: unknown } | null;
    }

    /**
     * The latest scheduled sync. Null for platforms that report calls themselves
     * rather than being pulled.
     */
    export interface Sync {
      /**
       * Agents the latest run brought in.
       */
      createdAgentCount: number | null;

      /**
       * ISO 8601
       */
      endedAt: string | null;

      /**
       * How often the connection syncs.
       */
      intervalMinutes: number | null;

      isUpToDate: boolean | null;

      /**
       * ISO 8601
       */
      startedAt: string | null;

      /**
       * How the latest sync run went.
       */
      status: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | null;
    }

    export interface SyncProblem {
      /**
       * The platform's id of the agent the problem is with
       */
      agentId: string | null;

      agentName: string | null;

      /**
       * ISO 8601
       */
      at: string;

      /**
       * Why the sync failed for it, such as INVALID_API_KEY or AGENT_NOT_FOUND.
       */
      reason: string | null;
    }

    /**
     * Set for VAPI only.
     */
    export interface Vapi {
      outboundRequestBodyTemplate: { [key: string]: unknown } | null;
    }
  }
}

export interface AgentConnectionDeleteResponse {
  data: AgentConnectionDeleteResponse.Data;
}

export namespace AgentConnectionDeleteResponse {
  export interface Data {
    id: string;

    deleted: true;
  }
}

export interface AgentConnectionCancelBackfillResponse {
  /**
   * An import of past calls from the platform.
   */
  data: AgentConnectionCancelBackfillResponse.Data;
}

export namespace AgentConnectionCancelBackfillResponse {
  /**
   * An import of past calls from the platform.
   */
  export interface Data {
    id: string;

    /**
     * ISO 8601
     */
    createdAt: string;

    /**
     * Past calls imported so far.
     */
    importedCallCount: number | null;

    maxCalls: number;

    status: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  }
}

export interface AgentConnectionCreateBackfillResponse {
  /**
   * An import of past calls from the platform.
   */
  data: AgentConnectionCreateBackfillResponse.Data;
}

export namespace AgentConnectionCreateBackfillResponse {
  /**
   * An import of past calls from the platform.
   */
  export interface Data {
    id: string;

    /**
     * ISO 8601
     */
    createdAt: string;

    /**
     * Past calls imported so far.
     */
    importedCallCount: number | null;

    maxCalls: number;

    status: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  }
}

export interface AgentConnectionDiscoverResponse {
  data: Array<AgentConnectionDiscoverResponse.Data>;
}

export namespace AgentConnectionDiscoverResponse {
  export interface Data {
    /**
     * The platform's id, for `agentIds`
     */
    id: string;

    /**
     * Vapi only: true when the assistant withholds recordings, so its calls cannot be
     * analysed. Null elsewhere.
     */
    hipaaEnabled: boolean | null;

    name: string;
  }
}

export interface AgentConnectionGetByIDResponse {
  /**
   * A connection to the platform a project’s agents run on. Credentials are never
   * returned; the API key Roark mints for an SDK-driven platform is returned once,
   * on create.
   */
  data: AgentConnectionGetByIDResponse.Data;
}

export namespace AgentConnectionGetByIDResponse {
  /**
   * A connection to the platform a project’s agents run on. Credentials are never
   * returned; the API key Roark mints for an SDK-driven platform is returned once,
   * on create.
   */
  export interface Data {
    id: string;

    /**
     * The platform's ids of the SELECTED agents.
     */
    agentIds: Array<string>;

    /**
     * Agents created by name.
     */
    agentNames: Array<string>;

    /**
     * Null for platforms that do not scope by agent.
     */
    agentScope: 'ALL' | 'SELECTED' | null;

    capabilities: Array<'PULL_AGENTS' | 'PULL_CALLS' | 'PUSH_AGENT_CONFIG'>;

    /**
     * ISO 8601
     */
    createdAt: string;

    /**
     * Set for GOOGLE_CES only.
     */
    googleCes: Data.GoogleCes | null;

    /**
     * Set for KORE only.
     */
    kore: Data.Kore | null;

    /**
     * Set for LIVEKIT only.
     */
    livekit: Data.Livekit | null;

    name: string;

    /**
     * Set for the Pipecat providers only. Secrets are reported only as present or
     * absent.
     */
    pipecat: Data.Pipecat | null;

    /**
     * The platform the agents run on. LIVEKIT is LiveKit Cloud; LIVEKIT_SELF_HOSTED is
     * the LiveKit Agents SDK reporting through the Roark plugin.
     * PIPECAT_CLOUD_INTEGRATION and PIPECAT_SELF_HOSTED_INTEGRATION are Pipecat Cloud
     * and a self-hosted Pipecat bot. `GET /v1/connections/agent/providers` describes
     * what each one needs.
     */
    provider:
      | 'RETELL'
      | 'VAPI'
      | 'ELEVEN_LABS'
      | 'BLAND'
      | 'LEAPING'
      | 'LIVEKIT'
      | 'LIVEKIT_SELF_HOSTED'
      | 'PIPECAT_CLOUD_INTEGRATION'
      | 'PIPECAT_SELF_HOSTED_INTEGRATION'
      | 'KORE'
      | 'GOOGLE_CES';

    samplingRate: number;

    /**
     * INACTIVE pauses syncing and call import without deleting anything.
     */
    status: 'ACTIVE' | 'INACTIVE';

    /**
     * The latest scheduled sync. Null for platforms that report calls themselves
     * rather than being pulled.
     */
    sync: Data.Sync | null;

    /**
     * Agents the latest sync could not bring in, and why. Empty when the sync is
     * healthy.
     */
    syncProblems: Array<Data.SyncProblem>;

    /**
     * ISO 8601
     */
    updatedAt: string | null;

    /**
     * Set for VAPI only.
     */
    vapi: Data.Vapi | null;
  }

  export namespace Data {
    /**
     * Set for GOOGLE_CES only.
     */
    export interface GoogleCes {
      appId: string;

      deploymentId: string;

      gcpProjectId: string;

      location: string;

      serviceAccountEmail: string;

      versionId: string | null;
    }

    /**
     * Set for KORE only.
     */
    export interface Kore {
      appId: string;

      baseUrl: string | null;

      envName: string;
    }

    /**
     * Set for LIVEKIT only.
     */
    export interface Livekit {
      metadataEgressStrategy: 'EAGER' | 'DEFERRED';

      metadataFilteringEnabled: boolean;

      url: string;
    }

    /**
     * Set for the Pipecat providers only. Secrets are reported only as present or
     * absent.
     */
    export interface Pipecat {
      appendAgentId: boolean;

      baseSignalingUrl: string | null;

      hasAuthToken: boolean;

      hasPccPublicKey: boolean;

      pccRoomProperties: { [key: string]: unknown } | null;

      pccStartBody: { [key: string]: unknown } | null;
    }

    /**
     * The latest scheduled sync. Null for platforms that report calls themselves
     * rather than being pulled.
     */
    export interface Sync {
      /**
       * Agents the latest run brought in.
       */
      createdAgentCount: number | null;

      /**
       * ISO 8601
       */
      endedAt: string | null;

      /**
       * How often the connection syncs.
       */
      intervalMinutes: number | null;

      isUpToDate: boolean | null;

      /**
       * ISO 8601
       */
      startedAt: string | null;

      /**
       * How the latest sync run went.
       */
      status: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | null;
    }

    export interface SyncProblem {
      /**
       * The platform's id of the agent the problem is with
       */
      agentId: string | null;

      agentName: string | null;

      /**
       * ISO 8601
       */
      at: string;

      /**
       * Why the sync failed for it, such as INVALID_API_KEY or AGENT_NOT_FOUND.
       */
      reason: string | null;
    }

    /**
     * Set for VAPI only.
     */
    export interface Vapi {
      outboundRequestBodyTemplate: { [key: string]: unknown } | null;
    }
  }
}

export interface AgentConnectionListBackfillsResponse {
  data: Array<AgentConnectionListBackfillsResponse.Data>;
}

export namespace AgentConnectionListBackfillsResponse {
  /**
   * An import of past calls from the platform.
   */
  export interface Data {
    id: string;

    /**
     * ISO 8601
     */
    createdAt: string;

    /**
     * Past calls imported so far.
     */
    importedCallCount: number | null;

    maxCalls: number;

    status: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  }
}

export interface AgentConnectionListProvidersResponse {
  data: Array<AgentConnectionListProvidersResponse.Data>;
}

export namespace AgentConnectionListProvidersResponse {
  export interface Data {
    defaultCapabilities: Array<'PULL_AGENTS' | 'PULL_CALLS' | 'PUSH_AGENT_CONFIG'>;

    /**
     * How calls reach Roark. SYNC: Roark pulls them on a schedule. WEBHOOK: the
     * platform sends them as rooms end. SDK: your code reports them with the returned
     * `observerApiKey`. NONE: the connection is for testing only.
     */
    ingestion: 'SYNC' | 'WEBHOOK' | 'SDK' | 'NONE';

    label: string;

    /**
     * Whether a project may connect more than one account. Otherwise a second create
     * returns 409.
     */
    multipleConnections: boolean;

    /**
     * The platform the agents run on. LIVEKIT is LiveKit Cloud; LIVEKIT_SELF_HOSTED is
     * the LiveKit Agents SDK reporting through the Roark plugin.
     * PIPECAT_CLOUD_INTEGRATION and PIPECAT_SELF_HOSTED_INTEGRATION are Pipecat Cloud
     * and a self-hosted Pipecat bot. `GET /v1/connections/agent/providers` describes
     * what each one needs.
     */
    provider:
      | 'RETELL'
      | 'VAPI'
      | 'ELEVEN_LABS'
      | 'BLAND'
      | 'LEAPING'
      | 'LIVEKIT'
      | 'LIVEKIT_SELF_HOSTED'
      | 'PIPECAT_CLOUD_INTEGRATION'
      | 'PIPECAT_SELF_HOSTED_INTEGRATION'
      | 'KORE'
      | 'GOOGLE_CES';

    /**
     * Create-body fields this provider requires.
     */
    requiredFields: Array<string>;

    supportedCapabilities: Array<'PULL_AGENTS' | 'PULL_CALLS' | 'PUSH_AGENT_CONFIG'>;

    /**
     * Whether `discover` can list its agents, so a connection can be scoped by id.
     */
    supportsAgentDiscovery: boolean;

    /**
     * Whether past calls can be imported with a backfill.
     */
    supportsBackfill: boolean;
  }
}

export type AgentConnectionCreateParams =
  | AgentConnectionCreateParams.AgentConnectionCreateRetell
  | AgentConnectionCreateParams.AgentConnectionCreateVapi
  | AgentConnectionCreateParams.AgentConnectionCreateElevenLabs
  | AgentConnectionCreateParams.AgentConnectionCreateBland
  | AgentConnectionCreateParams.AgentConnectionCreateLeaping
  | AgentConnectionCreateParams.AgentConnectionCreateLivekit
  | AgentConnectionCreateParams.AgentConnectionCreateLivekitSelfHosted
  | AgentConnectionCreateParams.AgentConnectionCreatePipecatSelfHosted
  | AgentConnectionCreateParams.AgentConnectionCreatePipecatCloud
  | AgentConnectionCreateParams.AgentConnectionCreateKore
  | AgentConnectionCreateParams.AgentConnectionCreateGoogleCes;

export declare namespace AgentConnectionCreateParams {
  export interface AgentConnectionCreateRetell {
    /**
     * The platform's API key. Checked against the platform before anything is stored.
     * Stored encrypted and never returned.
     */
    apiKey: string;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name: string;

    provider: 'RETELL';

    /**
     * The platform's own ids of the agents to bring in when `agentScope` is SELECTED.
     * `POST /v1/connections/agent/discover` lists them.
     */
    agentIds?: Array<string>;

    /**
     * Agents to create by name rather than by id, for agents the platform does not
     * list. On LiveKit Cloud this is the agent name your worker dispatches as.
     */
    agentNames?: Array<string>;

    /**
     * ALL brings in every agent on the account. SELECTED brings in only `agentIds` and
     * `agentNames`.
     */
    agentScope?: 'ALL' | 'SELECTED';

    /**
     * What the connection does. Defaults to PULL_AGENTS and PULL_CALLS, plus
     * PUSH_AGENT_CONFIG on Retell, Vapi and ElevenLabs.
     */
    capabilities?: Array<'PULL_AGENTS' | 'PULL_CALLS' | 'PUSH_AGENT_CONFIG'>;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;
  }

  export interface AgentConnectionCreateVapi {
    /**
     * The platform's API key. Checked against the platform before anything is stored.
     * Stored encrypted and never returned.
     */
    apiKey: string;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name: string;

    provider: 'VAPI';

    /**
     * The platform's own ids of the agents to bring in when `agentScope` is SELECTED.
     * `POST /v1/connections/agent/discover` lists them.
     */
    agentIds?: Array<string>;

    /**
     * Agents to create by name rather than by id, for agents the platform does not
     * list. On LiveKit Cloud this is the agent name your worker dispatches as.
     */
    agentNames?: Array<string>;

    /**
     * ALL brings in every agent on the account. SELECTED brings in only `agentIds` and
     * `agentNames`.
     */
    agentScope?: 'ALL' | 'SELECTED';

    /**
     * What the connection does. Defaults to PULL_AGENTS and PULL_CALLS, plus
     * PUSH_AGENT_CONFIG on Retell, Vapi and ElevenLabs.
     */
    capabilities?: Array<'PULL_AGENTS' | 'PULL_CALLS' | 'PUSH_AGENT_CONFIG'>;

    /**
     * Assistant overrides Roark merges into the request when it asks Vapi to place an
     * outbound test call.
     */
    outboundRequestBodyTemplate?: { [key: string]: unknown } | null;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;
  }

  export interface AgentConnectionCreateElevenLabs {
    /**
     * The platform's API key. Checked against the platform before anything is stored.
     * Stored encrypted and never returned.
     */
    apiKey: string;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name: string;

    provider: 'ELEVEN_LABS';

    /**
     * The platform's own ids of the agents to bring in when `agentScope` is SELECTED.
     * `POST /v1/connections/agent/discover` lists them.
     */
    agentIds?: Array<string>;

    /**
     * Agents to create by name rather than by id, for agents the platform does not
     * list. On LiveKit Cloud this is the agent name your worker dispatches as.
     */
    agentNames?: Array<string>;

    /**
     * ALL brings in every agent on the account. SELECTED brings in only `agentIds` and
     * `agentNames`.
     */
    agentScope?: 'ALL' | 'SELECTED';

    /**
     * What the connection does. Defaults to PULL_AGENTS and PULL_CALLS, plus
     * PUSH_AGENT_CONFIG on Retell, Vapi and ElevenLabs.
     */
    capabilities?: Array<'PULL_AGENTS' | 'PULL_CALLS' | 'PUSH_AGENT_CONFIG'>;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;
  }

  export interface AgentConnectionCreateBland {
    /**
     * The platform's API key. Checked against the platform before anything is stored.
     * Stored encrypted and never returned.
     */
    apiKey: string;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name: string;

    provider: 'BLAND';

    /**
     * The platform's own ids of the agents to bring in when `agentScope` is SELECTED.
     * `POST /v1/connections/agent/discover` lists them.
     */
    agentIds?: Array<string>;

    /**
     * Agents to create by name rather than by id, for agents the platform does not
     * list. On LiveKit Cloud this is the agent name your worker dispatches as.
     */
    agentNames?: Array<string>;

    /**
     * ALL brings in every agent on the account. SELECTED brings in only `agentIds` and
     * `agentNames`.
     */
    agentScope?: 'ALL' | 'SELECTED';

    /**
     * What the connection does. Defaults to PULL_AGENTS and PULL_CALLS, plus
     * PUSH_AGENT_CONFIG on Retell, Vapi and ElevenLabs.
     */
    capabilities?: Array<'PULL_AGENTS' | 'PULL_CALLS' | 'PUSH_AGENT_CONFIG'>;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;
  }

  export interface AgentConnectionCreateLeaping {
    /**
     * The Leaping agent ids to import calls for. Leaping does not list agents, so name
     * each one.
     */
    agentIds: Array<string>;

    /**
     * The platform's API key. Checked against the platform before anything is stored.
     * Stored encrypted and never returned.
     */
    apiKey: string;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name: string;

    provider: 'LEAPING';

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;
  }

  export interface AgentConnectionCreateLivekit {
    /**
     * LiveKit API key. Stored encrypted and never returned.
     */
    apiKey: string;

    /**
     * LiveKit API secret. Stored encrypted and never returned.
     */
    apiSecret: string;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name: string;

    provider: 'LIVEKIT';

    /**
     * Your LiveKit server URL.
     */
    url: string;

    /**
     * Agents to create by name rather than by id, for agents the platform does not
     * list. On LiveKit Cloud this is the agent name your worker dispatches as.
     */
    agentNames?: Array<string>;

    /**
     * ALL brings in every agent on the account. SELECTED brings in only `agentIds` and
     * `agentNames`.
     */
    agentScope?: 'ALL' | 'SELECTED';

    /**
     * Creates a LiveKit endpoint for each agent the connection brings in, so Roark can
     * place test calls to it. Omit to create none; endpoints can be added later on the
     * agent.
     */
    endpoint?: AgentConnectionCreateLivekit.Endpoint;

    /**
     * When the recording starts for a marked room. EAGER starts it at room creation;
     * DEFERRED waits for the metadata. Needs `metadataFilteringEnabled`. Defaults to
     * DEFERRED.
     */
    metadataEgressStrategy?: 'EAGER' | 'DEFERRED';

    /**
     * Only import rooms whose metadata marks them for Roark. Defaults to false.
     */
    metadataFilteringEnabled?: boolean;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;
  }

  export namespace AgentConnectionCreateLivekit {
    /**
     * Creates a LiveKit endpoint for each agent the connection brings in, so Roark can
     * place test calls to it. Omit to create none; endpoints can be added later on the
     * agent.
     */
    export interface Endpoint {
      /**
       * True to let Roark create the LiveKit room for each test call. False to have
       * Roark call `roomCreationUrl`, which creates the room and returns its connection
       * details.
       */
      autoCreateRoom: boolean;

      /**
       * Room metadata Roark sets when it creates the room. Only used with
       * `autoCreateRoom`.
       */
      autoCreateRoomMetadata?: { [key: string]: unknown } | null;

      /**
       * Environment label for the endpoints.
       */
      environment?: string;

      /**
       * Your endpoint that creates a room for a test call. Required when
       * `autoCreateRoom` is false.
       */
      roomCreationUrl?: string | null;
    }
  }

  export interface AgentConnectionCreateLivekitSelfHosted {
    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name: string;

    provider: 'LIVEKIT_SELF_HOSTED';

    /**
     * Name for the Roark API key minted for your SDK to report calls with. Defaults to
     * the connection name plus "SDK".
     */
    observerApiKeyName?: string;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;
  }

  export interface AgentConnectionCreatePipecatSelfHosted {
    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name: string;

    provider: 'PIPECAT_SELF_HOSTED_INTEGRATION';

    /**
     * Append the agent's name to the signaling URL, for one server hosting several
     * bots. Defaults to true.
     */
    appendAgentId?: boolean;

    /**
     * Bearer token Roark sends to the signaling URL. Stored encrypted and never
     * returned. Null clears it.
     */
    authToken?: string | null;

    /**
     * Your bot's SmallWebRTC signaling URL. Set it to let Roark place test calls to
     * the bot; omit for call import only.
     */
    baseSignalingUrl?: string;

    /**
     * Name for the Roark API key minted for your SDK to report calls with. Defaults to
     * the connection name plus "SDK".
     */
    observerApiKeyName?: string;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;
  }

  export interface AgentConnectionCreatePipecatCloud {
    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name: string;

    provider: 'PIPECAT_CLOUD_INTEGRATION';

    /**
     * Name for the Roark API key minted for your SDK to report calls with. Defaults to
     * the connection name plus "SDK".
     */
    observerApiKeyName?: string;

    /**
     * Pipecat Cloud public API key. Set it to let Roark place test calls through
     * Pipecat Cloud; omit for call import only. Stored encrypted and never returned.
     */
    pccPublicKey?: string;

    /**
     * Daily room properties for test calls.
     */
    pccRoomProperties?: { [key: string]: unknown } | null;

    /**
     * Body Roark sends when starting a session.
     */
    pccStartBody?: { [key: string]: unknown } | null;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;
  }

  export interface AgentConnectionCreateKore {
    /**
     * Kore AI API key. Stored encrypted and never returned.
     */
    apiKey: string;

    appId: string;

    envName: string;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name: string;

    provider: 'KORE';

    /**
     * Kore AI platform URL, when not the default.
     */
    baseUrl?: string | null;
  }

  export interface AgentConnectionCreateGoogleCes {
    appId: string;

    deploymentId: string;

    location: string;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name: string;

    provider: 'GOOGLE_CES';

    /**
     * The Workload Identity Federation credential file (`type: external_account`)
     * exactly as Google generates it. Stored encrypted and never returned.
     */
    wifConfig: AgentConnectionCreateGoogleCes.WifConfig;

    /**
     * Pin a version. Omit to use whatever version the deployment serves.
     */
    versionId?: string | null;
  }

  export namespace AgentConnectionCreateGoogleCes {
    /**
     * The Workload Identity Federation credential file (`type: external_account`)
     * exactly as Google generates it. Stored encrypted and never returned.
     */
    export interface WifConfig {
      audience: string;

      credential_source: WifConfig.CredentialSource;

      service_account_impersonation_url: string;

      subject_token_type: string;

      token_url: string;

      type: 'external_account';

      universe_domain?: string;
    }

    export namespace WifConfig {
      export interface CredentialSource {
        environment_id: string;

        region_url: string;

        regional_cred_verification_url: string;

        url: string;
      }
    }
  }
}

export type AgentConnectionUpdateParams =
  | AgentConnectionUpdateParams.AgentConnectionUpdateRetell
  | AgentConnectionUpdateParams.AgentConnectionUpdateVapi
  | AgentConnectionUpdateParams.AgentConnectionUpdateElevenLabs
  | AgentConnectionUpdateParams.AgentConnectionUpdateBland
  | AgentConnectionUpdateParams.AgentConnectionUpdateLeaping
  | AgentConnectionUpdateParams.AgentConnectionUpdateLivekit
  | AgentConnectionUpdateParams.AgentConnectionUpdateLivekitSelfHosted
  | AgentConnectionUpdateParams.AgentConnectionUpdatePipecatSelfHosted
  | AgentConnectionUpdateParams.AgentConnectionUpdatePipecatCloud
  | AgentConnectionUpdateParams.AgentConnectionUpdateKore
  | AgentConnectionUpdateParams.AgentConnectionUpdateGoogleCes;

export declare namespace AgentConnectionUpdateParams {
  export interface AgentConnectionUpdateRetell {
    /**
     * The connection's provider. It cannot change.
     */
    provider: 'RETELL';

    /**
     * The platform's own ids of the agents to bring in when `agentScope` is SELECTED.
     * `POST /v1/connections/agent/discover` lists them.
     */
    agentIds?: Array<string>;

    /**
     * Agents to create by name rather than by id, for agents the platform does not
     * list. On LiveKit Cloud this is the agent name your worker dispatches as.
     */
    agentNames?: Array<string>;

    /**
     * ALL brings in every agent on the account. SELECTED brings in only `agentIds` and
     * `agentNames`.
     */
    agentScope?: 'ALL' | 'SELECTED';

    /**
     * The platform's API key. Checked against the platform before anything is stored.
     * Stored encrypted and never returned.
     */
    apiKey?: string;

    /**
     * What the connection does. Defaults to PULL_AGENTS and PULL_CALLS, plus
     * PUSH_AGENT_CONFIG on Retell, Vapi and ElevenLabs.
     */
    capabilities?: Array<'PULL_AGENTS' | 'PULL_CALLS' | 'PUSH_AGENT_CONFIG'>;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name?: string;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;

    /**
     * INACTIVE pauses syncing and call import without deleting anything.
     */
    status?: 'ACTIVE' | 'INACTIVE';
  }

  export interface AgentConnectionUpdateVapi {
    /**
     * The connection's provider. It cannot change.
     */
    provider: 'VAPI';

    /**
     * The platform's own ids of the agents to bring in when `agentScope` is SELECTED.
     * `POST /v1/connections/agent/discover` lists them.
     */
    agentIds?: Array<string>;

    /**
     * Agents to create by name rather than by id, for agents the platform does not
     * list. On LiveKit Cloud this is the agent name your worker dispatches as.
     */
    agentNames?: Array<string>;

    /**
     * ALL brings in every agent on the account. SELECTED brings in only `agentIds` and
     * `agentNames`.
     */
    agentScope?: 'ALL' | 'SELECTED';

    /**
     * The platform's API key. Checked against the platform before anything is stored.
     * Stored encrypted and never returned.
     */
    apiKey?: string;

    /**
     * What the connection does. Defaults to PULL_AGENTS and PULL_CALLS, plus
     * PUSH_AGENT_CONFIG on Retell, Vapi and ElevenLabs.
     */
    capabilities?: Array<'PULL_AGENTS' | 'PULL_CALLS' | 'PUSH_AGENT_CONFIG'>;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name?: string;

    /**
     * Assistant overrides Roark merges into the request when it asks Vapi to place an
     * outbound test call.
     */
    outboundRequestBodyTemplate?: { [key: string]: unknown } | null;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;

    /**
     * INACTIVE pauses syncing and call import without deleting anything.
     */
    status?: 'ACTIVE' | 'INACTIVE';
  }

  export interface AgentConnectionUpdateElevenLabs {
    /**
     * The connection's provider. It cannot change.
     */
    provider: 'ELEVEN_LABS';

    /**
     * The platform's own ids of the agents to bring in when `agentScope` is SELECTED.
     * `POST /v1/connections/agent/discover` lists them.
     */
    agentIds?: Array<string>;

    /**
     * Agents to create by name rather than by id, for agents the platform does not
     * list. On LiveKit Cloud this is the agent name your worker dispatches as.
     */
    agentNames?: Array<string>;

    /**
     * ALL brings in every agent on the account. SELECTED brings in only `agentIds` and
     * `agentNames`.
     */
    agentScope?: 'ALL' | 'SELECTED';

    /**
     * The platform's API key. Checked against the platform before anything is stored.
     * Stored encrypted and never returned.
     */
    apiKey?: string;

    /**
     * What the connection does. Defaults to PULL_AGENTS and PULL_CALLS, plus
     * PUSH_AGENT_CONFIG on Retell, Vapi and ElevenLabs.
     */
    capabilities?: Array<'PULL_AGENTS' | 'PULL_CALLS' | 'PUSH_AGENT_CONFIG'>;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name?: string;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;

    /**
     * INACTIVE pauses syncing and call import without deleting anything.
     */
    status?: 'ACTIVE' | 'INACTIVE';
  }

  export interface AgentConnectionUpdateBland {
    /**
     * The connection's provider. It cannot change.
     */
    provider: 'BLAND';

    /**
     * The platform's own ids of the agents to bring in when `agentScope` is SELECTED.
     * `POST /v1/connections/agent/discover` lists them.
     */
    agentIds?: Array<string>;

    /**
     * Agents to create by name rather than by id, for agents the platform does not
     * list. On LiveKit Cloud this is the agent name your worker dispatches as.
     */
    agentNames?: Array<string>;

    /**
     * ALL brings in every agent on the account. SELECTED brings in only `agentIds` and
     * `agentNames`.
     */
    agentScope?: 'ALL' | 'SELECTED';

    /**
     * The platform's API key. Checked against the platform before anything is stored.
     * Stored encrypted and never returned.
     */
    apiKey?: string;

    /**
     * What the connection does. Defaults to PULL_AGENTS and PULL_CALLS, plus
     * PUSH_AGENT_CONFIG on Retell, Vapi and ElevenLabs.
     */
    capabilities?: Array<'PULL_AGENTS' | 'PULL_CALLS' | 'PUSH_AGENT_CONFIG'>;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name?: string;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;

    /**
     * INACTIVE pauses syncing and call import without deleting anything.
     */
    status?: 'ACTIVE' | 'INACTIVE';
  }

  export interface AgentConnectionUpdateLeaping {
    /**
     * The connection's provider. It cannot change.
     */
    provider: 'LEAPING';

    /**
     * The Leaping agent ids to import calls for. Leaping does not list agents, so name
     * each one.
     */
    agentIds?: Array<string>;

    /**
     * The platform's API key. Checked against the platform before anything is stored.
     * Stored encrypted and never returned.
     */
    apiKey?: string;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name?: string;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;

    /**
     * INACTIVE pauses syncing and call import without deleting anything.
     */
    status?: 'ACTIVE' | 'INACTIVE';
  }

  export interface AgentConnectionUpdateLivekit {
    /**
     * The connection's provider. It cannot change.
     */
    provider: 'LIVEKIT';

    /**
     * Agents to create by name rather than by id, for agents the platform does not
     * list. On LiveKit Cloud this is the agent name your worker dispatches as.
     */
    agentNames?: Array<string>;

    /**
     * ALL brings in every agent on the account. SELECTED brings in only `agentIds` and
     * `agentNames`.
     */
    agentScope?: 'ALL' | 'SELECTED';

    /**
     * LiveKit API key. Stored encrypted and never returned.
     */
    apiKey?: string;

    /**
     * LiveKit API secret. Stored encrypted and never returned.
     */
    apiSecret?: string;

    /**
     * When the recording starts for a marked room. EAGER starts it at room creation;
     * DEFERRED waits for the metadata. Needs `metadataFilteringEnabled`. Defaults to
     * DEFERRED.
     */
    metadataEgressStrategy?: 'EAGER' | 'DEFERRED';

    /**
     * Only import rooms whose metadata marks them for Roark. Defaults to false.
     */
    metadataFilteringEnabled?: boolean;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name?: string;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;

    /**
     * INACTIVE pauses syncing and call import without deleting anything.
     */
    status?: 'ACTIVE' | 'INACTIVE';

    /**
     * Your LiveKit server URL.
     */
    url?: string;
  }

  export interface AgentConnectionUpdateLivekitSelfHosted {
    /**
     * The connection's provider. It cannot change.
     */
    provider: 'LIVEKIT_SELF_HOSTED';

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name?: string;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;

    /**
     * INACTIVE pauses syncing and call import without deleting anything.
     */
    status?: 'ACTIVE' | 'INACTIVE';
  }

  export interface AgentConnectionUpdatePipecatSelfHosted {
    /**
     * The connection's provider. It cannot change.
     */
    provider: 'PIPECAT_SELF_HOSTED_INTEGRATION';

    /**
     * Append the agent's name to the signaling URL, for one server hosting several
     * bots. Defaults to true.
     */
    appendAgentId?: boolean;

    /**
     * Bearer token Roark sends to the signaling URL. Stored encrypted and never
     * returned. Null clears it.
     */
    authToken?: string | null;

    /**
     * Your bot's SmallWebRTC signaling URL. Set it to let Roark place test calls to
     * the bot; omit for call import only.
     */
    baseSignalingUrl?: string;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name?: string;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;

    /**
     * INACTIVE pauses syncing and call import without deleting anything.
     */
    status?: 'ACTIVE' | 'INACTIVE';
  }

  export interface AgentConnectionUpdatePipecatCloud {
    /**
     * The connection's provider. It cannot change.
     */
    provider: 'PIPECAT_CLOUD_INTEGRATION';

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name?: string;

    /**
     * Pipecat Cloud public API key. Set it to let Roark place test calls through
     * Pipecat Cloud; omit for call import only. Stored encrypted and never returned.
     */
    pccPublicKey?: string;

    /**
     * Daily room properties for test calls.
     */
    pccRoomProperties?: { [key: string]: unknown } | null;

    /**
     * Body Roark sends when starting a session.
     */
    pccStartBody?: { [key: string]: unknown } | null;

    /**
     * Fraction of production calls to import and analyse, from 0 to 1. Defaults to 1
     * (every call).
     */
    samplingRate?: number;

    /**
     * INACTIVE pauses syncing and call import without deleting anything.
     */
    status?: 'ACTIVE' | 'INACTIVE';
  }

  export interface AgentConnectionUpdateKore {
    /**
     * The connection's provider. It cannot change.
     */
    provider: 'KORE';

    /**
     * Kore AI API key. Stored encrypted and never returned.
     */
    apiKey?: string;

    appId?: string;

    /**
     * Kore AI platform URL, when not the default.
     */
    baseUrl?: string | null;

    envName?: string;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name?: string;

    /**
     * INACTIVE pauses syncing and call import without deleting anything.
     */
    status?: 'ACTIVE' | 'INACTIVE';
  }

  export interface AgentConnectionUpdateGoogleCes {
    /**
     * The connection's provider. It cannot change.
     */
    provider: 'GOOGLE_CES';

    appId?: string;

    deploymentId?: string;

    location?: string;

    /**
     * What the connection is called in Roark. At least 3 characters.
     */
    name?: string;

    /**
     * INACTIVE pauses syncing and call import without deleting anything.
     */
    status?: 'ACTIVE' | 'INACTIVE';

    /**
     * Pin a version. Omit to use whatever version the deployment serves.
     */
    versionId?: string | null;

    /**
     * The Workload Identity Federation credential file (`type: external_account`)
     * exactly as Google generates it. Stored encrypted and never returned.
     */
    wifConfig?: AgentConnectionUpdateGoogleCes.WifConfig;
  }

  export namespace AgentConnectionUpdateGoogleCes {
    /**
     * The Workload Identity Federation credential file (`type: external_account`)
     * exactly as Google generates it. Stored encrypted and never returned.
     */
    export interface WifConfig {
      audience: string;

      credential_source: WifConfig.CredentialSource;

      service_account_impersonation_url: string;

      subject_token_type: string;

      token_url: string;

      type: 'external_account';

      universe_domain?: string;
    }

    export namespace WifConfig {
      export interface CredentialSource {
        environment_id: string;

        region_url: string;

        regional_cred_verification_url: string;

        url: string;
      }
    }
  }
}

export interface AgentConnectionListParams {
  /**
   * The platform the agents run on. LIVEKIT is LiveKit Cloud; LIVEKIT_SELF_HOSTED is
   * the LiveKit Agents SDK reporting through the Roark plugin.
   * PIPECAT_CLOUD_INTEGRATION and PIPECAT_SELF_HOSTED_INTEGRATION are Pipecat Cloud
   * and a self-hosted Pipecat bot. `GET /v1/connections/agent/providers` describes
   * what each one needs.
   */
  provider?:
    | 'RETELL'
    | 'VAPI'
    | 'ELEVEN_LABS'
    | 'BLAND'
    | 'LEAPING'
    | 'LIVEKIT'
    | 'LIVEKIT_SELF_HOSTED'
    | 'PIPECAT_CLOUD_INTEGRATION'
    | 'PIPECAT_SELF_HOSTED_INTEGRATION'
    | 'KORE'
    | 'GOOGLE_CES';
}

export interface AgentConnectionCancelBackfillParams {
  connectionId: string;
}

export interface AgentConnectionCreateBackfillParams {
  /**
   * How many of the most recent past calls to import, up to 1000.
   */
  maxCalls: number;
}

export interface AgentConnectionDiscoverParams {
  /**
   * The platform API key to list agents with. Stored nowhere.
   */
  apiKey: string;

  /**
   * Platforms whose agents can be listed with a key.
   */
  provider: 'RETELL' | 'VAPI' | 'ELEVEN_LABS' | 'BLAND';
}

export declare namespace AgentConnection {
  export {
    type AgentConnectionCreateResponse as AgentConnectionCreateResponse,
    type AgentConnectionUpdateResponse as AgentConnectionUpdateResponse,
    type AgentConnectionListResponse as AgentConnectionListResponse,
    type AgentConnectionDeleteResponse as AgentConnectionDeleteResponse,
    type AgentConnectionCancelBackfillResponse as AgentConnectionCancelBackfillResponse,
    type AgentConnectionCreateBackfillResponse as AgentConnectionCreateBackfillResponse,
    type AgentConnectionDiscoverResponse as AgentConnectionDiscoverResponse,
    type AgentConnectionGetByIDResponse as AgentConnectionGetByIDResponse,
    type AgentConnectionListBackfillsResponse as AgentConnectionListBackfillsResponse,
    type AgentConnectionListProvidersResponse as AgentConnectionListProvidersResponse,
    type AgentConnectionCreateParams as AgentConnectionCreateParams,
    type AgentConnectionUpdateParams as AgentConnectionUpdateParams,
    type AgentConnectionListParams as AgentConnectionListParams,
    type AgentConnectionCancelBackfillParams as AgentConnectionCancelBackfillParams,
    type AgentConnectionCreateBackfillParams as AgentConnectionCreateBackfillParams,
    type AgentConnectionDiscoverParams as AgentConnectionDiscoverParams,
  };
}
