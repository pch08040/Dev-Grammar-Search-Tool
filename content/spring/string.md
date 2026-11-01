---
name: String 주요 메서드
cat: Java 기초
kind: 메서드
order: 20
aliases:
  - 문자열
  - substring
  - split
  - trim
  - strip
  - replace
  - equals
  - isBlank
  - format
  - join
summary: '문자열 자르기, 나누기, 비교, 포맷 등 자주 쓰는 메서드입니다.'
related:
  - main
  - stream
doc: >-
  https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html
---

## 사용 예시

```java
String s = "  Hello, Spring  ";

s.strip();                    // "Hello, Spring" (앞뒤 공백 제거)
s.isBlank();                  // false
s.contains("Spring");         // true
s.strip().substring(0, 5);    // "Hello"
s.strip().split(", ");        // ["Hello", "Spring"]
s.replace("Spring", "Java");  // "  Hello, Java  "
s.toUpperCase();

"abc".equals(other);          // 값 비교 (== 쓰지 않기)
"abc".equalsIgnoreCase("ABC");// true

String.format("%s님 %d건", "Kim", 3);  // "Kim님 3건"
String.join(", ", List.of("a", "b"));  // "a, b"

// 반복 결합은 StringBuilder
var sb = new StringBuilder();
sb.append("a").append(1);
String result = sb.toString();
```

## 주의할 점

- 문자열 비교는 항상 equals()를 씁니다. ==는 같은 객체인지를 비교합니다.
- null일 수 있는 값은 "abc".equals(value)처럼 상수 쪽에서 호출하면 NPE를 피할 수 있습니다.
