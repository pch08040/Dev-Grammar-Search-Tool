---
name: SSH 터널 · 포트 포워딩
cat: 원격 서버 · SSH
kind: 명령어
order: 60
aliases:
  - 포트 포워딩
  - 원격 DB 접속
  - 터널링
  - ssh -L
  - ssh -R
  - DB 안전하게 접속
signature: 'ssh -N -L 내포트:대상호스트:대상포트 사용자@서버'
summary: SSH 연결 안으로 다른 포트의 통신을 통과시키는 방법입니다. 외부에 열려 있지 않은 서버의 DB나 관리 화면을 내 맥의 `localhost` 포트로 안전하게 연결할 수 있습니다.
related:
  - ssh
  - ssh-config
  - lsof-port
doc: 'https://man.openbsd.org/ssh'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| -L 내포트:호스트:포트 | `옵션` | 내 맥의 포트를 서버 쪽 대상으로 연결 (로컬 포워딩) |
| -R 서버포트:호스트:포트 | `옵션` | 서버의 포트를 내 맥 쪽 대상으로 연결 (원격 포워딩) |
| -D 포트 | `옵션` | SOCKS 프록시로 동작 |
| -N | `옵션` | 원격 명령 없이 터널만 유지 |
| -f | `옵션` | 접속 후 백그라운드로 전환 |

## 사용 예시

```bash
# 서버 안에서만 열려 있는 MySQL(3306)을 내 맥의 13306 포트로 연결
ssh -N -L 13306:localhost:3306 ubuntu@203.0.113.10
# → 다른 터미널이나 DBeaver에서 localhost:13306 으로 접속

# 서버를 거쳐 내부망의 다른 DB 서버(10.0.1.30:5432)에 연결
ssh -N -L 15432:10.0.1.30:5432 ubuntu@203.0.113.10

# 백그라운드로 실행(-f)한 뒤 터널 확인·종료
ssh -f -N -L 13306:localhost:3306 ubuntu@203.0.113.10
lsof -nP -iTCP:13306 -sTCP:LISTEN       # 터널이 열렸는지 확인
pkill -f 'ssh -f -N -L 13306'            # 터널 종료

# 반대로, 내 맥에서 켠 개발 서버(8080)를 원격 서버의 9000 포트로 연결
ssh -N -R 9000:localhost:8080 ubuntu@203.0.113.10
```

## 주의할 점

- `-L`의 가운데 `localhost`는 내 맥이 아니라 SSH 서버 입장에서의 주소입니다. 서버 자신의 DB면 `localhost`, 다른 내부 서버면 그 서버의 IP를 씁니다.
- DB 포트(3306, 5432)를 방화벽에서 외부에 열어 두는 대신 SSH 터널로 접속하는 것이 안전합니다.
- `-R`로 연 포트는 기본적으로 서버의 `localhost`에서만 접근됩니다(`sshd_config`의 `GatewayPorts` 기본값이 no).
