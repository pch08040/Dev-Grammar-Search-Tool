---
name: Map · Set
cat: Dart 문법
kind: 클래스
order: 90
aliases:
  - 맵
  - 딕셔너리
  - 키 값
  - 집합
  - 중복 제거
  - putIfAbsent
  - entries
summary: 키와 값을 짝지어 저장하는 `Map`과, 중복 없는 값의 모음인 `Set`입니다.
related:
  - list-methods
  - json
  - spring/list-map
  - spring/set
doc: 'https://dart.dev/language/collections'
---

## 사용 예시

```dart
void main() {
  // Map
  final scores = <String, int>{'Kim': 90, 'Lee': 80};
  scores['Park'] = 70;                      // 추가·수정
  print(scores['Kim']);                     // 90
  print(scores['Choi']);                    // null (없는 키)
  print(scores['Choi'] ?? 0);               // 기본값
  print(scores.containsKey('Lee'));         // true

  scores.putIfAbsent('Choi', () => 60);     // 없을 때만 추가
  scores.update('Kim', (v) => v + 5);       // 값 갱신
  scores.remove('Lee');

  for (final MapEntry(:key, :value) in scores.entries) {
    print('$key=$value');
  }

  // Map 변환
  final passed = Map.fromEntries(
    scores.entries.where((e) => e.value >= 70),
  );
  print(passed.keys.toList());

  // Set
  final tags = <String>{'dart', 'flutter'};
  tags.add('dart');                         // 이미 있으면 무시
  print(tags.length);                       // 2
  print(tags.contains('flutter'));          // true

  final a = {1, 2, 3};
  final b = {2, 3, 4};
  print(a.union(b));                        // {1, 2, 3, 4}
  print(a.intersection(b));                 // {2, 3}
  print([1, 1, 2].toSet().toList());        // 중복 제거 [1, 2]
}
```

## 주의할 점

- 빈 중괄호 `{}`는 `Map`으로 만들어집니다. 빈 `Set`은 `<String>{}`처럼 타입을 붙여서 만듭니다.
- `map['key']`의 결과는 항상 null이 될 수 있는 타입입니다. `??`로 기본값을 주거나 `containsKey()`로 먼저 확인합니다.
