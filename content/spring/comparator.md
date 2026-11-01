---
name: Comparator · 정렬
cat: 컬렉션 · 스트림
kind: 인터페이스
order: 50
aliases:
  - 정렬
  - sort
  - 내림차순
  - 오름차순
  - Comparator.comparing
  - thenComparing
  - Comparable
  - 다중 정렬
summary: '객체 목록을 원하는 기준으로 정렬하는 `Comparator`와 `List.sort()`, 여러 조건·역순·`null` 처리 방법입니다.'
related:
  - stream
  - lambda
  - list-map
  - arrays
doc: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Comparator.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| Comparator.comparing(키) | `메서드` | 키 기준 오름차순 |
| reversed() | `메서드` | 순서 뒤집기 |
| thenComparing(키) | `메서드` | 앞 기준이 같을 때 다음 기준 |
| Comparator.reverseOrder() | `메서드` | 자연 순서의 역순 |
| Comparator.nullsLast(c) | `메서드` | `null`을 맨 뒤로 |
| Comparable<T> | `인터페이스` | 클래스 자체의 기본 정렬 기준 `compareTo()` |

## 사용 예시

```java
record Product(String name, int price, LocalDate createdAt) {}

List<Product> products = new ArrayList<>(List.of(
        new Product("B", 3000, LocalDate.of(2025, 1, 2)),
        new Product("A", 3000, LocalDate.of(2025, 3, 1)),
        new Product("C", 1000, LocalDate.of(2024, 12, 1))
));

// 가격 오름차순
products.sort(Comparator.comparing(Product::price));

// 가격 내림차순
products.sort(Comparator.comparing(Product::price).reversed());

// 가격 내림차순, 같으면 이름 오름차순
products.sort(Comparator.comparing(Product::price, Comparator.reverseOrder())
        .thenComparing(Product::name));

// int 키는 comparingInt가 박싱 없이 빠름
products.sort(Comparator.comparingInt(Product::price));

// 최신순 상위 2개 (원본은 그대로)
List<Product> latest = products.stream()
        .sorted(Comparator.comparing(Product::createdAt).reversed())
        .limit(2)
        .toList();

// 문자열 정렬
List<String> names = new ArrayList<>(Arrays.asList("kim", "Lee", null, "park"));
names.sort(Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER)); // [kim, Lee, park, null]
```

## 주의할 점

- `comparing(...).thenComparing(...).reversed()`처럼 끝에 `reversed()`를 붙이면 앞의 모든 조건이 뒤집힙니다. 특정 기준만 역순으로 하려면 `comparing(키, Comparator.reverseOrder())`를 씁니다.
- `List.of()`로 만든 불변 리스트에 `sort()`를 호출하면 예외가 납니다. `new ArrayList<>(...)`로 복사하거나 `stream().sorted()`를 씁니다.
