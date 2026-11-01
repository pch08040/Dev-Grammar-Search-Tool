---
name: 변수 · 기본 타입
cat: Java 기초
kind: 문법
order: 30
aliases:
  - 변수
  - 자료형
  - 기본형
  - int
  - long
  - double
  - boolean
  - var
summary: '값을 저장하는 변수 선언과 Java의 8가지 기본 타입, 지역 변수 타입 추론 `var`입니다.'
related:
  - wrapper-parse
  - modifiers
  - flutter/variables
doc: 'https://dev.java/learn/language-basics/variables/'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| int | `4바이트 정수` | 약 -21억 ~ 21억 |
| long | `8바이트 정수` | 큰 정수, 리터럴 뒤에 `L` |
| double | `8바이트 실수` | 기본 실수 타입 |
| float | `4바이트 실수` | 리터럴 뒤에 `f` |
| boolean | `논리` | `true` 또는 `false` |
| char | `2바이트 문자` | 작은따옴표 `'A'` |
| byte / short | `1·2바이트 정수` | 파일·네트워크 바이트 처리 |
| var | `타입 추론` | 지역 변수에서 오른쪽 값으로 타입 결정 (Java 10+) |

## 사용 예시

```java
public class Variables {
    public static void main(String[] args) {
        int count = 10;
        long total = 3_000_000_000L;      // int 범위를 넘으면 L
        double price = 19.99;
        float rate = 0.5f;
        boolean active = true;
        char grade = 'A';

        final int maxSize = 100;          // 재할당 불가

        var name = "Kim";                 // String으로 추론
        var items = new java.util.ArrayList<String>();

        // 정수끼리 나누면 소수점 버림
        int a = 7 / 2;                    // 3
        double b = 7 / 2.0;               // 3.5
        double c = (double) 7 / 2;        // 3.5 (형변환)

        // 지역 변수는 값을 넣은 뒤에 사용
        int score;
        score = 90;

        System.out.println(name + " " + count + " " + total + " " + a + " " + b + " " + c + " " + score);
    }
}
```

## 주의할 점

- 정수끼리 나누면 소수점이 버려집니다. 실수 결과가 필요하면 한쪽을 `double`로 바꿉니다.
- `int` 계산 결과가 범위를 넘으면 오류 없이 값이 뒤집힙니다(오버플로). 큰 수는 `long`을, 금액은 `BigDecimal`을 씁니다.
- `var`는 지역 변수에서만 쓸 수 있고, 필드·매개변수나 `null`로 초기화하는 변수에는 쓸 수 없습니다.
