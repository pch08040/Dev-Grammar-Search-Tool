---
name: 열린 포트 · 연결 보기 (ss · netstat)
cat: 네트워크 · IP
kind: 명령어
order: 60
aliases:
  - 열린 포트 확인
  - 접속 중인 IP
  - ss -tulpn
  - netstat
  - LISTEN
  - ESTABLISHED
summary: 서버에서 어떤 포트가 열려 있는지(LISTEN), 지금 어떤 IP가 접속해 있는지(ESTABLISHED)를 확인합니다. Linux는 `ss`, macOS는 `netstat`와 `lsof`를 씁니다.
related:
  - lsof-port
  - nc-port-check
  - whois-ip
doc: 'https://man7.org/linux/man-pages/man8/ss.8.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| -t · -u | `옵션 (ss)` | TCP · UDP |
| -l | `옵션 (ss)` | 대기(LISTEN) 중인 포트만 |
| -n | `옵션 (ss)` | 숫자로 표시 (이름 변환 안 함) |
| -p | `옵션 (ss)` | 프로세스 이름 · PID (sudo 필요) |
| state established | `필터 (ss)` | 연결된 상태만 |
| LISTEN · ESTABLISHED | `상태` | 접속을 기다리는 중 · 연결되어 통신 중 |

## 사용 예시

```bash
# Linux(Ubuntu): 열려 있는 포트와 프로세스
sudo ss -tulpn
# Netid State  Local Address:Port  ... Process
# tcp   LISTEN 0.0.0.0:22              users:(("sshd",pid=812,...))
# tcp   LISTEN *:8080                  users:(("java",pid=2554,...))

# Linux: 443 포트에 지금 접속한 IP별 연결 수 (상위 10개)
ss -Htn state established '( sport = :443 )' \
  | awk '{print $4}' | sed 's/:[0-9]*$//' | sort | uniq -c | sort -rn | head -10

# macOS: 대기 중인 포트
netstat -an -p tcp | grep LISTEN
lsof -nP -iTCP -sTCP:LISTEN

# macOS: 연결된 상대 주소
lsof -nP -iTCP -sTCP:ESTABLISHED | awk 'NR>1 {print $1, $9}' | sort -u | head
```

## 주의할 점

- `0.0.0.0:8080`이나 `*:8080`은 모든 주소에서 접속을 받는다는 뜻이고, `127.0.0.1:8080`은 그 서버 안에서만 접속할 수 있다는 뜻입니다. 외부에서 접속이 안 되면 이 부분부터 확인합니다.
- `netstat`는 Linux에서 오래된 도구(net-tools)라 기본으로 설치되어 있지 않을 수 있습니다. Linux에서는 `ss`를 씁니다.
