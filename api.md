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
- <code title="get /v1/evaluation/evaluators/{evaluatorId}">client.evaluation.<a href="./src/resources/evaluation.ts">getEvaluatorById</a>(evaluatorId) -> unknown</code>
- <code title="get /v1/evaluation/evaluators">client.evaluation.<a href="./src/resources/evaluation.ts">getEvaluators</a>({ ...params }) -> unknown</code>
- <code title="get /v1/evaluation/job/{jobId}">client.evaluation.<a href="./src/resources/evaluation.ts">getJob</a>(jobId) -> EvaluationGetJobResponse</code>
- <code title="get /v1/evaluation/job/{jobId}/runs">client.evaluation.<a href="./src/resources/evaluation.ts">getJobRuns</a>(jobId, { ...params }) -> EvaluationGetJobRunsResponse</code>

# Call

# Integrations

Types:

- <code><a href="./src/resources/integrations.ts">IntegrationCreateRetellCallResponse</a></code>
- <code><a href="./src/resources/integrations.ts">IntegrationCreateVapiCallResponse</a></code>

Methods:

- <code title="post /v1/retell/call">client.integrations.<a href="./src/resources/integrations.ts">createRetellCall</a>({ ...params }) -> IntegrationCreateRetellCallResponse</code>
- <code title="post /v1/vapi/call">client.integrations.<a href="./src/resources/integrations.ts">createVapiCall</a>({ ...params }) -> IntegrationCreateVapiCallResponse</code>
