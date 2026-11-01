---
name: showDialog · AlertDialog
cat: 화면 이동
kind: 함수
order: 30
aliases:
  - 팝업
  - 알림창
  - 확인창
  - 다이얼로그
  - confirm
  - AlertDialog
  - barrierDismissible
summary: 화면 위에 팝업을 띄우고, 닫힐 때 사용자의 선택을 `Future`로 돌려받습니다. 확인·취소 같은 간단한 팝업은 `AlertDialog`로 만듭니다.
signature: 'Future<T?> showDialog<T>({required BuildContext context, required WidgetBuilder builder, bool barrierDismissible = true})'
related:
  - bottom-sheet
  - snackbar
  - navigator
  - async-await
doc: 'https://api.flutter.dev/flutter/material/showDialog.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| context | `BuildContext` | 팝업을 띄울 화면의 context |
| builder | `WidgetBuilder` | 팝업 위젯을 만드는 함수 (보통 `AlertDialog`) |
| barrierDismissible | `bool` | 바깥 영역을 눌러 닫을 수 있는지 (기본 `true`) |
| AlertDialog.title / content | `Widget?` | 제목과 본문 |
| AlertDialog.actions | `List<Widget>?` | 하단 버튼 목록 |

## 사용 예시

```dart
Future<void> _confirmDelete() async {
  final ok = await showDialog<bool>(
    context: context,
    barrierDismissible: false, // 버튼으로만 닫기
    builder: (dialogContext) => AlertDialog(
      title: const Text('삭제할까요?'),
      content: const Text('삭제한 항목은 되돌릴 수 없습니다.'),
      actions: [
        TextButton(
          onPressed: () => Navigator.pop(dialogContext, false),
          child: const Text('취소'),
        ),
        FilledButton(
          onPressed: () => Navigator.pop(dialogContext, true),
          child: const Text('삭제'),
        ),
      ],
    ),
  );

  // 바깥을 눌러 닫으면 null이 오므로 true일 때만 진행
  if (ok != true) return;
  await repository.delete(item.id);

  // await 뒤에 context를 쓰기 전에 화면이 살아 있는지 확인
  if (!mounted) return;
  ScaffoldMessenger.of(context).showSnackBar(
    const SnackBar(content: Text('삭제했습니다')),
  );
}
```

## 주의할 점

- 결과 타입은 `T?`입니다. 바깥 영역이나 뒤로가기로 닫으면 `null`이 오므로 `ok == true`처럼 비교합니다.
- 팝업을 닫을 때는 `builder`가 넘겨주는 `dialogContext`로 `Navigator.pop()`을 호출합니다. 바깥 화면의 context로 닫으면 팝업 대신 이전 화면이 닫힐 수 있습니다.
- `await showDialog()` 뒤에 `context`를 다시 쓰기 전에 `if (!mounted) return;`으로 확인합니다.
