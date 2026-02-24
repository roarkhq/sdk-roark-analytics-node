// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SimulationPersona extends APIResource {
  /**
   * Creates a new persona for the authenticated project.
   *
   * @example
   * ```ts
   * const simulationPersona =
   *   await client.simulationPersona.create({
   *     accent: 'US',
   *     gender: 'MALE',
   *     language: 'EN',
   *     name: 'name',
   *   });
   * ```
   */
  create(
    body: SimulationPersonaCreateParams,
    options?: RequestOptions,
  ): APIPromise<SimulationPersonaCreateResponse> {
    return this._client.post('/v1/persona', { body, ...options });
  }

  /**
   * Updates an existing persona by its ID.
   *
   * @example
   * ```ts
   * const simulationPersona =
   *   await client.simulationPersona.update('personaId');
   * ```
   */
  update(
    personaID: string,
    body: SimulationPersonaUpdateParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationPersonaUpdateResponse> {
    return this._client.put(path`/v1/persona/${personaID}`, { body, ...options });
  }

  /**
   * Returns a paginated list of personas for the authenticated project.
   *
   * @example
   * ```ts
   * const simulationPersonas =
   *   await client.simulationPersona.list();
   * ```
   */
  list(
    query: SimulationPersonaListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<SimulationPersonaListResponse> {
    return this._client.get('/v1/persona', { query, ...options });
  }

  /**
   * Returns a specific persona by its ID.
   *
   * @example
   * ```ts
   * const response = await client.simulationPersona.getByID(
   *   'personaId',
   * );
   * ```
   */
  getByID(personaID: string, options?: RequestOptions): APIPromise<SimulationPersonaGetByIDResponse> {
    return this._client.get(path`/v1/persona/${personaID}`, options);
  }
}

export interface SimulationPersonaCreateResponse {
  data: SimulationPersonaCreateResponse.Data;
}

export namespace SimulationPersonaCreateResponse {
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
    gender: 'MALE' | 'FEMALE';

    /**
     * Whether the persona uses filler words like "um" and "uh"
     */
    hasDisfluencies: boolean;

    /**
     * Maximum number of idle messages the persona will send before giving up
     */
    idleMessageMaxSpokenCount: number;

    /**
     * Whether the idle message counter resets when the agent speaks
     */
    idleMessageResetCountOnUserSpeechEnabled: boolean;

    /**
     * Messages the persona will say when the agent goes silent during a call
     */
    idleMessages: Array<string>;

    /**
     * Seconds of silence before the persona sends an idle message
     */
    idleTimeoutSeconds: number;

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
    properties: { [key: string]: unknown };

    /**
     * Controls how quickly the persona responds to pauses in conversation (QUICK,
     * NORMAL, RELAXED)
     */
    responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

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
     * Human-readable description of the persona
     */
    description?: string | null;

    /**
     * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
     */
    secondaryLanguage?: 'EN' | null;
  }
}

export interface SimulationPersonaUpdateResponse {
  data: SimulationPersonaUpdateResponse.Data;
}

export namespace SimulationPersonaUpdateResponse {
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
    gender: 'MALE' | 'FEMALE';

    /**
     * Whether the persona uses filler words like "um" and "uh"
     */
    hasDisfluencies: boolean;

    /**
     * Maximum number of idle messages the persona will send before giving up
     */
    idleMessageMaxSpokenCount: number;

    /**
     * Whether the idle message counter resets when the agent speaks
     */
    idleMessageResetCountOnUserSpeechEnabled: boolean;

    /**
     * Messages the persona will say when the agent goes silent during a call
     */
    idleMessages: Array<string>;

    /**
     * Seconds of silence before the persona sends an idle message
     */
    idleTimeoutSeconds: number;

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
    properties: { [key: string]: unknown };

    /**
     * Controls how quickly the persona responds to pauses in conversation (QUICK,
     * NORMAL, RELAXED)
     */
    responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

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
     * Human-readable description of the persona
     */
    description?: string | null;

    /**
     * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
     */
    secondaryLanguage?: 'EN' | null;
  }
}

export interface SimulationPersonaListResponse {
  data: Array<SimulationPersonaListResponse.Data>;

  pagination: SimulationPersonaListResponse.Pagination;
}

export namespace SimulationPersonaListResponse {
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
    gender: 'MALE' | 'FEMALE';

    /**
     * Whether the persona uses filler words like "um" and "uh"
     */
    hasDisfluencies: boolean;

    /**
     * Maximum number of idle messages the persona will send before giving up
     */
    idleMessageMaxSpokenCount: number;

    /**
     * Whether the idle message counter resets when the agent speaks
     */
    idleMessageResetCountOnUserSpeechEnabled: boolean;

    /**
     * Messages the persona will say when the agent goes silent during a call
     */
    idleMessages: Array<string>;

    /**
     * Seconds of silence before the persona sends an idle message
     */
    idleTimeoutSeconds: number;

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
    properties: { [key: string]: unknown };

    /**
     * Controls how quickly the persona responds to pauses in conversation (QUICK,
     * NORMAL, RELAXED)
     */
    responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

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
     * Human-readable description of the persona
     */
    description?: string | null;

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

export interface SimulationPersonaGetByIDResponse {
  data: SimulationPersonaGetByIDResponse.Data;
}

export namespace SimulationPersonaGetByIDResponse {
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
    gender: 'MALE' | 'FEMALE';

    /**
     * Whether the persona uses filler words like "um" and "uh"
     */
    hasDisfluencies: boolean;

    /**
     * Maximum number of idle messages the persona will send before giving up
     */
    idleMessageMaxSpokenCount: number;

    /**
     * Whether the idle message counter resets when the agent speaks
     */
    idleMessageResetCountOnUserSpeechEnabled: boolean;

    /**
     * Messages the persona will say when the agent goes silent during a call
     */
    idleMessages: Array<string>;

    /**
     * Seconds of silence before the persona sends an idle message
     */
    idleTimeoutSeconds: number;

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
    properties: { [key: string]: unknown };

    /**
     * Controls how quickly the persona responds to pauses in conversation (QUICK,
     * NORMAL, RELAXED)
     */
    responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK';

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
     * Human-readable description of the persona
     */
    description?: string | null;

    /**
     * Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)
     */
    secondaryLanguage?: 'EN' | null;
  }
}

export interface SimulationPersonaCreateParams {
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
  gender: 'MALE' | 'FEMALE';

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
   * Human-readable description of the persona
   */
  description?: string | null;

  /**
   * Whether the persona uses filler words like "um" and "uh"
   */
  hasDisfluencies?: boolean;

  /**
   * Maximum number of idle messages the persona will send before giving up
   */
  idleMessageMaxSpokenCount?: number;

  /**
   * Whether the idle message counter resets when the agent speaks
   */
  idleMessageResetCountOnUserSpeechEnabled?: boolean;

  /**
   * Messages the persona will say when the agent goes silent during a call
   */
  idleMessages?: Array<string>;

  /**
   * Seconds of silence before the persona sends an idle message
   */
  idleTimeoutSeconds?: number;

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
  properties?: { [key: string]: unknown };

  /**
   * Controls how quickly the persona responds to pauses in conversation (QUICK,
   * NORMAL, RELAXED)
   */
  responseTiming?: 'RELAXED' | 'NORMAL' | 'QUICK';

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

export interface SimulationPersonaUpdateParams {
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
   * Human-readable description of the persona
   */
  description?: string | null;

  /**
   * Gender of the persona
   */
  gender?: 'MALE' | 'FEMALE';

  /**
   * Whether the persona uses filler words like "um" and "uh"
   */
  hasDisfluencies?: boolean;

  /**
   * Maximum number of idle messages the persona will send before giving up
   */
  idleMessageMaxSpokenCount?: number;

  /**
   * Whether the idle message counter resets when the agent speaks
   */
  idleMessageResetCountOnUserSpeechEnabled?: boolean;

  /**
   * Messages the persona will say when the agent goes silent during a call
   */
  idleMessages?: Array<string>;

  /**
   * Seconds of silence before the persona sends an idle message
   */
  idleTimeoutSeconds?: number;

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
  properties?: { [key: string]: unknown };

  /**
   * Controls how quickly the persona responds to pauses in conversation (QUICK,
   * NORMAL, RELAXED)
   */
  responseTiming?: 'RELAXED' | 'NORMAL' | 'QUICK';

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

export interface SimulationPersonaListParams {
  after?: string;

  limit?: number;

  searchText?: string;
}

export declare namespace SimulationPersona {
  export {
    type SimulationPersonaCreateResponse as SimulationPersonaCreateResponse,
    type SimulationPersonaUpdateResponse as SimulationPersonaUpdateResponse,
    type SimulationPersonaListResponse as SimulationPersonaListResponse,
    type SimulationPersonaGetByIDResponse as SimulationPersonaGetByIDResponse,
    type SimulationPersonaCreateParams as SimulationPersonaCreateParams,
    type SimulationPersonaUpdateParams as SimulationPersonaUpdateParams,
    type SimulationPersonaListParams as SimulationPersonaListParams,
  };
}
