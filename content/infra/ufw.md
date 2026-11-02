---
name: ufw 방화벽
cat: 서버 운영
kind: 명령어
order: 40
aliases:
  - 방화벽
  - 포트 막기
  - 포트 열기
  - IP 차단
  - firewall
  - 특정 IP만 허용
summary: Ubuntu의 기본 방화벽 도구입니다. 외부에서 들어올 수 있는 포트와 IP를 정해, 필요한 포트(SSH, 80, 443)만 열고 나머지는 막습니다.
signature: 'sudo ufw allow 443/tcp'
related:
  - fail2ban
  - nginx-reverse-proxy
  - ssh
  - docker-basics
doc: 'https://manpages.ubuntu.com/manpages/noble/man8/ufw.8.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| ufw default deny incoming | `명령` | 들어오는 연결은 기본 차단 |
| ufw allow 포트/프로토콜 | `명령` | 포트 열기 (예: `443/tcp`) |
| ufw allow from IP to any port N | `명령` | 특정 IP에만 포트 허용 |
| ufw insert 1 deny from IP | `명령` | 특정 IP를 맨 앞 규칙으로 차단 |
| ufw status numbered | `명령` | 규칙을 번호와 함께 보기 |
| ufw delete 번호 | `명령` | 규칙 삭제 |

## 사용 예시

```bash
# 1) 기본 정책: 들어오는 연결 차단, 나가는 연결 허용
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 2) SSH를 먼저 허용한 뒤 켜야 접속이 끊기지 않음
sudo ufw allow OpenSSH             # 22번 포트
sudo ufw allow 'Nginx Full'        # 80, 443 (nginx 설치 시 생기는 프로필)
sudo ufw enable

# 3) 상태 확인
sudo ufw status verbose
sudo ufw status numbered

# 4) 특정 IP만 DB 포트 접근 허용 (사무실 IP 예시)
sudo ufw allow from 203.0.113.50 to any port 5432 proto tcp

# 5) 공격하는 IP 차단: 허용 규칙보다 먼저 적용되도록 맨 앞에 삽입
sudo ufw insert 1 deny from 198.51.100.23

# 6) 규칙 삭제
sudo ufw delete 3                  # status numbered의 번호
sudo ufw delete allow 5432/tcp

# 앱 포트(8080)는 열지 않음: 기본 정책으로 이미 차단되어 Nginx만 접근
```

## 주의할 점

- SSH(22)를 허용하기 전에 `ufw enable`을 하면 원격 접속이 끊기고 다시 들어갈 수 없습니다. 반드시 `allow OpenSSH`를 먼저 실행합니다.
- 규칙은 위에서부터 순서대로 적용됩니다. IP 차단은 `ufw insert 1 deny from IP`로 허용 규칙보다 앞에 넣어야 효과가 있습니다.
- Docker에서 `-p 8080:8080`으로 공개한 포트는 ufw 규칙을 우회해 외부에 열립니다. `-p 127.0.0.1:8080:8080`처럼 로컬 주소에만 바인딩합니다.
