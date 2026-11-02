---
name: ProviderContainer · overrides (테스트)
cat: 상태 관리
kind: 클래스
order: 150
aliases:
  - 테스트
  - mock
  - overrideWith
  - overrideWithValue
  - 단위 테스트
  - ProviderContainer.test
summary: 위젯 없이 Provider를 테스트할 때는 `ProviderContainer`를 쓰고, 실제 구현을 가짜로 바꿀 때는 `overrides`를 씁니다. 같은 방식으로 `ProviderScope`에서도 값을 교체할 수 있습니다.
related:
  - notifier-provider
  - riverpod-setup
  - riverpod-auto-dispose
doc: 'https://riverpod.dev/docs/how_to/testing'
---

## 사용 예시

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

class Counter extends Notifier<int> {
  @override
  int build() => 0;
  void increment() => state++;
}

final counterProvider = NotifierProvider<Counter, int>(Counter.new);
final greetingProvider = Provider<String>((ref) => '안녕하세요');
final userProvider = FutureProvider<String>((ref) async => '실제 서버 사용자');

void main() {
  test('Notifier 단위 테스트', () {
    final container = ProviderContainer.test(); // 테스트가 끝나면 자동 dispose

    expect(container.read(counterProvider), 0);
    container.read(counterProvider.notifier).increment();
    expect(container.read(counterProvider), 1);
  });

  test('의존 Provider를 가짜로 교체', () async {
    final container = ProviderContainer.test(
      overrides: [
        greetingProvider.overrideWithValue('Hello'),
        userProvider.overrideWith((ref) async => '테스트 사용자'),
      ],
    );

    expect(container.read(greetingProvider), 'Hello');
    expect(await container.read(userProvider.future), '테스트 사용자');
  });

  testWidgets('위젯 테스트에서 교체', (tester) async {
    await tester.pumpWidget(
      ProviderScope(
        overrides: [greetingProvider.overrideWithValue('Hi')],
        child: MaterialApp(
          home: Consumer(builder: (context, ref, _) => Text(ref.watch(greetingProvider))),
        ),
      ),
    );
    expect(find.text('Hi'), findsOneWidget);
  });
}
```

## 주의할 점

- `ProviderContainer.test()`는 Riverpod 3에서 추가된 생성자로, 테스트가 끝나면 자동으로 정리됩니다. `ProviderContainer()`로 직접 만들면 `addTearDown(container.dispose)`를 붙입니다.
- autoDispose Provider는 `container.read`만 하면 바로 폐기될 수 있습니다. 상태를 유지하며 검사하려면 `container.listen(provider, (_, _) {})`로 구독해 둡니다.
- Notifier를 교체할 때는 `counterProvider.overrideWith(FakeCounter.new)`처럼 Notifier를 만드는 함수를 넘깁니다.
