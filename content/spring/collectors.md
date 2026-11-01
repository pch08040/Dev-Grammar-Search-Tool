---
name: Collectors
cat: 컬렉션 · 스트림
kind: 메서드
order: 60
aliases:
  - groupingBy
  - toMap
  - joining
  - partitioningBy
  - counting
  - 그룹핑
  - 문자열 합치기
  - 스트림 수집
summary: '스트림 결과를 List·Map·문자열 등으로 모으는 `Collectors`의 자주 쓰는 메서드입니다.'
related:
  - stream
  - list-map
  - lambda
doc: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Collectors.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| toList() / toSet() | `메서드` | List·Set으로 수집 |
| toMap(키, 값) | `메서드` | Map으로 수집 (키가 겹치면 예외) |
| groupingBy(키) | `메서드` | 키별 List로 묶기 |
| groupingBy(키, counting()) | `메서드` | 키별 개수 |
| partitioningBy(조건) | `메서드` | `true`·`false` 두 그룹으로 나누기 |
| joining(", ") | `메서드` | 문자열 합치기 |
| summingInt / averagingInt | `메서드` | 합계·평균 |

## 사용 예시

```java
record Employee(Long id, String name, String dept, int salary) {}

List<Employee> list = List.of(
        new Employee(1L, "Kim", "개발", 500),
        new Employee(2L, "Lee", "개발", 450),
        new Employee(3L, "Park", "영업", 400)
);

// id → 객체 Map
Map<Long, Employee> byId = list.stream()
        .collect(Collectors.toMap(Employee::id, Function.identity()));

// 키가 겹칠 수 있으면 병합 함수를 꼭 넘김
Map<String, Integer> salaryByDept = list.stream()
        .collect(Collectors.toMap(Employee::dept, Employee::salary, Integer::sum));

// 부서별 목록
Map<String, List<Employee>> byDept = list.stream()
        .collect(Collectors.groupingBy(Employee::dept));

// 부서별 인원 수
Map<String, Long> countByDept = list.stream()
        .collect(Collectors.groupingBy(Employee::dept, Collectors.counting()));

// 부서별 이름 목록
Map<String, List<String>> namesByDept = list.stream()
        .collect(Collectors.groupingBy(Employee::dept,
                Collectors.mapping(Employee::name, Collectors.toList())));

// 조건으로 둘로 나누기
Map<Boolean, List<Employee>> highPaid = list.stream()
        .collect(Collectors.partitioningBy(e -> e.salary() >= 450));

// 문자열 합치기
String names = list.stream()
        .map(Employee::name)
        .collect(Collectors.joining(", ", "[", "]"));   // [Kim, Lee, Park]

// 평균
double avg = list.stream().collect(Collectors.averagingInt(Employee::salary));
```

## 주의할 점

- `toMap()`에서 키가 겹치면 `IllegalStateException`이 납니다. 세 번째 인자로 병합 함수(`(a, b) -> a` 등)를 넘깁니다.
- `groupingBy()` 결과 Map은 순서를 보장하지 않습니다. 순서가 필요하면 `groupingBy(키, LinkedHashMap::new, Collectors.toList())`처럼 Map 종류를 지정합니다.
