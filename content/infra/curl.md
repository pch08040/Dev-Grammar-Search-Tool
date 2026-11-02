---
name: curl
cat: 네트워크 · IP
kind: 명령어
order: 50
aliases:
  - API 호출
  - 서버 응답 확인
  - HTTP 요청
  - 헤더 확인
  - POST 요청
  - 응답 시간 측정
summary: 터미널에서 HTTP 요청을 보내고 응답을 받습니다. 브라우저나 Postman 없이 API를 호출하거나, 서버가 살아 있는지와 응답 코드를 확인할 때 씁니다.
signature: 'curl [옵션] URL'
related:
  - nc-port-check
  - ping
  - spring/rest-client
doc: 'https://curl.se/docs/manpage.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| -I | `옵션` | 응답 헤더만 (상태 코드 확인) |
| -v | `옵션` | 요청 · 응답 과정 전체 출력 (디버깅) |
| -X POST -d '...' | `옵션` | 메서드와 본문 지정 |
| -H '이름: 값' | `옵션` | 요청 헤더 추가 |
| -L | `옵션` | 리다이렉트를 따라감 |
| -o 파일 · -s | `옵션` | 결과를 파일로 저장 · 진행 표시 숨김 |
| -w '%{http_code}' | `옵션` | 상태 코드 · 시간 등 원하는 값만 출력 |

## 사용 예시

```bash
# 서버가 살아 있나 (헤더만)
curl -I https://example.com
# HTTP/2 200
# content-type: text/html; charset=utf-8

# 상태 코드와 응답 시간만
curl -s -o /dev/null -w 'code=%{http_code} time=%{time_total}s\n' https://example.com
# code=200 time=0.389s

# GET API (로컬 Spring 서버)
curl -s http://localhost:8080/api/users/1

# POST JSON + 인증 헤더
curl -s -X POST http://localhost:8080/api/users \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name":"Kim","email":"kim@example.com"}'

# 응답이 JSON이면 jq로 보기 좋게 (brew install jq)
curl -s http://localhost:8080/api/users | jq '.[0]'

# 파일 다운로드 (리다이렉트 따라감)
curl -L -o app.zip https://example.com/download
```

## 주의할 점

- JSON 본문은 작은따옴표로 감싸야 셸이 따옴표와 `$`를 해석하지 않습니다. 변수를 넣을 헤더만 큰따옴표로 감쌉니다.
- 인증서 오류를 무시하는 `-k`는 테스트용입니다. 운영 서버에서 이 옵션이 필요하다면 인증서 설정을 고쳐야 합니다.
