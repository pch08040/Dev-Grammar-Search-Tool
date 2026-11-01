---
name: '@PathVariable · @RequestParam'
cat: 웹 API
kind: 어노테이션
order: 40
aliases:
  - 경로 변수
  - 쿼리 파라미터
  - URL 파라미터
  - query string
  - defaultValue
  - required
  - '@ModelAttribute'
summary: 'URL 경로의 값(`/users/{id}`)과 쿼리 문자열의 값(`?keyword=kim`)을 메서드 파라미터로 받습니다.'
related:
  - rest-controller
  - request-body-valid
  - pageable
doc: 'https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestparam.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| value / name | `String` | URL·쿼리의 이름. 파라미터 이름과 같으면 생략 가능 |
| required | `boolean` | 필수 여부 (기본 true, 없으면 400) |
| defaultValue | `String` | 값이 없을 때 기본값. 지정하면 required=false가 됨 |

## 사용 예시

```java
@RestController
@RequestMapping("/api/users")
public class UserController {

    // GET /api/users/3/orders/15
    @GetMapping("/{userId}/orders/{orderId}")
    public OrderResponse order(@PathVariable Long userId, @PathVariable Long orderId) {
        return orderService.find(userId, orderId);
    }

    // GET /api/users?keyword=kim&page=0&tags=a&tags=b&from=2026-01-01
    @GetMapping
    public List<UserResponse> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(required = false) List<String> tags,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from) {
        return userService.search(keyword, page, tags, from);
    }

    // 파라미터가 많으면 객체로 묶어서 받기 (@ModelAttribute는 생략 가능)
    public record UserSearchCondition(String keyword, String status, Integer minAge) {}

    @GetMapping("/search")
    public List<UserResponse> searchByCondition(UserSearchCondition condition) {
        return userService.search(condition);
    }
}
```

## 주의할 점

- `@PathVariable Long id`처럼 이름을 생략하려면 컴파일 시 `-parameters` 옵션이 필요합니다. Spring Boot Gradle·Maven 플러그인은 자동으로 켜 주지만, 직접 빌드 설정을 바꿨다면 이름을 명시합니다.
- 필수 파라미터가 없거나 타입이 맞지 않으면(`?page=abc`) 400 오류가 납니다.
