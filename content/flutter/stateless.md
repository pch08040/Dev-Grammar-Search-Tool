---
name: StatelessWidget
cat: 기본 구조
kind: 클래스
order: 30
aliases:
  - 상태 없는 위젯
  - 정적 위젯
  - build
  - const 생성자
summary: 내부 상태가 없는 위젯입니다. 생성자로 받은 값만으로 화면을 그립니다.
signature: 'class MyWidget extends StatelessWidget { Widget build(BuildContext context) }'
related:
  - stateful
doc: 'https://api.flutter.dev/flutter/widgets/StatelessWidget-class.html'
---

## 사용 예시

```dart
class Greeting extends StatelessWidget {
  const Greeting({super.key, required this.name});

  final String name;

  @override
  Widget build(BuildContext context) {
    return Text(
      'Hello, $name',
      style: Theme.of(context).textTheme.titleLarge,
    );
  }
}

// 사용
const Greeting(name: 'Flutter');
```

## 주의할 점

- 필드는 모두 final로 선언하고, 생성자에 const를 붙이면 불필요한 재빌드를 줄일 수 있습니다.
