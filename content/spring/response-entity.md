---
name: ResponseEntity
cat: 웹 API
kind: 클래스
order: 30
aliases:
  - 응답
  - 상태 코드
  - HTTP status
  - '201'
  - '204'
  - created
  - noContent
  - 헤더
summary: 응답 본문과 함께 HTTP 상태 코드와 헤더를 직접 지정합니다.
related:
  - rest-controller
  - rest-controller-advice
doc: >-
  https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/http/ResponseEntity.html
---

## 사용 예시

```java
return ResponseEntity.ok(body);                         // 200
return ResponseEntity.status(HttpStatus.CREATED).body(dto); // 201
return ResponseEntity.created(URI.create("/api/users/" + id)).build(); // 201 + Location
return ResponseEntity.noContent().build();               // 204
return ResponseEntity.badRequest().body(error);          // 400
return ResponseEntity.notFound().build();                // 404

return ResponseEntity.ok()
        .header(HttpHeaders.CACHE_CONTROL, "no-cache")
        .body(body);
```
