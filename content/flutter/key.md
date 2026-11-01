---
name: Key · ValueKey · GlobalKey
cat: 기본 구조
kind: 클래스
order: 80
aliases:
  - key
  - 키
  - ValueKey
  - UniqueKey
  - GlobalKey
  - 'GlobalKey<FormState>'
  - 순서 변경 버그
summary: 위젯을 구분하는 식별자입니다. 목록 항목의 순서가 바뀔 때 상태가 섞이지 않게 하거나(`ValueKey`), 다른 곳에서 특정 위젯의 State에 접근할 때(`GlobalKey`) 씁니다.
related:
  - form-validation
  - listview-builder
  - stateful
doc: 'https://api.flutter.dev/flutter/foundation/Key-class.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| ValueKey(value) | `LocalKey` | 값(id 등)으로 구분. 목록 항목에 가장 많이 씀 |
| ObjectKey(object) | `LocalKey` | 객체 동일성으로 구분 |
| UniqueKey() | `LocalKey` | 만들 때마다 새 키. 강제로 새 위젯으로 취급 |
| GlobalKey<T>() | `GlobalKey<T>` | 앱 전체에서 유일. currentState로 State 접근 |

## 사용 예시

```dart
// 1) 순서가 바뀌는 목록: id로 키를 지정해야 체크 상태가 섞이지 않음
ReorderableListView(
  onReorder: _onReorder,
  children: [
    for (final todo in todos)
      CheckboxListTile(
        key: ValueKey(todo.id),
        value: todo.done,
        title: Text(todo.title),
        onChanged: (v) => _toggle(todo, v),
      ),
  ],
);

// 2) GlobalKey로 Form의 State에 접근
final _formKey = GlobalKey<FormState>();

Form(
  key: _formKey,
  child: Column(children: [/* TextFormField들 */]),
);

void _submit() {
  if (_formKey.currentState!.validate()) {
    _formKey.currentState!.save();
  }
}
```

## 주의할 점

- `GlobalKey`는 `build()` 안에서 만들지 말고 State의 필드로 한 번만 만듭니다. 매번 새로 만들면 State가 계속 초기화됩니다.
- 목록 키에 인덱스(`ValueKey(index)`)를 쓰면 순서가 바뀔 때 의미가 없습니다. 항목의 고유 id를 씁니다.
