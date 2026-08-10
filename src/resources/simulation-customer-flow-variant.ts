// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as SimulationCustomerFlowAPI from './simulation-customer-flow';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class SimulationCustomerFlowVariant extends APIResource {
  /**
   * Adds a variant to an IMPROV flow.
   *
   * A scripted flow's variants are owned by the path engine, one per path through
   * the graph, so they are created by editing the graph through PUT
   * /v1/simulation/customer-flow/{flowId}/graph rather than here.
   *
   * Leave personaOverrideId or environmentId unset to inherit the default variant's.
   */
  create(
    flowID: string,
    body: SimulationCustomerFlowVariantCreateParams,
    options?: RequestOptions,
  ): APIPromise<SimulationCustomerFlowVariantCreateResponse> {
    return this._client.post(path`/v1/simulation/customer-flow/${flowID}/variant`, { body, ...options });
  }

  /**
   * Updates a variant's title, persona, environment, brief, preceded-by link or
   * expectations. Omitted fields are left alone; `additionalExpectations` replaces
   * the set wholesale rather than appending. Making it the flow's default is a
   * separate call, since that also demotes the current default.
   */
  update(
    variantID: string,
    params: SimulationCustomerFlowVariantUpdateParams,
    options?: RequestOptions,
  ): APIPromise<SimulationCustomerFlowVariantUpdateResponse> {
    const { flowId, ...body } = params;
    return this._client.put(path`/v1/simulation/customer-flow/${flowId}/variant/${variantID}`, {
      body,
      ...options,
    });
  }

  /**
   * Returns every variant of a customer flow with its additional expectations. Not
   * paginated: a flow's variants are bounded by its paths.
   */
  list(flowID: string, options?: RequestOptions): APIPromise<SimulationCustomerFlowVariantListResponse> {
    return this._client.get(path`/v1/simulation/customer-flow/${flowID}/variant`, options);
  }

  /**
   * Soft-deletes a variant. On a scripted flow the path engine re-creates a variant
   * for any path still in the graph, so remove the path through PUT /graph instead
   * if that is what you meant.
   */
  delete(
    variantID: string,
    params: SimulationCustomerFlowVariantDeleteParams,
    options?: RequestOptions,
  ): APIPromise<SimulationCustomerFlowVariantDeleteResponse> {
    const { flowId } = params;
    return this._client.delete(path`/v1/simulation/customer-flow/${flowId}/variant/${variantID}`, options);
  }

  /**
   * Get a flow variant
   */
  getByID(
    variantID: string,
    params: SimulationCustomerFlowVariantGetByIDParams,
    options?: RequestOptions,
  ): APIPromise<SimulationCustomerFlowVariantGetByIDResponse> {
    const { flowId } = params;
    return this._client.get(path`/v1/simulation/customer-flow/${flowId}/variant/${variantID}`, options);
  }

  /**
   * Promotes a variant to the flow's default, demoting the current one. The outgoing
   * default's persona and environment are baked into it first, so variants that were
   * inheriting keep the configuration they had.
   */
  setDefault(
    variantID: string,
    params: SimulationCustomerFlowVariantSetDefaultParams,
    options?: RequestOptions,
  ): APIPromise<SimulationCustomerFlowVariantSetDefaultResponse> {
    const { flowId } = params;
    return this._client.post(
      path`/v1/simulation/customer-flow/${flowId}/variant/${variantID}/default`,
      options,
    );
  }
}

export interface SimulationCustomerFlowVariantCreateResponse {
  /**
   * One way of running a customer flow.
   */
  data:
    | SimulationCustomerFlowVariantCreateResponse.ScriptedFlowVariant
    | SimulationCustomerFlowVariantCreateResponse.ImprovFlowVariant
    | SimulationCustomerFlowVariantCreateResponse.VoicemailFlowVariant;
}

export namespace SimulationCustomerFlowVariantCreateResponse {
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

    isDefault: boolean;

    isGenerated: boolean;

    /**
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
     */
    personaOverride: ScriptedFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    /**
     * The one path through the graph this variant runs, in order. Linear by
     * construction, so these steps never nest.
     */
    steps: Array<SimulationCustomerFlowAPI.FlowStep>;

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
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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

    isDefault: boolean;

    isGenerated: boolean;

    /**
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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

    isDefault: boolean;

    isGenerated: boolean;

    /**
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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

export interface SimulationCustomerFlowVariantUpdateResponse {
  /**
   * One way of running a customer flow.
   */
  data:
    | SimulationCustomerFlowVariantUpdateResponse.ScriptedFlowVariant
    | SimulationCustomerFlowVariantUpdateResponse.ImprovFlowVariant
    | SimulationCustomerFlowVariantUpdateResponse.VoicemailFlowVariant;
}

export namespace SimulationCustomerFlowVariantUpdateResponse {
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

    isDefault: boolean;

    isGenerated: boolean;

    /**
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
     */
    personaOverride: ScriptedFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    /**
     * The one path through the graph this variant runs, in order. Linear by
     * construction, so these steps never nest.
     */
    steps: Array<SimulationCustomerFlowAPI.FlowStep>;

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
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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

    isDefault: boolean;

    isGenerated: boolean;

    /**
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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

    isDefault: boolean;

    isGenerated: boolean;

    /**
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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

export interface SimulationCustomerFlowVariantListResponse {
  data: Array<
    | SimulationCustomerFlowVariantListResponse.ScriptedFlowVariant
    | SimulationCustomerFlowVariantListResponse.ImprovFlowVariant
    | SimulationCustomerFlowVariantListResponse.VoicemailFlowVariant
  >;
}

export namespace SimulationCustomerFlowVariantListResponse {
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

    isDefault: boolean;

    isGenerated: boolean;

    /**
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
     */
    personaOverride: ScriptedFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    /**
     * The one path through the graph this variant runs, in order. Linear by
     * construction, so these steps never nest.
     */
    steps: Array<SimulationCustomerFlowAPI.FlowStep>;

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
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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

    isDefault: boolean;

    isGenerated: boolean;

    /**
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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

    isDefault: boolean;

    isGenerated: boolean;

    /**
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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

export interface SimulationCustomerFlowVariantDeleteResponse {
  data: SimulationCustomerFlowVariantDeleteResponse.Data;
}

export namespace SimulationCustomerFlowVariantDeleteResponse {
  export interface Data {
    /**
     * Whether the variant was deleted
     */
    deleted: boolean;
  }
}

export interface SimulationCustomerFlowVariantGetByIDResponse {
  /**
   * One way of running a customer flow.
   */
  data:
    | SimulationCustomerFlowVariantGetByIDResponse.ScriptedFlowVariant
    | SimulationCustomerFlowVariantGetByIDResponse.ImprovFlowVariant
    | SimulationCustomerFlowVariantGetByIDResponse.VoicemailFlowVariant;
}

export namespace SimulationCustomerFlowVariantGetByIDResponse {
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

    isDefault: boolean;

    isGenerated: boolean;

    /**
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
     */
    personaOverride: ScriptedFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    /**
     * The one path through the graph this variant runs, in order. Linear by
     * construction, so these steps never nest.
     */
    steps: Array<SimulationCustomerFlowAPI.FlowStep>;

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
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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

    isDefault: boolean;

    isGenerated: boolean;

    /**
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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

    isDefault: boolean;

    isGenerated: boolean;

    /**
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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

export interface SimulationCustomerFlowVariantSetDefaultResponse {
  /**
   * One way of running a customer flow.
   */
  data:
    | SimulationCustomerFlowVariantSetDefaultResponse.ScriptedFlowVariant
    | SimulationCustomerFlowVariantSetDefaultResponse.ImprovFlowVariant
    | SimulationCustomerFlowVariantSetDefaultResponse.VoicemailFlowVariant;
}

export namespace SimulationCustomerFlowVariantSetDefaultResponse {
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

    isDefault: boolean;

    isGenerated: boolean;

    /**
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
     */
    personaOverride: ScriptedFlowVariant.PersonaOverride | null;

    precededByCustomerFlowId: string | null;

    precededByCustomerFlowVariantId: string | null;

    /**
     * The one path through the graph this variant runs, in order. Linear by
     * construction, so these steps never nest.
     */
    steps: Array<SimulationCustomerFlowAPI.FlowStep>;

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
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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

    isDefault: boolean;

    isGenerated: boolean;

    /**
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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

    isDefault: boolean;

    isGenerated: boolean;

    /**
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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
     * The persona this variant runs as instead of the default variant's. Null means it
     * inherits.
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

export interface SimulationCustomerFlowVariantCreateParams {
  title: string;

  environmentId?: string | null;

  isDefault?: boolean;

  /**
   * The persona this variant runs as. Omit on a non-default variant to inherit the
   * default variant's.
   */
  personaOverrideId?: string | null;

  precededByCustomerFlowId?: string | null;

  precededByCustomerFlowVariantId?: string | null;

  prompt?: string | null;
}

export interface SimulationCustomerFlowVariantUpdateParams {
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
  additionalExpectations?: Array<SimulationCustomerFlowVariantUpdateParams.AdditionalExpectation>;

  /**
   * Body param
   */
  environmentId?: string | null;

  /**
   * Body param: The persona this variant runs as. Null on a non-default variant
   * inherits the default variant's.
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

export namespace SimulationCustomerFlowVariantUpdateParams {
  export interface AdditionalExpectation {
    /**
     * What the agent under test is graded against.
     */
    prompt: string;
  }
}

export interface SimulationCustomerFlowVariantDeleteParams {
  flowId: string;
}

export interface SimulationCustomerFlowVariantGetByIDParams {
  flowId: string;
}

export interface SimulationCustomerFlowVariantSetDefaultParams {
  flowId: string;
}

export declare namespace SimulationCustomerFlowVariant {
  export {
    type SimulationCustomerFlowVariantCreateResponse as SimulationCustomerFlowVariantCreateResponse,
    type SimulationCustomerFlowVariantUpdateResponse as SimulationCustomerFlowVariantUpdateResponse,
    type SimulationCustomerFlowVariantListResponse as SimulationCustomerFlowVariantListResponse,
    type SimulationCustomerFlowVariantDeleteResponse as SimulationCustomerFlowVariantDeleteResponse,
    type SimulationCustomerFlowVariantGetByIDResponse as SimulationCustomerFlowVariantGetByIDResponse,
    type SimulationCustomerFlowVariantSetDefaultResponse as SimulationCustomerFlowVariantSetDefaultResponse,
    type SimulationCustomerFlowVariantCreateParams as SimulationCustomerFlowVariantCreateParams,
    type SimulationCustomerFlowVariantUpdateParams as SimulationCustomerFlowVariantUpdateParams,
    type SimulationCustomerFlowVariantDeleteParams as SimulationCustomerFlowVariantDeleteParams,
    type SimulationCustomerFlowVariantGetByIDParams as SimulationCustomerFlowVariantGetByIDParams,
    type SimulationCustomerFlowVariantSetDefaultParams as SimulationCustomerFlowVariantSetDefaultParams,
  };
}
