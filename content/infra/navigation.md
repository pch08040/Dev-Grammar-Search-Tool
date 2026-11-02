---
name: pwd · cd · ls
cat: 터미널 기초
kind: 명령어
order: 10
aliases:
  - 폴더 이동
  - 현재 위치
  - 파일 목록
  - 디렉터리
  - 숨김 파일
  - 경로
summary: '`pwd`는 현재 위치, `cd`는 폴더 이동, `ls`는 폴더 안의 파일 목록을 보여 줍니다. 터미널 작업은 항상 지금 어느 폴더에 있는지 확인하는 것에서 시작합니다.'
related:
  - file-commands
  - find-grep
  - what-is-terminal
doc: 'https://man7.org/linux/man-pages/man1/ls.1.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| / | `경로` | 최상위(루트) 폴더 |
| ~ | `경로` | 내 홈 폴더. macOS는 `/Users/이름`, Linux는 `/home/이름` |
| . · .. | `경로` | 현재 폴더 · 상위 폴더 |
| 절대 경로 | `경로` | `/`로 시작. 어디서 실행해도 같은 위치 |
| 상대 경로 | `경로` | 현재 폴더 기준. 예: `src/app` |
| cd - | `명령` | 직전 폴더로 돌아가기 |

## 사용 예시

```bash
pwd                       # 현재 위치: /Users/me/Desktop/project

cd ~/Desktop/project      # 홈 기준 경로로 이동
cd devref/src             # 상대 경로로 이동
cd ..                     # 상위 폴더로
cd -                      # 직전 폴더로 돌아가기
cd                        # 경로 없이 쓰면 홈 폴더로

ls                        # 파일 목록
ls -l                     # 자세히: 권한, 소유자, 크기, 수정 시각
ls -la                    # 숨김 파일(.env, .git 등)까지
ls -lh                    # 크기를 1.5K, 20M처럼 읽기 쉽게
ls -lt                    # 최근 수정한 순서
ls -d */                  # 폴더만

# 공백이 있는 경로
cd "$HOME/Desktop/My Project"   # 따옴표로 감싸기
cd ~/Desktop/My\ Project        # 또는 공백 앞에 \
```

## 주의할 점

- 따옴표 안의 `~`는 홈 폴더로 바뀌지 않습니다. 따옴표를 쓸 때는 `"$HOME/..."`처럼 씁니다.
- `Tab` 키를 누르면 파일·폴더 이름이 자동 완성되어 오타를 줄일 수 있습니다.
- `.`으로 시작하는 파일은 숨김 파일이라 `ls`에 보이지 않습니다. `ls -a`로 확인합니다.
