---
name: '@Builder'
cat: Lombok
kind: 어노테이션
order: 20
aliases:
  - 빌더 패턴
  - builder()
  - 객체 생성
  - '@Builder.Default'
  - toBuilder
  - Lombok
summary: '`Member.builder().name("Kim").build()`처럼 필드 이름을 지정하며 객체를 만드는 빌더를 자동 생성합니다.'
related:
  - constructors
  - dto-mapping
  - record
doc: 'https://projectlombok.org/features/Builder'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| 클래스에 붙이기 | 위치 | 모든 필드를 받는 빌더 생성 (전체 생성자 필요) |
| 생성자에 붙이기 | 위치 | 그 생성자의 파라미터만 빌더로 노출 (엔티티에 권장) |
| @Builder.Default | 어노테이션 | 빌더로 값을 안 넣었을 때의 기본값 |
| toBuilder = true | 속성 | 기존 객체를 복사해 일부만 바꾸는 `toBuilder()` 생성 |

## 사용 예시

```java
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private Role role;

    // id처럼 직접 넣으면 안 되는 필드는 빼고, 생성자에 @Builder
    @Builder
    private Member(String name, String email, Role role) {
        this.name = name;
        this.email = email;
        this.role = role != null ? role : Role.USER;
    }
}

// 사용: 순서와 상관없이 필요한 값만 지정
Member member = Member.builder()
        .name("Kim")
        .email("kim@example.com")
        .build();

// 클래스에 붙일 때 기본값 지정
@Builder
public class SearchCondition {
    private String keyword;
    @Builder.Default
    private int size = 20;              // 빌더로 지정하지 않으면 20
}
```

## 주의할 점

- 클래스에 `@Builder`를 붙이고 필드에 초기값을 주면, 빌더로 만들 때 그 초기값이 무시되고 `null`·`0`이 됩니다. 기본값은 `@Builder.Default`로 지정합니다.
- JPA 엔티티의 클래스 전체에 `@Builder`를 붙이면 `id`까지 빌더로 열립니다. 엔티티는 필요한 필드만 받는 생성자에 붙입니다.
