---
name: tmux (접속이 끊겨도 유지)
cat: 원격 서버 · SSH
kind: 명령어
order: 50
aliases:
  - 세션 유지
  - 터미널 분할
  - 접속 끊김
  - detach
  - attach
  - screen
summary: '`tmux`는 서버 안에서 터미널 세션을 유지해 주는 프로그램입니다. SSH 접속이 끊겨도 실행 중인 작업이 계속 돌고, 다시 접속해서 그대로 이어 볼 수 있습니다.'
related:
  - ssh
  - background-jobs
  - tail-follow
  - systemctl
doc: 'https://github.com/tmux/tmux/wiki/Getting-Started'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| tmux new -s 이름 | `명령` | 이름을 붙인 새 세션 시작 |
| Ctrl+b 다음 d | `단축키` | 세션에서 빠져나오기 (detach). 작업은 계속 실행 |
| tmux ls | `명령` | 세션 목록 |
| tmux attach -t 이름 | `명령` | 세션에 다시 붙기 |
| Ctrl+b 다음 % · " | `단축키` | 화면 세로 · 가로 분할 |
| Ctrl+b 다음 방향키 | `단축키` | 분할한 창 사이 이동 |
| tmux kill-session -t 이름 | `명령` | 세션 종료 |

## 사용 예시

```bash
# 설치: 서버(Ubuntu)는 apt, 맥은 brew
sudo apt install -y tmux          # Linux(Ubuntu)
brew install tmux                 # macOS

# 1) 서버에 접속해서 작업용 세션 시작
ssh ubuntu@203.0.113.10
tmux new -s deploy

# 2) 세션 안에서 오래 걸리는 작업 실행
./gradlew bootJar
tail -f /var/log/nginx/access.log

# 3) Ctrl+b 를 누른 뒤 d → 세션에서 빠져나옴 (작업은 계속 실행)
#    이 상태에서는 SSH 접속이 끊겨도 괜찮음

# 4) 나중에 다시 접속해서 이어 보기
ssh ubuntu@203.0.113.10
tmux ls                           # deploy: 1 windows ...
tmux attach -t deploy

# 끝난 세션 정리
tmux kill-session -t deploy
```

## 주의할 점

- `tmux` 안에서 `Ctrl+b` 다음 `[`를 누르면 스크롤 모드로 지난 출력을 볼 수 있습니다. `q`로 빠져나옵니다.
- 서버 프로그램을 계속 띄워 두는 용도라면 `tmux`보다 `systemctl` 서비스로 등록하는 편이 안정적입니다. 서버가 재부팅되면 `tmux` 세션은 사라집니다.
