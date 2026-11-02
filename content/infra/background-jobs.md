---
name: '& · jobs · fg · nohup'
cat: 프로세스 · 시스템
kind: 문법
order: 50
aliases:
  - 백그라운드 실행
  - 터미널 닫아도 실행
  - nohup
  - Ctrl+Z
  - disown
  - 서버 계속 띄우기
summary: 명령 뒤에 `&`를 붙이면 백그라운드에서 실행되어 터미널을 계속 쓸 수 있습니다. 터미널을 닫아도 계속 돌아야 하면 `nohup`으로 실행합니다.
related:
  - kill-signals
  - ps-pgrep
  - lsof-port
doc: 'https://ss64.com/bash/nohup.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| 명령 & | `문법` | 백그라운드 실행 |
| Ctrl+Z | `키` | 실행 중인 작업 일시 정지 |
| jobs | `명령어` | 현재 터미널의 작업 목록 |
| fg %1 · bg %1 | `명령어` | 1번 작업을 앞으로 · 백그라운드에서 계속 |
| $! | `변수` | 방금 백그라운드로 띄운 작업의 PID |
| nohup 명령 & | `명령어` | 터미널이 닫혀도 계속 실행 |

## 사용 예시

```bash
# 개발 서버를 백그라운드로 띄우고 터미널은 계속 사용
npm run dev &
echo $!          # 방금 띄운 프로세스의 PID

# 작업 목록 · 앞으로 가져오기
jobs             # [1]  + running    npm run dev
fg %1            # 다시 앞으로 (Ctrl+C로 종료 가능)

# 실행 중인 걸 잠깐 멈추고 백그라운드로 보내기
# (실행 중에 Ctrl+Z 누른 뒤)
bg %1

# 터미널을 닫아도 계속 실행 + 로그는 파일로
nohup java -jar app.jar > app.log 2>&1 &
echo $! > app.pid    # 나중에 종료할 때 쓰려고 PID 저장

# 나중에 종료
kill "$(cat app.pid)"
```

## 주의할 점

- `&`만 붙인 작업은 터미널 창을 닫으면 함께 종료될 수 있습니다. 계속 실행해야 하면 `nohup`이나 `tmux`를 쓰고, 서버라면 `systemctl` 서비스로 등록하는 것이 정석입니다.
- 백그라운드로 띄운 개발 서버를 잊어버리면 며칠씩 메모리를 차지합니다. 작업이 끝나면 `jobs`나 `lsof -i :포트`로 확인하고 종료합니다.
