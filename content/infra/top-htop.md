---
name: top · htop
cat: 프로세스 · 시스템
kind: 명령어
order: 20
aliases:
  - 실시간 모니터링
  - CPU 사용률
  - 메모리 사용률
  - 작업 관리자
  - 활성 상태 보기
  - 서버가 느릴 때
summary: CPU와 메모리를 많이 쓰는 프로세스를 실시간으로 보여 주는 명령어입니다. 터미널판 작업 관리자(활성 상태 보기)라고 생각하면 됩니다. `htop`은 색과 마우스를 지원하는 보기 좋은 버전입니다.
related:
  - ps-pgrep
  - kill-signals
  - disk-memory
doc: 'https://man7.org/linux/man-pages/man1/top.1.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| q | `키` | 종료 |
| P · M | `키 (Linux top)` | CPU 순 · 메모리 순 정렬 |
| k | `키 (Linux top)` | PID를 입력해 프로세스 종료 |
| o | `키 (macOS top)` | 정렬 기준 입력 (`cpu`, `mem` 등) |
| F6 · F9 · / | `키 (htop)` | 정렬 · 종료 · 검색 |

## 사용 예시

```bash
# 실시간 화면 (q로 종료)
top

# macOS: CPU 순으로 실행
top -o cpu
# macOS: 화면 없이 한 번만 찍기 (첫 샘플은 CPU가 0으로 나오므로 2번 측정)
top -l 2 -n 10 -o cpu -stats pid,command,cpu,mem | tail -11

# Linux(Ubuntu): CPU 순, 화면 없이 한 번만 (스크립트·로그 저장용)
top -o %CPU
top -b -n 1 | head -20

# htop 설치와 실행
brew install htop          # macOS
sudo apt install htop      # Linux(Ubuntu)
htop

# 첫 줄의 load average 읽기 (1분, 5분, 15분 평균)
uptime
# 예: load averages: 4.6 5.1 5.6 → 코어 수(sysctl -n hw.ncpu / nproc)보다 크면 과부하
```

## 주의할 점

- `top`의 메모리 수치는 캐시까지 포함해서 크게 보일 수 있습니다. 메모리가 실제로 부족한지는 스왑 사용량을 함께 봅니다(`disk-memory` 항목 참고).
- load average가 코어 수의 몇 배로 계속 높다면, 한 프로세스가 폭주하거나 같은 프로세스가 수십 개 떠 있는지 `ps`로 개수를 세어 봅니다.
