# Health

Types:

- <code><a href="./src/resources/health.ts">HealthGetResponse</a></code>

Methods:

- <code title="get /health">client.health.<a href="./src/resources/health.ts">get</a>() -> HealthGetResponse</code>

# Evaluation

Types:

- <code><a href="./src/resources/evaluation.ts">EvaluationCreateResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationRetrieveResponse</a></code>
- <code><a href="./src/resources/evaluation.ts">EvaluationGetRunsResponse</a></code>

Methods:

- <code title="post /v1/evaluation">client.evaluation.<a href="./src/resources/evaluation.ts">create</a>({ ...params }) -> EvaluationCreateResponse</code>
- <code title="get /v1/evaluation/{jobId}">client.evaluation.<a href="./src/resources/evaluation.ts">retrieve</a>(jobId) -> unknown</code>
- <code title="get /v1/evaluation/{jobId}/runs">client.evaluation.<a href="./src/resources/evaluation.ts">getRuns</a>(jobId, { ...params }) -> unknown</code>
