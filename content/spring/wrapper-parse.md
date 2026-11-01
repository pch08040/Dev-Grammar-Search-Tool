---
name: 래퍼 클래스 · 형변환
cat: Java 기초
kind: 메서드
order: 150
aliases:
  - 형변환
  - 캐스팅
  - Integer.parseInt
  - valueOf
  - String.valueOf
  - 오토박싱
  - 문자열을 숫자로
  - 숫자를 문자열로
summary: '기본 타입과 래퍼 클래스(`Integer`, `Long` 등) 사이의 변환, 문자열과 숫자 사이의 변환, 캐스팅입니다.'
related:
  - variables-types
  - string
  - exceptions
doc: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/Integer.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| Integer.parseInt(s) | `메서드` | 문자열 → `int` |
| Long.parseLong(s) | `메서드` | 문자열 → `long` |
| Double.parseDouble(s) | `메서드` | 문자열 → `double` |
| Integer.valueOf(s) | `메서드` | 문자열 → `Integer` 객체 |
| String.valueOf(x) | `메서드` | 값 → 문자열 |
| (int) 3.7 | `캐스팅` | 명시적 형변환, 소수점 버림 |

## 사용 예시

```java
// 문자열 → 숫자
int age = Integer.parseInt("25");
long id = Long.parseLong("1001");
double rate = Double.parseDouble("0.75");
boolean flag = Boolean.parseBoolean("true");
int hex = Integer.parseInt("ff", 16);       // 255

// 숫자 → 문자열
String s1 = String.valueOf(25);
String s2 = Integer.toString(25);

// 기본 타입 ↔ 래퍼 클래스 (오토박싱·언박싱)
Integer boxed = 10;         // int → Integer
int unboxed = boxed;        // Integer → int
List<Integer> nums = List.of(1, 2, 3);      // 컬렉션에는 래퍼 타입만

// 캐스팅
double d = 3.99;
int i = (int) d;                    // 3 (소수점 버림)
int rounded = (int) Math.round(d);  // 4
long big = 10_000_000_000L;
int broken = (int) big;             // 범위를 넘어 값이 깨짐

// 안전한 변환: 실패하면 기본값
public static int toIntOrDefault(String text, int defaultValue) {
    try {
        return Integer.parseInt(text.strip());
    } catch (NumberFormatException e) {
        return defaultValue;
    }
}
```

## 주의할 점

- `Integer`끼리 `==`로 비교하면 -128~127 범위 밖의 값에서 `false`가 나올 수 있습니다. 래퍼 타입은 `equals()`로 비교합니다.
- `null`인 `Integer`를 `int`에 대입하면 `NullPointerException`이 납니다. DB나 JSON에서 온 값은 `null`인지 먼저 확인합니다.
- `parseInt()`는 공백이나 숫자가 아닌 문자가 섞여 있으면 `NumberFormatException`을 던집니다.
