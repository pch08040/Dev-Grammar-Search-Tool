---
name: 제네릭
cat: Java 기초
kind: 문법
order: 140
aliases:
  - generics
  - 타입 매개변수
  - '<T>'
  - 와일드카드
  - '? extends'
  - 다이아몬드 연산자
  - 타입 안전
summary: '클래스나 메서드를 여러 타입에서 재사용하면서 타입 안전성을 지키는 문법입니다. `List<String>`의 `<String>`이 제네릭입니다.'
related:
  - list-map
  - record
  - inheritance-interface
  - flutter/generics
doc: 'https://dev.java/learn/generics/'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| class Box<T> | `제네릭 클래스` | 타입 매개변수 T를 받는 클래스 |
| <T> T method(T x) | `제네릭 메서드` | 반환 타입 앞에 `<T>` 선언 |
| new ArrayList<>() | `다이아몬드` | 오른쪽 타입 생략 |
| <T extends Number> | `상한 제한` | Number와 그 하위 타입만 |
| List<? extends T> | `와일드카드` | 꺼내서 읽는 용도 |
| List<? super T> | `와일드카드` | 넣는 용도 |

## 사용 예시

```java
// 제네릭 클래스: API 공통 응답
public record ApiResponse<T>(boolean success, T data, String message) {

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(true, data, null);
    }

    public static <T> ApiResponse<T> fail(String message) {
        return new ApiResponse<>(false, null, message);
    }
}

// 사용
ApiResponse<String> res = ApiResponse.ok("저장 완료");
ApiResponse<List<String>> list = ApiResponse.ok(List.of("a", "b"));

// 제네릭 메서드
public static <T> T firstOrDefault(List<T> items, T defaultValue) {
    return items.isEmpty() ? defaultValue : items.get(0);
}

// 상한 제한: 숫자 타입만
public static <T extends Number> double sum(List<T> nums) {
    double total = 0;
    for (T n : nums) total += n.doubleValue();
    return total;
}

// 와일드카드: List<Integer>, List<Double> 모두 받기
public static double average(List<? extends Number> nums) {
    return nums.stream().mapToDouble(Number::doubleValue).average().orElse(0);
}
```

## 주의할 점

- 제네릭 타입 정보는 실행 시점에 지워집니다. 그래서 `new T()`나 `obj instanceof List<String>`은 쓸 수 없습니다.
- 타입 매개변수 없이 `List list`처럼 쓰는 raw 타입은 타입 검사가 꺼지므로 쓰지 않습니다.
