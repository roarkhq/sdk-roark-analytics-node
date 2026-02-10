// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Roark from '@roarkanalytics/sdk';

const client = new Roark({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource integrations', () => {
  test('createRetellCall: only required params', async () => {
    const responsePromise = client.integrations.createRetellCall({
      retellCallEndedPayload: { event: 'bar', call: 'bar' },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createRetellCall: required and optional params', async () => {
    const response = await client.integrations.createRetellCall({
      retellCallEndedPayload: { event: 'bar', call: 'bar' },
      properties: { business_name: 'bar', business_id: 'bar' },
      skipAlreadyImported: true,
    });
  });

  test('createVapiCall: only required params', async () => {
    const responsePromise = client.integrations.createVapiCall({
      vapiEndOfCallReportPayload: {
        call: 'bar',
        type: 'bar',
        status: 'bar',
        assistant: 'bar',
        customer: 'bar',
        phoneNumber: 'bar',
        artifact: 'bar',
        startedAt: 'bar',
        endedAt: 'bar',
        endedReason: 'bar',
      },
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('createVapiCall: required and optional params', async () => {
    const response = await client.integrations.createVapiCall({
      vapiEndOfCallReportPayload: {
        call: 'bar',
        type: 'bar',
        status: 'bar',
        assistant: 'bar',
        customer: 'bar',
        phoneNumber: 'bar',
        artifact: 'bar',
        startedAt: 'bar',
        endedAt: 'bar',
        endedReason: 'bar',
      },
      properties: { business_name: 'bar', business_id: 'bar' },
      skipAlreadyImported: true,
    });
  });
});
