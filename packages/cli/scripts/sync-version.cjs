// Keep `src/version.ts` in step with this package's `package.json`.
//
// The root package has `scripts/utils/check-version.cjs` for the same job, but
// it is hardcoded to the repository root and rewrites `VERSION`, not `version`.
// The CLI needs its own because it is not on release-please: nothing rewrites
// its version, so `src/version.ts` said 2.31.0 while `package.json` said 0.1.0
// and `roark --version` shipped the wrong number.
//
// Runs before tsc, so the compiled output can only carry the published version.
const fs = require('fs');
const path = require('path');

const main = () => {
  const version = require('../package.json').version;
  if (typeof version !== 'string' || !version) {
    throw new Error(`packages/cli/package.json has no usable version; got ${typeof version}`);
  }
  // Whatever is here is compiled in and answers `roark --version`, so a typo
  // reaches the registry as the package's identity. `v0.1.1` and `0.1` both
  // install fine and both read as wrong forever, npm versions being immutable.
  if (!/^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?(\+[0-9A-Za-z.-]+)?$/.test(version)) {
    throw new Error(`packages/cli/package.json version is not semver: ${version}`);
  }

  const versionFile = path.resolve(__dirname, '..', 'src', 'version.ts');
  const contents = fs.readFileSync(versionFile, 'utf8');
  const PATTERN = /(export const version = ')(.*)(')/;
  if (!PATTERN.test(contents)) {
    throw new Error("src/version.ts does not declare 'export const version'; nothing to sync");
  }

  const updated = contents.replace(PATTERN, `$1${version}$3`);
  if (updated !== contents) {
    fs.writeFileSync(versionFile, updated);
    console.log(`synced src/version.ts to ${version}`);
  }
};

if (require.main === module) {
  main();
}
