---
name: '@NoArgsConstructor · @AllArgsConstructor · @RequiredArgsConstructor'
cat: Lombok
kind: 어노테이션
order: 30
aliases:
  - 생성자 자동
  - 기본 생성자
  - 생성자 주입
  - final 필드
  - AccessLevel.PROTECTED
  - Lombok
summary: 기본 생성자, 모든 필드 생성자, `final` 필드만 받는 생성자를 자동으로 만들어 줍니다.
related:
  - service
  - entity
  - builder
doc: 'https://projectlombok.org/features/constructor'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| @NoArgsConstructor | 어노테이션 | 파라미터 없는 기본 생성자 (JPA 엔티티에 필수) |
| @AllArgsConstructor | 어노테이션 | 모든 필드를 선언 순서대로 받는 생성자 |
| @RequiredArgsConstructor | 어노테이션 | `final` 또는 `@NonNull` 필드만 받는 생성자 (생성자 주입에 사용) |
| access | 속성 | 생성자 접근 제어자 (`AccessLevel.PROTECTED` 등) |

## 사용 예시

```java
// 1. 서비스: final 필드를 받는 생성자 → 스프링이 생성자 주입
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final PaymentClient paymentClient;
    // 생성자를 직접 쓰지 않아도 됨
}

// 2. 엔티티: JPA용 기본 생성자는 외부에서 못 쓰도록 protected
@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int totalPrice;

    public Order(int totalPrice) {
        this.totalPrice = totalPrice;
    }
}

// 3. 단순 값 객체
@Getter
@AllArgsConstructor
public class Point {
    private final int x;
    private final int y;
}
```

## 주의할 점

- `@AllArgsConstructor`는 필드 선언 순서대로 파라미터를 만듭니다. 같은 타입 필드의 순서를 바꾸면 컴파일 오류 없이 값이 뒤바뀔 수 있어, 엔티티나 DTO에는 `@Builder`나 직접 작성한 생성자를 권장합니다.
- `@RequiredArgsConstructor`는 `final`이 붙은 필드만 포함합니다. `final`을 빼먹으면 주입되지 않아 `NullPointerException`이 납니다.
