---
name: 제네릭
cat: Dart 문법
kind: 문법
order: 140
aliases:
  - generics
  - 타입 매개변수
  - <T>
  - extends 제약
  - 제네릭 함수
  - 제네릭 클래스
summary: 타입을 매개변수로 받아서, 여러 타입에 같은 코드를 안전하게 쓰게 합니다. `List<String>`, `Future<User>`가 대표적인 예입니다.
related:
  - class-constructor
  - inheritance-mixin
  - async-await
  - spring/generics
doc: 'https://dart.dev/language/generics'
---

## 사용 예시

```dart
// 제네릭 클래스: API 응답 감싸기
class ApiResponse<T> {
  const ApiResponse({required this.data, this.message});

  final T data;
  final String? message;
}

// 제네릭 함수
T firstOr<T>(List<T> items, T fallback) =>
    items.isEmpty ? fallback : items.first;

// 타입 제약: num 또는 그 하위 타입만
T maxOf<T extends num>(T a, T b) => a > b ? a : b;

// 제네릭 캐시
class Cache<K, V> {
  final _store = <K, V>{};

  V getOrPut(K key, V Function() create) =>
      _store.putIfAbsent(key, create);
}

void main() {
  const res = ApiResponse<List<String>>(data: ['a', 'b']);
  print(res.data.length);              // 2

  print(firstOr(<int>[], -1));         // -1 (T는 int로 추론)
  print(maxOf(3, 7.5));                // 7.5

  final cache = Cache<String, int>();
  print(cache.getOrPut('x', () => 42)); // 42
}
```

## 주의할 점

- 타입 인자를 빼면 `dynamic`으로 추론되는 경우가 있습니다. 빈 리스트는 `<String>[]`처럼 타입을 꼭 붙입니다.
- `List<int>`는 `List<num>`의 하위 타입으로 취급되어 대입은 되지만, 그 리스트에 `double`을 넣으면 런타임 오류가 납니다.
