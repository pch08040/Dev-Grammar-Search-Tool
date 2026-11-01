---
name: '@RestControllerAdvice'
cat: 트랜잭션 · 예외
kind: 어노테이션
order: 20
aliases:
  - 전역 예외 처리
  - '@ExceptionHandler'
  - 에러 응답
  - ErrorResponse
  - '400'
  - '404'
summary: 모든 컨트롤러의 예외를 한곳에서 받아 일관된 에러 응답으로 바꿉니다.
related:
  - request-body-valid
  - response-entity
doc: >-
  https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-advice.html
---

## 사용 예시

```java
public record ErrorResponse(String code, String message) {}

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(NotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse("NOT_FOUND", e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValid(MethodArgumentNotValidException e) {
        String msg = e.getBindingResult().getFieldErrors().stream()
                .map(f -> f.getField() + ": " + f.getDefaultMessage())
                .collect(Collectors.joining(", "));
        return ResponseEntity.badRequest().body(new ErrorResponse("INVALID", msg));
    }
}
```
