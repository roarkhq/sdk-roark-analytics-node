// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource benchmark', () => {
  test('getLeaderboard: only required params', async () => {
    const responsePromise = client.benchmark.getLeaderboard({ suite: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getLeaderboard: required and optional params', async () => {
    const response = await client.benchmark.getLeaderboard({
      suite: 'x',
      conditionKey: 'conditionKey',
      limit: 1,
      metrics: 'metrics',
      offset: 0,
      order: 'asc',
      sortBy: 'x',
      suiteVersion: 'x',
    });
  });

  test('getTarget: only required params', async () => {
    const responsePromise = client.benchmark.getTarget('targetKey', { suite: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getTarget: required and optional params', async () => {
    const response = await client.benchmark.getTarget('targetKey', {
      suite: 'x',
      publicationId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
      suiteVersion: 'x',
    });
  });

  test('listMetrics: only required params', async () => {
    const responsePromise = client.benchmark.listMetrics({ suite: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listMetrics: required and optional params', async () => {
    const response = await client.benchmark.listMetrics({ suite: 'x', suiteVersion: 'x' });
  });

  test('listSuites', async () => {
    const responsePromise = client.benchmark.listSuites();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listTargetHistory: only required params', async () => {
    const responsePromise = client.benchmark.listTargetHistory('targetKey', { suite: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listTargetHistory: required and optional params', async () => {
    const response = await client.benchmark.listTargetHistory('targetKey', {
      suite: 'x',
      limit: 1,
      offset: 0,
      suiteVersion: 'x',
    });
  });

  test('listTargetScoreSamples: only required params', async () => {
    const responsePromise = client.benchmark.listTargetScoreSamples('targetKey', { suite: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listTargetScoreSamples: required and optional params', async () => {
    const response = await client.benchmark.listTargetScoreSamples('targetKey', {
      suite: 'x',
      conditionKey: 'conditionKey',
      limit: 1,
      metricKey: 'x',
      offset: 0,
      suiteVersion: 'x',
    });
  });
});
