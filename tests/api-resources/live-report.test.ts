// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource liveReport', () => {
  test('create: only required params', async () => {
    const responsePromise = client.liveReport.create({ name: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.liveReport.create({
      name: 'x',
      agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      cadence: 'DAILY',
      dashboardId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      deliveryHour: 0,
      description: 'description',
      filters: [{ type: 'METRIC_PROPERTY', operator: 'EQUALS', property: 'property', value: 'string' }],
      generateNow: true,
      includeTranscriptExcerpts: true,
      notifications: {
        email: { enabled: true, recipients: ['dev@stainless.com'] },
        slack: [{ channelId: 'x', channelName: 'x' }],
      },
      status: 'ACTIVE',
      targets: [
        {
          metric: 'x',
          value: 0,
          aggregation: 'PASS_RATE',
          comparator: 'AT_LEAST',
          label: 'x',
          passOperator: 'EQUALS',
          passValue: 'string',
          percentile: 1,
        },
      ],
      timezone: 'x',
    });
  });

  test('update', async () => {
    const responsePromise = client.liveReport.update('5c6d7e8f-9a0b-4c1d-8e2f-3a4b5c6d7e8f');
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
      client.liveReport.update(
        '5c6d7e8f-9a0b-4c1d-8e2f-3a4b5c6d7e8f',
        {
          agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          cadence: 'DAILY',
          dashboardId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          deliveryHour: 0,
          description: 'description',
          filters: [{ type: 'METRIC_PROPERTY', operator: 'EQUALS', property: 'property', value: 'string' }],
          includeTranscriptExcerpts: true,
          name: 'x',
          notifications: {
            email: { enabled: true, recipients: ['dev@stainless.com'] },
            slack: [{ channelId: 'x', channelName: 'x' }],
          },
          status: 'ACTIVE',
          targets: [
            {
              metric: 'x',
              value: 0,
              aggregation: 'PASS_RATE',
              comparator: 'AT_LEAST',
              label: 'x',
              passOperator: 'EQUALS',
              passValue: 'string',
              percentile: 1,
            },
          ],
          timezone: 'x',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.liveReport.list();
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
      client.liveReport.list({ limit: 1, offset: 0 }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.liveReport.delete('5c6d7e8f-9a0b-4c1d-8e2f-3a4b5c6d7e8f');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getByID', async () => {
    const responsePromise = client.liveReport.getByID('5c6d7e8f-9a0b-4c1d-8e2f-3a4b5c6d7e8f');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getDocument: only required params', async () => {
    const responsePromise = client.liveReport.getDocument('9e8d7c6b-5a4f-4e3d-8c2b-1a0f9e8d7c6b', {
      reportId: '5c6d7e8f-9a0b-4c1d-8e2f-3a4b5c6d7e8f',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getDocument: required and optional params', async () => {
    const response = await client.liveReport.getDocument('9e8d7c6b-5a4f-4e3d-8c2b-1a0f9e8d7c6b', {
      reportId: '5c6d7e8f-9a0b-4c1d-8e2f-3a4b5c6d7e8f',
    });
  });

  test('listDocuments', async () => {
    const responsePromise = client.liveReport.listDocuments('reportId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listDocuments: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.liveReport.listDocuments(
        'reportId',
        {
          limit: 1,
          offset: 0,
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('run', async () => {
    const responsePromise = client.liveReport.run('5c6d7e8f-9a0b-4c1d-8e2f-3a4b5c6d7e8f');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('run: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.liveReport.run(
        '5c6d7e8f-9a0b-4c1d-8e2f-3a4b5c6d7e8f',
        {
          periodEnd: '2019-12-27T18:11:19.117Z',
          periodStart: '2019-12-27T18:11:19.117Z',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });
});
