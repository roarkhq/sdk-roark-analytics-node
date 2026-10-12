// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource simulationRunGroup', () => {
  test('create', async () => {
    const responsePromise = client.simulationRunGroup.create();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.simulationRunGroup.create(
        {
          name: 'Release 4.2 regression',
          simulationRunPlanIds: [
            '7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f',
            '9a8b7c6d-5e4f-4a3b-8c2d-1e0f9a8b7c6d',
          ],
          simulationRunPlanJobIds: [
            '7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f',
            '9a8b7c6d-5e4f-4a3b-8c2d-1e0f9a8b7c6d',
          ],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.simulationRunGroup.list();
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
      client.simulationRunGroup.list({ limit: 1, offset: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.simulationRunGroup.delete('5b6c7d8e-9f0a-4b1c-8d2e-3f4a5b6c7d8e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getByID', async () => {
    const responsePromise = client.simulationRunGroup.getByID('5b6c7d8e-9f0a-4b1c-8d2e-3f4a5b6c7d8e');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('regenerateReport', async () => {
    const responsePromise = client.simulationRunGroup.regenerateReport(
      '5b6c7d8e-9f0a-4b1c-8d2e-3f4a5b6c7d8e',
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
