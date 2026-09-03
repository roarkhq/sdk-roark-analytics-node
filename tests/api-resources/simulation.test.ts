// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource simulation', () => {
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
            slug: 'x',
          },
        ],
        description: 'A run plan for testing inbound calls',
        endCallPhrases: ['goodbye'],
        endCallReasons: ['Order has been confirmed by the agent'],
        enrichWithLiveConversation: false,
        executionMode: 'PARALLEL',
        flows: [
          {
            id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            edgeCases: 'ALL',
            happyPath: true,
            personaOverrideId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            variables: { customerName: 'John Doe', appointmentDate: '2024-02-15' },
          },
        ],
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
