---
name: 상속 · abstract · mixin
cat: Dart 문법
kind: 문법
order: 120
aliases:
  - 상속
  - extends
  - implements
  - 추상 클래스
  - with
  - sealed class
  - 인터페이스
  - override
summary: '클래스를 재사용하는 방법입니다. `extends`로 상속하고, `implements`로 인터페이스를 구현하고, `with`로 mixin의 기능을 섞습니다.'
related:
  - class-constructor
  - records-patterns
  - generics
  - spring/inheritance-interface
doc: 'https://dart.dev/language/class-modifiers'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| extends | `키워드` | 부모 클래스 하나를 상속 |
| implements | `키워드` | 다른 클래스를 인터페이스로 구현 (여러 개 가능) |
| with | `키워드` | mixin의 필드·메서드를 섞어 넣음 |
| abstract class | `제어자` | 직접 만들 수 없는 클래스, 추상 메서드 선언 가능 |
| sealed class | `제어자` | 같은 파일의 하위 타입만 허용. switch에서 빠짐없는지 검사 |
| super | `키워드` | 부모의 생성자·메서드 호출 |

## 사용 예시

```dart
abstract class Animal {
  Animal(this.name);
  final String name;

  String sound();                      // 추상 메서드

  String describe() => '$name: ${sound()}';
}

mixin Swimmer {
  String swim() => '헤엄친다';
}

class Dog extends Animal {
  Dog(super.name);                      // 부모 생성자에 그대로 전달

  @override
  String sound() => '멍멍';
}

class Duck extends Animal with Swimmer {
  Duck(super.name);

  @override
  String sound() => '꽥꽥';
}

// sealed: 하위 타입을 모두 처리했는지 컴파일러가 검사
sealed class Result {}
class Success extends Result { Success(this.data); final String data; }
class Failure extends Result { Failure(this.error); final String error; }

String render(Result r) => switch (r) {
      Success(:final data) => '성공: $data',
      Failure(:final error) => '실패: $error',
    };

void main() {
  print(Dog('바둑이').describe());       // 바둑이: 멍멍
  print(Duck('오리').swim());            // 헤엄친다
  print(render(Success('OK')));
}
```

## 주의할 점

- Dart에는 `interface` 키워드가 따로 없고, 모든 클래스를 `implements`로 구현할 수 있습니다. 대신 `implements`하면 모든 멤버를 직접 다시 구현해야 합니다.
- 상태 처리(로딩·성공·실패)는 `sealed class`와 `switch`로 만들면 새 상태를 추가했을 때 처리하지 않은 곳을 컴파일러가 알려 줍니다.
