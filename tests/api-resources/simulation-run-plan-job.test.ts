// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource simulationRunPlanJob', () => {
  test('list', async () => {
    const responsePromise = client.simulationRunPlanJob.list();
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
      client.simulationRunPlanJob.list(
        {
          after: '550e8400-e29b-41d4-a716-446655440000',
          labelId: '550e8400-e29b-41d4-a716-446655440000',
          labelName: 'production-ready',
          limit: 20,
          simulationRunPlanId: '550e8400-e29b-41d4-a716-446655440000',
          status: 'COMPLETED',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('getByID', async () => {
    const responsePromise = client.simulationRunPlanJob.getByID('7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('start', async () => {
    const responsePromise = client.simulationRunPlanJob.start('7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('start: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.simulationRunPlanJob.start(
        '7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f',
        {
          flowVariables: [
            {
              flowId: '550e8400-e29b-41d4-a716-446655440000',
              variables: { orderNumber: '12345' },
              variantId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            },
            {
              flowId: '550e8400-e29b-41d4-a716-446655440000',
              variables: { orderNumber: '67890' },
              variantId: '7a3d2e1f-c4b5-6a89-0d1e-2f3a4b5c6d7e',
            },
          ],
          variables: { orderNumber: '12345', environment: 'staging' },
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });
});
