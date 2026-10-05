// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Me extends APIResource {
  /**
   * Mints a credential that acts as you, for a CLI or an automation. The key value
   * is returned exactly once, in the `key` field: capture it now, it is unreadable
   * afterwards. Requires a personal credential (a project API key is refused) and
   * admin on the project the credential defaults to. The new credential can never
   * exceed the one that created it: not in scope, not in permissions, and not in
   * lifetime. Omit a field to copy it from the calling credential.
   *
   * @example
   * ```ts
   * const response = await client.me.createAPIKey({
   *   name: 'CI deploy gate',
   * });
   * ```
   */
  createAPIKey(body: MeCreateAPIKeyParams, options?: RequestOptions): APIPromise<MeCreateAPIKeyResponse> {
    return this._client.post('/v1/me/api-keys', { body, ...options });
  }

  /**
   * Returns the scope of the credential making the request, the organization it acts
   * in, its default project (if any) and the permissions it was granted. Works for
   * both project-scoped API keys and user-scoped credentials from the CLI or an MCP
   * connector.
   *
   * @example
   * ```ts
   * const me = await client.me.get();
   * ```
   */
  get(options?: RequestOptions): APIPromise<MeGetResponse> {
    return this._client.get('/v1/me', options);
  }

  /**
   * Returns the credentials that act as you: the ones created in the dashboard, from
   * `roark auth login`, and MCP connectors. Requires a personal credential; a
   * project API key is refused. Defaults to ACTIVE, pass ?status=REVOKED to see
   * revoked ones. The key value itself is never returned.
   *
   * @example
   * ```ts
   * const response = await client.me.listAPIKeys();
   * ```
   */
  listAPIKeys(
    query: MeListAPIKeysParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<MeListAPIKeysResponse> {
    return this._client.get('/v1/me/api-keys', { query, ...options });
  }

  /**
   * Revokes a credential that acts as you. It stops working immediately. A
   * credential may revoke itself, which is what `roark auth logout` does. Repeating
   * the call is safe; an unknown id, or one belonging to someone else, answers 404.
   *
   * @example
   * ```ts
   * const response = await client.me.revokeAPIKey('id');
   * ```
   */
  revokeAPIKey(id: string, options?: RequestOptions): APIPromise<MeRevokeAPIKeyResponse> {
    return this._client.delete(path`/v1/me/api-keys/${id}`, options);
  }
}

export interface MeCreateAPIKeyResponse {
  /**
   * The created credential, with its key
   */
  data: MeCreateAPIKeyResponse.Data;
}

export namespace MeCreateAPIKeyResponse {
  /**
   * The created credential, with its key
   */
  export interface Data {
    /**
     * Roark ID of the credential. Pass it to DELETE to revoke.
     */
    id: string;

    /**
     * ISO 8601 timestamp
     */
    createdAt: string;

    /**
     * The project a request acts on when it sends no X-Roark-Project-Id header. Null
     * once that project is deleted.
     */
    defaultProjectId: string | null;

    /**
     * ISO 8601 timestamp, null if it never expires
     */
    expiresAt: string | null;

    /**
     * The credential value. Returned only here, only once.
     */
    key: string;

    /**
     * ISO 8601 timestamp, null if never used
     */
    lastUsedAt: string | null;

    /**
     * The label chosen when it was created
     */
    name: string;

    /**
     * The organization this credential is pinned to
     */
    organizationId: string | null;

    /**
     * Granted 'resource:action' permissions
     */
    permissions: Array<string>;

    /**
     * Coarse tier: READ, or WRITE for read and write
     */
    scopes: Array<string>;

    status: 'ACTIVE' | 'REVOKED' | null;
  }
}

export interface MeGetResponse {
  /**
   * The credential making this request, and what it is bound to
   */
  data: MeGetResponse.Data;
}

export namespace MeGetResponse {
  /**
   * The credential making this request, and what it is bound to
   */
  export interface Data {
    defaultProject: Data.DefaultProject | null;

    grantedPermissions: Array<string>;

    organization: Data.Organization;

    scopes: Array<string>;

    tokenScope: 'PROJECT' | 'USER';

    user: Data.User | null;
  }

  export namespace Data {
    export interface DefaultProject {
      id: string;

      name: string;

      slug: string;
    }

    export interface Organization {
      id: string;

      name: string;
    }

    export interface User {
      id: string;

      email: string;

      name: string | null;
    }
  }
}

export interface MeListAPIKeysResponse {
  /**
   * The credentials that act as the caller
   */
  data: MeListAPIKeysResponse.Data;
}

export namespace MeListAPIKeysResponse {
  /**
   * The credentials that act as the caller
   */
  export interface Data {
    apiKeys: Array<Data.APIKey>;
  }

  export namespace Data {
    /**
     * A credential that acts as the caller
     */
    export interface APIKey {
      /**
       * Roark ID of the credential. Pass it to DELETE to revoke.
       */
      id: string;

      /**
       * ISO 8601 timestamp
       */
      createdAt: string;

      /**
       * The project a request acts on when it sends no X-Roark-Project-Id header. Null
       * once that project is deleted.
       */
      defaultProjectId: string | null;

      /**
       * ISO 8601 timestamp, null if it never expires
       */
      expiresAt: string | null;

      /**
       * ISO 8601 timestamp, null if never used
       */
      lastUsedAt: string | null;

      /**
       * The label chosen when it was created
       */
      name: string;

      /**
       * The organization this credential is pinned to
       */
      organizationId: string | null;

      /**
       * Granted 'resource:action' permissions
       */
      permissions: Array<string>;

      /**
       * Coarse tier: READ, or WRITE for read and write
       */
      scopes: Array<string>;

      status: 'ACTIVE' | 'REVOKED' | null;
    }
  }
}

export interface MeRevokeAPIKeyResponse {
  /**
   * Result of revoking one of your credentials
   */
  data: MeRevokeAPIKeyResponse.Data;
}

export namespace MeRevokeAPIKeyResponse {
  /**
   * Result of revoking one of your credentials
   */
  export interface Data {
    id: string;

    /**
     * Always true when the credential was revoked
     */
    deleted: true;
  }
}

export interface MeCreateAPIKeyParams {
  /**
   * A label you will recognise later. It is the only thing that tells two
   * credentials apart in the list you revoke from.
   */
  name: string;

  /**
   * ISO 8601 expiry. Defaults to the calling credential's own expiry (no expiry, for
   * a `roark auth login` credential) and may not outlive it, so a short-lived
   * connector credential cannot mint a permanent one.
   */
  expiresAt?: string;

  /**
   * Granular 'resource:action' permissions. Defaults to the calling credential's own
   * set, and can never exceed it. A ceiling, not an entitlement: the holder still
   * only reaches what their project membership allows.
   */
  permissions?: Array<string>;

  /**
   * Project the credential assumes when a request sends no X-Roark-Project-Id
   * header. Defaults to the calling credential's own default project. You must be an
   * admin of whichever project is used.
   */
  projectId?: string;

  /**
   * Coarse tier. Defaults to the calling credential's own tier, and can never exceed
   * it: a READ credential cannot mint a WRITE one.
   */
  scopes?: Array<'READ' | 'WRITE'>;
}

export interface MeListAPIKeysParams {
  /**
   * Filter by status. Defaults to ACTIVE.
   */
  status?: 'ACTIVE' | 'REVOKED';
}

export declare namespace Me {
  export {
    type MeCreateAPIKeyResponse as MeCreateAPIKeyResponse,
    type MeGetResponse as MeGetResponse,
    type MeListAPIKeysResponse as MeListAPIKeysResponse,
    type MeRevokeAPIKeyResponse as MeRevokeAPIKeyResponse,
    type MeCreateAPIKeyParams as MeCreateAPIKeyParams,
    type MeListAPIKeysParams as MeListAPIKeysParams,
  };
}
