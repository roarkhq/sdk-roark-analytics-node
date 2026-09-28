// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Me extends APIResource {
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

export declare namespace Me {
  export { type MeGetResponse as MeGetResponse };
}
