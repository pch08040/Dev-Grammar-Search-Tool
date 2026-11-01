---
name: Column · Row
cat: 레이아웃
kind: 위젯
order: 30
aliases:
  - 세로 배치
  - 가로 배치
  - 정렬
  - mainAxisAlignment
  - crossAxisAlignment
  - Expanded
  - spacing
summary: 자식 위젯을 세로(Column) 또는 가로(Row)로 나란히 배치합니다.
related:
  - container
  - listview-builder
doc: 'https://api.flutter.dev/flutter/widgets/Column-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| children | `List<Widget>` | 배치할 위젯 목록 |
| mainAxisAlignment | `MainAxisAlignment` | 주축 정렬 (start, center, spaceBetween …) |
| crossAxisAlignment | `CrossAxisAlignment` | 교차축 정렬 (start, center, stretch …) |
| mainAxisSize | `MainAxisSize` | max(기본) 또는 min |
| spacing | `double` | 자식 사이 간격 (Flutter 3.27+) |

## 사용 예시

```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    const Icon(Icons.person),
    const SizedBox(width: 8),
    // 남은 공간을 모두 차지
    Expanded(
      child: Text('긴 이름이 들어가도 넘치지 않음', overflow: TextOverflow.ellipsis),
    ),
    TextButton(onPressed: () {}, child: const Text('편집')),
  ],
);
```

## 주의할 점

- 노란·검은 줄무늬 overflow 오류가 나면 넘치는 자식을 Expanded 또는 Flexible로 감쌉니다.
