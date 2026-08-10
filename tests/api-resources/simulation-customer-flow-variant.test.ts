// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource simulationCustomerFlowVariant', () => {
  test('create: only required params', async () => {
    const responsePromise = client.simulationCustomerFlowVariant.create(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { title: 'x' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.simulationCustomerFlowVariant.create(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      {
        title: 'x',
        environmentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        isDefault: true,
        personaOverrideId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        precededByCustomerFlowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        precededByCustomerFlowVariantId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
        prompt: 'prompt',
      },
    );
  });

  test('update: only required params', async () => {
    const responsePromise = client.simulationCustomerFlowVariant.update(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { flowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('update: required and optional params', async () => {
    const response = await client.simulationCustomerFlowVariant.update(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      {
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
      },
    );
  });

  test('list', async () => {
    const responsePromise = client.simulationCustomerFlowVariant.list('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: only required params', async () => {
    const responsePromise = client.simulationCustomerFlowVariant.delete(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { flowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.simulationCustomerFlowVariant.delete(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { flowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
    );
  });

  test('getByID: only required params', async () => {
    const responsePromise = client.simulationCustomerFlowVariant.getByID(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { flowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getByID: required and optional params', async () => {
    const response = await client.simulationCustomerFlowVariant.getByID(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { flowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
    );
  });

  test('setDefault: only required params', async () => {
    const responsePromise = client.simulationCustomerFlowVariant.setDefault(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { flowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('setDefault: required and optional params', async () => {
    const response = await client.simulationCustomerFlowVariant.setDefault(
      '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      { flowId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' },
    );
  });
});
