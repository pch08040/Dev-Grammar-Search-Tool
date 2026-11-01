---
name: '@Entity · @Id'
cat: 데이터 (JPA)
kind: 어노테이션
order: 10
aliases:
  - 엔티티
  - JPA
  - 테이블
  - '@Column'
  - '@GeneratedValue'
  - '@ManyToOne'
  - 연관관계
summary: 클래스를 DB 테이블과 연결합니다. 필드는 컬럼으로 매핑됩니다.
related:
  - jpa-repository
  - transactional
doc: 'https://docs.spring.io/spring-data/jpa/reference/jpa/entity-persistence.html'
---

## 사용 예시

```java
import jakarta.persistence.*;

@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)   // JPA 기본 생성자
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 20)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    public void rename(String name) { this.name = name; } // setter 대신 의미 있는 메서드
}
```

## 주의할 점

- Spring Boot 3부터 패키지가 javax.persistence에서 jakarta.persistence로 바뀌었습니다.
- @ManyToOne은 기본이 EAGER이므로 LAZY로 바꾸는 것이 일반적입니다.
