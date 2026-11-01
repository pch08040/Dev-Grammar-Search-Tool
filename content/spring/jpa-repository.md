---
name: JpaRepository · 쿼리 메서드
cat: 데이터 (JPA)
kind: 인터페이스
order: 20
aliases:
  - 리포지토리
  - findBy
  - existsBy
  - '@Query'
  - 페이징
  - Pageable
  - save
  - findById
summary: 인터페이스만 선언하면 CRUD와 메서드 이름 기반 쿼리가 자동으로 만들어집니다.
related:
  - entity
  - optional
  - service
doc: 'https://docs.spring.io/spring-data/jpa/reference/jpa/query-methods.html'
---

## 사용 예시

```java
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByNameContainingOrderByIdDesc(String keyword);

    Page<User> findByTeamId(Long teamId, Pageable pageable);

    @Query("select u from User u where u.createdAt >= :from")
    List<User> findRecent(@Param("from") LocalDateTime from);
}

// 기본 제공 메서드
userRepository.save(user);
userRepository.findById(1L);          // Optional<User>
userRepository.findAll(PageRequest.of(0, 20, Sort.by("id").descending()));
userRepository.deleteById(1L);
```
