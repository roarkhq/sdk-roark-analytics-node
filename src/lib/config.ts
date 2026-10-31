// Code-first config authoring: a typed, ergonomic alternative to hand-written
// config YAML. Build agents, tools, personas, flows, metrics and the rest in
// TypeScript, then ship them with `client.config.apply(...)` (or preview with
// `client.config.diff(...)`).
//
// Each `define*` helper injects the resource's `kind` (and any fixed
// discriminator) and returns the exact param object the config endpoints expect,
// so the output is identical to the YAML path: both produce a config bundle.
// Input types are DERIVED from the generated `ConfigApplyParams`, so a new field
// on a resource (for example a tool `handler`) shows up here automatically on the
// next codegen, with no change to this file.
//
// This lives in `src/lib`, which Stainless codegen never touches. Import it from
// `@roarkanalytics/sdk/lib/config`.

import type { ConfigApplyParams } from '../resources/config';

// ── Cross-references ──
// A resource that points at another by name accepts either the construct a
// `define*` helper returned (its `name` is used) or a bare name string.
export type Ref<T extends { name: string }> = T | string;

const refName = <T extends { name: string }>(ref: Ref<T>): string =>
  typeof ref === 'string' ? ref : ref.name;

// ── Friendly aliases for the generated param types ──
export type AgentConfig = ConfigApplyParams.AgentConfig;
export type HTTPRequestDefinitionConfig = ConfigApplyParams.HTTPRequestDefinitionConfig;
export type PersonaConfig = ConfigApplyParams.PersonaConfig;
export type ImprovFlowConfig = ConfigApplyParams.ImprovFlowConfig;
export type ScriptedFlowConfig = ConfigApplyParams.ScriptedFlowConfig;
export type CollectorConfig = ConfigApplyParams.CollectorConfig;
export type MetricConfig = ConfigApplyParams.MetricConfig;
export type APICheckMetricConfig = ConfigApplyParams.APICheckMetricConfig;
export type ThresholdMetricConfig = ConfigApplyParams.ThresholdMetricConfig;
export type SimulationPlanConfig = ConfigApplyParams.SimulationPlanConfig;
export type QaSimulationPlanConfig = ConfigApplyParams.QaSimulationPlanConfig;
export type SimulationGroupConfig = ConfigApplyParams.SimulationGroupConfig;
export type AlertConfig = ConfigApplyParams.AlertConfig;
export type ToolConfig = ConfigApplyParams.ToolConfig;
export type DashboardConfig = ConfigApplyParams.DashboardConfig;
export type ProjectConfig = ConfigApplyParams.ProjectConfig;

/** Any resource a config bundle can carry. */
export type ResourceConfig = ConfigApplyParams['resources'][number];

// ── Builders ──
// Prompts are just strings here: pass an inline template literal or
// `readFileSync('./prompt.md', 'utf8')`. No `file://` sentinel needed.

export const defineAgent = (agent: Omit<AgentConfig, 'kind'>): AgentConfig => ({ kind: 'agent', ...agent });

export const defineHTTPRequestDefinition = (
  def: Omit<HTTPRequestDefinitionConfig, 'kind'>,
): HTTPRequestDefinitionConfig => ({ kind: 'httpRequestDefinition', ...def });

export const definePersona = (persona: Omit<PersonaConfig, 'kind'>): PersonaConfig => ({
  kind: 'persona',
  ...persona,
});

export const defineImprovFlow = (flow: Omit<ImprovFlowConfig, 'kind' | 'type'>): ImprovFlowConfig => ({
  kind: 'flow',
  type: 'improv',
  ...flow,
});

export const defineScriptedFlow = (flow: Omit<ScriptedFlowConfig, 'kind' | 'type'>): ScriptedFlowConfig => ({
  kind: 'flow',
  type: 'scripted',
  ...flow,
});

export const defineCollector = (collector: Omit<CollectorConfig, 'kind'>): CollectorConfig => ({
  kind: 'collector',
  ...collector,
});

export const defineMetric = (metric: Omit<MetricConfig, 'kind'>): MetricConfig => ({
  kind: 'metric',
  ...metric,
});

export const defineApiCheck = (
  check: Omit<APICheckMetricConfig, 'kind' | 'calculationType'>,
): APICheckMetricConfig => ({
  kind: 'metric',
  calculationType: 'HTTP_REQUEST',
  ...check,
});

export const defineThreshold = (
  threshold: Omit<ThresholdMetricConfig, 'kind' | 'calculationType'>,
): ThresholdMetricConfig => ({
  kind: 'metric',
  calculationType: 'THRESHOLD',
  ...threshold,
});

export const defineSimulationPlan = (plan: Omit<SimulationPlanConfig, 'kind'>): SimulationPlanConfig => ({
  kind: 'simulationPlan',
  ...plan,
});

export const defineQaSimulationPlan = (
  plan: Omit<QaSimulationPlanConfig, 'kind' | 'template'>,
): QaSimulationPlanConfig => ({ kind: 'simulationPlan', template: 'question-answer-check', ...plan });

export const defineSimulationGroup = (group: Omit<SimulationGroupConfig, 'kind'>): SimulationGroupConfig => ({
  kind: 'simulationGroup',
  ...group,
});

export const defineAlert = (alert: Omit<AlertConfig, 'kind'>): AlertConfig => ({ kind: 'alert', ...alert });

export const defineDashboard = (dashboard: Omit<DashboardConfig, 'kind'>): DashboardConfig => ({
  kind: 'dashboard',
  ...dashboard,
});

export const defineProject = (project: Omit<ProjectConfig, 'kind'>): ProjectConfig => ({
  kind: 'project',
  ...project,
});

/** Input to `defineTool`: `agent` accepts the agent construct or a name string. */
export type DefineToolInput = Omit<ToolConfig, 'kind' | 'agent'> & {
  /** Scope the tool to one agent (omit for a project-wide tool). */
  agent?: Ref<AgentConfig>;
};

export const defineTool = (tool: DefineToolInput): ToolConfig => {
  const { agent, ...rest } = tool;
  return { kind: 'tool', ...rest, ...(agent === undefined ? {} : { agent: refName(agent) }) };
};

// ── The bundle ──
// `defineConfig` assembles the bundle you hand to `client.config.apply(bundle)`
// or `client.config.diff(bundle)`. `resources` accepts both construct outputs
// and raw resource objects, so a kind without a dedicated builder still fits.

export const defineConfig = (bundle: {
  resources: Array<ResourceConfig>;
  /** When true (the server default) config-managed resources absent from the bundle are deleted. */
  prune?: boolean;
}): ConfigApplyParams => ({
  resources: bundle.resources,
  ...(bundle.prune === undefined ? {} : { prune: bundle.prune }),
});
