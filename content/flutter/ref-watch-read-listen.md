---
name: ref.watch · ref.read · ref.listen
cat: 상태 관리
kind: 메서드
order: 40
aliases:
  - watch
  - read
  - listen
  - 구독
  - 상태 변화 감지
  - listenManual
  - 스낵바 띄우기
summary: '`ref.watch`는 값을 읽고 변경을 구독해 다시 그리고, `ref.read`는 구독 없이 한 번만 읽으며, `ref.listen`은 다시 그리지 않고 값이 바뀔 때 콜백(스낵바, 화면 이동 등)을 실행합니다.'
related:
  - consumer-widget
  - notifier-provider
  - riverpod-select
doc: 'https://riverpod.dev/docs/concepts2/refs'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| ref.watch(p) | `build · Provider 본문` | 값을 읽고, 바뀌면 다시 build |
| ref.read(p) | `콜백 · initState` | 현재 값을 한 번 읽음. 구독하지 않음 |
| ref.listen(p, (prev, next) {}) | `build · Provider 본문` | 값이 바뀔 때 부수 효과 실행 |
| ref.listenManual(p, cb) | `ConsumerState` | build 밖(initState 등)에서 수동 구독 |

## 사용 예시

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class Counter extends Notifier<int> {
  @override
  int build() => 0;

  void increment() => state++;
}

final counterProvider = NotifierProvider<Counter, int>(Counter.new);

class CounterPage extends ConsumerWidget {
  const CounterPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // watch: 값이 바뀌면 이 위젯을 다시 그림
    final count = ref.watch(counterProvider);

    // listen: 다시 그리지 않고 부수 효과만 실행
    ref.listen<int>(counterProvider, (previous, next) {
      if (next == 10) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('10번 눌렀어요')),
        );
      }
    });

    return Scaffold(
      body: Center(child: Text('$count')),
      floatingActionButton: FloatingActionButton(
        // read: 콜백 안에서는 구독 없이 한 번만 읽음
        onPressed: () => ref.read(counterProvider.notifier).increment(),
        child: const Icon(Icons.add),
      ),
    );
  }
}
```

## 주의할 점

- 버튼 콜백 안에서는 `ref.watch`를 쓰지 않습니다. 콜백에서는 항상 `ref.read`를 씁니다.
- build 안에서 `ref.read`로 값을 읽으면 값이 바뀌어도 화면이 갱신되지 않습니다.
- `ref.listen`은 build 안이나 Provider 본문에서 호출합니다. `initState`에서 구독하려면 `ConsumerState`의 `ref.listenManual`을 씁니다.
