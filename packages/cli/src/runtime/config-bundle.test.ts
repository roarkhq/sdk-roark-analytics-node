import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { buildBundle } from './config-bundle';
import { UsageError } from './errors';

const scratch = (): string => mkdtempSync(join(tmpdir(), 'roark-cfg-'));

const write = (root: string, rel: string, body: string): void => {
  const abs = join(root, rel);
  mkdirSync(join(abs, '..'), { recursive: true });
  writeFileSync(abs, body);
};

describe('buildBundle', () => {
  it('collects resource YAML across subdirectories, sorted and deterministic', async () => {
    const root = scratch();
    write(root, 'agents/frontdesk.yaml', 'kind: agent\nname: frontdesk\n');
    write(root, 'collectors/quality.yml', 'kind: collector\nname: quality\nmodality: call\n');
    write(root, 'notes.md', '# not a resource'); // ignored

    const bundle = await buildBundle(root);
    expect(bundle.resources.map((r) => `${r['kind']}/${r['name']}`)).toEqual([
      'agent/frontdesk',
      'collector/quality',
    ]);
    expect(bundle.prune).toBeUndefined();
  });

  it('inlines file:// references anywhere in a resource', async () => {
    const root = scratch();
    write(root, 'prompts/backstory.md', 'You are a frustrated caller.');
    write(
      root,
      'personas/dana.yaml',
      'kind: persona\nname: dana\nbackstoryPrompt: file://prompts/backstory.md\n',
    );

    const bundle = await buildBundle(root);
    expect(bundle.resources[0]?.['backstoryPrompt']).toBe('You are a frustrated caller.');
  });

  it('passes prune through when set', async () => {
    const root = scratch();
    write(root, 'a.yaml', 'kind: agent\nname: a\n');
    expect((await buildBundle(root, { prune: false })).prune).toBe(false);
  });

  it('rejects duplicate kind/name, missing kind/name, and an empty directory', async () => {
    const dupes = scratch();
    write(dupes, 'one.yaml', 'kind: agent\nname: x\n');
    write(dupes, 'two.yaml', 'kind: agent\nname: x\n');
    await expect(buildBundle(dupes)).rejects.toThrow(UsageError);

    const bad = scratch();
    write(bad, 'a.yaml', 'name: nokind\n');
    await expect(buildBundle(bad)).rejects.toThrow(/kind/);

    await expect(buildBundle(scratch())).rejects.toThrow(/no config resources/);
  });

  it('rejects a file:// path that escapes the config directory', async () => {
    const root = scratch();
    write(root, 'a.yaml', 'kind: agent\nname: a\nprompt: file://../../etc/passwd\n');
    await expect(buildBundle(root)).rejects.toThrow(/escapes/);
  });
});
