---
name: '@Component · @Repository'
cat: 앱 구조
kind: 어노테이션
order: 30
aliases:
  - 빈 등록
  - 스테레오타입
  - 컴포넌트 스캔
  - '@Service'
  - '@Controller'
  - 의존성 주입
  - bean
summary: '클래스에 붙여 스프링 빈으로 등록하는 스테레오타입 어노테이션입니다. 역할에 따라 `@Component`, `@Service`, `@Repository`, `@Controller`를 골라 씁니다.'
related:
  - configuration-bean
  - service
  - layered-structure
doc: 'https://docs.spring.io/spring-framework/reference/core/beans/classpath-scanning.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| @Component | `어노테이션` | 범용 빈. 특정 계층에 속하지 않는 도우미 클래스 |
| @Service | `어노테이션` | 비즈니스 로직 계층 |
| @Repository | `어노테이션` | 데이터 접근 계층. DB 예외를 `DataAccessException`으로 변환 |
| @Controller / @RestController | `어노테이션` | 웹 요청 처리 계층 |

## 사용 예시

```java
// 특정 계층에 속하지 않는 도우미 클래스
@Component
public class SlugGenerator {
    public String generate(String title) {
        return title.strip().toLowerCase().replaceAll("\\s+", "-");
    }
}

// JdbcTemplate 등으로 직접 구현하는 저장소
@Repository
@RequiredArgsConstructor
public class ArticleQueryRepository {

    private final JdbcTemplate jdbcTemplate;

    public int countByAuthor(Long authorId) {
        Integer count = jdbcTemplate.queryForObject(
                "select count(*) from article where author_id = ?", Integer.class, authorId);
        return count == null ? 0 : count;
    }
}

// 등록된 빈은 생성자로 주입받아 사용
@Service
@RequiredArgsConstructor
public class ArticleService {
    private final SlugGenerator slugGenerator;
    private final ArticleQueryRepository articleQueryRepository;
}
```

## 주의할 점

- 컴포넌트 스캔은 `@SpringBootApplication` 클래스가 있는 패키지와 그 하위 패키지만 대상으로 합니다. 다른 패키지에 둔 클래스는 빈으로 등록되지 않습니다.
- `JpaRepository`를 상속한 인터페이스에는 `@Repository`를 붙이지 않아도 Spring Data가 자동으로 빈을 만듭니다.
- 같은 타입의 빈이 둘 이상이면 주입할 때 오류가 납니다. `@Primary`나 `@Qualifier`로 어느 빈을 쓸지 지정합니다.
