---
name: 요청이 서버에 도착하는 과정
cat: 개념
kind: 개념
order: 50
aliases:
  - 요청 흐름
  - 네트워크 흐름
  - 장애 추적 순서
  - API가 안 될 때
  - 502 Bad Gateway
  - Connection refused
summary: 앱이나 브라우저가 `https://api.example.com/users`를 호출하면 DNS 조회, 서버 IP의 443 포트 연결, Nginx 같은 웹 서버, Spring Boot 앱(8080), DB 순서로 전달됩니다. 장애가 나면 이 순서대로 하나씩 확인합니다.
related:
  - ip-dns-concepts
  - what-is-server
  - curl
  - nginx-reverse-proxy
doc: 'https://developer.mozilla.org/ko/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| 1. DNS | `도메인 → IP` | 도메인을 서버 IP로 바꿈. `dig`로 확인 |
| 2. 네트워크 | `IP:포트 연결` | 서버까지 닿는지, 포트가 열렸는지. `ping`, `nc -zv` |
| 3. 방화벽 | `허용 · 차단` | 서버 방화벽·클라우드 보안 그룹에서 443이 열렸는지 |
| 4. 웹 서버 | `Nginx 80 · 443` | HTTPS 처리 후 앱으로 전달. Nginx 로그 |
| 5. 애플리케이션 | `Spring Boot 8080` | 실제 로직 실행. 앱 로그 |
| 6. 데이터베이스 | `3306 · 5432` | 데이터 조회·저장 |

## 사용 예시

```bash
# "API가 안 돼요" 할 때 앞 단계부터 하나씩 확인 (api.example.com 예시)

# 1) DNS: 도메인이 올바른 IP를 가리키는지
dig +short api.example.com

# 2) 네트워크: 서버까지 닿는지, 443 포트가 열려 있는지
ping -c 3 api.example.com
nc -zv api.example.com 443

# 3) HTTP 응답: 상태 코드와 헤더만 확인
curl -I https://api.example.com/actuator/health

# --- 여기부터는 서버에 ssh로 접속해서 ---
# 4) 웹 서버(Nginx)가 요청을 받았는지
sudo tail -n 20 /var/log/nginx/access.log
sudo tail -n 20 /var/log/nginx/error.log

# 5) 앱이 8080에서 대기 중인지, 앱 로그에 오류가 있는지
ss -tlnp | grep 8080
journalctl -u myapp -n 50 --no-pager

# 6) 앱 서버에서 DB 포트까지 닿는지
nc -zv db.internal 5432
```

## 주의할 점

- `curl`이 `Connection refused`를 내면 그 포트에서 아무도 대기하지 않는 것이고, 응답 없이 멈추면(timeout) 방화벽이나 보안 그룹에서 막힌 경우가 많습니다.
- Nginx가 `502 Bad Gateway`를 돌려주면 Nginx 뒤의 앱(8080)이 꺼져 있거나 응답하지 않는 것입니다.
- 일부 서버는 `ping`(ICMP)을 막아 둡니다. `ping`이 실패해도 `nc`나 `curl`로 포트를 직접 확인합니다.
