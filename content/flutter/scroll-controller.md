---
name: ScrollController
cat: 목록
kind: 클래스
order: 50
aliases:
  - 스크롤 위치
  - 무한 스크롤
  - 맨 위로 이동
  - 페이지네이션
  - animateTo
  - jumpTo
  - maxScrollExtent
summary: '스크롤 위치를 읽고 이동시킵니다. 끝에 가까워지면 다음 페이지를 불러오는 무한 스크롤에 씁니다.'
related:
  - listview-builder
  - refresh-indicator
  - lifecycle
doc: 'https://api.flutter.dev/flutter/widgets/ScrollController-class.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| position.pixels | `double` | 현재 스크롤 위치 |
| position.maxScrollExtent | `double` | 스크롤할 수 있는 최대 위치 |
| animateTo() | `Future<void>` | 지정 위치로 애니메이션 이동 |
| jumpTo() | `void` | 지정 위치로 즉시 이동 |
| hasClients | `bool` | 연결된 스크롤 위젯이 있는지 |

## 사용 예시

```dart
class _FeedPageState extends State<FeedPage> {
  final _controller = ScrollController();
  final _items = <String>[];
  bool _loading = false;

  @override
  void initState() {
    super.initState();
    _controller.addListener(() {
      // 끝에서 200px 남았을 때 다음 페이지 요청
      if (_controller.position.pixels >= _controller.position.maxScrollExtent - 200) {
        _loadMore();
      }
    });
  }

  Future<void> _loadMore() async {
    if (_loading) return; // 중복 호출 방지
    _loading = true;
    final next = await api.fetchPage(_items.length);
    if (!mounted) return;
    setState(() => _items.addAll(next));
    _loading = false;
  }

  void _scrollToTop() {
    if (!_controller.hasClients) return;
    _controller.animateTo(0, duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      controller: _controller,
      itemCount: _items.length,
      itemBuilder: (context, i) => ListTile(title: Text(_items[i])),
    );
  }
}
```

## 주의할 점

- 리스너는 스크롤할 때마다 호출됩니다. 로딩 중 플래그로 중복 요청을 막습니다.
- 목록이 화면에 붙기 전에 `animateTo`를 호출하면 오류가 납니다. `hasClients`를 먼저 확인합니다.
- `State`의 `dispose()`에서 반드시 `controller.dispose()`를 호출합니다.
