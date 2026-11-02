---
name: '@riverpod (코드 생성)'
cat: 상태 관리
kind: 어노테이션
order: 140
aliases:
  - riverpod_generator
  - build_runner
  - 코드 생성
  - codegen
  - '@Riverpod'
  - g.dart
summary: 함수나 클래스에 `@riverpod`을 붙이면 `riverpod_generator`가 Provider 선언을 자동으로 만듭니다. 인자는 함수 매개변수로 받고, 기본이 autoDispose입니다.
related:
  - riverpod-setup
  - notifier-provider
  - riverpod-family
  - riverpod-auto-dispose
doc: 'https://pub.dev/packages/riverpod_generator'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| @riverpod 함수 | `함수 → Provider` | 반환 타입에 따라 Provider · FutureProvider · StreamProvider 역할 |
| @riverpod 클래스 | `_$클래스이름 상속` | Notifier · AsyncNotifier 역할 |
| @Riverpod(keepAlive: true) | `어노테이션` | autoDispose 끄기 |
| part '파일.g.dart' | `지시문` | 생성 코드 연결 |

## 사용 예시

```dart
// pubspec: riverpod_annotation, dev: riverpod_generator, build_runner
// 코드 생성: dart run build_runner watch -d
// Ref도 riverpod_annotation이 함께 export하므로 이 import 하나면 됨
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'user_providers.g.dart';

// 함수 → userNameProvider(id)  (FutureProvider.family 역할)
@riverpod
Future<String> userName(Ref ref, int id) async {
  await Future<void>.delayed(const Duration(milliseconds: 100));
  return 'user$id';
}

// 클래스 → counterProvider  (NotifierProvider 역할)
@riverpod
class Counter extends _$Counter {
  @override
  int build() => 0;

  void increment() => state++;
}

// 앱이 살아 있는 동안 유지 → appConfigProvider
@Riverpod(keepAlive: true)
String appConfig(Ref ref) => 'production';

// 위젯에서
// ref.watch(userNameProvider(1));
// ref.read(counterProvider.notifier).increment();
```

## 주의할 점

- 생성된 코드가 없다는 오류가 나면 `dart run build_runner build -d`를 실행합니다. 개발 중에는 `watch`를 켜 둡니다.
- 클래스 이름이 `Counter`면 Provider 이름은 `counterProvider`, 함수 이름이 `userName`이면 `userNameProvider`가 됩니다.
- `part` 파일 이름은 현재 파일 이름과 같아야 합니다(`user_providers.dart` → `user_providers.g.dart`).
