---
name: if · switch
cat: Java 기초
kind: 문법
order: 40
aliases:
  - 조건문
  - if else
  - switch 식
  - 삼항 연산자
  - 패턴 매칭
  - yield
  - instanceof
summary: '조건에 따라 흐름을 나누는 `if`, 삼항 연산자, `switch` 문과 Java 21의 `switch` 식·패턴 매칭입니다.'
related:
  - loops
  - enum
  - string
  - flutter/control-flow
doc: 'https://docs.oracle.com/en/java/javase/21/language/switch-expressions-and-statements.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| if / else if / else | `문` | 조건 분기 |
| 조건 ? a : b | `연산자` | 삼항 연산자, 둘 중 하나의 값을 고를 때 |
| case A -> … | `switch 문·식` | 화살표 문법, `break` 불필요 (Java 14+) |
| yield | `키워드` | `switch` 식의 블록에서 값 반환 |
| case Integer i when … | `패턴` | 타입과 조건으로 분기 (Java 21) |

## 사용 예시

```java
int score = 85;

// if
if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else {
    System.out.println("C");
}

// 삼항 연산자
String result = score >= 60 ? "합격" : "불합격";

// switch 식: 값을 돌려줌
String day = "SAT";
int hours = switch (day) {
    case "MON", "TUE", "WED", "THU", "FRI" -> 8;
    case "SAT" -> 4;
    default -> 0;
};

// 블록에서 값을 돌려줄 때는 yield
String level = switch (score / 10) {
    case 10, 9 -> "A";
    case 8 -> {
        System.out.println("B 구간");
        yield "B";
    }
    default -> "C";
};

// 패턴 매칭 (Java 21)
Object value = 42;
String desc = switch (value) {
    case Integer i when i > 10 -> "큰 정수 " + i;
    case Integer i -> "정수 " + i;
    case String s -> "문자열 " + s;
    case null -> "null";
    default -> "기타";
};

// instanceof 패턴 매칭
if (value instanceof Integer n && n > 0) {
    System.out.println(n + 1);
}
```

## 주의할 점

- 예전 `switch` 문(`case X:`)은 `break`를 빠뜨리면 다음 case로 넘어갑니다. 화살표(`->`) 문법을 쓰면 이 문제가 없습니다.
- 문자열 비교는 `==`가 아니라 `equals()`로 합니다. `switch`의 문자열 case는 내부적으로 `equals()`를 씁니다.
- `switch` 식은 모든 경우를 다뤄야 합니다. enum이나 sealed 타입을 모두 나열한 경우가 아니면 `default`가 필요합니다.
