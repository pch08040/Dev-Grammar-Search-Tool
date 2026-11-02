---
name: journalctl (서비스 로그)
cat: 로그 · 모니터링
kind: 명령어
order: 40
aliases:
  - 서비스 로그
  - systemd 로그
  - 부팅 로그
  - 시간대별 로그
  - 서버 재시작 원인
  - journalctl -u
summary: '`systemctl`로 등록한 서비스(Spring Boot, Nginx, SSH 등)의 로그는 systemd 저널에 모입니다. `journalctl`로 서비스별, 시간대별 로그를 보고 실시간으로 따라갈 수 있습니다.'
signature: 'journalctl -u 서비스이름 [-f] [--since 시간]'
related:
  - systemctl
  - tail-follow
  - grep-logs
  - login-history
doc: 'https://man7.org/linux/man-pages/man1/journalctl.1.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| -u 이름 | `옵션` | 특정 서비스(unit)의 로그만 |
| -f | `옵션` | 실시간으로 따라가기 |
| -n 숫자 | `옵션` | 마지막 몇 줄 |
| --since · --until | `옵션` | 시간 범위 ("1 hour ago", "2026-11-02 14:00") |
| -p err | `옵션` | 우선순위가 err 이상인 로그만 |
| -b | `옵션` | 이번 부팅 이후 로그 (-b -1 은 직전 부팅) |
| --no-pager | `옵션` | 페이지 넘김 없이 바로 출력 |

## 사용 예시

```bash
# Spring Boot를 myapp.service로 등록했을 때 최근 로그 100줄
journalctl -u myapp -n 100 --no-pager

# 실시간으로 따라가기
journalctl -u myapp -f

# 최근 1시간 로그만
journalctl -u myapp --since "1 hour ago"

# 특정 시간 범위
journalctl -u nginx --since "2026-11-02 14:00" --until "2026-11-02 15:00"

# 이번 부팅 이후 에러 이상만 (모든 서비스)
journalctl -p err -b --no-pager

# SSH 로그인 시도 기록 (Ubuntu의 SSH 서비스 이름은 ssh)
journalctl -u ssh --since today | grep -E 'Failed|Accepted'

# 서버가 갑자기 재부팅됐을 때: 직전 부팅의 마지막 로그
journalctl -b -1 -n 50 --no-pager

# 로그가 디스크를 얼마나 쓰는지, 7일보다 오래된 로그 정리
journalctl --disk-usage
sudo journalctl --vacuum-time=7d
```

## 주의할 점

- 일반 사용자는 다른 서비스의 로그를 못 볼 수 있습니다. `sudo`를 붙이거나 사용자를 `systemd-journal` 그룹에 추가합니다.
- 직전 부팅의 로그(`-b -1`)는 저널이 디스크에 저장될 때만 남습니다. `/var/log/journal` 폴더가 있는지 확인합니다.
- macOS에는 `journalctl`이 없습니다. 맥에서는 `log show`를 씁니다.
