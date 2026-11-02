---
name: ps · pgrep
cat: 프로세스 · 시스템
kind: 명령어
order: 10
aliases:
  - 프로세스 목록
  - 실행 중인 프로그램
  - 프로세스 찾기
  - PID 확인
  - ps aux
  - 부모 프로세스
summary: 지금 실행 중인 프로세스 목록을 보여 주는 명령어입니다. `ps`는 전체 목록과 상세 정보를, `pgrep`은 이름으로 찾은 PID만 빠르게 보여 줍니다.
related:
  - kill-signals
  - top-htop
  - lsof-port
doc: 'https://man7.org/linux/man-pages/man1/ps.1.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| ps aux | `옵션` | 모든 사용자의 모든 프로세스를 자세히 출력 |
| ps -o pid,ppid,%cpu,%mem,etime,command | `옵션` | 보고 싶은 열만 골라 출력 (`ppid`는 부모 PID) |
| ps -p PID | `옵션` | 특정 PID 하나만 출력 |
| pgrep -f 패턴 | `옵션` | 전체 명령줄에서 패턴을 찾아 PID 출력 |
| pgrep -fl 패턴 | `옵션` | PID와 명령을 함께 출력 (Linux는 `-a`) |

## 사용 예시

```bash
# CPU를 많이 쓰는 순으로 상위 10개 (macOS: -r 이 CPU 순 정렬)
ps -Ao pid,ppid,%cpu,%mem,etime,comm -r | head -11
# Linux(Ubuntu)
ps -eo pid,ppid,%cpu,%mem,etime,comm --sort=-%cpu | head -11

# 이름으로 찾기: Gradle 데몬이 몇 개 떠 있는지
pgrep -f GradleDaemon | wc -l
pgrep -fl GradleDaemon          # macOS: PID + 명령
pgrep -af GradleDaemon          # Linux: PID + 전체 명령

# 특정 프로세스의 부모 따라가기 (누가 띄웠는지)
ps -o pid,ppid,etime,command -p 2315
ps -o pid,command -p "$(ps -o ppid= -p 2315)"

# 같은 이름의 프로세스를 부모별로 세기 (폭증 원인 찾기)
pgrep -f GradleDaemon | xargs ps -o ppid= -p | sort | uniq -c
```

## 주의할 점

- `ps aux | grep java`처럼 찾으면 `grep` 자기 자신도 결과에 나옵니다. `pgrep -f java`를 쓰면 이 문제가 없습니다.
- 부모 PID(`ppid`)가 1이면 원래 띄운 프로그램은 이미 종료되고 남은 고아 프로세스일 가능성이 큽니다.
- macOS의 `pgrep`에는 개수를 세는 `-c` 옵션이 없습니다. `pgrep -f 패턴 | wc -l`로 셉니다.
