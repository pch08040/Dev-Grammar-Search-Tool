---
name: '@RequestBody · @Valid'
cat: 웹 API
kind: 어노테이션
order: 20
aliases:
  - 요청 본문
  - DTO
  - 유효성 검사
  - validation
  - '@NotBlank'
  - '@Email'
  - record
  - '@PathVariable'
  - '@RequestParam'
summary: 'JSON 요청 본문을 DTO로 받고, 필드 제약 조건을 검사합니다.'
related:
  - rest-controller
  - rest-controller-advice
doc: >-
  https://docs.spring.io/spring-framework/reference/core/validation/beanvalidation.html
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| @NotNull | `제약` | null 불가 |
| @NotBlank | `제약` | null·빈 문자열·공백만 불가 (문자열) |
| @Size(min, max) | `제약` | 길이·개수 범위 |
| @Email | `제약` | 이메일 형식 |
| @Min / @Max | `제약` | 숫자 범위 |

## 사용 예시

```java
// build.gradle
// implementation 'org.springframework.boot:spring-boot-starter-validation'

public record CreateUserRequest(
        @NotBlank @Size(max = 20) String name,
        @NotBlank @Email String email,
        @Min(0) Integer age
) {}

@PostMapping("/api/users")
public ResponseEntity<Long> create(@Valid @RequestBody CreateUserRequest req) {
    // 검증 실패 시 MethodArgumentNotValidException → 400
    return ResponseEntity.ok(userService.create(req));
}
```

## 주의할 점

- @Valid를 빼먹으면 제약 어노테이션이 있어도 검사하지 않습니다.
- 검증 실패 응답 형식은 @RestControllerAdvice에서 통일합니다.
