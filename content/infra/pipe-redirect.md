---
name: 파이프 · 리다이렉션
cat: 터미널 기초
kind: 문법
order: 50
aliases:
  - 파이프
  - 리다이렉션
  - 출력 저장
  - '>>'
  - 2>&1
  - 표준 에러
  - /dev/null
  - tee
summary: 파이프(`|`)는 앞 명령의 출력을 뒤 명령의 입력으로 넘기고, 리다이렉션(`>`, `>>`)은 출력을 파일로 저장합니다. 작은 명령을 이어 붙여 원하는 결과를 만드는 터미널 작업의 핵심 문법입니다.
related:
  - find-grep
  - access-log-ip
  - background-jobs
doc: 'https://zsh.sourceforge.io/Doc/Release/Redirection.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| a \| b | `파이프` | a의 출력을 b의 입력으로 |
| > 파일 | `리다이렉션` | 출력을 파일에 저장 (덮어쓰기) |
| >> 파일 | `리다이렉션` | 파일 끝에 이어 쓰기 |
| 2> 파일 | `리다이렉션` | 에러 출력만 저장 |
| > 파일 2>&1 | `리다이렉션` | 일반 출력과 에러를 함께 저장 |
| > /dev/null | `리다이렉션` | 출력 버리기 |
| tee 파일 | `명령` | 화면에도 보이고 파일에도 저장 |
| && · \|\| · ; | `연결` | 성공하면 다음 · 실패하면 다음 · 결과와 상관없이 다음 |

## 사용 예시

```bash
# 파이프: 출력을 다음 명령으로
ps aux | grep java                     # 실행 중인 java 프로세스만
grep ERROR app.log | wc -l             # ERROR 줄 개수
ls -l | sort -k5 -n | tail -n 3        # 크기가 큰 파일 3개

# 리다이렉션: 파일로 저장
echo "hello" > note.txt                # 덮어쓰기
echo "world" >> note.txt               # 이어 쓰기
./gradlew build > build.log 2>&1       # 출력과 에러 모두 파일로
curl -s https://example.com > /dev/null && echo "접속 성공"

# tee: 화면에 보면서 파일에도 저장
./gradlew test 2>&1 | tee test.log

# 명령 연결
./gradlew build && java -jar build/libs/app.jar   # 빌드가 성공했을 때만 실행
mkdir -p logs || echo "폴더 생성 실패"
```

## 주의할 점

- `>`는 기존 파일을 묻지 않고 비웁니다. 기존 내용에 추가하려면 `>>`를 씁니다.
- `sudo echo "x" > /etc/파일`은 권한 오류가 납니다. 리다이렉션은 sudo가 아니라 현재 셸이 처리하기 때문입니다. `echo "x" | sudo tee /etc/파일`처럼 씁니다.
