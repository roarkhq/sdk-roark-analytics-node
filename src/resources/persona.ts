// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class Persona extends APIResource {
  /**
   * Creates a new persona for the authenticated project.
   *
   * @example
   * ```ts
   * const persona = await client.persona.create({
   *   accent: 'US',
   *   backgroundNoise: 'NONE',
   *   baseEmotion: 'NEUTRAL',
   *   confirmationStyle: 'EXPLICIT',
   *   gender: 'MALE',
   *   hasDisfluencies: false,
   *   intentClarity: 'CLEAR',
   *   language: 'EN',
   *   memoryReliability: 'HIGH',
   *   name: 'Alex Morgan',
   *   speechClarity: 'CLEAR',
   *   speechPace: 'NORMAL',
   * });
   * ```
   */
  create(body: PersonaCreateParams, options?: Core.RequestOptions): Core.APIPromise<PersonaCreateResponse> {
    return this._client.post('/v1/persona', { body, ...options });
  }

  /**
   * Updates an existing persona by its ID.
   *
   * @example
   * ```ts
   * const persona = await client.persona.update('personaId', {
   *   accent: 'US',
   *   backgroundNoise: 'NONE',
   *   baseEmotion: 'NEUTRAL',
   *   confirmationStyle: 'EXPLICIT',
   *   gender: 'MALE',
   *   hasDisfluencies: false,
   *   intentClarity: 'CLEAR',
   *   language: 'EN',
   *   memoryReliability: 'HIGH',
   *   name: 'Alex Morgan',
   *   speechClarity: 'CLEAR',
   *   speechPace: 'NORMAL',
   * });
   * ```
   */
  update(
    personaId: string,
    body: PersonaUpdateParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PersonaUpdateResponse> {
    return this._client.put(`/v1/persona/${personaId}`, { body, ...options });
  }

  /**
   * Returns a paginated list of personas for the authenticated project.
   *
   * @example
   * ```ts
   * const response = await client.persona.findAll();
   * ```
   */
  findAll(
    query?: PersonaFindAllParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<PersonaFindAllResponse>;
  findAll(options?: Core.RequestOptions): Core.APIPromise<PersonaFindAllResponse>;
  findAll(
    query: PersonaFindAllParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<PersonaFindAllResponse> {
    if (isRequestOptions(query)) {
      return this.findAll({}, query);
    }
    return this._client.get('/v1/persona', { query, ...options });
  }

  /**
   * Returns a specific persona by its ID.
   *
   * @example
   * ```ts
   * const response = await client.persona.getById('personaId');
   * ```
   */
  getById(personaId: string, options?: Core.RequestOptions): Core.APIPromise<PersonaGetByIDResponse> {
    return this._client.get(`/v1/persona/${personaId}`, options);
  }
}

export interface PersonaCreateResponse {
  data: PersonaCreateResponse.Data;
}

export namespace PersonaCreateResponse {
  export interface Data {
    /**
     * Unique identifier of the persona
     */
    id: string;

    /**
     * Accent of the persona
     */
    accent: 'US' | 'US_X_SOUTH' | 'GB' | 'ES' | 'DE' | 'IN' | 'FR' | 'NL' | 'SA' | 'GR' | 'AU';

    /**
     * Background noise setting
     */
    backgroundNoise: 'NONE' | 'OFFICE';

    /**
     * Base emotional state of the persona
     */
    baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED';

    /**
     * How the persona confirms information
     */
    confirmationStyle: 'EXPLICIT' | 'VAGUE';

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Gender of the persona
     */
    gender: 'MALE' | 'FEMALE' | 'NEUTRAL';

    /**
     * Whether the persona uses filler words like "um" and "uh"
     */
    hasDisfluencies: boolean;

    /**
     * How clearly the persona expresses their intentions
     */
    intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

    /**
     * Primary language for the persona
     */
    language: 'EN' | 'ES' | 'DE' | 'HI' | 'FR' | 'NL' | 'AR' | 'EL';

    /**
     * How reliable the persona's memory is
     */
    memoryReliability: 'HIGH' | 'LOW';

    /**
     * The name the agent will identify as during conversations
     */
    name: string;

    /**
     * Speech clarity of the persona
     */
    speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

    /**
     * Speech pace of the persona
     */
    speechPace: 'SLOW' | 'NORMAL' | 'FAST';

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * Background story and behavioral patterns for the persona
     */
    backstoryPrompt?: string | null;

    /**
     * Additional custom properties about the persona
     */
    properties?: { [key: string]: unknown };

    /**
     * Secondary language for code-switching (e.g., Hinglish, Spanglish)
     */
    secondaryLanguage?: 'EN' | null;
  }
}

export interface PersonaUpdateResponse {
  data: PersonaUpdateResponse.Data;
}

export namespace PersonaUpdateResponse {
  export interface Data {
    /**
     * Unique identifier of the persona
     */
    id: string;

    /**
     * Accent of the persona
     */
    accent: 'US' | 'US_X_SOUTH' | 'GB' | 'ES' | 'DE' | 'IN' | 'FR' | 'NL' | 'SA' | 'GR' | 'AU';

    /**
     * Background noise setting
     */
    backgroundNoise: 'NONE' | 'OFFICE';

    /**
     * Base emotional state of the persona
     */
    baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED';

    /**
     * How the persona confirms information
     */
    confirmationStyle: 'EXPLICIT' | 'VAGUE';

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Gender of the persona
     */
    gender: 'MALE' | 'FEMALE' | 'NEUTRAL';

    /**
     * Whether the persona uses filler words like "um" and "uh"
     */
    hasDisfluencies: boolean;

    /**
     * How clearly the persona expresses their intentions
     */
    intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

    /**
     * Primary language for the persona
     */
    language: 'EN' | 'ES' | 'DE' | 'HI' | 'FR' | 'NL' | 'AR' | 'EL';

    /**
     * How reliable the persona's memory is
     */
    memoryReliability: 'HIGH' | 'LOW';

    /**
     * The name the agent will identify as during conversations
     */
    name: string;

    /**
     * Speech clarity of the persona
     */
    speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

    /**
     * Speech pace of the persona
     */
    speechPace: 'SLOW' | 'NORMAL' | 'FAST';

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * Background story and behavioral patterns for the persona
     */
    backstoryPrompt?: string | null;

    /**
     * Additional custom properties about the persona
     */
    properties?: { [key: string]: unknown };

    /**
     * Secondary language for code-switching (e.g., Hinglish, Spanglish)
     */
    secondaryLanguage?: 'EN' | null;
  }
}

export interface PersonaFindAllResponse {
  data: Array<PersonaFindAllResponse.Data>;

  pagination: PersonaFindAllResponse.Pagination;
}

export namespace PersonaFindAllResponse {
  export interface Data {
    /**
     * Unique identifier of the persona
     */
    id: string;

    /**
     * Accent of the persona
     */
    accent: 'US' | 'US_X_SOUTH' | 'GB' | 'ES' | 'DE' | 'IN' | 'FR' | 'NL' | 'SA' | 'GR' | 'AU';

    /**
     * Background noise setting
     */
    backgroundNoise: 'NONE' | 'OFFICE';

    /**
     * Base emotional state of the persona
     */
    baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED';

    /**
     * How the persona confirms information
     */
    confirmationStyle: 'EXPLICIT' | 'VAGUE';

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Gender of the persona
     */
    gender: 'MALE' | 'FEMALE' | 'NEUTRAL';

    /**
     * Whether the persona uses filler words like "um" and "uh"
     */
    hasDisfluencies: boolean;

    /**
     * How clearly the persona expresses their intentions
     */
    intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

    /**
     * Primary language for the persona
     */
    language: 'EN' | 'ES' | 'DE' | 'HI' | 'FR' | 'NL' | 'AR' | 'EL';

    /**
     * How reliable the persona's memory is
     */
    memoryReliability: 'HIGH' | 'LOW';

    /**
     * The name the agent will identify as during conversations
     */
    name: string;

    /**
     * Speech clarity of the persona
     */
    speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

    /**
     * Speech pace of the persona
     */
    speechPace: 'SLOW' | 'NORMAL' | 'FAST';

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * Background story and behavioral patterns for the persona
     */
    backstoryPrompt?: string | null;

    /**
     * Additional custom properties about the persona
     */
    properties?: { [key: string]: unknown };

    /**
     * Secondary language for code-switching (e.g., Hinglish, Spanglish)
     */
    secondaryLanguage?: 'EN' | null;
  }

  export interface Pagination {
    /**
     * Whether there are more items to fetch
     */
    hasMore: boolean;

    /**
     * Cursor for the next page of items
     */
    nextCursor: string | null;

    /**
     * Total number of items
     */
    total: number;
  }
}

export interface PersonaGetByIDResponse {
  data: PersonaGetByIDResponse.Data;
}

export namespace PersonaGetByIDResponse {
  export interface Data {
    /**
     * Unique identifier of the persona
     */
    id: string;

    /**
     * Accent of the persona
     */
    accent: 'US' | 'US_X_SOUTH' | 'GB' | 'ES' | 'DE' | 'IN' | 'FR' | 'NL' | 'SA' | 'GR' | 'AU';

    /**
     * Background noise setting
     */
    backgroundNoise: 'NONE' | 'OFFICE';

    /**
     * Base emotional state of the persona
     */
    baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED';

    /**
     * How the persona confirms information
     */
    confirmationStyle: 'EXPLICIT' | 'VAGUE';

    /**
     * Creation timestamp
     */
    createdAt: string;

    /**
     * Gender of the persona
     */
    gender: 'MALE' | 'FEMALE' | 'NEUTRAL';

    /**
     * Whether the persona uses filler words like "um" and "uh"
     */
    hasDisfluencies: boolean;

    /**
     * How clearly the persona expresses their intentions
     */
    intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

    /**
     * Primary language for the persona
     */
    language: 'EN' | 'ES' | 'DE' | 'HI' | 'FR' | 'NL' | 'AR' | 'EL';

    /**
     * How reliable the persona's memory is
     */
    memoryReliability: 'HIGH' | 'LOW';

    /**
     * The name the agent will identify as during conversations
     */
    name: string;

    /**
     * Speech clarity of the persona
     */
    speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

    /**
     * Speech pace of the persona
     */
    speechPace: 'SLOW' | 'NORMAL' | 'FAST';

    /**
     * Last update timestamp
     */
    updatedAt: string;

    /**
     * Background story and behavioral patterns for the persona
     */
    backstoryPrompt?: string | null;

    /**
     * Additional custom properties about the persona
     */
    properties?: { [key: string]: unknown };

    /**
     * Secondary language for code-switching (e.g., Hinglish, Spanglish)
     */
    secondaryLanguage?: 'EN' | null;
  }
}

export interface PersonaCreateParams {
  /**
   * Accent of the persona
   */
  accent: 'US' | 'US_X_SOUTH' | 'GB' | 'ES' | 'DE' | 'IN' | 'FR' | 'NL' | 'SA' | 'GR' | 'AU';

  /**
   * Background noise setting
   */
  backgroundNoise: 'NONE' | 'OFFICE';

  /**
   * Base emotional state of the persona
   */
  baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED';

  /**
   * How the persona confirms information
   */
  confirmationStyle: 'EXPLICIT' | 'VAGUE';

  /**
   * Gender of the persona
   */
  gender: 'MALE' | 'FEMALE' | 'NEUTRAL';

  /**
   * Whether the persona uses filler words like "um" and "uh"
   */
  hasDisfluencies: boolean;

  /**
   * How clearly the persona expresses their intentions
   */
  intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

  /**
   * Primary language for the persona
   */
  language: 'EN' | 'ES' | 'DE' | 'HI' | 'FR' | 'NL' | 'AR' | 'EL';

  /**
   * How reliable the persona's memory is
   */
  memoryReliability: 'HIGH' | 'LOW';

  /**
   * The name the agent will identify as during conversations
   */
  name: string;

  /**
   * Speech clarity of the persona
   */
  speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

  /**
   * Speech pace of the persona
   */
  speechPace: 'SLOW' | 'NORMAL' | 'FAST';

  /**
   * Background story and behavioral patterns for the persona
   */
  backstoryPrompt?: string | null;

  /**
   * Additional custom properties about the persona
   */
  properties?: { [key: string]: unknown };

  /**
   * Secondary language for code-switching (e.g., Hinglish, Spanglish)
   */
  secondaryLanguage?: 'EN' | null;
}

export interface PersonaUpdateParams {
  /**
   * Accent of the persona
   */
  accent: 'US' | 'US_X_SOUTH' | 'GB' | 'ES' | 'DE' | 'IN' | 'FR' | 'NL' | 'SA' | 'GR' | 'AU';

  /**
   * Background noise setting
   */
  backgroundNoise: 'NONE' | 'OFFICE';

  /**
   * Base emotional state of the persona
   */
  baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED';

  /**
   * How the persona confirms information
   */
  confirmationStyle: 'EXPLICIT' | 'VAGUE';

  /**
   * Gender of the persona
   */
  gender: 'MALE' | 'FEMALE' | 'NEUTRAL';

  /**
   * Whether the persona uses filler words like "um" and "uh"
   */
  hasDisfluencies: boolean;

  /**
   * How clearly the persona expresses their intentions
   */
  intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE';

  /**
   * Primary language for the persona
   */
  language: 'EN' | 'ES' | 'DE' | 'HI' | 'FR' | 'NL' | 'AR' | 'EL';

  /**
   * How reliable the persona's memory is
   */
  memoryReliability: 'HIGH' | 'LOW';

  /**
   * The name the agent will identify as during conversations
   */
  name: string;

  /**
   * Speech clarity of the persona
   */
  speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING';

  /**
   * Speech pace of the persona
   */
  speechPace: 'SLOW' | 'NORMAL' | 'FAST';

  /**
   * Background story and behavioral patterns for the persona
   */
  backstoryPrompt?: string | null;

  /**
   * Additional custom properties about the persona
   */
  properties?: { [key: string]: unknown };

  /**
   * Secondary language for code-switching (e.g., Hinglish, Spanglish)
   */
  secondaryLanguage?: 'EN' | null;
}

export interface PersonaFindAllParams {
  after?: string;

  limit?: number;

  searchText?: string;
}

export declare namespace Persona {
  export {
    type PersonaCreateResponse as PersonaCreateResponse,
    type PersonaUpdateResponse as PersonaUpdateResponse,
    type PersonaFindAllResponse as PersonaFindAllResponse,
    type PersonaGetByIDResponse as PersonaGetByIDResponse,
    type PersonaCreateParams as PersonaCreateParams,
    type PersonaUpdateParams as PersonaUpdateParams,
    type PersonaFindAllParams as PersonaFindAllParams,
  };
}
