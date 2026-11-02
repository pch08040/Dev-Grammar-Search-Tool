---
name: '~/.ssh/config'
cat: 원격 서버 · SSH
kind: 설정
order: 30
aliases:
  - ssh 별칭
  - 접속 설정 저장
  - Host 설정
  - IdentityFile
  - ProxyJump
  - 짧게 접속
summary: 자주 접속하는 서버의 주소, 사용자, 키 파일, 포트를 `~/.ssh/config`에 이름을 붙여 저장하면 `ssh 별칭`만으로 접속할 수 있습니다. `scp`, `rsync`, VS Code 원격 접속도 같은 설정을 씁니다.
related:
  - ssh
  - ssh-keygen
  - scp-rsync
  - ssh-tunnel
doc: 'https://man.openbsd.org/ssh_config'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| Host | `키워드` | 별칭 (이 이름으로 접속) |
| HostName | `키워드` | 실제 IP나 도메인 |
| User | `키워드` | 접속 사용자 |
| Port | `키워드` | SSH 포트 |
| IdentityFile | `키워드` | 개인 키 경로 |
| ProxyJump | `키워드` | 거쳐 갈 중간 서버 별칭 |
| ServerAliveInterval | `키워드` | 지정한 초마다 신호를 보내 연결 끊김 방지 |

## 사용 예시

```bash
# ~/.ssh/config 에 아래 내용을 추가 (EOF 사이가 파일 내용)
cat >> ~/.ssh/config <<'EOF'
Host prod
    HostName 203.0.113.10
    User ubuntu
    IdentityFile ~/.ssh/id_ed25519
    ServerAliveInterval 60

Host bastion
    HostName bastion.example.com
    User ubuntu

Host internal-db
    HostName 10.0.1.20
    User ubuntu
    ProxyJump bastion

# 공통 설정은 맨 아래에. UseKeychain은 macOS 전용이라 IgnoreUnknown 필요
Host *
    IgnoreUnknown UseKeychain
    AddKeysToAgent yes
    UseKeychain yes
EOF
chmod 600 ~/.ssh/config

# 이제 별칭으로 접속·전송
ssh prod
ssh internal-db                     # bastion을 거쳐 자동 접속
scp ./app.jar prod:/home/ubuntu/
rsync -avz ./dist/ prod:/var/www/html/
```

## 주의할 점

- 같은 설정이 여러 `Host`에 걸리면 먼저 나온 값이 적용됩니다. 공통 설정인 `Host *`는 파일 맨 아래에 둡니다.
- 설정 값 뒤에 같은 줄로 `#` 주석을 붙이지 않습니다. 주석은 별도 줄에 씁니다.
- VS Code의 Remote - SSH 확장도 이 파일의 별칭을 그대로 접속 목록에 보여 줍니다.
