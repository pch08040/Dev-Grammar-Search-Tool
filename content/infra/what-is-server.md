---
name: 서버 · 클라이언트 · 포트
cat: 개념
kind: 개념
order: 20
aliases:
  - 서버란
  - 클라이언트
  - 포트 번호
  - localhost
  - '8080'
  - listen
  - 백엔드 서버
summary: 서버는 요청을 기다렸다가 응답하는 프로그램(또는 그 프로그램이 도는 컴퓨터)이고, 클라이언트는 요청을 보내는 쪽입니다. 한 컴퓨터에서 여러 서버가 돌 수 있어서 포트 번호로 서로를 구분합니다.
related:
  - ip-dns-concepts
  - request-flow
  - lsof-port
  - ssh
doc: 'https://developer.mozilla.org/ko/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_web_server'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| 서버 | `프로그램 · 컴퓨터` | 요청을 기다리며(listen) 응답. Spring Boot 앱, Nginx, DB 등 |
| 클라이언트 | `프로그램` | 요청을 보내는 쪽. 브라우저, Flutter 앱, `curl` |
| 포트 | `0~65535` | 한 컴퓨터 안에서 서버 프로그램을 구분하는 번호 |
| 잘 알려진 포트 | `관례` | 22 SSH, 80 HTTP, 443 HTTPS, 3306 MySQL, 5432 PostgreSQL |
| localhost · 127.0.0.1 | `주소` | 지금 쓰는 내 컴퓨터 자신 |
| 원격 서버 | `컴퓨터` | AWS EC2 같은 다른 곳의 컴퓨터. 보통 SSH로 접속해 터미널로 관리 |

## 사용 예시

```bash
# 1) 내 컴퓨터에서 서버 실행 (Spring Boot 예시, 8080 포트에서 대기)
./gradlew bootRun

# 2) 다른 터미널 창에서 클라이언트로 요청 보내기
curl http://localhost:8080/api/health

# 3) 어떤 프로그램이 어떤 포트에서 대기 중인지 확인
lsof -nP -iTCP -sTCP:LISTEN        # macOS
ss -tlnp                            # Linux(Ubuntu)

# 4) 특정 포트를 누가 쓰는지 (포트 충돌 확인)
lsof -nP -iTCP:8080 -sTCP:LISTEN

# 5) 원격 서버에 접속해서 같은 일 하기
ssh ubuntu@203.0.113.10             # 접속 후 프롬프트가 서버 것으로 바뀜
```

## 주의할 점

- `Port 8080 was already in use` 오류는 다른 프로그램(또는 예전에 띄워 둔 같은 서버)이 이미 그 포트를 쓰고 있다는 뜻입니다. `lsof`로 찾아 종료합니다.
- `localhost`(127.0.0.1)에만 열린 서버는 내 컴퓨터에서만 접속됩니다. 같은 와이파이의 휴대폰에서 접속하려면 서버가 `0.0.0.0`에서 대기해야 하고, 내 사설 IP로 접속합니다.
