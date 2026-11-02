---
name: ConsumerWidget · ConsumerStatefulWidget · Consumer
cat: 상태 관리
kind: 위젯
order: 30
aliases:
  - WidgetRef
  - 위젯에서 provider 읽기
  - ConsumerState
  - 부분 리빌드
  - HookConsumerWidget
  - ref 사용
summary: 위젯에서 Provider를 읽으려면 `StatelessWidget` 대신 `ConsumerWidget`, `StatefulWidget` 대신 `ConsumerStatefulWidget`을 상속합니다. `build`에서 `WidgetRef ref`를 쓸 수 있게 됩니다.
related:
  - ref-watch-read-listen
  - riverpod-setup
  - stateless
  - stateful
doc: 'https://riverpod.dev/docs/concepts2/consumers'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| ConsumerWidget | `build(context, ref)` | `StatelessWidget` 대신 사용 |
| ConsumerStatefulWidget | `ConsumerState<T>` | `StatefulWidget` 대신 사용. State 안 어디서나 `ref` 사용 |
| Consumer | `builder: (context, ref, child)` | 일부분만 다시 그릴 때 쓰는 위젯 |
| WidgetRef | `클래스` | `watch`, `read`, `listen`, `invalidate` 제공 |

## 사용 예시

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final nameProvider = Provider<String>((ref) => 'Kim');

// 1) StatelessWidget 대신
class Greeting extends ConsumerWidget {
  const Greeting({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final name = ref.watch(nameProvider);
    return Text('Hello, $name');
  }
}

// 2) StatefulWidget 대신: initState 등에서도 ref 사용 가능
class ProfilePage extends ConsumerStatefulWidget {
  const ProfilePage({super.key});

  @override
  ConsumerState<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends ConsumerState<ProfilePage> {
  @override
  void initState() {
    super.initState();
    final name = ref.read(nameProvider); // initState에서는 read
    debugPrint('init $name');
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Text('변하지 않는 영역'),
        // 3) Consumer: 이 부분만 다시 그림
        Consumer(
          builder: (context, ref, child) => Text(ref.watch(nameProvider)),
        ),
      ],
    );
  }
}
```

## 주의할 점

- `initState`, 버튼 콜백처럼 build 밖에서는 `ref.watch` 대신 `ref.read`를 씁니다.
- 큰 화면 전체를 `ConsumerWidget`으로 만들면 Provider가 바뀔 때마다 화면 전체가 다시 그려집니다. 자주 바뀌는 부분만 `Consumer`나 작은 `ConsumerWidget`으로 분리합니다.
- flutter_hooks와 함께 쓸 때는 hooks_riverpod 패키지의 `HookConsumerWidget`을 씁니다.
