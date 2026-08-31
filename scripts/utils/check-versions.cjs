#!/usr/bin/env node
// Every version string in this repository agrees with the release manifest.
//
// The version lives in six places and release-please only bumps the ones named
// in `release-please-config.json`'s `extra-files`. That list is maintained by
// hand, so a new hardcoded version is one edit away from being missed - which is
// exactly what happened to `packages/mcp-server/src/server.ts`: the vendor bumped
// it in the same commit as every other version file for eight consecutive
// releases, and the first release-please-authored PR left it behind, because
// nothing but a careful reading of a JSON array would have said otherwise. A
// 3.0.0 MCP server that introduces itself to clients as 2.34.0 is a real,
// user-visible lie, and no test would have failed.
//
// So this checks both halves:
//
//   1. The places that must carry the version DO carry the manifest's.
//   2. No source file carries a version string that nothing is tracking - the
//      half that finds the next `server.ts` before a release does.
//
// Everything under `src` and `packages` is in scope. `packages/cli` used to be
// exempt - its versions were its own and asserting they matched this manifest
// would have asserted something we did not want to be true - and that exemption
// left with the package.

const { readFileSync, readdirSync, statSync } = require('node:fs');
const { join, relative } = require('node:path');

const root = join(__dirname, '..', '..');
const read = (path) => readFileSync(join(root, path), 'utf8');
const json = (path) => JSON.parse(read(path));

const MARKER = 'x-release-please-version';

const expected = json('.release-please-manifest.json')['.'];
if (!expected) {
  console.error('check-versions: .release-please-manifest.json has no "." entry.');
  process.exit(1);
}

const problems = [];

// 1. The declared places. Read from the config rather than restated here, so
//    adding an entry there extends this automatically.
const config = json('release-please-config.json');
for (const entry of config['extra-files'] ?? []) {
  if (typeof entry === 'object' && entry.type === 'json') {
    const found = json(entry.path).version;
    if (found !== expected) {
      problems.push(`${entry.path}: version is ${found}, manifest says ${expected}`);
    }
    continue;
  }
  if (typeof entry !== 'string' || !entry.endsWith('.ts')) continue;
  const marked = read(entry)
    .split('\n')
    .filter((line) => line.includes(MARKER));
  if (marked.length === 0) {
    problems.push(`${entry}: listed in extra-files but carries no ${MARKER} marker, so nothing bumps it`);
  }
  for (const line of marked) {
    if (!line.includes(`'${expected}'`) && !line.includes(`"${expected}"`)) {
      problems.push(`${entry}: ${line.trim()} does not carry ${expected}`);
    }
  }
}

// The root manifest is the package release-please is releasing, so it is not in
// `extra-files` and has to be named here.
const rootVersion = json('package.json').version;
if (rootVersion !== expected) {
  problems.push(`package.json: version is ${rootVersion}, manifest says ${expected}`);
}

// 2. The undeclared places. A version literal in source that carries no marker
//    is one nothing will bump.
const SEMVER = /(?:\bversion\s*:\s*|\bVERSION\s*=\s*)['"](\d+\.\d+\.\d+[^'"]*)['"]/;

const walk = (directory) => {
  for (const name of readdirSync(join(root, directory))) {
    const path = `${directory}/${name}`;
    if (name === 'node_modules' || name === 'dist' || name.startsWith('.')) continue;
    if (statSync(join(root, path)).isDirectory()) {
      walk(path);
      continue;
    }
    if (!name.endsWith('.ts') || name.endsWith('.d.ts')) continue;
    read(path)
      .split('\n')
      .forEach((line, index) => {
        const match = SEMVER.exec(line);
        if (!match || line.includes(MARKER)) return;
        problems.push(
          `${path}:${index + 1}: hardcodes ${match[1]} and carries no ${MARKER} marker. ` +
            `Add the marker and list the file in release-please-config.json's extra-files, ` +
            `or this will still say ${match[1]} after the next release.`,
        );
      });
  }
};

for (const directory of ['src', 'packages']) walk(directory);

if (problems.length > 0) {
  console.error(`==> Version drift (manifest is ${expected}):`);
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(`==> Versions agree with the manifest (${expected})`);
