// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Config extends APIResource {
  /**
   * Reconcile a config-as-code bundle into the project. Submit the full desired set
   * of resources; resources already managed by config are updated, new ones created,
   * and (unless prune is false) config-managed resources absent from the bundle are
   * deleted. Identity is by name — no ids in the bundle.
   */
  apply(body: ConfigApplyParams, options?: RequestOptions): APIPromise<ConfigApplyResponse> {
    return this._client.post('/v1/config/apply', { body, ...options });
  }
}

export interface Bundle {
  resources: Array<
    | Bundle.UnionMember0
    | Bundle.UnionMember1
    | Bundle.UnionMember2
    | Bundle.UnionMember3
    | Bundle.UnionMember4
    | Bundle.UnionMember5
  >;

  prune?: boolean;
}

export namespace Bundle {
  export interface UnionMember0 {
    kind: 'agent';

    name: string;

    customId?: string | null;

    description?: string | null;

    endpoints?: Array<UnionMember0.Endpoint>;
  }

  export namespace UnionMember0 {
    export interface Endpoint {
      direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

      name: string;

      value: string;

      environment?: string;
    }
  }

  export interface UnionMember1 {
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

    gender: 'MALE' | 'FEMALE';

    kind: 'persona';

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

    name: string;

    backgroundNoise?:
      | 'NONE'
      | 'AIRPORT'
      | 'CHILDREN_PLAYING'
      | 'CITY'
      | 'COFFEE_SHOP'
      | 'DRIVING'
      | 'OFFICE'
      | 'THUNDERSTORM';

    backstoryPrompt?: string | null;

    baseEmotion?: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED';

    confirmationStyle?: 'EXPLICIT' | 'VAGUE';

    description?: string | null;

    displayName?: string;

    hasDisfluencies?: boolean;

    idleMessageMaxSpokenCount?: number;

    idleMessageResetCountOnUserSpeechEnabled?: boolean;

    idleMessages?: Array<string> | null;

    idleTimeoutSeconds?: number;

    intentClarity?: 'CLEAR' | 'INDIRECT' | 'VAGUE';

    memoryReliability?: 'HIGH' | 'LOW';

    properties?: { [key: string]: unknown };

    responseTiming?: 'RELAXED' | 'NORMAL' | 'QUICK';

    secondaryLanguage?: 'EN' | null;

    speechClarity?: 'CLEAR' | 'VAGUE' | 'RAMBLING';

    speechPace?: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

    understoodLanguages?: Array<
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
  }

  export interface UnionMember2 {
    agents: Array<string>;

    happyPath: UnionMember2.HappyPath;

    kind: 'flow';

    name: string;

    type: 'improv';

    description?: string | null;

    edgeCases?: Array<UnionMember2.EdgeCase>;

    expectations?: Array<string>;

    title?: string;
  }

  export namespace UnionMember2 {
    export interface HappyPath {
      environment: string;

      persona: string;

      expectations?: Array<string>;

      prompt?: string;

      title?: string;
    }

    export interface EdgeCase {
      name: string;

      environment?: string;

      expectations?: Array<string>;

      persona?: string;

      prompt?: string;

      title?: string;
    }
  }

  export interface UnionMember3 {
    graph: Array<UnionMember3.Graph>;

    kind: 'flow';

    name: string;

    type: 'scripted';

    agents?: Array<string>;

    branchingMode?: 'DETERMINISTIC' | 'ADAPTIVE';

    description?: string | null;

    expectations?: Array<string>;

    title?: string;
  }

  export namespace UnionMember3 {
    export interface Graph {
      type:
        | 'AGENT_TURN'
        | 'CUSTOMER_TURN'
        | 'CUSTOMER_FIRST_MESSAGE'
        | 'CUSTOMER_SILENCE'
        | 'CUSTOMER_DTMF'
        | 'VOICEMAIL'
        | 'SCENARIO_LINK';

      content?: string;

      dtmfDigits?: string;

      flow?: string;

      mergeInto?: Array<string>;

      ref?: string;

      silenceDurationSeconds?: number;

      steps?: Array<unknown>;
    }
  }

  export interface UnionMember4 {
    kind: 'collector';

    metrics: Array<string>;

    modality: 'call' | 'chat';

    name: string;

    filters?: Array<UnionMember4.Filter>;

    status?: 'ACTIVE' | 'INACTIVE';
  }

  export namespace UnionMember4 {
    export interface Filter {
      conditions: Array<Filter.Condition>;
    }

    export namespace Filter {
      export interface Condition {
        key: string;

        type: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION';

        operator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'CONTAINS'
          | 'STARTS_WITH'
          | 'GREATER_THAN'
          | 'LESS_THAN'
          | 'GREATER_THAN_OR_EQUALS'
          | 'LESS_THAN_OR_EQUALS';

        value?: string;
      }
    }
  }

  export interface UnionMember5 {
    kind: 'metric';

    name: string;

    prompt: string;

    type: 'BOOLEAN' | 'SCALE' | 'NUMERIC' | 'TEXT' | 'CLASSIFICATION';

    contexts?: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    displayName?: string;

    falseLabel?: string;

    maxSelections?: number;

    options?: Array<UnionMember5.Option>;

    participantRole?: 'AGENT' | 'CUSTOMER';

    scaleLabels?: Array<UnionMember5.ScaleLabel>;

    scaleMax?: number;

    scaleMin?: number;

    scope?: 'GLOBAL' | 'PER_PARTICIPANT';

    trueLabel?: string;
  }

  export namespace UnionMember5 {
    export interface Option {
      displayOrder: number;

      label: string;

      description?: string;
    }

    export interface ScaleLabel {
      displayOrder: number;

      label: string;

      rangeMax: number;

      rangeMin: number;

      colorHex?: string;

      description?: string;
    }
  }
}

export interface ConfigApplyResponse {
  data: ConfigApplyResponse.Data;
}

export namespace ConfigApplyResponse {
  export interface Data {
    changes: Array<Data.Change>;

    summary: Data.Summary;
  }

  export namespace Data {
    export interface Change {
      configKey: string;

      kind: 'agent' | 'persona' | 'flow' | 'collector' | 'metric';

      name: string;

      op: 'create' | 'update' | 'delete' | 'noop';

      status: 'applied' | 'skipped' | 'failed';

      id?: string;

      detail?: string;

      error?: string;
    }

    export interface Summary {
      create: number;

      delete: number;

      failed: number;

      noop: number;

      update: number;
    }
  }
}

export interface ConfigApplyParams {
  resources: Array<
    | ConfigApplyParams.UnionMember0
    | ConfigApplyParams.UnionMember1
    | ConfigApplyParams.UnionMember2
    | ConfigApplyParams.UnionMember3
    | ConfigApplyParams.UnionMember4
    | ConfigApplyParams.UnionMember5
  >;

  prune?: boolean;
}

export namespace ConfigApplyParams {
  export interface UnionMember0 {
    kind: 'agent';

    name: string;

    customId?: string | null;

    description?: string | null;

    endpoints?: Array<UnionMember0.Endpoint>;
  }

  export namespace UnionMember0 {
    export interface Endpoint {
      direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

      name: string;

      value: string;

      environment?: string;
    }
  }

  export interface UnionMember1 {
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

    gender: 'MALE' | 'FEMALE';

    kind: 'persona';

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

    name: string;

    backgroundNoise?:
      | 'NONE'
      | 'AIRPORT'
      | 'CHILDREN_PLAYING'
      | 'CITY'
      | 'COFFEE_SHOP'
      | 'DRIVING'
      | 'OFFICE'
      | 'THUNDERSTORM';

    backstoryPrompt?: string | null;

    baseEmotion?: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED';

    confirmationStyle?: 'EXPLICIT' | 'VAGUE';

    description?: string | null;

    displayName?: string;

    hasDisfluencies?: boolean;

    idleMessageMaxSpokenCount?: number;

    idleMessageResetCountOnUserSpeechEnabled?: boolean;

    idleMessages?: Array<string> | null;

    idleTimeoutSeconds?: number;

    intentClarity?: 'CLEAR' | 'INDIRECT' | 'VAGUE';

    memoryReliability?: 'HIGH' | 'LOW';

    properties?: { [key: string]: unknown };

    responseTiming?: 'RELAXED' | 'NORMAL' | 'QUICK';

    secondaryLanguage?: 'EN' | null;

    speechClarity?: 'CLEAR' | 'VAGUE' | 'RAMBLING';

    speechPace?: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';

    understoodLanguages?: Array<
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
  }

  export interface UnionMember2 {
    agents: Array<string>;

    happyPath: UnionMember2.HappyPath;

    kind: 'flow';

    name: string;

    type: 'improv';

    description?: string | null;

    edgeCases?: Array<UnionMember2.EdgeCase>;

    expectations?: Array<string>;

    title?: string;
  }

  export namespace UnionMember2 {
    export interface HappyPath {
      environment: string;

      persona: string;

      expectations?: Array<string>;

      prompt?: string;

      title?: string;
    }

    export interface EdgeCase {
      name: string;

      environment?: string;

      expectations?: Array<string>;

      persona?: string;

      prompt?: string;

      title?: string;
    }
  }

  export interface UnionMember3 {
    graph: Array<UnionMember3.Graph>;

    kind: 'flow';

    name: string;

    type: 'scripted';

    agents?: Array<string>;

    branchingMode?: 'DETERMINISTIC' | 'ADAPTIVE';

    description?: string | null;

    expectations?: Array<string>;

    title?: string;
  }

  export namespace UnionMember3 {
    export interface Graph {
      type:
        | 'AGENT_TURN'
        | 'CUSTOMER_TURN'
        | 'CUSTOMER_FIRST_MESSAGE'
        | 'CUSTOMER_SILENCE'
        | 'CUSTOMER_DTMF'
        | 'VOICEMAIL'
        | 'SCENARIO_LINK';

      content?: string;

      dtmfDigits?: string;

      flow?: string;

      mergeInto?: Array<string>;

      ref?: string;

      silenceDurationSeconds?: number;

      steps?: Array<unknown>;
    }
  }

  export interface UnionMember4 {
    kind: 'collector';

    metrics: Array<string>;

    modality: 'call' | 'chat';

    name: string;

    filters?: Array<UnionMember4.Filter>;

    status?: 'ACTIVE' | 'INACTIVE';
  }

  export namespace UnionMember4 {
    export interface Filter {
      conditions: Array<Filter.Condition>;
    }

    export namespace Filter {
      export interface Condition {
        key: string;

        type: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION';

        operator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'CONTAINS'
          | 'STARTS_WITH'
          | 'GREATER_THAN'
          | 'LESS_THAN'
          | 'GREATER_THAN_OR_EQUALS'
          | 'LESS_THAN_OR_EQUALS';

        value?: string;
      }
    }
  }

  export interface UnionMember5 {
    kind: 'metric';

    name: string;

    prompt: string;

    type: 'BOOLEAN' | 'SCALE' | 'NUMERIC' | 'TEXT' | 'CLASSIFICATION';

    contexts?: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    displayName?: string;

    falseLabel?: string;

    maxSelections?: number;

    options?: Array<UnionMember5.Option>;

    participantRole?: 'AGENT' | 'CUSTOMER';

    scaleLabels?: Array<UnionMember5.ScaleLabel>;

    scaleMax?: number;

    scaleMin?: number;

    scope?: 'GLOBAL' | 'PER_PARTICIPANT';

    trueLabel?: string;
  }

  export namespace UnionMember5 {
    export interface Option {
      displayOrder: number;

      label: string;

      description?: string;
    }

    export interface ScaleLabel {
      displayOrder: number;

      label: string;

      rangeMax: number;

      rangeMin: number;

      colorHex?: string;

      description?: string;
    }
  }
}

export declare namespace Config {
  export {
    type Bundle as Bundle,
    type ConfigApplyResponse as ConfigApplyResponse,
    type ConfigApplyParams as ConfigApplyParams,
  };
}
