# AGENTS.md

Guidance for AI coding agents (Claude Code, Codex, Cursor, etc.) working in this repository.

## Generated code and hand-written code

Most of this SDK is generated from the Roark API's OpenAPI spec by
[`app-agent-codegen`](https://github.com/roarkhq/app-agent-codegen), which opens a PR here when the API
changes. Don't hand-edit generated files: the next generation overwrites them. Only `src/lib/` and
`examples/` are hand-written and never touched by codegen (see `CONTRIBUTING.md`).

## Config-as-code helpers (`src/lib/config.ts`)

The `define*` helpers (`defineAgent`, `defineMetric`, `defineScriptedFlow`, ...) are hand-written. Their
input types are derived from the generated `ConfigApplyParams`, so:

- **A new field on an existing resource type** reaches TypeScript on the next codegen with no change here.
- **A new resource type does not.** A new `kind`, or a new variant of an existing kind (a second
  `kind: metric` shape such as an API check with `calculationType: HTTP_REQUEST`, a second flow `type`),
  arrives in `ConfigApplyParams` as a new type that no helper accepts. YAML supports it, and `define*`
  doesn't type-check.

When a codegen PR adds a resource type to `ConfigApplyParams['resources']`, add in the same PR:

1. A friendly alias next to the others (`export type XConfig = ConfigApplyParams.XConfig;`).
2. A `define*` helper that fills in `kind` and every fixed discriminator (`type`, `template`,
   `calculationType`), following `defineScriptedFlow` and `defineQaSimulationPlan`.
3. The helper's return type in `DefinedResource` in `tests/lib/config.test.ts`, plus a test that it fills
   in its discriminators.

`tests/lib/config.test.ts` enforces this at type-check time: a resource type without a helper fails `tsc`
with an error naming the type, which turns the codegen PR red until the helper exists.

## Code structure (`src/lib/`)

`src/lib/` is published as `@roarkanalytics/sdk/lib/*`, so a file's path there is its public import path.
Hand-written files there follow these rules.

- **Arrow functions only**: `const foo = () => {}`, never `function foo() {}`. No classes; group related
  functions in a module.
- **kebab-case** file and folder names.
- **Types**: derive from the generated types (`ConfigApplyParams` and friends) with `Pick`, `Omit`,
  `Extract` or indexed access; never retype a generated shape or its string literals. Types that are not
  aliases of generated ones go in a `types.ts` beside the module and are re-exported from the module
  whose subpath users import (for example `lib/config`), so the public path does not change. Do not
  declare named input or return shapes inline in implementation files.
- **Pure helpers** (such as `refName`) that more than one module needs go in a `helpers.ts`; do not copy
  them between files.
- **No duplication.** Before adding a helper or type, search `src/lib/` and the generated `src/resources/`
  for an existing one and reuse it.
- **Imports**: relative paths to the generated code (`'../resources/config'`), as eslint requires inside
  this package. Static imports only; no `await import(...)`. No `any`; use `unknown` and narrow.
- **Tests** go in `tests/lib/<file>.test.ts` (this repository keeps tests out of `src/`, which is
  compiled into the published package). A test for a fix must fail when the fix is reverted.
- **Copy**: no em dashes in user-facing text you write in `src/lib/` and `examples/` (error messages,
  JSDoc shown in editors). Use a colon, a comma or a new sentence.

## Commands

- `pnpm install`, then `pnpm lint` (prettier check, eslint, build, `tsc`, attw, publint) and `pnpm test`
  (jest, against a local mock server). `pnpm fix` applies eslint and prettier fixes.
- Formatting is enforced by `.prettierrc.json`: single quotes, `printWidth` 110, trailing commas,
  `experimentalTernaries`. It does not set `semi: false`, so prettier keeps **semicolons** here; follow the
  config, not the house no-semicolon default.
