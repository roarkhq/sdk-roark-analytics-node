// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource simulationRunPlan', () => {
  test('create: only required params', async () => {
    const responsePromise = client.simulationRunPlan.create({
      agentEndpoints: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
      direction: 'INBOUND',
      evaluators: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
      maxSimulationDurationSeconds: 300,
      name: 'My Run Plan',
      personas: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
      scenarios: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.simulationRunPlan.create({
      agentEndpoints: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
      direction: 'INBOUND',
      evaluators: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
      maxSimulationDurationSeconds: 300,
      name: 'My Run Plan',
      personas: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
      scenarios: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
      autoRun: false,
      description: 'A run plan for testing inbound calls',
      executionMode: 'PARALLEL',
      iterationCount: 1,
      maxConcurrentJobs: 5,
      silenceTimeoutSeconds: 30,
    });
  });

  test('update', async () => {
    const responsePromise = client.simulationRunPlan.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.simulationRunPlan.update(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          agentEndpoints: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
          description: 'description',
          direction: 'INBOUND',
          evaluators: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
          executionMode: 'PARALLEL',
          iterationCount: 1,
          maxConcurrentJobs: 1,
          maxSimulationDurationSeconds: 1,
          name: 'x',
          personas: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
          scenarios: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],
          silenceTimeoutSeconds: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.simulationRunPlan.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.simulationRunPlan.list(
        {
          after: 'after',
          agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          limit: 20,
          searchText: 'searchText',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.simulationRunPlan.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getByID', async () => {
    const responsePromise = client.simulationRunPlan.getByID('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
