import {
  defineAgent,
  defineTool,
  defineConfig,
  defineImprovFlow,
  defineQaSimulationPlan,
  type ImprovFlowConfig,
  type QaSimulationPlanConfig,
} from '@roarkanalytics/sdk/lib/config';

describe('config builders', () => {
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
