---
name: 포트를 쓰는 프로세스 찾기 (lsof)
cat: 프로세스 · 시스템
kind: 명령어
order: 40
aliases:
  - 포트 사용 중
  - Port already in use
  - 8080 포트
  - lsof -i
  - 포트 점유
  - 어떤 프로그램이 포트를
summary: 특정 포트를 어떤 프로세스가 쓰고 있는지 찾습니다. 서버를 켰는데 포트가 이미 사용 중이라는 오류가 날 때 가장 먼저 쓰는 명령어입니다.
signature: 'lsof -nP -iTCP:포트 -sTCP:LISTEN'
related:
  - kill-signals
  - connections
  - nc-port-check
  - spring/application-yml
doc: 'https://ss64.com/mac/lsof.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| -i :포트 | `옵션` | 해당 포트를 쓰는 모든 연결 |
| -iTCP:포트 -sTCP:LISTEN | `옵션` | 그 포트에서 대기(LISTEN) 중인 서버만 |
| -n · -P | `옵션` | IP와 포트 번호를 이름으로 바꾸지 않음 (빠름) |
| -t | `옵션` | PID만 출력 (`kill`과 연결할 때) |
| -p PID | `옵션` | 그 프로세스가 연 파일·포트 전체 |

## 사용 예시

```bash
# 8080 포트를 누가 쓰고 있나
lsof -nP -iTCP:8080 -sTCP:LISTEN
# COMMAND  PID     USER  ... NAME
# java    2554 nextcore  ... *:8080 (LISTEN)

# 그 프로세스가 무엇인지 자세히
ps -o pid,etime,command -p 2554

# 포트를 쓰는 프로세스 종료 (확인 후에)
lsof -t -iTCP:8080 -sTCP:LISTEN | xargs kill

# 내 맥에서 대기 중인 서버 전체 보기
lsof -nP -iTCP -sTCP:LISTEN

# 특정 프로세스가 연결한 상대 (예: 브라우저가 5173 개발 서버에 붙어 있는지)
lsof -nP -iTCP:5173 -sTCP:ESTABLISHED

# Linux(Ubuntu) 서버에서는 ss로 같은 일을 함 (프로세스 이름은 sudo 필요)
sudo ss -ltnp 'sport = :8080'
```

## 주의할 점

- 다른 사용자(root 등)가 띄운 프로세스는 `sudo` 없이는 목록에 나오지 않습니다. 결과가 비어 있는데 포트가 사용 중이라면 `sudo lsof -i :포트`로 다시 확인합니다.
- Spring Boot의 `Port 8080 was already in use` 오류는 대부분 이전에 띄운 서버가 남아 있는 경우입니다. 종료하기 전에 `ps`로 정말 필요 없는 프로세스인지 확인합니다.
