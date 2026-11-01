---
name: extension
cat: Dart 문법
kind: 문법
order: 110
aliases:
  - 확장 메서드
  - extension method
  - 기능 추가
  - BuildContext 확장
  - extension type
  - 유틸 함수
summary: 기존 클래스를 수정하지 않고 메서드나 getter를 추가합니다. `String`, `DateTime`, `BuildContext` 같은 타입에 유틸 기능을 붙일 때 씁니다.
related:
  - string-methods
  - build-context
  - generics
doc: 'https://dart.dev/language/extension-methods'
---

## 사용 예시

```dart
extension StringX on String {
  // 첫 글자만 대문자
  String get capitalized =>
      isEmpty ? this : '${this[0].toUpperCase()}${substring(1)}';

  bool get isEmail => RegExp(r'^[\w.+-]+@[\w-]+\.[\w.]+$').hasMatch(this);
}

extension DateTimeX on DateTime {
  // 2026-11-02 형식
  String get ymd =>
      '$year-${month.toString().padLeft(2, '0')}-${day.toString().padLeft(2, '0')}';

  bool isSameDay(DateTime other) =>
      year == other.year && month == other.month && day == other.day;
}

// null 가능 타입에도 붙일 수 있음
extension NullableStringX on String? {
  bool get isNullOrEmpty => this == null || this!.isEmpty;
}

void main() {
  print('flutter'.capitalized);         // 'Flutter'
  print('a@b.com'.isEmail);             // true
  print(DateTime(2026, 11, 2).ymd);     // '2026-11-02'

  String? nickname;
  print(nickname.isNullOrEmpty);        // true
}
```

## 주의할 점

- 확장은 정적 타입을 기준으로 적용됩니다. 변수 타입이 `dynamic`이면 확장 메서드를 찾지 못해 런타임 오류가 납니다.
- 확장 파일을 다른 곳에서 쓰려면 그 파일을 `import`해야 합니다. 이름 없는 `extension on String`은 다른 파일에서 쓸 수 없습니다.
