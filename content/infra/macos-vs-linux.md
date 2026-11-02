---
name: macOS 터미널과 Linux 서버의 차이
cat: 개념
kind: 개념
order: 60
aliases:
  - 맥 리눅스 차이
  - BSD
  - GNU
  - Ubuntu
  - 우분투
  - apt
  - illegal option
summary: macOS와 Linux는 같은 유닉스 계열이라 명령이 비슷하지만, macOS는 BSD 버전, Linux는 GNU 버전 도구를 써서 옵션이 다를 때가 있습니다. 서버는 대부분 Linux(Ubuntu 등)이므로 차이를 알아 두면 좋습니다.
related:
  - what-is-terminal
  - homebrew
  - systemctl
  - docker-basics
doc: 'https://ss64.com/mac/'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| 기본 셸 | `zsh · bash` | macOS는 `zsh`, Ubuntu 서버는 보통 `bash` |
| 패키지 설치 | `brew · apt` | macOS는 `brew install`, Ubuntu는 `sudo apt install` |
| 서비스 관리 | `launchctl · systemctl` | macOS는 `launchctl`, Linux는 `systemctl` |
| 시스템 로그 | `log · journalctl` | macOS는 `log show`, Linux는 `journalctl`과 `/var/log` |
| 포트 확인 | `lsof · ss` | macOS는 `lsof -iTCP`, Linux는 `ss -tlnp` |
| 메모리 확인 | `vm_stat · free` | macOS는 `vm_stat`, `top`, Linux는 `free -h` |
| IP 확인 | `ipconfig · ip` | macOS는 `ipconfig getifaddr en0`, Linux는 `ip addr`, `hostname -I` |

## 사용 예시

```bash
# 운영체제 확인
uname -s                       # Darwin = macOS, Linux = 리눅스
sw_vers                        # macOS 버전
cat /etc/os-release            # Linux 배포판과 버전 (예: Ubuntu 24.04)

# sed로 파일 직접 수정: 옵션 형태가 다름
sed -i '' 's/foo/bar/' a.txt   # macOS(BSD): -i 뒤에 빈 문자열 필요
sed -i 's/foo/bar/' a.txt      # Linux(GNU)

# 날짜 계산
date -v-1d +%F                 # macOS: 어제 날짜
date -d 'yesterday' +%F        # Linux

# 도움말
man ls                         # 둘 다 가능
ls --help                      # Linux(GNU)만 가능

# macOS에서 GNU 도구를 쓰고 싶을 때
brew install coreutils gnu-sed # gls, gsed처럼 앞에 g가 붙은 이름으로 설치됨
```

## 주의할 점

- 인터넷에서 찾은 명령이 macOS에서 `illegal option`이나 `unrecognized option` 오류를 내면 Linux(GNU)용 옵션인 경우가 많습니다.
- 서버용 스크립트는 서버와 같은 Linux 환경에서 테스트합니다. Docker로 Ubuntu 컨테이너를 띄워 연습할 수 있습니다.
