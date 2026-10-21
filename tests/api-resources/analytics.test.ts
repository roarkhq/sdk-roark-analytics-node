// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource analytics', () => {
  test('getSchema', async () => {
    const responsePromise = client.analytics.getSchema();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('query: only required params', async () => {
    const responsePromise = client.analytics.query({ measures: [{}] });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('query: required and optional params', async () => {
    const response = await client.analytics.query({
      measures: [
        {
          aggregation: 'COUNT',
          breakdown: { type: 'METRIC_PROPERTY', property: 'property' },
          color: 'GREEN',
          distinctBy: 'NONE',
          filters: [{ type: 'METRIC_PROPERTY', value: 'string', operator: 'EQUALS', property: 'property' }],
          isBaseline: true,
          metric: 'x',
          nestedAggregation: 'COUNT',
          nestedAggregationPercentile: 0,
          passOperator: 'EQUALS',
          passValue: 'string',
          percentile: 0,
          type: 'METRIC',
        },
      ],
      comparisonGroups: [
        {
          filters: [{ type: 'METRIC_PROPERTY', value: 'string', operator: 'EQUALS', property: 'property' }],
          name: 'x',
          color: 'GREEN',
        },
        {
          filters: [{ type: 'METRIC_PROPERTY', value: 'string', operator: 'EQUALS', property: 'property' }],
          name: 'x',
          color: 'GREEN',
        },
      ],
      comparisonMode: 'NONE',
      filters: [{ type: 'METRIC_PROPERTY', value: 'string', operator: 'EQUALS', property: 'property' }],
      includeBuckets: true,
      interval: 'HOUR',
      timeRange: { type: 'LAST', unit: 'DAYS', value: 1 },
      timezone: 'x',
    });
  });
});
