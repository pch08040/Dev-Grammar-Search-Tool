---
name: IconButton
cat: 입력 · 버튼
kind: 위젯
order: 60
aliases:
  - 아이콘 버튼
  - 즐겨찾기 토글
  - 앱바 액션
  - tooltip
  - IconButton.filled
  - selectedIcon
summary: '아이콘만 있는 버튼입니다. 앱바 액션, 삭제·즐겨찾기 버튼처럼 공간이 좁은 곳에 씁니다.'
related:
  - button
  - icon
  - scaffold
doc: 'https://api.flutter.dev/flutter/material/IconButton-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| icon | `Widget` | 표시할 아이콘 |
| onPressed | `VoidCallback?` | 눌렀을 때 호출, `null`이면 비활성화 |
| tooltip | `String?` | 길게 누르면 보이는 설명, 접근성 라벨 |
| isSelected | `bool?` | 선택 상태 (토글 버튼) |
| selectedIcon | `Widget?` | 선택 상태일 때 아이콘 |
| iconSize | `double?` | 아이콘 크기 |

## 사용 예시

```dart
IconButton(
  icon: const Icon(Icons.delete_outline),
  tooltip: '삭제',
  onPressed: () => _delete(item.id),
);

// 즐겨찾기 토글
IconButton(
  isSelected: _isFavorite,
  icon: const Icon(Icons.favorite_border),
  selectedIcon: const Icon(Icons.favorite),
  onPressed: () => setState(() => _isFavorite = !_isFavorite),
);

// 배경이 채워진 Material 3 스타일 (filledTonal, outlined도 있음)
IconButton.filled(
  icon: const Icon(Icons.add),
  onPressed: _add,
);

// AppBar 오른쪽 액션
AppBar(
  title: const Text('목록'),
  actions: [
    IconButton(icon: const Icon(Icons.search), onPressed: () {}),
  ],
);
```

## 주의할 점

- 아이콘만 있는 버튼은 의미가 드러나지 않으므로 `tooltip`을 넣습니다. 스크린 리더도 이 값을 읽습니다.
- 터치 영역은 최소 48×48을 유지합니다. `padding`이나 `constraints`를 너무 줄이면 누르기 어려워집니다.
