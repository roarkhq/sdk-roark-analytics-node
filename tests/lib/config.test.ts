import {
  defineAgent,
  defineAlert,
  defineCollector,
  defineDashboard,
  defineHTTPRequestDefinition,
  defineMetric,
  defineApiCheck,
  defineThreshold,
  definePersona,
  defineProject,
  defineScriptedFlow,
  defineSimulationGroup,
  defineSimulationPlan,
  defineTool,
  type DefineToolInput,
  defineConfig,
  defineImprovFlow,
  defineLiveReport,
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
  | ReturnType<typeof defineThreshold>
  | ReturnType<typeof defineSimulationPlan>
  | ReturnType<typeof defineQaSimulationPlan>
  | ReturnType<typeof defineSimulationGroup>
  | ReturnType<typeof defineAlert>
  | ReturnType<typeof defineTool>
  | ReturnType<typeof defineDashboard>
  | ReturnType<typeof defineLiveReport>
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

  // `handler` became a discriminated union on `type` in the regeneration that added calendar
  // tools, so `ToolConfig.Handler` is gone and both variants are anonymous members. These pin
  // that each one survives `defineTool` untouched, and that picking the wrong `type` for a
  // variant's fields does not compile.
  test('defineTool passes an http handler through, including the fields added with the union', () => {
    const tool = defineTool({
      name: 'book',
      handler: {
        type: 'http',
        url: 'https://example.test/book',
        method: 'POST',
        body: '{"date":"{{date}}"}',
        headers: { 'content-type': 'application/json' },
        timeoutMs: 5_000,
      },
    });
    expect(tool.handler).toEqual({
      type: 'http',
      url: 'https://example.test/book',
      method: 'POST',
      body: '{"date":"{{date}}"}',
      headers: { 'content-type': 'application/json' },
      timeoutMs: 5_000,
    });
  });

  test('defineTool passes a calendar handler through', () => {
    // `calendarConnection` is a connection **id**, not a name, and deliberately not a `Ref`:
    // a connection holds a provider credential, so it is not a config resource and never will
    // be (`toolCalendarHandlerConfigSchema` says so). There is no construct to hand over here.
    const tool = defineTool({
      name: 'book-appointment',
      handler: {
        type: 'calendar',
        calendarConnection: '6f9b1f4e-3c2a-4d58-9d41-7c0b2e8a5f13',
        operation: 'BOOK',
        appointmentTypes: [{ eventTypeId: 42, name: 'Consultation', durationMinutes: 30 }],
        simulate: true,
      },
    });
    expect(tool.handler).toEqual({
      type: 'calendar',
      calendarConnection: '6f9b1f4e-3c2a-4d58-9d41-7c0b2e8a5f13',
      operation: 'BOOK',
      appointmentTypes: [{ eventTypeId: 42, name: 'Consultation', durationMinutes: 30 }],
      simulate: true,
    });
  });

  test('defineTool still resolves the agent when a handler is given', () => {
    const agent = defineAgent({ name: 'front-desk' });
    const tool = defineTool({ name: 'book', agent, handler: { type: 'http', url: 'https://example.test' } });
    expect(tool.agent).toBe('front-desk');
    expect(tool.handler).toEqual({ type: 'http', url: 'https://example.test' });
  });

  test("a handler variant cannot borrow the other variant's discriminator", () => {
    const wrong: DefineToolInput = {
      name: 'book',
      // @ts-expect-error - `url` belongs to the http variant; the calendar one has no such field.
      handler: { type: 'calendar', url: 'https://example.test' },
    };
    expect(wrong.name).toBe('book');
  });

  test('defineLiveReport resolves agent and dashboard constructs to their names', () => {
    const agent = defineAgent({ name: 'front-desk' });
    const dashboard = defineDashboard({ name: 'front-desk-health' });
    expect(defineLiveReport({ name: 'weekly', agent, dashboard, cadence: 'WEEKLY' })).toEqual({
      kind: 'liveReport',
      name: 'weekly',
      agent: 'front-desk',
      dashboard: 'front-desk-health',
      cadence: 'WEEKLY',
    });
  });

  test('defineLiveReport accepts bare names, and omits both when neither is given', () => {
    expect(defineLiveReport({ name: 'weekly', agent: 'front-desk', dashboard: 'health' })).toMatchObject({
      agent: 'front-desk',
      dashboard: 'health',
    });
    const report = defineLiveReport({ name: 'project-wide' });
    expect(report.kind).toBe('liveReport');
    expect('agent' in report).toBe(false);
    expect('dashboard' in report).toBe(false);
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

  test('defineThreshold injects kind and the THRESHOLD engine', () => {
    expect(
      defineThreshold({ name: 'latency_under_2s', sourceMetric: 'latency', operator: 'LESS_THAN', value: 2 }),
    ).toEqual({
      kind: 'metric',
      calculationType: 'THRESHOLD',
      name: 'latency_under_2s',
      sourceMetric: 'latency',
      operator: 'LESS_THAN',
      value: 2,
    });
  });

  test('defineThreshold passes a boolean COUNT threshold through', () => {
    expect(
      defineThreshold({
        name: 'never_interrupts',
        sourceMetric: 'interrupted_caller',
        operator: 'EQUALS',
        value: false,
        aggregationMode: 'COUNT',
        countThreshold: 1,
        sourceParticipantRole: 'AGENT',
        trueLabel: 'Polite',
        falseLabel: 'Interrupts',
      }),
    ).toEqual({
      kind: 'metric',
      calculationType: 'THRESHOLD',
      name: 'never_interrupts',
      sourceMetric: 'interrupted_caller',
      operator: 'EQUALS',
      value: false,
      aggregationMode: 'COUNT',
      countThreshold: 1,
      sourceParticipantRole: 'AGENT',
      trueLabel: 'Polite',
      falseLabel: 'Interrupts',
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
