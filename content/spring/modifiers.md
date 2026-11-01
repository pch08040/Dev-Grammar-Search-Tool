---
name: static · final · 접근 제어자
cat: Java 기초
kind: 문법
order: 90
aliases:
  - 접근 제어자
  - public
  - private
  - protected
  - static
  - final
  - 상수
  - 정적 메서드
summary: '클래스·필드·메서드에 붙는 접근 제어자(`public`, `private` 등)와 `static`, `final`의 의미입니다.'
related:
  - class-constructor
  - variables-types
  - inheritance-interface
doc: 'https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| public | `접근 제어자` | 어디서나 접근 |
| protected | `접근 제어자` | 같은 패키지 + 하위 클래스 |
| (생략) | `접근 제어자` | 같은 패키지에서만 (package-private) |
| private | `접근 제어자` | 같은 클래스 안에서만 |
| static | `키워드` | 객체가 아니라 클래스에 속하는 필드·메서드 |
| final | `키워드` | 변수 재할당 금지, 메서드 재정의 금지, 클래스 상속 금지 |

## 사용 예시

```java
public class OrderPolicy {

    // 상수: static final + 대문자
    public static final int MAX_ITEMS = 50;
    private static final String PREFIX = "ORD-";

    // 모든 객체가 공유하는 값
    private static int createdCount = 0;

    // 객체마다 다른 값, 한 번만 대입
    private final String code;

    public OrderPolicy(String code) {
        this.code = code;
        createdCount++;
    }

    // static 메서드: 객체 없이 호출
    public static String newOrderNo(long seq) {
        return PREFIX + seq;
    }

    public static int getCreatedCount() {
        return createdCount;
    }

    // 하위 클래스에서 재정의 금지
    public final String getCode() {
        return code;
    }

    // 클래스 안에서만 쓰는 도우미
    private boolean isValid(int items) {
        return items <= MAX_ITEMS;
    }
}

// 사용
String no = OrderPolicy.newOrderNo(1001);   // "ORD-1001"
int max = OrderPolicy.MAX_ITEMS;
```

## 주의할 점

- `final`은 참조를 바꾸는 것만 막습니다. `final List<String> list`라도 `list.add()`는 됩니다. 내용까지 막으려면 `List.of()` 같은 불변 컬렉션을 씁니다.
- `static` 메서드 안에서는 인스턴스 필드나 `this`를 쓸 수 없습니다.
- 필드는 기본적으로 `private`으로 두고, 필요한 것만 메서드로 공개합니다.
