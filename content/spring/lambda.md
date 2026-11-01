---
name: 람다 · 함수형 인터페이스
cat: Java 기초
kind: 문법
order: 130
aliases:
  - 람다식
  - 화살표 함수
  - 메서드 참조
  - Function
  - Predicate
  - Supplier
  - Consumer
  - 익명 함수
summary: '메서드가 하나뿐인 인터페이스(함수형 인터페이스)를 `(매개변수) -> 식` 형태로 짧게 구현하는 문법과, 자주 쓰는 표준 함수형 인터페이스입니다.'
related:
  - stream
  - comparator
  - collectors
  - optional
doc: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/function/package-summary.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| Function<T, R> | `인터페이스` | T를 받아 R 반환, `apply()` |
| Predicate<T> | `인터페이스` | T를 받아 boolean 반환, `test()` |
| Consumer<T> | `인터페이스` | T를 받아 처리, 반환 없음, `accept()` |
| Supplier<T> | `인터페이스` | 받는 값 없이 T 반환, `get()` |
| BiFunction<T, U, R> | `인터페이스` | 두 값을 받아 R 반환 |
| 클래스::메서드 | `문법` | 메서드 참조 |

## 사용 예시

```java
// 직접 만드는 함수형 인터페이스 (추상 메서드 하나)
@FunctionalInterface
public interface DiscountPolicy {
    int apply(int price);
}

DiscountPolicy tenPercent = price -> price * 90 / 100;

// 표준 함수형 인터페이스
Function<String, Integer> length = s -> s.length();
Predicate<Integer> isAdult = age -> age >= 19;
Consumer<String> printer = msg -> System.out.println(msg);
Supplier<LocalDate> today = () -> LocalDate.now();
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;

length.apply("hello");      // 5
isAdult.test(20);           // true
printer.accept("hi");
add.apply(2, 3);            // 5

// 여러 줄이면 중괄호와 return
Function<String, String> mask = s -> {
    if (s.length() <= 2) return "**";
    return s.charAt(0) + "*".repeat(s.length() - 2) + s.charAt(s.length() - 1);
};

// 메서드 참조
Function<String, Integer> parse = Integer::parseInt;     // s -> Integer.parseInt(s)
Consumer<String> print = System.out::println;            // s -> System.out.println(s)
Supplier<List<String>> newList = ArrayList::new;         // () -> new ArrayList<>()

// 조합
Predicate<String> notBlank = s -> !s.isBlank();
Predicate<String> shortText = s -> s.length() < 10;
Predicate<String> valid = notBlank.and(shortText);
```

## 주의할 점

- 람다 안에서 바깥 지역 변수는 읽기만 할 수 있습니다. 값이 바뀌는 변수를 쓰면 컴파일 오류가 납니다.
- 람다가 길어지면 별도 메서드로 빼고 메서드 참조(`this::validate`)로 넘기는 편이 읽기 쉽습니다.
