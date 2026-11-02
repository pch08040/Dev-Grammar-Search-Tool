---
name: nc (포트 열림 확인)
cat: 네트워크 · IP
kind: 명령어
order: 70
aliases:
  - 포트 열렸는지
  - netcat
  - 방화벽 확인
  - DB 연결 확인
  - Connection refused
  - telnet 대신
summary: 특정 서버의 포트에 접속이 되는지만 빠르게 확인합니다. 앱 서버에서 DB나 외부 API 포트로 연결이 되는지, 방화벽에 막혔는지 가릴 때 씁니다.
signature: nc -zv 호스트 포트
related:
  - ping
  - curl
  - connections
  - lsof-port
doc: 'https://ss64.com/mac/nc.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| -z | `옵션` | 데이터를 보내지 않고 접속 여부만 확인 |
| -v | `옵션` | 결과 메시지 출력 |
| -G 3 | `옵션 (macOS)` | 접속 대기 시간 3초 |
| -w 3 | `옵션 (Linux)` | 대기 시간 3초 |
| succeeded · open | `출력` | 포트가 열려 있고 접속 가능 |
| refused | `출력` | 서버에는 닿았지만 그 포트에서 기다리는 프로그램이 없음 |

## 사용 예시

```bash
# macOS
nc -zv -G 3 example.com 443
# Connection to example.com port 443 [tcp/https] succeeded!

# 내 맥의 개발 서버가 떠 있나
nc -zv -G 2 localhost 5173

# Linux(Ubuntu) 앱 서버에서 DB · Redis 포트 확인
nc -zv -w 3 db.internal 5432      # PostgreSQL
nc -zv -w 3 10.0.1.20 3306        # MySQL
nc -zv -w 3 10.0.1.21 6379        # Redis

# 결과 해석
# succeeded / open      → 정상
# Connection refused     → 서버는 살아 있음. 프로그램이 안 떠 있거나 다른 포트
# 시간 초과 (timed out)   → 방화벽·보안 그룹에서 막힘, 또는 주소가 틀림
```

## 주의할 점

- 내가 관리하는 서버나 접속이 허가된 주소에만 사용합니다. 남의 서버 포트를 여러 개 두드려 보는 것은 공격으로 간주될 수 있습니다.
- 시간 초과는 대부분 클라우드 보안 그룹이나 `ufw` 방화벽에서 포트를 열지 않은 경우입니다. refused라면 방화벽이 아니라 서버 프로그램 쪽을 확인합니다.
