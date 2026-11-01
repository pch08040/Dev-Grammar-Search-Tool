---
name: '@Query · 네이티브 쿼리'
cat: 데이터 (JPA)
kind: 어노테이션
order: 40
aliases:
  - JPQL
  - 직접 쿼리
  - nativeQuery
  - '@Modifying'
  - '@Param'
  - 벌크 수정
summary: 메서드 이름으로 표현하기 어려운 조회를 JPQL이나 SQL로 직접 작성합니다.
related:
  - jpa-repository
  - paging
  - fetch-join
doc: 'https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html#jpa.query-methods.at-query'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| value | `String` | JPQL(엔티티·필드 이름 기준) 또는 SQL |
| nativeQuery | `boolean` | `true`면 DB SQL을 그대로 실행 |
| countQuery | `String` | 페이징할 때 전체 개수를 셀 쿼리 |
| @Param("name") | 어노테이션 | `:name` 파라미터와 메서드 인자를 연결 |
| @Modifying | 어노테이션 | UPDATE·DELETE 쿼리에 필수 |

## 사용 예시

```java
public interface OrderRepository extends JpaRepository<Order, Long> {

    // JPQL: 테이블이 아니라 엔티티(Order)와 필드(status) 이름을 씀
    @Query("select o from Order o where o.member.id = :memberId and o.status = :status")
    List<Order> findByMemberAndStatus(@Param("memberId") Long memberId,
                                      @Param("status") OrderStatus status);

    // DTO로 바로 조회 (패키지 포함 전체 이름 필요)
    @Query("select new com.example.order.dto.OrderSummary(o.id, o.totalPrice) " +
           "from Order o where o.createdAt >= :from")
    List<OrderSummary> findSummaries(@Param("from") LocalDateTime from);

    // 네이티브 SQL + 페이징
    @Query(value = "select * from orders where total_price >= :min",
           countQuery = "select count(*) from orders where total_price >= :min",
           nativeQuery = true)
    Page<Order> findExpensive(@Param("min") int min, Pageable pageable);

    // 벌크 수정: 영속성 컨텍스트를 거치지 않고 DB를 직접 수정
    @Modifying(clearAutomatically = true)
    @Query("update Order o set o.status = :status where o.createdAt < :before")
    int expireOld(@Param("status") OrderStatus status, @Param("before") LocalDateTime before);
}
```

## 주의할 점

- UPDATE·DELETE 쿼리에 `@Modifying`이 없으면 실행 시 예외가 납니다. 호출하는 서비스 메서드에는 `@Transactional`이 있어야 합니다.
- 벌크 수정은 이미 조회해 둔 엔티티에 반영되지 않습니다. `clearAutomatically = true`로 영속성 컨텍스트를 비웁니다.
- JPQL 문법 오류는 앱을 시작할 때 검증되므로, 오타가 있으면 서버가 뜨지 않습니다.
