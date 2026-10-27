// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import * as ConfigAPI from './config';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Config extends APIResource {
  /**
   * Reconcile a config-as-code bundle. With a PROJECT API key, submit project-scoped
   * resources (agents, personas, flows, collectors, metrics, ...). With an
   * ORGANIZATION API key, submit `kind: project` resources, each optionally carrying
   * its members and its own nested `resources`. Submit the full desired set; managed
   * resources are updated, new ones created, and (unless prune is false) managed
   * resources absent from the bundle are deleted. Identity is by name.
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
   * Dry run for an apply: returns the projected changes (create / update / delete)
   * for the submitted bundle without writing anything. Works for both project and
   * organization keys.
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
    | Bundle.HTTPRequestDefinitionConfig
    | Bundle.PersonaConfig
    | Bundle.ImprovFlowConfig
    | Bundle.ScriptedFlowConfig
    | Bundle.CollectorConfig
    | Bundle.MetricConfig
    | Bundle.APICheckMetricConfig
    | Bundle.SimulationPlanConfig
    | Bundle.QaSimulationPlanConfig
    | Bundle.SimulationGroupConfig
    | Bundle.AlertConfig
    | Bundle.ToolConfig
    | Bundle.DashboardConfig
    | Bundle.ProjectConfig
  >;

  prune?: boolean;
}

export namespace Bundle {
  export interface AgentConfig {
    kind: 'agent';

    name: string;

    customId?: string | null;

    description?: string | null;

    displayName?: string;

    endpoints?: Array<AgentConfig.Endpoint>;

    prompt?: string | null;
  }

  export namespace AgentConfig {
    export interface Endpoint {
      value: string;

      direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

      environment?: string;

      outboundDialHttpRequestDefinition?: string;

      outboundDialType?: 'NONE' | 'HTTP_REQUEST';

      type?: 'PHONE' | 'WEBSOCKET';
    }
  }

  export interface HTTPRequestDefinitionConfig {
    kind: 'httpRequestDefinition';

    name: string;

    url: string;

    body?: string;

    description?: string | null;

    headers?: { [key: string]: string };

    method?: 'POST' | 'PUT' | 'PATCH' | 'GET';
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
      | 'CONSTRUCTION'
      | 'CRYING_BABY'
      | 'DRIVING'
      | 'LIBRARY'
      | 'OFFICE'
      | 'THUNDERSTORM'
      | 'TRAIN';

    backstoryPrompt?: string | null;

    baseEmotion?:
      | 'NEUTRAL'
      | 'CHEERFUL'
      | 'CONFUSED'
      | 'FRUSTRATED'
      | 'SKEPTICAL'
      | 'RUSHED'
      | 'DISTRACTED'
      | 'ANGRY'
      | 'ANXIOUS'
      | 'SAD';

    confirmationStyle?: 'EXPLICIT' | 'VAGUE';

    description?: string | null;

    displayName?: string;

    hasDisfluencies?: boolean;

    idleMessageMaxSpokenCount?: number;

    idleMessageResetCountOnUserSpeechEnabled?: boolean;

    idleMessages?: Array<string> | null;

    idleTimeoutSeconds?: number;

    intentClarity?: 'CLEAR' | 'INDIRECT' | 'VAGUE';

    interruption?: 'OFF' | 'BACKCHANNEL' | 'OCCASIONAL' | 'HEAVY';

    memoryReliability?: 'HIGH' | 'LOW';

    properties?: { [key: string]: unknown };

    responseTiming?: 'RELAXED' | 'NORMAL' | 'QUICK' | 'BARGE_IN';

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

      includeFlowExpectations?: boolean;

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

    adherence?: 'LOOSE' | 'STRICT';

    agents?: Array<string>;

    branchingMode?: 'DETERMINISTIC' | 'ADAPTIVE';

    description?: string | null;

    expectations?: Array<string>;

    offScript?: ScriptedFlowConfig.OffScript;

    title?: string;
  }

  export namespace ScriptedFlowConfig {
    export interface OffScript {
      maxAttempts?: number;

      reaction?: 'STAY_SILENT' | 'REPEAT' | 'RESPOND' | 'SAY';

      sayLine?: string;

      then?: 'HANG_UP' | 'MOVE_ON' | 'ADAPT' | 'HANG_UP_INVALIDATE';

      waitSeconds?: number;
    }
  }

  export interface CollectorConfig {
    kind: 'collector';

    metrics: Array<string | CollectorConfig.CollectorMetricConfig>;

    modality: 'call' | 'chat';

    name: string;

    displayName?: string;

    filters?: Array<CollectorConfig.Filter>;

    status?: 'ACTIVE' | 'INACTIVE';
  }

  export namespace CollectorConfig {
    export interface CollectorMetricConfig {
      metric: string;

      excludedPhrases?: Array<string>;

      screeningBrief?: string;

      verifiedProperties?: Array<string>;

      voicemailScript?: string;
    }

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

    calculationType?: 'LLM_JUDGE';

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

  export interface APICheckMetricConfig {
    calculationType: 'HTTP_REQUEST';

    httpRequest: APICheckMetricConfig.HTTPRequest;

    kind: 'metric';

    name: string;

    displayName?: string;

    falseLabel?: string;

    trueLabel?: string;
  }

  export namespace APICheckMetricConfig {
    export interface HTTPRequest {
      url: string;

      body?: string;

      headers?: { [key: string]: string };

      method?: 'GET' | 'POST';
    }
  }

  export interface SimulationPlanConfig {
    agentEndpoints: Array<SimulationPlanConfig.AgentEndpoint>;

    direction: 'INBOUND' | 'OUTBOUND';

    flows: Array<SimulationPlanConfig.Flow>;

    kind: 'simulationPlan';

    maxDurationSeconds: number;

    metrics: Array<string>;

    name: string;

    description?: string | null;

    endCallPhrases?: Array<string>;

    endCallReasons?: Array<string>;

    enrichWithLiveConversation?: boolean;

    executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

    includeAutomaticMetrics?: boolean;

    includeFlowMetrics?: boolean;

    iterations?: number;

    maxConcurrentJobs?: number;

    maxNoResponseRetries?: number;

    noResponseRetryBackoffSeconds?: number;

    notify?: SimulationPlanConfig.Notify;

    schedule?:
      | SimulationPlanConfig.UnionMember0
      | SimulationPlanConfig.UnionMember1
      | SimulationPlanConfig.UnionMember2
      | SimulationPlanConfig.UnionMember3
      | SimulationPlanConfig.UnionMember4
      | SimulationPlanConfig.UnionMember5;

    silenceTimeoutSeconds?: number;

    template?: 'manual';
  }

  export namespace SimulationPlanConfig {
    export interface AgentEndpoint {
      agent: string;

      direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

      value?: string;
    }

    export interface Flow {
      edgeCases?: Array<string>;

      flow?: string;

      happyPath?: boolean;

      personaOverride?: string;

      system?: string;
    }

    export interface Notify {
      email?: boolean | Array<string>;

      slack?: Array<Notify.Slack>;
    }

    export namespace Notify {
      export interface Slack {
        channelId: string;

        channelName: string;
      }
    }

    export interface UnionMember0 {
      type: 'hourly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      minute?: number;

      timezone?: string;
    }

    export interface UnionMember1 {
      everyMinutes: number;

      type: 'interval';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember2 {
      time: string;

      type: 'daily';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember3 {
      days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

      time: string;

      type: 'weekly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember4 {
      dayOfMonth: number;

      time: string;

      type: 'monthly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember5 {
      at: string;

      type: 'once';

      enabled?: boolean;

      timezone?: string;
    }
  }

  export interface QaSimulationPlanConfig {
    agentEndpoints: Array<QaSimulationPlanConfig.AgentEndpoint>;

    direction: 'INBOUND' | 'OUTBOUND';

    environment: string;

    kind: 'simulationPlan';

    maxDurationSeconds: number;

    name: string;

    persona: string;

    questions: Array<QaSimulationPlanConfig.Question>;

    template: 'question-answer-check';

    description?: string | null;

    endCallPhrases?: Array<string>;

    endCallReasons?: Array<string>;

    enrichWithLiveConversation?: boolean;

    executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

    gradeWithKnowledgeBase?: boolean;

    includeAutomaticMetrics?: boolean;

    includeFlowMetrics?: boolean;

    iterations?: number;

    maxConcurrentJobs?: number;

    maxNoResponseRetries?: number;

    metrics?: Array<string>;

    noResponseRetryBackoffSeconds?: number;

    notify?: QaSimulationPlanConfig.Notify;

    schedule?:
      | QaSimulationPlanConfig.UnionMember0
      | QaSimulationPlanConfig.UnionMember1
      | QaSimulationPlanConfig.UnionMember2
      | QaSimulationPlanConfig.UnionMember3
      | QaSimulationPlanConfig.UnionMember4
      | QaSimulationPlanConfig.UnionMember5;

    silenceTimeoutSeconds?: number;
  }

  export namespace QaSimulationPlanConfig {
    export interface AgentEndpoint {
      agent: string;

      direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

      value?: string;
    }

    export interface Question {
      ask: string;

      expect?: string;

      name?: string;
    }

    export interface Notify {
      email?: boolean | Array<string>;

      slack?: Array<Notify.Slack>;
    }

    export namespace Notify {
      export interface Slack {
        channelId: string;

        channelName: string;
      }
    }

    export interface UnionMember0 {
      type: 'hourly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      minute?: number;

      timezone?: string;
    }

    export interface UnionMember1 {
      everyMinutes: number;

      type: 'interval';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember2 {
      time: string;

      type: 'daily';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember3 {
      days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

      time: string;

      type: 'weekly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember4 {
      dayOfMonth: number;

      time: string;

      type: 'monthly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember5 {
      at: string;

      type: 'once';

      enabled?: boolean;

      timezone?: string;
    }
  }

  export interface SimulationGroupConfig {
    kind: 'simulationGroup';

    name: string;

    plans: Array<string>;

    description?: string | null;

    notify?: SimulationGroupConfig.Notify;

    schedule?:
      | SimulationGroupConfig.UnionMember0
      | SimulationGroupConfig.UnionMember1
      | SimulationGroupConfig.UnionMember2
      | SimulationGroupConfig.UnionMember3
      | SimulationGroupConfig.UnionMember4
      | SimulationGroupConfig.UnionMember5;
  }

  export namespace SimulationGroupConfig {
    export interface Notify {
      email?: boolean | Array<string>;

      slack?: Array<Notify.Slack>;
    }

    export namespace Notify {
      export interface Slack {
        channelId: string;

        channelName: string;
      }
    }

    export interface UnionMember0 {
      type: 'hourly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      minute?: number;

      timezone?: string;
    }

    export interface UnionMember1 {
      everyMinutes: number;

      type: 'interval';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember2 {
      time: string;

      type: 'daily';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember3 {
      days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

      time: string;

      type: 'weekly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember4 {
      dayOfMonth: number;

      time: string;

      type: 'monthly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember5 {
      at: string;

      type: 'once';

      enabled?: boolean;

      timezone?: string;
    }
  }

  export interface AlertConfig {
    kind: 'alert';

    name: string;

    trigger:
      | AlertConfig.AlertThresholdTrigger
      | AlertConfig.AlertEventTrigger
      | AlertConfig.AlertSimulationTrigger;

    actions?: AlertConfig.Actions;

    displayName?: string;

    enabled?: boolean;
  }

  export namespace AlertConfig {
    export interface AlertThresholdTrigger {
      aggregation: 'COUNT' | 'RATE_PER_MINUTE' | 'MEAN';

      metric: string;

      operator: 'GT' | 'GTE' | 'LT' | 'LTE';

      thresholdValue: number;

      type: 'threshold';

      windowMinutes: number;

      consecutiveOpen?: number;

      consecutiveResolve?: number;

      grouping?: 'NONE' | 'BY_AGENT';

      metricVariant?: string;

      minSampleSize?: number;
    }

    export interface AlertEventTrigger {
      events: Array<
        | 'CALL_ANALYSIS_COMPLETED'
        | 'CALL_ANALYSIS_FAILED'
        | 'CALL_ANALYSIS_CANCELLED'
        | 'SIMULATION_RUN_PLAN_JOB_STARTED'
        | 'SIMULATION_RUN_PLAN_JOB_COMPLETED'
        | 'SIMULATION_RUN_PLAN_JOB_FAILED'
        | 'SIMULATION_RUN_PLAN_JOB_CANCELLED'
        | 'SIMULATION_JOB_STARTED'
        | 'SIMULATION_JOB_COMPLETED'
        | 'SIMULATION_JOB_FAILED'
        | 'SIMULATION_JOB_CANCELLED'
        | 'METRIC_COLLECTION_JOB_COMPLETED'
        | 'METRIC_COLLECTION_JOB_FAILED'
        | 'CHAT_ANALYSIS_COMPLETED'
        | 'CHAT_ANALYSIS_FAILED'
        | 'ISSUE_OPENED'
        | 'ISSUE_RESOLVED'
      >;

      type: 'event';
    }

    export interface AlertSimulationTrigger {
      conditions: Array<'SUCCESS' | 'FAILURE' | 'THRESHOLD_FAILED'>;

      type: 'simulation';

      deliveryFormat?: 'MESSAGE' | 'PDF';

      plan?: string;
    }

    export interface Actions {
      slack?: Array<Actions.Slack>;

      webhooks?: Array<string>;
    }

    export namespace Actions {
      export interface Slack {
        channelId: string;

        channelName: string;
      }
    }
  }

  export interface ToolConfig {
    kind: 'tool';

    name: string;

    agent?: string;

    description?: string | null;

    expectedResult?: string | null;

    handler?: ToolConfig.Handler;

    invocationCriteria?: string | null;

    parameters?: { [key: string]: 'string' | 'number' | 'boolean' };
  }

  export namespace ToolConfig {
    export interface Handler {
      type: 'http';

      url: string;

      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    }
  }

  export interface DashboardConfig {
    kind: 'dashboard';

    name: string;

    description?: string;

    displayName?: string;

    filters?: Array<DashboardConfig.Filter>;

    isDefault?: boolean;

    timeRange?:
      | DashboardConfig.UnionMember0
      | DashboardConfig.UnionMember1
      | DashboardConfig.UnionMember2
      | DashboardConfig.UnionMember3;

    widgets?: Array<DashboardConfig.Widget>;
  }

  export namespace DashboardConfig {
    export interface Filter {
      type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

      operator?:
        | 'EQUALS'
        | 'NOT_EQUALS'
        | 'GREATER_THAN'
        | 'GREATER_THAN_OR_EQUAL_TO'
        | 'LESS_THAN'
        | 'LESS_THAN_OR_EQUAL_TO'
        | 'CONTAINS'
        | 'STARTS_WITH'
        | 'IS_SET'
        | 'IS_NOT_SET';

      property?: string;

      value?: string | number | boolean;
    }

    export interface UnionMember0 {
      type: 'LAST';

      unit: 'DAYS' | 'WEEKS' | 'MONTHS';

      value: number;
    }

    export interface UnionMember1 {
      period:
        | 'TODAY'
        | 'YESTERDAY'
        | 'THIS_WEEK'
        | 'LAST_WEEK'
        | 'THIS_MONTH'
        | 'LAST_MONTH'
        | 'THIS_YEAR'
        | 'LAST_YEAR';

      type: 'CALENDAR_ALIGNED';
    }

    export interface UnionMember2 {
      from: string;

      to: string;

      type: 'FIXED';
    }

    export interface UnionMember3 {
      from: string;

      type: 'SINCE';
    }

    export interface Widget {
      measures: Array<Widget.Measure>;

      name: string;

      comparisonGroups?: Array<Widget.ComparisonGroup>;

      comparisonMode?: 'NONE' | 'PREVIOUS_PERIOD';

      description?: string;

      display?: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

      filters?: Array<Widget.Filter>;

      interval?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

      size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
    }

    export namespace Widget {
      export interface Measure {
        aggregation?: 'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE';

        breakdown?: Measure.Breakdown;

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

        distinctBy?: 'NONE' | 'CALL';

        filters?: Array<Measure.Filter>;

        isBaseline?: boolean;

        metric?: string;

        nestedAggregation?: 'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE';

        nestedAggregationPercentile?: number;

        passOperator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUAL_TO'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUAL_TO'
          | 'CONTAINS'
          | 'STARTS_WITH';

        passValue?: string | number | boolean;

        percentile?: number;

        type?: 'METRIC' | 'CONVERSATION' | 'UPTIME';
      }

      export namespace Measure {
        export interface Breakdown {
          type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'DATASET';

          property?: string;
        }

        export interface Filter {
          type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

          operator?:
            | 'EQUALS'
            | 'NOT_EQUALS'
            | 'GREATER_THAN'
            | 'GREATER_THAN_OR_EQUAL_TO'
            | 'LESS_THAN'
            | 'LESS_THAN_OR_EQUAL_TO'
            | 'CONTAINS'
            | 'STARTS_WITH'
            | 'IS_SET'
            | 'IS_NOT_SET';

          property?: string;

          value?: string | number | boolean;
        }
      }

      export interface ComparisonGroup {
        filters: Array<ComparisonGroup.Filter>;

        name: string;

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
      }

      export namespace ComparisonGroup {
        export interface Filter {
          type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

          operator?:
            | 'EQUALS'
            | 'NOT_EQUALS'
            | 'GREATER_THAN'
            | 'GREATER_THAN_OR_EQUAL_TO'
            | 'LESS_THAN'
            | 'LESS_THAN_OR_EQUAL_TO'
            | 'CONTAINS'
            | 'STARTS_WITH'
            | 'IS_SET'
            | 'IS_NOT_SET';

          property?: string;

          value?: string | number | boolean;
        }
      }

      export interface Filter {
        type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

        operator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUAL_TO'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUAL_TO'
          | 'CONTAINS'
          | 'STARTS_WITH'
          | 'IS_SET'
          | 'IS_NOT_SET';

        property?: string;

        value?: string | number | boolean;
      }
    }
  }

  export interface ProjectConfig {
    kind: 'project';

    name: string;

    category?:
      | 'HEALTHCARE'
      | 'FINANCIAL'
      | 'RETAIL'
      | 'HOSPITALITY'
      | 'AUTOMOTIVE'
      | 'GOVERNMENT'
      | 'EDUCATION'
      | 'REAL_ESTATE'
      | 'OTHER';

    dataStorageRegion?: 'US_EAST_1' | 'EU_WEST_1';

    description?: string;

    displayName?: string;

    members?: Array<ProjectConfig.Member>;

    resources?: Array<
      | ProjectConfig.AgentConfig
      | ProjectConfig.HTTPRequestDefinitionConfig
      | ProjectConfig.PersonaConfig
      | ProjectConfig.ImprovFlowConfig
      | ProjectConfig.ScriptedFlowConfig
      | ProjectConfig.CollectorConfig
      | ProjectConfig.MetricConfig
      | ProjectConfig.APICheckMetricConfig
      | ProjectConfig.SimulationPlanConfig
      | ProjectConfig.QaSimulationPlanConfig
      | ProjectConfig.SimulationGroupConfig
      | ProjectConfig.AlertConfig
      | ProjectConfig.ToolConfig
      | ProjectConfig.DashboardConfig
    >;
  }

  export namespace ProjectConfig {
    export interface Member {
      email: string;

      role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';
    }

    export interface AgentConfig {
      kind: 'agent';

      name: string;

      customId?: string | null;

      description?: string | null;

      displayName?: string;

      endpoints?: Array<AgentConfig.Endpoint>;

      prompt?: string | null;
    }

    export namespace AgentConfig {
      export interface Endpoint {
        value: string;

        direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

        environment?: string;

        outboundDialHttpRequestDefinition?: string;

        outboundDialType?: 'NONE' | 'HTTP_REQUEST';

        type?: 'PHONE' | 'WEBSOCKET';
      }
    }

    export interface HTTPRequestDefinitionConfig {
      kind: 'httpRequestDefinition';

      name: string;

      url: string;

      body?: string;

      description?: string | null;

      headers?: { [key: string]: string };

      method?: 'POST' | 'PUT' | 'PATCH' | 'GET';
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
        | 'CONSTRUCTION'
        | 'CRYING_BABY'
        | 'DRIVING'
        | 'LIBRARY'
        | 'OFFICE'
        | 'THUNDERSTORM'
        | 'TRAIN';

      backstoryPrompt?: string | null;

      baseEmotion?:
        | 'NEUTRAL'
        | 'CHEERFUL'
        | 'CONFUSED'
        | 'FRUSTRATED'
        | 'SKEPTICAL'
        | 'RUSHED'
        | 'DISTRACTED'
        | 'ANGRY'
        | 'ANXIOUS'
        | 'SAD';

      confirmationStyle?: 'EXPLICIT' | 'VAGUE';

      description?: string | null;

      displayName?: string;

      hasDisfluencies?: boolean;

      idleMessageMaxSpokenCount?: number;

      idleMessageResetCountOnUserSpeechEnabled?: boolean;

      idleMessages?: Array<string> | null;

      idleTimeoutSeconds?: number;

      intentClarity?: 'CLEAR' | 'INDIRECT' | 'VAGUE';

      interruption?: 'OFF' | 'BACKCHANNEL' | 'OCCASIONAL' | 'HEAVY';

      memoryReliability?: 'HIGH' | 'LOW';

      properties?: { [key: string]: unknown };

      responseTiming?: 'RELAXED' | 'NORMAL' | 'QUICK' | 'BARGE_IN';

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

        includeFlowExpectations?: boolean;

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

      adherence?: 'LOOSE' | 'STRICT';

      agents?: Array<string>;

      branchingMode?: 'DETERMINISTIC' | 'ADAPTIVE';

      description?: string | null;

      expectations?: Array<string>;

      offScript?: ScriptedFlowConfig.OffScript;

      title?: string;
    }

    export namespace ScriptedFlowConfig {
      export interface OffScript {
        maxAttempts?: number;

        reaction?: 'STAY_SILENT' | 'REPEAT' | 'RESPOND' | 'SAY';

        sayLine?: string;

        then?: 'HANG_UP' | 'MOVE_ON' | 'ADAPT' | 'HANG_UP_INVALIDATE';

        waitSeconds?: number;
      }
    }

    export interface CollectorConfig {
      kind: 'collector';

      metrics: Array<string | CollectorConfig.CollectorMetricConfig>;

      modality: 'call' | 'chat';

      name: string;

      displayName?: string;

      filters?: Array<CollectorConfig.Filter>;

      status?: 'ACTIVE' | 'INACTIVE';
    }

    export namespace CollectorConfig {
      export interface CollectorMetricConfig {
        metric: string;

        excludedPhrases?: Array<string>;

        screeningBrief?: string;

        verifiedProperties?: Array<string>;

        voicemailScript?: string;
      }

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

      calculationType?: 'LLM_JUDGE';

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

    export interface APICheckMetricConfig {
      calculationType: 'HTTP_REQUEST';

      httpRequest: APICheckMetricConfig.HTTPRequest;

      kind: 'metric';

      name: string;

      displayName?: string;

      falseLabel?: string;

      trueLabel?: string;
    }

    export namespace APICheckMetricConfig {
      export interface HTTPRequest {
        url: string;

        body?: string;

        headers?: { [key: string]: string };

        method?: 'GET' | 'POST';
      }
    }

    export interface SimulationPlanConfig {
      agentEndpoints: Array<SimulationPlanConfig.AgentEndpoint>;

      direction: 'INBOUND' | 'OUTBOUND';

      flows: Array<SimulationPlanConfig.Flow>;

      kind: 'simulationPlan';

      maxDurationSeconds: number;

      metrics: Array<string>;

      name: string;

      description?: string | null;

      endCallPhrases?: Array<string>;

      endCallReasons?: Array<string>;

      enrichWithLiveConversation?: boolean;

      executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

      includeAutomaticMetrics?: boolean;

      includeFlowMetrics?: boolean;

      iterations?: number;

      maxConcurrentJobs?: number;

      maxNoResponseRetries?: number;

      noResponseRetryBackoffSeconds?: number;

      notify?: SimulationPlanConfig.Notify;

      schedule?:
        | SimulationPlanConfig.UnionMember0
        | SimulationPlanConfig.UnionMember1
        | SimulationPlanConfig.UnionMember2
        | SimulationPlanConfig.UnionMember3
        | SimulationPlanConfig.UnionMember4
        | SimulationPlanConfig.UnionMember5;

      silenceTimeoutSeconds?: number;

      template?: 'manual';
    }

    export namespace SimulationPlanConfig {
      export interface AgentEndpoint {
        agent: string;

        direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

        value?: string;
      }

      export interface Flow {
        edgeCases?: Array<string>;

        flow?: string;

        happyPath?: boolean;

        personaOverride?: string;

        system?: string;
      }

      export interface Notify {
        email?: boolean | Array<string>;

        slack?: Array<Notify.Slack>;
      }

      export namespace Notify {
        export interface Slack {
          channelId: string;

          channelName: string;
        }
      }

      export interface UnionMember0 {
        type: 'hourly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        minute?: number;

        timezone?: string;
      }

      export interface UnionMember1 {
        everyMinutes: number;

        type: 'interval';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember2 {
        time: string;

        type: 'daily';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember3 {
        days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

        time: string;

        type: 'weekly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember4 {
        dayOfMonth: number;

        time: string;

        type: 'monthly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember5 {
        at: string;

        type: 'once';

        enabled?: boolean;

        timezone?: string;
      }
    }

    export interface QaSimulationPlanConfig {
      agentEndpoints: Array<QaSimulationPlanConfig.AgentEndpoint>;

      direction: 'INBOUND' | 'OUTBOUND';

      environment: string;

      kind: 'simulationPlan';

      maxDurationSeconds: number;

      name: string;

      persona: string;

      questions: Array<QaSimulationPlanConfig.Question>;

      template: 'question-answer-check';

      description?: string | null;

      endCallPhrases?: Array<string>;

      endCallReasons?: Array<string>;

      enrichWithLiveConversation?: boolean;

      executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

      gradeWithKnowledgeBase?: boolean;

      includeAutomaticMetrics?: boolean;

      includeFlowMetrics?: boolean;

      iterations?: number;

      maxConcurrentJobs?: number;

      maxNoResponseRetries?: number;

      metrics?: Array<string>;

      noResponseRetryBackoffSeconds?: number;

      notify?: QaSimulationPlanConfig.Notify;

      schedule?:
        | QaSimulationPlanConfig.UnionMember0
        | QaSimulationPlanConfig.UnionMember1
        | QaSimulationPlanConfig.UnionMember2
        | QaSimulationPlanConfig.UnionMember3
        | QaSimulationPlanConfig.UnionMember4
        | QaSimulationPlanConfig.UnionMember5;

      silenceTimeoutSeconds?: number;
    }

    export namespace QaSimulationPlanConfig {
      export interface AgentEndpoint {
        agent: string;

        direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

        value?: string;
      }

      export interface Question {
        ask: string;

        expect?: string;

        name?: string;
      }

      export interface Notify {
        email?: boolean | Array<string>;

        slack?: Array<Notify.Slack>;
      }

      export namespace Notify {
        export interface Slack {
          channelId: string;

          channelName: string;
        }
      }

      export interface UnionMember0 {
        type: 'hourly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        minute?: number;

        timezone?: string;
      }

      export interface UnionMember1 {
        everyMinutes: number;

        type: 'interval';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember2 {
        time: string;

        type: 'daily';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember3 {
        days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

        time: string;

        type: 'weekly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember4 {
        dayOfMonth: number;

        time: string;

        type: 'monthly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember5 {
        at: string;

        type: 'once';

        enabled?: boolean;

        timezone?: string;
      }
    }

    export interface SimulationGroupConfig {
      kind: 'simulationGroup';

      name: string;

      plans: Array<string>;

      description?: string | null;

      notify?: SimulationGroupConfig.Notify;

      schedule?:
        | SimulationGroupConfig.UnionMember0
        | SimulationGroupConfig.UnionMember1
        | SimulationGroupConfig.UnionMember2
        | SimulationGroupConfig.UnionMember3
        | SimulationGroupConfig.UnionMember4
        | SimulationGroupConfig.UnionMember5;
    }

    export namespace SimulationGroupConfig {
      export interface Notify {
        email?: boolean | Array<string>;

        slack?: Array<Notify.Slack>;
      }

      export namespace Notify {
        export interface Slack {
          channelId: string;

          channelName: string;
        }
      }

      export interface UnionMember0 {
        type: 'hourly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        minute?: number;

        timezone?: string;
      }

      export interface UnionMember1 {
        everyMinutes: number;

        type: 'interval';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember2 {
        time: string;

        type: 'daily';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember3 {
        days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

        time: string;

        type: 'weekly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember4 {
        dayOfMonth: number;

        time: string;

        type: 'monthly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember5 {
        at: string;

        type: 'once';

        enabled?: boolean;

        timezone?: string;
      }
    }

    export interface AlertConfig {
      kind: 'alert';

      name: string;

      trigger:
        | AlertConfig.AlertThresholdTrigger
        | AlertConfig.AlertEventTrigger
        | AlertConfig.AlertSimulationTrigger;

      actions?: AlertConfig.Actions;

      displayName?: string;

      enabled?: boolean;
    }

    export namespace AlertConfig {
      export interface AlertThresholdTrigger {
        aggregation: 'COUNT' | 'RATE_PER_MINUTE' | 'MEAN';

        metric: string;

        operator: 'GT' | 'GTE' | 'LT' | 'LTE';

        thresholdValue: number;

        type: 'threshold';

        windowMinutes: number;

        consecutiveOpen?: number;

        consecutiveResolve?: number;

        grouping?: 'NONE' | 'BY_AGENT';

        metricVariant?: string;

        minSampleSize?: number;
      }

      export interface AlertEventTrigger {
        events: Array<
          | 'CALL_ANALYSIS_COMPLETED'
          | 'CALL_ANALYSIS_FAILED'
          | 'CALL_ANALYSIS_CANCELLED'
          | 'SIMULATION_RUN_PLAN_JOB_STARTED'
          | 'SIMULATION_RUN_PLAN_JOB_COMPLETED'
          | 'SIMULATION_RUN_PLAN_JOB_FAILED'
          | 'SIMULATION_RUN_PLAN_JOB_CANCELLED'
          | 'SIMULATION_JOB_STARTED'
          | 'SIMULATION_JOB_COMPLETED'
          | 'SIMULATION_JOB_FAILED'
          | 'SIMULATION_JOB_CANCELLED'
          | 'METRIC_COLLECTION_JOB_COMPLETED'
          | 'METRIC_COLLECTION_JOB_FAILED'
          | 'CHAT_ANALYSIS_COMPLETED'
          | 'CHAT_ANALYSIS_FAILED'
          | 'ISSUE_OPENED'
          | 'ISSUE_RESOLVED'
        >;

        type: 'event';
      }

      export interface AlertSimulationTrigger {
        conditions: Array<'SUCCESS' | 'FAILURE' | 'THRESHOLD_FAILED'>;

        type: 'simulation';

        deliveryFormat?: 'MESSAGE' | 'PDF';

        plan?: string;
      }

      export interface Actions {
        slack?: Array<Actions.Slack>;

        webhooks?: Array<string>;
      }

      export namespace Actions {
        export interface Slack {
          channelId: string;

          channelName: string;
        }
      }
    }

    export interface ToolConfig {
      kind: 'tool';

      name: string;

      agent?: string;

      description?: string | null;

      expectedResult?: string | null;

      handler?: ToolConfig.Handler;

      invocationCriteria?: string | null;

      parameters?: { [key: string]: 'string' | 'number' | 'boolean' };
    }

    export namespace ToolConfig {
      export interface Handler {
        type: 'http';

        url: string;

        method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
      }
    }

    export interface DashboardConfig {
      kind: 'dashboard';

      name: string;

      description?: string;

      displayName?: string;

      filters?: Array<DashboardConfig.Filter>;

      isDefault?: boolean;

      timeRange?:
        | DashboardConfig.UnionMember0
        | DashboardConfig.UnionMember1
        | DashboardConfig.UnionMember2
        | DashboardConfig.UnionMember3;

      widgets?: Array<DashboardConfig.Widget>;
    }

    export namespace DashboardConfig {
      export interface Filter {
        type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

        operator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUAL_TO'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUAL_TO'
          | 'CONTAINS'
          | 'STARTS_WITH'
          | 'IS_SET'
          | 'IS_NOT_SET';

        property?: string;

        value?: string | number | boolean;
      }

      export interface UnionMember0 {
        type: 'LAST';

        unit: 'DAYS' | 'WEEKS' | 'MONTHS';

        value: number;
      }

      export interface UnionMember1 {
        period:
          | 'TODAY'
          | 'YESTERDAY'
          | 'THIS_WEEK'
          | 'LAST_WEEK'
          | 'THIS_MONTH'
          | 'LAST_MONTH'
          | 'THIS_YEAR'
          | 'LAST_YEAR';

        type: 'CALENDAR_ALIGNED';
      }

      export interface UnionMember2 {
        from: string;

        to: string;

        type: 'FIXED';
      }

      export interface UnionMember3 {
        from: string;

        type: 'SINCE';
      }

      export interface Widget {
        measures: Array<Widget.Measure>;

        name: string;

        comparisonGroups?: Array<Widget.ComparisonGroup>;

        comparisonMode?: 'NONE' | 'PREVIOUS_PERIOD';

        description?: string;

        display?: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

        filters?: Array<Widget.Filter>;

        interval?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

        size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
      }

      export namespace Widget {
        export interface Measure {
          aggregation?: 'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE';

          breakdown?: Measure.Breakdown;

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

          distinctBy?: 'NONE' | 'CALL';

          filters?: Array<Measure.Filter>;

          isBaseline?: boolean;

          metric?: string;

          nestedAggregation?: 'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE';

          nestedAggregationPercentile?: number;

          passOperator?:
            | 'EQUALS'
            | 'NOT_EQUALS'
            | 'GREATER_THAN'
            | 'GREATER_THAN_OR_EQUAL_TO'
            | 'LESS_THAN'
            | 'LESS_THAN_OR_EQUAL_TO'
            | 'CONTAINS'
            | 'STARTS_WITH';

          passValue?: string | number | boolean;

          percentile?: number;

          type?: 'METRIC' | 'CONVERSATION' | 'UPTIME';
        }

        export namespace Measure {
          export interface Breakdown {
            type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'DATASET';

            property?: string;
          }

          export interface Filter {
            type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

            operator?:
              | 'EQUALS'
              | 'NOT_EQUALS'
              | 'GREATER_THAN'
              | 'GREATER_THAN_OR_EQUAL_TO'
              | 'LESS_THAN'
              | 'LESS_THAN_OR_EQUAL_TO'
              | 'CONTAINS'
              | 'STARTS_WITH'
              | 'IS_SET'
              | 'IS_NOT_SET';

            property?: string;

            value?: string | number | boolean;
          }
        }

        export interface ComparisonGroup {
          filters: Array<ComparisonGroup.Filter>;

          name: string;

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
        }

        export namespace ComparisonGroup {
          export interface Filter {
            type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

            operator?:
              | 'EQUALS'
              | 'NOT_EQUALS'
              | 'GREATER_THAN'
              | 'GREATER_THAN_OR_EQUAL_TO'
              | 'LESS_THAN'
              | 'LESS_THAN_OR_EQUAL_TO'
              | 'CONTAINS'
              | 'STARTS_WITH'
              | 'IS_SET'
              | 'IS_NOT_SET';

            property?: string;

            value?: string | number | boolean;
          }
        }

        export interface Filter {
          type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

          operator?:
            | 'EQUALS'
            | 'NOT_EQUALS'
            | 'GREATER_THAN'
            | 'GREATER_THAN_OR_EQUAL_TO'
            | 'LESS_THAN'
            | 'LESS_THAN_OR_EQUAL_TO'
            | 'CONTAINS'
            | 'STARTS_WITH'
            | 'IS_SET'
            | 'IS_NOT_SET';

          property?: string;

          value?: string | number | boolean;
        }
      }
    }
  }
}

export interface ConfigFlowStep {
  type:
    | 'AGENT_TURN'
    | 'CUSTOMER_TURN'
    | 'CUSTOMER_FIRST_MESSAGE'
    | 'CUSTOMER_VERBATIM_TURN'
    | 'CUSTOMER_SILENCE'
    | 'CUSTOMER_DTMF'
    | 'AGENT_DTMF'
    | 'VOICEMAIL'
    | 'SCENARIO_LINK'
    | 'CUSTOMER_HANDOFF';

  content?: string;

  dtmfDigits?: string;

  flow?: string;

  handoffPersona?: string;

  mergeInto?: Array<string>;

  offScript?: ConfigFlowStep.OffScript;

  ref?: string;

  /**
   * Removed. Use `stage` with `required: true`.
   */
  requiredForValidRun?: boolean;

  silenceDurationSeconds?: number;

  stage?: string | ConfigFlowStep.UnionMember1;

  steps?: Array<ConfigAPI.ConfigFlowStep>;
}

export namespace ConfigFlowStep {
  export interface OffScript {
    maxAttempts?: number;

    reaction?: 'STAY_SILENT' | 'REPEAT' | 'RESPOND' | 'SAY';

    sayLine?: string;

    then?: 'HANG_UP' | 'MOVE_ON' | 'ADAPT' | 'HANG_UP_INVALIDATE';

    waitSeconds?: number;
  }

  export interface UnionMember1 {
    name: string;

    analyze?: boolean;

    required?: boolean;
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

      kind:
        | 'agent'
        | 'persona'
        | 'httpRequestDefinition'
        | 'flow'
        | 'collector'
        | 'metric'
        | 'simulationPlan'
        | 'simulationGroup'
        | 'alert'
        | 'tool'
        | 'dashboard'
        | 'project'
        | 'member';

      name: string;

      op: 'create' | 'update' | 'delete' | 'noop';

      status: 'applied' | 'skipped' | 'failed';

      id?: string;

      detail?: string;

      error?: string;

      project?: string;

      signingSecret?: string;
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

      kind:
        | 'agent'
        | 'persona'
        | 'httpRequestDefinition'
        | 'flow'
        | 'collector'
        | 'metric'
        | 'simulationPlan'
        | 'simulationGroup'
        | 'alert'
        | 'tool'
        | 'dashboard'
        | 'project'
        | 'member';

      name: string;

      op: 'create' | 'update' | 'delete' | 'noop';

      detail?: string;

      project?: string;
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
    | ConfigApplyParams.HTTPRequestDefinitionConfig
    | ConfigApplyParams.PersonaConfig
    | ConfigApplyParams.ImprovFlowConfig
    | ConfigApplyParams.ScriptedFlowConfig
    | ConfigApplyParams.CollectorConfig
    | ConfigApplyParams.MetricConfig
    | ConfigApplyParams.APICheckMetricConfig
    | ConfigApplyParams.SimulationPlanConfig
    | ConfigApplyParams.QaSimulationPlanConfig
    | ConfigApplyParams.SimulationGroupConfig
    | ConfigApplyParams.AlertConfig
    | ConfigApplyParams.ToolConfig
    | ConfigApplyParams.DashboardConfig
    | ConfigApplyParams.ProjectConfig
  >;

  prune?: boolean;
}

export namespace ConfigApplyParams {
  export interface AgentConfig {
    kind: 'agent';

    name: string;

    customId?: string | null;

    description?: string | null;

    displayName?: string;

    endpoints?: Array<AgentConfig.Endpoint>;

    prompt?: string | null;
  }

  export namespace AgentConfig {
    export interface Endpoint {
      value: string;

      direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

      environment?: string;

      outboundDialHttpRequestDefinition?: string;

      outboundDialType?: 'NONE' | 'HTTP_REQUEST';

      type?: 'PHONE' | 'WEBSOCKET';
    }
  }

  export interface HTTPRequestDefinitionConfig {
    kind: 'httpRequestDefinition';

    name: string;

    url: string;

    body?: string;

    description?: string | null;

    headers?: { [key: string]: string };

    method?: 'POST' | 'PUT' | 'PATCH' | 'GET';
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
      | 'CONSTRUCTION'
      | 'CRYING_BABY'
      | 'DRIVING'
      | 'LIBRARY'
      | 'OFFICE'
      | 'THUNDERSTORM'
      | 'TRAIN';

    backstoryPrompt?: string | null;

    baseEmotion?:
      | 'NEUTRAL'
      | 'CHEERFUL'
      | 'CONFUSED'
      | 'FRUSTRATED'
      | 'SKEPTICAL'
      | 'RUSHED'
      | 'DISTRACTED'
      | 'ANGRY'
      | 'ANXIOUS'
      | 'SAD';

    confirmationStyle?: 'EXPLICIT' | 'VAGUE';

    description?: string | null;

    displayName?: string;

    hasDisfluencies?: boolean;

    idleMessageMaxSpokenCount?: number;

    idleMessageResetCountOnUserSpeechEnabled?: boolean;

    idleMessages?: Array<string> | null;

    idleTimeoutSeconds?: number;

    intentClarity?: 'CLEAR' | 'INDIRECT' | 'VAGUE';

    interruption?: 'OFF' | 'BACKCHANNEL' | 'OCCASIONAL' | 'HEAVY';

    memoryReliability?: 'HIGH' | 'LOW';

    properties?: { [key: string]: unknown };

    responseTiming?: 'RELAXED' | 'NORMAL' | 'QUICK' | 'BARGE_IN';

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

      includeFlowExpectations?: boolean;

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

    adherence?: 'LOOSE' | 'STRICT';

    agents?: Array<string>;

    branchingMode?: 'DETERMINISTIC' | 'ADAPTIVE';

    description?: string | null;

    expectations?: Array<string>;

    offScript?: ScriptedFlowConfig.OffScript;

    title?: string;
  }

  export namespace ScriptedFlowConfig {
    export interface OffScript {
      maxAttempts?: number;

      reaction?: 'STAY_SILENT' | 'REPEAT' | 'RESPOND' | 'SAY';

      sayLine?: string;

      then?: 'HANG_UP' | 'MOVE_ON' | 'ADAPT' | 'HANG_UP_INVALIDATE';

      waitSeconds?: number;
    }
  }

  export interface CollectorConfig {
    kind: 'collector';

    metrics: Array<string | CollectorConfig.CollectorMetricConfig>;

    modality: 'call' | 'chat';

    name: string;

    displayName?: string;

    filters?: Array<CollectorConfig.Filter>;

    status?: 'ACTIVE' | 'INACTIVE';
  }

  export namespace CollectorConfig {
    export interface CollectorMetricConfig {
      metric: string;

      excludedPhrases?: Array<string>;

      screeningBrief?: string;

      verifiedProperties?: Array<string>;

      voicemailScript?: string;
    }

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

    calculationType?: 'LLM_JUDGE';

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

  export interface APICheckMetricConfig {
    calculationType: 'HTTP_REQUEST';

    httpRequest: APICheckMetricConfig.HTTPRequest;

    kind: 'metric';

    name: string;

    displayName?: string;

    falseLabel?: string;

    trueLabel?: string;
  }

  export namespace APICheckMetricConfig {
    export interface HTTPRequest {
      url: string;

      body?: string;

      headers?: { [key: string]: string };

      method?: 'GET' | 'POST';
    }
  }

  export interface SimulationPlanConfig {
    agentEndpoints: Array<SimulationPlanConfig.AgentEndpoint>;

    direction: 'INBOUND' | 'OUTBOUND';

    flows: Array<SimulationPlanConfig.Flow>;

    kind: 'simulationPlan';

    maxDurationSeconds: number;

    metrics: Array<string>;

    name: string;

    description?: string | null;

    endCallPhrases?: Array<string>;

    endCallReasons?: Array<string>;

    enrichWithLiveConversation?: boolean;

    executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

    includeAutomaticMetrics?: boolean;

    includeFlowMetrics?: boolean;

    iterations?: number;

    maxConcurrentJobs?: number;

    maxNoResponseRetries?: number;

    noResponseRetryBackoffSeconds?: number;

    notify?: SimulationPlanConfig.Notify;

    schedule?:
      | SimulationPlanConfig.UnionMember0
      | SimulationPlanConfig.UnionMember1
      | SimulationPlanConfig.UnionMember2
      | SimulationPlanConfig.UnionMember3
      | SimulationPlanConfig.UnionMember4
      | SimulationPlanConfig.UnionMember5;

    silenceTimeoutSeconds?: number;

    template?: 'manual';
  }

  export namespace SimulationPlanConfig {
    export interface AgentEndpoint {
      agent: string;

      direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

      value?: string;
    }

    export interface Flow {
      edgeCases?: Array<string>;

      flow?: string;

      happyPath?: boolean;

      personaOverride?: string;

      system?: string;
    }

    export interface Notify {
      email?: boolean | Array<string>;

      slack?: Array<Notify.Slack>;
    }

    export namespace Notify {
      export interface Slack {
        channelId: string;

        channelName: string;
      }
    }

    export interface UnionMember0 {
      type: 'hourly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      minute?: number;

      timezone?: string;
    }

    export interface UnionMember1 {
      everyMinutes: number;

      type: 'interval';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember2 {
      time: string;

      type: 'daily';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember3 {
      days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

      time: string;

      type: 'weekly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember4 {
      dayOfMonth: number;

      time: string;

      type: 'monthly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember5 {
      at: string;

      type: 'once';

      enabled?: boolean;

      timezone?: string;
    }
  }

  export interface QaSimulationPlanConfig {
    agentEndpoints: Array<QaSimulationPlanConfig.AgentEndpoint>;

    direction: 'INBOUND' | 'OUTBOUND';

    environment: string;

    kind: 'simulationPlan';

    maxDurationSeconds: number;

    name: string;

    persona: string;

    questions: Array<QaSimulationPlanConfig.Question>;

    template: 'question-answer-check';

    description?: string | null;

    endCallPhrases?: Array<string>;

    endCallReasons?: Array<string>;

    enrichWithLiveConversation?: boolean;

    executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

    gradeWithKnowledgeBase?: boolean;

    includeAutomaticMetrics?: boolean;

    includeFlowMetrics?: boolean;

    iterations?: number;

    maxConcurrentJobs?: number;

    maxNoResponseRetries?: number;

    metrics?: Array<string>;

    noResponseRetryBackoffSeconds?: number;

    notify?: QaSimulationPlanConfig.Notify;

    schedule?:
      | QaSimulationPlanConfig.UnionMember0
      | QaSimulationPlanConfig.UnionMember1
      | QaSimulationPlanConfig.UnionMember2
      | QaSimulationPlanConfig.UnionMember3
      | QaSimulationPlanConfig.UnionMember4
      | QaSimulationPlanConfig.UnionMember5;

    silenceTimeoutSeconds?: number;
  }

  export namespace QaSimulationPlanConfig {
    export interface AgentEndpoint {
      agent: string;

      direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

      value?: string;
    }

    export interface Question {
      ask: string;

      expect?: string;

      name?: string;
    }

    export interface Notify {
      email?: boolean | Array<string>;

      slack?: Array<Notify.Slack>;
    }

    export namespace Notify {
      export interface Slack {
        channelId: string;

        channelName: string;
      }
    }

    export interface UnionMember0 {
      type: 'hourly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      minute?: number;

      timezone?: string;
    }

    export interface UnionMember1 {
      everyMinutes: number;

      type: 'interval';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember2 {
      time: string;

      type: 'daily';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember3 {
      days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

      time: string;

      type: 'weekly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember4 {
      dayOfMonth: number;

      time: string;

      type: 'monthly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember5 {
      at: string;

      type: 'once';

      enabled?: boolean;

      timezone?: string;
    }
  }

  export interface SimulationGroupConfig {
    kind: 'simulationGroup';

    name: string;

    plans: Array<string>;

    description?: string | null;

    notify?: SimulationGroupConfig.Notify;

    schedule?:
      | SimulationGroupConfig.UnionMember0
      | SimulationGroupConfig.UnionMember1
      | SimulationGroupConfig.UnionMember2
      | SimulationGroupConfig.UnionMember3
      | SimulationGroupConfig.UnionMember4
      | SimulationGroupConfig.UnionMember5;
  }

  export namespace SimulationGroupConfig {
    export interface Notify {
      email?: boolean | Array<string>;

      slack?: Array<Notify.Slack>;
    }

    export namespace Notify {
      export interface Slack {
        channelId: string;

        channelName: string;
      }
    }

    export interface UnionMember0 {
      type: 'hourly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      minute?: number;

      timezone?: string;
    }

    export interface UnionMember1 {
      everyMinutes: number;

      type: 'interval';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember2 {
      time: string;

      type: 'daily';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember3 {
      days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

      time: string;

      type: 'weekly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember4 {
      dayOfMonth: number;

      time: string;

      type: 'monthly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember5 {
      at: string;

      type: 'once';

      enabled?: boolean;

      timezone?: string;
    }
  }

  export interface AlertConfig {
    kind: 'alert';

    name: string;

    trigger:
      | AlertConfig.AlertThresholdTrigger
      | AlertConfig.AlertEventTrigger
      | AlertConfig.AlertSimulationTrigger;

    actions?: AlertConfig.Actions;

    displayName?: string;

    enabled?: boolean;
  }

  export namespace AlertConfig {
    export interface AlertThresholdTrigger {
      aggregation: 'COUNT' | 'RATE_PER_MINUTE' | 'MEAN';

      metric: string;

      operator: 'GT' | 'GTE' | 'LT' | 'LTE';

      thresholdValue: number;

      type: 'threshold';

      windowMinutes: number;

      consecutiveOpen?: number;

      consecutiveResolve?: number;

      grouping?: 'NONE' | 'BY_AGENT';

      metricVariant?: string;

      minSampleSize?: number;
    }

    export interface AlertEventTrigger {
      events: Array<
        | 'CALL_ANALYSIS_COMPLETED'
        | 'CALL_ANALYSIS_FAILED'
        | 'CALL_ANALYSIS_CANCELLED'
        | 'SIMULATION_RUN_PLAN_JOB_STARTED'
        | 'SIMULATION_RUN_PLAN_JOB_COMPLETED'
        | 'SIMULATION_RUN_PLAN_JOB_FAILED'
        | 'SIMULATION_RUN_PLAN_JOB_CANCELLED'
        | 'SIMULATION_JOB_STARTED'
        | 'SIMULATION_JOB_COMPLETED'
        | 'SIMULATION_JOB_FAILED'
        | 'SIMULATION_JOB_CANCELLED'
        | 'METRIC_COLLECTION_JOB_COMPLETED'
        | 'METRIC_COLLECTION_JOB_FAILED'
        | 'CHAT_ANALYSIS_COMPLETED'
        | 'CHAT_ANALYSIS_FAILED'
        | 'ISSUE_OPENED'
        | 'ISSUE_RESOLVED'
      >;

      type: 'event';
    }

    export interface AlertSimulationTrigger {
      conditions: Array<'SUCCESS' | 'FAILURE' | 'THRESHOLD_FAILED'>;

      type: 'simulation';

      deliveryFormat?: 'MESSAGE' | 'PDF';

      plan?: string;
    }

    export interface Actions {
      slack?: Array<Actions.Slack>;

      webhooks?: Array<string>;
    }

    export namespace Actions {
      export interface Slack {
        channelId: string;

        channelName: string;
      }
    }
  }

  export interface ToolConfig {
    kind: 'tool';

    name: string;

    agent?: string;

    description?: string | null;

    expectedResult?: string | null;

    handler?: ToolConfig.Handler;

    invocationCriteria?: string | null;

    parameters?: { [key: string]: 'string' | 'number' | 'boolean' };
  }

  export namespace ToolConfig {
    export interface Handler {
      type: 'http';

      url: string;

      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    }
  }

  export interface DashboardConfig {
    kind: 'dashboard';

    name: string;

    description?: string;

    displayName?: string;

    filters?: Array<DashboardConfig.Filter>;

    isDefault?: boolean;

    timeRange?:
      | DashboardConfig.UnionMember0
      | DashboardConfig.UnionMember1
      | DashboardConfig.UnionMember2
      | DashboardConfig.UnionMember3;

    widgets?: Array<DashboardConfig.Widget>;
  }

  export namespace DashboardConfig {
    export interface Filter {
      type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

      operator?:
        | 'EQUALS'
        | 'NOT_EQUALS'
        | 'GREATER_THAN'
        | 'GREATER_THAN_OR_EQUAL_TO'
        | 'LESS_THAN'
        | 'LESS_THAN_OR_EQUAL_TO'
        | 'CONTAINS'
        | 'STARTS_WITH'
        | 'IS_SET'
        | 'IS_NOT_SET';

      property?: string;

      value?: string | number | boolean;
    }

    export interface UnionMember0 {
      type: 'LAST';

      unit: 'DAYS' | 'WEEKS' | 'MONTHS';

      value: number;
    }

    export interface UnionMember1 {
      period:
        | 'TODAY'
        | 'YESTERDAY'
        | 'THIS_WEEK'
        | 'LAST_WEEK'
        | 'THIS_MONTH'
        | 'LAST_MONTH'
        | 'THIS_YEAR'
        | 'LAST_YEAR';

      type: 'CALENDAR_ALIGNED';
    }

    export interface UnionMember2 {
      from: string;

      to: string;

      type: 'FIXED';
    }

    export interface UnionMember3 {
      from: string;

      type: 'SINCE';
    }

    export interface Widget {
      measures: Array<Widget.Measure>;

      name: string;

      comparisonGroups?: Array<Widget.ComparisonGroup>;

      comparisonMode?: 'NONE' | 'PREVIOUS_PERIOD';

      description?: string;

      display?: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

      filters?: Array<Widget.Filter>;

      interval?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

      size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
    }

    export namespace Widget {
      export interface Measure {
        aggregation?: 'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE';

        breakdown?: Measure.Breakdown;

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

        distinctBy?: 'NONE' | 'CALL';

        filters?: Array<Measure.Filter>;

        isBaseline?: boolean;

        metric?: string;

        nestedAggregation?: 'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE';

        nestedAggregationPercentile?: number;

        passOperator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUAL_TO'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUAL_TO'
          | 'CONTAINS'
          | 'STARTS_WITH';

        passValue?: string | number | boolean;

        percentile?: number;

        type?: 'METRIC' | 'CONVERSATION' | 'UPTIME';
      }

      export namespace Measure {
        export interface Breakdown {
          type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'DATASET';

          property?: string;
        }

        export interface Filter {
          type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

          operator?:
            | 'EQUALS'
            | 'NOT_EQUALS'
            | 'GREATER_THAN'
            | 'GREATER_THAN_OR_EQUAL_TO'
            | 'LESS_THAN'
            | 'LESS_THAN_OR_EQUAL_TO'
            | 'CONTAINS'
            | 'STARTS_WITH'
            | 'IS_SET'
            | 'IS_NOT_SET';

          property?: string;

          value?: string | number | boolean;
        }
      }

      export interface ComparisonGroup {
        filters: Array<ComparisonGroup.Filter>;

        name: string;

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
      }

      export namespace ComparisonGroup {
        export interface Filter {
          type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

          operator?:
            | 'EQUALS'
            | 'NOT_EQUALS'
            | 'GREATER_THAN'
            | 'GREATER_THAN_OR_EQUAL_TO'
            | 'LESS_THAN'
            | 'LESS_THAN_OR_EQUAL_TO'
            | 'CONTAINS'
            | 'STARTS_WITH'
            | 'IS_SET'
            | 'IS_NOT_SET';

          property?: string;

          value?: string | number | boolean;
        }
      }

      export interface Filter {
        type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

        operator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUAL_TO'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUAL_TO'
          | 'CONTAINS'
          | 'STARTS_WITH'
          | 'IS_SET'
          | 'IS_NOT_SET';

        property?: string;

        value?: string | number | boolean;
      }
    }
  }

  export interface ProjectConfig {
    kind: 'project';

    name: string;

    category?:
      | 'HEALTHCARE'
      | 'FINANCIAL'
      | 'RETAIL'
      | 'HOSPITALITY'
      | 'AUTOMOTIVE'
      | 'GOVERNMENT'
      | 'EDUCATION'
      | 'REAL_ESTATE'
      | 'OTHER';

    dataStorageRegion?: 'US_EAST_1' | 'EU_WEST_1';

    description?: string;

    displayName?: string;

    members?: Array<ProjectConfig.Member>;

    resources?: Array<
      | ProjectConfig.AgentConfig
      | ProjectConfig.HTTPRequestDefinitionConfig
      | ProjectConfig.PersonaConfig
      | ProjectConfig.ImprovFlowConfig
      | ProjectConfig.ScriptedFlowConfig
      | ProjectConfig.CollectorConfig
      | ProjectConfig.MetricConfig
      | ProjectConfig.APICheckMetricConfig
      | ProjectConfig.SimulationPlanConfig
      | ProjectConfig.QaSimulationPlanConfig
      | ProjectConfig.SimulationGroupConfig
      | ProjectConfig.AlertConfig
      | ProjectConfig.ToolConfig
      | ProjectConfig.DashboardConfig
    >;
  }

  export namespace ProjectConfig {
    export interface Member {
      email: string;

      role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';
    }

    export interface AgentConfig {
      kind: 'agent';

      name: string;

      customId?: string | null;

      description?: string | null;

      displayName?: string;

      endpoints?: Array<AgentConfig.Endpoint>;

      prompt?: string | null;
    }

    export namespace AgentConfig {
      export interface Endpoint {
        value: string;

        direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

        environment?: string;

        outboundDialHttpRequestDefinition?: string;

        outboundDialType?: 'NONE' | 'HTTP_REQUEST';

        type?: 'PHONE' | 'WEBSOCKET';
      }
    }

    export interface HTTPRequestDefinitionConfig {
      kind: 'httpRequestDefinition';

      name: string;

      url: string;

      body?: string;

      description?: string | null;

      headers?: { [key: string]: string };

      method?: 'POST' | 'PUT' | 'PATCH' | 'GET';
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
        | 'CONSTRUCTION'
        | 'CRYING_BABY'
        | 'DRIVING'
        | 'LIBRARY'
        | 'OFFICE'
        | 'THUNDERSTORM'
        | 'TRAIN';

      backstoryPrompt?: string | null;

      baseEmotion?:
        | 'NEUTRAL'
        | 'CHEERFUL'
        | 'CONFUSED'
        | 'FRUSTRATED'
        | 'SKEPTICAL'
        | 'RUSHED'
        | 'DISTRACTED'
        | 'ANGRY'
        | 'ANXIOUS'
        | 'SAD';

      confirmationStyle?: 'EXPLICIT' | 'VAGUE';

      description?: string | null;

      displayName?: string;

      hasDisfluencies?: boolean;

      idleMessageMaxSpokenCount?: number;

      idleMessageResetCountOnUserSpeechEnabled?: boolean;

      idleMessages?: Array<string> | null;

      idleTimeoutSeconds?: number;

      intentClarity?: 'CLEAR' | 'INDIRECT' | 'VAGUE';

      interruption?: 'OFF' | 'BACKCHANNEL' | 'OCCASIONAL' | 'HEAVY';

      memoryReliability?: 'HIGH' | 'LOW';

      properties?: { [key: string]: unknown };

      responseTiming?: 'RELAXED' | 'NORMAL' | 'QUICK' | 'BARGE_IN';

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

        includeFlowExpectations?: boolean;

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

      adherence?: 'LOOSE' | 'STRICT';

      agents?: Array<string>;

      branchingMode?: 'DETERMINISTIC' | 'ADAPTIVE';

      description?: string | null;

      expectations?: Array<string>;

      offScript?: ScriptedFlowConfig.OffScript;

      title?: string;
    }

    export namespace ScriptedFlowConfig {
      export interface OffScript {
        maxAttempts?: number;

        reaction?: 'STAY_SILENT' | 'REPEAT' | 'RESPOND' | 'SAY';

        sayLine?: string;

        then?: 'HANG_UP' | 'MOVE_ON' | 'ADAPT' | 'HANG_UP_INVALIDATE';

        waitSeconds?: number;
      }
    }

    export interface CollectorConfig {
      kind: 'collector';

      metrics: Array<string | CollectorConfig.CollectorMetricConfig>;

      modality: 'call' | 'chat';

      name: string;

      displayName?: string;

      filters?: Array<CollectorConfig.Filter>;

      status?: 'ACTIVE' | 'INACTIVE';
    }

    export namespace CollectorConfig {
      export interface CollectorMetricConfig {
        metric: string;

        excludedPhrases?: Array<string>;

        screeningBrief?: string;

        verifiedProperties?: Array<string>;

        voicemailScript?: string;
      }

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

      calculationType?: 'LLM_JUDGE';

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

    export interface APICheckMetricConfig {
      calculationType: 'HTTP_REQUEST';

      httpRequest: APICheckMetricConfig.HTTPRequest;

      kind: 'metric';

      name: string;

      displayName?: string;

      falseLabel?: string;

      trueLabel?: string;
    }

    export namespace APICheckMetricConfig {
      export interface HTTPRequest {
        url: string;

        body?: string;

        headers?: { [key: string]: string };

        method?: 'GET' | 'POST';
      }
    }

    export interface SimulationPlanConfig {
      agentEndpoints: Array<SimulationPlanConfig.AgentEndpoint>;

      direction: 'INBOUND' | 'OUTBOUND';

      flows: Array<SimulationPlanConfig.Flow>;

      kind: 'simulationPlan';

      maxDurationSeconds: number;

      metrics: Array<string>;

      name: string;

      description?: string | null;

      endCallPhrases?: Array<string>;

      endCallReasons?: Array<string>;

      enrichWithLiveConversation?: boolean;

      executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

      includeAutomaticMetrics?: boolean;

      includeFlowMetrics?: boolean;

      iterations?: number;

      maxConcurrentJobs?: number;

      maxNoResponseRetries?: number;

      noResponseRetryBackoffSeconds?: number;

      notify?: SimulationPlanConfig.Notify;

      schedule?:
        | SimulationPlanConfig.UnionMember0
        | SimulationPlanConfig.UnionMember1
        | SimulationPlanConfig.UnionMember2
        | SimulationPlanConfig.UnionMember3
        | SimulationPlanConfig.UnionMember4
        | SimulationPlanConfig.UnionMember5;

      silenceTimeoutSeconds?: number;

      template?: 'manual';
    }

    export namespace SimulationPlanConfig {
      export interface AgentEndpoint {
        agent: string;

        direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

        value?: string;
      }

      export interface Flow {
        edgeCases?: Array<string>;

        flow?: string;

        happyPath?: boolean;

        personaOverride?: string;

        system?: string;
      }

      export interface Notify {
        email?: boolean | Array<string>;

        slack?: Array<Notify.Slack>;
      }

      export namespace Notify {
        export interface Slack {
          channelId: string;

          channelName: string;
        }
      }

      export interface UnionMember0 {
        type: 'hourly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        minute?: number;

        timezone?: string;
      }

      export interface UnionMember1 {
        everyMinutes: number;

        type: 'interval';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember2 {
        time: string;

        type: 'daily';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember3 {
        days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

        time: string;

        type: 'weekly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember4 {
        dayOfMonth: number;

        time: string;

        type: 'monthly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember5 {
        at: string;

        type: 'once';

        enabled?: boolean;

        timezone?: string;
      }
    }

    export interface QaSimulationPlanConfig {
      agentEndpoints: Array<QaSimulationPlanConfig.AgentEndpoint>;

      direction: 'INBOUND' | 'OUTBOUND';

      environment: string;

      kind: 'simulationPlan';

      maxDurationSeconds: number;

      name: string;

      persona: string;

      questions: Array<QaSimulationPlanConfig.Question>;

      template: 'question-answer-check';

      description?: string | null;

      endCallPhrases?: Array<string>;

      endCallReasons?: Array<string>;

      enrichWithLiveConversation?: boolean;

      executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

      gradeWithKnowledgeBase?: boolean;

      includeAutomaticMetrics?: boolean;

      includeFlowMetrics?: boolean;

      iterations?: number;

      maxConcurrentJobs?: number;

      maxNoResponseRetries?: number;

      metrics?: Array<string>;

      noResponseRetryBackoffSeconds?: number;

      notify?: QaSimulationPlanConfig.Notify;

      schedule?:
        | QaSimulationPlanConfig.UnionMember0
        | QaSimulationPlanConfig.UnionMember1
        | QaSimulationPlanConfig.UnionMember2
        | QaSimulationPlanConfig.UnionMember3
        | QaSimulationPlanConfig.UnionMember4
        | QaSimulationPlanConfig.UnionMember5;

      silenceTimeoutSeconds?: number;
    }

    export namespace QaSimulationPlanConfig {
      export interface AgentEndpoint {
        agent: string;

        direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

        value?: string;
      }

      export interface Question {
        ask: string;

        expect?: string;

        name?: string;
      }

      export interface Notify {
        email?: boolean | Array<string>;

        slack?: Array<Notify.Slack>;
      }

      export namespace Notify {
        export interface Slack {
          channelId: string;

          channelName: string;
        }
      }

      export interface UnionMember0 {
        type: 'hourly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        minute?: number;

        timezone?: string;
      }

      export interface UnionMember1 {
        everyMinutes: number;

        type: 'interval';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember2 {
        time: string;

        type: 'daily';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember3 {
        days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

        time: string;

        type: 'weekly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember4 {
        dayOfMonth: number;

        time: string;

        type: 'monthly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember5 {
        at: string;

        type: 'once';

        enabled?: boolean;

        timezone?: string;
      }
    }

    export interface SimulationGroupConfig {
      kind: 'simulationGroup';

      name: string;

      plans: Array<string>;

      description?: string | null;

      notify?: SimulationGroupConfig.Notify;

      schedule?:
        | SimulationGroupConfig.UnionMember0
        | SimulationGroupConfig.UnionMember1
        | SimulationGroupConfig.UnionMember2
        | SimulationGroupConfig.UnionMember3
        | SimulationGroupConfig.UnionMember4
        | SimulationGroupConfig.UnionMember5;
    }

    export namespace SimulationGroupConfig {
      export interface Notify {
        email?: boolean | Array<string>;

        slack?: Array<Notify.Slack>;
      }

      export namespace Notify {
        export interface Slack {
          channelId: string;

          channelName: string;
        }
      }

      export interface UnionMember0 {
        type: 'hourly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        minute?: number;

        timezone?: string;
      }

      export interface UnionMember1 {
        everyMinutes: number;

        type: 'interval';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember2 {
        time: string;

        type: 'daily';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember3 {
        days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

        time: string;

        type: 'weekly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember4 {
        dayOfMonth: number;

        time: string;

        type: 'monthly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember5 {
        at: string;

        type: 'once';

        enabled?: boolean;

        timezone?: string;
      }
    }

    export interface AlertConfig {
      kind: 'alert';

      name: string;

      trigger:
        | AlertConfig.AlertThresholdTrigger
        | AlertConfig.AlertEventTrigger
        | AlertConfig.AlertSimulationTrigger;

      actions?: AlertConfig.Actions;

      displayName?: string;

      enabled?: boolean;
    }

    export namespace AlertConfig {
      export interface AlertThresholdTrigger {
        aggregation: 'COUNT' | 'RATE_PER_MINUTE' | 'MEAN';

        metric: string;

        operator: 'GT' | 'GTE' | 'LT' | 'LTE';

        thresholdValue: number;

        type: 'threshold';

        windowMinutes: number;

        consecutiveOpen?: number;

        consecutiveResolve?: number;

        grouping?: 'NONE' | 'BY_AGENT';

        metricVariant?: string;

        minSampleSize?: number;
      }

      export interface AlertEventTrigger {
        events: Array<
          | 'CALL_ANALYSIS_COMPLETED'
          | 'CALL_ANALYSIS_FAILED'
          | 'CALL_ANALYSIS_CANCELLED'
          | 'SIMULATION_RUN_PLAN_JOB_STARTED'
          | 'SIMULATION_RUN_PLAN_JOB_COMPLETED'
          | 'SIMULATION_RUN_PLAN_JOB_FAILED'
          | 'SIMULATION_RUN_PLAN_JOB_CANCELLED'
          | 'SIMULATION_JOB_STARTED'
          | 'SIMULATION_JOB_COMPLETED'
          | 'SIMULATION_JOB_FAILED'
          | 'SIMULATION_JOB_CANCELLED'
          | 'METRIC_COLLECTION_JOB_COMPLETED'
          | 'METRIC_COLLECTION_JOB_FAILED'
          | 'CHAT_ANALYSIS_COMPLETED'
          | 'CHAT_ANALYSIS_FAILED'
          | 'ISSUE_OPENED'
          | 'ISSUE_RESOLVED'
        >;

        type: 'event';
      }

      export interface AlertSimulationTrigger {
        conditions: Array<'SUCCESS' | 'FAILURE' | 'THRESHOLD_FAILED'>;

        type: 'simulation';

        deliveryFormat?: 'MESSAGE' | 'PDF';

        plan?: string;
      }

      export interface Actions {
        slack?: Array<Actions.Slack>;

        webhooks?: Array<string>;
      }

      export namespace Actions {
        export interface Slack {
          channelId: string;

          channelName: string;
        }
      }
    }

    export interface ToolConfig {
      kind: 'tool';

      name: string;

      agent?: string;

      description?: string | null;

      expectedResult?: string | null;

      handler?: ToolConfig.Handler;

      invocationCriteria?: string | null;

      parameters?: { [key: string]: 'string' | 'number' | 'boolean' };
    }

    export namespace ToolConfig {
      export interface Handler {
        type: 'http';

        url: string;

        method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
      }
    }

    export interface DashboardConfig {
      kind: 'dashboard';

      name: string;

      description?: string;

      displayName?: string;

      filters?: Array<DashboardConfig.Filter>;

      isDefault?: boolean;

      timeRange?:
        | DashboardConfig.UnionMember0
        | DashboardConfig.UnionMember1
        | DashboardConfig.UnionMember2
        | DashboardConfig.UnionMember3;

      widgets?: Array<DashboardConfig.Widget>;
    }

    export namespace DashboardConfig {
      export interface Filter {
        type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

        operator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUAL_TO'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUAL_TO'
          | 'CONTAINS'
          | 'STARTS_WITH'
          | 'IS_SET'
          | 'IS_NOT_SET';

        property?: string;

        value?: string | number | boolean;
      }

      export interface UnionMember0 {
        type: 'LAST';

        unit: 'DAYS' | 'WEEKS' | 'MONTHS';

        value: number;
      }

      export interface UnionMember1 {
        period:
          | 'TODAY'
          | 'YESTERDAY'
          | 'THIS_WEEK'
          | 'LAST_WEEK'
          | 'THIS_MONTH'
          | 'LAST_MONTH'
          | 'THIS_YEAR'
          | 'LAST_YEAR';

        type: 'CALENDAR_ALIGNED';
      }

      export interface UnionMember2 {
        from: string;

        to: string;

        type: 'FIXED';
      }

      export interface UnionMember3 {
        from: string;

        type: 'SINCE';
      }

      export interface Widget {
        measures: Array<Widget.Measure>;

        name: string;

        comparisonGroups?: Array<Widget.ComparisonGroup>;

        comparisonMode?: 'NONE' | 'PREVIOUS_PERIOD';

        description?: string;

        display?: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

        filters?: Array<Widget.Filter>;

        interval?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

        size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
      }

      export namespace Widget {
        export interface Measure {
          aggregation?: 'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE';

          breakdown?: Measure.Breakdown;

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

          distinctBy?: 'NONE' | 'CALL';

          filters?: Array<Measure.Filter>;

          isBaseline?: boolean;

          metric?: string;

          nestedAggregation?: 'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE';

          nestedAggregationPercentile?: number;

          passOperator?:
            | 'EQUALS'
            | 'NOT_EQUALS'
            | 'GREATER_THAN'
            | 'GREATER_THAN_OR_EQUAL_TO'
            | 'LESS_THAN'
            | 'LESS_THAN_OR_EQUAL_TO'
            | 'CONTAINS'
            | 'STARTS_WITH';

          passValue?: string | number | boolean;

          percentile?: number;

          type?: 'METRIC' | 'CONVERSATION' | 'UPTIME';
        }

        export namespace Measure {
          export interface Breakdown {
            type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'DATASET';

            property?: string;
          }

          export interface Filter {
            type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

            operator?:
              | 'EQUALS'
              | 'NOT_EQUALS'
              | 'GREATER_THAN'
              | 'GREATER_THAN_OR_EQUAL_TO'
              | 'LESS_THAN'
              | 'LESS_THAN_OR_EQUAL_TO'
              | 'CONTAINS'
              | 'STARTS_WITH'
              | 'IS_SET'
              | 'IS_NOT_SET';

            property?: string;

            value?: string | number | boolean;
          }
        }

        export interface ComparisonGroup {
          filters: Array<ComparisonGroup.Filter>;

          name: string;

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
        }

        export namespace ComparisonGroup {
          export interface Filter {
            type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

            operator?:
              | 'EQUALS'
              | 'NOT_EQUALS'
              | 'GREATER_THAN'
              | 'GREATER_THAN_OR_EQUAL_TO'
              | 'LESS_THAN'
              | 'LESS_THAN_OR_EQUAL_TO'
              | 'CONTAINS'
              | 'STARTS_WITH'
              | 'IS_SET'
              | 'IS_NOT_SET';

            property?: string;

            value?: string | number | boolean;
          }
        }

        export interface Filter {
          type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

          operator?:
            | 'EQUALS'
            | 'NOT_EQUALS'
            | 'GREATER_THAN'
            | 'GREATER_THAN_OR_EQUAL_TO'
            | 'LESS_THAN'
            | 'LESS_THAN_OR_EQUAL_TO'
            | 'CONTAINS'
            | 'STARTS_WITH'
            | 'IS_SET'
            | 'IS_NOT_SET';

          property?: string;

          value?: string | number | boolean;
        }
      }
    }
  }
}

export interface ConfigDiffParams {
  resources: Array<
    | ConfigDiffParams.AgentConfig
    | ConfigDiffParams.HTTPRequestDefinitionConfig
    | ConfigDiffParams.PersonaConfig
    | ConfigDiffParams.ImprovFlowConfig
    | ConfigDiffParams.ScriptedFlowConfig
    | ConfigDiffParams.CollectorConfig
    | ConfigDiffParams.MetricConfig
    | ConfigDiffParams.APICheckMetricConfig
    | ConfigDiffParams.SimulationPlanConfig
    | ConfigDiffParams.QaSimulationPlanConfig
    | ConfigDiffParams.SimulationGroupConfig
    | ConfigDiffParams.AlertConfig
    | ConfigDiffParams.ToolConfig
    | ConfigDiffParams.DashboardConfig
    | ConfigDiffParams.ProjectConfig
  >;

  prune?: boolean;
}

export namespace ConfigDiffParams {
  export interface AgentConfig {
    kind: 'agent';

    name: string;

    customId?: string | null;

    description?: string | null;

    displayName?: string;

    endpoints?: Array<AgentConfig.Endpoint>;

    prompt?: string | null;
  }

  export namespace AgentConfig {
    export interface Endpoint {
      value: string;

      direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

      environment?: string;

      outboundDialHttpRequestDefinition?: string;

      outboundDialType?: 'NONE' | 'HTTP_REQUEST';

      type?: 'PHONE' | 'WEBSOCKET';
    }
  }

  export interface HTTPRequestDefinitionConfig {
    kind: 'httpRequestDefinition';

    name: string;

    url: string;

    body?: string;

    description?: string | null;

    headers?: { [key: string]: string };

    method?: 'POST' | 'PUT' | 'PATCH' | 'GET';
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
      | 'CONSTRUCTION'
      | 'CRYING_BABY'
      | 'DRIVING'
      | 'LIBRARY'
      | 'OFFICE'
      | 'THUNDERSTORM'
      | 'TRAIN';

    backstoryPrompt?: string | null;

    baseEmotion?:
      | 'NEUTRAL'
      | 'CHEERFUL'
      | 'CONFUSED'
      | 'FRUSTRATED'
      | 'SKEPTICAL'
      | 'RUSHED'
      | 'DISTRACTED'
      | 'ANGRY'
      | 'ANXIOUS'
      | 'SAD';

    confirmationStyle?: 'EXPLICIT' | 'VAGUE';

    description?: string | null;

    displayName?: string;

    hasDisfluencies?: boolean;

    idleMessageMaxSpokenCount?: number;

    idleMessageResetCountOnUserSpeechEnabled?: boolean;

    idleMessages?: Array<string> | null;

    idleTimeoutSeconds?: number;

    intentClarity?: 'CLEAR' | 'INDIRECT' | 'VAGUE';

    interruption?: 'OFF' | 'BACKCHANNEL' | 'OCCASIONAL' | 'HEAVY';

    memoryReliability?: 'HIGH' | 'LOW';

    properties?: { [key: string]: unknown };

    responseTiming?: 'RELAXED' | 'NORMAL' | 'QUICK' | 'BARGE_IN';

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

      includeFlowExpectations?: boolean;

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

    adherence?: 'LOOSE' | 'STRICT';

    agents?: Array<string>;

    branchingMode?: 'DETERMINISTIC' | 'ADAPTIVE';

    description?: string | null;

    expectations?: Array<string>;

    offScript?: ScriptedFlowConfig.OffScript;

    title?: string;
  }

  export namespace ScriptedFlowConfig {
    export interface OffScript {
      maxAttempts?: number;

      reaction?: 'STAY_SILENT' | 'REPEAT' | 'RESPOND' | 'SAY';

      sayLine?: string;

      then?: 'HANG_UP' | 'MOVE_ON' | 'ADAPT' | 'HANG_UP_INVALIDATE';

      waitSeconds?: number;
    }
  }

  export interface CollectorConfig {
    kind: 'collector';

    metrics: Array<string | CollectorConfig.CollectorMetricConfig>;

    modality: 'call' | 'chat';

    name: string;

    displayName?: string;

    filters?: Array<CollectorConfig.Filter>;

    status?: 'ACTIVE' | 'INACTIVE';
  }

  export namespace CollectorConfig {
    export interface CollectorMetricConfig {
      metric: string;

      excludedPhrases?: Array<string>;

      screeningBrief?: string;

      verifiedProperties?: Array<string>;

      voicemailScript?: string;
    }

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

    calculationType?: 'LLM_JUDGE';

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

  export interface APICheckMetricConfig {
    calculationType: 'HTTP_REQUEST';

    httpRequest: APICheckMetricConfig.HTTPRequest;

    kind: 'metric';

    name: string;

    displayName?: string;

    falseLabel?: string;

    trueLabel?: string;
  }

  export namespace APICheckMetricConfig {
    export interface HTTPRequest {
      url: string;

      body?: string;

      headers?: { [key: string]: string };

      method?: 'GET' | 'POST';
    }
  }

  export interface SimulationPlanConfig {
    agentEndpoints: Array<SimulationPlanConfig.AgentEndpoint>;

    direction: 'INBOUND' | 'OUTBOUND';

    flows: Array<SimulationPlanConfig.Flow>;

    kind: 'simulationPlan';

    maxDurationSeconds: number;

    metrics: Array<string>;

    name: string;

    description?: string | null;

    endCallPhrases?: Array<string>;

    endCallReasons?: Array<string>;

    enrichWithLiveConversation?: boolean;

    executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

    includeAutomaticMetrics?: boolean;

    includeFlowMetrics?: boolean;

    iterations?: number;

    maxConcurrentJobs?: number;

    maxNoResponseRetries?: number;

    noResponseRetryBackoffSeconds?: number;

    notify?: SimulationPlanConfig.Notify;

    schedule?:
      | SimulationPlanConfig.UnionMember0
      | SimulationPlanConfig.UnionMember1
      | SimulationPlanConfig.UnionMember2
      | SimulationPlanConfig.UnionMember3
      | SimulationPlanConfig.UnionMember4
      | SimulationPlanConfig.UnionMember5;

    silenceTimeoutSeconds?: number;

    template?: 'manual';
  }

  export namespace SimulationPlanConfig {
    export interface AgentEndpoint {
      agent: string;

      direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

      value?: string;
    }

    export interface Flow {
      edgeCases?: Array<string>;

      flow?: string;

      happyPath?: boolean;

      personaOverride?: string;

      system?: string;
    }

    export interface Notify {
      email?: boolean | Array<string>;

      slack?: Array<Notify.Slack>;
    }

    export namespace Notify {
      export interface Slack {
        channelId: string;

        channelName: string;
      }
    }

    export interface UnionMember0 {
      type: 'hourly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      minute?: number;

      timezone?: string;
    }

    export interface UnionMember1 {
      everyMinutes: number;

      type: 'interval';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember2 {
      time: string;

      type: 'daily';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember3 {
      days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

      time: string;

      type: 'weekly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember4 {
      dayOfMonth: number;

      time: string;

      type: 'monthly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember5 {
      at: string;

      type: 'once';

      enabled?: boolean;

      timezone?: string;
    }
  }

  export interface QaSimulationPlanConfig {
    agentEndpoints: Array<QaSimulationPlanConfig.AgentEndpoint>;

    direction: 'INBOUND' | 'OUTBOUND';

    environment: string;

    kind: 'simulationPlan';

    maxDurationSeconds: number;

    name: string;

    persona: string;

    questions: Array<QaSimulationPlanConfig.Question>;

    template: 'question-answer-check';

    description?: string | null;

    endCallPhrases?: Array<string>;

    endCallReasons?: Array<string>;

    enrichWithLiveConversation?: boolean;

    executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

    gradeWithKnowledgeBase?: boolean;

    includeAutomaticMetrics?: boolean;

    includeFlowMetrics?: boolean;

    iterations?: number;

    maxConcurrentJobs?: number;

    maxNoResponseRetries?: number;

    metrics?: Array<string>;

    noResponseRetryBackoffSeconds?: number;

    notify?: QaSimulationPlanConfig.Notify;

    schedule?:
      | QaSimulationPlanConfig.UnionMember0
      | QaSimulationPlanConfig.UnionMember1
      | QaSimulationPlanConfig.UnionMember2
      | QaSimulationPlanConfig.UnionMember3
      | QaSimulationPlanConfig.UnionMember4
      | QaSimulationPlanConfig.UnionMember5;

    silenceTimeoutSeconds?: number;
  }

  export namespace QaSimulationPlanConfig {
    export interface AgentEndpoint {
      agent: string;

      direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

      value?: string;
    }

    export interface Question {
      ask: string;

      expect?: string;

      name?: string;
    }

    export interface Notify {
      email?: boolean | Array<string>;

      slack?: Array<Notify.Slack>;
    }

    export namespace Notify {
      export interface Slack {
        channelId: string;

        channelName: string;
      }
    }

    export interface UnionMember0 {
      type: 'hourly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      minute?: number;

      timezone?: string;
    }

    export interface UnionMember1 {
      everyMinutes: number;

      type: 'interval';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember2 {
      time: string;

      type: 'daily';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember3 {
      days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

      time: string;

      type: 'weekly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember4 {
      dayOfMonth: number;

      time: string;

      type: 'monthly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember5 {
      at: string;

      type: 'once';

      enabled?: boolean;

      timezone?: string;
    }
  }

  export interface SimulationGroupConfig {
    kind: 'simulationGroup';

    name: string;

    plans: Array<string>;

    description?: string | null;

    notify?: SimulationGroupConfig.Notify;

    schedule?:
      | SimulationGroupConfig.UnionMember0
      | SimulationGroupConfig.UnionMember1
      | SimulationGroupConfig.UnionMember2
      | SimulationGroupConfig.UnionMember3
      | SimulationGroupConfig.UnionMember4
      | SimulationGroupConfig.UnionMember5;
  }

  export namespace SimulationGroupConfig {
    export interface Notify {
      email?: boolean | Array<string>;

      slack?: Array<Notify.Slack>;
    }

    export namespace Notify {
      export interface Slack {
        channelId: string;

        channelName: string;
      }
    }

    export interface UnionMember0 {
      type: 'hourly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      minute?: number;

      timezone?: string;
    }

    export interface UnionMember1 {
      everyMinutes: number;

      type: 'interval';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember2 {
      time: string;

      type: 'daily';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember3 {
      days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

      time: string;

      type: 'weekly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember4 {
      dayOfMonth: number;

      time: string;

      type: 'monthly';

      enabled?: boolean;

      endDate?: string;

      maxRuns?: number;

      timezone?: string;
    }

    export interface UnionMember5 {
      at: string;

      type: 'once';

      enabled?: boolean;

      timezone?: string;
    }
  }

  export interface AlertConfig {
    kind: 'alert';

    name: string;

    trigger:
      | AlertConfig.AlertThresholdTrigger
      | AlertConfig.AlertEventTrigger
      | AlertConfig.AlertSimulationTrigger;

    actions?: AlertConfig.Actions;

    displayName?: string;

    enabled?: boolean;
  }

  export namespace AlertConfig {
    export interface AlertThresholdTrigger {
      aggregation: 'COUNT' | 'RATE_PER_MINUTE' | 'MEAN';

      metric: string;

      operator: 'GT' | 'GTE' | 'LT' | 'LTE';

      thresholdValue: number;

      type: 'threshold';

      windowMinutes: number;

      consecutiveOpen?: number;

      consecutiveResolve?: number;

      grouping?: 'NONE' | 'BY_AGENT';

      metricVariant?: string;

      minSampleSize?: number;
    }

    export interface AlertEventTrigger {
      events: Array<
        | 'CALL_ANALYSIS_COMPLETED'
        | 'CALL_ANALYSIS_FAILED'
        | 'CALL_ANALYSIS_CANCELLED'
        | 'SIMULATION_RUN_PLAN_JOB_STARTED'
        | 'SIMULATION_RUN_PLAN_JOB_COMPLETED'
        | 'SIMULATION_RUN_PLAN_JOB_FAILED'
        | 'SIMULATION_RUN_PLAN_JOB_CANCELLED'
        | 'SIMULATION_JOB_STARTED'
        | 'SIMULATION_JOB_COMPLETED'
        | 'SIMULATION_JOB_FAILED'
        | 'SIMULATION_JOB_CANCELLED'
        | 'METRIC_COLLECTION_JOB_COMPLETED'
        | 'METRIC_COLLECTION_JOB_FAILED'
        | 'CHAT_ANALYSIS_COMPLETED'
        | 'CHAT_ANALYSIS_FAILED'
        | 'ISSUE_OPENED'
        | 'ISSUE_RESOLVED'
      >;

      type: 'event';
    }

    export interface AlertSimulationTrigger {
      conditions: Array<'SUCCESS' | 'FAILURE' | 'THRESHOLD_FAILED'>;

      type: 'simulation';

      deliveryFormat?: 'MESSAGE' | 'PDF';

      plan?: string;
    }

    export interface Actions {
      slack?: Array<Actions.Slack>;

      webhooks?: Array<string>;
    }

    export namespace Actions {
      export interface Slack {
        channelId: string;

        channelName: string;
      }
    }
  }

  export interface ToolConfig {
    kind: 'tool';

    name: string;

    agent?: string;

    description?: string | null;

    expectedResult?: string | null;

    handler?: ToolConfig.Handler;

    invocationCriteria?: string | null;

    parameters?: { [key: string]: 'string' | 'number' | 'boolean' };
  }

  export namespace ToolConfig {
    export interface Handler {
      type: 'http';

      url: string;

      method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    }
  }

  export interface DashboardConfig {
    kind: 'dashboard';

    name: string;

    description?: string;

    displayName?: string;

    filters?: Array<DashboardConfig.Filter>;

    isDefault?: boolean;

    timeRange?:
      | DashboardConfig.UnionMember0
      | DashboardConfig.UnionMember1
      | DashboardConfig.UnionMember2
      | DashboardConfig.UnionMember3;

    widgets?: Array<DashboardConfig.Widget>;
  }

  export namespace DashboardConfig {
    export interface Filter {
      type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

      operator?:
        | 'EQUALS'
        | 'NOT_EQUALS'
        | 'GREATER_THAN'
        | 'GREATER_THAN_OR_EQUAL_TO'
        | 'LESS_THAN'
        | 'LESS_THAN_OR_EQUAL_TO'
        | 'CONTAINS'
        | 'STARTS_WITH'
        | 'IS_SET'
        | 'IS_NOT_SET';

      property?: string;

      value?: string | number | boolean;
    }

    export interface UnionMember0 {
      type: 'LAST';

      unit: 'DAYS' | 'WEEKS' | 'MONTHS';

      value: number;
    }

    export interface UnionMember1 {
      period:
        | 'TODAY'
        | 'YESTERDAY'
        | 'THIS_WEEK'
        | 'LAST_WEEK'
        | 'THIS_MONTH'
        | 'LAST_MONTH'
        | 'THIS_YEAR'
        | 'LAST_YEAR';

      type: 'CALENDAR_ALIGNED';
    }

    export interface UnionMember2 {
      from: string;

      to: string;

      type: 'FIXED';
    }

    export interface UnionMember3 {
      from: string;

      type: 'SINCE';
    }

    export interface Widget {
      measures: Array<Widget.Measure>;

      name: string;

      comparisonGroups?: Array<Widget.ComparisonGroup>;

      comparisonMode?: 'NONE' | 'PREVIOUS_PERIOD';

      description?: string;

      display?: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

      filters?: Array<Widget.Filter>;

      interval?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

      size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
    }

    export namespace Widget {
      export interface Measure {
        aggregation?: 'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE';

        breakdown?: Measure.Breakdown;

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

        distinctBy?: 'NONE' | 'CALL';

        filters?: Array<Measure.Filter>;

        isBaseline?: boolean;

        metric?: string;

        nestedAggregation?: 'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE';

        nestedAggregationPercentile?: number;

        passOperator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUAL_TO'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUAL_TO'
          | 'CONTAINS'
          | 'STARTS_WITH';

        passValue?: string | number | boolean;

        percentile?: number;

        type?: 'METRIC' | 'CONVERSATION' | 'UPTIME';
      }

      export namespace Measure {
        export interface Breakdown {
          type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'DATASET';

          property?: string;
        }

        export interface Filter {
          type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

          operator?:
            | 'EQUALS'
            | 'NOT_EQUALS'
            | 'GREATER_THAN'
            | 'GREATER_THAN_OR_EQUAL_TO'
            | 'LESS_THAN'
            | 'LESS_THAN_OR_EQUAL_TO'
            | 'CONTAINS'
            | 'STARTS_WITH'
            | 'IS_SET'
            | 'IS_NOT_SET';

          property?: string;

          value?: string | number | boolean;
        }
      }

      export interface ComparisonGroup {
        filters: Array<ComparisonGroup.Filter>;

        name: string;

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
      }

      export namespace ComparisonGroup {
        export interface Filter {
          type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

          operator?:
            | 'EQUALS'
            | 'NOT_EQUALS'
            | 'GREATER_THAN'
            | 'GREATER_THAN_OR_EQUAL_TO'
            | 'LESS_THAN'
            | 'LESS_THAN_OR_EQUAL_TO'
            | 'CONTAINS'
            | 'STARTS_WITH'
            | 'IS_SET'
            | 'IS_NOT_SET';

          property?: string;

          value?: string | number | boolean;
        }
      }

      export interface Filter {
        type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

        operator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUAL_TO'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUAL_TO'
          | 'CONTAINS'
          | 'STARTS_WITH'
          | 'IS_SET'
          | 'IS_NOT_SET';

        property?: string;

        value?: string | number | boolean;
      }
    }
  }

  export interface ProjectConfig {
    kind: 'project';

    name: string;

    category?:
      | 'HEALTHCARE'
      | 'FINANCIAL'
      | 'RETAIL'
      | 'HOSPITALITY'
      | 'AUTOMOTIVE'
      | 'GOVERNMENT'
      | 'EDUCATION'
      | 'REAL_ESTATE'
      | 'OTHER';

    dataStorageRegion?: 'US_EAST_1' | 'EU_WEST_1';

    description?: string;

    displayName?: string;

    members?: Array<ProjectConfig.Member>;

    resources?: Array<
      | ProjectConfig.AgentConfig
      | ProjectConfig.HTTPRequestDefinitionConfig
      | ProjectConfig.PersonaConfig
      | ProjectConfig.ImprovFlowConfig
      | ProjectConfig.ScriptedFlowConfig
      | ProjectConfig.CollectorConfig
      | ProjectConfig.MetricConfig
      | ProjectConfig.APICheckMetricConfig
      | ProjectConfig.SimulationPlanConfig
      | ProjectConfig.QaSimulationPlanConfig
      | ProjectConfig.SimulationGroupConfig
      | ProjectConfig.AlertConfig
      | ProjectConfig.ToolConfig
      | ProjectConfig.DashboardConfig
    >;
  }

  export namespace ProjectConfig {
    export interface Member {
      email: string;

      role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';
    }

    export interface AgentConfig {
      kind: 'agent';

      name: string;

      customId?: string | null;

      description?: string | null;

      displayName?: string;

      endpoints?: Array<AgentConfig.Endpoint>;

      prompt?: string | null;
    }

    export namespace AgentConfig {
      export interface Endpoint {
        value: string;

        direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

        environment?: string;

        outboundDialHttpRequestDefinition?: string;

        outboundDialType?: 'NONE' | 'HTTP_REQUEST';

        type?: 'PHONE' | 'WEBSOCKET';
      }
    }

    export interface HTTPRequestDefinitionConfig {
      kind: 'httpRequestDefinition';

      name: string;

      url: string;

      body?: string;

      description?: string | null;

      headers?: { [key: string]: string };

      method?: 'POST' | 'PUT' | 'PATCH' | 'GET';
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
        | 'CONSTRUCTION'
        | 'CRYING_BABY'
        | 'DRIVING'
        | 'LIBRARY'
        | 'OFFICE'
        | 'THUNDERSTORM'
        | 'TRAIN';

      backstoryPrompt?: string | null;

      baseEmotion?:
        | 'NEUTRAL'
        | 'CHEERFUL'
        | 'CONFUSED'
        | 'FRUSTRATED'
        | 'SKEPTICAL'
        | 'RUSHED'
        | 'DISTRACTED'
        | 'ANGRY'
        | 'ANXIOUS'
        | 'SAD';

      confirmationStyle?: 'EXPLICIT' | 'VAGUE';

      description?: string | null;

      displayName?: string;

      hasDisfluencies?: boolean;

      idleMessageMaxSpokenCount?: number;

      idleMessageResetCountOnUserSpeechEnabled?: boolean;

      idleMessages?: Array<string> | null;

      idleTimeoutSeconds?: number;

      intentClarity?: 'CLEAR' | 'INDIRECT' | 'VAGUE';

      interruption?: 'OFF' | 'BACKCHANNEL' | 'OCCASIONAL' | 'HEAVY';

      memoryReliability?: 'HIGH' | 'LOW';

      properties?: { [key: string]: unknown };

      responseTiming?: 'RELAXED' | 'NORMAL' | 'QUICK' | 'BARGE_IN';

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

        includeFlowExpectations?: boolean;

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

      adherence?: 'LOOSE' | 'STRICT';

      agents?: Array<string>;

      branchingMode?: 'DETERMINISTIC' | 'ADAPTIVE';

      description?: string | null;

      expectations?: Array<string>;

      offScript?: ScriptedFlowConfig.OffScript;

      title?: string;
    }

    export namespace ScriptedFlowConfig {
      export interface OffScript {
        maxAttempts?: number;

        reaction?: 'STAY_SILENT' | 'REPEAT' | 'RESPOND' | 'SAY';

        sayLine?: string;

        then?: 'HANG_UP' | 'MOVE_ON' | 'ADAPT' | 'HANG_UP_INVALIDATE';

        waitSeconds?: number;
      }
    }

    export interface CollectorConfig {
      kind: 'collector';

      metrics: Array<string | CollectorConfig.CollectorMetricConfig>;

      modality: 'call' | 'chat';

      name: string;

      displayName?: string;

      filters?: Array<CollectorConfig.Filter>;

      status?: 'ACTIVE' | 'INACTIVE';
    }

    export namespace CollectorConfig {
      export interface CollectorMetricConfig {
        metric: string;

        excludedPhrases?: Array<string>;

        screeningBrief?: string;

        verifiedProperties?: Array<string>;

        voicemailScript?: string;
      }

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

      calculationType?: 'LLM_JUDGE';

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

    export interface APICheckMetricConfig {
      calculationType: 'HTTP_REQUEST';

      httpRequest: APICheckMetricConfig.HTTPRequest;

      kind: 'metric';

      name: string;

      displayName?: string;

      falseLabel?: string;

      trueLabel?: string;
    }

    export namespace APICheckMetricConfig {
      export interface HTTPRequest {
        url: string;

        body?: string;

        headers?: { [key: string]: string };

        method?: 'GET' | 'POST';
      }
    }

    export interface SimulationPlanConfig {
      agentEndpoints: Array<SimulationPlanConfig.AgentEndpoint>;

      direction: 'INBOUND' | 'OUTBOUND';

      flows: Array<SimulationPlanConfig.Flow>;

      kind: 'simulationPlan';

      maxDurationSeconds: number;

      metrics: Array<string>;

      name: string;

      description?: string | null;

      endCallPhrases?: Array<string>;

      endCallReasons?: Array<string>;

      enrichWithLiveConversation?: boolean;

      executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

      includeAutomaticMetrics?: boolean;

      includeFlowMetrics?: boolean;

      iterations?: number;

      maxConcurrentJobs?: number;

      maxNoResponseRetries?: number;

      noResponseRetryBackoffSeconds?: number;

      notify?: SimulationPlanConfig.Notify;

      schedule?:
        | SimulationPlanConfig.UnionMember0
        | SimulationPlanConfig.UnionMember1
        | SimulationPlanConfig.UnionMember2
        | SimulationPlanConfig.UnionMember3
        | SimulationPlanConfig.UnionMember4
        | SimulationPlanConfig.UnionMember5;

      silenceTimeoutSeconds?: number;

      template?: 'manual';
    }

    export namespace SimulationPlanConfig {
      export interface AgentEndpoint {
        agent: string;

        direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

        value?: string;
      }

      export interface Flow {
        edgeCases?: Array<string>;

        flow?: string;

        happyPath?: boolean;

        personaOverride?: string;

        system?: string;
      }

      export interface Notify {
        email?: boolean | Array<string>;

        slack?: Array<Notify.Slack>;
      }

      export namespace Notify {
        export interface Slack {
          channelId: string;

          channelName: string;
        }
      }

      export interface UnionMember0 {
        type: 'hourly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        minute?: number;

        timezone?: string;
      }

      export interface UnionMember1 {
        everyMinutes: number;

        type: 'interval';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember2 {
        time: string;

        type: 'daily';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember3 {
        days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

        time: string;

        type: 'weekly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember4 {
        dayOfMonth: number;

        time: string;

        type: 'monthly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember5 {
        at: string;

        type: 'once';

        enabled?: boolean;

        timezone?: string;
      }
    }

    export interface QaSimulationPlanConfig {
      agentEndpoints: Array<QaSimulationPlanConfig.AgentEndpoint>;

      direction: 'INBOUND' | 'OUTBOUND';

      environment: string;

      kind: 'simulationPlan';

      maxDurationSeconds: number;

      name: string;

      persona: string;

      questions: Array<QaSimulationPlanConfig.Question>;

      template: 'question-answer-check';

      description?: string | null;

      endCallPhrases?: Array<string>;

      endCallReasons?: Array<string>;

      enrichWithLiveConversation?: boolean;

      executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';

      gradeWithKnowledgeBase?: boolean;

      includeAutomaticMetrics?: boolean;

      includeFlowMetrics?: boolean;

      iterations?: number;

      maxConcurrentJobs?: number;

      maxNoResponseRetries?: number;

      metrics?: Array<string>;

      noResponseRetryBackoffSeconds?: number;

      notify?: QaSimulationPlanConfig.Notify;

      schedule?:
        | QaSimulationPlanConfig.UnionMember0
        | QaSimulationPlanConfig.UnionMember1
        | QaSimulationPlanConfig.UnionMember2
        | QaSimulationPlanConfig.UnionMember3
        | QaSimulationPlanConfig.UnionMember4
        | QaSimulationPlanConfig.UnionMember5;

      silenceTimeoutSeconds?: number;
    }

    export namespace QaSimulationPlanConfig {
      export interface AgentEndpoint {
        agent: string;

        direction?: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';

        value?: string;
      }

      export interface Question {
        ask: string;

        expect?: string;

        name?: string;
      }

      export interface Notify {
        email?: boolean | Array<string>;

        slack?: Array<Notify.Slack>;
      }

      export namespace Notify {
        export interface Slack {
          channelId: string;

          channelName: string;
        }
      }

      export interface UnionMember0 {
        type: 'hourly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        minute?: number;

        timezone?: string;
      }

      export interface UnionMember1 {
        everyMinutes: number;

        type: 'interval';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember2 {
        time: string;

        type: 'daily';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember3 {
        days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

        time: string;

        type: 'weekly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember4 {
        dayOfMonth: number;

        time: string;

        type: 'monthly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember5 {
        at: string;

        type: 'once';

        enabled?: boolean;

        timezone?: string;
      }
    }

    export interface SimulationGroupConfig {
      kind: 'simulationGroup';

      name: string;

      plans: Array<string>;

      description?: string | null;

      notify?: SimulationGroupConfig.Notify;

      schedule?:
        | SimulationGroupConfig.UnionMember0
        | SimulationGroupConfig.UnionMember1
        | SimulationGroupConfig.UnionMember2
        | SimulationGroupConfig.UnionMember3
        | SimulationGroupConfig.UnionMember4
        | SimulationGroupConfig.UnionMember5;
    }

    export namespace SimulationGroupConfig {
      export interface Notify {
        email?: boolean | Array<string>;

        slack?: Array<Notify.Slack>;
      }

      export namespace Notify {
        export interface Slack {
          channelId: string;

          channelName: string;
        }
      }

      export interface UnionMember0 {
        type: 'hourly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        minute?: number;

        timezone?: string;
      }

      export interface UnionMember1 {
        everyMinutes: number;

        type: 'interval';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember2 {
        time: string;

        type: 'daily';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember3 {
        days: Array<'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'>;

        time: string;

        type: 'weekly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember4 {
        dayOfMonth: number;

        time: string;

        type: 'monthly';

        enabled?: boolean;

        endDate?: string;

        maxRuns?: number;

        timezone?: string;
      }

      export interface UnionMember5 {
        at: string;

        type: 'once';

        enabled?: boolean;

        timezone?: string;
      }
    }

    export interface AlertConfig {
      kind: 'alert';

      name: string;

      trigger:
        | AlertConfig.AlertThresholdTrigger
        | AlertConfig.AlertEventTrigger
        | AlertConfig.AlertSimulationTrigger;

      actions?: AlertConfig.Actions;

      displayName?: string;

      enabled?: boolean;
    }

    export namespace AlertConfig {
      export interface AlertThresholdTrigger {
        aggregation: 'COUNT' | 'RATE_PER_MINUTE' | 'MEAN';

        metric: string;

        operator: 'GT' | 'GTE' | 'LT' | 'LTE';

        thresholdValue: number;

        type: 'threshold';

        windowMinutes: number;

        consecutiveOpen?: number;

        consecutiveResolve?: number;

        grouping?: 'NONE' | 'BY_AGENT';

        metricVariant?: string;

        minSampleSize?: number;
      }

      export interface AlertEventTrigger {
        events: Array<
          | 'CALL_ANALYSIS_COMPLETED'
          | 'CALL_ANALYSIS_FAILED'
          | 'CALL_ANALYSIS_CANCELLED'
          | 'SIMULATION_RUN_PLAN_JOB_STARTED'
          | 'SIMULATION_RUN_PLAN_JOB_COMPLETED'
          | 'SIMULATION_RUN_PLAN_JOB_FAILED'
          | 'SIMULATION_RUN_PLAN_JOB_CANCELLED'
          | 'SIMULATION_JOB_STARTED'
          | 'SIMULATION_JOB_COMPLETED'
          | 'SIMULATION_JOB_FAILED'
          | 'SIMULATION_JOB_CANCELLED'
          | 'METRIC_COLLECTION_JOB_COMPLETED'
          | 'METRIC_COLLECTION_JOB_FAILED'
          | 'CHAT_ANALYSIS_COMPLETED'
          | 'CHAT_ANALYSIS_FAILED'
          | 'ISSUE_OPENED'
          | 'ISSUE_RESOLVED'
        >;

        type: 'event';
      }

      export interface AlertSimulationTrigger {
        conditions: Array<'SUCCESS' | 'FAILURE' | 'THRESHOLD_FAILED'>;

        type: 'simulation';

        deliveryFormat?: 'MESSAGE' | 'PDF';

        plan?: string;
      }

      export interface Actions {
        slack?: Array<Actions.Slack>;

        webhooks?: Array<string>;
      }

      export namespace Actions {
        export interface Slack {
          channelId: string;

          channelName: string;
        }
      }
    }

    export interface ToolConfig {
      kind: 'tool';

      name: string;

      agent?: string;

      description?: string | null;

      expectedResult?: string | null;

      handler?: ToolConfig.Handler;

      invocationCriteria?: string | null;

      parameters?: { [key: string]: 'string' | 'number' | 'boolean' };
    }

    export namespace ToolConfig {
      export interface Handler {
        type: 'http';

        url: string;

        method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
      }
    }

    export interface DashboardConfig {
      kind: 'dashboard';

      name: string;

      description?: string;

      displayName?: string;

      filters?: Array<DashboardConfig.Filter>;

      isDefault?: boolean;

      timeRange?:
        | DashboardConfig.UnionMember0
        | DashboardConfig.UnionMember1
        | DashboardConfig.UnionMember2
        | DashboardConfig.UnionMember3;

      widgets?: Array<DashboardConfig.Widget>;
    }

    export namespace DashboardConfig {
      export interface Filter {
        type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

        operator?:
          | 'EQUALS'
          | 'NOT_EQUALS'
          | 'GREATER_THAN'
          | 'GREATER_THAN_OR_EQUAL_TO'
          | 'LESS_THAN'
          | 'LESS_THAN_OR_EQUAL_TO'
          | 'CONTAINS'
          | 'STARTS_WITH'
          | 'IS_SET'
          | 'IS_NOT_SET';

        property?: string;

        value?: string | number | boolean;
      }

      export interface UnionMember0 {
        type: 'LAST';

        unit: 'DAYS' | 'WEEKS' | 'MONTHS';

        value: number;
      }

      export interface UnionMember1 {
        period:
          | 'TODAY'
          | 'YESTERDAY'
          | 'THIS_WEEK'
          | 'LAST_WEEK'
          | 'THIS_MONTH'
          | 'LAST_MONTH'
          | 'THIS_YEAR'
          | 'LAST_YEAR';

        type: 'CALENDAR_ALIGNED';
      }

      export interface UnionMember2 {
        from: string;

        to: string;

        type: 'FIXED';
      }

      export interface UnionMember3 {
        from: string;

        type: 'SINCE';
      }

      export interface Widget {
        measures: Array<Widget.Measure>;

        name: string;

        comparisonGroups?: Array<Widget.ComparisonGroup>;

        comparisonMode?: 'NONE' | 'PREVIOUS_PERIOD';

        description?: string;

        display?: 'LINE' | 'NUMBER' | 'RADAR' | 'STACKED_BAR' | 'TABLE';

        filters?: Array<Widget.Filter>;

        interval?: 'HOUR' | 'DAY' | 'WEEK' | 'MONTH';

        size?: 'SMALL' | 'MEDIUM' | 'LARGE' | 'EXTRA_LARGE';
      }

      export namespace Widget {
        export interface Measure {
          aggregation?: 'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE';

          breakdown?: Measure.Breakdown;

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

          distinctBy?: 'NONE' | 'CALL';

          filters?: Array<Measure.Filter>;

          isBaseline?: boolean;

          metric?: string;

          nestedAggregation?: 'COUNT' | 'AVG' | 'MIN' | 'MAX' | 'SUM' | 'MEDIAN' | 'PERCENTILE' | 'PASS_RATE';

          nestedAggregationPercentile?: number;

          passOperator?:
            | 'EQUALS'
            | 'NOT_EQUALS'
            | 'GREATER_THAN'
            | 'GREATER_THAN_OR_EQUAL_TO'
            | 'LESS_THAN'
            | 'LESS_THAN_OR_EQUAL_TO'
            | 'CONTAINS'
            | 'STARTS_WITH';

          passValue?: string | number | boolean;

          percentile?: number;

          type?: 'METRIC' | 'CONVERSATION' | 'UPTIME';
        }

        export namespace Measure {
          export interface Breakdown {
            type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'DATASET';

            property?: string;
          }

          export interface Filter {
            type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

            operator?:
              | 'EQUALS'
              | 'NOT_EQUALS'
              | 'GREATER_THAN'
              | 'GREATER_THAN_OR_EQUAL_TO'
              | 'LESS_THAN'
              | 'LESS_THAN_OR_EQUAL_TO'
              | 'CONTAINS'
              | 'STARTS_WITH'
              | 'IS_SET'
              | 'IS_NOT_SET';

            property?: string;

            value?: string | number | boolean;
          }
        }

        export interface ComparisonGroup {
          filters: Array<ComparisonGroup.Filter>;

          name: string;

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
        }

        export namespace ComparisonGroup {
          export interface Filter {
            type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

            operator?:
              | 'EQUALS'
              | 'NOT_EQUALS'
              | 'GREATER_THAN'
              | 'GREATER_THAN_OR_EQUAL_TO'
              | 'LESS_THAN'
              | 'LESS_THAN_OR_EQUAL_TO'
              | 'CONTAINS'
              | 'STARTS_WITH'
              | 'IS_SET'
              | 'IS_NOT_SET';

            property?: string;

            value?: string | number | boolean;
          }
        }

        export interface Filter {
          type: 'METRIC_PROPERTY' | 'CALL_PROPERTY' | 'AGENT_PROPERTY' | 'CALL_ID' | 'MODALITY' | 'DATASET';

          operator?:
            | 'EQUALS'
            | 'NOT_EQUALS'
            | 'GREATER_THAN'
            | 'GREATER_THAN_OR_EQUAL_TO'
            | 'LESS_THAN'
            | 'LESS_THAN_OR_EQUAL_TO'
            | 'CONTAINS'
            | 'STARTS_WITH'
            | 'IS_SET'
            | 'IS_NOT_SET';

          property?: string;

          value?: string | number | boolean;
        }
      }
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
