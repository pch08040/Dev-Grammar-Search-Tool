---
name: '@Data'
cat: Lombok
kind: 어노테이션
order: 50
aliases:
  - getter setter 한번에
  - equals hashCode
  - toString
  - '@Value'
  - DTO
  - Lombok
summary: '`@Getter`, `@Setter`, `@ToString`, `@EqualsAndHashCode`, `@RequiredArgsConstructor`를 한 번에 붙입니다. 간단한 DTO에만 씁니다.'
related:
  - getter-setter
  - record
  - entity
doc: 'https://projectlombok.org/features/Data'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| @Data | 어노테이션 | getter, setter, `toString`, `equals`, `hashCode`, 필수 인자 생성자 |
| @Value (Lombok) | 어노테이션 | 불변 버전. 모든 필드 `private final`, setter 없음 |
| @ToString.Exclude | 어노테이션 | 특정 필드를 `toString`에서 제외 |
| @EqualsAndHashCode.Exclude | 어노테이션 | 특정 필드를 비교에서 제외 |

## 사용 예시

```java
// 요청 파라미터를 받는 간단한 DTO에는 사용 가능
@Data
public class SearchRequest {
    private String keyword;
    private int page;
    private int size = 20;
}

// 엔티티에는 @Data 대신 필요한 것만 골라서 사용
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(exclude = "team")            // 연관관계 필드는 toString에서 제외
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    private Team team;
}

// 불변 DTO는 Java record가 더 간단
public record MemberResponse(Long id, String name) {}
```

## 주의할 점

- JPA 엔티티에 `@Data`를 쓰지 않습니다. 양방향 연관관계에서 `toString`·`hashCode`가 서로를 계속 호출해 `StackOverflowError`가 나고, 지연 로딩 필드를 건드려 불필요한 쿼리가 실행됩니다.
- `@Data`는 setter를 모두 열어 두므로, 바뀌면 안 되는 값에는 `@Value`나 `record`를 씁니다.
