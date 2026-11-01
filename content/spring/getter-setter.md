---
name: '@Getter · @Setter'
cat: Lombok
kind: 어노테이션
order: 10
aliases:
  - 게터
  - 세터
  - getter
  - setter
  - 접근자
  - Lombok
summary: 필드의 getter·setter 메서드를 컴파일할 때 자동으로 만들어 줍니다.
related:
  - constructors
  - data
  - entity
doc: 'https://projectlombok.org/features/GetterSetter'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| 클래스에 붙이기 | 위치 | 모든 필드의 getter·setter 생성 |
| 필드에 붙이기 | 위치 | 해당 필드만 생성 |
| AccessLevel | `value` 속성 | 생성할 메서드의 접근 제어자 (`PROTECTED`, `NONE` …) |

## 사용 예시

```java
// build.gradle
// compileOnly 'org.projectlombok:lombok'
// annotationProcessor 'org.projectlombok:lombok'

@Entity
@Getter                                   // 모든 필드의 getter 생성
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Setter(AccessLevel.NONE)             // 이 필드는 getter만
    private String email;

    private boolean active;               // boolean은 isActive()로 생성

    // 엔티티는 setter 대신 의미 있는 변경 메서드를 둠
    public void rename(String name) {
        this.name = name;
    }
}

// 사용
member.getName();
member.isActive();
```

## 주의할 점

- 엔티티에 `@Setter`를 클래스 전체에 붙이면 어디서든 값을 바꿀 수 있어 변경 지점을 추적하기 어렵습니다. 엔티티는 `@Getter`만 쓰고 변경 메서드를 따로 만듭니다.
- IntelliJ에서는 Lombok 플러그인과 "Enable annotation processing" 설정이 켜져 있어야 빨간 줄이 사라집니다.
