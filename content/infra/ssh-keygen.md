---
name: SSH 키 (ssh-keygen · authorized_keys)
cat: 원격 서버 · SSH
kind: 명령어
order: 20
aliases:
  - 비밀번호 없이 접속
  - 공개키
  - 개인키
  - ssh-copy-id
  - authorized_keys
  - 비밀번호 로그인 끄기
signature: 'ssh-keygen -t ed25519 -C "메모"'
summary: '`ssh-keygen`으로 개인 키와 공개 키 한 쌍을 만들고, 공개 키를 서버의 `~/.ssh/authorized_keys`에 등록하면 비밀번호 없이 안전하게 접속할 수 있습니다.'
related:
  - ssh
  - ssh-config
  - login-history
  - permissions-sudo
doc: 'https://man.openbsd.org/ssh-keygen'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| ~/.ssh/id_ed25519 | `개인 키` | 내 컴퓨터에만 보관. 절대 공유하지 않음 |
| ~/.ssh/id_ed25519.pub | `공개 키` | 서버에 등록하는 키. 공유해도 됨 |
| ~/.ssh/authorized_keys | `서버 파일` | 접속을 허용할 공개 키 목록 (한 줄에 하나) |
| ~/.ssh/known_hosts | `내 컴퓨터 파일` | 접속했던 서버의 지문 목록 |
| -t ed25519 | `옵션` | 키 종류. ed25519 권장 |
| -C 메모 | `옵션` | 키를 구분할 설명 (보통 이메일) |

## 사용 예시

```bash
# 1) 내 맥에서 키 만들기 (암호 문구 입력 권장)
ssh-keygen -t ed25519 -C "me@example.com"
# → ~/.ssh/id_ed25519 (개인 키), ~/.ssh/id_ed25519.pub (공개 키)

# 2) 공개 키를 서버에 등록 (처음 한 번은 비밀번호로 접속)
ssh-copy-id -i ~/.ssh/id_ed25519.pub ubuntu@203.0.113.10

# ssh-copy-id가 없을 때 직접 등록
cat ~/.ssh/id_ed25519.pub | ssh ubuntu@203.0.113.10 \
  'mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys'

# 3) 이제 비밀번호 없이 접속
ssh ubuntu@203.0.113.10

# 공개 키 지문 확인 (서버 관리자에게 전달할 때)
ssh-keygen -l -f ~/.ssh/id_ed25519.pub

# 4) (서버에서) 키 접속이 확인되면 비밀번호 로그인 끄기
#    /etc/ssh/sshd_config 에서 아래 두 줄 설정
#    PasswordAuthentication no
#    PermitRootLogin no
sudo sshd -t                       # 설정 문법 검사
sudo systemctl reload ssh          # Ubuntu의 SSH 서비스 이름은 ssh
```

## 주의할 점

- 개인 키(`id_ed25519`, `.pem`)는 메신저, 이메일, Git으로 절대 공유하지 않습니다. 다른 사람에게 접속 권한을 줄 때는 그 사람의 공개 키를 받아 `authorized_keys`에 추가합니다.
- 비밀번호 로그인을 끄기 전에 새 터미널 창에서 키 접속이 되는지 먼저 확인합니다. 설정 실수로 서버에 못 들어가게 될 수 있습니다.
- Ubuntu 클라우드 이미지는 `/etc/ssh/sshd_config.d/` 안의 파일이 먼저 적용될 수 있습니다. 설정이 반영되지 않으면 `sudo sshd -T | grep -i passwordauthentication`으로 실제 적용 값을 확인합니다.
