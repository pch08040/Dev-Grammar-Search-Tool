---
name: '@Enumerated'
cat: 데이터 (JPA)
kind: 어노테이션
order: 80
aliases:
  - enum 저장
  - EnumType.STRING
  - 상태값
  - ORDINAL
  - 열거형 컬럼
summary: enum 필드를 DB 컬럼에 어떤 형태로 저장할지 지정합니다. 항상 `EnumType.STRING`을 씁니다.
related:
  - entity
  - enum
doc: 'https://docs.jboss.org/hibernate/orm/6.6/userguide/html_single/Hibernate_User_Guide.html#basic-enums'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| EnumType.STRING | 값 | enum 이름(`"PAID"`)을 문자열로 저장 |
| EnumType.ORDINAL | 값 | 선언 순서 숫자(0, 1, 2 …)로 저장. 기본값 |

## 사용 예시

```java
public enum OrderStatus {
    ORDERED, PAID, SHIPPED, CANCELED
}

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)          // DB에는 'PAID' 같은 문자열로 저장
    @Column(nullable = false, length = 20)
    private OrderStatus status;

    public void pay() {
        if (status != OrderStatus.ORDERED) {
            throw new IllegalStateException("결제할 수 없는 상태: " + status);
        }
        this.status = OrderStatus.PAID;
    }
}

// 조회 메서드에도 enum을 그대로 사용
List<Order> findByStatus(OrderStatus status);
```

## 주의할 점

- `@Enumerated`를 생략하면 기본값 `ORDINAL`로 저장됩니다. 나중에 enum 중간에 값을 추가하면 기존 데이터의 의미가 바뀌므로 반드시 `STRING`을 씁니다.
- enum 이름을 바꾸면 기존 DB 값과 맞지 않게 됩니다. 이름을 바꿀 때는 데이터도 함께 수정합니다.
