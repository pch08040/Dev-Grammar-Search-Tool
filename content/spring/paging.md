---
name: Page · PageRequest
cat: 데이터 (JPA)
kind: 인터페이스
order: 50
aliases:
  - 페이징
  - 페이지네이션
  - Pageable
  - Slice
  - Sort
  - 정렬
  - 무한 스크롤
summary: '`Pageable`을 넘기면 지정한 페이지만 조회하고, 결과를 전체 개수와 함께 `Page`로 돌려받습니다.'
related:
  - jpa-repository
  - pageable
  - query
doc: 'https://docs.spring.io/spring-data/jpa/reference/repositories/query-methods-details.html#repositories.special-parameters'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| PageRequest.of(page, size, sort) | `PageRequest` | 페이지 번호(0부터), 크기, 정렬로 요청 생성 |
| getContent() | `List<T>` | 현재 페이지 데이터 |
| getTotalElements() | `long` | 전체 데이터 개수 (count 쿼리 실행) |
| getTotalPages() | `int` | 전체 페이지 수 |
| hasNext() | `boolean` | 다음 페이지 존재 여부 |
| map(fn) | `Page<R>` | 내용을 DTO로 변환 (페이지 정보 유지) |

## 사용 예시

```java
public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findByCategory(String category, Pageable pageable);

    // 전체 개수가 필요 없으면 Slice: count 쿼리를 생략해 더 가벼움
    Slice<Post> findByAuthorId(Long authorId, Pageable pageable);
}

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;

    public Page<PostResponse> list(String category, int page) {
        // 0페이지부터, 20개씩, 최신순
        Pageable pageable = PageRequest.of(page, 20, Sort.by(Sort.Direction.DESC, "createdAt"));
        return postRepository.findByCategory(category, pageable)
                .map(PostResponse::from);
    }
}

// 결과 사용
Page<PostResponse> result = postService.list("notice", 0);
result.getContent();        // 현재 페이지 목록
result.getTotalElements();  // 전체 개수
result.hasNext();           // 다음 페이지가 있는지
```

## 주의할 점

- 페이지 번호는 0부터 시작합니다. 화면의 1페이지는 `PageRequest.of(0, size)`입니다.
- `Page`는 매번 count 쿼리를 추가로 실행합니다. 무한 스크롤처럼 전체 개수가 필요 없으면 `Slice`를 씁니다.
- 컬렉션 fetch join과 페이징을 함께 쓰면 Hibernate가 메모리에서 페이징하며 경고를 남깁니다. 이 경우 `@BatchSize`나 `default_batch_fetch_size`를 씁니다.
