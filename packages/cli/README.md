# @roarkanalytics/cli

The official command line interface for the Roark Analytics API.

This package is generated from the same OpenAPI spec as
[`@roarkanalytics/sdk`](https://www.npmjs.com/package/@roarkanalytics/sdk), which it wraps.

## Install

```sh
npm install -g @roarkanalytics/cli
```

Or run it without installing:

```sh
npx @roarkanalytics/cli --help
```

## Authenticate

```sh
roark auth login          # prompts, and stores the token with mode 0600
roark auth status         # shows which credential is in effect
```

Or set the environment variable the SDK already reads:

```sh
export ROARK_API_BEARER_TOKEN="..."
```

Settings resolve highest precedence first: flag, environment variable, project
`.roark.json` found by walking up from the working directory, then the user config
file (`roark config path` prints where that is).

One exception, because a `.roark.json` arrives with a clone rather than being
something you wrote: if a project file sets `baseURL`, `roark` refuses to send
a stored or environment credential to it. Pass `--allow-project-base-url` (or set
`ROARK_ALLOW_PROJECT_BASE_URL`) once you have read the file, or `--token` to send a
different credential.

## Usage

Commands read noun before verb, and the verb is one of `list`, `get`, `create`,
`update` or `delete` unless the operation is genuinely something else:

```sh
roark call list --limit 5
roark call get <call-id>
roark simulation plan job start <plan-id>
```

### Output

JSON on stdout, indented and coloured for a terminal and compact when piped, so the
same command works in both places:

```sh
roark call list --limit 5 | jq '.data[].id'
roark call get <call-id> --format plain
```

Errors go to stderr, so `> out.json` captures only real output.

### Request bodies

Flags cover the common case; nested objects go one level deep with dots. A whole
payload can be supplied as JSON, and flags then override what it contains:

```sh
roark webhook create --url https://example.com/hook
roark customer-flow create --data @flow.json
cat flow.json | roark customer-flow create
```

### Any endpoint

Endpoints without a generated command are still reachable:

```sh
roark api get /v1/call --query limit=5
roark api post /v1/webhook --data '{"url":"https://example.com"}'
```

### Shell completion

```sh
eval "$(roark completion bash)"
eval "$(roark completion zsh)"
roark completion fish | source
```

## Exit codes

| Code | Meaning                                                    |
| ---- | ---------------------------------------------------------- |
| 0    | Success                                                    |
| 1    | The API rejected the request                               |
| 2    | The command line was wrong                                 |
| 3    | No credential, or the credential was refused               |
| 4    | The addressed resource does not exist                      |
| 5    | The request never completed: connection, timeout, or abort |

## Commands

`roark <command> --help` prints the flags for any one of these.

### agent

| Command                                                                              | Description                 |
| ------------------------------------------------------------------------------------ | --------------------------- |
| `roark agent create --name <value>`                                                  | Create a new agent          |
| `roark agent endpoint create --agent-id <value> --value <value> --direction <value>` | Create a new agent endpoint |
| `roark agent endpoint get <endpoint-id>`                                             | Get agent endpoint by ID    |
| `roark agent endpoint list`                                                          | List agent endpoints        |
| `roark agent endpoint update <endpoint-id>`                                          | Update an agent endpoint    |
| `roark agent get <agent-id>`                                                         | Get agent by ID             |
| `roark agent list`                                                                   | List agents                 |
| `roark agent update <agent-id>`                                                      | Update an agent             |

### call

| Command                                                                                                                                                 | Description              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `roark call create --recording-url <value> --started-at <value> --interface-type <value> --call-direction <value> --customer.phone-number-e164 <value>` | Create a call            |
| `roark call get <call-id>`                                                                                                                              | Get a call by ID         |
| `roark call list`                                                                                                                                       | List calls               |
| `roark call metric list <call-id>`                                                                                                                      | List call metrics        |
| `roark call sentiment-run list <call-id>`                                                                                                               | List call sentiment runs |
| `roark call transcript get <call-id>`                                                                                                                   | Get call transcript      |

### config

| Command                                  | Description           |
| ---------------------------------------- | --------------------- |
| `roark config apply --resources <value>` | Apply a config bundle |
| `roark config diff --resources <value>`  | Diff a config bundle  |

### customer-flow

| Command                                                          | Description                            |
| ---------------------------------------------------------------- | -------------------------------------- |
| `roark customer-flow create --data '{ ... }'`                    | Create a customer flow                 |
| `roark customer-flow delete <flow-id>`                           | Delete a customer flow                 |
| `roark customer-flow edge-case create <flow-id> --title <value>` | Add an edge case                       |
| `roark customer-flow edge-case delete <flow-id> <edge-case-id>`  | Remove an edge case                    |
| `roark customer-flow edge-case promote <flow-id> <edge-case-id>` | Promote an edge case to the happy path |
| `roark customer-flow edge-case update <flow-id> <edge-case-id>`  | Update an edge case                    |
| `roark customer-flow get <flow-id>`                              | Get customer flow by ID                |
| `roark customer-flow graph replace <flow-id> --graph <value>`    | Replace a scripted flow's steps        |
| `roark customer-flow happy-path update <flow-id>`                | Update a flow's happy path             |
| `roark customer-flow list`                                       | List customer flows                    |
| `roark customer-flow update <flow-id>`                           | Update a customer flow                 |

### health

| Command        | Description           |
| -------------- | --------------------- |
| `roark health` | Get API health status |

### http-request-definition

| Command                                                              | Description                       |
| -------------------------------------------------------------------- | --------------------------------- |
| `roark http-request-definition create --scope <value> --url <value>` | Create HTTP request definition    |
| `roark http-request-definition get <definition-id>`                  | Get HTTP request definition by ID |
| `roark http-request-definition list`                                 | List HTTP request definitions     |
| `roark http-request-definition update <definition-id>`               | Update HTTP request definition    |

### metric

| Command                                                                          | Description                            |
| -------------------------------------------------------------------------------- | -------------------------------------- |
| `roark metric collection-job create --metrics <value>`                           | Create and run a metric collection job |
| `roark metric collection-job get <job-id>`                                       | Get metric collection job by ID        |
| `roark metric collection-job list`                                               | List metric collection jobs            |
| `roark metric definition create --data '{ ... }'`                                | Create custom metric definition        |
| `roark metric definition list`                                                   | List metric definitions                |
| `roark metric policy create --name <value> --modality <value> --metrics <value>` | Create a metric policy                 |
| `roark metric policy delete <policy-id>`                                         | Delete a metric policy                 |
| `roark metric policy get <policy-id>`                                            | Get metric policy by ID                |
| `roark metric policy list`                                                       | List metric policies                   |
| `roark metric policy update <policy-id>`                                         | Update a metric policy                 |

### simulation

| Command                                                                                                                                                 | Description               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `roark simulation environment get <environment-id>`                                                                                                     | Get environment by ID     |
| `roark simulation environment list`                                                                                                                     | List environments         |
| `roark simulation job get <job-id>`                                                                                                                     | Get simulation by ID      |
| `roark simulation job lookup --roark-phone-number <value>`                                                                                              | Lookup by phone number    |
| `roark simulation persona create --name <value> --language <value> --accent <value> --gender <value>`                                                   | Create a new persona      |
| `roark simulation persona get <persona-id>`                                                                                                             | Get persona by ID         |
| `roark simulation persona list`                                                                                                                         | List personas             |
| `roark simulation persona update <persona-id>`                                                                                                          | Update a persona          |
| `roark simulation plan create --name <value> --direction <value> --max-simulation-duration-seconds <value> --agent-endpoints <value> --metrics <value>` | Create a run plan         |
| `roark simulation plan delete <plan-id>`                                                                                                                | Delete a run plan         |
| `roark simulation plan get <plan-id>`                                                                                                                   | Get run plan by ID        |
| `roark simulation plan job get <job-id>`                                                                                                                | Get simulation plan job   |
| `roark simulation plan job list`                                                                                                                        | List simulation plan jobs |
| `roark simulation plan job start <plan-id>`                                                                                                             | Run a simulation plan     |
| `roark simulation plan list`                                                                                                                            | List run plans            |
| `roark simulation plan update <plan-id>`                                                                                                                | Update a run plan         |
| `roark simulation run --data '{ ... }'`                                                                                                                 | Run a simulation          |

### webhook

| Command                                               | Description       |
| ----------------------------------------------------- | ----------------- |
| `roark webhook create --url <value> --events <value>` | Create webhook    |
| `roark webhook delete <webhook-id>`                   | Delete webhook    |
| `roark webhook get <webhook-id>`                      | Get webhook by ID |
| `roark webhook list`                                  | List webhooks     |

## Requirements

Node.js 20 or newer.

## Contributing

`src/commands.ts`, `src/completions.ts`, `man/` and this file are generated from
the OpenAPI spec; edits to them will be overwritten. `src/runtime/` is
hand-maintained and is never generated.
