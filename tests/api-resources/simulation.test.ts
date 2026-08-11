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
            id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            metricId: 'x',
            slug: 'x',
          },
        ],
        description: 'A run plan for testing inbound calls',
        endCallPhrases: ['goodbye'],
        endCallReasons: ['Order has been confirmed by the agent'],
        executionMode: 'PARALLEL',
        flows: [
          {
            customerFlowId: '550e8400-e29b-41d4-a716-446655440000',
            variants: [
              {
                id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
                personaOverrideId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
                variables: { tier: 'premium' },
              },
              {
                id: '9f8c7b6a-5d4e-4c3b-8a29-1e0f2d3c4b5a',
                personaOverrideId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
                variables: { tier: 'basic' },
              },
            ],
            personaOverrideId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            variables: { foo: 'string' },
            variantSelectionMode: 'ALL_VARIANTS',
          },
        ],
        iterationCount: 1,
        maxConcurrentJobs: 5,
        personas: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
        scenarios: [
          {
            id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            variables: { customerName: 'John Doe', appointmentDate: '2024-02-15' },
          },
        ],
        silenceTimeoutSeconds: 30,
      },
      savePlanAs: 'Billing regression',
      variables: { orderNumber: '12345', environment: 'staging' },
    });
  });
});
