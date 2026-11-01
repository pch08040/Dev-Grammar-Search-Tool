---
name: '@ManyToOne · @OneToMany'
cat: 데이터 (JPA)
kind: 어노테이션
order: 30
aliases:
  - 연관관계
  - 양방향
  - mappedBy
  - '@JoinColumn'
  - 외래키
  - cascade
  - orphanRemoval
summary: 엔티티 사이의 N:1, 1:N 관계를 매핑합니다. 외래키는 `@ManyToOne` 쪽이 관리합니다.
related:
  - entity
  - fetch-join
  - jpa-repository
doc: 'https://docs.jboss.org/hibernate/orm/6.6/userguide/html_single/Hibernate_User_Guide.html#associations'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| fetch | `FetchType` | `LAZY` 또는 `EAGER`. `@ManyToOne` 기본값은 `EAGER` |
| mappedBy | `String` | 양방향에서 관계의 주인이 아닌 쪽에 적는 상대 필드 이름 |
| cascade | `CascadeType[]` | 저장·삭제를 연관 엔티티까지 전파 (`PERSIST`, `REMOVE`, `ALL` …) |
| orphanRemoval | `boolean` | 컬렉션에서 빠진 자식을 자동 삭제 |
| @JoinColumn(name) | 어노테이션 | 외래키 컬럼 이름 지정 |

## 사용 예시

```java
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Team {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // 관계의 주인이 아님: 읽기 전용, 외래키를 바꾸지 않음
    @OneToMany(mappedBy = "team", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Member> members = new ArrayList<>();

    // 양방향 연관관계 편의 메서드: 양쪽을 함께 설정
    public void addMember(Member member) {
        members.add(member);
        member.changeTeam(this);
    }
}

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 관계의 주인: member.team_id 외래키를 관리
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    void changeTeam(Team team) { this.team = team; }
}
```

## 주의할 점

- `@ManyToOne`은 기본이 `EAGER`라서 조회할 때마다 연관 엔티티까지 함께 가져옵니다. 항상 `fetch = FetchType.LAZY`로 지정합니다.
- `mappedBy` 쪽 컬렉션에만 추가하면 외래키가 저장되지 않습니다. 편의 메서드로 주인 쪽(`member.team`)도 함께 설정합니다.
- 양방향 관계에서 Lombok `@ToString`이나 엔티티를 그대로 JSON으로 반환하면 서로를 계속 참조해 `StackOverflowError`가 납니다. 응답은 DTO로 변환합니다.
