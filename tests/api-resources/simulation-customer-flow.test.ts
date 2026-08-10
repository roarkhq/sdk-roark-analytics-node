// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource simulationCustomerFlow', () => {
  test('create: only required params', async () => {
    const responsePromise = client.simulationCustomerFlow.create({
      agentIds: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
      mode: 'UNSCRIPTED',
      title: 'Reschedule an appointment',
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
    const response = await client.simulationCustomerFlow.create({
      agentIds: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
      mode: 'UNSCRIPTED',
      title: 'Reschedule an appointment',
      agentExpectations: [{ llmPrompt: 'x' }],
      description: 'description',
      scriptedBranchingMode: 'DETERMINISTIC',
      steps: [
        {
          type: 'AGENT_TURN',
          content: 'content',
          dtmfDigits: 'dtmfDigits',
          linkedCustomerFlowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          linkedCustomerFlowVariantId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          mergeIntoNodeIds: ['x'],
          nodeId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          ref: 'x',
          silenceDurationSeconds: 1,
          steps: [],
        },
      ],
      variants: [
        {
          title: 'x',
          environmentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          isDefault: true,
          personaId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          precededByCustomerFlowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          precededByCustomerFlowVariantId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          prompt: 'prompt',
        },
      ],
    });
  });

  test('update', async () => {
    const responsePromise = client.simulationCustomerFlow.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
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
      client.simulationCustomerFlow.update(
        '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        {
          agentExpectations: [{ llmPrompt: 'x' }],
          agentIds: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'],
          description: 'description',
          scriptedBranchingMode: 'DETERMINISTIC',
          title: 'x',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.simulationCustomerFlow.list();
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
      client.simulationCustomerFlow.list(
        {
          after: 'after',
          includeSystem: 'true',
          limit: 1,
          mode: 'UNSCRIPTED',
          searchText: 'searchText',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.simulationCustomerFlow.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getByID', async () => {
    const responsePromise = client.simulationCustomerFlow.getByID('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('replaceSteps: only required params', async () => {
    const responsePromise = client.simulationCustomerFlow.replaceSteps(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { steps: [{ type: 'AGENT_TURN' }] },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('replaceSteps: required and optional params', async () => {
    const response = await client.simulationCustomerFlow.replaceSteps(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      {
        steps: [
          {
            type: 'AGENT_TURN',
            content: 'content',
            dtmfDigits: 'dtmfDigits',
            linkedCustomerFlowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            linkedCustomerFlowVariantId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            mergeIntoNodeIds: ['x'],
            nodeId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            ref: 'x',
            silenceDurationSeconds: 1,
            steps: [],
          },
        ],
        allowUnmerge: true,
      },
    );
  });
});
