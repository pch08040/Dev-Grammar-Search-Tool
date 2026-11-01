---
name: FutureBuilder
cat: 비동기
kind: 위젯
order: 10
aliases:
  - 비동기 화면
  - API 결과 표시
  - 로딩
  - snapshot
  - ConnectionState
summary: 'Future의 상태(로딩, 오류, 완료)에 따라 다른 화면을 그립니다.'
related:
  - async-await
  - listview-builder
doc: 'https://api.flutter.dev/flutter/widgets/FutureBuilder-class.html'
---

## 사용 예시

```dart
late final Future<List<User>> _usersFuture;

@override
void initState() {
  super.initState();
  _usersFuture = api.fetchUsers(); // build 안에서 만들지 않음
}

@override
Widget build(BuildContext context) {
  return FutureBuilder<List<User>>(
    future: _usersFuture,
    builder: (context, snapshot) {
      if (snapshot.connectionState != ConnectionState.done) {
        return const Center(child: CircularProgressIndicator());
      }
      if (snapshot.hasError) {
        return Center(child: Text('오류: ${snapshot.error}'));
      }
      final users = snapshot.data ?? [];
      return ListView(children: users.map((u) => ListTile(title: Text(u.name))).toList());
    },
  );
}
```

## 주의할 점

- future를 build() 안에서 만들면 화면이 다시 그려질 때마다 API를 다시 호출합니다. initState에서 한 번만 만듭니다.
