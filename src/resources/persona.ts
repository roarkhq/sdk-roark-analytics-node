// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { APIPromise } from '../api-promise';
import { RequestOptions } from '../internal/request-options';

export class Persona extends APIResource {
  /**
   * Creates a new persona for the authenticated project.
   */
  create(body: PersonaCreateParams, options?: RequestOptions): APIPromise<PersonaCreateResponse> {
    return this._client.post('/v1/persona', { body, ...options });
  }

  /**
   * Updates an existing persona by its ID.
   */
  update(
    personaID: string,
    body: PersonaUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PersonaUpdateResponse> {
    return this._client.put(`/v1/persona/${personaID}`, { body, ...options });
  }

  /**
   * Returns a paginated list of personas for the authenticated project.
   */
  list(
    query: PersonaListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<PersonaListResponse> {
    return this._client.get('/v1/persona', { query, ...options });
  }

  /**
   * Returns a specific persona by its ID.
   */
  getByID(personaID: string, options?: RequestOptions): APIPromise<PersonaGetByIDResponse> {
    return this._client.get(`/v1/persona/${personaID}`, options);
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
     * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
     * optional variants
     */
    accent:
      | 'US'
      | 'US_X_SOUTH'
      | 'GB'
      | 'ES'
      | 'DE'
      | 'IN'
      | 'FR'
      | 'NL'
      | 'SA'
      | 'GR'
      | 'AU'
      | 'IT'
      | 'ID'
      | 'TH'
      | 'JP';

    /**
     * Background noise setting
     */
    backgroundNoise:
      | 'NONE'
      | 'AIRPORT'
      | 'CHILDREN_PLAYING'
      | 'CITY'
      | 'COFFEE_SHOP'
      | 'DRIVING'
      | 'OFFICE'
      | 'THUNDERSTORM';

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
     * Primary language ISO 639-1 code for the persona
     */
    language: 'EN' | 'ES' | 'DE' | 'HI' | 'FR' | 'NL' | 'AR' | 'EL' | 'IT' | 'ID' | 'TH' | 'JA';

    /**
     * How reliable the persona's memory is
     */
    memoryReliability: 'HIGH' | 'LOW';

    /**
     * The name the agent will identify as during conversations
     */
    name: string;

    /**
     * Additional custom properties about the persona
     */
    properties: Record<string, unknown>;

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
     * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
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
     * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
     * optional variants
     */
    accent:
      | 'US'
      | 'US_X_SOUTH'
      | 'GB'
      | 'ES'
      | 'DE'
      | 'IN'
      | 'FR'
      | 'NL'
      | 'SA'
      | 'GR'
      | 'AU'
      | 'IT'
      | 'ID'
      | 'TH'
      | 'JP';

    /**
     * Background noise setting
     */
    backgroundNoise:
      | 'NONE'
      | 'AIRPORT'
      | 'CHILDREN_PLAYING'
      | 'CITY'
      | 'COFFEE_SHOP'
      | 'DRIVING'
      | 'OFFICE'
      | 'THUNDERSTORM';

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
     * Primary language ISO 639-1 code for the persona
     */
    language: 'EN' | 'ES' | 'DE' | 'HI' | 'FR' | 'NL' | 'AR' | 'EL' | 'IT' | 'ID' | 'TH' | 'JA';

    /**
     * How reliable the persona's memory is
     */
    memoryReliability: 'HIGH' | 'LOW';

    /**
     * The name the agent will identify as during conversations
     */
    name: string;

    /**
     * Additional custom properties about the persona
     */
    properties: Record<string, unknown>;

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
     * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
     */
    secondaryLanguage?: 'EN' | null;
  }
}

export interface PersonaListResponse {
  data: Array<PersonaListResponse.Data>;

  pagination: PersonaListResponse.Pagination;
}

export namespace PersonaListResponse {
  export interface Data {
    /**
     * Unique identifier of the persona
     */
    id: string;

    /**
     * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
     * optional variants
     */
    accent:
      | 'US'
      | 'US_X_SOUTH'
      | 'GB'
      | 'ES'
      | 'DE'
      | 'IN'
      | 'FR'
      | 'NL'
      | 'SA'
      | 'GR'
      | 'AU'
      | 'IT'
      | 'ID'
      | 'TH'
      | 'JP';

    /**
     * Background noise setting
     */
    backgroundNoise:
      | 'NONE'
      | 'AIRPORT'
      | 'CHILDREN_PLAYING'
      | 'CITY'
      | 'COFFEE_SHOP'
      | 'DRIVING'
      | 'OFFICE'
      | 'THUNDERSTORM';

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
     * Primary language ISO 639-1 code for the persona
     */
    language: 'EN' | 'ES' | 'DE' | 'HI' | 'FR' | 'NL' | 'AR' | 'EL' | 'IT' | 'ID' | 'TH' | 'JA';

    /**
     * How reliable the persona's memory is
     */
    memoryReliability: 'HIGH' | 'LOW';

    /**
     * The name the agent will identify as during conversations
     */
    name: string;

    /**
     * Additional custom properties about the persona
     */
    properties: Record<string, unknown>;

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
     * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
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
     * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
     * optional variants
     */
    accent:
      | 'US'
      | 'US_X_SOUTH'
      | 'GB'
      | 'ES'
      | 'DE'
      | 'IN'
      | 'FR'
      | 'NL'
      | 'SA'
      | 'GR'
      | 'AU'
      | 'IT'
      | 'ID'
      | 'TH'
      | 'JP';

    /**
     * Background noise setting
     */
    backgroundNoise:
      | 'NONE'
      | 'AIRPORT'
      | 'CHILDREN_PLAYING'
      | 'CITY'
      | 'COFFEE_SHOP'
      | 'DRIVING'
      | 'OFFICE'
      | 'THUNDERSTORM';

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
     * Primary language ISO 639-1 code for the persona
     */
    language: 'EN' | 'ES' | 'DE' | 'HI' | 'FR' | 'NL' | 'AR' | 'EL' | 'IT' | 'ID' | 'TH' | 'JA';

    /**
     * How reliable the persona's memory is
     */
    memoryReliability: 'HIGH' | 'LOW';

    /**
     * The name the agent will identify as during conversations
     */
    name: string;

    /**
     * Additional custom properties about the persona
     */
    properties: Record<string, unknown>;

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
     * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
     */
    secondaryLanguage?: 'EN' | null;
  }
}

export interface PersonaCreateParams {
  /**
   * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
   * optional variants
   */
  accent:
    | 'US'
    | 'US_X_SOUTH'
    | 'GB'
    | 'ES'
    | 'DE'
    | 'IN'
    | 'FR'
    | 'NL'
    | 'SA'
    | 'GR'
    | 'AU'
    | 'IT'
    | 'ID'
    | 'TH'
    | 'JP';

  /**
   * Gender of the persona
   */
  gender: 'MALE' | 'FEMALE' | 'NEUTRAL';

  /**
   * Primary language ISO 639-1 code for the persona
   */
  language: 'EN' | 'ES' | 'DE' | 'HI' | 'FR' | 'NL' | 'AR' | 'EL' | 'IT' | 'ID' | 'TH' | 'JA';

  /**
   * The name the agent will identify as during conversations
   */
  name: string;

  /**
   * Background noise setting
   */
  backgroundNoise?:
    | 'NONE'
    | 'AIRPORT'
    | 'CHILDREN_PLAYING'
    | 'CITY'
    | 'COFFEE_SHOP'
    | 'DRIVING'
    | 'OFFICE'
    | 'THUNDERSTORM';

  /**
   * Background story and behavioral patterns for the persona
   */
  backstoryPrompt?: string | null;

  /**
   * Base emotional state of the persona
   */
  baseEmotion?: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED';

  /**
   * How the persona confirms information
   */
  confirmationStyle?: 'EXPLICIT' | 'VAGUE';

  /**
   * Whether the persona uses filler words like "um" and "uh"
   */
  hasDisfluencies?: boolean;

  /**
   * How clearly the persona expresses their intentions
   */
  intentClarity?: 'CLEAR' | 'INDIRECT' | 'VAGUE';

  /**
   * How reliable the persona's memory is
   */
  memoryReliability?: 'HIGH' | 'LOW';

  /**
   * Additional custom properties about the persona
   */
  properties?: Record<string, unknown>;

  /**
   * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
   */
  secondaryLanguage?: 'EN' | null;

  /**
   * Speech clarity of the persona
   */
  speechClarity?: 'CLEAR' | 'VAGUE' | 'RAMBLING';

  /**
   * Speech pace of the persona
   */
  speechPace?: 'SLOW' | 'NORMAL' | 'FAST';
}

export interface PersonaUpdateParams {
  /**
   * Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with
   * optional variants
   */
  accent?:
    | 'US'
    | 'US_X_SOUTH'
    | 'GB'
    | 'ES'
    | 'DE'
    | 'IN'
    | 'FR'
    | 'NL'
    | 'SA'
    | 'GR'
    | 'AU'
    | 'IT'
    | 'ID'
    | 'TH'
    | 'JP';

  /**
   * Background noise setting
   */
  backgroundNoise?:
    | 'NONE'
    | 'AIRPORT'
    | 'CHILDREN_PLAYING'
    | 'CITY'
    | 'COFFEE_SHOP'
    | 'DRIVING'
    | 'OFFICE'
    | 'THUNDERSTORM';

  /**
   * Background story and behavioral patterns for the persona
   */
  backstoryPrompt?: string | null;

  /**
   * Base emotional state of the persona
   */
  baseEmotion?: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED';

  /**
   * How the persona confirms information
   */
  confirmationStyle?: 'EXPLICIT' | 'VAGUE';

  /**
   * Gender of the persona
   */
  gender?: 'MALE' | 'FEMALE' | 'NEUTRAL';

  /**
   * Whether the persona uses filler words like "um" and "uh"
   */
  hasDisfluencies?: boolean;

  /**
   * How clearly the persona expresses their intentions
   */
  intentClarity?: 'CLEAR' | 'INDIRECT' | 'VAGUE';

  /**
   * Primary language ISO 639-1 code for the persona
   */
  language?: 'EN' | 'ES' | 'DE' | 'HI' | 'FR' | 'NL' | 'AR' | 'EL' | 'IT' | 'ID' | 'TH' | 'JA';

  /**
   * How reliable the persona's memory is
   */
  memoryReliability?: 'HIGH' | 'LOW';

  /**
   * The name the agent will identify as during conversations
   */
  name?: string;

  /**
   * Additional custom properties about the persona
   */
  properties?: Record<string, unknown>;

  /**
   * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
   */
  secondaryLanguage?: 'EN' | null;

  /**
   * Speech clarity of the persona
   */
  speechClarity?: 'CLEAR' | 'VAGUE' | 'RAMBLING';

  /**
   * Speech pace of the persona
   */
  speechPace?: 'SLOW' | 'NORMAL' | 'FAST';
}

export interface PersonaListParams {
  after?: string;

  limit?: number;

  searchText?: string;
}

export declare namespace Persona {
  export {
    type PersonaCreateResponse as PersonaCreateResponse,
    type PersonaUpdateResponse as PersonaUpdateResponse,
    type PersonaListResponse as PersonaListResponse,
    type PersonaGetByIDResponse as PersonaGetByIDResponse,
    type PersonaCreateParams as PersonaCreateParams,
    type PersonaUpdateParams as PersonaUpdateParams,
    type PersonaListParams as PersonaListParams,
  };
}
