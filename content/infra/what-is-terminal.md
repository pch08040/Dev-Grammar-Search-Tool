---
name: 터미널 · 셸 · 명령어
cat: 개념
kind: 개념
order: 10
aliases:
  - 터미널이란
  - 셸
  - shell
  - zsh
  - bash
  - CLI
  - 명령줄
  - 콘솔
summary: 터미널은 글자로 컴퓨터에 명령을 내리는 창이고, 셸(`zsh`, `bash`)은 입력한 명령을 해석해 실행하는 프로그램입니다. 서버에는 화면이 없는 경우가 많아서 서버 관리는 대부분 터미널 명령으로 합니다.
related:
  - macos-vs-linux
  - navigation
  - env-path
  - what-is-server
doc: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Environment_setup/Command_line'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| 터미널 | `앱` | 명령을 입력하는 창. macOS 터미널, iTerm2, VS Code 터미널 |
| 셸 | `프로그램` | 명령을 해석·실행. macOS 기본은 `zsh`, Linux 서버는 보통 `bash` |
| 프롬프트 | `표시` | 입력을 기다리는 표시. `%`는 zsh, `$`는 bash 일반 사용자, `#`은 root(관리자) |
| 명령어 | `프로그램` | `ls`, `git` 같은 실행 파일 또는 `cd` 같은 셸 내장 기능 |
| 옵션 · 인자 | `문법` | `ls -l /tmp`에서 `-l`은 옵션, `/tmp`는 인자 |
| man | `명령어` | `man ls`로 명령 설명서 보기 (`q`로 종료) |

## 사용 예시

```bash
# 지금 쓰는 셸 확인
echo $SHELL            # /bin/zsh (macOS 기본)

# 명령어는 대부분 실행 파일. 어디에 있는지 확인
which git              # /usr/bin/git
type cd                # cd is a shell builtin (셸 내장 명령)

# 명령 구조: 명령어 [옵션] [인자]
ls -l /tmp             # /tmp 폴더를 자세히(-l) 보기

# 운영체제 확인
uname -s               # Darwin(macOS) 또는 Linux

# 설명서 보기 (스페이스: 다음 페이지, q: 종료)
man ls
ls --help              # Linux(GNU)의 짧은 도움말. macOS의 ls는 지원하지 않음

# 직전 명령이 성공했는지 (0이면 성공)
echo $?

# 실행 중인 명령 멈추기: Ctrl + C
# 화면 지우기: Ctrl + L 또는 clear
```

## 주의할 점

- 명령이 아무것도 출력하지 않으면 대부분 성공한 것입니다. 실패하면 오류 메시지가 나오고, `echo $?` 값이 0이 아닙니다.
- `command not found`가 나오면 프로그램이 설치되지 않았거나 `PATH`에 없는 것입니다.
- 개발 서버 실행, 실시간 로그 보기처럼 끝나지 않는 명령은 `Ctrl + C`로 멈춥니다.
