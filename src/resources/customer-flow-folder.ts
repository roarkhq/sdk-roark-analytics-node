// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class CustomerFlowFolder extends APIResource {
  /**
   * Creates a folder to group customer flows. File a flow into it by sending its
   * `folderId` when you create or update the flow. Names are unique within a
   * project, ignoring case. Customer flows were previously called scenarios.
   *
   * @example
   * ```ts
   * const customerFlowFolder =
   *   await client.customerFlowFolder.create({ name: 'x' });
   * ```
   */
  create(
    body: CustomerFlowFolderCreateParams,
    options?: RequestOptions,
  ): APIPromise<CustomerFlowFolderCreateResponse> {
    return this._client.post('/v1/customer-flow/folder', { body, ...options });
  }

  /**
   * Returns every folder the project groups its customer flows into, with how many
   * flows each holds, in the order the app shows them. Filter the flow list to one
   * folder with `GET /v1/customer-flow?folderId=`. Customer flows were previously
   * called scenarios.
   *
   * @example
   * ```ts
   * const customerFlowFolders =
   *   await client.customerFlowFolder.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<CustomerFlowFolderListResponse> {
    return this._client.get('/v1/customer-flow/folder', options);
  }

  /**
   * Deletes a folder. The flows in it are kept and no longer sit in any folder.
   * Built-in folders cannot be deleted.
   *
   * @example
   * ```ts
   * const customerFlowFolder =
   *   await client.customerFlowFolder.delete(
   *     '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
   *   );
   * ```
   */
  delete(folderID: string, options?: RequestOptions): APIPromise<CustomerFlowFolderDeleteResponse> {
    return this._client.delete(path`/v1/customer-flow/folder/${folderID}`, options);
  }
}

export interface CustomerFlowFolderCreateResponse {
  /**
   * A folder that groups customer flows. A flow sits in at most one folder.
   */
  data: CustomerFlowFolderCreateResponse.Data;
}

export namespace CustomerFlowFolderCreateResponse {
  /**
   * A folder that groups customer flows. A flow sits in at most one folder.
   */
  export interface Data {
    id: string;

    /**
     * Whether Roark curates this folder. Built-in folders cannot be deleted or have
     * your flows filed in them.
     */
    builtIn: boolean;

    /**
     * The color the folder is shown with in the app. Folders share the palette labels
     * use.
     */
    color:
      | 'GREEN'
      | 'RED'
      | 'ORANGE'
      | 'PURPLE'
      | 'GREY'
      | 'BLUE'
      | 'PEACH'
      | 'TEAL'
      | 'INDIGO'
      | 'AMBER'
      | 'ROSE'
      | 'CYAN';

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * What belongs in this folder.
     */
    description: string | null;

    /**
     * The folder name, unique within the project.
     */
    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }
}

/**
 * The project's customer flow folders, in the order the app shows them.
 */
export interface CustomerFlowFolderListResponse {
  data: Array<CustomerFlowFolderListResponse.Data>;
}

export namespace CustomerFlowFolderListResponse {
  /**
   * A folder that groups customer flows. A flow sits in at most one folder.
   */
  export interface Data {
    id: string;

    /**
     * Whether Roark curates this folder. Built-in folders cannot be deleted or have
     * your flows filed in them.
     */
    builtIn: boolean;

    /**
     * The color the folder is shown with in the app. Folders share the palette labels
     * use.
     */
    color:
      | 'GREEN'
      | 'RED'
      | 'ORANGE'
      | 'PURPLE'
      | 'GREY'
      | 'BLUE'
      | 'PEACH'
      | 'TEAL'
      | 'INDIGO'
      | 'AMBER'
      | 'ROSE'
      | 'CYAN';

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * What belongs in this folder.
     */
    description: string | null;

    /**
     * How many flows are in this folder.
     */
    flowCount: number;

    /**
     * The folder name, unique within the project.
     */
    name: string;

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }
}

export interface CustomerFlowFolderDeleteResponse {
  data: CustomerFlowFolderDeleteResponse.Data;
}

export namespace CustomerFlowFolderDeleteResponse {
  export interface Data {
    /**
     * Whether the folder was deleted
     */
    deleted: boolean;
  }
}

export interface CustomerFlowFolderCreateParams {
  /**
   * The folder name. Must be unique in the project.
   */
  name: string;

  /**
   * The color the folder is shown with in the app. Folders share the palette labels
   * use. Defaults to GREY.
   */
  color?:
    | 'GREEN'
    | 'RED'
    | 'ORANGE'
    | 'PURPLE'
    | 'GREY'
    | 'BLUE'
    | 'PEACH'
    | 'TEAL'
    | 'INDIGO'
    | 'AMBER'
    | 'ROSE'
    | 'CYAN';

  /**
   * What belongs in this folder.
   */
  description?: string | null;
}

export declare namespace CustomerFlowFolder {
  export {
    type CustomerFlowFolderCreateResponse as CustomerFlowFolderCreateResponse,
    type CustomerFlowFolderListResponse as CustomerFlowFolderListResponse,
    type CustomerFlowFolderDeleteResponse as CustomerFlowFolderDeleteResponse,
    type CustomerFlowFolderCreateParams as CustomerFlowFolderCreateParams,
  };
}
