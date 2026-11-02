---
name: 로그인 기록 (last · who · auth.log)
cat: 로그 · 모니터링
kind: 명령어
order: 60
aliases:
  - 접속 기록
  - 누가 접속했나
  - 로그인 실패
  - 해킹 시도 확인
  - 무차별 대입
  - lastb
  - auth.log
summary: 서버에 누가 언제 어느 IP에서 로그인했는지, 실패한 로그인 시도는 어디서 왔는지 확인합니다. 현재 접속자는 `who`, 지난 로그인은 `last`, SSH 시도 기록은 `auth.log`나 `journalctl`로 봅니다.
related:
  - journalctl
  - fail2ban
  - access-log-ip
  - ssh-keygen
doc: 'https://man7.org/linux/man-pages/man1/last.1.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| who | `명령` | 지금 접속한 사용자와 접속 IP |
| w | `명령` | 접속자와 각자 실행 중인 명령 |
| last | `명령` | 지난 로그인 기록 (`/var/log/wtmp`) |
| sudo lastb | `명령` | 실패한 로그인 기록 (`/var/log/btmp`) |
| /var/log/auth.log | `파일` | SSH와 sudo 인증 로그 (Ubuntu) |

## 사용 예시

```bash
# 지금 서버에 접속해 있는 사람과 IP
who
w

# 최근 로그인 20건 (사용자, 터미널, 접속 IP, 시간)
last -n 20

# 실패한 로그인 시도 (root 권한 필요)
sudo lastb -n 20

# SSH 로그인 실패를 IP별로 집계 → 무차별 대입 공격 확인
# 줄 예: ... sshd[1201]: Failed password for invalid user admin from 198.51.100.7 port 51234 ssh2
sudo grep 'Failed password' /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn | head

# 성공한 SSH 로그인 (publickey · password 방식 구분 가능)
sudo grep 'Accepted' /var/log/auth.log | tail -n 20

# auth.log가 없는 서버는 저널에서 (Ubuntu의 SSH 서비스 이름은 ssh)
sudo journalctl -u ssh --since today | grep -E 'Failed|Accepted'

# 내 맥의 로그인 기록
last | head
```

## 주의할 점

- 실패 로그가 특정 IP에서 수백 번씩 보이면 무차별 대입(brute force) 공격입니다. 비밀번호 로그인을 끄고 `fail2ban`으로 자동 차단합니다.
- 실패 로그에서 IP는 끝에서 네 번째 칸이라 `awk '{print $(NF-3)}'`로 뽑습니다. `invalid user`가 붙든 안 붙든 위치가 같습니다.
