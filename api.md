# Health

Types:

- <code><a href="./src/resources/health.ts">HealthGetResponse</a></code>

Methods:

- <code title="get /health">client.health.<a href="./src/resources/health.ts">get</a>() -> HealthGetResponse</code>

# Evaluation

Types:

- <code><a href="./src/resources/evaluation.ts">EvaluationCreateJobResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationGetEvaluatorByIDResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationGetEvaluatorsResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationGetJobResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationGetJobRunsResponse</a></code>

Methods:

- <code title="post /v1/evaluation/job">client.evaluation.<a href="./src/resources/evaluation.ts">createJob</a>({ ...params }) -> EvaluationCreateJobResponse</code>
- <code title="get /v1/evaluation/evaluators/{evaluatorId}">client.evaluation.<a href="./src/resources/evaluation.ts">getEvaluatorById</a>(evaluatorId) -> EvaluationGetEvaluatorByIDResponse</code>
- <code title="get /v1/evaluation/evaluators">client.evaluation.<a href="./src/resources/evaluation.ts">getEvaluators</a>({ ...params }) -> EvaluationGetEvaluatorsResponse</code>
- <code title="get /v1/evaluation/job/{jobId}">client.evaluation.<a href="./src/resources/evaluation.ts">getJob</a>(jobId) -> EvaluationGetJobResponse</code>
- <code title="get /v1/evaluation/job/{jobId}/runs">client.evaluation.<a href="./src/resources/evaluation.ts">getJobRuns</a>(jobId, { ...params }) -> EvaluationGetJobRunsResponse</code>

# Call

Types:

- <code><a href="./src/resources/call.ts">CallGetEvaluationRunsResponse</a></code>
- <code><a href="./src/resources/call.ts">CallGetMetricsResponse</a></code>
- <code><a href="./src/resources/call.ts">CallGetSentimentRunsResponse</a></code>

Methods:

- <code title="get /v1/call/{callId}/evaluation-run">client.call.<a href="./src/resources/call.ts">getEvaluationRuns</a>(callId) -> CallGetEvaluationRunsResponse</code>
- <code title="get /v1/call/{callId}/metrics">client.call.<a href="./src/resources/call.ts">getMetrics</a>(callId, { ...params }) -> CallGetMetricsResponse</code>
- <code title="get /v1/call/{callId}/sentiment-run">client.call.<a href="./src/resources/call.ts">getSentimentRuns</a>(callId) -> CallGetSentimentRunsResponse</code>

# Metric

Types:

- <code><a href="./src/resources/metric.ts">MetricGetDefinitionsResponse</a></code>

Methods:

- <code title="get /v1/metric/definitions">client.metric.<a href="./src/resources/metric.ts">getDefinitions</a>() -> MetricGetDefinitionsResponse</code>

# Integrations

Types:

- <code><a href="./src/resources/integrations.ts">IntegrationCreateRetellCallResponse</a></code>
- <code><a href="./src/resources/integrations.ts">IntegrationCreateVapiCallResponse</a></code>

Methods:

- <code title="post /v1/retell/call">client.integrations.<a href="./src/resources/integrations.ts">createRetellCall</a>({ ...params }) -> IntegrationCreateRetellCallResponse</code>
- <code title="post /v1/vapi/call">client.integrations.<a href="./src/resources/integrations.ts">createVapiCall</a>({ ...params }) -> IntegrationCreateVapiCallResponse</code>

# Simulation

Types:

- <code><a href="./src/resources/simulation.ts">SimulationGetJobByIDResponse</a></code>
- <code><a href="./src/resources/simulation.ts">SimulationLookupJobResponse</a></code>

Methods:

- <code title="get /v1/simulation/job/{jobId}">client.simulation.<a href="./src/resources/simulation.ts">getJobById</a>(jobId) -> SimulationGetJobByIDResponse</code>
- <code title="get /v1/simulation/job/lookup">client.simulation.<a href="./src/resources/simulation.ts">lookupJob</a>({ ...params }) -> SimulationLookupJobResponse</code>

# Persona

Types:

- <code><a href="./src/resources/persona.ts">PersonaCreateResponse</a></code>
- <code><a href="./src/resources/persona.ts">PersonaUpdateResponse</a></code>
- <code><a href="./src/resources/persona.ts">PersonaFindAllResponse</a></code>
- <code><a href="./src/resources/persona.ts">PersonaGetByIDResponse</a></code>

Methods:

- <code title="post /v1/persona">client.persona.<a href="./src/resources/persona.ts">create</a>({ ...params }) -> PersonaCreateResponse</code>
- <code title="put /v1/persona/{personaId}">client.persona.<a href="./src/resources/persona.ts">update</a>(personaId, { ...params }) -> PersonaUpdateResponse</code>
- <code title="get /v1/persona">client.persona.<a href="./src/resources/persona.ts">findAll</a>({ ...params }) -> PersonaFindAllResponse</code>
- <code title="get /v1/persona/{personaId}">client.persona.<a href="./src/resources/persona.ts">getById</a>(personaId) -> PersonaGetByIDResponse</code>
