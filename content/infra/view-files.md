---
name: cat · less · head · tail
cat: 터미널 기초
kind: 명령어
order: 30
aliases:
  - 파일 내용 보기
  - 로그 보기
  - 앞부분 보기
  - 끝부분 보기
  - 줄 수 세기
  - wc
summary: 파일 내용을 터미널에서 보는 명령입니다. 짧은 파일은 `cat`, 긴 파일은 `less`, 앞부분은 `head`, 끝부분(최근 로그)은 `tail`로 봅니다.
related:
  - tail-follow
  - grep-logs
  - find-grep
doc: 'https://man7.org/linux/man-pages/man1/less.1.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| cat 파일 | `명령` | 파일 전체 출력 |
| less 파일 | `명령` | 페이지 단위로 보기. `/단어` 검색, `n` 다음 결과, `G` 끝으로, `q` 종료 |
| head -n 20 파일 | `명령` | 앞 20줄 |
| tail -n 50 파일 | `명령` | 끝 50줄 |
| tail -f 파일 | `명령` | 파일 끝에 추가되는 내용을 계속 보기 (로그) |
| wc -l 파일 | `명령` | 줄 수 세기 |

## 사용 예시

```bash
cat application.yml                 # 짧은 파일 전체 보기
cat -n application.yml              # 줄 번호와 함께

less /var/log/syslog                # 긴 파일을 페이지로 보기
# less 안에서: /ERROR 검색 → n 다음 결과, G 맨 끝, g 맨 처음, q 종료

head -n 20 app.log                  # 앞 20줄
tail -n 100 app.log                 # 마지막 100줄
tail -f app.log                     # 새로 쌓이는 로그 계속 보기 (Ctrl+C로 종료)

wc -l app.log                       # 줄 수
ls -lh app.log                      # 파일 크기

# 압축된 지난 로그(.gz)는 풀지 않고 보기 (macOS, Linux 모두)
zcat app.log.1.gz | tail -n 50
```

## 주의할 점

- 수백 MB짜리 로그를 `cat`으로 열면 터미널이 한참 멈춥니다. 큰 파일은 `less`나 `tail`로 봅니다.
- `less`에서 빠져나오는 키는 `q`입니다.
