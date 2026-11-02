---
name: ssh 접속
cat: 원격 서버 · SSH
kind: 명령어
order: 10
aliases:
  - 서버 접속
  - 원격 접속
  - 리눅스 서버 들어가기
  - 원격 명령 실행
  - 배스천
  - ssh -i
signature: 'ssh [-i 키파일] [-p 포트] 사용자@호스트 [원격 명령]'
summary: '`ssh`는 암호화된 연결로 원격 서버의 터미널에 들어가는 명령입니다. 접속하면 내 맥의 터미널에서 서버의 명령을 그대로 실행할 수 있습니다.'
related:
  - ssh-keygen
  - ssh-config
  - tmux
  - scp-rsync
doc: 'https://man.openbsd.org/ssh'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| -i 키파일 | `옵션` | 접속에 쓸 개인 키 지정 |
| -p 포트 | `옵션` | SSH 포트 지정 (기본 22) |
| -J 경유서버 | `옵션` | 중간 서버(배스천)를 거쳐 접속 |
| -t | `옵션` | 원격 명령에 터미널 할당 (sudo 비밀번호 입력 등) |
| -v | `옵션` | 접속 과정을 자세히 출력 (문제 해결용) |
| exit · Ctrl+D | `종료` | 원격 세션 종료 |

## 사용 예시

```bash
# 기본 접속: 사용자@서버주소 (처음 접속하면 지문 확인 질문에 yes)
ssh ubuntu@203.0.113.10

# 키 파일과 포트를 지정해 접속 (AWS EC2 등)
ssh -i ~/.ssh/my-server.pem -p 22 ubuntu@203.0.113.10

# 접속한 뒤 서버에서 자주 하는 확인
whoami                                  # 현재 사용자
hostname                                # 서버 이름
uptime                                  # 켜진 시간과 부하
df -h                                   # 디스크 여유 공간
tail -n 50 /var/log/nginx/access.log    # 최근 접속 로그 50줄
exit                                    # 접속 종료 (Ctrl+D도 가능)

# 접속하지 않고 명령 한 줄만 실행하고 돌아오기
ssh ubuntu@203.0.113.10 'systemctl status nginx --no-pager'

# sudo처럼 비밀번호를 물어보는 명령은 -t
ssh -t ubuntu@203.0.113.10 'sudo systemctl restart nginx'

# 중간 서버(배스천)를 거쳐 내부 서버에 접속
ssh -J ubuntu@bastion.example.com ubuntu@10.0.1.20

# 접속이 안 될 때 원인 보기
ssh -v ubuntu@203.0.113.10
```

## 주의할 점

- `.pem` 키 파일 권한이 너무 열려 있으면 `UNPROTECTED PRIVATE KEY FILE` 오류로 접속이 거부됩니다. `chmod 600 ~/.ssh/my-server.pem`으로 고칩니다.
- `REMOTE HOST IDENTIFICATION HAS CHANGED` 경고는 서버를 다시 만들었거나 중간에서 누군가 가로채고 있을 수 있다는 뜻입니다. 서버를 재설치한 게 확실할 때만 `ssh-keygen -R 203.0.113.10`으로 기존 지문을 지웁니다.
- 매번 주소와 키를 입력하기 번거로우면 `~/.ssh/config`에 별칭을 등록합니다.
