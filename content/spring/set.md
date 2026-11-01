---
name: Set · HashSet
cat: 컬렉션 · 스트림
kind: 클래스
order: 40
aliases:
  - 집합
  - 중복 제거
  - HashSet
  - LinkedHashSet
  - TreeSet
  - contains
  - Set.of
summary: '중복을 허용하지 않는 컬렉션입니다. 중복 제거와 빠른 포함 여부 확인(`contains()`)에 씁니다.'
related:
  - list-map
  - stream
  - record
doc: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Set.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| HashSet | `구현체` | 순서 없음, 가장 빠름 |
| LinkedHashSet | `구현체` | 넣은 순서 유지 |
| TreeSet | `구현체` | 정렬된 순서 유지 |
| Set.of(...) | `메서드` | 변경할 수 없는 Set |
| add(x) | `메서드` | 추가, 이미 있으면 `false` 반환 |
| contains(x) | `메서드` | 포함 여부 |

## 사용 예시

```java
Set<String> tags = new HashSet<>();
tags.add("java");
tags.add("spring");
boolean added = tags.add("java");     // false (이미 있음)
tags.size();                          // 2
tags.contains("spring");              // true
tags.remove("java");

// 리스트 중복 제거 (순서 유지)
List<String> names = List.of("Kim", "Lee", "Kim", "Park");
List<String> unique = new ArrayList<>(new LinkedHashSet<>(names)); // [Kim, Lee, Park]

// 스트림으로 중복 제거
List<String> distinct = names.stream().distinct().toList();

// 정렬된 Set
Set<Integer> sorted = new TreeSet<>(List.of(5, 1, 3));   // [1, 3, 5]

// 집합 연산
Set<String> a = new HashSet<>(Set.of("A", "B", "C"));
Set<String> b = Set.of("B", "C", "D");

Set<String> union = new HashSet<>(a);
union.addAll(b);                      // 합집합 [A, B, C, D]

Set<String> inter = new HashSet<>(a);
inter.retainAll(b);                   // 교집합 [B, C]

Set<String> diff = new HashSet<>(a);
diff.removeAll(b);                    // 차집합 [A]

// 변경할 수 없는 Set
Set<String> roles = Set.of("ADMIN", "USER");
```

## 주의할 점

- 직접 만든 클래스를 `HashSet`에 넣으려면 `equals()`와 `hashCode()`를 함께 재정의해야 중복이 제대로 걸러집니다. `record`는 자동으로 됩니다.
- `HashSet`은 순서를 보장하지 않습니다. 넣은 순서가 필요하면 `LinkedHashSet`을 씁니다.
- `Set.of()`에 같은 값을 두 번 넣으면 `IllegalArgumentException`이 납니다.
