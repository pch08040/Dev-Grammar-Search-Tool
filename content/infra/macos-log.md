---
name: log show · log stream (macOS)
cat: 로그 · 모니터링
kind: 명령어
order: 50
aliases:
  - 맥 로그
  - 시스템 로그
  - 콘솔 앱
  - unified logging
  - 실시간 시스템 로그
  - 앱 크래시 원인
signature: "/usr/bin/log show --last 10m --predicate '조건'"
summary: macOS는 시스템과 앱의 로그를 통합 로그(unified logging)에 모읍니다. 터미널에서 `log show`로 지난 로그를, `log stream`으로 실시간 로그를 보고 프로세스나 내용으로 걸러 봅니다.
related:
  - journalctl
  - ps-pgrep
  - macos-vs-linux
doc: 'https://developer.apple.com/documentation/os/logging'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| log show --last 10m | `명령` | 최근 10분 로그 |
| log show --start · --end | `옵션` | 시간 범위 지정 |
| log stream | `명령` | 실시간 로그 |
| --predicate '조건' | `옵션` | `process`, `subsystem`, `eventMessage`로 걸러 보기 |
| --style compact | `옵션` | 한 줄 형식으로 짧게 |
| --info · --debug | `옵션` | 더 자세한 수준까지 포함 |

## 사용 예시

```bash
# zsh에는 이름이 같은 내장 명령 log가 있어서 전체 경로로 실행
# (그냥 log show 를 치면 "too many arguments" 오류)

# 최근 10분 동안 특정 앱(프로세스)의 로그
/usr/bin/log show --last 10m --style compact --predicate 'process == "Finder"'

# 메시지에 특정 단어가 들어간 로그 ([c]는 대소문자 무시)
/usr/bin/log show --last 1h --style compact \
  --predicate 'eventMessage CONTAINS[c] "error"' | tail -n 50

# 실시간으로 보기 (Ctrl+C로 종료)
/usr/bin/log stream --style compact --predicate 'process == "Google Chrome"'

# 특정 시간 범위
/usr/bin/log show --start "2026-11-02 14:00:00" --end "2026-11-02 14:10:00" --style compact

# 앱 크래시·리소스 과다 사용 보고서 위치
ls ~/Library/Logs/DiagnosticReports/ /Library/Logs/DiagnosticReports/

# 메모리 부족으로 강제 종료된 기록 (JetsamEvent)
ls /Library/Logs/DiagnosticReports/ | grep -i jetsam
```

## 주의할 점

- zsh(맥 기본 셸)에서는 `log`가 셸 내장 명령으로 먼저 잡혀 `too many arguments` 오류가 납니다. `/usr/bin/log`처럼 전체 경로로 실행합니다.
- 범위를 넓게 잡으면 출력이 매우 많고 느립니다. `--last`를 짧게 잡고 `--predicate`로 먼저 거릅니다.
- 화면으로 보려면 응용 프로그램 › 유틸리티의 콘솔(Console) 앱을 씁니다.
