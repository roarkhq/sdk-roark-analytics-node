import {
  defineAgent,
  defineAlert,
  defineCollector,
  defineDashboard,
  defineHTTPRequestDefinition,
  defineMetric,
  defineApiCheck,
  definePersona,
  defineProject,
  defineScriptedFlow,
  defineSimulationGroup,
  defineSimulationPlan,
  defineTool,
  defineConfig,
  defineImprovFlow,
  defineQaSimulationPlan,
  type ImprovFlowConfig,
  type QaSimulationPlanConfig,
  type ResourceConfig,
} from '@roarkanalytics/sdk/lib/config';

// Every resource type the config endpoints accept has a define* helper. Codegen adds a new resource
// type to ConfigApplyParams on its own, but the helpers in src/lib/config.ts are written by hand, so
// a new kind, or a new variant of an existing kind (a second `kind: metric` shape), fails to
// type-check here until it has one. The error names the type with no helper, e.g.
// `Type 'boolean' is not assignable to type 'ApiCheckMetricConfig'`. Add the helper, then add it to
// this list.
//
// Limit: Exclude drops a new type that is assignable to an existing helper's return type, so a
// variant that differs from one only by optional or extra fields would pass. A variant is caught when
// it sets a different literal on a property the existing type declares, as `kind`, flow `type`,
// metric `calculationType` and plan `template` do.
type DefinedResource =
  | ReturnType<typeof defineAgent>
  | ReturnType<typeof defineHTTPRequestDefinition>
  | ReturnType<typeof definePersona>
  | ReturnType<typeof defineImprovFlow>
  | ReturnType<typeof defineScriptedFlow>
  | ReturnType<typeof defineCollector>
  | ReturnType<typeof defineMetric>
  | ReturnType<typeof defineApiCheck>
  | ReturnType<typeof defineSimulationPlan>
  | ReturnType<typeof defineQaSimulationPlan>
  | ReturnType<typeof defineSimulationGroup>
  | ReturnType<typeof defineAlert>
  | ReturnType<typeof defineTool>
  | ReturnType<typeof defineDashboard>
  | ReturnType<typeof defineProject>;
type ResourceWithoutHelper = Exclude<ResourceConfig, DefinedResource>;
const everyResourceHasAHelper: [ResourceWithoutHelper] extends [never] ? true : ResourceWithoutHelper = true;

describe('config builders', () => {
  test('every config resource type has a define* helper', () => {
    expect(everyResourceHasAHelper).toBe(true);
  });

  test('defineAgent injects kind', () => {
    expect(defineAgent({ name: 'front-desk', displayName: 'Front Desk' })).toEqual({
      kind: 'agent',
      name: 'front-desk',
      displayName: 'Front Desk',
    });
  });

  test('defineTool resolves an agent construct to its name', () => {
    const agent = defineAgent({ name: 'front-desk' });
    expect(defineTool({ name: 'book', agent, parameters: { date: 'string' } })).toEqual({
      kind: 'tool',
      name: 'book',
      agent: 'front-desk',
      parameters: { date: 'string' },
    });
  });

  test('defineTool accepts a bare agent name', () => {
    expect(defineTool({ name: 'book', agent: 'front-desk' }).agent).toBe('front-desk');
  });

  test('defineTool omits agent when none is given (project-wide tool)', () => {
    const tool = defineTool({ name: 'ping' });
    expect(tool.kind).toBe('tool');
    expect('agent' in tool).toBe(false);
  });

  test('defineImprovFlow injects both kind and the improv discriminator', () => {
    // Runtime-shape check: the builder only injects discriminators, so a minimal
    // input is enough to assert them.
    const flow = defineImprovFlow({ name: 'greet' } as unknown as Omit<ImprovFlowConfig, 'kind' | 'type'>);
    expect(flow.kind).toBe('flow');
    expect(flow.type).toBe('improv');
  });

  test('defineApiCheck injects kind and the HTTP_REQUEST engine', () => {
    expect(
      defineApiCheck({ name: 'pin_changed', httpRequest: { url: 'https://example.com/checks/pin' } }),
    ).toEqual({
      kind: 'metric',
      calculationType: 'HTTP_REQUEST',
      name: 'pin_changed',
      httpRequest: { url: 'https://example.com/checks/pin' },
    });
  });

  test('defineQaSimulationPlan injects the qa template', () => {
    const plan = defineQaSimulationPlan({
      name: 'kb-check',
    } as unknown as Omit<QaSimulationPlanConfig, 'kind' | 'template'>);
    expect(plan.kind).toBe('simulationPlan');
    expect(plan.template).toBe('question-answer-check');
  });

  test('defineConfig assembles a bundle and passes prune through', () => {
    const cfg = defineConfig({ resources: [defineAgent({ name: 'a' })], prune: false });
    expect(cfg.resources).toHaveLength(1);
    expect(cfg.prune).toBe(false);
  });

  test('defineConfig omits prune when unset (server default applies)', () => {
    expect('prune' in defineConfig({ resources: [] })).toBe(false);
  });
});
