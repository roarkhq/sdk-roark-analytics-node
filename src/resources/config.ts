// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ConfigAPI from './config';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Config extends APIResource {
  /**
   * Reconcile a config-as-code bundle into the project. Submit the full desired set
   * of resources; resources already managed by config are updated, new ones created,
   * and (unless prune is false) config-managed resources absent from the bundle are
   * deleted. Identity is by name — no ids in the bundle.
   *
   * @example
   * ```ts
   * const response = await client.config.apply({
   *   resources: [{ kind: 'agent', name: 'x' }],
   * });
   * ```
   */
  apply(body: ConfigApplyParams, options?: RequestOptions): APIPromise<ConfigApplyResponse> {
    return this._client.post('/v1/config/apply', { body, ...options });
  }

  /**
   * Dry run for a config-as-code apply: returns the projected changes (create /
   * update / delete) for the submitted bundle without writing anything. Submit the
   * full desired set of resources; identity is by name — no ids in the bundle. Run
   * this before apply to preview what would change.
   *
   * @example
   * ```ts
   * const response = await client.config.diff({
   *   resources: [{ kind: 'agent', name: 'x' }],
   * });
   * ```
   */
  diff(body: ConfigDiffParams, options?: RequestOptions): APIPromise<ConfigDiffResponse> {
    return this._client.post('/v1/config/diff', { body, ...options });
  }
}

export interface Bundle {
  resources: Array<
    | Bundle.AgentConfig
    | Bundle.PersonaConfig
    | Bundle.ImprovFlowConfig
    | Bundle.ScriptedFlowConfig
    | Bundle.CollectorConfig
    | Bundle.MetricConfig
  >;

  prune?: boolean;
}

export namespace Bundle {
  export interface AgentConfig {
    kind: 'agent';

    name: string;

    customId?: string | null;

    description?: string | null;

    endpoints?: Array<AgentConfig.Endpoint>;
  }

  export namespace AgentConfig {
    export interface Endpoint {
      direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

      name: string;

      value: string;

      environment?: string;
    }
  }

  export interface PersonaConfig {
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

    age?: 'CHILD' | 'TEENAGER' | 'ADULT' | 'ELDERLY';

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

    secondaryLanguage?: 'EN';

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

  export interface ImprovFlowConfig {
    agents: Array<string>;

    happyPath: ImprovFlowConfig.HappyPath;

    kind: 'flow';

    name: string;

    type: 'improv';

    description?: string | null;

    edgeCases?: Array<ImprovFlowConfig.EdgeCase>;

    expectations?: Array<string>;

    title?: string;
  }

  export namespace ImprovFlowConfig {
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

  export interface ScriptedFlowConfig {
    graph: Array<ConfigAPI.ConfigFlowStep>;

    kind: 'flow';

    name: string;

    type: 'scripted';

    agents?: Array<string>;

    branchingMode?: 'DETERMINISTIC' | 'ADAPTIVE';

    description?: string | null;

    expectations?: Array<string>;

    title?: string;
  }

  export interface CollectorConfig {
    kind: 'collector';

    metrics: Array<string>;

    modality: 'call' | 'chat';

    name: string;

    filters?: Array<CollectorConfig.Filter>;

    status?: 'ACTIVE' | 'INACTIVE';
  }

  export namespace CollectorConfig {
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

  export interface MetricConfig {
    kind: 'metric';

    name: string;

    prompt: string;

    type: 'BOOLEAN' | 'SCALE' | 'NUMERIC' | 'TEXT' | 'CLASSIFICATION';

    contexts?: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    displayName?: string;

    falseLabel?: string;

    maxSelections?: number;

    options?: Array<MetricConfig.Option>;

    participantRole?: 'AGENT' | 'CUSTOMER';

    scaleLabels?: Array<MetricConfig.ScaleLabel>;

    scaleMax?: number;

    scaleMin?: number;

    scope?: 'GLOBAL' | 'PER_PARTICIPANT';

    trueLabel?: string;
  }

  export namespace MetricConfig {
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

export interface ConfigFlowStep {
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

  steps?: Array<ConfigAPI.ConfigFlowStep>;
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

export interface ConfigDiffResponse {
  data: ConfigDiffResponse.Data;
}

export namespace ConfigDiffResponse {
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

      detail?: string;
    }

    export interface Summary {
      create: number;

      delete: number;

      noop: number;

      update: number;
    }
  }
}

export interface ConfigApplyParams {
  resources: Array<
    | ConfigApplyParams.AgentConfig
    | ConfigApplyParams.PersonaConfig
    | ConfigApplyParams.ImprovFlowConfig
    | ConfigApplyParams.ScriptedFlowConfig
    | ConfigApplyParams.CollectorConfig
    | ConfigApplyParams.MetricConfig
  >;

  prune?: boolean;
}

export namespace ConfigApplyParams {
  export interface AgentConfig {
    kind: 'agent';

    name: string;

    customId?: string | null;

    description?: string | null;

    endpoints?: Array<AgentConfig.Endpoint>;
  }

  export namespace AgentConfig {
    export interface Endpoint {
      direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

      name: string;

      value: string;

      environment?: string;
    }
  }

  export interface PersonaConfig {
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

    age?: 'CHILD' | 'TEENAGER' | 'ADULT' | 'ELDERLY';

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

    secondaryLanguage?: 'EN';

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

  export interface ImprovFlowConfig {
    agents: Array<string>;

    happyPath: ImprovFlowConfig.HappyPath;

    kind: 'flow';

    name: string;

    type: 'improv';

    description?: string | null;

    edgeCases?: Array<ImprovFlowConfig.EdgeCase>;

    expectations?: Array<string>;

    title?: string;
  }

  export namespace ImprovFlowConfig {
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

  export interface ScriptedFlowConfig {
    graph: Array<ConfigFlowStep>;

    kind: 'flow';

    name: string;

    type: 'scripted';

    agents?: Array<string>;

    branchingMode?: 'DETERMINISTIC' | 'ADAPTIVE';

    description?: string | null;

    expectations?: Array<string>;

    title?: string;
  }

  export interface CollectorConfig {
    kind: 'collector';

    metrics: Array<string>;

    modality: 'call' | 'chat';

    name: string;

    filters?: Array<CollectorConfig.Filter>;

    status?: 'ACTIVE' | 'INACTIVE';
  }

  export namespace CollectorConfig {
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

  export interface MetricConfig {
    kind: 'metric';

    name: string;

    prompt: string;

    type: 'BOOLEAN' | 'SCALE' | 'NUMERIC' | 'TEXT' | 'CLASSIFICATION';

    contexts?: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    displayName?: string;

    falseLabel?: string;

    maxSelections?: number;

    options?: Array<MetricConfig.Option>;

    participantRole?: 'AGENT' | 'CUSTOMER';

    scaleLabels?: Array<MetricConfig.ScaleLabel>;

    scaleMax?: number;

    scaleMin?: number;

    scope?: 'GLOBAL' | 'PER_PARTICIPANT';

    trueLabel?: string;
  }

  export namespace MetricConfig {
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

export interface ConfigDiffParams {
  resources: Array<
    | ConfigDiffParams.AgentConfig
    | ConfigDiffParams.PersonaConfig
    | ConfigDiffParams.ImprovFlowConfig
    | ConfigDiffParams.ScriptedFlowConfig
    | ConfigDiffParams.CollectorConfig
    | ConfigDiffParams.MetricConfig
  >;

  prune?: boolean;
}

export namespace ConfigDiffParams {
  export interface AgentConfig {
    kind: 'agent';

    name: string;

    customId?: string | null;

    description?: string | null;

    endpoints?: Array<AgentConfig.Endpoint>;
  }

  export namespace AgentConfig {
    export interface Endpoint {
      direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

      name: string;

      value: string;

      environment?: string;
    }
  }

  export interface PersonaConfig {
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

    age?: 'CHILD' | 'TEENAGER' | 'ADULT' | 'ELDERLY';

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

    secondaryLanguage?: 'EN';

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

  export interface ImprovFlowConfig {
    agents: Array<string>;

    happyPath: ImprovFlowConfig.HappyPath;

    kind: 'flow';

    name: string;

    type: 'improv';

    description?: string | null;

    edgeCases?: Array<ImprovFlowConfig.EdgeCase>;

    expectations?: Array<string>;

    title?: string;
  }

  export namespace ImprovFlowConfig {
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

  export interface ScriptedFlowConfig {
    graph: Array<ConfigFlowStep>;

    kind: 'flow';

    name: string;

    type: 'scripted';

    agents?: Array<string>;

    branchingMode?: 'DETERMINISTIC' | 'ADAPTIVE';

    description?: string | null;

    expectations?: Array<string>;

    title?: string;
  }

  export interface CollectorConfig {
    kind: 'collector';

    metrics: Array<string>;

    modality: 'call' | 'chat';

    name: string;

    filters?: Array<CollectorConfig.Filter>;

    status?: 'ACTIVE' | 'INACTIVE';
  }

  export namespace CollectorConfig {
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

  export interface MetricConfig {
    kind: 'metric';

    name: string;

    prompt: string;

    type: 'BOOLEAN' | 'SCALE' | 'NUMERIC' | 'TEXT' | 'CLASSIFICATION';

    contexts?: Array<'CALL' | 'SEGMENT' | 'TURN'>;

    displayName?: string;

    falseLabel?: string;

    maxSelections?: number;

    options?: Array<MetricConfig.Option>;

    participantRole?: 'AGENT' | 'CUSTOMER';

    scaleLabels?: Array<MetricConfig.ScaleLabel>;

    scaleMax?: number;

    scaleMin?: number;

    scope?: 'GLOBAL' | 'PER_PARTICIPANT';

    trueLabel?: string;
  }

  export namespace MetricConfig {
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
    type ConfigFlowStep as ConfigFlowStep,
    type ConfigApplyResponse as ConfigApplyResponse,
    type ConfigDiffResponse as ConfigDiffResponse,
    type ConfigApplyParams as ConfigApplyParams,
    type ConfigDiffParams as ConfigDiffParams,
  };
}
