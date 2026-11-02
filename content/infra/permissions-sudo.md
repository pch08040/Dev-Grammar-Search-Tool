---
name: chmod · chown · sudo
cat: 터미널 기초
kind: 명령어
order: 60
aliases:
  - 권한 거부
  - Permission denied
  - 실행 권한
  - 관리자 권한
  - root
  - 소유자 변경
  - '755'
summary: 파일마다 소유자와 읽기(r)·쓰기(w)·실행(x) 권한이 있습니다. `chmod`로 권한을, `chown`으로 소유자를 바꾸고, 관리자 권한이 필요한 명령은 앞에 `sudo`를 붙입니다.
related:
  - file-commands
  - ssh-keygen
  - navigation
doc: 'https://man7.org/linux/man-pages/man1/chmod.1.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| -rwxr-xr-x | `표기` | 소유자 rwx / 그룹 r-x / 그 외 r-x |
| r=4 · w=2 · x=1 | `숫자` | 더해서 표현. 7=rwx, 6=rw-, 5=r-x, 4=r-- |
| 755 | `권한` | 실행 파일·폴더 (소유자만 쓰기 가능) |
| 644 | `권한` | 일반 파일 |
| 600 | `권한` | 비밀 파일 (SSH 키, .env) |
| sudo 명령 | `명령` | 관리자(root) 권한으로 실행 |

## 사용 예시

```bash
ls -l deploy.sh              # -rw-r--r--  1 me staff ... deploy.sh (실행 권한 없음)

./deploy.sh                  # zsh: permission denied: ./deploy.sh
chmod +x deploy.sh           # 실행 권한 추가
./deploy.sh                  # 이제 실행됨

chmod 644 application.yml    # 일반 파일
chmod 600 ~/.ssh/id_ed25519  # 비밀 키는 나만 읽기
chmod -R 755 public/         # 폴더 전체 (-R: 하위 포함)

# 소유자 변경 (보통 sudo 필요)
sudo chown ubuntu:ubuntu /opt/myapp/app.jar
sudo chown -R www-data:www-data /var/www/html

# 관리자 권한
whoami                       # 현재 사용자
sudo apt update              # Linux 패키지 목록 갱신 (관리자 권한 필요)
sudo -i                      # root 셸로 전환 (exit로 복귀)
```

## 주의할 점

- `Permission denied`가 나면 바로 `sudo`나 `chmod 777`을 붙이지 말고, `ls -l`로 소유자와 권한부터 확인합니다. `777`은 누구나 수정할 수 있게 열어 버려 보안 사고로 이어집니다.
- SSH 비밀 키 권한이 너무 열려 있으면(`644` 등) ssh가 키 사용을 거부합니다. `chmod 600`으로 맞춥니다.
- `sudo`로 실행한 명령은 시스템 파일도 지울 수 있습니다. 실행 전에 명령을 한 번 더 확인합니다.
