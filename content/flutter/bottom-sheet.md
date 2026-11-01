---
name: showModalBottomSheet
cat: 화면 이동
kind: 함수
order: 40
aliases:
  - 바텀시트
  - 하단 시트
  - 하단 팝업
  - 액션 시트
  - isScrollControlled
  - showDragHandle
summary: 화면 아래에서 올라오는 시트를 띄웁니다. 선택 메뉴나 짧은 입력 폼에 쓰고, 닫힐 때 결과를 `Future`로 돌려받습니다.
signature: 'Future<T?> showModalBottomSheet<T>({required BuildContext context, required WidgetBuilder builder, bool isScrollControlled = false})'
related:
  - show-dialog
  - snackbar
  - form-validation
doc: 'https://api.flutter.dev/flutter/material/showModalBottomSheet.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| builder | `WidgetBuilder` | 시트 내용을 만드는 함수 |
| isScrollControlled | `bool` | `true`면 화면 절반보다 높게 열 수 있음 (입력 폼, 긴 목록) |
| showDragHandle | `bool?` | 위쪽 손잡이 표시 |
| useSafeArea | `bool` | 상단 상태 표시줄 영역을 피함 |
| isDismissible | `bool` | 바깥 영역을 눌러 닫을 수 있는지 |

## 사용 예시

```dart
Future<void> _pickSort() async {
  final sort = await showModalBottomSheet<String>(
    context: context,
    showDragHandle: true,
    builder: (sheetContext) => SafeArea(
      child: Column(
        mainAxisSize: MainAxisSize.min, // 내용 높이만큼만
        children: [
          ListTile(
            leading: const Icon(Icons.schedule),
            title: const Text('최신순'),
            onTap: () => Navigator.pop(sheetContext, 'latest'),
          ),
          ListTile(
            leading: const Icon(Icons.trending_up),
            title: const Text('인기순'),
            onTap: () => Navigator.pop(sheetContext, 'popular'),
          ),
        ],
      ),
    ),
  );
  if (sort != null) setState(() => _sort = sort);
}

// 입력 폼: 키보드에 가리지 않도록 높이 조절
showModalBottomSheet<void>(
  context: context,
  isScrollControlled: true,
  useSafeArea: true,
  builder: (sheetContext) => Padding(
    padding: EdgeInsets.only(bottom: MediaQuery.viewInsetsOf(sheetContext).bottom),
    child: const CommentForm(),
  ),
);
```

## 주의할 점

- 시트 안에 `TextField`가 있으면 `isScrollControlled: true`와 키보드 높이(`MediaQuery.viewInsetsOf(context).bottom`)만큼의 아래 여백을 함께 줘야 키보드에 가리지 않습니다.
- 내용이 짧으면 `Column(mainAxisSize: MainAxisSize.min)`으로 감싸야 시트가 불필요하게 커지지 않습니다.
