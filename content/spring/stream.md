---
name: 'Stream: filter · map · collect'
cat: 컬렉션 · 스트림
kind: 메서드
order: 20
aliases:
  - 스트림
  - 람다
  - groupingBy
  - toList
  - sorted
  - Comparator
  - 합계
  - sum
summary: 컬렉션을 선언적으로 필터링·변환·집계하는 Stream API입니다.
related:
  - list-map
  - optional
doc: >-
  https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/stream/Stream.html
---

## 사용 예시

```java
List<User> users = userRepository.findAll();

List<String> activeNames = users.stream()
        .filter(User::isActive)
        .map(User::getName)
        .sorted()
        .toList();                       // Java 16+

int totalAge = users.stream()
        .mapToInt(User::getAge)
        .sum();

Map<String, List<User>> byDept = users.stream()
        .collect(Collectors.groupingBy(User::getDept));

List<User> oldestFirst = users.stream()
        .sorted(Comparator.comparing(User::getAge).reversed())
        .limit(10)
        .toList();

boolean anyAdmin = users.stream().anyMatch(u -> u.getRole() == Role.ADMIN);
```

## 주의할 점

- .toList()는 변경 불가 리스트를 돌려줍니다. 수정이 필요하면 collect(Collectors.toList())를 씁니다.
