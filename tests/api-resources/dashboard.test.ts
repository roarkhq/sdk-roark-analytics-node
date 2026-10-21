// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource dashboard', () => {
  test('create: only required params', async () => {
    const responsePromise = client.dashboard.create({ name: 'x' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('create: required and optional params', async () => {
    const response = await client.dashboard.create({
      name: 'x',
      description: 'description',
      filters: [{ type: 'METRIC_PROPERTY', value: 'string', operator: 'EQUALS', property: 'property' }],
      isDefault: true,
      timeRange: { type: 'LAST', unit: 'DAYS', value: 1 },
      widgets: [
        {
          measures: [
            {
              aggregation: 'COUNT',
              breakdown: { type: 'METRIC_PROPERTY', property: 'property' },
              color: 'GREEN',
              distinctBy: 'NONE',
              filters: [
                { type: 'METRIC_PROPERTY', value: 'string', operator: 'EQUALS', property: 'property' },
              ],
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
          name: 'x',
          comparisonGroups: [
            {
              filters: [
                { type: 'METRIC_PROPERTY', value: 'string', operator: 'EQUALS', property: 'property' },
              ],
              name: 'x',
              color: 'GREEN',
            },
            {
              filters: [
                { type: 'METRIC_PROPERTY', value: 'string', operator: 'EQUALS', property: 'property' },
              ],
              name: 'x',
              color: 'GREEN',
            },
          ],
          comparisonMode: 'NONE',
          description: 'description',
          display: 'LINE',
          filters: [{ type: 'METRIC_PROPERTY', value: 'string', operator: 'EQUALS', property: 'property' }],
          interval: 'HOUR',
          size: 'SMALL',
        },
      ],
    });
  });

  test('update', async () => {
    const responsePromise = client.dashboard.update('6f1d2c3b-4a5e-4f60-8b71-9c0d1e2f3a4b');
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
      client.dashboard.update(
        '6f1d2c3b-4a5e-4f60-8b71-9c0d1e2f3a4b',
        {
          description: 'description',
          filters: [{ type: 'METRIC_PROPERTY', value: 'string', operator: 'EQUALS', property: 'property' }],
          isDefault: true,
          name: 'x',
          timeRange: { type: 'LAST', unit: 'DAYS', value: 1 },
          widgets: [
            {
              measures: [
                {
                  aggregation: 'COUNT',
                  breakdown: { type: 'METRIC_PROPERTY', property: 'property' },
                  color: 'GREEN',
                  distinctBy: 'NONE',
                  filters: [
                    { type: 'METRIC_PROPERTY', value: 'string', operator: 'EQUALS', property: 'property' },
                  ],
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
              name: 'x',
              comparisonGroups: [
                {
                  filters: [
                    { type: 'METRIC_PROPERTY', value: 'string', operator: 'EQUALS', property: 'property' },
                  ],
                  name: 'x',
                  color: 'GREEN',
                },
                {
                  filters: [
                    { type: 'METRIC_PROPERTY', value: 'string', operator: 'EQUALS', property: 'property' },
                  ],
                  name: 'x',
                  color: 'GREEN',
                },
              ],
              comparisonMode: 'NONE',
              description: 'description',
              display: 'LINE',
              filters: [
                { type: 'METRIC_PROPERTY', value: 'string', operator: 'EQUALS', property: 'property' },
              ],
              interval: 'HOUR',
              size: 'SMALL',
            },
          ],
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.dashboard.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('delete', async () => {
    const responsePromise = client.dashboard.delete('6f1d2c3b-4a5e-4f60-8b71-9c0d1e2f3a4b');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createWidget: only required params', async () => {
    const responsePromise = client.dashboard.createWidget('6f1d2c3b-4a5e-4f60-8b71-9c0d1e2f3a4b', {
      measures: [{}],
      name: 'x',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createWidget: required and optional params', async () => {
    const response = await client.dashboard.createWidget('6f1d2c3b-4a5e-4f60-8b71-9c0d1e2f3a4b', {
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
      name: 'x',
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
      description: 'description',
      display: 'LINE',
      filters: [{ type: 'METRIC_PROPERTY', value: 'string', operator: 'EQUALS', property: 'property' }],
      interval: 'HOUR',
      size: 'SMALL',
    });
  });

  test('deleteWidget: only required params', async () => {
    const responsePromise = client.dashboard.deleteWidget('7a8b9c0d-1e2f-4a3b-8c4d-5e6f7a8b9c0d', {
      dashboardId: '6f1d2c3b-4a5e-4f60-8b71-9c0d1e2f3a4b',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('deleteWidget: required and optional params', async () => {
    const response = await client.dashboard.deleteWidget('7a8b9c0d-1e2f-4a3b-8c4d-5e6f7a8b9c0d', {
      dashboardId: '6f1d2c3b-4a5e-4f60-8b71-9c0d1e2f3a4b',
    });
  });

  test('getByID', async () => {
    const responsePromise = client.dashboard.getByID('6f1d2c3b-4a5e-4f60-8b71-9c0d1e2f3a4b');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getData', async () => {
    const responsePromise = client.dashboard.getData('dashboardId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getData: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.dashboard.getData(
        'dashboardId',
        {
          from: '2019-12-27T18:11:19.117Z',
          timezone: 'x',
          to: '2019-12-27T18:11:19.117Z',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('getWidgetData: only required params', async () => {
    const responsePromise = client.dashboard.getWidgetData('widgetId', { dashboardId: 'dashboardId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getWidgetData: required and optional params', async () => {
    const response = await client.dashboard.getWidgetData('widgetId', {
      dashboardId: 'dashboardId',
      from: '2019-12-27T18:11:19.117Z',
      timezone: 'x',
      to: '2019-12-27T18:11:19.117Z',
    });
  });

  test('updateWidget: only required params', async () => {
    const responsePromise = client.dashboard.updateWidget('7a8b9c0d-1e2f-4a3b-8c4d-5e6f7a8b9c0d', {
      dashboardId: '6f1d2c3b-4a5e-4f60-8b71-9c0d1e2f3a4b',
      measures: [{}],
      name: 'x',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('updateWidget: required and optional params', async () => {
    const response = await client.dashboard.updateWidget('7a8b9c0d-1e2f-4a3b-8c4d-5e6f7a8b9c0d', {
      dashboardId: '6f1d2c3b-4a5e-4f60-8b71-9c0d1e2f3a4b',
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
      name: 'x',
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
      description: 'description',
      display: 'LINE',
      filters: [{ type: 'METRIC_PROPERTY', value: 'string', operator: 'EQUALS', property: 'property' }],
      interval: 'HOUR',
      size: 'SMALL',
    });
  });
});
