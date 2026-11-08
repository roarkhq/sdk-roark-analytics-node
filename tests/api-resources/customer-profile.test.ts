// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource customerProfile', () => {
  test('list', async () => {
    const responsePromise = client.customerProfile.list();
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
      client.customerProfile.list(
        {
          agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          fieldKey: 'FULL_NAME',
          fieldOperator: 'EQUALS',
          fieldValue: 'x',
          includeNoData: 'true',
          limit: 1,
          modality: 'call',
          page: 1,
          search: 'search',
          sortBy: 'lastSeenAt',
          sortDirection: 'asc',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.customerProfile.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('clearAttribute: only required params', async () => {
    const responsePromise = client.customerProfile.clearAttribute('FULL_NAME', {
      customerProfileId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('clearAttribute: required and optional params', async () => {
    const response = await client.customerProfile.clearAttribute('FULL_NAME', {
      customerProfileId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('getByID', async () => {
    const responsePromise = client.customerProfile.getByID('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listConversations', async () => {
    const responsePromise = client.customerProfile.listConversations('customerProfileId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listConversations: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.customerProfile.listConversations(
        'customerProfileId',
        {
          limit: 1,
          page: 1,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('setAttribute: only required params', async () => {
    const responsePromise = client.customerProfile.setAttribute('FULL_NAME', {
      customerProfileId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      value: 'x',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('setAttribute: required and optional params', async () => {
    const response = await client.customerProfile.setAttribute('FULL_NAME', {
      customerProfileId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      value: 'x',
    });
  });

  test('unlockAttribute: only required params', async () => {
    const responsePromise = client.customerProfile.unlockAttribute('FULL_NAME', {
      customerProfileId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('unlockAttribute: required and optional params', async () => {
    const response = await client.customerProfile.unlockAttribute('FULL_NAME', {
      customerProfileId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
    });
  });

  test('updateNotes: only required params', async () => {
    const responsePromise = client.customerProfile.updateNotes('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      notes: 'notes',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('updateNotes: required and optional params', async () => {
    const response = await client.customerProfile.updateNotes('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e', {
      notes: 'notes',
    });
  });
});
