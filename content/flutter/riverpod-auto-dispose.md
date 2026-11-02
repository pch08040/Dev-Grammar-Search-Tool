---
name: autoDispose · keepAlive · onDispose
cat: 상태 관리
kind: 문법
order: 110
aliases:
  - 메모리 해제
  - 캐시 유지
  - 자동 폐기
  - 화면 나가면 초기화
  - KeepAliveLink
  - onCancel
summary: '`autoDispose`를 붙인 Provider는 구독자가 없으면 상태가 폐기됩니다. `ref.keepAlive()`로 폐기를 막고, `ref.onDispose`로 정리 작업을 등록합니다.'
related:
  - riverpod-family
  - riverpod-generator
  - timer
doc: 'https://riverpod.dev/docs/concepts2/auto_dispose'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| Provider.autoDispose | `수정자` | 구독자가 없으면 자동 폐기 |
| ref.keepAlive() | `KeepAliveLink` | 폐기 방지. 반환된 링크의 `close()`로 해제 |
| ref.onDispose(fn) | `메서드` | 폐기될 때 실행할 정리 작업 등록 |
| ref.onCancel(fn) · ref.onResume(fn) | `메서드` | 마지막 구독자가 사라질 때 · 다시 생길 때 |

## 사용 예시

```dart
import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';

final searchResultProvider =
    FutureProvider.autoDispose.family<List<String>, String>((ref, query) async {
  // 화면을 나가 폐기되면 이후 작업 중단
  var disposed = false;
  ref.onDispose(() => disposed = true);

  await Future<void>.delayed(const Duration(milliseconds: 300)); // 디바운스
  if (disposed) throw StateError('cancelled');

  final result = ['$query 결과 1', '$query 결과 2'];

  // 성공한 결과만 30초 동안 캐시
  final link = ref.keepAlive();
  final timer = Timer(const Duration(seconds: 30), link.close);
  ref.onDispose(timer.cancel);

  return result;
});
```

## 주의할 점

- 코드 생성(`@riverpod`)으로 만든 Provider는 기본이 autoDispose입니다. 계속 유지하려면 `@Riverpod(keepAlive: true)`를 씁니다.
- autoDispose Provider를 `ref.read`로만 읽으면 구독자가 없어 바로 폐기될 수 있습니다. 값을 유지해야 하는 곳에서는 `ref.watch`나 `ref.listen`으로 구독합니다.
