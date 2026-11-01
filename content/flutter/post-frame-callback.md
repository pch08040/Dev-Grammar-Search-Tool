---
name: addPostFrameCallback
cat: 기본 구조
kind: 메서드
order: 90
aliases:
  - 첫 프레임 후
  - 화면 그린 뒤 실행
  - WidgetsBinding
  - initState에서 다이얼로그
  - 빌드 후 실행
summary: 현재 프레임을 다 그린 직후에 한 번 실행할 코드를 등록합니다. `initState`에서 다이얼로그를 띄우거나, 화면이 그려진 뒤 크기·스크롤 위치를 다룰 때 씁니다.
signature: 'WidgetsBinding.instance.addPostFrameCallback((Duration timeStamp) { ... })'
related:
  - lifecycle
  - show-dialog
  - scroll-controller
doc: 'https://api.flutter.dev/flutter/scheduler/SchedulerBinding/addPostFrameCallback.html'
---

## 사용 예시

```dart
class _HomePageState extends State<HomePage> {
  final _scrollController = ScrollController();

  @override
  void initState() {
    super.initState();
    // initState에서는 아직 화면이 없어서 다이얼로그를 바로 띄울 수 없음
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) return;
      showDialog(
        context: context,
        builder: (_) => const AlertDialog(content: Text('새 공지가 있습니다')),
      );
    });
  }

  void _addMessage() {
    setState(() => messages.add('새 메시지'));
    // 새 항목이 그려진 뒤에 맨 아래로 스크롤
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _scrollController.jumpTo(_scrollController.position.maxScrollExtent);
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => const Placeholder();
}
```

## 주의할 점

- 콜백은 한 번만 실행됩니다. 매 프레임 실행되는 것이 아닙니다.
- 콜백이 실행될 때 위젯이 이미 사라졌을 수 있으므로 `mounted`를 먼저 확인합니다.
