---
name: '사용자 정의 예외 · ErrorCode'
cat: 트랜잭션 · 예외
kind: 패턴
order: 30
aliases:
  - 커스텀 예외
  - 에러 코드
  - BusinessException
  - 예외 처리 패턴
  - 에러 응답 통일
  - RuntimeException
summary: '에러 코드를 `enum`으로 모으고, 하나의 비즈니스 예외로 던진 뒤 `@RestControllerAdvice`에서 일관된 JSON으로 응답하는 패턴입니다.'
related:
  - rest-controller-advice
  - transactional
  - response-status
  - exceptions
doc: 'https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-advice.html'
---

## 사용 예시

```java
@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "U001", "사용자를 찾을 수 없습니다."),
    DUPLICATE_EMAIL(HttpStatus.CONFLICT, "U002", "이미 사용 중인 이메일입니다."),
    INVALID_INPUT(HttpStatus.BAD_REQUEST, "C001", "입력값이 올바르지 않습니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;
}

@Getter
public class BusinessException extends RuntimeException {   // 언체크 예외 → 트랜잭션 롤백
    private final ErrorCode errorCode;

    public BusinessException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}

public record ErrorResponse(String code, String message) {}

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handle(BusinessException e) {
        ErrorCode ec = e.getErrorCode();
        return ResponseEntity.status(ec.getStatus())
                .body(new ErrorResponse(ec.getCode(), ec.getMessage()));
    }
}

// 사용
if (userRepository.existsByEmail(req.email())) {
    throw new BusinessException(ErrorCode.DUPLICATE_EMAIL);
}
```

## 주의할 점

- 체크 예외(`Exception` 상속)는 `@Transactional`에서 기본적으로 롤백되지 않습니다. 비즈니스 예외는 `RuntimeException`을 상속합니다.
- 에러 응답에 스택 트레이스나 SQL 같은 내부 정보를 넣지 않습니다. 원인은 서버 로그로만 남깁니다.
