// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MiniSearch from 'minisearch';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { getLogger } from './logger';

type PerLanguageData = {
  method?: string;
  example?: string;
};

type MethodEntry = {
  name: string;
  endpoint: string;
  httpMethod: string;
  summary: string;
  description: string;
  stainlessPath: string;
  qualified: string;
  params?: string[];
  response?: string;
  markdown?: string;
  perLanguage?: Record<string, PerLanguageData>;
};

type ProseChunk = {
  content: string;
  tag: string;
  sectionContext?: string;
  source?: string;
};

type MiniSearchDocument = {
  id: string;
  kind: 'http_method' | 'prose';
  name?: string;
  endpoint?: string;
  summary?: string;
  description?: string;
  qualified?: string;
  stainlessPath?: string;
  content?: string;
  sectionContext?: string;
  _original: Record<string, unknown>;
};

type SearchResult = {
  results: (string | Record<string, unknown>)[];
};

const EMBEDDED_METHODS: MethodEntry[] = [
  {
    name: 'get',
    endpoint: '/health',
    httpMethod: 'get',
    summary: 'Get API health status',
    description: 'Returns the health status of the API and its dependencies',
    stainlessPath: '(resource) health > (method) get',
    qualified: 'client.health.get',
    response:
      "{ data: { status: 'healthy' | 'degraded' | 'unhealthy'; timestamp: string; version: string; }; }",
    markdown:
      "## get\n\n`client.health.get(): { data: object; }`\n\n**get** `/health`\n\nReturns the health status of the API and its dependencies\n\n### Returns\n\n- `{ data: { status: 'healthy' | 'degraded' | 'unhealthy'; timestamp: string; version: string; }; }`\n\n  - `data: { status: 'healthy' | 'degraded' | 'unhealthy'; timestamp: string; version: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst health = await client.health.get();\n\nconsole.log(health);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/call',
    httpMethod: 'post',
    summary: 'Create a call',
    description: 'Create a new call with recording, transcript, agents, and customers',
    stainlessPath: '(resource) call > (method) create',
    qualified: 'client.call.create',
    params: [
      "callDirection: 'INBOUND' | 'OUTBOUND';",
      "interfaceType: 'PHONE' | 'WEB';",
      'recordingUrl: string;',
      'startedAt: string;',
      'agent?: { roarkId: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; } | { name: string; customId?: string; description?: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; } | { customId: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; };',
      'agents?: { roarkId: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; } | { name: string; customId?: string; description?: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; } | { customId: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; }[];',
      'customer?: { phoneNumberE164: string; label?: string; };',
      'customers?: { phoneNumberE164: string; label?: string; }[];',
      'endedStatus?: string;',
      'properties?: object;',
      'stereoRecordingUrl?: string;',
      'toolInvocations?: { name: string; parameters: object; result: string | object; startOffsetMs: number; agent?: { customId?: string; roarkId?: string; }; description?: string; endOffsetMs?: number; }[];',
      "transcript?: { endOffsetMs: number; role: 'AGENT'; startOffsetMs: number; text: string; agent?: { customId?: string; roarkId?: string; }; languageCode?: string; } | { endOffsetMs: number; role: 'CUSTOMER'; startOffsetMs: number; text: string; customer?: { label?: string; phoneNumberE164?: string; }; languageCode?: string; }[];",
    ],
    response:
      "{ data: { id: string; agents: { id: string; endpoint?: object; }[]; callDirection: 'INBOUND' | 'OUTBOUND'; createdAt: string; customers: { label?: string; phoneNumberE164?: string; }[]; projectId: string; startedAt: string; status: 'RINGING' | 'IN_PROGRESS' | 'ENDED'; }; }",
    markdown:
      "## create\n\n`client.call.create(callDirection: 'INBOUND' | 'OUTBOUND', interfaceType: 'PHONE' | 'WEB', recordingUrl: string, startedAt: string, agent?: { roarkId: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; } | { name: string; customId?: string; description?: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; } | { customId: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; }, agents?: { roarkId: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; } | { name: string; customId?: string; description?: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; } | { customId: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; }[], customer?: { phoneNumberE164: string; label?: string; }, customers?: { phoneNumberE164: string; label?: string; }[], endedStatus?: string, properties?: object, stereoRecordingUrl?: string, toolInvocations?: { name: string; parameters: object; result: string | object; startOffsetMs: number; agent?: { customId?: string; roarkId?: string; }; description?: string; endOffsetMs?: number; }[], transcript?: { endOffsetMs: number; role: 'AGENT'; startOffsetMs: number; text: string; agent?: { customId?: string; roarkId?: string; }; languageCode?: string; } | { endOffsetMs: number; role: 'CUSTOMER'; startOffsetMs: number; text: string; customer?: { label?: string; phoneNumberE164?: string; }; languageCode?: string; }[]): { data: object; }`\n\n**post** `/v1/call`\n\nCreate a new call with recording, transcript, agents, and customers\n\n### Parameters\n\n- `callDirection: 'INBOUND' | 'OUTBOUND'`\n  Direction of the call (INBOUND or OUTBOUND)\n\n- `interfaceType: 'PHONE' | 'WEB'`\n  Interface type of the call (PHONE or WEB)\n\n- `recordingUrl: string`\n  URL of source recording (must be an accessible WAV, MP3, MP4, or OGG file). Can be a signed URL.\n\n- `startedAt: string`\n  When the call started (ISO 8601 format)\n\n- `agent?: { roarkId: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; } | { name: string; customId?: string; description?: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; } | { customId: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; }`\n  Single agent participating in the call. Use this for simpler API when you have only one agent.\n\n- `agents?: { roarkId: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; } | { name: string; customId?: string; description?: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; } | { customId: string; endpoint?: { id: string; } | { type: string; value: string; direction?: string; }; prompt?: { resolvedPrompt: string; }; }[]`\n  Agents participating in the call. Each agent requires identification and prompt information.\n\n- `customer?: { phoneNumberE164: string; label?: string; }`\n  Single customer participating in the call. Use this for simpler API when you have only one customer.\n  - `phoneNumberE164: string`\n    Customer phone number in E.164 format (e.g., +14155551234)\n  - `label?: string`\n    Label to identify this customer in the transcript (e.g., \"speaker-01\", \"speaker-02\")\n\n- `customers?: { phoneNumberE164: string; label?: string; }[]`\n  Customers participating in the call.\n\n- `endedStatus?: string`\n  High-level call end status, indicating how the call terminated\n\n- `properties?: object`\n  Custom properties to include with the call. These can be used for filtering and will show in the call details page\n\n- `stereoRecordingUrl?: string`\n  URL of source stereo recording. Must be accessible. Can be a signed URL. Supported formats: WAV, MP3, MP4, OGG.\n\n- `toolInvocations?: { name: string; parameters: object; result: string | object; startOffsetMs: number; agent?: { customId?: string; roarkId?: string; }; description?: string; endOffsetMs?: number; }[]`\n  List of tool invocations made during the call\n\n- `transcript?: { endOffsetMs: number; role: 'AGENT'; startOffsetMs: number; text: string; agent?: { customId?: string; roarkId?: string; }; languageCode?: string; } | { endOffsetMs: number; role: 'CUSTOMER'; startOffsetMs: number; text: string; customer?: { label?: string; phoneNumberE164?: string; }; languageCode?: string; }[]`\n  List of transcript entries made during the call\n\n### Returns\n\n- `{ data: { id: string; agents: { id: string; endpoint?: object; }[]; callDirection: 'INBOUND' | 'OUTBOUND'; createdAt: string; customers: { label?: string; phoneNumberE164?: string; }[]; projectId: string; startedAt: string; status: 'RINGING' | 'IN_PROGRESS' | 'ENDED'; }; }`\n\n  - `data: { id: string; agents: { id: string; endpoint?: { id: string; environment: string; phoneNumberE164?: string; }; }[]; callDirection: 'INBOUND' | 'OUTBOUND'; createdAt: string; customers: { label?: string; phoneNumberE164?: string; }[]; projectId: string; startedAt: string; status: 'RINGING' | 'IN_PROGRESS' | 'ENDED'; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst call = await client.call.create({\n  callDirection: 'INBOUND',\n  interfaceType: 'PHONE',\n  recordingUrl: 'https://example.com',\n  startedAt: 'startedAt',\n});\n\nconsole.log(call);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/call',
    httpMethod: 'get',
    summary: 'List calls',
    description: 'Returns a paginated list of calls for the authenticated project.',
    stainlessPath: '(resource) call > (method) list',
    qualified: 'client.call.list',
    params: [
      'after?: string;',
      'limit?: number;',
      'searchText?: string;',
      'simulationRunPlanJobId?: string;',
      "sortBy?: 'createdAt' | 'startedAt' | 'endedAt' | 'duration' | 'title' | 'status';",
      "sortDirection?: 'asc' | 'desc';",
      "status?: 'RINGING' | 'IN_PROGRESS' | 'ENDED';",
    ],
    response:
      "{ data: { id: string; callDirection: 'INBOUND' | 'OUTBOUND'; projectId: string; startedAt: string; agents?: { id: string; endpoint?: object; }[]; createdAt?: string; customers?: { label?: string; phoneNumberE164?: string; }[]; durationMs?: number; endedAt?: string; endedStatus?: string; policyIds?: string[]; properties?: object; recordingUrl?: string; simulationJobId?: string; status?: 'RINGING' | 'IN_PROGRESS' | 'ENDED'; summary?: string; supersededByCallId?: string; title?: string; updatedAt?: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }",
    markdown:
      "## list\n\n`client.call.list(after?: string, limit?: number, searchText?: string, simulationRunPlanJobId?: string, sortBy?: 'createdAt' | 'startedAt' | 'endedAt' | 'duration' | 'title' | 'status', sortDirection?: 'asc' | 'desc', status?: 'RINGING' | 'IN_PROGRESS' | 'ENDED'): { data: object[]; pagination: object; }`\n\n**get** `/v1/call`\n\nReturns a paginated list of calls for the authenticated project.\n\n### Parameters\n\n- `after?: string`\n  Cursor for pagination - use the nextCursor value from a previous response\n\n- `limit?: number`\n  Maximum number of calls to return (default: 20, max: 100)\n\n- `searchText?: string`\n  Search text to filter calls by title, summary, or transcript\n\n- `simulationRunPlanJobId?: string`\n  Filter by simulation run plan job ID to get all calls from a specific simulation batch\n\n- `sortBy?: 'createdAt' | 'startedAt' | 'endedAt' | 'duration' | 'title' | 'status'`\n  Field to sort by (default: createdAt)\n\n- `sortDirection?: 'asc' | 'desc'`\n  Sort direction (default: desc)\n\n- `status?: 'RINGING' | 'IN_PROGRESS' | 'ENDED'`\n  Filter by call status\n\n### Returns\n\n- `{ data: { id: string; callDirection: 'INBOUND' | 'OUTBOUND'; projectId: string; startedAt: string; agents?: { id: string; endpoint?: object; }[]; createdAt?: string; customers?: { label?: string; phoneNumberE164?: string; }[]; durationMs?: number; endedAt?: string; endedStatus?: string; policyIds?: string[]; properties?: object; recordingUrl?: string; simulationJobId?: string; status?: 'RINGING' | 'IN_PROGRESS' | 'ENDED'; summary?: string; supersededByCallId?: string; title?: string; updatedAt?: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }`\n\n  - `data: { id: string; callDirection: 'INBOUND' | 'OUTBOUND'; projectId: string; startedAt: string; agents?: { id: string; endpoint?: { id: string; environment: string; phoneNumberE164?: string; }; }[]; createdAt?: string; customers?: { label?: string; phoneNumberE164?: string; }[]; durationMs?: number; endedAt?: string; endedStatus?: string; policyIds?: string[]; properties?: object; recordingUrl?: string; simulationJobId?: string; status?: 'RINGING' | 'IN_PROGRESS' | 'ENDED'; summary?: string; supersededByCallId?: string; title?: string; updatedAt?: string; }[]`\n  - `pagination: { hasMore: boolean; nextCursor: string; total: number; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst calls = await client.call.list();\n\nconsole.log(calls);\n```",
  },
  {
    name: 'getById',
    endpoint: '/v1/call/{callId}',
    httpMethod: 'get',
    summary: 'Get a call by ID',
    description: 'Retrieve an existing call by its unique identifier',
    stainlessPath: '(resource) call > (method) getById',
    qualified: 'client.call.getByID',
    params: ['callId: string;'],
    response:
      "{ data: { id: string; callDirection: 'INBOUND' | 'OUTBOUND'; projectId: string; startedAt: string; agents?: { id: string; endpoint?: object; }[]; createdAt?: string; customers?: { label?: string; phoneNumberE164?: string; }[]; durationMs?: number; endedAt?: string; endedStatus?: string; policyIds?: string[]; properties?: object; recordingUrl?: string; simulationJobId?: string; status?: 'RINGING' | 'IN_PROGRESS' | 'ENDED'; summary?: string; supersededByCallId?: string; title?: string; updatedAt?: string; }; }",
    markdown:
      "## getById\n\n`client.call.getByID(callId: string): { data: object; }`\n\n**get** `/v1/call/{callId}`\n\nRetrieve an existing call by its unique identifier\n\n### Parameters\n\n- `callId: string`\n\n### Returns\n\n- `{ data: { id: string; callDirection: 'INBOUND' | 'OUTBOUND'; projectId: string; startedAt: string; agents?: { id: string; endpoint?: object; }[]; createdAt?: string; customers?: { label?: string; phoneNumberE164?: string; }[]; durationMs?: number; endedAt?: string; endedStatus?: string; policyIds?: string[]; properties?: object; recordingUrl?: string; simulationJobId?: string; status?: 'RINGING' | 'IN_PROGRESS' | 'ENDED'; summary?: string; supersededByCallId?: string; title?: string; updatedAt?: string; }; }`\n\n  - `data: { id: string; callDirection: 'INBOUND' | 'OUTBOUND'; projectId: string; startedAt: string; agents?: { id: string; endpoint?: { id: string; environment: string; phoneNumberE164?: string; }; }[]; createdAt?: string; customers?: { label?: string; phoneNumberE164?: string; }[]; durationMs?: number; endedAt?: string; endedStatus?: string; policyIds?: string[]; properties?: object; recordingUrl?: string; simulationJobId?: string; status?: 'RINGING' | 'IN_PROGRESS' | 'ENDED'; summary?: string; supersededByCallId?: string; title?: string; updatedAt?: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.call.getByID('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'getTranscript',
    endpoint: '/v1/call/{callId}/transcript',
    httpMethod: 'get',
    summary: 'Get call transcript',
    description:
      'Fetch the full transcript for a specific call. Optionally specify a transcription source; otherwise the best available source is used automatically.',
    stainlessPath: '(resource) call > (method) getTranscript',
    qualified: 'client.call.getTranscript',
    params: [
      'callId: string;',
      "source?: 'ROARK_POST_CALL' | 'SIMULATION_AGENT_REALTIME' | 'CUSTOMER_AGENT_REALTIME';",
    ],
    response:
      "{ data: { entries: { endOffsetMs: number; participantId: string; role: 'AGENT' | 'CUSTOMER'; startOffsetMs: number; text: string; }[]; participants: { id: string; agentId: string; type: 'AGENT'; } | { id: string; customerId: string; type: 'CUSTOMER'; } | { id: string; customerId: string; type: 'SIMULATED_CUSTOMER'; } | { id: string; type: 'BACKGROUND_SPEAKER'; }[]; transcriptionSource: 'ROARK_POST_CALL' | 'SIMULATION_AGENT_REALTIME' | 'CUSTOMER_AGENT_REALTIME'; }; }",
    markdown:
      "## getTranscript\n\n`client.call.getTranscript(callId: string, source?: 'ROARK_POST_CALL' | 'SIMULATION_AGENT_REALTIME' | 'CUSTOMER_AGENT_REALTIME'): { data: object; }`\n\n**get** `/v1/call/{callId}/transcript`\n\nFetch the full transcript for a specific call. Optionally specify a transcription source; otherwise the best available source is used automatically.\n\n### Parameters\n\n- `callId: string`\n\n- `source?: 'ROARK_POST_CALL' | 'SIMULATION_AGENT_REALTIME' | 'CUSTOMER_AGENT_REALTIME'`\n  Transcription source to fetch. When omitted, uses the preferred source based on availability: CUSTOMER_AGENT_REALTIME > SIMULATION_AGENT_REALTIME > ROARK_POST_CALL\n\n### Returns\n\n- `{ data: { entries: { endOffsetMs: number; participantId: string; role: 'AGENT' | 'CUSTOMER'; startOffsetMs: number; text: string; }[]; participants: { id: string; agentId: string; type: 'AGENT'; } | { id: string; customerId: string; type: 'CUSTOMER'; } | { id: string; customerId: string; type: 'SIMULATED_CUSTOMER'; } | { id: string; type: 'BACKGROUND_SPEAKER'; }[]; transcriptionSource: 'ROARK_POST_CALL' | 'SIMULATION_AGENT_REALTIME' | 'CUSTOMER_AGENT_REALTIME'; }; }`\n\n  - `data: { entries: { endOffsetMs: number; participantId: string; role: 'AGENT' | 'CUSTOMER'; startOffsetMs: number; text: string; }[]; participants: { id: string; agentId: string; type: 'AGENT'; } | { id: string; customerId: string; type: 'CUSTOMER'; } | { id: string; customerId: string; type: 'SIMULATED_CUSTOMER'; } | { id: string; type: 'BACKGROUND_SPEAKER'; }[]; transcriptionSource: 'ROARK_POST_CALL' | 'SIMULATION_AGENT_REALTIME' | 'CUSTOMER_AGENT_REALTIME'; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.call.getTranscript('callId');\n\nconsole.log(response);\n```",
  },
  {
    name: 'listEvaluationRuns',
    endpoint: '/v1/call/{callId}/evaluation-run',
    httpMethod: 'get',
    summary: 'List call evaluation runs',
    description: 'Fetch all evaluation run results for a specific call.',
    stainlessPath: '(resource) call > (method) listEvaluationRuns',
    qualified: 'client.call.listEvaluationRuns',
    params: ['callId: string;'],
    response:
      "{ data: { blockRuns: { blockDefinitionId: string; blockName: string; blockRunId: string; createdAt: string; reason: string; result: 'PASSED' | 'FAILED' | 'SKIPPED'; score: number; status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED'; }[]; evaluator: { id: string; name: string; weight?: number; }; evidence: { commentText: string; createdAt: string; isPositive: boolean; snippetText: string; }[]; metrics: { booleanValue: boolean; confidence: number; createdAt: string; name: string; numericValue: number; reasoning: string; role: string; textValue: string; valueType: string; }[]; status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED'; id?: string; completedAt?: string; result?: 'SUCCESS' | 'FAILURE' | 'SKIPPED'; score?: number; startedAt?: string; summary?: string; }[]; }",
    markdown:
      "## listEvaluationRuns\n\n`client.call.listEvaluationRuns(callId: string): { data: object[]; }`\n\n**get** `/v1/call/{callId}/evaluation-run`\n\nFetch all evaluation run results for a specific call.\n\n### Parameters\n\n- `callId: string`\n  ID of the call to fetch evaluation run for\n\n### Returns\n\n- `{ data: { blockRuns: { blockDefinitionId: string; blockName: string; blockRunId: string; createdAt: string; reason: string; result: 'PASSED' | 'FAILED' | 'SKIPPED'; score: number; status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED'; }[]; evaluator: { id: string; name: string; weight?: number; }; evidence: { commentText: string; createdAt: string; isPositive: boolean; snippetText: string; }[]; metrics: { booleanValue: boolean; confidence: number; createdAt: string; name: string; numericValue: number; reasoning: string; role: string; textValue: string; valueType: string; }[]; status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED'; id?: string; completedAt?: string; result?: 'SUCCESS' | 'FAILURE' | 'SKIPPED'; score?: number; startedAt?: string; summary?: string; }[]; }`\n\n  - `data: { blockRuns: { blockDefinitionId: string; blockName: string; blockRunId: string; createdAt: string; reason: string; result: 'PASSED' | 'FAILED' | 'SKIPPED'; score: number; status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED'; }[]; evaluator: { id: string; name: string; weight?: number; }; evidence: { commentText: string; createdAt: string; isPositive: boolean; snippetText: string; }[]; metrics: { booleanValue: boolean; confidence: number; createdAt: string; name: string; numericValue: number; reasoning: string; role: string; textValue: string; valueType: string; }[]; status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED'; id?: string; completedAt?: string; result?: 'SUCCESS' | 'FAILURE' | 'SKIPPED'; score?: number; startedAt?: string; summary?: string; }[]`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.call.listEvaluationRuns('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'listMetrics',
    endpoint: '/v1/call/{callId}/metrics',
    httpMethod: 'get',
    summary: 'List call metrics',
    description:
      'Fetch all call-level metrics for a specific call, including both system-generated and custom metrics. Only returns successfully computed metrics.',
    stainlessPath: '(resource) call > (method) listMetrics',
    qualified: 'client.call.listMetrics',
    params: ['callId: string;', 'flatten?: string;'],
    response:
      "{ data: { description: string; metricDefinitionId: string; metricId: string; name: string; scope: 'GLOBAL' | 'PER_PARTICIPANT'; type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET'; values: { computedAt: string; confidence: number; context: 'CALL' | 'SEGMENT' | 'SEGMENT_RANGE'; value: number | boolean | string; fromSegment?: object; participantRole?: 'agent' | 'customer'; policyIds?: string[]; segment?: object; toSegment?: object; valueReasoning?: string; }[]; unit?: { name: string; symbol: string; }; }[]; }",
    markdown:
      "## listMetrics\n\n`client.call.listMetrics(callId: string, flatten?: string): { data: object[]; }`\n\n**get** `/v1/call/{callId}/metrics`\n\nFetch all call-level metrics for a specific call, including both system-generated and custom metrics. Only returns successfully computed metrics.\n\n### Parameters\n\n- `callId: string`\n\n- `flatten?: string`\n  Whether to return a flat list instead of grouped by metric definition (default: false)\n\n### Returns\n\n- `{ data: { description: string; metricDefinitionId: string; metricId: string; name: string; scope: 'GLOBAL' | 'PER_PARTICIPANT'; type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET'; values: { computedAt: string; confidence: number; context: 'CALL' | 'SEGMENT' | 'SEGMENT_RANGE'; value: number | boolean | string; fromSegment?: object; participantRole?: 'agent' | 'customer'; policyIds?: string[]; segment?: object; toSegment?: object; valueReasoning?: string; }[]; unit?: { name: string; symbol: string; }; }[]; }`\n\n  - `data: { description: string; metricDefinitionId: string; metricId: string; name: string; scope: 'GLOBAL' | 'PER_PARTICIPANT'; type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET'; values: { computedAt: string; confidence: number; context: 'CALL' | 'SEGMENT' | 'SEGMENT_RANGE'; value: number | boolean | string; fromSegment?: { id: string; endOffsetMs: number; startOffsetMs: number; text: string; }; participantRole?: 'agent' | 'customer'; policyIds?: string[]; segment?: { id: string; endOffsetMs: number; startOffsetMs: number; text: string; }; toSegment?: { id: string; endOffsetMs: number; startOffsetMs: number; text: string; }; valueReasoning?: string; }[]; unit?: { name: string; symbol: string; }; }[]`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.call.listMetrics('callId');\n\nconsole.log(response);\n```",
  },
  {
    name: 'listSentimentRuns',
    endpoint: '/v1/call/{callId}/sentiment-run',
    httpMethod: 'get',
    summary: 'List call sentiment runs',
    description:
      'Fetch detailed sentiment analysis results for a specific call, including emotional tone, key phrases, and sentiment scores.',
    stainlessPath: '(resource) call > (method) listSentimentRuns',
    qualified: 'client.call.listSentimentRuns',
    params: ['callId: string;'],
    response:
      '{ data: { status: string; averageCategoricalSentiment?: string; averageSentiment?: number; commonEmotion?: string; }; }',
    markdown:
      "## listSentimentRuns\n\n`client.call.listSentimentRuns(callId: string): { data: object; }`\n\n**get** `/v1/call/{callId}/sentiment-run`\n\nFetch detailed sentiment analysis results for a specific call, including emotional tone, key phrases, and sentiment scores.\n\n### Parameters\n\n- `callId: string`\n  ID of the call to fetch sentiment run for\n\n### Returns\n\n- `{ data: { status: string; averageCategoricalSentiment?: string; averageSentiment?: number; commonEmotion?: string; }; }`\n\n  - `data: { status: string; averageCategoricalSentiment?: string; averageSentiment?: number; commonEmotion?: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.call.listSentimentRuns('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'createDefinition',
    endpoint: '/v1/metric/definitions',
    httpMethod: 'post',
    summary: 'Create a metric definition',
    description:
      'Create a new custom metric definition. The metric will be added to the specified analysis package and can be used for evaluating calls.',
    stainlessPath: '(resource) metric > (method) createDefinition',
    qualified: 'client.metric.createDefinition',
    params: [
      'analysisPackageId: string;',
      'name: string;',
      "outputType: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET';",
      'booleanFalseLabel?: string;',
      'booleanTrueLabel?: string;',
      'classificationOptions?: { description: string; displayOrder: number; label: string; }[];',
      'llmPrompt?: string;',
      'maxClassifications?: number;',
      'metricId?: string;',
      "participantRole?: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER';",
      'scaleLabels?: { displayOrder: number; label: string; rangeMax: number; rangeMin: number; colorHex?: string; description?: string; }[];',
      'scaleMax?: number;',
      'scaleMin?: number;',
      "scope?: 'GLOBAL' | 'PER_PARTICIPANT';",
      "supportedContexts?: 'CALL' | 'SEGMENT' | 'TURN'[];",
    ],
    response:
      "{ data: { id: string; description: string; metricId: string; name: string; scope: 'GLOBAL' | 'PER_PARTICIPANT'; supportedContexts: 'CALL' | 'SEGMENT' | 'TURN'[]; type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET'; unit?: { name: string; symbol: string; }; }; }",
    markdown:
      "## createDefinition\n\n`client.metric.createDefinition(analysisPackageId: string, name: string, outputType: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET', booleanFalseLabel?: string, booleanTrueLabel?: string, classificationOptions?: { description: string; displayOrder: number; label: string; }[], llmPrompt?: string, maxClassifications?: number, metricId?: string, participantRole?: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER', scaleLabels?: { displayOrder: number; label: string; rangeMax: number; rangeMin: number; colorHex?: string; description?: string; }[], scaleMax?: number, scaleMin?: number, scope?: 'GLOBAL' | 'PER_PARTICIPANT', supportedContexts?: 'CALL' | 'SEGMENT' | 'TURN'[]): { data: object; }`\n\n**post** `/v1/metric/definitions`\n\nCreate a new custom metric definition. The metric will be added to the specified analysis package and can be used for evaluating calls.\n\n### Parameters\n\n- `analysisPackageId: string`\n  ID of the analysis package to add this metric to\n\n- `name: string`\n  Name of the metric\n\n- `outputType: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET'`\n  Type of value this metric produces\n\n- `booleanFalseLabel?: string`\n  Label for the false/negative case (only for BOOLEAN type)\n\n- `booleanTrueLabel?: string`\n  Label for the true/positive case (only for BOOLEAN type)\n\n- `classificationOptions?: { description: string; displayOrder: number; label: string; }[]`\n  Options for classification. Required for CLASSIFICATION type.\n\n- `llmPrompt?: string`\n  LLM prompt/criteria for evaluating this metric. Used to instruct the model on how to score. Required for BOOLEAN, NUMERIC, TEXT, and SCALE types.\n\n- `maxClassifications?: number`\n  Maximum number of classifications that can be selected (only for CLASSIFICATION type)\n\n- `metricId?: string`\n  Unique identifier for the metric (e.g. \"customer_satisfaction\"). Auto-generated from name if not provided.\n\n- `participantRole?: 'AGENT' | 'CUSTOMER' | 'SIMULATED_CUSTOMER' | 'BACKGROUND_SPEAKER'`\n  Participant role to evaluate. Required when scope is PER_PARTICIPANT.\n\n- `scaleLabels?: { displayOrder: number; label: string; rangeMax: number; rangeMin: number; colorHex?: string; description?: string; }[]`\n  Labels for scale ranges (only for SCALE type)\n\n- `scaleMax?: number`\n  Maximum value for scale. Required for SCALE type.\n\n- `scaleMin?: number`\n  Minimum value for scale. Required for SCALE type.\n\n- `scope?: 'GLOBAL' | 'PER_PARTICIPANT'`\n  Whether metric is global or per-participant (default: GLOBAL)\n\n- `supportedContexts?: 'CALL' | 'SEGMENT' | 'TURN'[]`\n  Which levels this metric can produce values at (default: [\"CALL\"])\n\n### Returns\n\n- `{ data: { id: string; description: string; metricId: string; name: string; scope: 'GLOBAL' | 'PER_PARTICIPANT'; supportedContexts: 'CALL' | 'SEGMENT' | 'TURN'[]; type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET'; unit?: { name: string; symbol: string; }; }; }`\n\n  - `data: { id: string; description: string; metricId: string; name: string; scope: 'GLOBAL' | 'PER_PARTICIPANT'; supportedContexts: 'CALL' | 'SEGMENT' | 'TURN'[]; type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET'; unit?: { name: string; symbol: string; }; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.metric.createDefinition({\n  analysisPackageId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n  name: 'Customer Satisfaction',\n  outputType: 'BOOLEAN',\n});\n\nconsole.log(response);\n```",
  },
  {
    name: 'listDefinitions',
    endpoint: '/v1/metric/definitions',
    httpMethod: 'get',
    summary: 'List metric definitions',
    description:
      'Fetch all metric definitions available in the project, including both system-generated and custom metrics.',
    stainlessPath: '(resource) metric > (method) listDefinitions',
    qualified: 'client.metric.listDefinitions',
    response:
      "{ data: { id: string; description: string; metricId: string; name: string; scope: 'GLOBAL' | 'PER_PARTICIPANT'; supportedContexts: 'CALL' | 'SEGMENT' | 'TURN'[]; type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET'; unit?: { name: string; symbol: string; }; }[]; }",
    markdown:
      "## listDefinitions\n\n`client.metric.listDefinitions(): { data: object[]; }`\n\n**get** `/v1/metric/definitions`\n\nFetch all metric definitions available in the project, including both system-generated and custom metrics.\n\n### Returns\n\n- `{ data: { id: string; description: string; metricId: string; name: string; scope: 'GLOBAL' | 'PER_PARTICIPANT'; supportedContexts: 'CALL' | 'SEGMENT' | 'TURN'[]; type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET'; unit?: { name: string; symbol: string; }; }[]; }`\n\n  - `data: { id: string; description: string; metricId: string; name: string; scope: 'GLOBAL' | 'PER_PARTICIPANT'; supportedContexts: 'CALL' | 'SEGMENT' | 'TURN'[]; type: 'COUNT' | 'NUMERIC' | 'BOOLEAN' | 'SCALE' | 'TEXT' | 'CLASSIFICATION' | 'OFFSET'; unit?: { name: string; symbol: string; }; }[]`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.metric.listDefinitions();\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/metric/policies',
    httpMethod: 'post',
    summary: 'Create a metric policy',
    description:
      'Creates a new metric policy. Policies define which metrics to collect and under what conditions.',
    stainlessPath: '(resource) metricPolicy > (method) create',
    qualified: 'client.metricPolicy.create',
    params: [
      'metrics: { id: string; }[];',
      'name: string;',
      "conditions?: { conditions: { conditionKey: string; conditionType: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION'; conditionOperator?: string; conditionValue?: string; }[]; }[];",
      "status?: 'ACTIVE' | 'INACTIVE';",
    ],
    response:
      "{ data: { id: string; conditions: { conditions: object[]; }[]; createdAt: string; metrics: { id: string; }[]; name: string; status: 'ACTIVE' | 'INACTIVE'; type: 'SYSTEM' | 'USER'; updatedAt: string; }; }",
    markdown:
      "## create\n\n`client.metricPolicy.create(metrics: { id: string; }[], name: string, conditions?: { conditions: { conditionKey: string; conditionType: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION'; conditionOperator?: string; conditionValue?: string; }[]; }[], status?: 'ACTIVE' | 'INACTIVE'): { data: object; }`\n\n**post** `/v1/metric/policies`\n\nCreates a new metric policy. Policies define which metrics to collect and under what conditions.\n\n### Parameters\n\n- `metrics: { id: string; }[]`\n  Metric definitions to collect when this policy matches\n\n- `name: string`\n  Name of the metric policy\n\n- `conditions?: { conditions: { conditionKey: string; conditionType: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION'; conditionOperator?: string; conditionValue?: string; }[]; }[]`\n  Condition groups. Omit to match all calls.\n\n- `status?: 'ACTIVE' | 'INACTIVE'`\n  Status of the policy (default: ACTIVE)\n\n### Returns\n\n- `{ data: { id: string; conditions: { conditions: object[]; }[]; createdAt: string; metrics: { id: string; }[]; name: string; status: 'ACTIVE' | 'INACTIVE'; type: 'SYSTEM' | 'USER'; updatedAt: string; }; }`\n\n  - `data: { id: string; conditions: { conditions: { conditionKey: string; conditionOperator: string; conditionType: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION'; conditionValue: string; }[]; }[]; createdAt: string; metrics: { id: string; }[]; name: string; status: 'ACTIVE' | 'INACTIVE'; type: 'SYSTEM' | 'USER'; updatedAt: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst metricPolicy = await client.metricPolicy.create({ metrics: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }], name: 'Evaluate all inbound calls' });\n\nconsole.log(metricPolicy);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/metric/policies/{policyId}',
    httpMethod: 'put',
    summary: 'Update a metric policy',
    description: 'Updates an existing metric policy. System policies cannot be modified.',
    stainlessPath: '(resource) metricPolicy > (method) update',
    qualified: 'client.metricPolicy.update',
    params: [
      'policyId: string;',
      "conditions?: { conditions: { conditionKey: string; conditionType: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION'; conditionOperator?: string; conditionValue?: string; }[]; }[];",
      'metrics?: { id: string; }[];',
      'name?: string;',
      "status?: 'ACTIVE' | 'INACTIVE';",
    ],
    response:
      "{ data: { id: string; conditions: { conditions: object[]; }[]; createdAt: string; metrics: { id: string; }[]; name: string; status: 'ACTIVE' | 'INACTIVE'; type: 'SYSTEM' | 'USER'; updatedAt: string; }; }",
    markdown:
      "## update\n\n`client.metricPolicy.update(policyId: string, conditions?: { conditions: { conditionKey: string; conditionType: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION'; conditionOperator?: string; conditionValue?: string; }[]; }[], metrics?: { id: string; }[], name?: string, status?: 'ACTIVE' | 'INACTIVE'): { data: object; }`\n\n**put** `/v1/metric/policies/{policyId}`\n\nUpdates an existing metric policy. System policies cannot be modified.\n\n### Parameters\n\n- `policyId: string`\n\n- `conditions?: { conditions: { conditionKey: string; conditionType: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION'; conditionOperator?: string; conditionValue?: string; }[]; }[]`\n  Condition groups. Omit to keep existing, provide empty array to remove all conditions.\n\n- `metrics?: { id: string; }[]`\n  Metric definitions to collect when this policy matches\n\n- `name?: string`\n  Name of the metric policy\n\n- `status?: 'ACTIVE' | 'INACTIVE'`\n  Status of the policy\n\n### Returns\n\n- `{ data: { id: string; conditions: { conditions: object[]; }[]; createdAt: string; metrics: { id: string; }[]; name: string; status: 'ACTIVE' | 'INACTIVE'; type: 'SYSTEM' | 'USER'; updatedAt: string; }; }`\n\n  - `data: { id: string; conditions: { conditions: { conditionKey: string; conditionOperator: string; conditionType: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION'; conditionValue: string; }[]; }[]; createdAt: string; metrics: { id: string; }[]; name: string; status: 'ACTIVE' | 'INACTIVE'; type: 'SYSTEM' | 'USER'; updatedAt: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst metricPolicy = await client.metricPolicy.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(metricPolicy);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/metric/policies',
    httpMethod: 'get',
    summary: 'List metric policies',
    description: 'Returns a paginated list of metric policies for the project, including system policies.',
    stainlessPath: '(resource) metricPolicy > (method) list',
    qualified: 'client.metricPolicy.list',
    params: ['after?: string;', 'limit?: number;', "status?: 'ACTIVE' | 'INACTIVE';"],
    response:
      "{ data: { id: string; conditions: { conditions: object[]; }[]; createdAt: string; metrics: { id: string; }[]; name: string; status: 'ACTIVE' | 'INACTIVE'; type: 'SYSTEM' | 'USER'; updatedAt: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }",
    markdown:
      "## list\n\n`client.metricPolicy.list(after?: string, limit?: number, status?: 'ACTIVE' | 'INACTIVE'): { data: object[]; pagination: object; }`\n\n**get** `/v1/metric/policies`\n\nReturns a paginated list of metric policies for the project, including system policies.\n\n### Parameters\n\n- `after?: string`\n  Cursor for pagination - use the nextCursor value from a previous response\n\n- `limit?: number`\n  Maximum number of policies to return (default: 20, max: 50)\n\n- `status?: 'ACTIVE' | 'INACTIVE'`\n  Filter by policy status\n\n### Returns\n\n- `{ data: { id: string; conditions: { conditions: object[]; }[]; createdAt: string; metrics: { id: string; }[]; name: string; status: 'ACTIVE' | 'INACTIVE'; type: 'SYSTEM' | 'USER'; updatedAt: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }`\n  Paginated list of metric policies\n\n  - `data: { id: string; conditions: { conditions: { conditionKey: string; conditionOperator: string; conditionType: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION'; conditionValue: string; }[]; }[]; createdAt: string; metrics: { id: string; }[]; name: string; status: 'ACTIVE' | 'INACTIVE'; type: 'SYSTEM' | 'USER'; updatedAt: string; }[]`\n  - `pagination: { hasMore: boolean; nextCursor: string; total: number; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst metricPolicies = await client.metricPolicy.list();\n\nconsole.log(metricPolicies);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/metric/policies/{policyId}',
    httpMethod: 'delete',
    summary: 'Delete a metric policy',
    description: 'Soft-deletes a metric policy. System policies cannot be deleted.',
    stainlessPath: '(resource) metricPolicy > (method) delete',
    qualified: 'client.metricPolicy.delete',
    params: ['policyId: string;'],
    response: '{ data: { deleted: boolean; }; }',
    markdown:
      "## delete\n\n`client.metricPolicy.delete(policyId: string): { data: object; }`\n\n**delete** `/v1/metric/policies/{policyId}`\n\nSoft-deletes a metric policy. System policies cannot be deleted.\n\n### Parameters\n\n- `policyId: string`\n\n### Returns\n\n- `{ data: { deleted: boolean; }; }`\n\n  - `data: { deleted: boolean; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst metricPolicy = await client.metricPolicy.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(metricPolicy);\n```",
  },
  {
    name: 'getById',
    endpoint: '/v1/metric/policies/{policyId}',
    httpMethod: 'get',
    summary: 'Get metric policy by ID',
    description: 'Returns a specific metric policy with its conditions and metrics.',
    stainlessPath: '(resource) metricPolicy > (method) getById',
    qualified: 'client.metricPolicy.getByID',
    params: ['policyId: string;'],
    response:
      "{ data: { id: string; conditions: { conditions: object[]; }[]; createdAt: string; metrics: { id: string; }[]; name: string; status: 'ACTIVE' | 'INACTIVE'; type: 'SYSTEM' | 'USER'; updatedAt: string; }; }",
    markdown:
      "## getById\n\n`client.metricPolicy.getByID(policyId: string): { data: object; }`\n\n**get** `/v1/metric/policies/{policyId}`\n\nReturns a specific metric policy with its conditions and metrics.\n\n### Parameters\n\n- `policyId: string`\n\n### Returns\n\n- `{ data: { id: string; conditions: { conditions: object[]; }[]; createdAt: string; metrics: { id: string; }[]; name: string; status: 'ACTIVE' | 'INACTIVE'; type: 'SYSTEM' | 'USER'; updatedAt: string; }; }`\n\n  - `data: { id: string; conditions: { conditions: { conditionKey: string; conditionOperator: string; conditionType: 'AGENT' | 'CALL_SOURCE' | 'CALL_PROPERTY' | 'INTEGRATION'; conditionValue: string; }[]; }[]; createdAt: string; metrics: { id: string; }[]; name: string; status: 'ACTIVE' | 'INACTIVE'; type: 'SYSTEM' | 'USER'; updatedAt: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.metricPolicy.getByID('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/metric/collection-jobs',
    httpMethod: 'post',
    summary: 'Create and run a metric collection job',
    description:
      'Creates a metric collection job for the specified calls and metrics, then triggers processing.',
    stainlessPath: '(resource) metricCollectionJob > (method) create',
    qualified: 'client.metricCollectionJob.create',
    params: ['callIds: string[];', 'metrics: { id: string; }[];'],
    response:
      "{ data: { id: string; completedAt: string; completedItems: number; createdAt: string; errorMessage: string; failedItems: number; policyIds: string[]; startedAt: string; status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED'; totalItems: number; triggeredBy: 'USER_MANUAL' | 'USER_API' | 'METRIC_POLICY' | 'SIMULATION'; updatedAt: string; }; }",
    markdown:
      "## create\n\n`client.metricCollectionJob.create(callIds: string[], metrics: { id: string; }[]): { data: object; }`\n\n**post** `/v1/metric/collection-jobs`\n\nCreates a metric collection job for the specified calls and metrics, then triggers processing.\n\n### Parameters\n\n- `callIds: string[]`\n  Call IDs to collect metrics for\n\n- `metrics: { id: string; }[]`\n  Metric definitions to collect\n\n### Returns\n\n- `{ data: { id: string; completedAt: string; completedItems: number; createdAt: string; errorMessage: string; failedItems: number; policyIds: string[]; startedAt: string; status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED'; totalItems: number; triggeredBy: 'USER_MANUAL' | 'USER_API' | 'METRIC_POLICY' | 'SIMULATION'; updatedAt: string; }; }`\n\n  - `data: { id: string; completedAt: string; completedItems: number; createdAt: string; errorMessage: string; failedItems: number; policyIds: string[]; startedAt: string; status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED'; totalItems: number; triggeredBy: 'USER_MANUAL' | 'USER_API' | 'METRIC_POLICY' | 'SIMULATION'; updatedAt: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst metricCollectionJob = await client.metricCollectionJob.create({ callIds: ['182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e'], metrics: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }] });\n\nconsole.log(metricCollectionJob);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/metric/collection-jobs',
    httpMethod: 'get',
    summary: 'List metric collection jobs',
    description: 'Returns a paginated list of metric collection jobs for the project.',
    stainlessPath: '(resource) metricCollectionJob > (method) list',
    qualified: 'client.metricCollectionJob.list',
    params: [
      'after?: string;',
      'limit?: number;',
      "status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED';",
    ],
    response:
      "{ data: { id: string; completedAt: string; completedItems: number; createdAt: string; errorMessage: string; failedItems: number; policyIds: string[]; startedAt: string; status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED'; totalItems: number; triggeredBy: 'USER_MANUAL' | 'USER_API' | 'METRIC_POLICY' | 'SIMULATION'; updatedAt: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }",
    markdown:
      "## list\n\n`client.metricCollectionJob.list(after?: string, limit?: number, status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED'): { data: object[]; pagination: object; }`\n\n**get** `/v1/metric/collection-jobs`\n\nReturns a paginated list of metric collection jobs for the project.\n\n### Parameters\n\n- `after?: string`\n  Cursor for pagination - use the nextCursor value from a previous response\n\n- `limit?: number`\n  Maximum number of jobs to return (default: 20, max: 50)\n\n- `status?: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED'`\n  Filter by job status\n\n### Returns\n\n- `{ data: { id: string; completedAt: string; completedItems: number; createdAt: string; errorMessage: string; failedItems: number; policyIds: string[]; startedAt: string; status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED'; totalItems: number; triggeredBy: 'USER_MANUAL' | 'USER_API' | 'METRIC_POLICY' | 'SIMULATION'; updatedAt: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }`\n  Paginated list of metric collection jobs\n\n  - `data: { id: string; completedAt: string; completedItems: number; createdAt: string; errorMessage: string; failedItems: number; policyIds: string[]; startedAt: string; status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED'; totalItems: number; triggeredBy: 'USER_MANUAL' | 'USER_API' | 'METRIC_POLICY' | 'SIMULATION'; updatedAt: string; }[]`\n  - `pagination: { hasMore: boolean; nextCursor: string; total: number; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst metricCollectionJobs = await client.metricCollectionJob.list();\n\nconsole.log(metricCollectionJobs);\n```",
  },
  {
    name: 'getById',
    endpoint: '/v1/metric/collection-jobs/{jobId}',
    httpMethod: 'get',
    summary: 'Get metric collection job by ID',
    description: 'Returns a specific metric collection job with progress information.',
    stainlessPath: '(resource) metricCollectionJob > (method) getById',
    qualified: 'client.metricCollectionJob.getByID',
    params: ['jobId: string;'],
    response:
      "{ data: { id: string; completedAt: string; completedItems: number; createdAt: string; errorMessage: string; failedItems: number; policyIds: string[]; startedAt: string; status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED'; totalItems: number; triggeredBy: 'USER_MANUAL' | 'USER_API' | 'METRIC_POLICY' | 'SIMULATION'; updatedAt: string; }; }",
    markdown:
      "## getById\n\n`client.metricCollectionJob.getByID(jobId: string): { data: object; }`\n\n**get** `/v1/metric/collection-jobs/{jobId}`\n\nReturns a specific metric collection job with progress information.\n\n### Parameters\n\n- `jobId: string`\n\n### Returns\n\n- `{ data: { id: string; completedAt: string; completedItems: number; createdAt: string; errorMessage: string; failedItems: number; policyIds: string[]; startedAt: string; status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED'; totalItems: number; triggeredBy: 'USER_MANUAL' | 'USER_API' | 'METRIC_POLICY' | 'SIMULATION'; updatedAt: string; }; }`\n\n  - `data: { id: string; completedAt: string; completedItems: number; createdAt: string; errorMessage: string; failedItems: number; policyIds: string[]; startedAt: string; status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELED'; totalItems: number; triggeredBy: 'USER_MANUAL' | 'USER_API' | 'METRIC_POLICY' | 'SIMULATION'; updatedAt: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.metricCollectionJob.getByID('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'getById',
    endpoint: '/v1/simulation/job/{jobId}',
    httpMethod: 'get',
    summary: 'Get simulation by ID',
    description:
      'Get a individual simulation run directly by its ID. This is generally part of a larger simulation run plan job.',
    stainlessPath: '(resource) simulationJob > (method) getById',
    qualified: 'client.simulationJob.getByID',
    params: ['jobId: object;'],
    response:
      "{ data: { agentEndpoint: { id: string; name: string; phoneNumber: string; type: 'PHONE' | 'WEBSOCKET'; }; createdAt: string; persona: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }; processingStatus: string; scenario: { id: string; description?: string; }; simulationJobId: string; status: string; callId?: string; completedAt?: string; roarkPhoneNumber?: string; startedAt?: string; }; }",
    markdown:
      "## getById\n\n`client.simulationJob.getByID(jobId: object): { data: object; }`\n\n**get** `/v1/simulation/job/{jobId}`\n\nGet a individual simulation run directly by its ID. This is generally part of a larger simulation run plan job.\n\n### Parameters\n\n- `jobId: object`\n\n### Returns\n\n- `{ data: { agentEndpoint: { id: string; name: string; phoneNumber: string; type: 'PHONE' | 'WEBSOCKET'; }; createdAt: string; persona: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }; processingStatus: string; scenario: { id: string; description?: string; }; simulationJobId: string; status: string; callId?: string; completedAt?: string; roarkPhoneNumber?: string; startedAt?: string; }; }`\n\n  - `data: { agentEndpoint: { id: string; name: string; phoneNumber: string; type: 'PHONE' | 'WEBSOCKET'; }; createdAt: string; persona: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }; processingStatus: string; scenario: { id: string; description?: string; }; simulationJobId: string; status: string; callId?: string; completedAt?: string; roarkPhoneNumber?: string; startedAt?: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.simulationJob.getByID('7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f');\n\nconsole.log(response);\n```",
  },
  {
    name: 'lookup',
    endpoint: '/v1/simulation/job/lookup',
    httpMethod: 'get',
    summary: 'Lookup by phone number',
    description: 'Find the matching simulation using the number used by the Roark simulation agent.',
    stainlessPath: '(resource) simulationJob > (method) lookup',
    qualified: 'client.simulationJob.lookup',
    params: ['roarkPhoneNumber: object;', 'callReceivedAt?: object;'],
    response:
      "{ data: { agentEndpoint: { id: string; name: string; phoneNumber: string; type: 'PHONE' | 'WEBSOCKET'; }; createdAt: string; persona: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }; processingStatus: string; scenario: { id: string; description?: string; }; simulationJobId: string; status: string; callId?: string; completedAt?: string; roarkPhoneNumber?: string; startedAt?: string; }; }",
    markdown:
      "## lookup\n\n`client.simulationJob.lookup(roarkPhoneNumber: object, callReceivedAt?: object): { data: object; }`\n\n**get** `/v1/simulation/job/lookup`\n\nFind the matching simulation using the number used by the Roark simulation agent.\n\n### Parameters\n\n- `roarkPhoneNumber: object`\n  Phone number provisioned by Roark for the simulation job in E.164 format. In the case of an inbound simulation, this is the number that calls your agent; in the case of an outbound simulation, this is the number you call from your agent.\n\n- `callReceivedAt?: object`\n  ISO 8601 timestamp of when the call was received. Alternatively, any time between the start and end of the call is valid. Defaults to the current time, which fetches any jobs that are currently ongoing.\n\n### Returns\n\n- `{ data: { agentEndpoint: { id: string; name: string; phoneNumber: string; type: 'PHONE' | 'WEBSOCKET'; }; createdAt: string; persona: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }; processingStatus: string; scenario: { id: string; description?: string; }; simulationJobId: string; status: string; callId?: string; completedAt?: string; roarkPhoneNumber?: string; startedAt?: string; }; }`\n\n  - `data: { agentEndpoint: { id: string; name: string; phoneNumber: string; type: 'PHONE' | 'WEBSOCKET'; }; createdAt: string; persona: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }; processingStatus: string; scenario: { id: string; description?: string; }; simulationJobId: string; status: string; callId?: string; completedAt?: string; roarkPhoneNumber?: string; startedAt?: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.simulationJob.lookup({ roarkPhoneNumber: {} });\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/simulation/plan',
    httpMethod: 'post',
    summary: 'Create a run plan',
    description:
      'Creates a new simulation run plan. Optionally triggers a job immediately if autoRun is true.',
    stainlessPath: '(resource) simulationRunPlan > (method) create',
    qualified: 'client.simulationRunPlan.create',
    params: [
      'agentEndpoints: { id: string; }[];',
      "direction: 'INBOUND' | 'OUTBOUND';",
      'maxSimulationDurationSeconds: number;',
      'metrics: { id: string; }[];',
      'name: string;',
      'personas: { id: string; }[];',
      'scenarios: { id: string; variables?: object; }[];',
      'autoRun?: boolean;',
      'description?: string;',
      'endCallPhrases?: string[];',
      'endCallReasons?: string[];',
      "executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';",
      'iterationCount?: number;',
      'maxConcurrentJobs?: number;',
      'silenceTimeoutSeconds?: number;',
    ],
    response:
      "{ data: { runPlan: { id: string; agentEndpoints: object[]; createdAt: string; direction: 'INBOUND' | 'OUTBOUND'; endCallPhrases: string[]; endCallReasons: string[]; evaluators: object[]; executionMode: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT'; iterationCount: number; maxConcurrentJobs: number; maxSimulationDurationSeconds: number; metrics: object[]; name: string; personas: object[]; scenarios: object[]; silenceTimeoutSeconds: number; testCaseCount: number; updatedAt: string; description?: string; }; runPlanJob?: { createdAt: string; simulationRunPlanId: string; simulationRunPlanJobId: string; status: string; }; }; }",
    markdown:
      "## create\n\n`client.simulationRunPlan.create(agentEndpoints: { id: string; }[], direction: 'INBOUND' | 'OUTBOUND', maxSimulationDurationSeconds: number, metrics: { id: string; }[], name: string, personas: { id: string; }[], scenarios: { id: string; variables?: object; }[], autoRun?: boolean, description?: string, endCallPhrases?: string[], endCallReasons?: string[], executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT', iterationCount?: number, maxConcurrentJobs?: number, silenceTimeoutSeconds?: number): { data: object; }`\n\n**post** `/v1/simulation/plan`\n\nCreates a new simulation run plan. Optionally triggers a job immediately if autoRun is true.\n\n### Parameters\n\n- `agentEndpoints: { id: string; }[]`\n  Agent endpoints to include in this run plan\n\n- `direction: 'INBOUND' | 'OUTBOUND'`\n  Direction of the simulation (INBOUND or OUTBOUND)\n\n- `maxSimulationDurationSeconds: number`\n  Maximum duration in seconds for each simulation\n\n- `metrics: { id: string; }[]`\n  Metric definitions to include in this run plan\n\n- `name: string`\n  Name of the run plan\n\n- `personas: { id: string; }[]`\n  Personas to include in this run plan\n\n- `scenarios: { id: string; variables?: object; }[]`\n  Scenarios to include in this run plan. The same scenario ID can appear multiple times with different variables.\n\n- `autoRun?: boolean`\n  Whether to automatically trigger a job after creating the run plan\n\n- `description?: string`\n  Description of the run plan\n\n- `endCallPhrases?: string[]`\n  Phrases that trigger end of call. Empty array disables the feature.\n\n- `endCallReasons?: string[]`\n  Semantic conditions that trigger end of call. The LLM evaluates the conversation against these conditions. Empty array disables the feature.\n\n- `executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT'`\n  Execution mode (PARALLEL or SEQUENTIAL)\n\n- `iterationCount?: number`\n  Number of iterations to run for each test case. Must be 1 for OUTBOUND direction.\n\n- `maxConcurrentJobs?: number`\n  Maximum number of concurrent simulation jobs\n\n- `silenceTimeoutSeconds?: number`\n  Timeout in seconds for silence detection\n\n### Returns\n\n- `{ data: { runPlan: { id: string; agentEndpoints: object[]; createdAt: string; direction: 'INBOUND' | 'OUTBOUND'; endCallPhrases: string[]; endCallReasons: string[]; evaluators: object[]; executionMode: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT'; iterationCount: number; maxConcurrentJobs: number; maxSimulationDurationSeconds: number; metrics: object[]; name: string; personas: object[]; scenarios: object[]; silenceTimeoutSeconds: number; testCaseCount: number; updatedAt: string; description?: string; }; runPlanJob?: { createdAt: string; simulationRunPlanId: string; simulationRunPlanJobId: string; status: string; }; }; }`\n\n  - `data: { runPlan: { id: string; agentEndpoints: { id: string; }[]; createdAt: string; direction: 'INBOUND' | 'OUTBOUND'; endCallPhrases: string[]; endCallReasons: string[]; evaluators: { id: string; }[]; executionMode: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT'; iterationCount: number; maxConcurrentJobs: number; maxSimulationDurationSeconds: number; metrics: { id: string; }[]; name: string; personas: { id: string; }[]; scenarios: { id: string; }[]; silenceTimeoutSeconds: number; testCaseCount: number; updatedAt: string; description?: string; }; runPlanJob?: { createdAt: string; simulationRunPlanId: string; simulationRunPlanJobId: string; status: string; }; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst simulationRunPlan = await client.simulationRunPlan.create({\n  agentEndpoints: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],\n  direction: 'INBOUND',\n  maxSimulationDurationSeconds: 300,\n  metrics: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],\n  name: 'My Run Plan',\n  personas: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],\n  scenarios: [{ id: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e' }],\n});\n\nconsole.log(simulationRunPlan);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/simulation/plan/{planId}',
    httpMethod: 'put',
    summary: 'Update a run plan',
    description: 'Updates an existing simulation run plan by its ID.',
    stainlessPath: '(resource) simulationRunPlan > (method) update',
    qualified: 'client.simulationRunPlan.update',
    params: [
      'planId: string;',
      'agentEndpoints?: { id: string; }[];',
      'description?: string;',
      "direction?: 'INBOUND' | 'OUTBOUND';",
      'endCallPhrases?: string[];',
      'endCallReasons?: string[];',
      "executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT';",
      'iterationCount?: number;',
      'maxConcurrentJobs?: number;',
      'maxSimulationDurationSeconds?: number;',
      'metrics?: { id: string; }[];',
      'name?: string;',
      'personas?: { id: string; }[];',
      'scenarios?: { id: string; variables?: object; }[];',
      'silenceTimeoutSeconds?: number;',
    ],
    response:
      "{ data: { id: string; agentEndpoints: { id: string; }[]; createdAt: string; direction: 'INBOUND' | 'OUTBOUND'; endCallPhrases: string[]; endCallReasons: string[]; evaluators: { id: string; }[]; executionMode: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT'; iterationCount: number; maxConcurrentJobs: number; maxSimulationDurationSeconds: number; metrics: { id: string; }[]; name: string; personas: { id: string; }[]; scenarios: { id: string; }[]; silenceTimeoutSeconds: number; testCaseCount: number; updatedAt: string; description?: string; }; }",
    markdown:
      "## update\n\n`client.simulationRunPlan.update(planId: string, agentEndpoints?: { id: string; }[], description?: string, direction?: 'INBOUND' | 'OUTBOUND', endCallPhrases?: string[], endCallReasons?: string[], executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT', iterationCount?: number, maxConcurrentJobs?: number, maxSimulationDurationSeconds?: number, metrics?: { id: string; }[], name?: string, personas?: { id: string; }[], scenarios?: { id: string; variables?: object; }[], silenceTimeoutSeconds?: number): { data: object; }`\n\n**put** `/v1/simulation/plan/{planId}`\n\nUpdates an existing simulation run plan by its ID.\n\n### Parameters\n\n- `planId: string`\n\n- `agentEndpoints?: { id: string; }[]`\n  Agent endpoints to include in this run plan\n\n- `description?: string`\n  Description of the run plan\n\n- `direction?: 'INBOUND' | 'OUTBOUND'`\n  Direction of the simulation (INBOUND or OUTBOUND)\n\n- `endCallPhrases?: string[]`\n  Phrases that trigger end of call. Empty array disables the feature.\n\n- `endCallReasons?: string[]`\n  Semantic conditions that trigger end of call. The LLM evaluates the conversation against these conditions. Empty array disables the feature.\n\n- `executionMode?: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT'`\n  Execution mode (PARALLEL or SEQUENTIAL)\n\n- `iterationCount?: number`\n  Number of iterations to run for each test case. Must be 1 for OUTBOUND direction.\n\n- `maxConcurrentJobs?: number`\n  Maximum number of concurrent simulation jobs\n\n- `maxSimulationDurationSeconds?: number`\n  Maximum duration in seconds for each simulation\n\n- `metrics?: { id: string; }[]`\n  Metric definitions to include in this run plan\n\n- `name?: string`\n  Name of the run plan\n\n- `personas?: { id: string; }[]`\n  Personas to include in this run plan\n\n- `scenarios?: { id: string; variables?: object; }[]`\n  Scenarios to include in this run plan. The same scenario ID can appear multiple times with different variables.\n\n- `silenceTimeoutSeconds?: number`\n  Timeout in seconds for silence detection\n\n### Returns\n\n- `{ data: { id: string; agentEndpoints: { id: string; }[]; createdAt: string; direction: 'INBOUND' | 'OUTBOUND'; endCallPhrases: string[]; endCallReasons: string[]; evaluators: { id: string; }[]; executionMode: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT'; iterationCount: number; maxConcurrentJobs: number; maxSimulationDurationSeconds: number; metrics: { id: string; }[]; name: string; personas: { id: string; }[]; scenarios: { id: string; }[]; silenceTimeoutSeconds: number; testCaseCount: number; updatedAt: string; description?: string; }; }`\n\n  - `data: { id: string; agentEndpoints: { id: string; }[]; createdAt: string; direction: 'INBOUND' | 'OUTBOUND'; endCallPhrases: string[]; endCallReasons: string[]; evaluators: { id: string; }[]; executionMode: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT'; iterationCount: number; maxConcurrentJobs: number; maxSimulationDurationSeconds: number; metrics: { id: string; }[]; name: string; personas: { id: string; }[]; scenarios: { id: string; }[]; silenceTimeoutSeconds: number; testCaseCount: number; updatedAt: string; description?: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst simulationRunPlan = await client.simulationRunPlan.update('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(simulationRunPlan);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/simulation/plan',
    httpMethod: 'get',
    summary: 'List run plans',
    description:
      'Returns a paginated list of simulation run plans. Optionally filter by search text or agent ID.',
    stainlessPath: '(resource) simulationRunPlan > (method) list',
    qualified: 'client.simulationRunPlan.list',
    params: ['after?: string;', 'agentId?: string;', 'limit?: number;', 'searchText?: string;'],
    response:
      "{ data: { id: string; agentEndpoints: { id: string; }[]; createdAt: string; direction: 'INBOUND' | 'OUTBOUND'; endCallPhrases: string[]; endCallReasons: string[]; evaluators: { id: string; }[]; executionMode: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT'; iterationCount: number; maxConcurrentJobs: number; maxSimulationDurationSeconds: number; metrics: { id: string; }[]; name: string; personas: { id: string; }[]; scenarios: { id: string; }[]; silenceTimeoutSeconds: number; testCaseCount: number; updatedAt: string; description?: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }",
    markdown:
      "## list\n\n`client.simulationRunPlan.list(after?: string, agentId?: string, limit?: number, searchText?: string): { data: object[]; pagination: object; }`\n\n**get** `/v1/simulation/plan`\n\nReturns a paginated list of simulation run plans. Optionally filter by search text or agent ID.\n\n### Parameters\n\n- `after?: string`\n  Cursor for pagination - use the nextCursor value from a previous response\n\n- `agentId?: string`\n  Filter run plans by agent ID\n\n- `limit?: number`\n  Maximum number of run plans to return (default: 20, max: 50)\n\n- `searchText?: string`\n  Search text to filter run plans by name\n\n### Returns\n\n- `{ data: { id: string; agentEndpoints: { id: string; }[]; createdAt: string; direction: 'INBOUND' | 'OUTBOUND'; endCallPhrases: string[]; endCallReasons: string[]; evaluators: { id: string; }[]; executionMode: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT'; iterationCount: number; maxConcurrentJobs: number; maxSimulationDurationSeconds: number; metrics: { id: string; }[]; name: string; personas: { id: string; }[]; scenarios: { id: string; }[]; silenceTimeoutSeconds: number; testCaseCount: number; updatedAt: string; description?: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }`\n  Paginated list of simulation run plans\n\n  - `data: { id: string; agentEndpoints: { id: string; }[]; createdAt: string; direction: 'INBOUND' | 'OUTBOUND'; endCallPhrases: string[]; endCallReasons: string[]; evaluators: { id: string; }[]; executionMode: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT'; iterationCount: number; maxConcurrentJobs: number; maxSimulationDurationSeconds: number; metrics: { id: string; }[]; name: string; personas: { id: string; }[]; scenarios: { id: string; }[]; silenceTimeoutSeconds: number; testCaseCount: number; updatedAt: string; description?: string; }[]`\n  - `pagination: { hasMore: boolean; nextCursor: string; total: number; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst simulationRunPlans = await client.simulationRunPlan.list();\n\nconsole.log(simulationRunPlans);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/simulation/plan/{planId}',
    httpMethod: 'delete',
    summary: 'Delete a run plan',
    description: 'Soft-deletes a simulation run plan by its ID.',
    stainlessPath: '(resource) simulationRunPlan > (method) delete',
    qualified: 'client.simulationRunPlan.delete',
    params: ['planId: string;'],
    response: '{ data: { deleted: boolean; }; }',
    markdown:
      "## delete\n\n`client.simulationRunPlan.delete(planId: string): { data: object; }`\n\n**delete** `/v1/simulation/plan/{planId}`\n\nSoft-deletes a simulation run plan by its ID.\n\n### Parameters\n\n- `planId: string`\n\n### Returns\n\n- `{ data: { deleted: boolean; }; }`\n\n  - `data: { deleted: boolean; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst simulationRunPlan = await client.simulationRunPlan.delete('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(simulationRunPlan);\n```",
  },
  {
    name: 'getById',
    endpoint: '/v1/simulation/plan/{planId}',
    httpMethod: 'get',
    summary: 'Get run plan by ID',
    description: 'Returns a specific simulation run plan by its ID.',
    stainlessPath: '(resource) simulationRunPlan > (method) getById',
    qualified: 'client.simulationRunPlan.getByID',
    params: ['planId: string;'],
    response:
      "{ data: { id: string; agentEndpoints: { id: string; }[]; createdAt: string; direction: 'INBOUND' | 'OUTBOUND'; endCallPhrases: string[]; endCallReasons: string[]; evaluators: { id: string; }[]; executionMode: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT'; iterationCount: number; maxConcurrentJobs: number; maxSimulationDurationSeconds: number; metrics: { id: string; }[]; name: string; personas: { id: string; }[]; scenarios: { id: string; }[]; silenceTimeoutSeconds: number; testCaseCount: number; updatedAt: string; description?: string; }; }",
    markdown:
      "## getById\n\n`client.simulationRunPlan.getByID(planId: string): { data: object; }`\n\n**get** `/v1/simulation/plan/{planId}`\n\nReturns a specific simulation run plan by its ID.\n\n### Parameters\n\n- `planId: string`\n\n### Returns\n\n- `{ data: { id: string; agentEndpoints: { id: string; }[]; createdAt: string; direction: 'INBOUND' | 'OUTBOUND'; endCallPhrases: string[]; endCallReasons: string[]; evaluators: { id: string; }[]; executionMode: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT'; iterationCount: number; maxConcurrentJobs: number; maxSimulationDurationSeconds: number; metrics: { id: string; }[]; name: string; personas: { id: string; }[]; scenarios: { id: string; }[]; silenceTimeoutSeconds: number; testCaseCount: number; updatedAt: string; description?: string; }; }`\n\n  - `data: { id: string; agentEndpoints: { id: string; }[]; createdAt: string; direction: 'INBOUND' | 'OUTBOUND'; endCallPhrases: string[]; endCallReasons: string[]; evaluators: { id: string; }[]; executionMode: 'PARALLEL' | 'SEQUENTIAL_SAME_RUN_PLAN' | 'SEQUENTIAL_PROJECT'; iterationCount: number; maxConcurrentJobs: number; maxSimulationDurationSeconds: number; metrics: { id: string; }[]; name: string; personas: { id: string; }[]; scenarios: { id: string; }[]; silenceTimeoutSeconds: number; testCaseCount: number; updatedAt: string; description?: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.simulationRunPlan.getByID('182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e');\n\nconsole.log(response);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/simulation/plan/jobs',
    httpMethod: 'get',
    summary: 'List simulation plan jobs',
    description:
      'Returns a paginated list of simulation run plan jobs. Filter by status, plan ID, or label to find specific simulation batches.',
    stainlessPath: '(resource) simulationRunPlanJob > (method) list',
    qualified: 'client.simulationRunPlanJob.list',
    params: [
      'after?: string;',
      'labelId?: string;',
      'labelName?: string;',
      'limit?: number;',
      'simulationRunPlanId?: string;',
      'status?: string;',
    ],
    response:
      "{ data: { createdAt: string; simulationRunPlanId: string; simulationRunPlanJobId: string; status: string; triggeredBy: 'SCHEDULED' | 'USER_TRIGGERED_FROM_UI' | 'RE_RUN' | 'TRIGGERED_FROM_API'; endedAt?: string; startedAt?: string; }[]; pagination: { hasMore: boolean; total: number; nextCursor?: string; }; }",
    markdown:
      "## list\n\n`client.simulationRunPlanJob.list(after?: string, labelId?: string, labelName?: string, limit?: number, simulationRunPlanId?: string, status?: string): { data: object[]; pagination: object; }`\n\n**get** `/v1/simulation/plan/jobs`\n\nReturns a paginated list of simulation run plan jobs. Filter by status, plan ID, or label to find specific simulation batches.\n\n### Parameters\n\n- `after?: string`\n  Cursor for pagination - use the nextCursor value from a previous response\n\n- `labelId?: string`\n  Filter by label ID attached to the plan job. Use this if you know the label ID.\n\n- `labelName?: string`\n  Filter by label name attached to the plan job. More user-friendly alternative to labelId. Case-insensitive.\n\n- `limit?: number`\n  Maximum number of plan jobs to return (default: 20, max: 50)\n\n- `simulationRunPlanId?: string`\n  Filter by simulation run plan ID\n\n- `status?: string`\n  Filter by plan job status (PENDING, CREATING_SNAPSHOTS, CREATING_SIMULATIONS, RUNNING_SIMULATIONS, ENDING_SIMULATIONS, COMPLETED, FAILED, TIMED_OUT, CANCELLED, CANCELLING)\n\n### Returns\n\n- `{ data: { createdAt: string; simulationRunPlanId: string; simulationRunPlanJobId: string; status: string; triggeredBy: 'SCHEDULED' | 'USER_TRIGGERED_FROM_UI' | 'RE_RUN' | 'TRIGGERED_FROM_API'; endedAt?: string; startedAt?: string; }[]; pagination: { hasMore: boolean; total: number; nextCursor?: string; }; }`\n  Paginated list of simulation run plan jobs\n\n  - `data: { createdAt: string; simulationRunPlanId: string; simulationRunPlanJobId: string; status: string; triggeredBy: 'SCHEDULED' | 'USER_TRIGGERED_FROM_UI' | 'RE_RUN' | 'TRIGGERED_FROM_API'; endedAt?: string; startedAt?: string; }[]`\n  - `pagination: { hasMore: boolean; total: number; nextCursor?: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst simulationRunPlanJobs = await client.simulationRunPlanJob.list();\n\nconsole.log(simulationRunPlanJobs);\n```",
  },
  {
    name: 'getById',
    endpoint: '/v1/simulation/plan/job/{jobId}',
    httpMethod: 'get',
    summary: 'Get simulation plan job',
    description: 'Retrieve details of a simulation plan job including all associated simulation jobs (calls)',
    stainlessPath: '(resource) simulationRunPlanJob > (method) getById',
    qualified: 'client.simulationRunPlanJob.getByID',
    params: ['jobId: object;'],
    response:
      '{ data: { createdAt: string; simulationJobs: { agentEndpoint: object; createdAt: string; persona: object; processingStatus: string; scenario: object; simulationJobId: string; status: string; callId?: string; completedAt?: string; roarkPhoneNumber?: string; startedAt?: string; }[]; simulationRunPlanId: string; simulationRunPlanJobId: string; status: string; endedAt?: string; startedAt?: string; }; }',
    markdown:
      "## getById\n\n`client.simulationRunPlanJob.getByID(jobId: object): { data: object; }`\n\n**get** `/v1/simulation/plan/job/{jobId}`\n\nRetrieve details of a simulation plan job including all associated simulation jobs (calls)\n\n### Parameters\n\n- `jobId: object`\n\n### Returns\n\n- `{ data: { createdAt: string; simulationJobs: { agentEndpoint: object; createdAt: string; persona: object; processingStatus: string; scenario: object; simulationJobId: string; status: string; callId?: string; completedAt?: string; roarkPhoneNumber?: string; startedAt?: string; }[]; simulationRunPlanId: string; simulationRunPlanJobId: string; status: string; endedAt?: string; startedAt?: string; }; }`\n\n  - `data: { createdAt: string; simulationJobs: { agentEndpoint: { id: string; name: string; phoneNumber: string; type: 'PHONE' | 'WEBSOCKET'; }; createdAt: string; persona: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }; processingStatus: string; scenario: { id: string; description?: string; }; simulationJobId: string; status: string; callId?: string; completedAt?: string; roarkPhoneNumber?: string; startedAt?: string; }[]; simulationRunPlanId: string; simulationRunPlanJobId: string; status: string; endedAt?: string; startedAt?: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.simulationRunPlanJob.getByID('7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f');\n\nconsole.log(response);\n```",
  },
  {
    name: 'start',
    endpoint: '/v1/simulation/plan/{planId}/job',
    httpMethod: 'post',
    summary: 'Run a simulation plan',
    description:
      'Create and execute a job for an existing simulation run plan. Optionally provide runtime variables to override plan-defined variables.',
    stainlessPath: '(resource) simulationRunPlanJob > (method) start',
    qualified: 'client.simulationRunPlanJob.start',
    params: ['planId: object;', 'variables?: object | { scenarioId: string; variables: object; }[];'],
    response:
      '{ data: { createdAt: string; simulationRunPlanId: string; simulationRunPlanJobId: string; status: string; }; }',
    markdown:
      '## start\n\n`client.simulationRunPlanJob.start(planId: object, variables?: object | { scenarioId: string; variables: object; }[]): { data: object; }`\n\n**post** `/v1/simulation/plan/{planId}/job`\n\nCreate and execute a job for an existing simulation run plan. Optionally provide runtime variables to override plan-defined variables.\n\n### Parameters\n\n- `planId: object`\n\n- `variables?: object | { scenarioId: string; variables: object; }[]`\n  Runtime variables that override plan-defined scenario variables. Accepts one of two formats:\n\nOption 1 — Global (flat key-value object, applies to ALL scenarios):\n  { "orderNumber": "12345", "environment": "staging" }\n\nOption 2 — Per-scenario (array of objects with scenarioId + variables):\n  [\n    { "scenarioId": "550e8400-...", "variables": { "orderNumber": "12345" } },\n    { "scenarioId": "7a3d2e1f-...", "variables": { "orderNumber": "67890" } }\n  ]\n\n### Returns\n\n- `{ data: { createdAt: string; simulationRunPlanId: string; simulationRunPlanJobId: string; status: string; }; }`\n\n  - `data: { createdAt: string; simulationRunPlanId: string; simulationRunPlanJobId: string; status: string; }`\n\n### Example\n\n```typescript\nimport Roark from \'@roarkanalytics/sdk\';\n\nconst client = new Roark();\n\nconst response = await client.simulationRunPlanJob.start(\'7f3e4d2c-8a91-4b5c-9e6f-1a2b3c4d5e6f\');\n\nconsole.log(response);\n```',
  },
  {
    name: 'create',
    endpoint: '/v1/simulation/scenario',
    httpMethod: 'post',
    summary: 'Create a scenario',
    description: 'Creates a new simulation scenario for the authenticated project.',
    stainlessPath: '(resource) simulationScenario > (method) create',
    qualified: 'client.simulationScenario.create',
    params: [
      'name: string;',
      'steps: { content: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; }[];',
    ],
    response:
      '{ data: { id: string; createdAt: string; description: string; name: string; steps: { content: string; nodeId: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; }[]; updatedAt: string; }; }',
    markdown:
      "## create\n\n`client.simulationScenario.create(name: string, steps: { content: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; }[]): { data: object; }`\n\n**post** `/v1/simulation/scenario`\n\nCreates a new simulation scenario for the authenticated project.\n\n### Parameters\n\n- `name: string`\n  Name of the scenario (used as the START node content)\n\n- `steps: { content: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; }[]`\n  Ordered list of steps for the scenario (at least one step is required)\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; description: string; name: string; steps: { content: string; nodeId: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; }[]; updatedAt: string; }; }`\n\n  - `data: { id: string; createdAt: string; description: string; name: string; steps: { content: string; nodeId: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; }[]; updatedAt: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst simulationScenario = await client.simulationScenario.create({ name: 'x', steps: [{ content: 'content', type: 'AGENT_TURN' }] });\n\nconsole.log(simulationScenario);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/simulation/scenario/{scenarioId}',
    httpMethod: 'put',
    summary: 'Update a scenario',
    description: 'Updates an existing simulation scenario by its ID.',
    stainlessPath: '(resource) simulationScenario > (method) update',
    qualified: 'client.simulationScenario.update',
    params: [
      'scenarioId: string;',
      "stepChanges: { action: 'create'; content: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; } | { action: 'update'; nodeId: string; content?: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; type?: string; } | { action: 'delete'; nodeId: string; }[];",
      'name?: string;',
    ],
    response:
      '{ data: { id: string; createdAt: string; description: string; name: string; steps: { content: string; nodeId: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; }[]; updatedAt: string; }; }',
    markdown:
      "## update\n\n`client.simulationScenario.update(scenarioId: string, stepChanges: { action: 'create'; content: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; } | { action: 'update'; nodeId: string; content?: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; type?: string; } | { action: 'delete'; nodeId: string; }[], name?: string): { data: object; }`\n\n**put** `/v1/simulation/scenario/{scenarioId}`\n\nUpdates an existing simulation scenario by its ID.\n\n### Parameters\n\n- `scenarioId: string`\n\n- `stepChanges: { action: 'create'; content: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; } | { action: 'update'; nodeId: string; content?: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; type?: string; } | { action: 'delete'; nodeId: string; }[]`\n  List of step changes to apply to the scenario\n\n- `name?: string`\n  New name for the scenario (updates the START node content)\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; description: string; name: string; steps: { content: string; nodeId: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; }[]; updatedAt: string; }; }`\n\n  - `data: { id: string; createdAt: string; description: string; name: string; steps: { content: string; nodeId: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; }[]; updatedAt: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst simulationScenario = await client.simulationScenario.update('scenarioId', { stepChanges: [{\n  action: 'create',\n  content: 'content',\n  type: 'AGENT_TURN',\n}] });\n\nconsole.log(simulationScenario);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/simulation/scenario',
    httpMethod: 'get',
    summary: 'List simulation scenarios',
    description: 'Returns a paginated list of simulation scenarios for the authenticated project.',
    stainlessPath: '(resource) simulationScenario > (method) list',
    qualified: 'client.simulationScenario.list',
    params: ['after?: string;', 'limit?: number;'],
    response:
      '{ data: { id: string; createdAt: string; description: string; name: string; steps: { content: string; nodeId: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; }[]; updatedAt: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }',
    markdown:
      "## list\n\n`client.simulationScenario.list(after?: string, limit?: number): { data: object[]; pagination: object; }`\n\n**get** `/v1/simulation/scenario`\n\nReturns a paginated list of simulation scenarios for the authenticated project.\n\n### Parameters\n\n- `after?: string`\n\n- `limit?: number`\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; description: string; name: string; steps: { content: string; nodeId: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; }[]; updatedAt: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }`\n\n  - `data: { id: string; createdAt: string; description: string; name: string; steps: { content: string; nodeId: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; }[]; updatedAt: string; }[]`\n  - `pagination: { hasMore: boolean; nextCursor: string; total: number; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst simulationScenarios = await client.simulationScenario.list();\n\nconsole.log(simulationScenarios);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/simulation/scenario/{scenarioId}',
    httpMethod: 'delete',
    summary: 'Delete a scenario',
    description: 'Deletes a simulation scenario by its ID.',
    stainlessPath: '(resource) simulationScenario > (method) delete',
    qualified: 'client.simulationScenario.delete',
    params: ['scenarioId: string;'],
    response: '{ data: { deleted: boolean; }; }',
    markdown:
      "## delete\n\n`client.simulationScenario.delete(scenarioId: string): { data: object; }`\n\n**delete** `/v1/simulation/scenario/{scenarioId}`\n\nDeletes a simulation scenario by its ID.\n\n### Parameters\n\n- `scenarioId: string`\n\n### Returns\n\n- `{ data: { deleted: boolean; }; }`\n\n  - `data: { deleted: boolean; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst simulationScenario = await client.simulationScenario.delete('scenarioId');\n\nconsole.log(simulationScenario);\n```",
  },
  {
    name: 'getById',
    endpoint: '/v1/simulation/scenario/{scenarioId}',
    httpMethod: 'get',
    summary: 'Get scenario by ID',
    description: 'Returns a specific simulation scenario by its ID.',
    stainlessPath: '(resource) simulationScenario > (method) getById',
    qualified: 'client.simulationScenario.getByID',
    params: ['scenarioId: string;'],
    response:
      '{ data: { id: string; createdAt: string; description: string; name: string; steps: { content: string; nodeId: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; }[]; updatedAt: string; }; }',
    markdown:
      "## getById\n\n`client.simulationScenario.getByID(scenarioId: string): { data: object; }`\n\n**get** `/v1/simulation/scenario/{scenarioId}`\n\nReturns a specific simulation scenario by its ID.\n\n### Parameters\n\n- `scenarioId: string`\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; description: string; name: string; steps: { content: string; nodeId: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; }[]; updatedAt: string; }; }`\n\n  - `data: { id: string; createdAt: string; description: string; name: string; steps: { content: string; nodeId: string; type: string; dtmfDigits?: string; linkedScenarioId?: string; silenceDurationSeconds?: number; }[]; updatedAt: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.simulationScenario.getByID('scenarioId');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/persona',
    httpMethod: 'post',
    summary: 'Create a new persona',
    description: 'Creates a new persona for the authenticated project.',
    stainlessPath: '(resource) simulationPersona > (method) create',
    qualified: 'client.simulationPersona.create',
    params: [
      'accent: string;',
      "gender: 'MALE' | 'FEMALE';",
      'language: string;',
      'name: string;',
      'backgroundNoise?: string;',
      'backstoryPrompt?: string;',
      "baseEmotion?: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED';",
      "confirmationStyle?: 'EXPLICIT' | 'VAGUE';",
      'description?: string;',
      'hasDisfluencies?: boolean;',
      'idleMessageMaxSpokenCount?: number;',
      'idleMessageResetCountOnUserSpeechEnabled?: boolean;',
      'idleMessages?: string[];',
      'idleTimeoutSeconds?: number;',
      "intentClarity?: 'CLEAR' | 'INDIRECT' | 'VAGUE';",
      "memoryReliability?: 'HIGH' | 'LOW';",
      'properties?: object;',
      "responseTiming?: 'RELAXED' | 'NORMAL' | 'QUICK';",
      "secondaryLanguage?: 'EN';",
      "speechClarity?: 'CLEAR' | 'VAGUE' | 'RAMBLING';",
      "speechPace?: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';",
    ],
    response:
      "{ data: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }; }",
    markdown:
      "## create\n\n`client.simulationPersona.create(accent: string, gender: 'MALE' | 'FEMALE', language: string, name: string, backgroundNoise?: string, backstoryPrompt?: string, baseEmotion?: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED', confirmationStyle?: 'EXPLICIT' | 'VAGUE', description?: string, hasDisfluencies?: boolean, idleMessageMaxSpokenCount?: number, idleMessageResetCountOnUserSpeechEnabled?: boolean, idleMessages?: string[], idleTimeoutSeconds?: number, intentClarity?: 'CLEAR' | 'INDIRECT' | 'VAGUE', memoryReliability?: 'HIGH' | 'LOW', properties?: object, responseTiming?: 'RELAXED' | 'NORMAL' | 'QUICK', secondaryLanguage?: 'EN', speechClarity?: 'CLEAR' | 'VAGUE' | 'RAMBLING', speechPace?: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'): { data: object; }`\n\n**post** `/v1/persona`\n\nCreates a new persona for the authenticated project.\n\n### Parameters\n\n- `accent: string`\n  Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with optional variants\n\n- `gender: 'MALE' | 'FEMALE'`\n  Gender of the persona\n\n- `language: string`\n  Primary language ISO 639-1 code for the persona\n\n- `name: string`\n  The name the agent will identify as during conversations\n\n- `backgroundNoise?: string`\n  Background noise setting\n\n- `backstoryPrompt?: string`\n  Background story and behavioral patterns for the persona\n\n- `baseEmotion?: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'`\n  Base emotional state of the persona\n\n- `confirmationStyle?: 'EXPLICIT' | 'VAGUE'`\n  How the persona confirms information\n\n- `description?: string`\n  Human-readable description of the persona\n\n- `hasDisfluencies?: boolean`\n  Whether the persona uses filler words like \"um\" and \"uh\"\n\n- `idleMessageMaxSpokenCount?: number`\n  Maximum number of idle messages the persona will send before giving up\n\n- `idleMessageResetCountOnUserSpeechEnabled?: boolean`\n  Whether the idle message counter resets when the agent speaks\n\n- `idleMessages?: string[]`\n  Messages the persona will say when the agent goes silent during a call\n\n- `idleTimeoutSeconds?: number`\n  Seconds of silence before the persona sends an idle message\n\n- `intentClarity?: 'CLEAR' | 'INDIRECT' | 'VAGUE'`\n  How clearly the persona expresses their intentions\n\n- `memoryReliability?: 'HIGH' | 'LOW'`\n  How reliable the persona's memory is\n\n- `properties?: object`\n  Additional custom properties about the persona\n\n- `responseTiming?: 'RELAXED' | 'NORMAL' | 'QUICK'`\n  Controls how quickly the persona responds to pauses in conversation (QUICK, NORMAL, RELAXED)\n\n- `secondaryLanguage?: 'EN'`\n  Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)\n\n- `speechClarity?: 'CLEAR' | 'VAGUE' | 'RAMBLING'`\n  Speech clarity of the persona\n\n- `speechPace?: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'`\n  Speech pace of the persona\n\n### Returns\n\n- `{ data: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }; }`\n\n  - `data: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst simulationPersona = await client.simulationPersona.create({\n  accent: 'US',\n  gender: 'MALE',\n  language: 'EN',\n  name: 'name',\n});\n\nconsole.log(simulationPersona);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/persona/{personaId}',
    httpMethod: 'put',
    summary: 'Update a persona',
    description: 'Updates an existing persona by its ID.',
    stainlessPath: '(resource) simulationPersona > (method) update',
    qualified: 'client.simulationPersona.update',
    params: [
      'personaId: string;',
      'accent?: string;',
      'backgroundNoise?: string;',
      'backstoryPrompt?: string;',
      "baseEmotion?: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED';",
      "confirmationStyle?: 'EXPLICIT' | 'VAGUE';",
      'description?: string;',
      "gender?: 'MALE' | 'FEMALE';",
      'hasDisfluencies?: boolean;',
      'idleMessageMaxSpokenCount?: number;',
      'idleMessageResetCountOnUserSpeechEnabled?: boolean;',
      'idleMessages?: string[];',
      'idleTimeoutSeconds?: number;',
      "intentClarity?: 'CLEAR' | 'INDIRECT' | 'VAGUE';",
      'language?: string;',
      "memoryReliability?: 'HIGH' | 'LOW';",
      'name?: string;',
      'properties?: object;',
      "responseTiming?: 'RELAXED' | 'NORMAL' | 'QUICK';",
      "secondaryLanguage?: 'EN';",
      "speechClarity?: 'CLEAR' | 'VAGUE' | 'RAMBLING';",
      "speechPace?: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST';",
    ],
    response:
      "{ data: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }; }",
    markdown:
      "## update\n\n`client.simulationPersona.update(personaId: string, accent?: string, backgroundNoise?: string, backstoryPrompt?: string, baseEmotion?: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED', confirmationStyle?: 'EXPLICIT' | 'VAGUE', description?: string, gender?: 'MALE' | 'FEMALE', hasDisfluencies?: boolean, idleMessageMaxSpokenCount?: number, idleMessageResetCountOnUserSpeechEnabled?: boolean, idleMessages?: string[], idleTimeoutSeconds?: number, intentClarity?: 'CLEAR' | 'INDIRECT' | 'VAGUE', language?: string, memoryReliability?: 'HIGH' | 'LOW', name?: string, properties?: object, responseTiming?: 'RELAXED' | 'NORMAL' | 'QUICK', secondaryLanguage?: 'EN', speechClarity?: 'CLEAR' | 'VAGUE' | 'RAMBLING', speechPace?: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'): { data: object; }`\n\n**put** `/v1/persona/{personaId}`\n\nUpdates an existing persona by its ID.\n\n### Parameters\n\n- `personaId: string`\n\n- `accent?: string`\n  Accent of the persona, defined using ISO 3166-1 alpha-2 country codes with optional variants\n\n- `backgroundNoise?: string`\n  Background noise setting\n\n- `backstoryPrompt?: string`\n  Background story and behavioral patterns for the persona\n\n- `baseEmotion?: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'`\n  Base emotional state of the persona\n\n- `confirmationStyle?: 'EXPLICIT' | 'VAGUE'`\n  How the persona confirms information\n\n- `description?: string`\n  Human-readable description of the persona\n\n- `gender?: 'MALE' | 'FEMALE'`\n  Gender of the persona\n\n- `hasDisfluencies?: boolean`\n  Whether the persona uses filler words like \"um\" and \"uh\"\n\n- `idleMessageMaxSpokenCount?: number`\n  Maximum number of idle messages the persona will send before giving up\n\n- `idleMessageResetCountOnUserSpeechEnabled?: boolean`\n  Whether the idle message counter resets when the agent speaks\n\n- `idleMessages?: string[]`\n  Messages the persona will say when the agent goes silent during a call\n\n- `idleTimeoutSeconds?: number`\n  Seconds of silence before the persona sends an idle message\n\n- `intentClarity?: 'CLEAR' | 'INDIRECT' | 'VAGUE'`\n  How clearly the persona expresses their intentions\n\n- `language?: string`\n  Primary language ISO 639-1 code for the persona\n\n- `memoryReliability?: 'HIGH' | 'LOW'`\n  How reliable the persona's memory is\n\n- `name?: string`\n  The name the agent will identify as during conversations\n\n- `properties?: object`\n  Additional custom properties about the persona\n\n- `responseTiming?: 'RELAXED' | 'NORMAL' | 'QUICK'`\n  Controls how quickly the persona responds to pauses in conversation (QUICK, NORMAL, RELAXED)\n\n- `secondaryLanguage?: 'EN'`\n  Secondary language ISO 639-1 code for code-switching (e.g., Hinglish, Spanglish)\n\n- `speechClarity?: 'CLEAR' | 'VAGUE' | 'RAMBLING'`\n  Speech clarity of the persona\n\n- `speechPace?: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'`\n  Speech pace of the persona\n\n### Returns\n\n- `{ data: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }; }`\n\n  - `data: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst simulationPersona = await client.simulationPersona.update('personaId');\n\nconsole.log(simulationPersona);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/persona',
    httpMethod: 'get',
    summary: 'List personas',
    description: 'Returns a paginated list of personas for the authenticated project.',
    stainlessPath: '(resource) simulationPersona > (method) list',
    qualified: 'client.simulationPersona.list',
    params: ['after?: string;', 'limit?: number;', 'searchText?: string;'],
    response:
      "{ data: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }",
    markdown:
      "## list\n\n`client.simulationPersona.list(after?: string, limit?: number, searchText?: string): { data: object[]; pagination: object; }`\n\n**get** `/v1/persona`\n\nReturns a paginated list of personas for the authenticated project.\n\n### Parameters\n\n- `after?: string`\n\n- `limit?: number`\n\n- `searchText?: string`\n\n### Returns\n\n- `{ data: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }`\n\n  - `data: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }[]`\n  - `pagination: { hasMore: boolean; nextCursor: string; total: number; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst simulationPersonas = await client.simulationPersona.list();\n\nconsole.log(simulationPersonas);\n```",
  },
  {
    name: 'getById',
    endpoint: '/v1/persona/{personaId}',
    httpMethod: 'get',
    summary: 'Get persona by ID',
    description: 'Returns a specific persona by its ID.',
    stainlessPath: '(resource) simulationPersona > (method) getById',
    qualified: 'client.simulationPersona.getByID',
    params: ['personaId: string;'],
    response:
      "{ data: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }; }",
    markdown:
      "## getById\n\n`client.simulationPersona.getByID(personaId: string): { data: object; }`\n\n**get** `/v1/persona/{personaId}`\n\nReturns a specific persona by its ID.\n\n### Parameters\n\n- `personaId: string`\n\n### Returns\n\n- `{ data: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }; }`\n\n  - `data: { id: string; accent: string; backgroundNoise: string; baseEmotion: 'NEUTRAL' | 'CHEERFUL' | 'CONFUSED' | 'FRUSTRATED' | 'SKEPTICAL' | 'RUSHED' | 'DISTRACTED'; confirmationStyle: 'EXPLICIT' | 'VAGUE'; createdAt: string; gender: 'MALE' | 'FEMALE'; hasDisfluencies: boolean; idleMessageMaxSpokenCount: number; idleMessageResetCountOnUserSpeechEnabled: boolean; idleMessages: string[]; idleTimeoutSeconds: number; intentClarity: 'CLEAR' | 'INDIRECT' | 'VAGUE'; language: string; memoryReliability: 'HIGH' | 'LOW'; name: string; properties: object; responseTiming: 'RELAXED' | 'NORMAL' | 'QUICK'; speechClarity: 'CLEAR' | 'VAGUE' | 'RAMBLING'; speechPace: 'SUPER_SLOW' | 'SLOW' | 'NORMAL' | 'FAST' | 'SUPER_FAST'; updatedAt: string; backstoryPrompt?: string; description?: string; secondaryLanguage?: 'EN'; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.simulationPersona.getByID('personaId');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/agent',
    httpMethod: 'post',
    summary: 'Create a new agent',
    description: 'Creates a new agent for the authenticated project.',
    stainlessPath: '(resource) agent > (method) create',
    qualified: 'client.agent.create',
    params: ['name: string;', 'customId?: string;', 'description?: string;'],
    response:
      '{ data: { id: string; createdAt: string; customId: string; description: string; name: string; updatedAt: string; }; }',
    markdown:
      "## create\n\n`client.agent.create(name: string, customId?: string, description?: string): { data: object; }`\n\n**post** `/v1/agent`\n\nCreates a new agent for the authenticated project.\n\n### Parameters\n\n- `name: string`\n  Name of the agent\n\n- `customId?: string`\n  Custom identifier for the agent\n\n- `description?: string`\n  Description of the agent\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; customId: string; description: string; name: string; updatedAt: string; }; }`\n\n  - `data: { id: string; createdAt: string; customId: string; description: string; name: string; updatedAt: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst agent = await client.agent.create({ name: 'x' });\n\nconsole.log(agent);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/agent/{agentId}',
    httpMethod: 'put',
    summary: 'Update an agent',
    description: 'Updates an existing agent by its ID.',
    stainlessPath: '(resource) agent > (method) update',
    qualified: 'client.agent.update',
    params: ['agentId: string;', 'description?: string;', 'name?: string;'],
    response:
      '{ data: { id: string; createdAt: string; customId: string; description: string; name: string; updatedAt: string; }; }',
    markdown:
      "## update\n\n`client.agent.update(agentId: string, description?: string, name?: string): { data: object; }`\n\n**put** `/v1/agent/{agentId}`\n\nUpdates an existing agent by its ID.\n\n### Parameters\n\n- `agentId: string`\n\n- `description?: string`\n  Description of the agent\n\n- `name?: string`\n  Name of the agent\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; customId: string; description: string; name: string; updatedAt: string; }; }`\n\n  - `data: { id: string; createdAt: string; customId: string; description: string; name: string; updatedAt: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst agent = await client.agent.update('agentId');\n\nconsole.log(agent);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/agent',
    httpMethod: 'get',
    summary: 'List agents',
    description: 'Returns a paginated list of agents for the authenticated project.',
    stainlessPath: '(resource) agent > (method) list',
    qualified: 'client.agent.list',
    params: ['after?: string;', 'limit?: number;', 'searchText?: string;'],
    response:
      '{ data: { id: string; createdAt: string; customId: string; description: string; name: string; updatedAt: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }',
    markdown:
      "## list\n\n`client.agent.list(after?: string, limit?: number, searchText?: string): { data: object[]; pagination: object; }`\n\n**get** `/v1/agent`\n\nReturns a paginated list of agents for the authenticated project.\n\n### Parameters\n\n- `after?: string`\n\n- `limit?: number`\n\n- `searchText?: string`\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; customId: string; description: string; name: string; updatedAt: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }`\n\n  - `data: { id: string; createdAt: string; customId: string; description: string; name: string; updatedAt: string; }[]`\n  - `pagination: { hasMore: boolean; nextCursor: string; total: number; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst agents = await client.agent.list();\n\nconsole.log(agents);\n```",
  },
  {
    name: 'getById',
    endpoint: '/v1/agent/{agentId}',
    httpMethod: 'get',
    summary: 'Get agent by ID',
    description: 'Returns a specific agent by its ID.',
    stainlessPath: '(resource) agent > (method) getById',
    qualified: 'client.agent.getByID',
    params: ['agentId: string;'],
    response:
      '{ data: { id: string; createdAt: string; customId: string; description: string; name: string; updatedAt: string; }; }',
    markdown:
      "## getById\n\n`client.agent.getByID(agentId: string): { data: object; }`\n\n**get** `/v1/agent/{agentId}`\n\nReturns a specific agent by its ID.\n\n### Parameters\n\n- `agentId: string`\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; customId: string; description: string; name: string; updatedAt: string; }; }`\n\n  - `data: { id: string; createdAt: string; customId: string; description: string; name: string; updatedAt: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.agent.getByID('agentId');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/agent/endpoint',
    httpMethod: 'post',
    summary: 'Create a new agent endpoint',
    description: 'Creates a new agent endpoint for the authenticated project.',
    stainlessPath: '(resource) agentEndpoint > (method) create',
    qualified: 'client.agentEndpoint.create',
    params: [
      'agentId: string;',
      "direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING';",
      'value: string;',
      'environment?: string;',
      'outboundDialHttpRequestDefinitionId?: string;',
      "outboundDialType?: 'NONE' | 'HTTP_REQUEST';",
    ],
    response:
      "{ data: { id: string; agentId: string; createdAt: string; direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING'; environment: string; outboundDialHttpRequestDefinitionId: string; outboundDialType: 'NONE' | 'HTTP_REQUEST'; type: 'PHONE' | 'WEBSOCKET'; updatedAt: string; value: string; }; }",
    markdown:
      "## create\n\n`client.agentEndpoint.create(agentId: string, direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING', value: string, environment?: string, outboundDialHttpRequestDefinitionId?: string, outboundDialType?: 'NONE' | 'HTTP_REQUEST'): { data: object; }`\n\n**post** `/v1/agent/endpoint`\n\nCreates a new agent endpoint for the authenticated project.\n\n### Parameters\n\n- `agentId: string`\n  Agent ID to associate this endpoint with\n\n- `direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING'`\n  Call direction: INCOMING, OUTGOING, or INCOMING_AND_OUTGOING\n\n- `value: string`\n  Phone number in E.164 format (e.g., +12345678900)\n\n- `environment?: string`\n  Environment name (default: production)\n\n- `outboundDialHttpRequestDefinitionId?: string`\n  ID of the HTTP request definition for outbound dialing (required when outboundDialType is HTTP_REQUEST)\n\n- `outboundDialType?: 'NONE' | 'HTTP_REQUEST'`\n  Outbound dial type: NONE or HTTP_REQUEST (default: NONE)\n\n### Returns\n\n- `{ data: { id: string; agentId: string; createdAt: string; direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING'; environment: string; outboundDialHttpRequestDefinitionId: string; outboundDialType: 'NONE' | 'HTTP_REQUEST'; type: 'PHONE' | 'WEBSOCKET'; updatedAt: string; value: string; }; }`\n\n  - `data: { id: string; agentId: string; createdAt: string; direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING'; environment: string; outboundDialHttpRequestDefinitionId: string; outboundDialType: 'NONE' | 'HTTP_REQUEST'; type: 'PHONE' | 'WEBSOCKET'; updatedAt: string; value: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst agentEndpoint = await client.agentEndpoint.create({\n  agentId: '182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e',\n  direction: 'INCOMING',\n  value: 'value',\n});\n\nconsole.log(agentEndpoint);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/agent/endpoint/{endpointId}',
    httpMethod: 'put',
    summary: 'Update an agent endpoint',
    description:
      'Updates an existing agent endpoint by its ID. Only environment and outboundDialType can be modified.',
    stainlessPath: '(resource) agentEndpoint > (method) update',
    qualified: 'client.agentEndpoint.update',
    params: [
      'endpointId: string;',
      'environment?: string;',
      'outboundDialHttpRequestDefinitionId?: string;',
      "outboundDialType?: 'NONE' | 'HTTP_REQUEST';",
    ],
    response:
      "{ data: { id: string; agentId: string; createdAt: string; direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING'; environment: string; outboundDialHttpRequestDefinitionId: string; outboundDialType: 'NONE' | 'HTTP_REQUEST'; type: 'PHONE' | 'WEBSOCKET'; updatedAt: string; value: string; }; }",
    markdown:
      "## update\n\n`client.agentEndpoint.update(endpointId: string, environment?: string, outboundDialHttpRequestDefinitionId?: string, outboundDialType?: 'NONE' | 'HTTP_REQUEST'): { data: object; }`\n\n**put** `/v1/agent/endpoint/{endpointId}`\n\nUpdates an existing agent endpoint by its ID. Only environment and outboundDialType can be modified.\n\n### Parameters\n\n- `endpointId: string`\n\n- `environment?: string`\n  Environment name\n\n- `outboundDialHttpRequestDefinitionId?: string`\n  ID of the HTTP request definition for outbound dialing\n\n- `outboundDialType?: 'NONE' | 'HTTP_REQUEST'`\n  Outbound dial type: NONE or HTTP_REQUEST\n\n### Returns\n\n- `{ data: { id: string; agentId: string; createdAt: string; direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING'; environment: string; outboundDialHttpRequestDefinitionId: string; outboundDialType: 'NONE' | 'HTTP_REQUEST'; type: 'PHONE' | 'WEBSOCKET'; updatedAt: string; value: string; }; }`\n\n  - `data: { id: string; agentId: string; createdAt: string; direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING'; environment: string; outboundDialHttpRequestDefinitionId: string; outboundDialType: 'NONE' | 'HTTP_REQUEST'; type: 'PHONE' | 'WEBSOCKET'; updatedAt: string; value: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst agentEndpoint = await client.agentEndpoint.update('endpointId');\n\nconsole.log(agentEndpoint);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/agent/endpoint',
    httpMethod: 'get',
    summary: 'List agent endpoints',
    description: 'Returns a paginated list of agent endpoints for the authenticated project.',
    stainlessPath: '(resource) agentEndpoint > (method) list',
    qualified: 'client.agentEndpoint.list',
    params: ['after?: string;', 'agentId?: string;', 'limit?: number;', 'searchText?: string;'],
    response:
      "{ data: { id: string; agentId: string; createdAt: string; direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING'; environment: string; outboundDialHttpRequestDefinitionId: string; outboundDialType: 'NONE' | 'HTTP_REQUEST'; type: 'PHONE' | 'WEBSOCKET'; updatedAt: string; value: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }",
    markdown:
      "## list\n\n`client.agentEndpoint.list(after?: string, agentId?: string, limit?: number, searchText?: string): { data: object[]; pagination: object; }`\n\n**get** `/v1/agent/endpoint`\n\nReturns a paginated list of agent endpoints for the authenticated project.\n\n### Parameters\n\n- `after?: string`\n  Cursor for pagination - endpoint ID to start after\n\n- `agentId?: string`\n  Filter by agent ID\n\n- `limit?: number`\n  Maximum number of endpoints to return (default: 20, max: 50)\n\n- `searchText?: string`\n  Search text to filter endpoints\n\n### Returns\n\n- `{ data: { id: string; agentId: string; createdAt: string; direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING'; environment: string; outboundDialHttpRequestDefinitionId: string; outboundDialType: 'NONE' | 'HTTP_REQUEST'; type: 'PHONE' | 'WEBSOCKET'; updatedAt: string; value: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }`\n\n  - `data: { id: string; agentId: string; createdAt: string; direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING'; environment: string; outboundDialHttpRequestDefinitionId: string; outboundDialType: 'NONE' | 'HTTP_REQUEST'; type: 'PHONE' | 'WEBSOCKET'; updatedAt: string; value: string; }[]`\n  - `pagination: { hasMore: boolean; nextCursor: string; total: number; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst agentEndpoints = await client.agentEndpoint.list();\n\nconsole.log(agentEndpoints);\n```",
  },
  {
    name: 'getById',
    endpoint: '/v1/agent/endpoint/{endpointId}',
    httpMethod: 'get',
    summary: 'Get agent endpoint by ID',
    description: 'Returns a specific agent endpoint by its ID.',
    stainlessPath: '(resource) agentEndpoint > (method) getById',
    qualified: 'client.agentEndpoint.getByID',
    params: ['endpointId: string;'],
    response:
      "{ data: { id: string; agentId: string; createdAt: string; direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING'; environment: string; outboundDialHttpRequestDefinitionId: string; outboundDialType: 'NONE' | 'HTTP_REQUEST'; type: 'PHONE' | 'WEBSOCKET'; updatedAt: string; value: string; }; }",
    markdown:
      "## getById\n\n`client.agentEndpoint.getByID(endpointId: string): { data: object; }`\n\n**get** `/v1/agent/endpoint/{endpointId}`\n\nReturns a specific agent endpoint by its ID.\n\n### Parameters\n\n- `endpointId: string`\n\n### Returns\n\n- `{ data: { id: string; agentId: string; createdAt: string; direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING'; environment: string; outboundDialHttpRequestDefinitionId: string; outboundDialType: 'NONE' | 'HTTP_REQUEST'; type: 'PHONE' | 'WEBSOCKET'; updatedAt: string; value: string; }; }`\n\n  - `data: { id: string; agentId: string; createdAt: string; direction: 'INCOMING' | 'OUTGOING' | 'INCOMING_AND_OUTGOING'; environment: string; outboundDialHttpRequestDefinitionId: string; outboundDialType: 'NONE' | 'HTTP_REQUEST'; type: 'PHONE' | 'WEBSOCKET'; updatedAt: string; value: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.agentEndpoint.getByID('endpointId');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/http-request-definition',
    httpMethod: 'post',
    summary: 'Create HTTP request definition',
    description:
      'Creates a new HTTP request definition. The signing secret is only returned in this response and cannot be retrieved later.',
    stainlessPath: '(resource) httpRequestDefinition > (method) create',
    qualified: 'client.httpRequestDefinition.create',
    params: [
      "scope: 'AGENT_OUTBOUND_DIAL';",
      'url: string;',
      'body?: string | object;',
      'description?: string;',
      'headers?: object;',
      "method?: 'POST' | 'PUT' | 'PATCH' | 'GET';",
    ],
    response:
      "{ data: { id: string; body: string; createdAt: string; description: string; headers: object; method: 'POST' | 'PUT' | 'PATCH' | 'GET'; parsedBody: object | string; scope: 'AGENT_OUTBOUND_DIAL'; signingSecret: string; updatedAt: string; url: string; }; }",
    markdown:
      "## create\n\n`client.httpRequestDefinition.create(scope: 'AGENT_OUTBOUND_DIAL', url: string, body?: string | object, description?: string, headers?: object, method?: 'POST' | 'PUT' | 'PATCH' | 'GET'): { data: object; }`\n\n**post** `/v1/http-request-definition`\n\nCreates a new HTTP request definition. The signing secret is only returned in this response and cannot be retrieved later.\n\n### Parameters\n\n- `scope: 'AGENT_OUTBOUND_DIAL'`\n  Scope: AGENT_OUTBOUND_DIAL\n\n- `url: string`\n  URL for the HTTP request\n\n- `body?: string | object`\n  Request body template. Accepts a JSON object or a string with placeholders like {{phoneNumberToDial}}. Objects are serialized to JSON for storage.\n\n- `description?: string`\n  Description of the HTTP request definition\n\n- `headers?: object`\n  Request headers as key-value pairs\n\n- `method?: 'POST' | 'PUT' | 'PATCH' | 'GET'`\n  HTTP method (default: POST)\n\n### Returns\n\n- `{ data: { id: string; body: string; createdAt: string; description: string; headers: object; method: 'POST' | 'PUT' | 'PATCH' | 'GET'; parsedBody: object | string; scope: 'AGENT_OUTBOUND_DIAL'; signingSecret: string; updatedAt: string; url: string; }; }`\n\n  - `data: { id: string; body: string; createdAt: string; description: string; headers: object; method: 'POST' | 'PUT' | 'PATCH' | 'GET'; parsedBody: object | string; scope: 'AGENT_OUTBOUND_DIAL'; signingSecret: string; updatedAt: string; url: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst httpRequestDefinition = await client.httpRequestDefinition.create({ scope: 'AGENT_OUTBOUND_DIAL', url: 'https://example.com' });\n\nconsole.log(httpRequestDefinition);\n```",
  },
  {
    name: 'update',
    endpoint: '/v1/http-request-definition/{definitionId}',
    httpMethod: 'put',
    summary: 'Update HTTP request definition',
    description: 'Updates an existing HTTP request definition.',
    stainlessPath: '(resource) httpRequestDefinition > (method) update',
    qualified: 'client.httpRequestDefinition.update',
    params: [
      'definitionId: string;',
      'body?: string | object;',
      'description?: string;',
      'headers?: object;',
      "method?: 'POST' | 'PUT' | 'PATCH' | 'GET';",
      'url?: string;',
    ],
    response:
      "{ data: { id: string; body: string; createdAt: string; description: string; headers: object; method: 'POST' | 'PUT' | 'PATCH' | 'GET'; parsedBody: object | string; scope: 'AGENT_OUTBOUND_DIAL'; updatedAt: string; url: string; }; }",
    markdown:
      "## update\n\n`client.httpRequestDefinition.update(definitionId: string, body?: string | object, description?: string, headers?: object, method?: 'POST' | 'PUT' | 'PATCH' | 'GET', url?: string): { data: object; }`\n\n**put** `/v1/http-request-definition/{definitionId}`\n\nUpdates an existing HTTP request definition.\n\n### Parameters\n\n- `definitionId: string`\n\n- `body?: string | object`\n  Request body template. Accepts a JSON object or a string with placeholders like {{phoneNumberToDial}}. Objects are serialized to JSON for storage.\n\n- `description?: string`\n  Description of the HTTP request definition\n\n- `headers?: object`\n  Request headers as key-value pairs\n\n- `method?: 'POST' | 'PUT' | 'PATCH' | 'GET'`\n  HTTP method: POST, PUT, PATCH, or GET\n\n- `url?: string`\n  URL for the HTTP request\n\n### Returns\n\n- `{ data: { id: string; body: string; createdAt: string; description: string; headers: object; method: 'POST' | 'PUT' | 'PATCH' | 'GET'; parsedBody: object | string; scope: 'AGENT_OUTBOUND_DIAL'; updatedAt: string; url: string; }; }`\n\n  - `data: { id: string; body: string; createdAt: string; description: string; headers: object; method: 'POST' | 'PUT' | 'PATCH' | 'GET'; parsedBody: object | string; scope: 'AGENT_OUTBOUND_DIAL'; updatedAt: string; url: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst httpRequestDefinition = await client.httpRequestDefinition.update('definitionId');\n\nconsole.log(httpRequestDefinition);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/http-request-definition',
    httpMethod: 'get',
    summary: 'List HTTP request definitions',
    description: 'Returns a paginated list of HTTP request definitions for the authenticated project.',
    stainlessPath: '(resource) httpRequestDefinition > (method) list',
    qualified: 'client.httpRequestDefinition.list',
    params: ['after?: string;', 'limit?: number;'],
    response:
      "{ data: { id: string; body: string; createdAt: string; description: string; headers: object; method: 'POST' | 'PUT' | 'PATCH' | 'GET'; parsedBody: object | string; scope: 'AGENT_OUTBOUND_DIAL'; updatedAt: string; url: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }",
    markdown:
      "## list\n\n`client.httpRequestDefinition.list(after?: string, limit?: number): { data: object[]; pagination: object; }`\n\n**get** `/v1/http-request-definition`\n\nReturns a paginated list of HTTP request definitions for the authenticated project.\n\n### Parameters\n\n- `after?: string`\n  Cursor for pagination - definition ID to start after\n\n- `limit?: number`\n  Maximum number of definitions to return (default: 20, max: 50)\n\n### Returns\n\n- `{ data: { id: string; body: string; createdAt: string; description: string; headers: object; method: 'POST' | 'PUT' | 'PATCH' | 'GET'; parsedBody: object | string; scope: 'AGENT_OUTBOUND_DIAL'; updatedAt: string; url: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }`\n\n  - `data: { id: string; body: string; createdAt: string; description: string; headers: object; method: 'POST' | 'PUT' | 'PATCH' | 'GET'; parsedBody: object | string; scope: 'AGENT_OUTBOUND_DIAL'; updatedAt: string; url: string; }[]`\n  - `pagination: { hasMore: boolean; nextCursor: string; total: number; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst httpRequestDefinitions = await client.httpRequestDefinition.list();\n\nconsole.log(httpRequestDefinitions);\n```",
  },
  {
    name: 'getById',
    endpoint: '/v1/http-request-definition/{definitionId}',
    httpMethod: 'get',
    summary: 'Get HTTP request definition by ID',
    description: 'Returns a specific HTTP request definition by its ID.',
    stainlessPath: '(resource) httpRequestDefinition > (method) getById',
    qualified: 'client.httpRequestDefinition.getByID',
    params: ['definitionId: string;'],
    response:
      "{ data: { id: string; body: string; createdAt: string; description: string; headers: object; method: 'POST' | 'PUT' | 'PATCH' | 'GET'; parsedBody: object | string; scope: 'AGENT_OUTBOUND_DIAL'; updatedAt: string; url: string; }; }",
    markdown:
      "## getById\n\n`client.httpRequestDefinition.getByID(definitionId: string): { data: object; }`\n\n**get** `/v1/http-request-definition/{definitionId}`\n\nReturns a specific HTTP request definition by its ID.\n\n### Parameters\n\n- `definitionId: string`\n\n### Returns\n\n- `{ data: { id: string; body: string; createdAt: string; description: string; headers: object; method: 'POST' | 'PUT' | 'PATCH' | 'GET'; parsedBody: object | string; scope: 'AGENT_OUTBOUND_DIAL'; updatedAt: string; url: string; }; }`\n\n  - `data: { id: string; body: string; createdAt: string; description: string; headers: object; method: 'POST' | 'PUT' | 'PATCH' | 'GET'; parsedBody: object | string; scope: 'AGENT_OUTBOUND_DIAL'; updatedAt: string; url: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.httpRequestDefinition.getByID('definitionId');\n\nconsole.log(response);\n```",
  },
  {
    name: 'create',
    endpoint: '/v1/webhook',
    httpMethod: 'post',
    summary: 'Create webhook',
    description:
      'Creates a new webhook with event subscriptions. The signing secret is only returned in this response.',
    stainlessPath: '(resource) webhook > (method) create',
    qualified: 'client.webhook.create',
    params: ['events: string[];', 'url: string;', 'description?: string;', 'headers?: object;'],
    response:
      '{ data: { id: string; createdAt: string; description: string; events: string[]; headers: object; signingSecret: string; updatedAt: string; url: string; }; }',
    markdown:
      "## create\n\n`client.webhook.create(events: string[], url: string, description?: string, headers?: object): { data: object; }`\n\n**post** `/v1/webhook`\n\nCreates a new webhook with event subscriptions. The signing secret is only returned in this response.\n\n### Parameters\n\n- `events: string[]`\n  Event types to subscribe to (at least one required)\n\n- `url: string`\n  Webhook URL\n\n- `description?: string`\n  Webhook description\n\n- `headers?: object`\n  Request headers (e.g. authorization tokens)\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; description: string; events: string[]; headers: object; signingSecret: string; updatedAt: string; url: string; }; }`\n\n  - `data: { id: string; createdAt: string; description: string; events: string[]; headers: object; signingSecret: string; updatedAt: string; url: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst webhook = await client.webhook.create({ events: ['CALL_ANALYSIS_COMPLETED'], url: 'https://example.com' });\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'list',
    endpoint: '/v1/webhook',
    httpMethod: 'get',
    summary: 'List webhooks',
    description: 'Returns a paginated list of webhooks with their event subscriptions.',
    stainlessPath: '(resource) webhook > (method) list',
    qualified: 'client.webhook.list',
    params: ['after?: string;', 'limit?: number;'],
    response:
      '{ data: { id: string; createdAt: string; description: string; events: string[]; headers: object; updatedAt: string; url: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }',
    markdown:
      "## list\n\n`client.webhook.list(after?: string, limit?: number): { data: object[]; pagination: object; }`\n\n**get** `/v1/webhook`\n\nReturns a paginated list of webhooks with their event subscriptions.\n\n### Parameters\n\n- `after?: string`\n  Cursor for pagination - webhook ID to start after\n\n- `limit?: number`\n  Maximum number of webhooks to return (default: 20, max: 50)\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; description: string; events: string[]; headers: object; updatedAt: string; url: string; }[]; pagination: { hasMore: boolean; nextCursor: string; total: number; }; }`\n\n  - `data: { id: string; createdAt: string; description: string; events: string[]; headers: object; updatedAt: string; url: string; }[]`\n  - `pagination: { hasMore: boolean; nextCursor: string; total: number; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst webhooks = await client.webhook.list();\n\nconsole.log(webhooks);\n```",
  },
  {
    name: 'delete',
    endpoint: '/v1/webhook/{webhookId}',
    httpMethod: 'delete',
    summary: 'Delete webhook',
    description: 'Deletes a webhook and all its event subscriptions.',
    stainlessPath: '(resource) webhook > (method) delete',
    qualified: 'client.webhook.delete',
    params: ['webhookId: string;'],
    response: '{ data: { success: boolean; }; }',
    markdown:
      "## delete\n\n`client.webhook.delete(webhookId: string): { data: object; }`\n\n**delete** `/v1/webhook/{webhookId}`\n\nDeletes a webhook and all its event subscriptions.\n\n### Parameters\n\n- `webhookId: string`\n\n### Returns\n\n- `{ data: { success: boolean; }; }`\n\n  - `data: { success: boolean; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst webhook = await client.webhook.delete('webhookId');\n\nconsole.log(webhook);\n```",
  },
  {
    name: 'getById',
    endpoint: '/v1/webhook/{webhookId}',
    httpMethod: 'get',
    summary: 'Get webhook by ID',
    description: 'Returns a specific webhook with its event subscriptions.',
    stainlessPath: '(resource) webhook > (method) getById',
    qualified: 'client.webhook.getByID',
    params: ['webhookId: string;'],
    response:
      '{ data: { id: string; createdAt: string; description: string; events: string[]; headers: object; updatedAt: string; url: string; }; }',
    markdown:
      "## getById\n\n`client.webhook.getByID(webhookId: string): { data: object; }`\n\n**get** `/v1/webhook/{webhookId}`\n\nReturns a specific webhook with its event subscriptions.\n\n### Parameters\n\n- `webhookId: string`\n\n### Returns\n\n- `{ data: { id: string; createdAt: string; description: string; events: string[]; headers: object; updatedAt: string; url: string; }; }`\n\n  - `data: { id: string; createdAt: string; description: string; events: string[]; headers: object; updatedAt: string; url: string; }`\n\n### Example\n\n```typescript\nimport Roark from '@roarkanalytics/sdk';\n\nconst client = new Roark();\n\nconst response = await client.webhook.getByID('webhookId');\n\nconsole.log(response);\n```",
  },
];

const EMBEDDED_READMES: { language: string; content: string }[] = [];

const INDEX_OPTIONS = {
  fields: [
    'name',
    'endpoint',
    'summary',
    'description',
    'qualified',
    'stainlessPath',
    'content',
    'sectionContext',
  ],
  storeFields: ['kind', '_original'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.1,
    boost: {
      name: 5,
      stainlessPath: 3,
      endpoint: 3,
      qualified: 3,
      summary: 2,
      content: 1,
      description: 1,
    } as Record<string, number>,
  },
};

/**
 * Self-contained local search engine backed by MiniSearch.
 * Method data is embedded at SDK build time; prose documents
 * can be loaded from an optional docs directory at runtime.
 */
export class LocalDocsSearch {
  private methodIndex: MiniSearch<MiniSearchDocument>;
  private proseIndex: MiniSearch<MiniSearchDocument>;

  private constructor() {
    this.methodIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
    this.proseIndex = new MiniSearch<MiniSearchDocument>(INDEX_OPTIONS);
  }

  static async create(opts?: { docsDir?: string }): Promise<LocalDocsSearch> {
    const instance = new LocalDocsSearch();
    instance.indexMethods(EMBEDDED_METHODS);
    for (const readme of EMBEDDED_READMES) {
      instance.indexProse(readme.content, `readme:${readme.language}`);
    }
    if (opts?.docsDir) {
      await instance.loadDocsDirectory(opts.docsDir);
    }
    return instance;
  }

  search(props: {
    query: string;
    language?: string;
    detail?: string;
    maxResults?: number;
    maxLength?: number;
  }): SearchResult {
    const { query, language = 'typescript', detail = 'default', maxResults = 5, maxLength = 100_000 } = props;

    const useMarkdown = detail === 'verbose' || detail === 'high';

    // Search both indices and merge results by score.
    // Filter prose hits so language-tagged content (READMEs and docs with
    // frontmatter) only matches the requested language.
    const methodHits = this.methodIndex
      .search(query)
      .map((hit) => ({ ...hit, _kind: 'http_method' as const }));
    const proseHits = this.proseIndex
      .search(query)
      .filter((hit) => {
        const source = ((hit as Record<string, unknown>)['_original'] as ProseChunk | undefined)?.source;
        if (!source) return true;
        // Check for language-tagged sources: "readme:<lang>" or "lang:<lang>:<filename>"
        let taggedLang: string | undefined;
        if (source.startsWith('readme:')) taggedLang = source.slice('readme:'.length);
        else if (source.startsWith('lang:')) taggedLang = source.split(':')[1];
        if (!taggedLang) return true;
        return taggedLang === language || (language === 'javascript' && taggedLang === 'typescript');
      })
      .map((hit) => ({ ...hit, _kind: 'prose' as const }));
    const merged = [...methodHits, ...proseHits].sort((a, b) => b.score - a.score);
    const top = merged.slice(0, maxResults);

    const fullResults: (string | Record<string, unknown>)[] = [];

    for (const hit of top) {
      const original = (hit as Record<string, unknown>)['_original'];
      if (hit._kind === 'http_method') {
        const m = original as MethodEntry;
        if (useMarkdown && m.markdown) {
          fullResults.push(m.markdown);
        } else {
          // Use per-language data when available, falling back to the
          // top-level fields (which are TypeScript-specific in the
          // legacy codepath).
          const langData = m.perLanguage?.[language];
          fullResults.push({
            method: langData?.method ?? m.qualified,
            summary: m.summary,
            description: m.description,
            endpoint: `${m.httpMethod.toUpperCase()} ${m.endpoint}`,
            ...(langData?.example ? { example: langData.example } : {}),
            ...(m.params ? { params: m.params } : {}),
            ...(m.response ? { response: m.response } : {}),
          });
        }
      } else {
        const c = original as ProseChunk;
        fullResults.push({
          content: c.content,
          ...(c.source ? { source: c.source } : {}),
        });
      }
    }

    let totalLength = 0;
    const results: (string | Record<string, unknown>)[] = [];
    for (const result of fullResults) {
      const len = typeof result === 'string' ? result.length : JSON.stringify(result).length;
      totalLength += len;
      if (totalLength > maxLength) break;
      results.push(result);
    }

    if (results.length < fullResults.length) {
      results.unshift(`Truncated; showing ${results.length} of ${fullResults.length} results.`);
    }

    return { results };
  }

  private indexMethods(methods: MethodEntry[]): void {
    const docs: MiniSearchDocument[] = methods.map((m, i) => ({
      id: `method-${i}`,
      kind: 'http_method' as const,
      name: m.name,
      endpoint: m.endpoint,
      summary: m.summary,
      description: m.description,
      qualified: m.qualified,
      stainlessPath: m.stainlessPath,
      _original: m as unknown as Record<string, unknown>,
    }));
    if (docs.length > 0) {
      this.methodIndex.addAll(docs);
    }
  }

  private async loadDocsDirectory(docsDir: string): Promise<void> {
    let entries;
    try {
      entries = await fs.readdir(docsDir, { withFileTypes: true });
    } catch (err) {
      getLogger().warn({ err, docsDir }, 'Could not read docs directory');
      return;
    }

    const files = entries
      .filter((e) => e.isFile())
      .filter((e) => e.name.endsWith('.md') || e.name.endsWith('.markdown') || e.name.endsWith('.json'));

    for (const file of files) {
      try {
        const filePath = path.join(docsDir, file.name);
        const content = await fs.readFile(filePath, 'utf-8');

        if (file.name.endsWith('.json')) {
          const texts = extractTexts(JSON.parse(content));
          if (texts.length > 0) {
            this.indexProse(texts.join('\n\n'), file.name);
          }
        } else {
          // Parse optional YAML frontmatter for language tagging.
          // Files with a "language" field in frontmatter will only
          // surface in searches for that language.
          //
          // Example:
          //   ---
          //   language: python
          //   ---
          //   # Error handling in Python
          //   ...
          const frontmatter = parseFrontmatter(content);
          const source = frontmatter.language ? `lang:${frontmatter.language}:${file.name}` : file.name;
          this.indexProse(content, source);
        }
      } catch (err) {
        getLogger().warn({ err, file: file.name }, 'Failed to index docs file');
      }
    }
  }

  private indexProse(markdown: string, source: string): void {
    const chunks = chunkMarkdown(markdown);
    const baseId = this.proseIndex.documentCount;

    const docs: MiniSearchDocument[] = chunks.map((chunk, i) => ({
      id: `prose-${baseId + i}`,
      kind: 'prose' as const,
      content: chunk.content,
      ...(chunk.sectionContext != null ? { sectionContext: chunk.sectionContext } : {}),
      _original: { ...chunk, source } as unknown as Record<string, unknown>,
    }));

    if (docs.length > 0) {
      this.proseIndex.addAll(docs);
    }
  }
}

/** Lightweight markdown chunker — splits on headers, chunks by word count. */
function chunkMarkdown(markdown: string): { content: string; tag: string; sectionContext?: string }[] {
  // Strip YAML frontmatter
  const stripped = markdown.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const lines = stripped.split('\n');

  const chunks: { content: string; tag: string; sectionContext?: string }[] = [];
  const headers: string[] = [];
  let current: string[] = [];

  const flush = () => {
    const text = current.join('\n').trim();
    if (!text) return;
    const sectionContext = headers.length > 0 ? headers.join(' > ') : undefined;
    // Split into ~200-word chunks
    const words = text.split(/\s+/);
    for (let i = 0; i < words.length; i += 200) {
      const slice = words.slice(i, i + 200).join(' ');
      if (slice) {
        chunks.push({ content: slice, tag: 'p', ...(sectionContext != null ? { sectionContext } : {}) });
      }
    }
    current = [];
  };

  for (const line of lines) {
    const headerMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headerMatch) {
      flush();
      const level = headerMatch[1]!.length;
      const text = headerMatch[2]!.trim();
      while (headers.length >= level) headers.pop();
      headers.push(text);
    } else {
      current.push(line);
    }
  }
  flush();

  return chunks;
}

/** Recursively extracts string values from a JSON structure. */
function extractTexts(data: unknown, depth = 0): string[] {
  if (depth > 10) return [];
  if (typeof data === 'string') return data.trim() ? [data] : [];
  if (Array.isArray(data)) return data.flatMap((item) => extractTexts(item, depth + 1));
  if (typeof data === 'object' && data !== null) {
    return Object.values(data).flatMap((v) => extractTexts(v, depth + 1));
  }
  return [];
}

/** Parses YAML frontmatter from a markdown string, extracting the language field if present. */
function parseFrontmatter(markdown: string): { language?: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const body = match[1] ?? '';
  const langMatch = body.match(/^language:\s*(.+)$/m);
  return langMatch ? { language: langMatch[1]!.trim() } : {};
}
