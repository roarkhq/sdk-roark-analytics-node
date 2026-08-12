// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as CustomerFlowAPI from './customer-flow';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class CustomerFlowEdgeCase extends APIResource {
  /**
   * Updates an edge case's title, persona, environment, brief, preceded-by link or
   * expectations. Omitted fields are left alone; `additionalExpectations` replaces
   * the set wholesale rather than appending. Promoting it to the happy path is a
   * separate call, since that also demotes the incumbent.
   */
  update(
    edgeCaseID: string,
    params: CustomerFlowEdgeCaseUpdateParams,
    options?: RequestOptions,
  ): APIPromise<CustomerFlowEdgeCaseUpdateResponse> {
    const { flowId, ...body } = params;
    return this._client.put(path`/v1/customer-flow/${flowId}/edge-case/${edgeCaseID}`, { body, ...options });
  }

  /**
   * Adds a variant to an IMPROV flow.
   *
   * A scripted flow's variants are owned by the path engine, one per path through
   * the graph, so they are created by editing the graph through PUT
   * /v1/customer-flow/{flowId}/graph rather than here.
   *
   * Leave personaOverrideId or environmentId unset to inherit the happy path's.
   */
  add(
    flowID: string,
    body: CustomerFlowEdgeCaseAddParams,
    options?: RequestOptions,
  ): APIPromise<CustomerFlowEdgeCaseAddResponse> {
    return this._client.post(path`/v1/customer-flow/${flowID}/edge-case`, { body, ...options });
  }

  /**
   * Makes this edge case the flow's happy path, and the outgoing happy path an edge
   * case. Its persona and environment are baked into it first, so edge cases that
   * were inheriting keep the configuration they had.
   */
  promote(
    edgeCaseID: string,
    params: CustomerFlowEdgeCasePromoteParams,
    options?: RequestOptions,
  ): APIPromise<CustomerFlowEdgeCasePromoteResponse> {
    const { flowId } = params;
    return this._client.post(path`/v1/customer-flow/${flowId}/edge-case/${edgeCaseID}/promote`, options);
  }

  /**
   * Soft-deletes a variant. On a scripted flow the path engine re-creates a variant
   * for any path still in the graph, so remove the path through PUT /graph instead
   * if that is what you meant.
   */
  remove(
    edgeCaseID: string,
    params: CustomerFlowEdgeCaseRemoveParams,
    options?: RequestOptions,
  ): APIPromise<CustomerFlowEdgeCaseRemoveResponse> {
    const { flowId } = params;
    return this._client.delete(path`/v1/customer-flow/${flowId}/edge-case/${edgeCaseID}`, options);
  }
}

export interface CustomerFlowEdgeCaseUpdateResponse {
  /**
   * One way of running a customer flow.
   */
  data:
    | CustomerFlowEdgeCaseUpdateResponse.ScriptedFlowVariant
    | CustomerFlowEdgeCaseUpdateResponse.ImprovFlowVariant
    | CustomerFlowEdgeCaseUpdateResponse.VoicemailFlowVariant;
}

export namespace CustomerFlowEdgeCaseUpdateResponse {
  /**
   * One path through a scripted flow. The path engine owns which paths exist, so
   * editing the graph is what creates and removes these.
   */
  export interface ScriptedFlowVariant {
    id: string;

    /**
     * Graded on top of the flow's own expectations, for this variant only.
     */
    additionalExpectations: Array<ScriptedFlowVariant.AdditionalExpectation>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    environment: ScriptedFlowVariant.Environment | null;

    isGenerated: boolean;

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    personaOverride: ScriptedFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    /**
     * The one path through the graph this variant runs, in order. Linear by
     * construction, so these steps never nest.
     */
    steps: Array<CustomerFlowAPI.FlowStep>;

    title: string;

    type: 'SCRIPTED';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }

  export namespace ScriptedFlowVariant {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AdditionalExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    export interface Environment {
      id: string;

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
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      description?: string | null;
    }

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    export interface PersonaOverride {
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
        | 'JP'
        | 'NZ'
        | 'PH'
        | 'SG'
        | 'MY'
        | 'HK'
        | 'TR'
        | 'PT'
        | 'IL';

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
      baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED';

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
       * Messages the persona will say when the agent goes silent during a call. null =
       * "Automatic": language-appropriate defaults are used at call time.
       */
      idleMessages: Array<string> | null;

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
      language:
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE';

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
      speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

      /**
       * Languages the persona can understand. Multilingual combinations are limited by
       * multilingual speech recognition support.
       */
      understoodLanguages: Array<
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE'
      >;

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

  /**
   * One brief to run an improv flow with.
   */
  export interface ImprovFlowVariant {
    id: string;

    /**
     * Graded on top of the flow's own expectations, for this variant only.
     */
    additionalExpectations: Array<ImprovFlowVariant.AdditionalExpectation>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    environment: ImprovFlowVariant.Environment | null;

    isGenerated: boolean;

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    personaOverride: ImprovFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    title: string;

    type: 'IMPROV';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    /**
     * The brief the simulated customer improvises from.
     */
    prompt?: string | null;
  }

  export namespace ImprovFlowVariant {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AdditionalExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    export interface Environment {
      id: string;

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
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      description?: string | null;
    }

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    export interface PersonaOverride {
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
        | 'JP'
        | 'NZ'
        | 'PH'
        | 'SG'
        | 'MY'
        | 'HK'
        | 'TR'
        | 'PT'
        | 'IL';

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
      baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED';

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
       * Messages the persona will say when the agent goes silent during a call. null =
       * "Automatic": language-appropriate defaults are used at call time.
       */
      idleMessages: Array<string> | null;

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
      language:
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE';

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
      speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

      /**
       * Languages the persona can understand. Multilingual combinations are limited by
       * multilingual speech recognition support.
       */
      understoodLanguages: Array<
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE'
      >;

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

  /**
   * One voicemail greeting.
   */
  export interface VoicemailFlowVariant {
    id: string;

    /**
     * Graded on top of the flow's own expectations, for this variant only.
     */
    additionalExpectations: Array<VoicemailFlowVariant.AdditionalExpectation>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    environment: VoicemailFlowVariant.Environment | null;

    isGenerated: boolean;

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    personaOverride: VoicemailFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    title: string;

    type: 'VOICEMAIL';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }

  export namespace VoicemailFlowVariant {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AdditionalExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    export interface Environment {
      id: string;

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
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      description?: string | null;
    }

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    export interface PersonaOverride {
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
        | 'JP'
        | 'NZ'
        | 'PH'
        | 'SG'
        | 'MY'
        | 'HK'
        | 'TR'
        | 'PT'
        | 'IL';

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
      baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED';

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
       * Messages the persona will say when the agent goes silent during a call. null =
       * "Automatic": language-appropriate defaults are used at call time.
       */
      idleMessages: Array<string> | null;

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
      language:
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE';

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
      speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

      /**
       * Languages the persona can understand. Multilingual combinations are limited by
       * multilingual speech recognition support.
       */
      understoodLanguages: Array<
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE'
      >;

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
}

export interface CustomerFlowEdgeCaseAddResponse {
  /**
   * One way of running a customer flow.
   */
  data:
    | CustomerFlowEdgeCaseAddResponse.ScriptedFlowVariant
    | CustomerFlowEdgeCaseAddResponse.ImprovFlowVariant
    | CustomerFlowEdgeCaseAddResponse.VoicemailFlowVariant;
}

export namespace CustomerFlowEdgeCaseAddResponse {
  /**
   * One path through a scripted flow. The path engine owns which paths exist, so
   * editing the graph is what creates and removes these.
   */
  export interface ScriptedFlowVariant {
    id: string;

    /**
     * Graded on top of the flow's own expectations, for this variant only.
     */
    additionalExpectations: Array<ScriptedFlowVariant.AdditionalExpectation>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    environment: ScriptedFlowVariant.Environment | null;

    isGenerated: boolean;

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    personaOverride: ScriptedFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    /**
     * The one path through the graph this variant runs, in order. Linear by
     * construction, so these steps never nest.
     */
    steps: Array<CustomerFlowAPI.FlowStep>;

    title: string;

    type: 'SCRIPTED';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }

  export namespace ScriptedFlowVariant {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AdditionalExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    export interface Environment {
      id: string;

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
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      description?: string | null;
    }

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    export interface PersonaOverride {
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
        | 'JP'
        | 'NZ'
        | 'PH'
        | 'SG'
        | 'MY'
        | 'HK'
        | 'TR'
        | 'PT'
        | 'IL';

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
      baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED';

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
       * Messages the persona will say when the agent goes silent during a call. null =
       * "Automatic": language-appropriate defaults are used at call time.
       */
      idleMessages: Array<string> | null;

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
      language:
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE';

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
      speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

      /**
       * Languages the persona can understand. Multilingual combinations are limited by
       * multilingual speech recognition support.
       */
      understoodLanguages: Array<
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE'
      >;

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

  /**
   * One brief to run an improv flow with.
   */
  export interface ImprovFlowVariant {
    id: string;

    /**
     * Graded on top of the flow's own expectations, for this variant only.
     */
    additionalExpectations: Array<ImprovFlowVariant.AdditionalExpectation>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    environment: ImprovFlowVariant.Environment | null;

    isGenerated: boolean;

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    personaOverride: ImprovFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    title: string;

    type: 'IMPROV';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    /**
     * The brief the simulated customer improvises from.
     */
    prompt?: string | null;
  }

  export namespace ImprovFlowVariant {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AdditionalExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    export interface Environment {
      id: string;

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
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      description?: string | null;
    }

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    export interface PersonaOverride {
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
        | 'JP'
        | 'NZ'
        | 'PH'
        | 'SG'
        | 'MY'
        | 'HK'
        | 'TR'
        | 'PT'
        | 'IL';

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
      baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED';

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
       * Messages the persona will say when the agent goes silent during a call. null =
       * "Automatic": language-appropriate defaults are used at call time.
       */
      idleMessages: Array<string> | null;

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
      language:
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE';

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
      speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

      /**
       * Languages the persona can understand. Multilingual combinations are limited by
       * multilingual speech recognition support.
       */
      understoodLanguages: Array<
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE'
      >;

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

  /**
   * One voicemail greeting.
   */
  export interface VoicemailFlowVariant {
    id: string;

    /**
     * Graded on top of the flow's own expectations, for this variant only.
     */
    additionalExpectations: Array<VoicemailFlowVariant.AdditionalExpectation>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    environment: VoicemailFlowVariant.Environment | null;

    isGenerated: boolean;

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    personaOverride: VoicemailFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    title: string;

    type: 'VOICEMAIL';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }

  export namespace VoicemailFlowVariant {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AdditionalExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    export interface Environment {
      id: string;

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
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      description?: string | null;
    }

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    export interface PersonaOverride {
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
        | 'JP'
        | 'NZ'
        | 'PH'
        | 'SG'
        | 'MY'
        | 'HK'
        | 'TR'
        | 'PT'
        | 'IL';

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
      baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED';

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
       * Messages the persona will say when the agent goes silent during a call. null =
       * "Automatic": language-appropriate defaults are used at call time.
       */
      idleMessages: Array<string> | null;

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
      language:
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE';

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
      speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

      /**
       * Languages the persona can understand. Multilingual combinations are limited by
       * multilingual speech recognition support.
       */
      understoodLanguages: Array<
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE'
      >;

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
}

export interface CustomerFlowEdgeCasePromoteResponse {
  /**
   * One way of running a customer flow.
   */
  data:
    | CustomerFlowEdgeCasePromoteResponse.ScriptedFlowVariant
    | CustomerFlowEdgeCasePromoteResponse.ImprovFlowVariant
    | CustomerFlowEdgeCasePromoteResponse.VoicemailFlowVariant;
}

export namespace CustomerFlowEdgeCasePromoteResponse {
  /**
   * One path through a scripted flow. The path engine owns which paths exist, so
   * editing the graph is what creates and removes these.
   */
  export interface ScriptedFlowVariant {
    id: string;

    /**
     * Graded on top of the flow's own expectations, for this variant only.
     */
    additionalExpectations: Array<ScriptedFlowVariant.AdditionalExpectation>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    environment: ScriptedFlowVariant.Environment | null;

    isGenerated: boolean;

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    personaOverride: ScriptedFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    /**
     * The one path through the graph this variant runs, in order. Linear by
     * construction, so these steps never nest.
     */
    steps: Array<CustomerFlowAPI.FlowStep>;

    title: string;

    type: 'SCRIPTED';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }

  export namespace ScriptedFlowVariant {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AdditionalExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    export interface Environment {
      id: string;

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
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      description?: string | null;
    }

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    export interface PersonaOverride {
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
        | 'JP'
        | 'NZ'
        | 'PH'
        | 'SG'
        | 'MY'
        | 'HK'
        | 'TR'
        | 'PT'
        | 'IL';

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
      baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED';

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
       * Messages the persona will say when the agent goes silent during a call. null =
       * "Automatic": language-appropriate defaults are used at call time.
       */
      idleMessages: Array<string> | null;

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
      language:
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE';

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
      speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

      /**
       * Languages the persona can understand. Multilingual combinations are limited by
       * multilingual speech recognition support.
       */
      understoodLanguages: Array<
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE'
      >;

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

  /**
   * One brief to run an improv flow with.
   */
  export interface ImprovFlowVariant {
    id: string;

    /**
     * Graded on top of the flow's own expectations, for this variant only.
     */
    additionalExpectations: Array<ImprovFlowVariant.AdditionalExpectation>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    environment: ImprovFlowVariant.Environment | null;

    isGenerated: boolean;

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    personaOverride: ImprovFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    title: string;

    type: 'IMPROV';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;

    /**
     * The brief the simulated customer improvises from.
     */
    prompt?: string | null;
  }

  export namespace ImprovFlowVariant {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AdditionalExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    export interface Environment {
      id: string;

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
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      description?: string | null;
    }

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    export interface PersonaOverride {
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
        | 'JP'
        | 'NZ'
        | 'PH'
        | 'SG'
        | 'MY'
        | 'HK'
        | 'TR'
        | 'PT'
        | 'IL';

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
      baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED';

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
       * Messages the persona will say when the agent goes silent during a call. null =
       * "Automatic": language-appropriate defaults are used at call time.
       */
      idleMessages: Array<string> | null;

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
      language:
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE';

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
      speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

      /**
       * Languages the persona can understand. Multilingual combinations are limited by
       * multilingual speech recognition support.
       */
      understoodLanguages: Array<
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE'
      >;

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

  /**
   * One voicemail greeting.
   */
  export interface VoicemailFlowVariant {
    id: string;

    /**
     * Graded on top of the flow's own expectations, for this variant only.
     */
    additionalExpectations: Array<VoicemailFlowVariant.AdditionalExpectation>;

    /**
     * Creation timestamp in ISO 8601 format
     */
    createdAt: string;

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    environment: VoicemailFlowVariant.Environment | null;

    isGenerated: boolean;

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    personaOverride: VoicemailFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    title: string;

    type: 'VOICEMAIL';

    /**
     * Last update timestamp in ISO 8601 format
     */
    updatedAt: string;
  }

  export namespace VoicemailFlowVariant {
    /**
     * One thing the agent under test is graded against.
     */
    export interface AdditionalExpectation {
      id: string;

      /**
       * What the agent under test is graded against.
       */
      prompt: string;
    }

    /**
     * A simulation environment: the ambient conditions a customer flow variant runs
     * under. The list includes both your own and the ones Roark curates for every
     * project.
     */
    export interface Environment {
      id: string;

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
       * Creation timestamp in ISO 8601 format
       */
      createdAt: string;

      name: string;

      /**
       * Last update timestamp in ISO 8601 format
       */
      updatedAt: string;

      description?: string | null;
    }

    /**
     * The persona this runs as instead of the happy path's. Null means it inherits.
     */
    export interface PersonaOverride {
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
        | 'JP'
        | 'NZ'
        | 'PH'
        | 'SG'
        | 'MY'
        | 'HK'
        | 'TR'
        | 'PT'
        | 'IL';

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
      baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED';

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
       * Messages the persona will say when the agent goes silent during a call. null =
       * "Automatic": language-appropriate defaults are used at call time.
       */
      idleMessages: Array<string> | null;

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
      language:
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE';

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
      speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

      /**
       * Languages the persona can understand. Multilingual combinations are limited by
       * multilingual speech recognition support.
       */
      understoodLanguages: Array<
        | 'EN'
        | 'ES'
        | 'DE'
        | 'HI'
        | 'FR'
        | 'NL'
        | 'AR'
        | 'EL'
        | 'IT'
        | 'ID'
        | 'TH'
        | 'JA'
        | 'TL'
        | 'MS'
        | 'ZH'
        | 'TR'
        | 'PT'
        | 'HE'
      >;

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
}

export interface CustomerFlowEdgeCaseRemoveResponse {
  data: CustomerFlowEdgeCaseRemoveResponse.Data;
}

export namespace CustomerFlowEdgeCaseRemoveResponse {
  export interface Data {
    /**
     * Whether the variant was deleted
     */
    deleted: boolean;
  }
}

export interface CustomerFlowEdgeCaseUpdateParams {
  /**
   * Path param
   */
  flowId: string;

  /**
   * Body param: Replaces the expectations that apply to this variant on top of the
   * flow's. Omit to leave them alone, send [] to clear. Improv flows only: a
   * scripted variant's expectations come from the agent turns on its path and are
   * rewritten on the next graph edit.
   */
  additionalExpectations?: Array<CustomerFlowEdgeCaseUpdateParams.AdditionalExpectation>;

  /**
   * Body param
   */
  environmentId?: string | null;

  /**
   * Body param: The persona this runs as. Null on an edge case inherits the happy
   * path's.
   */
  personaOverrideId?: string | null;

  /**
   * Body param
   */
  precededByCustomerFlowId?: string | null;

  /**
   * Body param
   */
  precededByCustomerFlowVariantId?: string | null;

  /**
   * Body param
   */
  prompt?: string | null;

  /**
   * Body param
   */
  title?: string;
}

export namespace CustomerFlowEdgeCaseUpdateParams {
  export interface AdditionalExpectation {
    /**
     * What the agent under test is graded against.
     */
    prompt: string;
  }
}

export interface CustomerFlowEdgeCaseAddParams {
  title: string;

  environmentId?: string | null;

  /**
   * The persona this runs as. Omit to inherit the happy path's.
   */
  personaOverrideId?: string | null;

  precededByCustomerFlowId?: string | null;

  precededByCustomerFlowVariantId?: string | null;

  prompt?: string | null;
}

export interface CustomerFlowEdgeCasePromoteParams {
  flowId: string;
}

export interface CustomerFlowEdgeCaseRemoveParams {
  flowId: string;
}

export declare namespace CustomerFlowEdgeCase {
  export {
    type CustomerFlowEdgeCaseUpdateResponse as CustomerFlowEdgeCaseUpdateResponse,
    type CustomerFlowEdgeCaseAddResponse as CustomerFlowEdgeCaseAddResponse,
    type CustomerFlowEdgeCasePromoteResponse as CustomerFlowEdgeCasePromoteResponse,
    type CustomerFlowEdgeCaseRemoveResponse as CustomerFlowEdgeCaseRemoveResponse,
    type CustomerFlowEdgeCaseUpdateParams as CustomerFlowEdgeCaseUpdateParams,
    type CustomerFlowEdgeCaseAddParams as CustomerFlowEdgeCaseAddParams,
    type CustomerFlowEdgeCasePromoteParams as CustomerFlowEdgeCasePromoteParams,
    type CustomerFlowEdgeCaseRemoveParams as CustomerFlowEdgeCaseRemoveParams,
  };
}
