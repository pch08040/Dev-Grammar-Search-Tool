---
name: enum
cat: Java 기초
kind: 문법
order: 110
aliases:
  - 열거형
  - 상수 집합
  - values
  - valueOf
  - EnumMap
  - 상태 코드
summary: '정해진 값 몇 개만 가질 수 있는 타입입니다. 필드·생성자·메서드를 넣어 상태 코드나 설정값을 표현합니다.'
related:
  - conditionals
  - enumerated
  - flutter/enum
doc: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Enum.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| values() | `정적 메서드` | 모든 상수 배열 |
| valueOf("NAME") | `정적 메서드` | 이름으로 상수 찾기 (없으면 예외) |
| name() | `메서드` | 상수 이름 문자열 |
| ordinal() | `메서드` | 선언 순서 (0부터) |

## 사용 예시

```java
public enum OrderStatus {
    PENDING("대기"),
    PAID("결제 완료"),
    SHIPPED("배송 중"),
    CANCELED("취소");

    private final String label;

    OrderStatus(String label) {     // enum 생성자는 항상 private
        this.label = label;
    }

    public String getLabel() {
        return label;
    }

    public boolean canCancel() {
        return this == PENDING || this == PAID;
    }
}

// 사용
OrderStatus status = OrderStatus.PAID;
status.getLabel();                         // "결제 완료"
status.name();                             // "PAID"
OrderStatus.valueOf("SHIPPED");            // SHIPPED
for (OrderStatus s : OrderStatus.values()) {
    System.out.println(s);
}

// enum은 == 로 비교
if (status == OrderStatus.PAID) {
    System.out.println("결제됨");
}

// switch 식: 모든 상수를 다루면 default 불필요
String message = switch (status) {
    case PENDING -> "결제를 기다리는 중";
    case PAID, SHIPPED -> "처리 중";
    case CANCELED -> "취소됨";
};

// EnumMap: enum 키 전용 Map
Map<OrderStatus, Integer> counts = new EnumMap<>(OrderStatus.class);
```

## 주의할 점

- `valueOf()`에 없는 이름을 넣으면 `IllegalArgumentException`이 납니다. 외부에서 들어온 값은 예외 처리를 합니다.
- DB에 `ordinal()`(순서 번호)로 저장하면 상수 순서를 바꾸는 순간 데이터가 꼬입니다. JPA에서는 `@Enumerated(EnumType.STRING)`을 씁니다.
