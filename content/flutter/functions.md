---
name: 함수 · 매개변수
cat: Dart 문법
kind: 문법
order: 60
aliases:
  - 함수
  - named parameter
  - 이름 있는 매개변수
  - 선택 매개변수
  - 기본값 매개변수
  - 화살표 함수
  - 익명 함수
  - 콜백
summary: 함수 선언과 매개변수 종류입니다. 위치 매개변수, `{}` 안의 이름 있는 매개변수, `[]` 안의 선택 위치 매개변수를 구분합니다.
related:
  - null-safety
  - class-constructor
  - spring/lambda
doc: 'https://dart.dev/language/functions'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| f(int a) | `위치 매개변수` | 순서대로 전달, 필수 |
| f({int? a}) | `이름 있는 매개변수` | `f(a: 1)`처럼 이름으로 전달, 기본은 선택 |
| f({required int a}) | `필수 이름 있는 매개변수` | 이름으로 전달, 반드시 넘겨야 함 |
| f({int a = 1}) | `기본값` | 넘기지 않으면 기본값 사용 |
| f([int? a]) | `선택 위치 매개변수` | 순서대로 전달하되 생략 가능 |
| => expr | `화살표 함수` | 식 하나를 반환하는 짧은 함수 |

## 사용 예시

```dart
// 위치 매개변수
int add(int a, int b) {
  return a + b;
}

// 화살표 함수
int multiply(int a, int b) => a * b;

// 이름 있는 매개변수 (필수 + 기본값)
String greet({required String name, String greeting = '안녕하세요'}) =>
    '$greeting, $name';

// 선택 위치 매개변수
String fullName(String first, [String? last]) =>
    last == null ? first : '$first $last';

// 함수를 매개변수로 받기 (콜백)
void repeat(int times, void Function(int index) action) {
  for (var i = 0; i < times; i++) {
    action(i);
  }
}

void main() {
  print(add(1, 2));                 // 3
  print(multiply(3, 4));            // 12
  print(greet(name: 'Kim'));        // 안녕하세요, Kim
  print(fullName('Chul', 'Park'));  // Chul Park

  // 익명 함수
  repeat(3, (i) => print('반복 $i'));

  // 함수를 변수에 담기
  final square = (int x) => x * x;
  print(square(5));                 // 25
}
```

## 주의할 점

- 위치 매개변수가 3개를 넘으면 호출하는 쪽에서 의미를 알기 어렵습니다. 이름 있는 매개변수(`{required ...}`)로 바꾸는 것이 좋습니다.
- 이름 있는 매개변수의 타입이 null 불가능하면 `required`를 붙이거나 기본값을 줘야 합니다.
