import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import dart from 'highlight.js/lib/languages/dart';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import ini from 'highlight.js/lib/languages/ini';
import nginx from 'highlight.js/lib/languages/nginx';
import groovy from 'highlight.js/lib/languages/groovy';
import java from 'highlight.js/lib/languages/java';
import json from 'highlight.js/lib/languages/json';
import kotlin from 'highlight.js/lib/languages/kotlin';
import properties from 'highlight.js/lib/languages/properties';
import sql from 'highlight.js/lib/languages/sql';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';
import { CATEGORIES, STACKS } from './categories';
import type { Entry, Param, Stack } from './types';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('dart', dart);
hljs.registerLanguage('dockerfile', dockerfile);
hljs.registerLanguage('ini', ini);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('groovy', groovy);
hljs.registerLanguage('java', java);
hljs.registerLanguage('json', json);
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('properties', properties);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('yaml', yaml);

const CONTENT_DIR = path.join(process.cwd(), 'content');
const REQUIRED = ['name', 'cat', 'kind', 'aliases', 'summary', 'doc'] as const;
const PARAM_SECTIONS = ['주요 속성', '구성 요소'];

let cache: Entry[] | null = null;

/** content/ 아래 .md 파일을 모두 읽어 Entry 목록으로 변환. 형식 오류가 있으면 빌드를 멈춤 */
export function getEntries(): Entry[] {
  if (cache) return cache;

  const entries: Entry[] = [];
  for (const stack of STACKS) {
    const dir = path.join(CONTENT_DIR, stack);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).sort()) {
      if (!file.endsWith('.md') || file.startsWith('_')) continue;
      entries.push(parseFile(stack, path.join(dir, file)));
    }
  }

  validate(entries);
  entries.sort(
    (a, b) =>
      a.stack.localeCompare(b.stack) ||
      CATEGORIES[a.stack].indexOf(a.cat) - CATEGORIES[b.stack].indexOf(b.cat) ||
      a.order - b.order ||
      a.name.localeCompare(b.name),
  );
  cache = entries;
  return entries;
}

export function getEntry(stack: string, slug: string): Entry | undefined {
  return getEntries().find((e) => e.stack === stack && e.slug === slug);
}

function parseFile(stack: Stack, file: string): Entry {
  const rel = path.relative(process.cwd(), file);
  const slug = path.basename(file, '.md');
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));

  for (const key of REQUIRED) {
    if (data[key] === undefined || data[key] === '') fail(rel, `필수 항목 "${key}"가 없습니다.`);
  }
  if (!CATEGORIES[stack].includes(data.cat)) {
    fail(rel, `cat "${data.cat}"은(는) src/lib/categories.ts에 없는 분류입니다.`);
  }
  if (!Array.isArray(data.aliases)) fail(rel, 'aliases는 배열이어야 합니다.');

  const body = parseBody(content, rel);
  const related = (data.related ?? []).map((r: string) => (r.includes('/') ? r : `${stack}/${r}`));

  return {
    key: `${stack}/${slug}`,
    stack,
    slug,
    cat: data.cat,
    kind: data.kind,
    name: String(data.name),
    aliases: data.aliases.map(String),
    summary: data.summary,
    ...(data.signature ? { signature: String(data.signature) } : {}),
    ...body,
    ...(related.length ? { related } : {}),
    doc: data.doc,
    order: typeof data.order === 'number' ? data.order : 999,
  };
}

function parseBody(content: string, rel: string) {
  // "## 제목" 기준으로 구역을 나눔: [앞부분, 제목1, 내용1, 제목2, 내용2, ...]
  const parts = content.split(/^##[ \t]+(.+)$/m);
  const sections = new Map<string, string>();
  for (let i = 1; i < parts.length; i += 2) sections.set(parts[i].trim(), parts[i + 1] ?? '');

  const exampleSection = sections.get('사용 예시');
  if (!exampleSection) fail(rel, '"## 사용 예시" 구역이 없습니다.');
  const code = exampleSection.match(/```(\w+)\n([\s\S]*?)\n```/);
  if (!code) fail(rel, '"## 사용 예시"에 ```언어 코드 블록이 없습니다.');
  const [, lang, example] = code;
  if (!hljs.getLanguage(lang)) fail(rel, `코드 언어 "${lang}"은(는) src/lib/content.ts에 등록되지 않았습니다.`);

  let paramsTitle: string | undefined;
  let params: Param[] | undefined;
  for (const title of PARAM_SECTIONS) {
    const section = sections.get(title);
    if (!section) continue;
    paramsTitle = title;
    params = section
      .split('\n')
      .filter((line) => line.trim().startsWith('|'))
      .slice(2) // 머리글 행과 구분선 행 제외
      .map((line) => {
        const cells = line
          .trim()
          .slice(1, -1)
          .split(/(?<!\\)\|/)
          // 셀 전체가 백틱 한 쌍일 때만 벗김 (`a` · `b`처럼 여러 쌍이면 그대로 둠)
          .map((c) => c.trim().replace(/\\\|/g, '|').replace(/^`([^`]*)`$/, '$1'));
        if (cells.length !== 3) fail(rel, `"## ${title}" 표는 이름 | 타입 | 설명 3칸이어야 합니다: ${line}`);
        return { name: cells[0], type: cells[1], desc: cells[2] };
      });
  }

  const tipsSection = sections.get('주의할 점');
  const tips = tipsSection
    ?.split('\n')
    .map((line) => line.match(/^\s*-\s+(.+)$/)?.[1])
    .filter((t): t is string => !!t);

  return {
    lang,
    example,
    exampleHtml: hljs.highlight(example, { language: lang }).value,
    ...(params?.length ? { paramsTitle, params } : {}),
    ...(tips?.length ? { tips } : {}),
  };
}

function validate(entries: Entry[]) {
  const keys = new Set<string>();
  for (const e of entries) {
    if (keys.has(e.key)) throw new Error(`[content] 중복된 항목: ${e.key}`);
    keys.add(e.key);
  }
  for (const e of entries) {
    for (const r of e.related ?? []) {
      if (!keys.has(r)) throw new Error(`[content] ${e.key}.md의 related "${r}" 항목이 없습니다.`);
    }
  }
}

function fail(file: string, message: string): never {
  throw new Error(`[content] ${file}: ${message}`);
}
