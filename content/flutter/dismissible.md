---
name: Dismissible
cat: 목록
kind: 위젯
order: 100
aliases:
  - 스와이프 삭제
  - 밀어서 삭제
  - 스와이프
  - confirmDismiss
  - onDismissed
  - DismissDirection
summary: 목록 항목을 옆으로 밀어서 없애는 동작을 붙입니다. 밀린 뒤 `onDismissed`에서 실제 데이터를 지웁니다.
related:
  - listview-builder
  - key
  - snackbar
  - show-dialog
doc: 'https://api.flutter.dev/flutter/widgets/Dismissible-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| key | `Key` | 항목마다 고유한 키 (필수) |
| child | `Widget` | 밀어서 없앨 항목 |
| direction | `DismissDirection` | 밀 수 있는 방향 (`endToStart`: 오른쪽에서 왼쪽) |
| background | `Widget?` | 밀 때 뒤에 보이는 배경 (빨간 삭제 표시 등) |
| confirmDismiss | `Future<bool?> Function(DismissDirection)?` | `false`를 돌려주면 원래 자리로 돌아감 |
| onDismissed | `void Function(DismissDirection)?` | 밀려서 사라진 뒤 호출 |

## 사용 예시

```dart
ListView.builder(
  itemCount: _items.length,
  itemBuilder: (context, index) {
    final item = _items[index];
    return Dismissible(
      key: ValueKey(item.id), // index가 아니라 데이터의 고유 id
      direction: DismissDirection.endToStart,
      background: Container(
        color: Colors.red,
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.symmetric(horizontal: 20),
        child: const Icon(Icons.delete, color: Colors.white),
      ),
      // 삭제 전에 한 번 더 확인
      confirmDismiss: (direction) => showDialog<bool>(
        context: context,
        builder: (dialogContext) => AlertDialog(
          title: const Text('삭제할까요?'),
          actions: [
            TextButton(onPressed: () => Navigator.pop(dialogContext, false), child: const Text('취소')),
            TextButton(onPressed: () => Navigator.pop(dialogContext, true), child: const Text('삭제')),
          ],
        ),
      ),
      onDismissed: (direction) {
        setState(() => _items.removeAt(index)); // 실제 목록에서 제거
      },
      child: ListTile(title: Text(item.title)),
    );
  },
);
```

## 주의할 점

- `onDismissed`에서 목록 데이터를 실제로 지우지 않으면 `A dismissed Dismissible widget is still part of the tree` 오류가 납니다.
- `key`에 `index`를 쓰면 삭제 뒤 다른 항목과 키가 섞입니다. 데이터의 고유 id로 `ValueKey`를 만듭니다.
