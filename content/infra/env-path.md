---
name: 환경 변수 · PATH · .zshrc
cat: 터미널 기초
kind: 설정
order: 70
aliases:
  - 환경 변수
  - PATH
  - command not found
  - export
  - JAVA_HOME
  - '.zshrc'
  - '.bashrc'
  - 셸 설정 파일
summary: 환경 변수는 셸과 프로그램이 함께 쓰는 설정 값이고, 그중 `PATH`는 명령어를 찾을 폴더 목록입니다. 터미널을 열 때마다 적용하려면 `~/.zshrc`(macOS) 또는 `~/.bashrc`(Linux)에 적어 둡니다.
related:
  - what-is-terminal
  - homebrew
  - spring-boot-jar
doc: 'https://zsh.sourceforge.io/Doc/Release/Files.html'
---

## 사용 예시

```bash
echo $PATH                         # 명령어를 찾는 폴더 목록 (콜론으로 구분)
echo $PATH | tr ':' '\n'           # 한 줄에 하나씩 보기
printenv                           # 모든 환경 변수
echo $HOME $USER $SHELL

# 현재 터미널에서만 설정
export SPRING_PROFILES_ACTIVE=dev
export JAVA_HOME=$(/usr/libexec/java_home -v 21)   # macOS: 설치된 JDK 21 경로

# 한 명령에만 적용
SERVER_PORT=9090 java -jar app.jar

# 터미널을 열 때마다 적용: 설정 파일 끝에 추가
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc   # macOS(zsh)
source ~/.zshrc                    # 터미널을 다시 열지 않고 바로 적용
# Linux(bash)는 ~/.bashrc 에 추가

which java                         # 실제로 어느 java가 실행되는지
```

## 주의할 점

- `command not found`가 나오면 프로그램이 설치된 폴더가 `PATH`에 없는 경우가 많습니다. 설치 위치를 확인하고 `.zshrc`에 `PATH`를 추가합니다.
- `.zshrc`를 고친 뒤에는 `source ~/.zshrc`를 실행하거나 터미널을 새로 열어야 반영됩니다.
- 비밀번호나 API 키를 `.zshrc`에 적으면 화면 공유나 백업 때 노출될 수 있습니다. 서버에서는 서비스 설정 파일이나 비밀 관리 도구를 씁니다.
