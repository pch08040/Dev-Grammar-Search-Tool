---
name: BuildContext
cat: 기본 구조
kind: 클래스
order: 50
aliases:
  - context
  - 컨텍스트
  - Theme.of
  - Navigator.of
  - context.mounted
  - Builder
  - 위젯 트리 위치
summary: 위젯 트리에서 현재 위젯의 위치를 나타냅니다. `Theme.of(context)`처럼 위쪽 조상 위젯의 정보를 찾을 때 씁니다.
related:
  - media-query
  - lifecycle
  - stateful
doc: 'https://api.flutter.dev/flutter/widgets/BuildContext-class.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| Theme.of(context) | `ThemeData` | 현재 테마 (색상, 글꼴) |
| Navigator.of(context) | `NavigatorState` | 화면 이동 |
| ScaffoldMessenger.of(context) | `ScaffoldMessengerState` | 스낵바 표시 |
| MediaQuery.sizeOf(context) | `Size` | 화면 크기 |
| context.mounted | `bool` | 위젯이 아직 트리에 붙어 있는지 |

## 사용 예시

```dart
class SaveButton extends StatelessWidget {
  const SaveButton({super.key});

  @override
  Widget build(BuildContext context) {
    // 위쪽 조상 위젯(MaterialApp의 Theme)에서 값 찾기
    final colors = Theme.of(context).colorScheme;

    return FilledButton(
      style: FilledButton.styleFrom(backgroundColor: colors.primary),
      onPressed: () async {
        await saveData();
        // await 뒤에는 위젯이 사라졌을 수 있으므로 먼저 확인
        if (!context.mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('저장했습니다')),
        );
        Navigator.of(context).pop();
      },
      child: const Text('저장'),
    );
  }
}
```

## 주의할 점

- `Scaffold`를 만드는 같은 `build()`의 context로는 그 `Scaffold`를 찾을 수 없습니다. 아래쪽에서 쓰려면 `Builder`로 감싸서 새 context를 받습니다.
- `await` 뒤에 context를 쓸 때는 `if (!context.mounted) return;`으로 먼저 확인합니다. State 안에서는 `mounted`를 씁니다.
