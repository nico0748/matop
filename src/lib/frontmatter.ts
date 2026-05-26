// Minimal YAML-ish frontmatter parser.
// Supports a leading `---` fence, simple `key: value` pairs (quoted or unquoted).
// Intentionally avoids pulling a full YAML library to keep the browser bundle small.

export interface FrontMatter {
  title?: string;
  author?: string;
  date?: string;
  [key: string]: string | undefined;
}

export interface ParsedDocument {
  data: FrontMatter;
  content: string;
}

const FENCE = /^---\s*\r?\n/;
const END_FENCE = /\r?\n---\s*(\r?\n|$)/;

export function parseFrontMatter(source: string): ParsedDocument {
  if (!FENCE.test(source)) return { data: {}, content: source };
  const afterStart = source.replace(FENCE, "");
  const endMatch = afterStart.match(END_FENCE);
  if (!endMatch || endMatch.index === undefined) return { data: {}, content: source };

  const yamlBlock = afterStart.slice(0, endMatch.index);
  const rest = afterStart.slice(endMatch.index + endMatch[0].length);
  return { data: parseSimpleYaml(yamlBlock), content: rest };
}

function parseSimpleYaml(text: string): FrontMatter {
  const data: FrontMatter = {};
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const m = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }
  return data;
}
