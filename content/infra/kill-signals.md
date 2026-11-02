---
name: kill · pkill · 시그널
cat: 프로세스 · 시스템
kind: 명령어
order: 30
aliases:
  - 프로세스 종료
  - 강제 종료
  - kill -9
  - SIGTERM
  - 응답 없음
  - xargs kill
summary: 프로세스에 시그널을 보내 종료합니다. `kill`은 PID로, `pkill`은 이름 패턴으로 보냅니다. 기본은 정상 종료를 요청하는 `SIGTERM`이고, 응답하지 않을 때만 `SIGKILL`(-9)을 씁니다.
related:
  - ps-pgrep
  - lsof-port
  - background-jobs
doc: 'https://man7.org/linux/man-pages/man7/signal.7.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| kill PID | `SIGTERM (15)` | 정상 종료 요청. 프로그램이 정리 작업 후 종료 |
| kill -9 PID | `SIGKILL (9)` | 즉시 강제 종료. 정리 작업 없음 |
| kill -HUP PID | `SIGHUP (1)` | 설정 다시 읽기 (nginx 등 일부 서버) |
| Ctrl+C | `SIGINT (2)` | 터미널에서 실행 중인 프로그램 중단 |
| pkill -f 패턴 | `명령어` | 명령줄이 패턴과 맞는 프로세스 모두에 시그널 전송 |

## 사용 예시

```bash
# 1) 정상 종료부터 시도
kill 59085

# 2) 몇 초 기다렸다가 아직 살아 있으면 강제 종료
sleep 5
kill -0 59085 2>/dev/null && kill -9 59085   # kill -0: 살아 있는지 확인만

# 이름 패턴으로 한 번에 종료
pkill -f 'vite --port 5199'

# 여러 PID를 한 번에: xargs로 넘김
pgrep -f GradleDaemon | xargs kill
pgrep -f GradleDaemon | xargs kill -9   # 응답이 없을 때만

# 종료됐는지 확인
pgrep -f GradleDaemon | wc -l

# 다른 사용자(root)가 띄운 프로세스는 sudo 필요
sudo kill 289
```

## 주의할 점

- `kill -9`는 저장 중인 파일이나 DB 트랜잭션을 정리할 기회를 주지 않습니다. 항상 `kill`(SIGTERM)을 먼저 보내고, 응답이 없을 때만 씁니다.
- zsh에서 `pids=$(pgrep -f X); kill $pids`처럼 쓰면 PID 여러 개가 한 덩어리로 넘어가 `illegal pid` 오류가 납니다. `pgrep -f X | xargs kill`로 씁니다.
- 죽였는데 바로 다시 생긴다면 다른 프로그램(IDE 확장, launchd, systemd)이 다시 띄우는 것입니다. `ps -o ppid=`로 부모를 찾아 원인부터 멈춥니다.
