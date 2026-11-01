---
name: N+1 · fetch join · @EntityGraph
cat: 데이터 (JPA)
kind: 패턴
order: 70
aliases:
  - N+1 문제
  - 성능
  - join fetch
  - '@EntityGraph'
  - 지연 로딩
  - default_batch_fetch_size
  - '@BatchSize'
summary: 목록을 조회한 뒤 연관 엔티티를 하나씩 추가 조회하는 N+1 문제를 한 번의 조인 쿼리로 해결합니다.
related:
  - relationships
  - query
  - paging
doc: 'https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html#jpa.entity-graph'
---

## 사용 예시

```java
public interface OrderRepository extends JpaRepository<Order, Long> {

    // 문제: findAll() 후 order.getMember()를 호출하면 주문 수(N)만큼 추가 쿼리 실행

    // 해결 1: JPQL fetch join으로 한 번에 조회
    @Query("select o from Order o join fetch o.member where o.status = :status")
    List<Order> findWithMember(@Param("status") OrderStatus status);

    // 컬렉션 fetch join은 중복 행이 생길 수 있어 distinct 사용
    @Query("select distinct o from Order o join fetch o.items")
    List<Order> findAllWithItems();

    // 해결 2: @EntityGraph로 함께 가져올 연관 필드 지정
    @EntityGraph(attributePaths = {"member", "delivery"})
    List<Order> findByStatus(OrderStatus status);
}

// 해결 3: 컬렉션을 페이징과 함께 조회할 때는 application.yml에 배치 크기 지정
// spring.jpa.properties.hibernate.default_batch_fetch_size: 100
```

## 주의할 점

- N+1은 `FetchType.EAGER`로 바꿔도 해결되지 않습니다. 연관관계는 `LAZY`로 두고 필요한 조회에서만 fetch join합니다.
- 컬렉션(`@OneToMany`) fetch join은 페이징과 함께 쓰면 메모리에서 페이징됩니다. 이때는 `default_batch_fetch_size`로 `IN` 쿼리를 묶어서 실행합니다.
- 실행되는 SQL은 `spring.jpa.show-sql: true` 또는 `logging.level.org.hibernate.SQL: debug`로 확인합니다.
