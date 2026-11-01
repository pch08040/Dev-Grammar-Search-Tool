---
name: '@CreatedDate · @LastModifiedDate'
cat: 데이터 (JPA)
kind: 어노테이션
order: 60
aliases:
  - 생성일 자동
  - 수정일 자동
  - Auditing
  - '@EnableJpaAuditing'
  - BaseTimeEntity
  - '@MappedSuperclass'
  - '@CreatedBy'
summary: 엔티티를 저장하거나 수정할 때 생성 시각과 수정 시각을 자동으로 채웁니다.
related:
  - entity
  - configuration-bean
  - local-date-time
doc: 'https://docs.spring.io/spring-data/jpa/reference/auditing.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| @EnableJpaAuditing | 어노테이션 | 설정 클래스에 붙여 Auditing 기능을 켬 |
| @EntityListeners(AuditingEntityListener.class) | 어노테이션 | 엔티티 저장·수정 이벤트를 감지 |
| @CreatedDate | 어노테이션 | 처음 저장할 때 시각 기록 |
| @LastModifiedDate | 어노테이션 | 저장·수정할 때마다 시각 갱신 |
| @CreatedBy · @LastModifiedBy | 어노테이션 | 작성자·수정자 기록 (`AuditorAware` 빈 필요) |

## 사용 예시

```java
// 1. 설정 클래스에서 Auditing 켜기
@Configuration
@EnableJpaAuditing
public class JpaConfig {
}

// 2. 공통 부모 클래스: 테이블은 만들지 않고 필드만 상속
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
public abstract class BaseTimeEntity {

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}

// 3. 엔티티에서 상속
@Entity
public class Post extends BaseTimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
}
```

## 주의할 점

- `@EnableJpaAuditing`을 빼먹으면 값이 `null`로 저장됩니다. 메인 클래스보다 별도 `@Configuration`에 두는 것이 `@WebMvcTest`와 충돌하지 않아 안전합니다.
- `@CreatedDate` 컬럼에는 `updatable = false`를 붙여 수정 쿼리가 값을 덮어쓰지 않게 합니다.
