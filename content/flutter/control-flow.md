---
name: if · for · switch
cat: Dart 문법
kind: 문법
order: 70
aliases:
  - 조건문
  - 반복문
  - switch expression
  - for in
  - while
  - break continue
  - 삼항 연산자
summary: 조건문과 반복문입니다. Dart 3부터는 값을 바로 돌려주는 `switch` 식과 패턴을 쓸 수 있습니다.
related:
  - records-patterns
  - list-methods
  - enum
  - spring/conditionals
doc: 'https://dart.dev/language/branches'
---

## 사용 예시

```dart
void main() {
  final score = 85;

  // if / else if / else
  if (score >= 90) {
    print('A');
  } else if (score >= 80) {
    print('B');
  } else {
    print('C');
  }

  // 삼항 연산자
  final passed = score >= 60 ? '합격' : '불합격';

  // switch 식 (Dart 3): 값을 바로 반환
  final grade = switch (score) {
    >= 90 => 'A',
    >= 80 && < 90 => 'B',
    _ => 'C',
  };
  print('$passed $grade');

  // for / for-in
  for (var i = 0; i < 3; i++) {
    if (i == 1) continue;  // 이번 반복 건너뛰기
    print('i=$i');
  }
  for (final name in ['Kim', 'Lee']) {
    print(name);
  }

  // while
  var n = 3;
  while (n > 0) {
    n--;
    if (n == 1) break;     // 반복 종료
  }
}
```

## 주의할 점

- `switch` 문에서 각 `case`는 자동으로 끝나므로 `break`가 필요 없습니다. 비어 있지 않은 `case`가 다음 `case`로 넘어가지도 않습니다.
- `switch` 식은 모든 경우를 처리해야 컴파일됩니다. 나머지를 받으려면 `_`를 씁니다.
