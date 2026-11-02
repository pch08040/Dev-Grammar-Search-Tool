---
name: 접속 로그로 IP별 요청 집계
cat: 로그 · 모니터링
kind: 명령어
order: 30
aliases:
  - 접속 IP 통계
  - IP 추적
  - 많이 요청한 IP
  - 해킹 시도 확인
  - awk
  - sort uniq
  - 상태 코드 집계
signature: "awk '{print $1}' access.log | sort | uniq -c | sort -rn | head"
summary: Nginx 접속 로그는 한 줄이 요청 하나이고 첫 칸이 요청한 IP입니다. `awk`로 칸을 뽑고 `sort | uniq -c`로 세면 어떤 IP가 얼마나, 어떤 주소를 요청했는지 알 수 있습니다.
related:
  - grep-logs
  - tail-follow
  - whois-ip
  - fail2ban
doc: 'https://nginx.org/en/docs/http/ngx_http_log_module.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| $1 | `$remote_addr` | 요청한 IP |
| $4 | `[$time_local` | 요청 시각 (`[02/Nov/2026:10:00:01`) |
| $7 | `요청 경로` | `/api/users` 같은 주소 |
| $9 | `$status` | 상태 코드 (200, 401, 404, 500) |
| $10 | `$body_bytes_sent` | 응답 크기 (바이트) |

## 사용 예시

```bash
LOG=/var/log/nginx/access.log
# 한 줄 예: 198.51.100.7 - - [02/Nov/2026:10:01:10 +0900] "POST /api/login HTTP/1.1" 401 64 "-" "curl/8.4.0"

# 1) 요청을 많이 보낸 IP 상위 10개
awk '{print $1}' "$LOG" | sort | uniq -c | sort -rn | head -10

# 2) 상태 코드별 개수 (500이 많으면 서버 오류, 401·403이 많으면 공격 의심)
awk '{print $9}' "$LOG" | sort | uniq -c | sort -rn

# 3) 로그인 실패(401)를 많이 낸 IP
awk '$9 == 401 {print $1}' "$LOG" | sort | uniq -c | sort -rn | head

# 4) 404를 낸 IP와 주소 (/wp-login.php, /.env 등은 취약점 스캔)
awk '$9 == 404 {print $1, $7}' "$LOG" | sort | uniq -c | sort -rn | head -20

# 5) 시간대별 요청 수 (트래픽이 몰린 시간 찾기)
awk '{print substr($4, 2, 14)}' "$LOG" | sort | uniq -c

# 6) 특정 IP가 언제 무엇을 요청했는지
grep '^198.51.100.7 ' "$LOG" | awk '{print $4, $7, $9}'

# 7) 가장 많이 호출된 API 경로
awk '{print $7}' "$LOG" | sort | uniq -c | sort -rn | head
```

## 주의할 점

- 서버 앞에 로드밸런서나 Cloudflare가 있으면 첫 칸이 실제 사용자 IP가 아니라 프록시 IP가 됩니다. 이때는 Nginx의 `real_ip` 설정이나 `X-Forwarded-For` 헤더를 로그에 남겨야 합니다.
- 칸 번호는 Nginx 기본 `combined` 형식 기준입니다. `log_format`을 바꿨다면 칸 번호도 달라집니다.
- 수상한 IP를 찾으면 `whois`로 소유자를 확인하고, 반복 공격은 `fail2ban`이나 방화벽으로 차단합니다.
