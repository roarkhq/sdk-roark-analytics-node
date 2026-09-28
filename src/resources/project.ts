// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Project extends APIResource {
  /**
   * Returns every project the calling credential may act on, with the permissions it
   * holds in each. A project-scoped API key returns the single project it is bound
   * to. A user-scoped credential returns the projects in its organization where the
   * holder is an active member. Use the returned id in the X-Roark-Project-Id
   * header.
   *
   * @example
   * ```ts
   * const projects = await client.project.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<ProjectListResponse> {
    return this._client.get('/v1/projects', options);
  }
}

export interface ProjectListResponse {
  /**
   * Projects this credential may act on
   */
  data: ProjectListResponse.Data;
}

export namespace ProjectListResponse {
  /**
   * Projects this credential may act on
   */
  export interface Data {
    projects: Array<Data.Project>;
  }

  export namespace Data {
    export interface Project {
      id: string;

      grantedPermissions: Array<string>;

      name: string;

      organization: Project.Organization;

      slug: string;
    }

    export namespace Project {
      export interface Organization {
        id: string;

        name: string;
      }
    }
  }
}

export declare namespace Project {
  export { type ProjectListResponse as ProjectListResponse };
}
