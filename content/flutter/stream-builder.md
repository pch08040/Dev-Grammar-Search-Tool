---
name: StreamBuilder
cat: 비동기
kind: 위젯
order: 20
aliases:
  - 실시간 화면
  - 스트림 화면
  - 실시간 갱신
  - snapshot
  - ConnectionState
  - 채팅
summary: '`Stream`에서 새 값이 올 때마다 화면을 다시 그립니다. 실시간 데이터(채팅, 위치, DB 변경 알림)를 표시할 때 씁니다.'
related:
  - futurebuilder
  - stream
  - timer
doc: 'https://api.flutter.dev/flutter/widgets/StreamBuilder-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| stream | `Stream<T>?` | 구독할 스트림 |
| initialData | `T?` | 첫 값이 오기 전에 쓸 초기값 |
| builder | `(context, AsyncSnapshot<T>) => Widget` | 현재 상태에 맞는 화면을 그리는 함수 |

## 사용 예시

```dart
class ChatView extends StatefulWidget {
  const ChatView({super.key, required this.roomId});
  final String roomId;

  @override
  State<ChatView> createState() => _ChatViewState();
}

class _ChatViewState extends State<ChatView> {
  late final Stream<List<Message>> _messages;

  @override
  void initState() {
    super.initState();
    _messages = chatRepository.watchMessages(widget.roomId); // 한 번만 만듦
  }

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<List<Message>>(
      stream: _messages,
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return Center(child: Text('오류: ${snapshot.error}'));
        }
        if (!snapshot.hasData) {
          return const Center(child: CircularProgressIndicator());
        }
        final messages = snapshot.data!;
        return ListView.builder(
          itemCount: messages.length,
          itemBuilder: (context, i) => ListTile(title: Text(messages[i].text)),
        );
      },
    );
  }
}
```

## 주의할 점

- `stream`을 `build()` 안에서 만들면 화면이 다시 그려질 때마다 구독이 새로 시작됩니다. `initState()`에서 한 번만 만듭니다.
- `ConnectionState.waiting`이어도 `initialData`나 이전 값이 있을 수 있습니다. 로딩 표시는 `snapshot.hasData`로 판단하는 편이 안전합니다.
