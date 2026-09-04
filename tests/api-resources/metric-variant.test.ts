// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource metricVariant', () => {
  test('create: only required params', async () => {
    const responsePromise = client.metricVariant.create('idOrSlug', { name: 'Strict' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.metricVariant.create('idOrSlug', { name: 'Strict' });
  });

  test('update: only required params', async () => {
    const responsePromise = client.metricVariant.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      idOrSlug: 'idOrSlug',
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
    const response = await client.metricVariant.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      idOrSlug: 'idOrSlug',
      booleanFalseLabel: 'booleanFalseLabel',
      booleanTrueLabel: 'booleanTrueLabel',
      changeReason: 'changeReason',
      llmPrompt: 'llmPrompt',
      maxClassifications: 1,
      name: 'x',
      scaleMax: 0,
      scaleMin: 0,
    });
  });

  test('list', async () => {
    const responsePromise = client.metricVariant.list('idOrSlug');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: only required params', async () => {
    const responsePromise = client.metricVariant.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      idOrSlug: 'idOrSlug',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete: required and optional params', async () => {
    const response = await client.metricVariant.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      idOrSlug: 'idOrSlug',
    });
  });

  test('getByID: only required params', async () => {
    const responsePromise = client.metricVariant.getByID('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      idOrSlug: 'idOrSlug',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getByID: required and optional params', async () => {
    const response = await client.metricVariant.getByID('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      idOrSlug: 'idOrSlug',
    });
  });
});
