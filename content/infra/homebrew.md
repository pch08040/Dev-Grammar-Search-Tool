---
name: Homebrew (brew)
cat: 터미널 기초
kind: 패키지
order: 90
aliases:
  - brew
  - 패키지 설치
  - 프로그램 설치
  - 맥 패키지 관리자
  - brew install
  - brew services
  - cask
summary: Homebrew는 macOS용 패키지 관리자입니다. `brew install`로 개발 도구(git, node, openjdk 등)를 설치하고 업데이트합니다. Linux 서버에서는 같은 역할을 `apt`(Ubuntu)가 합니다.
related:
  - env-path
  - macos-vs-linux
  - docker-basics
doc: 'https://docs.brew.sh/'
---

## 사용 예시

```bash
# 설치는 공식 사이트(https://brew.sh)의 한 줄 명령을 그대로 복사해 실행

brew --version
brew search redis                          # 패키지 찾기
brew install redis                         # 명령줄 도구 설치
brew install --cask visual-studio-code     # GUI 앱 설치 (cask)

brew list                                  # 설치한 목록
brew upgrade                               # 전부 업데이트
brew upgrade node                          # 하나만 업데이트
brew uninstall redis                       # 삭제
brew cleanup                               # 예전 버전 정리

# 서비스(백그라운드 실행) 관리
brew services start redis
brew services list
brew services stop redis

# Linux(Ubuntu) 서버에서는 apt
sudo apt update && sudo apt install -y redis-server
```

## 주의할 점

- Apple Silicon 맥은 `/opt/homebrew`, Intel 맥은 `/usr/local`에 설치됩니다. 설치 후 `brew` 명령을 못 찾으면 설치 마지막에 안내되는 `PATH` 설정 명령을 실행합니다.
- `brew services`로 켜 둔 서비스(DB, Redis 등)는 재부팅 후에도 계속 실행되어 메모리를 씁니다. 쓰지 않으면 `brew services stop`으로 끕니다.
