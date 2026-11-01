---
name: '@RestController · @GetMapping'
cat: 웹 API
kind: 어노테이션
order: 10
aliases:
  - 컨트롤러
  - API
  - '@PostMapping'
  - '@PutMapping'
  - '@DeleteMapping'
  - '@RequestMapping'
  - REST
summary: HTTP 요청을 받아 JSON으로 응답하는 컨트롤러와 매핑 어노테이션입니다.
related:
  - request-body-valid
  - response-entity
  - service
doc: >-
  https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller.html
---

## 사용 예시

```java
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{id}")                       // GET /api/users/1
    public UserResponse get(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @GetMapping                                // GET /api/users?keyword=kim&page=0
    public List<UserResponse> search(@RequestParam(required = false) String keyword,
                                     @RequestParam(defaultValue = "0") int page) {
        return userService.search(keyword, page);
    }

    @PostMapping                               // POST /api/users
    public ResponseEntity<Long> create(@Valid @RequestBody CreateUserRequest req) {
        Long id = userService.create(req);
        return ResponseEntity.created(URI.create("/api/users/" + id)).body(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```
