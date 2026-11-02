---
name: AsyncNotifier · AsyncNotifierProvider
cat: 상태 관리
kind: 클래스
order: 60
aliases:
  - 비동기 상태
  - API 상태 관리
  - 서버 데이터 수정
  - AsyncValue.guard
  - ref.mounted
  - CRUD
signature: 'final p = AsyncNotifierProvider<MyNotifier, State>(MyNotifier.new);'
summary: 비동기로 초기화되는 상태(API 조회 결과 등)와 그 상태를 바꾸는 메서드를 묶습니다. 상태는 `AsyncValue`로 감싸져 로딩, 오류, 데이터를 함께 표현합니다.
related:
  - notifier-provider
  - async-value
  - future-provider
  - riverpod-invalidate-refresh
doc: 'https://pub.dev/documentation/flutter_riverpod/latest/flutter_riverpod/AsyncNotifier-class.html'
---

## 사용 예시

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

class Todo {
  const Todo(this.title);
  final String title;
}

// 실제로는 http, dio 등으로 구현
class TodoApi {
  Future<List<Todo>> fetchAll() async => const [Todo('장보기')];
  Future<void> create(String title) async {}
}

final todoApiProvider = Provider<TodoApi>((ref) => TodoApi());

class TodosNotifier extends AsyncNotifier<List<Todo>> {
  @override
  Future<List<Todo>> build() {
    // 처음 구독될 때 서버에서 불러옴
    return ref.watch(todoApiProvider).fetchAll();
  }

  Future<void> add(String title) async {
    final api = ref.read(todoApiProvider);
    state = const AsyncLoading();
    // 예외가 나면 AsyncError, 성공하면 AsyncData
    final result = await AsyncValue.guard(() async {
      await api.create(title);
      return api.fetchAll();
    });
    if (!ref.mounted) return; // 기다리는 사이 폐기되었으면 중단
    state = result;
  }
}

final todosProvider =
    AsyncNotifierProvider<TodosNotifier, List<Todo>>(TodosNotifier.new);

// 위젯에서
// final todos = ref.watch(todosProvider); // AsyncValue<List<Todo>>
// await ref.read(todosProvider.notifier).add('운동');
```

## 주의할 점

- `AsyncValue.guard`를 쓰면 try/catch 없이 예외를 `AsyncError` 상태로 바꿀 수 있습니다.
- `await` 뒤에 `state`를 바꾸기 전에 `ref.mounted`로 Provider가 아직 살아 있는지 확인합니다(Riverpod 3).
- 단순히 다시 불러오기만 할 때는 메서드를 만들지 않고 `ref.invalidateSelf()`나 위젯에서 `ref.invalidate(todosProvider)`를 씁니다.
