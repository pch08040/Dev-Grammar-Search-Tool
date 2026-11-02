---
name: AsyncValue (switch · when)
cat: 상태 관리
kind: 클래스
order: 90
aliases:
  - 로딩 처리
  - 에러 처리
  - AsyncData
  - AsyncError
  - AsyncLoading
  - 패턴 매칭
  - isRefreshing
summary: 비동기 Provider의 상태를 로딩(`AsyncLoading`), 오류(`AsyncError`), 데이터(`AsyncData`) 중 하나로 표현하는 sealed 클래스입니다. `switch` 패턴이나 `when`으로 상태별 화면을 그립니다.
related:
  - future-provider
  - async-notifier
  - records-patterns
doc: 'https://pub.dev/documentation/flutter_riverpod/latest/flutter_riverpod/AsyncValue-class.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| AsyncData(:value) | `하위 클래스` | 성공, 데이터 있음 |
| AsyncError(:error, :stackTrace) | `하위 클래스` | 실패 |
| AsyncLoading() | `하위 클래스` | 로딩 중 |
| value · hasValue | `getter` | 마지막 데이터(없으면 null) · 데이터 유무 |
| isLoading · isRefreshing | `getter` | 로딩 중 · 이전 데이터를 유지한 채 새로고침 중 |
| requireValue | `getter` | 데이터를 반환. 없으면 예외 |
| AsyncValue.guard(fn) | `static 메서드` | 예외를 `AsyncError`로 바꿔 반환 |

## 사용 예시

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final userNameProvider = FutureProvider<String>((ref) async {
  await Future<void>.delayed(const Duration(seconds: 1));
  return 'Kim';
});

class UserName extends ConsumerWidget {
  const UserName({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(userNameProvider);

    // 1) Dart 3 switch 패턴 (권장)
    return switch (user) {
      AsyncData(:final value) => Text(value),
      AsyncError(:final error) => Text('오류: $error'),
      _ => const CircularProgressIndicator(),
    };
  }
}

// 2) when: 상태별 콜백
Widget buildWithWhen(AsyncValue<String> user) => user.when(
      data: (name) => Text(name),
      error: (error, stackTrace) => Text('오류: $error'),
      loading: () => const CircularProgressIndicator(),
    );

// 3) 새로고침 중에도 이전 데이터를 보여 주며 진행 표시
Widget buildKeepingData(AsyncValue<String> user) => Column(
      children: [
        if (user.isRefreshing) const LinearProgressIndicator(),
        Text(user.value ?? '불러오는 중'),
      ],
    );
```

## 주의할 점

- 새로고침(`ref.invalidate`) 중에는 이전 데이터가 `AsyncData`로 유지됩니다. 진행 표시가 필요하면 `isRefreshing`을 함께 확인합니다.
- `requireValue`는 데이터가 없으면 예외가 나므로, 데이터가 반드시 있는 상황에서만 씁니다.
