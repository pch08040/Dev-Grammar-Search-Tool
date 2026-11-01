---
name: SnackBar · ScaffoldMessenger
cat: 화면 이동
kind: 위젯
order: 50
aliases:
  - 스낵바
  - 토스트
  - 하단 알림
  - 알림 메시지
  - 실행 취소
  - showSnackBar
summary: 화면 아래에 잠깐 나타나는 알림 메시지입니다. `ScaffoldMessenger.of(context).showSnackBar()`로 띄웁니다.
related:
  - scaffold
  - show-dialog
  - dismissible
doc: 'https://api.flutter.dev/flutter/material/SnackBar-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| content | `Widget` | 메시지 (보통 `Text`) |
| action | `SnackBarAction?` | 오른쪽 버튼 (예: 실행 취소) |
| duration | `Duration` | 표시 시간 (기본 4초) |
| behavior | `SnackBarBehavior?` | `fixed`(바닥 고정) 또는 `floating`(떠 있음) |
| showCloseIcon | `bool?` | 닫기 아이콘 표시 |

## 사용 예시

```dart
void _showDeleted(Item item) {
  final messenger = ScaffoldMessenger.of(context);

  // 이전 스낵바가 쌓여 있으면 먼저 닫기
  messenger.hideCurrentSnackBar();
  messenger.showSnackBar(
    SnackBar(
      content: Text('${item.title}을(를) 삭제했습니다'),
      behavior: SnackBarBehavior.floating,
      duration: const Duration(seconds: 3),
      action: SnackBarAction(
        label: '실행 취소',
        onPressed: () => setState(() => _items.add(item)),
      ),
    ),
  );
}
```

## 주의할 점

- 버튼을 여러 번 누르면 스낵바가 줄을 서서 차례로 나타납니다. 새 메시지를 바로 보여 주려면 `hideCurrentSnackBar()`를 먼저 호출합니다.
- `await` 뒤에 띄울 때는 `if (!mounted) return;`으로 확인하거나, `await` 전에 `ScaffoldMessenger.of(context)`를 변수에 담아 두고 씁니다.
