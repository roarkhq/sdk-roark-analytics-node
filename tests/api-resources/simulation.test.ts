// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource simulation', () => {
  test('mockTool: only required params', async () => {
    const responsePromise = client.simulation.mockTool({
      simulationJobId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      toolName: 'book_appointment',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('mockTool: required and optional params', async () => {
    const response = await client.simulation.mockTool({
      simulationJobId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      toolName: 'book_appointment',
      arguments: { date: '2026-10-01', time: '15:00' },
      sessionId: 'sessionId',
      toolDescription:
        'Books an appointment. Args: date (YYYY-MM-DD), time (HH:MM). Returns {confirmationId, status}.',
    });
  });

  test('run: only required params', async () => {
    const responsePromise = client.simulation.run({
      plan: {
        agentEndpoints: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
        direction: 'INBOUND',
        maxSimulationDurationSeconds: 300,
        metrics: [{}],
      },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('run: required and optional params', async () => {
    const response = await client.simulation.run({
      plan: {
        agentEndpoints: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
        direction: 'INBOUND',
        maxSimulationDurationSeconds: 300,
        metrics: [
          {
            conversationSource: 'SIMULATED',
            id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            metricId: 'x',
            minPassRate: 80,
            slug: 'x',
          },
        ],
        comparisonBaseline: 'NONE',
        comparisonProperty: 'BACKGROUND_NOISE',
        comparisonValues: ['NONE', 'CITY', 'TRAIN'],
        description: 'A run plan for testing inbound calls',
        endCallPhrases: ['goodbye'],
        endCallReasons: ['Order has been confirmed by the agent'],
        enrichWithLiveConversation: false,
        executionMode: 'PARALLEL',
        flows: [
          {
            edgeCases: 'ALL',
            happyPath: true,
            id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            overrides: [
              { property: 'ACCENT', value: 'IN' },
              { property: 'BACKGROUND_NOISE', value: 'TRAIN' },
            ],
            personaOverrideId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            slug: 'sf-prompt-injection',
            variables: { customerName: 'John Doe', appointmentDate: '2024-02-15' },
          },
        ],
        includeAutomaticMetrics: true,
        includeFlowMetrics: true,
        iterationCount: 1,
        maxConcurrentJobs: 5,
        name: 'Billing regression',
        personas: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
        scenarios: [
          {
            id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            variables: { customerName: 'John Doe', appointmentDate: '2024-02-15' },
          },
        ],
        silenceTimeoutSeconds: 30,
      },
      saveAsPlan: true,
      variables: { orderNumber: '12345', environment: 'staging' },
    });
  });
});
