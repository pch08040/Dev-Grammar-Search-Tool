---
name: Stream · async*
cat: Dart 문법
kind: 클래스
order: 170
aliases:
  - 스트림
  - 비동기 데이터
  - listen
  - yield
  - await for
  - StreamController
  - 구독
summary: 시간에 따라 여러 번 도착하는 비동기 값의 흐름입니다. `Future`가 값 하나라면, `Stream`은 값 여러 개를 차례로 받습니다.
related:
  - async-await
  - stream-builder
  - timer
doc: 'https://dart.dev/libraries/async/using-streams'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| async* / yield | `생성` | 함수에서 값을 하나씩 내보내는 Stream 생성 |
| await for | `소비` | async 함수 안에서 값을 차례로 받기 |
| listen() | `소비` | 콜백으로 구독. `StreamSubscription` 반환 |
| StreamController | `생성` | 직접 값을 넣어 보내는 Stream |
| map / where / take | `변환` | List처럼 값을 변환·필터링 |

## 사용 예시

```dart
import 'dart:async';

// async*: 1초마다 숫자를 내보냄
Stream<int> countdown(int from) async* {
  for (var i = from; i >= 0; i--) {
    await Future.delayed(const Duration(seconds: 1));
    yield i;
  }
}

Future<void> main() async {
  // await for: 끝날 때까지 차례로 받기
  await for (final n in countdown(3)) {
    print('남은 시간 $n');
  }

  // StreamController: 직접 이벤트 보내기
  final controller = StreamController<String>.broadcast();

  final subscription = controller.stream
      .where((msg) => msg.isNotEmpty)
      .map((msg) => msg.toUpperCase())
      .listen(
        (msg) => print('받음: $msg'),
        onError: (Object e) => print('오류: $e'),
        onDone: () => print('종료'),
      );

  controller.add('hello');
  controller.add('');
  controller.addError('네트워크 끊김');
  await controller.close();

  await subscription.cancel();
}
```

## 주의할 점

- `listen()`으로 구독했다면 화면이 사라질 때 `subscription.cancel()`을 호출해야 합니다. Flutter에서는 `State.dispose()`에서 취소합니다.
- 기본 Stream은 구독자를 한 명만 받습니다. 여러 곳에서 들어야 하면 `StreamController.broadcast()`나 `asBroadcastStream()`을 씁니다.
