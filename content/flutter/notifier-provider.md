---
name: Notifier · NotifierProvider
cat: 상태 관리
kind: 클래스
order: 50
aliases:
  - 상태 변경
  - 동기 상태
  - StateNotifier 대체
  - state
  - 할 일 목록
  - 카운터
signature: 'final p = NotifierProvider<MyNotifier, State>(MyNotifier.new);'
summary: 바뀌는 상태와 그 상태를 바꾸는 메서드를 한 클래스에 묶습니다. `build()`가 초기 상태를 만들고, 메서드에서 `state`에 새 값을 대입하면 구독 중인 위젯이 다시 그려집니다.
related:
  - async-notifier
  - ref-watch-read-listen
  - riverpod-legacy
  - riverpod-generator
doc: 'https://pub.dev/documentation/flutter_riverpod/latest/flutter_riverpod/Notifier-class.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| build() | `메서드` | 초기 상태를 반환. 다른 Provider는 여기서 `ref.watch` |
| state | `getter · setter` | 현재 상태. 새 값을 대입하면 구독자에게 알림 |
| ref | `Ref` | Notifier 안에서 다른 Provider 읽기 |
| provider.notifier | `Provider` | `ref.read(p.notifier)`로 메서드 호출 |

## 사용 예시

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

class Todo {
  const Todo({required this.id, required this.title, this.done = false});
  final int id;
  final String title;
  final bool done;

  Todo copyWith({bool? done}) => Todo(id: id, title: title, done: done ?? this.done);
}

class TodoList extends Notifier<List<Todo>> {
  @override
  List<Todo> build() => const []; // 초기 상태

  void add(String title) {
    // 리스트를 직접 수정하지 않고 새 리스트를 대입
    state = [...state, Todo(id: state.length + 1, title: title)];
  }

  void toggle(int id) {
    state = [
      for (final todo in state)
        if (todo.id == id) todo.copyWith(done: !todo.done) else todo,
    ];
  }

  void remove(int id) => state = state.where((t) => t.id != id).toList();
}

final todoListProvider = NotifierProvider<TodoList, List<Todo>>(TodoList.new);

// 위젯에서
// final todos = ref.watch(todoListProvider);
// ref.read(todoListProvider.notifier).add('장보기');
```

## 주의할 점

- `state.add(...)`처럼 기존 객체를 직접 바꾸면 화면이 갱신되지 않습니다. 항상 새 객체를 만들어 `state`에 대입합니다.
- Riverpod 3부터 `StateNotifierProvider`와 `StateProvider`는 레거시입니다. 새 코드는 `Notifier`로 작성합니다.
- 초기 상태는 생성자가 아니라 `build()`에서 만듭니다. `ref`도 `build()`와 메서드 안에서만 씁니다.
