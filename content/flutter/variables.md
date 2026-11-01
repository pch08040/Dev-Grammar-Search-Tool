---
name: var · final · const
cat: Dart 문법
kind: 문법
order: 50
aliases:
  - 변수
  - 상수
  - 타입 추론
  - late
  - dynamic
  - 컴파일 타임 상수
summary: 변수를 선언하는 키워드입니다. `var`는 다시 대입할 수 있고, `final`은 한 번만 대입하며, `const`는 컴파일 시점에 값이 정해지는 상수입니다.
related:
  - null-safety
  - string-interpolation
  - spring/variables-types
doc: 'https://dart.dev/language/variables'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| var | `키워드` | 타입을 추론하는 변수. 다시 대입 가능 |
| final | `키워드` | 한 번만 대입. 실행 중에 값이 정해져도 됨 |
| const | `키워드` | 컴파일 시점 상수. 내부 값까지 모두 불변 |
| late | `키워드` | 선언만 하고 나중에 초기화 |
| dynamic | `타입` | 타입 검사를 끄는 타입 (가급적 사용하지 않음) |

## 사용 예시

```dart
void main() {
  var count = 0;               // int로 추론
  count = 10;                  // 다시 대입 가능

  String name = 'Kim';         // 타입 직접 지정
  final now = DateTime.now();  // 실행 시점에 한 번만 대입
  const pi = 3.14;             // 컴파일 시점 상수

  // final 리스트는 변수만 고정, 내용은 변경 가능
  final names = ['a', 'b'];
  names.add('c');

  // const 리스트는 내용까지 불변
  const fixed = ['x', 'y'];
  // fixed.add('z');           // 런타임 오류: Unsupported operation

  // 숫자 타입
  int age = 30;
  double rate = 0.5;
  num value = 1;               // int, double 모두 가능
  bool isActive = true;

  print('$name $count $age $rate $value $isActive $pi $now $names $fixed');
}
```

## 주의할 점

- 다시 대입할 일이 없으면 `final`을 기본으로 씁니다. 실수로 값을 바꾸는 일을 막을 수 있습니다.
- `final` 리스트·맵도 내용은 바뀝니다. 내용까지 고정하려면 `const`나 `List.unmodifiable()`을 씁니다.
- `const`에는 `DateTime.now()`처럼 실행해야 알 수 있는 값을 넣을 수 없습니다.
