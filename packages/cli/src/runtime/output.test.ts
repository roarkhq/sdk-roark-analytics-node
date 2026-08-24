import { isTty, paint, render, resolveFormat, supportsColor, write } from './output';

const asStream = (isTTY: boolean): NodeJS.WriteStream =>
  ({ isTTY, write: () => true }) as unknown as NodeJS.WriteStream;

describe('supportsColor', () => {
  let saved: Record<string, string | undefined>;

  beforeEach(() => {
    saved = { NO_COLOR: process.env['NO_COLOR'], TERM: process.env['TERM'] };
    delete process.env['NO_COLOR'];
    delete process.env['TERM'];
  });

  afterEach(() => {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

  it('follows the terminal when nothing objects', () => {
    expect(supportsColor(asStream(true))).toBe(true);
    expect(supportsColor(asStream(false))).toBe(false);
  });

  it('honours NO_COLOR with any value, per no-color.org', () => {
    for (const value of ['', '0', 'false', '1']) {
      process.env['NO_COLOR'] = value;
      expect(supportsColor(asStream(true))).toBe(false);
    }
  });

  it('honours TERM=dumb', () => {
    process.env['TERM'] = 'dumb';
    expect(supportsColor(asStream(true))).toBe(false);
  });
});

describe('isTty', () => {
  it('is true only for an actual terminal', () => {
    expect(isTty(asStream(true))).toBe(true);
    expect(isTty(asStream(false))).toBe(false);
    expect(isTty({} as NodeJS.WriteStream)).toBe(false);
  });
});

describe('paint', () => {
  it('is the identity when colour is off', () => {
    expect(paint('hello', 'red', false)).toBe('hello');
  });

  it('wraps and resets when colour is on', () => {
    const painted = paint('hello', 'red', true);
    expect(painted).toContain('hello');
    expect(painted.startsWith('[31m')).toBe(true);
    expect(painted.endsWith('[0m')).toBe(true);
  });
});

describe('resolveFormat', () => {
  it('resolves auto to json, so output is parseable wherever it runs', () => {
    expect(resolveFormat('auto')).toBe('json');
  });

  it('passes the explicit formats through', () => {
    expect(resolveFormat('jsonl')).toBe('jsonl');
    expect(resolveFormat('plain')).toBe('plain');
    expect(resolveFormat('json')).toBe('json');
  });
});

describe('render', () => {
  const value = { data: [{ id: 1 }, { id: 2 }], ok: true };

  it('is compact JSON for a pipe and indented for a terminal', () => {
    const piped = render(value, { format: 'auto', color: false, stream: asStream(false) });
    expect(piped).toBe(JSON.stringify(value));
    expect(piped).not.toContain('\n');

    const terminal = render(value, { format: 'auto', color: false, stream: asStream(true) });
    expect(terminal).toBe(JSON.stringify(value, null, 2));
    expect(JSON.parse(terminal)).toEqual(value);
  });

  it('stays valid JSON once colourised', () => {
    const coloured = render(value, { format: 'json', color: true, stream: asStream(true) });
    expect(JSON.parse(coloured.replace(/\[\d+m/g, ''))).toEqual(value);
  });

  it('writes one JSON object per line for jsonl', () => {
    const lines = render([{ id: 1 }, { id: 2 }], { format: 'jsonl', color: false }).split('\n');
    expect(lines).toEqual(['{"id":1}', '{"id":2}']);
  });

  it('wraps a lone value in a single jsonl line', () => {
    expect(render({ id: 1 }, { format: 'jsonl', color: false })).toBe('{"id":1}');
  });

  it('prints a scalar bare for plain, so $(...) is directly usable', () => {
    expect(render('a-string', { format: 'plain', color: false })).toBe('a-string');
    expect(render(42, { format: 'plain', color: false })).toBe('42');
    expect(render(true, { format: 'plain', color: false })).toBe('true');
    expect(render(null, { format: 'plain', color: false })).toBe('');
  });

  it('joins an array of scalars by newline and falls back to JSON for structure', () => {
    expect(render(['a', 'b'], { format: 'plain', color: false })).toBe('a\nb');
    expect(render({ id: 1 }, { format: 'plain', color: false })).toBe('{"id":1}');
  });
});

describe('write', () => {
  it('appends exactly one newline', () => {
    const chunks: string[] = [];
    const stream = { write: (chunk: string) => chunks.push(chunk) } as unknown as NodeJS.WriteStream;

    write('no newline', stream);
    write('has newline\n', stream);
    expect(chunks).toEqual(['no newline\n', 'has newline\n']);
  });

  it('writes nothing for an empty string, so a --quiet run stays silent', () => {
    const stream = { write: jest.fn() } as unknown as NodeJS.WriteStream;
    write('', stream);
    expect(stream.write).not.toHaveBeenCalled();
  });
});
