export type Stack = 'flutter' | 'spring' | 'infra';

export interface Param {
  name: string;
  type: string;
  desc: string;
}

/** content/{stack}/{slug}.md 한 파일을 빌드 시 변환한 결과 */
export interface Entry {
  /** "{stack}/{slug}" — 전역 고유 키이자 URL 경로 */
  key: string;
  stack: Stack;
  slug: string;
  cat: string;
  kind: string;
  name: string;
  aliases: string[];
  summary: string;
  signature?: string;
  paramsTitle?: string;
  params?: Param[];
  lang: string;
  /** 복사용 원본 코드 */
  example: string;
  /** 빌드 시 highlight.js로 변환한 HTML */
  exampleHtml: string;
  tips?: string[];
  /** 관련 항목 key 목록 */
  related?: string[];
  doc: string;
  order: number;
}
