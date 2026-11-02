---
name: StreamProvider
cat: 상태 관리
kind: 클래스
order: 80
aliases:
  - 실시간
  - Stream
  - 웹소켓
  - Firestore snapshots
  - 로그인 상태
  - authStateChanges
signature: 'final p = StreamProvider<T>((ref) => stream);'
summary: '`Stream`을 구독해 최신 값을 `AsyncValue`로 제공하는 Provider입니다. 채팅, 위치, 로그인 상태처럼 실시간으로 바뀌는 데이터에 씁니다.'
related:
  - async-value
  - future-provider
  - stream
  - stream-builder
doc: 'https://pub.dev/documentation/flutter_riverpod/latest/flutter_riverpod/StreamProvider-class.html'
---

## 사용 예시

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

// 1초마다 값을 내보내는 스트림 (실제로는 Firestore, WebSocket 등)
final clockProvider = StreamProvider<DateTime>((ref) {
  return Stream.periodic(const Duration(seconds: 1), (_) => DateTime.now());
});

// 예: Firebase 로그인 상태
// final authStateProvider = StreamProvider<User?>(
//   (ref) => FirebaseAuth.instance.authStateChanges(),
// );

class ClockText extends ConsumerWidget {
  const ClockText({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final now = ref.watch(clockProvider);
    return now.when(
      data: (time) => Text('${time.hour}:${time.minute}:${time.second}'),
      loading: () => const CircularProgressIndicator(),
      error: (error, stackTrace) => Text('오류: $error'),
    );
  }
}
```

## 주의할 점

- 스트림 구독 해제는 Riverpod이 자동으로 처리합니다. 위젯에서 `StreamSubscription`을 직접 관리할 필요가 없습니다.
- 다른 Provider에서 스트림의 현재 값을 `await`로 받으려면 `ref.watch(clockProvider.future)`를 씁니다.
- 스트림 상태를 메서드로 바꿔야 하면 `StreamNotifier`와 `StreamNotifierProvider`를 씁니다.
