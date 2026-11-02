---
name: 단축키 · history
cat: 터미널 기초
kind: 단축키
order: 80
aliases:
  - 터미널 단축키
  - 이전 명령
  - 명령 기록
  - Ctrl+R
  - Ctrl+C
  - 자동 완성
  - 화면 지우기
  - alias
summary: 터미널은 단축키를 알면 훨씬 빨라집니다. 실행 중인 명령 중단(`Ctrl+C`), 이전 명령 검색(`Ctrl+R`), 자동 완성(`Tab`)은 꼭 알아 두면 좋습니다.
related:
  - what-is-terminal
  - env-path
  - kill-signals
doc: 'https://zsh.sourceforge.io/Doc/Release/Zsh-Line-Editor.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| Ctrl+C | `단축키` | 실행 중인 명령 중단 |
| Ctrl+R | `단축키` | 이전 명령 검색 (반복해서 누르면 더 이전 결과) |
| Tab | `단축키` | 파일·명령 이름 자동 완성 |
| ↑ · ↓ | `단축키` | 이전 · 다음 명령 |
| Ctrl+A · Ctrl+E | `단축키` | 줄 맨 앞 · 맨 끝으로 이동 |
| Ctrl+U · Ctrl+W | `단축키` | 입력 줄 지우기 · 앞 단어 지우기 |
| Ctrl+L | `단축키` | 화면 지우기 (`clear`와 같음) |
| Ctrl+D | `단축키` | 셸 또는 ssh 접속 종료 (입력이 비어 있을 때) |

## 사용 예시

```bash
history                  # 실행한 명령 목록 (zsh는 기본으로 최근 16개만)
history 1                # zsh에서 전체 기록 보기
history | grep ssh       # 예전에 쓴 ssh 명령 찾기
!!                       # 바로 이전 명령 다시 실행
sudo !!                  # 이전 명령을 sudo로 다시 실행 (권한 오류 뒤에 자주 씀)
!123                     # 기록의 123번 명령 다시 실행

# Ctrl+R 사용법
# 1) Ctrl+R 누르고 bootRun 입력 → 가장 최근에 일치한 명령 표시
# 2) Ctrl+R 다시 누르면 더 이전 결과
# 3) Enter 실행, 방향키로 수정, Ctrl+C 취소

# 자주 쓰는 긴 명령에 별명 붙이기 (~/.zshrc에 저장하면 계속 사용)
alias ll='ls -lah'
alias gs='git status'
```

## 주의할 점

- macOS 터미널 앱에서는 `Cmd+K`로도 화면을 지울 수 있습니다.
- 비밀번호를 명령에 직접 넣으면(`mysql -p비밀번호`) history에 그대로 남습니다. 비밀번호는 실행 후 나오는 입력 프롬프트로 입력합니다.
