'use client';

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CATEGORIES, STACKS, STACK_LABEL, STACK_SHORT } from '@/lib/categories';
import type { Entry, Stack } from '@/lib/types';

type StackFilter = 'all' | Stack;

const FAV_KEY = 'devref.favs';
const THEME_KEY = 'devref.theme';

function readStore<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStore(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

/** 이름 > 별칭 > 분류 > 설명 > 코드 순으로 가중치. 모든 단어가 어딘가에 있어야 결과에 포함 */
function score(e: Entry, tokens: string[]): number {
  if (!tokens.length) return 1;
  const name = e.name.toLowerCase();
  const aliases = e.aliases.join(' ').toLowerCase();
  const meta = `${e.cat} ${e.kind}`.toLowerCase();
  const body = `${e.summary} ${(e.tips ?? []).join(' ')}`.toLowerCase();
  const code = e.example.toLowerCase();
  let total = 0;
  for (const t of tokens) {
    let s = 0;
    if (name.startsWith(t)) s = 20;
    else if (name.includes(t)) s = 14;
    else if (aliases.includes(t)) s = 9;
    else if (meta.includes(t)) s = 5;
    else if (body.includes(t)) s = 3;
    else if (code.includes(t)) s = 1;
    if (!s) return 0;
    total += s;
  }
  return total;
}

function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  if (!tokens.length) return <>{text}</>;
  const re = new RegExp(`(${tokens.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'ig');
  return (
    <>
      {text.split(re).map((part, i) =>
        i % 2 === 1 ? <mark key={i}>{part}</mark> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

/** `백틱`으로 감싼 부분을 <code>로 표시 */
function InlineCode({ text }: { text: string }) {
  return (
    <>
      {text.split(/`([^`]+)`/).map((part, i) =>
        i % 2 === 1 ? <code key={i}>{part}</code> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

export default function RefApp({ initialEntry }: { initialEntry?: Entry }) {
  const [entries, setEntries] = useState<Entry[]>(initialEntry ? [initialEntry] : []);
  const [loaded, setLoaded] = useState(false);
  const [stack, setStack] = useState<StackFilter>('all');
  const [cat, setCat] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [favOnly, setFavOnly] = useState(false);
  const [favs, setFavs] = useState<Set<string>>(new Set());
  const [selectedKey, setSelectedKey] = useState<string | null>(initialEntry?.key ?? null);
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLElement>(null);
  const detailRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setFavs(new Set(readStore<string[]>(FAV_KEY, [])));
    fetch('/entries.json')
      .then((r) => r.json())
      .then((data: Entry[]) => setEntries(data))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const byKey = useMemo(() => new Map(entries.map((e) => [e.key, e])), [entries]);
  const tokens = useMemo(() => q.toLowerCase().split(/\s+/).filter(Boolean), [q]);
  const stackEntries = useMemo(
    () => entries.filter((e) => stack === 'all' || e.stack === stack),
    [entries, stack],
  );
  const results = useMemo(
    () =>
      stackEntries
        .filter((e) => !cat || e.cat === cat)
        .filter((e) => !favOnly || favs.has(e.key))
        .map((e) => ({ e, s: score(e, tokens) }))
        .filter((r) => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .map((r) => r.e),
    [stackEntries, cat, favOnly, favs, tokens],
  );
  const selected = selectedKey ? (byKey.get(selectedKey) ?? null) : null;

  useEffect(() => setCursor(0), [q, stack, cat, favOnly]);

  useEffect(() => {
    document.title = selected ? `${selected.name} · DevRef` : 'DevRef';
    detailRef.current?.scrollTo(0, 0);
  }, [selected]);

  useEffect(() => {
    listRef.current?.querySelector('[data-cursor="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  const select = useCallback((key: string | null) => {
    setSelectedKey(key);
    setCopied(false);
    const url = key ? `/${key}` : '/';
    if (window.location.pathname !== url) window.history.pushState(null, '', url);
  }, []);

  // 브라우저 뒤로가기·앞으로가기
  useEffect(() => {
    const onPop = () => {
      const path = decodeURIComponent(window.location.pathname).replace(/^\/|\/$/g, '');
      setSelectedKey(path || null);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const copyCode = useCallback(() => {
    if (!selected) return;
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    };
    navigator.clipboard?.writeText(selected.example).then(done, done);
  }, [selected]);

  const toggleFav = (key: string) => {
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      writeStore(FAV_KEY, [...next]);
      return next;
    });
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = isDark ? 'light' : 'dark';
    writeStore(THEME_KEY, root.dataset.theme);
  };

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      const inInput = document.activeElement === searchRef.current;
      const k = ev.key.toLowerCase();
      if (((ev.metaKey || ev.ctrlKey) && k === 'k') || (!inInput && ev.key === '/')) {
        ev.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
        return;
      }
      if (inInput) {
        if (ev.key === 'ArrowDown') {
          ev.preventDefault();
          setCursor((c) => Math.min(c + 1, results.length - 1));
        } else if (ev.key === 'ArrowUp') {
          ev.preventDefault();
          setCursor((c) => Math.max(c - 1, 0));
        } else if (ev.key === 'Enter') {
          const e = results[cursor];
          if (e) select(e.key);
        } else if (ev.key === 'Escape') {
          setQ('');
        }
      } else if (k === 'c' && !ev.metaKey && !ev.ctrlKey && !ev.altKey) {
        copyCode();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [results, cursor, select, copyCode]);

  const stacksShown = stack === 'all' ? STACKS : [stack];

  return (
    <div className={`app${selected ? ' show-detail' : ''}`}>
      <header className="top">
        <a className="logo" href="/" onClick={(ev) => { ev.preventDefault(); select(null); }}>
          <span className="logo-mark">{'{ }'}</span>DevRef
        </a>
        <label className="search" aria-label="검색">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={searchRef}
            type="search"
            value={q}
            onChange={(ev) => setQ(ev.target.value)}
            placeholder="위젯, 함수, 어노테이션 검색 (예: 리스트, setState, @Transactional)"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd>⌘K</kbd>
        </label>
        <div className="stack-switch" role="group" aria-label="기술 스택">
          {(['all', ...STACKS] as StackFilter[]).map((s) => (
            <button
              key={s}
              data-stack={s}
              aria-pressed={stack === s}
              onClick={() => { setStack(s); setCat(null); }}
            >
              {s === 'all' ? '전체' : STACK_LABEL[s]}
            </button>
          ))}
        </div>
        <button className="icon-btn" onClick={toggleTheme} title="테마 전환" aria-label="테마 전환">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        </button>
      </header>

      <div className="layout">
        <nav className="side">
          <button className="cat" aria-current={!cat} onClick={() => setCat(null)}>
            <span>전체 보기</span>
            <span className="n">{stackEntries.length}</span>
          </button>
          {stacksShown.map((st) => (
            <Fragment key={st}>
              <h3>
                <span className={`dot ${st}`} />
                {STACK_LABEL[st]}
              </h3>
              {CATEGORIES[st].map((c) => {
                const n = entries.filter((e) => e.stack === st && e.cat === c).length;
                if (!n) return null;
                return (
                  <button key={c} className="cat" aria-current={cat === c} onClick={() => setCat(c)}>
                    <span>{c}</span>
                    <span className="n">{n}</span>
                  </button>
                );
              })}
            </Fragment>
          ))}
        </nav>

        <section className="list" ref={listRef} aria-label="검색 결과">
          <div className="list-head">
            <span>
              {q ? `"${q}" 결과 ` : ''}
              {results.length}개
            </span>
            <button className="chip-toggle" aria-pressed={favOnly} onClick={() => setFavOnly((v) => !v)}>
              ★ 즐겨찾기
            </button>
          </div>
          {!results.length && (
            <div className="empty">
              {loaded ? (
                <>
                  검색 결과가 없습니다.
                  <br />
                  다른 키워드나 한글 별칭으로 검색해 보세요.
                </>
              ) : (
                '불러오는 중…'
              )}
            </div>
          )}
          {results.map((e, i) => (
            <button
              key={e.key}
              className="item"
              aria-selected={selectedKey === e.key}
              data-cursor={!!q && i === cursor}
              onClick={() => select(e.key)}
            >
              <div className="item-top">
                <span className={`badge ${e.stack}`}>{STACK_SHORT[e.stack]}</span>
                <span className="badge kind">{e.kind}</span>
                {favs.has(e.key) && <span className="star">★</span>}
              </div>
              <div className="item-name">
                <Highlight text={e.name} tokens={tokens} />
              </div>
              <div className="item-sum">
                <Highlight text={e.summary} tokens={tokens} />
              </div>
            </button>
          ))}
        </section>

        <main className="detail" ref={detailRef}>
          {selected ? (
            <article className="detail-inner">
              <button className="back" onClick={() => select(null)}>
                ← 목록
              </button>
              <div className="crumb">
                <span className={`badge ${selected.stack}`}>{STACK_LABEL[selected.stack]}</span>
                <span>›</span>
                <span>{selected.cat}</span>
                <span>›</span>
                <span className="badge kind">{selected.kind}</span>
              </div>
              <div className="d-title">
                <h1>{selected.name}</h1>
                <button
                  className="fav-btn"
                  aria-pressed={favs.has(selected.key)}
                  onClick={() => toggleFav(selected.key)}
                >
                  {favs.has(selected.key) ? '★ 즐겨찾기됨' : '☆ 즐겨찾기'}
                </button>
              </div>
              <p className="d-summary">
                <InlineCode text={selected.summary} />
              </p>

              {selected.signature && (
                <section className="section">
                  <h2>형태</h2>
                  <div className="sig">{selected.signature}</div>
                </section>
              )}

              {selected.params && (
                <section className="section">
                  <h2>{selected.paramsTitle}</h2>
                  <table className="params">
                    <thead>
                      <tr>
                        <th>이름</th>
                        <th>타입</th>
                        <th>설명</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selected.params.map((p) => (
                        <tr key={p.name}>
                          <td>{p.name}</td>
                          <td>
                            {p.type.includes('`') ? <InlineCode text={p.type} /> : <code>{p.type}</code>}
                          </td>
                          <td>
                            <InlineCode text={p.desc} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              )}

              <section className="section">
                <h2>사용 예시</h2>
                <div className="code-wrap">
                  <div className="code-bar">
                    <span>{selected.lang}</span>
                    <button className={`copy${copied ? ' done' : ''}`} onClick={copyCode}>
                      {copied ? '복사됨' : '복사'}
                    </button>
                  </div>
                  <pre className="code">
                    <code className="hljs" dangerouslySetInnerHTML={{ __html: selected.exampleHtml }} />
                  </pre>
                </div>
              </section>

              {selected.tips && (
                <section className="section">
                  <h2>주의할 점</h2>
                  <div className="tip">
                    <span>💡</span>
                    <ul>
                      {selected.tips.map((t) => (
                        <li key={t}>
                          <InlineCode text={t} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {selected.related && (
                <section className="section">
                  <h2>함께 보면 좋은 항목</h2>
                  <div className="related">
                    {selected.related.map((key) => {
                      const r = byKey.get(key);
                      return r ? (
                        <button key={key} onClick={() => { setQ(''); select(key); }}>
                          {r.name}
                        </button>
                      ) : null;
                    })}
                  </div>
                </section>
              )}

              <section className="section">
                <a className="doc-link" href={selected.doc} target="_blank" rel="noopener noreferrer">
                  공식 문서 보기 ↗
                </a>
              </section>
            </article>
          ) : (
            <div className="detail-inner welcome">
              <h1>무엇을 찾고 계세요?</h1>
              <p>
                위젯 이름, 함수, 어노테이션은 물론 <b>한글 키워드</b>로도 검색할 수 있습니다.
                <br />
                예: <code>리스트</code>, <code>버튼 비활성화</code>, <code>롤백</code>, <code>null</code>
              </p>
              <div className="kbd-list">
                <kbd>⌘K</kbd>
                <span>
                  또는 <kbd>/</kbd> 검색창으로 이동
                </span>
                <kbd>↑ ↓</kbd>
                <span>결과 이동</span>
                <kbd>Enter</kbd>
                <span>선택한 항목 열기</span>
                <kbd>Esc</kbd>
                <span>검색어 지우기</span>
                <kbd>C</kbd>
                <span>열린 항목의 예시 코드 복사</span>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
