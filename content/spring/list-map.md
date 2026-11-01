---
name: List · Map
cat: 컬렉션 · 스트림
kind: 클래스
order: 10
aliases:
  - ArrayList
  - HashMap
  - 리스트
  - 맵
  - 컬렉션
  - getOrDefault
  - computeIfAbsent
  - List.of
summary: 가장 많이 쓰는 컬렉션인 List와 Map의 생성과 기본 조작입니다.
related:
  - stream
doc: >-
  https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/List.html
---

## 사용 예시

```java
// List
List<String> fixed = List.of("a", "b");        // 변경 불가
List<String> names = new ArrayList<>();         // 변경 가능
names.add("Kim");
names.add("Lee");
names.get(0);           // "Kim"
names.size();           // 2
names.contains("Lee");  // true
names.remove("Kim");
for (String n : names) { System.out.println(n); }

// Map
Map<String, Integer> scores = new HashMap<>();
scores.put("Kim", 90);
scores.get("Kim");                    // 90
scores.getOrDefault("Park", 0);       // 0
scores.containsKey("Lee");            // false
scores.merge("Kim", 5, Integer::sum); // 95

Map<String, List<String>> groups = new HashMap<>();
groups.computeIfAbsent("A", k -> new ArrayList<>()).add("Kim");

for (Map.Entry<String, Integer> e : scores.entrySet()) {
    System.out.println(e.getKey() + "=" + e.getValue());
}
```

## 주의할 점

- List.of(), Map.of()로 만든 컬렉션에 add/put을 하면 UnsupportedOperationException이 납니다.
