// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource calendarConnection', () => {
  test('create: only required params', async () => {
    const responsePromise = client.calendarConnection.create({
      apiKey: 'x',
      label: 'x',
      provider: 'CAL_COM',
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
    const response = await client.calendarConnection.create({
      apiKey: 'x',
      label: 'x',
      provider: 'CAL_COM',
      timezone: 'x',
    });
  });

  test('update', async () => {
    const responsePromise = client.calendarConnection.update('connectionId');
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
      client.calendarConnection.update(
        'connectionId',
        {
          apiKey: 'x',
          label: 'x',
          timezone: 'x',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('list', async () => {
    const responsePromise = client.calendarConnection.list();
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
      client.calendarConnection.list({ provider: 'CAL_COM' }, { path: '/_stainless_unknown_path' }),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('delete', async () => {
    const responsePromise = client.calendarConnection.delete('connectionId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('check', async () => {
    const responsePromise = client.calendarConnection.check('connectionId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createTarget: only required params', async () => {
    const responsePromise = client.calendarConnection.createTarget('connectionId', {
      calendarId: 'clinic@example.com',
      durationMinutes: 30,
      name: 'Front desk',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createTarget: required and optional params', async () => {
    const response = await client.calendarConnection.createTarget('connectionId', {
      calendarId: 'clinic@example.com',
      durationMinutes: 30,
      name: 'Front desk',
      allDayEventsBlock: true,
      bufferAfterMinutes: 0,
      bufferBeforeMinutes: 0,
      horizonDays: 1,
      hours: [{ endMinute: 1, startMinute: 0, weekday: 1 }],
      minNoticeMinutes: 0,
      slotIntervalMinutes: 1,
    });
  });

  test('deleteTarget: only required params', async () => {
    const responsePromise = client.calendarConnection.deleteTarget('targetId', {
      connectionId: 'connectionId',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('deleteTarget: required and optional params', async () => {
    const response = await client.calendarConnection.deleteTarget('targetId', {
      connectionId: 'connectionId',
    });
  });

  test('getByID', async () => {
    const responsePromise = client.calendarConnection.getByID('connectionId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getTarget: only required params', async () => {
    const responsePromise = client.calendarConnection.getTarget('targetId', { connectionId: 'connectionId' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('getTarget: required and optional params', async () => {
    const response = await client.calendarConnection.getTarget('targetId', { connectionId: 'connectionId' });
  });

  test('listCalendars', async () => {
    const responsePromise = client.calendarConnection.listCalendars('connectionId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('listTargets', async () => {
    const responsePromise = client.calendarConnection.listTargets('connectionId');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('startCalendlyOauth', async () => {
    const responsePromise = client.calendarConnection.startCalendlyOauth();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('startCalendlyOauth: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.calendarConnection.startCalendlyOauth(
        {
          calendarConnectionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          label: 'x',
          timezone: 'x',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('startGoogleOauth', async () => {
    const responsePromise = client.calendarConnection.startGoogleOauth();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('startGoogleOauth: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.calendarConnection.startGoogleOauth(
        {
          calendarConnectionId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',
          label: 'x',
          loginHint: 'dev@stainless.com',
          timezone: 'x',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Roark.NotFoundError);
  });

  test('updateTarget: only required params', async () => {
    const responsePromise = client.calendarConnection.updateTarget('targetId', {
      connectionId: 'connectionId',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('updateTarget: required and optional params', async () => {
    const response = await client.calendarConnection.updateTarget('targetId', {
      connectionId: 'connectionId',
      allDayEventsBlock: true,
      bufferAfterMinutes: 0,
      bufferBeforeMinutes: 0,
      durationMinutes: 30,
      horizonDays: 1,
      hours: [{ endMinute: 1, startMinute: 0, weekday: 1 }],
      minNoticeMinutes: 0,
      name: 'Front desk',
      slotIntervalMinutes: 1,
    });
  });
});
