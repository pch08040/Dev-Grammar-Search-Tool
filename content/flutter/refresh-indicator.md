---
name: RefreshIndicator
cat: 목록
kind: 위젯
order: 40
aliases:
  - 당겨서 새로고침
  - pull to refresh
  - 새로고침
  - onRefresh
  - AlwaysScrollableScrollPhysics
summary: '목록을 아래로 당기면 로딩 표시를 보여 주고 `onRefresh`를 호출합니다. 반환한 `Future`가 끝나면 표시가 사라집니다.'
related:
  - listview-builder
  - scroll-controller
  - async-await
doc: 'https://api.flutter.dev/flutter/material/RefreshIndicator-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| onRefresh | `RefreshCallback` | 당겼을 때 호출, `Future<void>`를 반환 |
| child | `Widget` | 스크롤 가능한 위젯 (ListView 등) |
| color | `Color?` | 로딩 표시 색 |
| displacement | `double` | 로딩 표시가 내려오는 위치 |

## 사용 예시

```dart
List<Item> _items = [];

Future<void> _refresh() async {
  final items = await api.fetchItems(); // 새 데이터 조회
  if (!mounted) return;
  setState(() => _items = items);
}

@override
Widget build(BuildContext context) {
  return RefreshIndicator(
    onRefresh: _refresh, // Future가 끝나면 로딩 표시가 사라짐
    child: ListView.builder(
      // 항목이 적어 화면을 다 채우지 못해도 당길 수 있게
      physics: const AlwaysScrollableScrollPhysics(),
      itemCount: _items.length,
      itemBuilder: (context, i) => ListTile(title: Text(_items[i].title)),
    ),
  );
}
```

## 주의할 점

- `child`는 스크롤 가능한 위젯이어야 합니다. 빈 목록을 `Center(child: Text('없음'))`로 바꾸면 당길 수 없으니, 빈 상태도 `ListView` 안에 넣습니다.
- `onRefresh`는 작업이 끝날 때 완료되는 `Future`를 반환해야 합니다. `await` 없이 바로 끝나면 로딩 표시가 곧바로 사라집니다.
