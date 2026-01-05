# Health

Types:

- <code><a href="./src/resources/health.ts">HealthGetResponse</a></code>

Methods:

- <code title="get /health">client.health.<a href="./src/resources/health.ts">get</a>() -> HealthGetResponse</code>

# Evaluation

Types:

- <code><a href="./src/resources/evaluation.ts">EvaluationCreateJobResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationGetEvaluatorByIDResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationGetJobResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationListEvaluatorsResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationListJobRunsResponse</a></code>

Methods:

- <code title="post /v1/evaluation/job">client.evaluation.<a href="./src/resources/evaluation.ts">createJob</a>({ ...params }) -> EvaluationCreateJobResponse</code>
- <code title="get /v1/evaluation/evaluators/{evaluatorId}">client.evaluation.<a href="./src/resources/evaluation.ts">getEvaluatorById</a>(evaluatorId) -> EvaluationGetEvaluatorByIDResponse</code>
- <code title="get /v1/evaluation/job/{jobId}">client.evaluation.<a href="./src/resources/evaluation.ts">getJob</a>(jobId) -> EvaluationGetJobResponse</code>
- <code title="get /v1/evaluation/evaluators">client.evaluation.<a href="./src/resources/evaluation.ts">listEvaluators</a>({ ...params }) -> EvaluationListEvaluatorsResponse</code>
- <code title="get /v1/evaluation/job/{jobId}/runs">client.evaluation.<a href="./src/resources/evaluation.ts">listJobRuns</a>(jobId, { ...params }) -> EvaluationListJobRunsResponse</code>

# Call

Types:

- <code><a href="./src/resources/call.ts">CallCreateResponse</a></code>
- <code><a href="./src/resources/call.ts">CallListResponse</a></code>
- <code><a href="./src/resources/call.ts">CallGetByIDResponse</a></code>
- <code><a href="./src/resources/call.ts">CallListEvaluationRunsResponse</a></code>
- <code><a href="./src/resources/call.ts">CallListMetricsResponse</a></code>
- <code><a href="./src/resources/call.ts">CallListSentimentRunsResponse</a></code>

Methods:

- <code title="post /v1/call">client.call.<a href="./src/resources/call.ts">create</a>({ ...params }) -> CallCreateResponse</code>
- <code title="get /v1/call">client.call.<a href="./src/resources/call.ts">list</a>({ ...params }) -> CallListResponse</code>
- <code title="get /v1/call/{callId}">client.call.<a href="./src/resources/call.ts">getById</a>(callId) -> CallGetByIDResponse</code>
- <code title="get /v1/call/{callId}/evaluation-run">client.call.<a href="./src/resources/call.ts">listEvaluationRuns</a>(callId) -> CallListEvaluationRunsResponse</code>
- <code title="get /v1/call/{callId}/metrics">client.call.<a href="./src/resources/call.ts">listMetrics</a>(callId, { ...params }) -> CallListMetricsResponse</code>
- <code title="get /v1/call/{callId}/sentiment-run">client.call.<a href="./src/resources/call.ts">listSentimentRuns</a>(callId) -> CallListSentimentRunsResponse</code>

# Metric

Types:

- <code><a href="./src/resources/metric.ts">MetricListDefinitionsResponse</a></code>

Methods:

- <code title="get /v1/metric/definitions">client.metric.<a href="./src/resources/metric.ts">listDefinitions</a>() -> MetricListDefinitionsResponse</code>

# Integrations

Types:

- <code><a href="./src/resources/integrations.ts">IntegrationCreateRetellCallResponse</a></code>
- <code><a href="./src/resources/integrations.ts">IntegrationCreateVapiCallResponse</a></code>

Methods:

- <code title="post /v1/retell/call">client.integrations.<a href="./src/resources/integrations.ts">createRetellCall</a>({ ...params }) -> IntegrationCreateRetellCallResponse</code>
- <code title="post /v1/vapi/call">client.integrations.<a href="./src/resources/integrations.ts">createVapiCall</a>({ ...params }) -> IntegrationCreateVapiCallResponse</code>

# Simulation

Types:

- <code><a href="./src/resources/simulation.ts">SimulationGetRunPlanJobResponse</a></code>
- <code><a href="./src/resources/simulation.ts">SimulationGetSimulationJobByIDResponse</a></code>
- <code><a href="./src/resources/simulation.ts">SimulationLookupSimulationJobResponse</a></code>
- <code><a href="./src/resources/simulation.ts">SimulationStartRunPlanJobResponse</a></code>

Methods:

- <code title="get /v1/simulation/plan/job/{jobId}">client.simulation.<a href="./src/resources/simulation.ts">getRunPlanJob</a>(jobId) -> SimulationGetRunPlanJobResponse</code>
- <code title="get /v1/simulation/job/{jobId}">client.simulation.<a href="./src/resources/simulation.ts">getSimulationJobById</a>(jobId) -> SimulationGetSimulationJobByIDResponse</code>
- <code title="get /v1/simulation/job/lookup">client.simulation.<a href="./src/resources/simulation.ts">lookupSimulationJob</a>({ ...params }) -> SimulationLookupSimulationJobResponse</code>
- <code title="post /v1/simulation/plan/{planId}/job">client.simulation.<a href="./src/resources/simulation.ts">startRunPlanJob</a>(planId) -> SimulationStartRunPlanJobResponse</code>

# Persona

Types:

- <code><a href="./src/resources/persona.ts">PersonaCreateResponse</a></code>
- <code><a href="./src/resources/persona.ts">PersonaUpdateResponse</a></code>
- <code><a href="./src/resources/persona.ts">PersonaListResponse</a></code>
- <code><a href="./src/resources/persona.ts">PersonaGetByIDResponse</a></code>

Methods:

- <code title="post /v1/persona">client.persona.<a href="./src/resources/persona.ts">create</a>({ ...params }) -> PersonaCreateResponse</code>
- <code title="put /v1/persona/{personaId}">client.persona.<a href="./src/resources/persona.ts">update</a>(personaId, { ...params }) -> PersonaUpdateResponse</code>
- <code title="get /v1/persona">client.persona.<a href="./src/resources/persona.ts">list</a>({ ...params }) -> PersonaListResponse</code>
- <code title="get /v1/persona/{personaId}">client.persona.<a href="./src/resources/persona.ts">getById</a>(personaId) -> PersonaGetByIDResponse</code>
