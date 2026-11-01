---
name: String 주요 메서드
cat: Dart 문법
kind: 메서드
order: 80
aliases:
  - 문자열
  - substring
  - split
  - trim
  - replaceAll
  - contains
  - padLeft
  - 대소문자
summary: 문자열 자르기, 나누기, 찾기, 바꾸기 등 자주 쓰는 메서드입니다. `String`은 불변이라 메서드는 항상 새 문자열을 돌려줍니다.
related:
  - string-interpolation
  - list-methods
  - spring/string
doc: 'https://api.dart.dev/stable/dart-core/String-class.html'
---

## 사용 예시

```dart
void main() {
  const s = '  Hello, Flutter  ';

  print(s.trim());                      // 'Hello, Flutter' (앞뒤 공백 제거)
  print(s.trim().length);               // 14
  print(s.isEmpty);                     // false
  print(s.contains('Flutter'));         // true
  print(s.trim().startsWith('Hello'));  // true
  print(s.trim().substring(0, 5));      // 'Hello'
  print(s.trim().split(', '));          // [Hello, Flutter]
  print(s.replaceAll('Flutter', 'Dart'));
  print(s.toUpperCase());
  print(s.indexOf('F'));                // 9

  // 숫자 앞에 0 채우기
  print('7'.padLeft(2, '0'));           // '07'

  // 문자열 ↔ 숫자 변환
  final n = int.parse('42');
  final d = double.tryParse('3.5');     // 실패하면 null
  print(n.toString() + d.toString());

  // 여러 문자열 합치기
  print(['a', 'b', 'c'].join(', '));    // 'a, b, c'

  // 반복 결합은 StringBuffer
  final buffer = StringBuffer();
  for (var i = 0; i < 3; i++) {
    buffer.write(i);
  }
  print(buffer.toString());             // '012'
}
```

## 주의할 점

- `int.parse()`는 숫자가 아니면 예외를 던집니다. 사용자 입력처럼 실패할 수 있는 값은 `int.tryParse()`를 쓰고 null을 처리합니다.
- `substring(start, end)`의 `end`가 길이를 넘으면 `RangeError`가 납니다. 길이를 먼저 확인합니다.
