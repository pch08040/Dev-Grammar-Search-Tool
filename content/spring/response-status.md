---
name: '@ResponseStatus'
cat: 웹 API
kind: 어노테이션
order: 100
aliases:
  - 응답 상태 코드
  - HTTP status
  - 201 Created
  - 204 No Content
  - HttpStatus
  - 예외 상태 코드
summary: '컨트롤러 메서드나 예외 클래스에 HTTP 응답 상태 코드를 지정합니다. `ResponseEntity` 없이 상태 코드만 바꿀 때 씁니다.'
signature: '@ResponseStatus(HttpStatus.CREATED)'
related:
  - response-entity
  - rest-controller
  - custom-exception
doc: 'https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/bind/annotation/ResponseStatus.html'
---

## 사용 예시

```java
@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)          // 201
    public PostResponse create(@Valid @RequestBody CreatePostRequest req) {
        return postService.create(req);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)       // 204, 본문 없음
    public void delete(@PathVariable Long id) {
        postService.delete(id);
    }
}

// 예외 클래스에 붙이면 이 예외가 처리되지 않고 컨트롤러 밖으로 나갈 때 해당 상태 코드로 응답
@ResponseStatus(HttpStatus.NOT_FOUND)
public class PostNotFoundException extends RuntimeException {
    public PostNotFoundException(Long id) {
        super("게시글이 없습니다: " + id);
    }
}
```

## 주의할 점

- `reason` 속성을 지정하면 서블릿의 `sendError()`로 처리되어 JSON 대신 기본 오류 응답이 나갈 수 있습니다. API 오류 본문은 `@RestControllerAdvice`에서 만듭니다.
- 상태 코드와 헤더(예: `Location`)를 함께 바꿔야 하면 `ResponseEntity`를 씁니다.
