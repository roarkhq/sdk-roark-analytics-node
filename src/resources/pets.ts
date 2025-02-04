// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Pets extends APIResource {
  /**
   * Add a new pet to the store
   */
  create(body: PetCreateParams, options?: RequestOptions): APIPromise<Pet> {
    return this._client.post('/pet', { body, ...options });
  }

  /**
   * Returns a single pet
   */
  retrieve(petID: number, options?: RequestOptions): APIPromise<Pet> {
    return this._client.get(`/pet/${petID}`, options);
  }

  /**
   * Update an existing pet by Id
   */
  update(body: PetUpdateParams, options?: RequestOptions): APIPromise<Pet> {
    return this._client.put('/pet', { body, ...options });
  }

  /**
   * delete a pet
   */
  delete(petID: number, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(`/pet/${petID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Multiple status values can be provided with comma separated strings
   */
  findByStatus(
    query: PetFindByStatusParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PetFindByStatusResponse> {
    return this._client.get('/pet/findByStatus', { query, ...options });
  }

  /**
   * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3
   * for testing.
   */
  findByTags(
    query: PetFindByTagsParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PetFindByTagsResponse> {
    return this._client.get('/pet/findByTags', { query, ...options });
  }

  /**
   * Updates a pet in the store with form data
   */
  updateByID(
    petID: number,
    params: PetUpdateByIDParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<void> {
    const { name, status } = params ?? {};
    return this._client.post(`/pet/${petID}`, {
      query: { name, status },
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * uploads an image
   */
  uploadImage(
    petID: number,
    params: PetUploadImageParams,
    options?: RequestOptions,
  ): APIPromise<APIResponse> {
    const { image, additionalMetadata } = params;
    return this._client.post(`/pet/${petID}/uploadImage`, {
      query: { additionalMetadata },
      body: image,
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/octet-stream' }, options?.headers]),
    });
  }
}

export interface APIResponse {
  code?: number;

  message?: string;

  type?: string;
}

export interface Pet {
  name: string;

  photoUrls: Array<string>;

  id?: number;

  category?: Pet.Category;

  /**
   * pet status in the store
   */
  status?: 'available' | 'pending' | 'sold';

  tags?: Array<Pet.Tag>;
}

export namespace Pet {
  export interface Category {
    id?: number;

    name?: string;
  }

  export interface Tag {
    id?: number;

    name?: string;
  }
}

export type PetFindByStatusResponse = Array<Pet>;

export type PetFindByTagsResponse = Array<Pet>;

export interface PetCreateParams {
  name: string;

  photoUrls: Array<string>;

  id?: number;

  category?: PetCreateParams.Category;

  /**
   * pet status in the store
   */
  status?: 'available' | 'pending' | 'sold';

  tags?: Array<PetCreateParams.Tag>;
}

export namespace PetCreateParams {
  export interface Category {
    id?: number;

    name?: string;
  }

  export interface Tag {
    id?: number;

    name?: string;
  }
}

export interface PetUpdateParams {
  name: string;

  photoUrls: Array<string>;

  id?: number;

  category?: PetUpdateParams.Category;

  /**
   * pet status in the store
   */
  status?: 'available' | 'pending' | 'sold';

  tags?: Array<PetUpdateParams.Tag>;
}

export namespace PetUpdateParams {
  export interface Category {
    id?: number;

    name?: string;
  }

  export interface Tag {
    id?: number;

    name?: string;
  }
}

export interface PetFindByStatusParams {
  /**
   * Status values that need to be considered for filter
   */
  status?: 'available' | 'pending' | 'sold';
}

export interface PetFindByTagsParams {
  /**
   * Tags to filter by
   */
  tags?: Array<string>;
}

export interface PetUpdateByIDParams {
  /**
   * Name of pet that needs to be updated
   */
  name?: string;

  /**
   * Status of pet that needs to be updated
   */
  status?: string;
}

export interface PetUploadImageParams {
  /**
   * Body param:
   */
  image: string | ArrayBuffer | ArrayBufferView | Blob | DataView;

  /**
   * Query param: Additional Metadata
   */
  additionalMetadata?: string;
}

export declare namespace Pets {
  export {
    type APIResponse as APIResponse,
    type Pet as Pet,
    type PetFindByStatusResponse as PetFindByStatusResponse,
    type PetFindByTagsResponse as PetFindByTagsResponse,
    type PetCreateParams as PetCreateParams,
    type PetUpdateParams as PetUpdateParams,
    type PetFindByStatusParams as PetFindByStatusParams,
    type PetFindByTagsParams as PetFindByTagsParams,
    type PetUpdateByIDParams as PetUpdateByIDParams,
    type PetUploadImageParams as PetUploadImageParams,
  };
}
