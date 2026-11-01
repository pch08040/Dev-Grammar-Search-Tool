---
name: Pageable 요청 파라미터
cat: 웹 API
kind: 인터페이스
order: 80
aliases:
  - 페이징
  - 페이지네이션
  - page size sort
  - '@PageableDefault'
  - PagedModel
  - 목록 조회
summary: '`?page=0&size=20&sort=id,desc` 쿼리를 `Pageable`로 바로 받아 Repository에 넘깁니다.'
signature: 'public PagedModel<T> list(@PageableDefault(size = 20) Pageable pageable)'
related:
  - paging
  - jpa-repository
  - path-variable-request-param
  - dto-mapping
doc: 'https://docs.spring.io/spring-data/commons/reference/repositories/core-extensions.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| page | `int` | 페이지 번호. 0부터 시작 |
| size | `int` | 페이지 크기 (기본 20) |
| sort | `String` | `필드,asc` 또는 `필드,desc`. 여러 번 지정 가능 |

## 사용 예시

```java
@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    // GET /api/posts?page=0&size=10&sort=createdAt,desc
    @GetMapping
    public PagedModel<PostResponse> list(
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<PostResponse> page = postService.findAll(pageable);
        return new PagedModel<>(page);   // { content: [...], page: { size, number, totalElements, totalPages } }
    }
}

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {
    private final PostRepository postRepository;

    public Page<PostResponse> findAll(Pageable pageable) {
        return postRepository.findAll(pageable).map(PostResponse::from);
    }
}
```

## 주의할 점

- `Page`(`PageImpl`)를 그대로 JSON으로 반환하면 응답 구조가 안정적이지 않다는 경고가 나옵니다. `PagedModel`이나 직접 만든 응답 DTO로 감싸서 반환합니다.
- 페이지 번호는 0부터 시작합니다. 1부터 받으려면 `spring.data.web.pageable.one-indexed-parameters: true`를 설정합니다.
- `sort`에 엔티티에 없는 필드 이름이 들어오면 오류가 나므로, 외부 입력을 그대로 쓰는 API라면 허용할 정렬 필드를 제한합니다.
