// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as AgentConfigAPI from './agent-config';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class AgentConfig extends APIResource {
  /**
   * Write a new revision onto a channel. Writing production creates the key when it
   * does not exist; writing staging stages a candidate that only Roark-recognized
   * simulation sessions will read. Every write is a new revision; nothing is
   * overwritten.
   *
   * @example
   * ```ts
   * const agentConfig = await client.agentConfig.update('x', {
   *   channel: 'production',
   *   document: { foo: 'string' },
   * });
   * ```
   */
  update(
    key: string,
    body: AgentConfigUpdateParams,
    options?: RequestOptions,
  ): APIPromise<AgentConfigUpdateResponse> {
    return this._client.put(path`/v1/agent-config/${key}`, { body, ...options });
  }

  /**
   * List the managed agent configs in this project, most recent first.
   *
   * @example
   * ```ts
   * const agentConfigs = await client.agentConfig.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<AgentConfigListResponse> {
    return this._client.get('/v1/agent-config', options);
  }

  /**
   * Clear the staging channel. Production is untouched; recognized simulation
   * sessions go back to reading production.
   *
   * @example
   * ```ts
   * const response =
   *   await client.agentConfig.deleteStaging('x');
   * ```
   */
  deleteStaging(key: string, options?: RequestOptions): APIPromise<AgentConfigDeleteStagingResponse> {
    return this._client.delete(path`/v1/agent-config/${key}/staging`, options);
  }

  /**
   * Fetch one managed config with its channel pointers and recent revisions, newest
   * first.
   *
   * @example
   * ```ts
   * const response = await client.agentConfig.getByID('x');
   * ```
   */
  getByID(key: string, options?: RequestOptions): APIPromise<AgentConfigGetByIDResponse> {
    return this._client.get(path`/v1/agent-config/${key}`, options);
  }

  /**
   * Point the production channel at the staging revision. Real traffic reads it from
   * the next session onward; roll back by writing the prior revision id to
   * production (the chain preserves every state).
   *
   * @example
   * ```ts
   * const response = await client.agentConfig.promote('x');
   * ```
   */
  promote(key: string, options?: RequestOptions): APIPromise<AgentConfigPromoteResponse> {
    return this._client.post(path`/v1/agent-config/${key}/promote`, options);
  }

  /**
   * The call your agent makes at session start. Returns the config JSON for this
   * session, with per-session simulation recognition built in: when the session was
   * originated by a Roark simulation (matched by caller number against the calls
   * Roark has in flight), the STAGING revision is served for that session only, so
   * Autoimprove candidates are tested on your real deployment. Real traffic always
   * resolves to production; any recognition miss degrades to production too.
   *
   * On the first fetch of an unknown key, pass `defaults` (your baked-in config):
   * the key is registered and the defaults become revision 1. That makes integration
   * a single call.
   *
   * Cache the response per session; do not fetch per turn.
   *
   * @example
   * ```ts
   * const response = await client.agentConfig.resolve('x');
   * ```
   */
  resolve(
    key: string,
    body: AgentConfigResolveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<AgentConfigResolveResponse> {
    return this._client.post(path`/v1/agent-config/${key}/resolve`, { body, ...options });
  }
}

export interface ManagedAgentConfigRevision {
  id: string;

  /**
   * ISO 8601.
   */
  createdAt: string;

  /**
   * Who wrote it: your own pushes, or the Autoimprove loop staging a candidate.
   */
  createdByType: 'CUSTOMER' | 'AUTOIMPROVE';

  /**
   * The config JSON, verbatim.
   */
  document: { [key: string]: unknown };

  parentRevisionId: string | null;

  /**
   * One-line story of the change.
   */
  summary: string | null;
}

export interface AgentConfigUpdateResponse {
  /**
   * A managed config for a code-first agent (LiveKit, Pipecat, or any stack using
   * the SDK): your agent fetches its tunable surface from Roark at session start.
   * Two channels: production for real traffic, staging for candidates under test.
   */
  data: AgentConfigUpdateResponse.Data;
}

export namespace AgentConfigUpdateResponse {
  /**
   * A managed config for a code-first agent (LiveKit, Pipecat, or any stack using
   * the SDK): your agent fetches its tunable surface from Roark at session start.
   * Two channels: production for real traffic, staging for candidates under test.
   */
  export interface Data {
    id: string;

    /**
     * The linked Roark agent, when one exists.
     */
    agentId: string | null;

    /**
     * ISO 8601.
     */
    createdAt: string;

    /**
     * The stable handle your code fetches by.
     */
    key: string;

    /**
     * The revision real traffic reads.
     */
    productionRevisionId: string | null;

    /**
     * The candidate revision Roark test calls read. Null when nothing is staged.
     */
    stagingRevisionId: string | null;

    /**
     * ISO 8601.
     */
    updatedAt: string;
  }
}

export interface AgentConfigListResponse {
  data: Array<AgentConfigListResponse.Data>;
}

export namespace AgentConfigListResponse {
  /**
   * A managed config for a code-first agent (LiveKit, Pipecat, or any stack using
   * the SDK): your agent fetches its tunable surface from Roark at session start.
   * Two channels: production for real traffic, staging for candidates under test.
   */
  export interface Data {
    id: string;

    /**
     * The linked Roark agent, when one exists.
     */
    agentId: string | null;

    /**
     * ISO 8601.
     */
    createdAt: string;

    /**
     * The stable handle your code fetches by.
     */
    key: string;

    /**
     * The revision real traffic reads.
     */
    productionRevisionId: string | null;

    /**
     * The candidate revision Roark test calls read. Null when nothing is staged.
     */
    stagingRevisionId: string | null;

    /**
     * ISO 8601.
     */
    updatedAt: string;
  }
}

export interface AgentConfigDeleteStagingResponse {
  /**
   * A managed config for a code-first agent (LiveKit, Pipecat, or any stack using
   * the SDK): your agent fetches its tunable surface from Roark at session start.
   * Two channels: production for real traffic, staging for candidates under test.
   */
  data: AgentConfigDeleteStagingResponse.Data;
}

export namespace AgentConfigDeleteStagingResponse {
  /**
   * A managed config for a code-first agent (LiveKit, Pipecat, or any stack using
   * the SDK): your agent fetches its tunable surface from Roark at session start.
   * Two channels: production for real traffic, staging for candidates under test.
   */
  export interface Data {
    id: string;

    /**
     * The linked Roark agent, when one exists.
     */
    agentId: string | null;

    /**
     * ISO 8601.
     */
    createdAt: string;

    /**
     * The stable handle your code fetches by.
     */
    key: string;

    /**
     * The revision real traffic reads.
     */
    productionRevisionId: string | null;

    /**
     * The candidate revision Roark test calls read. Null when nothing is staged.
     */
    stagingRevisionId: string | null;

    /**
     * ISO 8601.
     */
    updatedAt: string;
  }
}

export interface AgentConfigGetByIDResponse {
  data: AgentConfigGetByIDResponse.Data;
}

export namespace AgentConfigGetByIDResponse {
  /**
   * A managed config for a code-first agent (LiveKit, Pipecat, or any stack using
   * the SDK): your agent fetches its tunable surface from Roark at session start.
   * Two channels: production for real traffic, staging for candidates under test.
   */
  export interface Data {
    id: string;

    /**
     * The linked Roark agent, when one exists.
     */
    agentId: string | null;

    /**
     * ISO 8601.
     */
    createdAt: string;

    /**
     * The stable handle your code fetches by.
     */
    key: string;

    /**
     * The revision real traffic reads.
     */
    productionRevisionId: string | null;

    /**
     * Recent revisions, newest first.
     */
    revisions: Array<AgentConfigAPI.ManagedAgentConfigRevision>;

    /**
     * The candidate revision Roark test calls read. Null when nothing is staged.
     */
    stagingRevisionId: string | null;

    /**
     * ISO 8601.
     */
    updatedAt: string;
  }
}

export interface AgentConfigPromoteResponse {
  /**
   * A managed config for a code-first agent (LiveKit, Pipecat, or any stack using
   * the SDK): your agent fetches its tunable surface from Roark at session start.
   * Two channels: production for real traffic, staging for candidates under test.
   */
  data: AgentConfigPromoteResponse.Data;
}

export namespace AgentConfigPromoteResponse {
  /**
   * A managed config for a code-first agent (LiveKit, Pipecat, or any stack using
   * the SDK): your agent fetches its tunable surface from Roark at session start.
   * Two channels: production for real traffic, staging for candidates under test.
   */
  export interface Data {
    id: string;

    /**
     * The linked Roark agent, when one exists.
     */
    agentId: string | null;

    /**
     * ISO 8601.
     */
    createdAt: string;

    /**
     * The stable handle your code fetches by.
     */
    key: string;

    /**
     * The revision real traffic reads.
     */
    productionRevisionId: string | null;

    /**
     * The candidate revision Roark test calls read. Null when nothing is staged.
     */
    stagingRevisionId: string | null;

    /**
     * ISO 8601.
     */
    updatedAt: string;
  }
}

export interface AgentConfigResolveResponse {
  data: AgentConfigResolveResponse.Data;
}

export namespace AgentConfigResolveResponse {
  export interface Data {
    /**
     * Which channel this session resolved to.
     */
    channel: 'production' | 'staging';

    /**
     * The config JSON to apply.
     */
    document: { [key: string]: unknown };

    key: string;

    revisionId: string;

    /**
     * Set when this session is a Roark simulation call. Stamp it (and the revisionId)
     * into your session metadata so analysis attributes the call correctly.
     */
    simulationJobId: string | null;
  }
}

export interface AgentConfigUpdateParams {
  /**
   * Which channel to write.
   */
  channel: 'production' | 'staging';

  /**
   * The full config JSON for the new revision.
   */
  document: { [key: string]: unknown };

  /**
   * Link this config to a Roark agent (the one your calls report). Required before
   * Autoimprove can run on it: the link is how a fix finds the config channel.
   */
  agentId?: string;

  /**
   * One-line story of the change.
   */
  summary?: string;
}

export interface AgentConfigResolveParams {
  /**
   * Your baked-in config. On the first fetch of an unknown key this registers the
   * config and becomes revision 1, so integration is a single call. Ignored once the
   * key exists.
   */
  defaults?: { [key: string]: unknown };

  /**
   * Session context. When the call was originated by a Roark simulation, Roark
   * recognizes it here and serves the staging revision for this session only; real
   * traffic always gets production.
   */
  session?: AgentConfigResolveParams.Session;
}

export namespace AgentConfigResolveParams {
  /**
   * Session context. When the call was originated by a Roark simulation, Roark
   * recognizes it here and serves the staging revision for this session only; real
   * traffic always gets production.
   */
  export interface Session {
    /**
     * The number your agent was reached on (E.164).
     */
    calledNumber?: string;

    /**
     * The number calling your agent (E.164). Required for simulation recognition.
     */
    callerNumber?: string;

    /**
     * Your session or room identifier, for correlation.
     */
    sessionId?: string;
  }
}

export declare namespace AgentConfig {
  export {
    type ManagedAgentConfigRevision as ManagedAgentConfigRevision,
    type AgentConfigUpdateResponse as AgentConfigUpdateResponse,
    type AgentConfigListResponse as AgentConfigListResponse,
    type AgentConfigDeleteStagingResponse as AgentConfigDeleteStagingResponse,
    type AgentConfigGetByIDResponse as AgentConfigGetByIDResponse,
    type AgentConfigPromoteResponse as AgentConfigPromoteResponse,
    type AgentConfigResolveResponse as AgentConfigResolveResponse,
    type AgentConfigUpdateParams as AgentConfigUpdateParams,
    type AgentConfigResolveParams as AgentConfigResolveParams,
  };
}
