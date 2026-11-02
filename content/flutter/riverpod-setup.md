---
name: Riverpod 설치 · ProviderScope
cat: 상태 관리
kind: 패키지
order: 10
aliases:
  - riverpod
  - 리버팟
  - 상태 관리
  - flutter_riverpod
  - ProviderScope
  - 설치
signature: 'void main() => runApp(const ProviderScope(child: MyApp()));'
summary: Riverpod은 Provider로 상태와 의존성을 관리하는 패키지입니다. 앱 최상단을 `ProviderScope`로 감싸야 Provider를 쓸 수 있습니다.
related:
  - riverpod-provider
  - consumer-widget
  - riverpod-generator
  - main
doc: 'https://riverpod.dev/docs/introduction/getting_started'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| flutter_riverpod | `패키지` | Flutter용 Riverpod 본체 (3.x) |
| riverpod_annotation | `패키지` | `@riverpod` 어노테이션 (코드 생성 방식일 때) |
| riverpod_generator · build_runner | `dev 패키지` | `.g.dart` 코드 생성기 |
| riverpod_lint | `dev 패키지` | Riverpod 전용 린트 규칙 |
| ProviderScope | `위젯` | 모든 Provider의 상태를 보관하는 최상위 위젯 |

## 사용 예시

```dart
// 설치
// flutter pub add flutter_riverpod
// 코드 생성 방식까지 쓸 때
// flutter pub add riverpod_annotation dev:riverpod_generator dev:build_runner

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

// 읽기 전용 값을 제공하는 가장 단순한 Provider
final helloProvider = Provider<String>((ref) => 'Hello Riverpod');

void main() {
  runApp(
    // 앱 전체를 ProviderScope로 감쌈 (필수)
    const ProviderScope(child: MyApp()),
  );
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final hello = ref.watch(helloProvider);
    return MaterialApp(
      home: Scaffold(body: Center(child: Text(hello))),
    );
  }
}
```

## 주의할 점

- `ProviderScope`로 감싸지 않으면 Provider를 읽는 순간 `ProviderScope`를 찾을 수 없다는 오류가 납니다.
- Riverpod 3부터 `StateProvider`, `StateNotifierProvider`, `ChangeNotifierProvider`는 레거시로 분리되어 `package:flutter_riverpod/legacy.dart`에서 가져와야 합니다. 새 코드는 `Notifier`를 씁니다.
- Riverpod 3는 실패한 Provider를 자동으로 재시도합니다. 끄려면 `ProviderScope(retry: (retryCount, error) => null, child: ...)`처럼 지정합니다.
