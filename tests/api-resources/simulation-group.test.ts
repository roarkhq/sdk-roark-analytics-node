// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource simulationGroup', () => {
  test('create: only required params', async () => {
    const responsePromise = client.simulationGroup.create({
      name: 'Release regression',
      simulationRunPlanIds: ['3c1d2e4f-5a6b-4c7d-8e9f-0a1b2c3d4e5f', '6d7e8f9a-0b1c-4d2e-9f3a-4b5c6d7e8f9a'],
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
    const response = await client.simulationGroup.create({
      name: 'Release regression',
      simulationRunPlanIds: ['3c1d2e4f-5a6b-4c7d-8e9f-0a1b2c3d4e5f', '6d7e8f9a-0b1c-4d2e-9f3a-4b5c6d7e8f9a'],
      description: 'description',
      notifications: {
        email: { enabled: true, recipients: ['qa-lead@example.com'] },
        slack: [{ channelId: 'C07ABCDEF12', channelName: 'qa-reports' }],
      },
    });
  });

  test('update', async () => {
    const responsePromise = client.simulationGroup.update('2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d');
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
      client.simulationGroup.update(
        '2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d',
        {
          description: 'description',
          name: 'x',
          notifications: {
            email: { enabled: true, recipients: ['qa-lead@example.com'] },
            slack: [{ channelId: 'C07ABCDEF12', channelName: 'qa-reports' }],
          },
          simulationRunPlanIds: [
            '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
            '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          ],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.simulationGroup.list();
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
      client.simulationGroup.list({ limit: 1, offset: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.simulationGroup.delete('2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getByID', async () => {
    const responsePromise = client.simulationGroup.getByID('2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('run', async () => {
    const responsePromise = client.simulationGroup.run('2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
