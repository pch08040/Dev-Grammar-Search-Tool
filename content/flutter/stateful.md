---
name: StatefulWidget · setState()
cat: 기본 구조
kind: 클래스
order: 40
aliases:
  - 상태
  - state
  - 카운터
  - initState
  - dispose
  - 화면 갱신
summary: 값이 바뀌면 화면을 다시 그려야 하는 위젯입니다. setState()로 변경을 알립니다.
related:
  - stateless
  - futurebuilder
doc: 'https://api.flutter.dev/flutter/widgets/StatefulWidget-class.html'
---

## 사용 예시

```dart
class Counter extends StatefulWidget {
  const Counter({super.key});

  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;

  @override
  void initState() {
    super.initState();
    // 최초 1회 초기화 (API 호출, 컨트롤러 생성 등)
  }

  @override
  void dispose() {
    // 컨트롤러, 구독 해제
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('count: $_count'),
        ElevatedButton(
          onPressed: () => setState(() => _count++),
          child: const Text('+1'),
        ),
      ],
    );
  }
}
```

## 주의할 점

- setState() 안에서는 값만 바꾸고, 비동기 작업은 밖에서 await한 뒤 호출합니다.
- 비동기 작업 뒤에 setState()를 호출할 때는 if (!mounted) return; 으로 먼저 확인합니다.
