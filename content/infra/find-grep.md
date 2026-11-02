---
name: find · grep
cat: 터미널 기초
kind: 명령어
order: 40
aliases:
  - 파일 찾기
  - 문자열 검색
  - 내용 검색
  - 전체 검색
  - 확장자로 찾기
  - grep -r
summary: '`find`는 이름·크기·수정 시각으로 파일을 찾고, `grep`은 파일 내용에서 문자열을 찾습니다. 둘을 조합하면 프로젝트나 서버 전체에서 원하는 코드와 설정을 빠르게 찾을 수 있습니다.'
related:
  - grep-logs
  - navigation
  - pipe-redirect
doc: 'https://man7.org/linux/man-pages/man1/grep.1.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| find 경로 -name '*.yml' | `명령` | 이름으로 찾기 (패턴은 따옴표로) |
| -type f · -type d | `find 옵션` | 파일만 · 폴더만 |
| -mtime -1 · -size +100M | `find 옵션` | 하루 안에 수정 · 100MB 초과 |
| grep -r 'text' 경로 | `명령` | 폴더 전체에서 내용 검색 |
| -n · -i · -l | `grep 옵션` | 줄 번호 · 대소문자 무시 · 파일 이름만 |
| -C 2 · -v · -E | `grep 옵션` | 앞뒤 2줄 · 일치하지 않는 줄 · 정규식 |

## 사용 예시

```bash
# 이름으로 파일 찾기 (현재 폴더부터)
find . -name '*.yml'
find . -type d -name node_modules -prune -o -type f -name '*.ts' -print   # node_modules 제외
find /var/log -type f -mtime -1           # 하루 안에 수정된 로그
find ~ -type f -size +500M                # 500MB가 넘는 큰 파일

# 내용으로 찾기
grep -rn 'spring.datasource' src/         # 폴더 전체, 줄 번호 포함
grep -ril 'todo' src/                     # 대소문자 무시, 파일 이름만
grep -n -C 2 'ERROR' app.log              # 일치한 줄의 앞뒤 2줄까지
grep -v 'DEBUG' app.log                   # DEBUG 줄 제외
grep -E 'ERROR|WARN' app.log              # 여러 단어 (정규식)
grep -rn --include='*.java' '@Transactional' src/   # 특정 확장자만

# 조합: 찾은 파일들 안에서 검색
find . -name '*.properties' -exec grep -Hn 'password' {} +
```

## 주의할 점

- `find . -name *.yml`처럼 따옴표를 빼면 셸이 `*`를 먼저 펼쳐서 엉뚱하게 동작합니다. 패턴은 항상 따옴표로 감쌉니다.
- 코드 검색이 잦다면 더 빠른 `rg`(ripgrep)를 설치해 쓰는 것도 좋습니다(`brew install ripgrep`).
