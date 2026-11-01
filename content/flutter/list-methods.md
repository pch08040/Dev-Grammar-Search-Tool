---
name: 'List: map · where · fold'
cat: Dart 문법
kind: 메서드
order: 30
aliases:
  - 리스트
  - 배열
  - 필터
  - 변환
  - 합계
  - firstWhere
  - any
  - sort
  - 컬렉션
summary: 리스트를 변환·필터링·집계하는 자주 쓰는 메서드 모음입니다.
related:
  - null-safety
doc: 'https://api.dart.dev/stable/dart-core/List-class.html'
---

## 사용 예시

```dart
final nums = [3, 1, 4, 1, 5];

final doubled = nums.map((n) => n * 2).toList();       // [6, 2, 8, 2, 10]
final evens   = nums.where((n) => n.isEven).toList();   // [4]
final sum     = nums.fold(0, (acc, n) => acc + n);      // 14
final hasBig  = nums.any((n) => n > 4);                 // true
final first   = nums.firstWhere((n) => n > 3, orElse: () => -1); // 4

final sorted = [...nums]..sort();                       // 원본 유지 정렬
final unique = nums.toSet().toList();                   // 중복 제거

// 컬렉션 if / for
final items = [
  'home',
  if (isAdmin) 'admin',
  for (final n in nums) 'item$n',
];
```

## 주의할 점

- map()과 where()는 지연 평가되는 Iterable을 돌려줍니다. 리스트가 필요하면 .toList()를 붙입니다.
