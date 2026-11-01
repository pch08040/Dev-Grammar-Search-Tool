---
name: State 생명주기
cat: 기본 구조
kind: 메서드
order: 70
aliases:
  - lifecycle
  - initState
  - dispose
  - didUpdateWidget
  - didChangeDependencies
  - mounted
  - 초기화
summary: '`StatefulWidget`의 `State`가 만들어지고, 다시 그려지고, 사라질 때 차례로 호출되는 메서드입니다. 초기화는 `initState`, 정리는 `dispose`에서 합니다.'
related:
  - stateful
  - post-frame-callback
  - build-context
doc: 'https://api.flutter.dev/flutter/widgets/State-class.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| initState() | `void` | 최초 1회. 컨트롤러 생성, 구독 시작 |
| didChangeDependencies() | `void` | initState 직후, 의존하는 InheritedWidget(Theme 등)이 바뀔 때 |
| build() | `Widget` | 화면을 그릴 때마다 |
| didUpdateWidget(oldWidget) | `void` | 부모가 새 설정으로 위젯을 다시 만들었을 때 |
| dispose() | `void` | 영구 제거. 컨트롤러·구독 해제 |
| mounted | `bool` | 아직 트리에 붙어 있는지 |

## 사용 예시

```dart
class ChatPage extends StatefulWidget {
  const ChatPage({super.key, required this.roomId});
  final String roomId;

  @override
  State<ChatPage> createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  final _controller = TextEditingController();
  StreamSubscription<Message>? _sub;

  @override
  void initState() {
    super.initState(); // 항상 맨 처음
    _sub = chatService.listen(widget.roomId).listen(_onMessage);
  }

  @override
  void didUpdateWidget(ChatPage oldWidget) {
    super.didUpdateWidget(oldWidget);
    // 부모가 다른 roomId로 다시 만들었으면 구독 교체
    if (oldWidget.roomId != widget.roomId) {
      _sub?.cancel();
      _sub = chatService.listen(widget.roomId).listen(_onMessage);
    }
  }

  void _onMessage(Message m) {
    if (!mounted) return;
    setState(() {/* 목록에 추가 */});
  }

  @override
  void dispose() {
    _sub?.cancel();
    _controller.dispose();
    super.dispose(); // 항상 맨 마지막
  }

  @override
  Widget build(BuildContext context) => TextField(controller: _controller);
}
```

## 주의할 점

- `initState`에서는 `Theme.of(context)`처럼 InheritedWidget을 읽을 수 없습니다. 이런 값은 `didChangeDependencies`나 `build`에서 읽습니다.
- `super.initState()`는 맨 처음에, `super.dispose()`는 맨 마지막에 호출합니다.
- 비동기 작업이 끝난 뒤 `setState()`를 부르기 전에 `mounted`를 확인합니다.
