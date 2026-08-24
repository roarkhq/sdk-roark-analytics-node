/**
 * The contract between the generated command table and this runtime.
 *
 * `src/commands.ts` is generated from the OpenAPI spec by app-agent-codegen and
 * contains nothing but data in these shapes. Everything in `src/runtime/` is
 * hand-maintained and holds no per-endpoint knowledge, so adding an endpoint is
 * a data change and never a code change.
 */

export type CliValueKind = 'string' | 'number' | 'integer' | 'boolean' | 'object' | 'array';

export interface CliPositional {
  /** As shown in usage, e.g. `call-id`. */
  name: string;
  /** Wire name of the path parameter, e.g. `callId`. */
  paramKey: string;
  description?: string;
}

export interface CliFlag {
  /** As typed, without the leading dashes. Dotted for a nested leaf. */
  name: string;
  /** Where the value lands in the params object, e.g. `['metadata', 'source']`. */
  path: string[];
  location: 'query' | 'body' | 'path';
  required: boolean;
  description?: string;
  valueKind: CliValueKind;
  enumValues?: string[];
  /** `--tag a --tag b` accumulates into an array. */
  repeatable?: boolean;
}

export interface CliBodyVariant {
  name: string;
  required: string[];
}

export interface CliCommand {
  commandPath: string[];
  clientProperty: string;
  methodName: string;
  httpMethod: string;
  httpPath: string;
  summary?: string;
  description?: string;
  /** All path params in path order. The last is the SDK's positional argument. */
  positionals: CliPositional[];
  flags: CliFlag[];
  hasParams: boolean;
  paramsAllOptional: boolean;
  /** The body is a union: reachable only through `--data` or stdin. */
  bodyOpaque: boolean;
  bodyVariants: CliBodyVariant[];
  acceptsBody: boolean;
  /** False where the operation declares `security: []`, e.g. the health check. */
  requiresAuth: boolean;
}
