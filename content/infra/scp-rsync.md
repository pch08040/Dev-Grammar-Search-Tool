---
name: scp · rsync (파일 전송)
cat: 원격 서버 · SSH
kind: 명령어
order: 40
aliases:
  - 파일 업로드
  - 파일 다운로드
  - 서버로 복사
  - 배포 파일 전송
  - 폴더 동기화
  - 로그 내려받기
signature: 'scp 원본 사용자@호스트:대상경로'
summary: '`scp`는 파일을 서버로 한 번 복사하고, `rsync`는 바뀐 부분만 전송해 폴더를 동기화합니다. 둘 다 SSH 연결을 그대로 사용합니다.'
related:
  - ssh-config
  - ssh
  - spring-boot-jar
doc: 'https://man.openbsd.org/scp'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| scp -r | `옵션` | 폴더를 통째로 복사 |
| scp -P 포트 | `옵션` | 포트 지정 (대문자 P) |
| rsync -a | `옵션` | 권한과 시간을 유지하며 하위 폴더까지 |
| rsync -v · -z | `옵션` | 진행 내용 출력 · 압축 전송 |
| rsync -n | `옵션` | 실제로 바꾸지 않고 미리보기 (dry run) |
| rsync --delete | `옵션` | 원본에 없는 파일은 대상에서 삭제 |

## 사용 예시

```bash
# 내 맥 → 서버: 빌드한 jar 업로드
scp build/libs/app.jar ubuntu@203.0.113.10:/home/ubuntu/app/

# 서버 → 내 맥: 로그 파일 내려받기
scp ubuntu@203.0.113.10:/var/log/nginx/access.log ./logs/

# 폴더 통째로 (-r), 포트가 22가 아니면 대문자 -P
scp -r -P 2222 ./config ubuntu@203.0.113.10:/home/ubuntu/

# rsync: 바뀐 파일만 전송 (웹 빌드 결과 배포)
rsync -avz ./dist/ ubuntu@203.0.113.10:/var/www/html/

# 무엇이 바뀌는지 먼저 미리보기 (-n)
rsync -avzn --delete ./dist/ ubuntu@203.0.113.10:/var/www/html/

# 원본에 없는 파일은 서버에서도 삭제 (정확히 같은 상태로 맞춤)
rsync -avz --delete ./dist/ ubuntu@203.0.113.10:/var/www/html/
```

## 주의할 점

- `rsync`에서 원본 경로 끝의 `/`는 의미가 다릅니다. `./dist/`는 폴더 안의 내용을, `./dist`는 `dist` 폴더 자체를 대상 아래로 복사합니다.
- `--delete`는 대상의 파일을 지우므로 먼저 `-n`으로 미리보기를 확인합니다.
- 최근 macOS의 기본 `rsync`는 `openrsync`라서 일부 옵션이 GNU rsync와 다를 수 있습니다. 문제가 있으면 `brew install rsync`로 GNU rsync를 설치합니다.
