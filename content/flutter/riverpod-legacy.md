---
name: StateProvider · StateNotifierProvider (레거시)
cat: 상태 관리
kind: 클래스
order: 160
aliases:
  - StateProvider
  - StateNotifier
  - ChangeNotifierProvider
  - 마이그레이션
  - legacy
  - Riverpod 2
summary: Riverpod 2에서 쓰던 `StateProvider`, `StateNotifierProvider`, `ChangeNotifierProvider`는 Riverpod 3부터 레거시로 분리되었습니다. 기존 코드를 유지보수할 때 참고하고, 새 코드는 `Notifier`로 작성합니다.
related:
  - notifier-provider
  - riverpod-setup
doc: 'https://riverpod.dev/docs/3.0_migration'
---

## 사용 예시

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
// Riverpod 3: 레거시 Provider는 별도 import 필요
import 'package:flutter_riverpod/legacy.dart';

// 레거시 1) StateProvider: 단순 값
final legacyCounterProvider = StateProvider<int>((ref) => 0);
// 사용: ref.read(legacyCounterProvider.notifier).state++;

// 레거시 2) StateNotifierProvider
class LegacyCounter extends StateNotifier<int> {
  LegacyCounter() : super(0);
  void increment() => state++;
}

final legacyCounterNotifierProvider =
    StateNotifierProvider<LegacyCounter, int>((ref) => LegacyCounter());

// 권장: 둘 다 Notifier로 바꿈
class Counter extends Notifier<int> {
  @override
  int build() => 0; // StateNotifier의 super(0) 자리
  void increment() => state++;
}

final counterProvider = NotifierProvider<Counter, int>(Counter.new);
```

## 주의할 점

- Riverpod 3로 올린 뒤 `StateProvider`를 찾을 수 없다는 오류가 나면 `package:flutter_riverpod/legacy.dart`를 추가로 import합니다.
- `StateNotifier`의 `super(초기값)`은 `Notifier`의 `build()` 반환값으로 옮기면 됩니다.
