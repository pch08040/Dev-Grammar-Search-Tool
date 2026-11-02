---
name: fail2ban (반복 공격 IP 차단)
cat: 서버 운영
kind: 설정
order: 50
aliases:
  - 무차별 대입 공격
  - 브루트포스 차단
  - 자동 IP 차단
  - SSH 공격 막기
  - jail.local
  - fail2ban-client
summary: 로그를 감시하다가 짧은 시간에 로그인 실패를 반복하는 IP를 자동으로 방화벽에서 차단하는 도구입니다. 서버를 인터넷에 열면 SSH 비밀번호 대입 공격이 바로 들어오기 때문에 기본으로 설치합니다.
signature: 'sudo fail2ban-client status sshd'
related:
  - ufw
  - login-history
  - ssh-keygen
  - access-log-ip
doc: 'https://github.com/fail2ban/fail2ban'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| bantime | `설정` | 차단 유지 시간 (예: `1h`) |
| findtime | `설정` | 실패 횟수를 세는 시간 범위 (예: `10m`) |
| maxretry | `설정` | 이 횟수만큼 실패하면 차단 |
| ignoreip | `설정` | 절대 차단하지 않을 IP (내 IP) |
| banaction | `설정` | 차단에 쓸 방화벽 (예: `ufw`) |
| [sshd] enabled = true | `jail` | SSH 감시 켜기 |

## 사용 예시

```ini
# 설치: sudo apt install -y fail2ban
# 설정 파일: /etc/fail2ban/jail.local (jail.conf는 직접 고치지 않음)
# 적용: sudo systemctl restart fail2ban

[DEFAULT]
# 10분(findtime) 안에 5번(maxretry) 실패하면 1시간(bantime) 차단
bantime  = 1h
findtime = 10m
maxretry = 5
# 내 사무실 IP는 차단하지 않음
ignoreip = 127.0.0.1/8 ::1 203.0.113.50
# ufw로 차단
banaction = ufw

[sshd]
enabled = true

[nginx-http-auth]
enabled = true

# 상태 확인 (터미널에서)
#   sudo fail2ban-client status
#   sudo fail2ban-client status sshd      # 차단된 IP 목록
# 차단 해제
#   sudo fail2ban-client set sshd unbanip 198.51.100.23
```

## 주의할 점

- `jail.conf`를 직접 고치면 패키지 업데이트 때 덮어써집니다. 바꿀 값만 `jail.local`에 씁니다.
- `ignoreip`에 내 IP를 넣지 않으면 비밀번호를 몇 번 틀렸을 때 나도 차단되어 서버에 들어갈 수 없습니다.
- fail2ban은 보조 수단입니다. 근본 대책은 SSH 비밀번호 로그인을 끄고 키 인증(`ssh-keygen`)만 허용하는 것입니다.
