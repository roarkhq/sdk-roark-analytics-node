// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource customerFlowEdgeCase', () => {
  test('update: only required params', async () => {
    const responsePromise = client.customerFlowEdgeCase.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      flowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.customerFlowEdgeCase.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      flowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      additionalExpectations: [
        { prompt: 'The agent confirmed the new appointment time back to the customer' },
      ],
      environmentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      personaOverrideId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      precededByCustomerFlowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      precededByCustomerFlowVariantId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      prompt: 'prompt',
      title: 'x',
    });
  });

  test('add: only required params', async () => {
    const responsePromise = client.customerFlowEdgeCase.add('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      title: 'x',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('add: required and optional params', async () => {
    const response = await client.customerFlowEdgeCase.add('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      title: 'x',
      environmentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      personaOverrideId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      precededByCustomerFlowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      precededByCustomerFlowVariantId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      prompt: 'prompt',
    });
  });

  test('promote: only required params', async () => {
    const responsePromise = client.customerFlowEdgeCase.promote('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      flowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('promote: required and optional params', async () => {
    const response = await client.customerFlowEdgeCase.promote('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      flowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('remove: only required params', async () => {
    const responsePromise = client.customerFlowEdgeCase.remove('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      flowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('remove: required and optional params', async () => {
    const response = await client.customerFlowEdgeCase.remove('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      flowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });
});
