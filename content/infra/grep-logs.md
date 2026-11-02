---
name: 로그에서 grep으로 찾기
cat: 로그 · 모니터링
kind: 명령어
order: 20
aliases:
  - 에러 로그 찾기
  - 로그 검색
  - 예외 찾기
  - grep -C
  - zgrep
  - 특정 시간대 로그
signature: "grep [옵션] '패턴' 파일"
summary: '`grep`으로 큰 로그 파일에서 에러, 특정 사용자, 특정 IP, 특정 시간대의 줄만 골라냅니다. 앞뒤 줄을 함께 보면 예외의 원인까지 파악할 수 있습니다.'
related:
  - tail-follow
  - access-log-ip
  - find-grep
  - journalctl
doc: 'https://man7.org/linux/man-pages/man1/grep.1.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| -i | `옵션` | 대소문자 무시 |
| -n | `옵션` | 줄 번호 표시 |
| -C 숫자 · -A · -B | `옵션` | 앞뒤 줄 함께 표시 (-A 뒤, -B 앞) |
| -E | `옵션` | 확장 정규식 (`A\|B`로 여러 패턴) |
| -v | `옵션` | 패턴이 없는 줄만 |
| -c | `옵션` | 일치한 줄 수 |
| -r | `옵션` | 폴더 안의 파일 전체 검색 |
| zgrep | `명령` | `.gz`로 압축된 로그 검색 |

## 사용 예시

```bash
LOG=/home/ubuntu/app/logs/app.log

# 에러와 예외만, 줄 번호와 함께
grep -n -E 'ERROR|Exception' "$LOG"

# 예외 앞뒤 5줄까지 보기 (스택 트레이스 확인)
grep -n -C 5 'NullPointerException' "$LOG"

# 에러가 몇 번 났는지
grep -c 'ERROR' "$LOG"

# 특정 시간대(14시) 로그만 (Spring Boot 3 기본 형식: 2026-11-02T14:05:00.123+09:00)
grep '2026-11-02T14:' "$LOG"

# 헬스 체크 요청은 빼고 최근 접속 로그 보기 (-v)
grep -v '/actuator/health' /var/log/nginx/access.log | tail -n 50

# 로테이션되어 압축된 지난 로그까지 검색
zgrep '198.51.100.7' /var/log/nginx/access.log.*.gz

# 폴더 전체에서 대소문자 무시하고 검색
grep -rni 'timeout' /home/ubuntu/app/logs/
```

## 주의할 점

- 정규식의 `|`(또는)를 쓰려면 `-E`를 붙입니다. 붙이지 않으면 `|`를 글자 그대로 찾습니다.
- 수 GB짜리 로그를 `cat`으로 열지 말고 `grep`, `tail`, `less`로 필요한 부분만 봅니다.
- Spring Boot 3의 기본 로그 시간은 날짜와 시간 사이에 `T`가 들어갑니다. 로그 형식을 바꿨다면 실제 로그 한 줄을 보고 패턴을 맞춥니다.
