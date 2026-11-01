---
name: Wrap
cat: 레이아웃
kind: 위젯
order: 90
aliases:
  - 줄바꿈 배치
  - 태그 목록
  - 칩
  - Chip
  - spacing
  - runSpacing
summary: 자식들을 가로로 나열하다가 공간이 부족하면 다음 줄로 넘깁니다. 태그나 칩 목록에 씁니다.
related:
  - column-row
  - expanded-flexible
  - gridview-builder
doc: 'https://api.flutter.dev/flutter/widgets/Wrap-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| children | `List<Widget>` | 배치할 위젯들 |
| spacing | `double` | 같은 줄 안에서 자식 사이 간격 |
| runSpacing | `double` | 줄과 줄 사이 간격 |
| alignment | `WrapAlignment` | 줄 안에서 정렬 (start, center, spaceBetween …) |
| direction | `Axis` | 나열 방향 (기본 horizontal) |

## 사용 예시

```dart
final tags = ['Flutter', 'Dart', 'Firebase', 'UI', '상태 관리', '애니메이션'];

Wrap(
  spacing: 8,
  runSpacing: 8,
  children: [
    for (final tag in tags)
      FilterChip(
        label: Text(tag),
        selected: selected.contains(tag),
        onSelected: (on) => setState(() {
          on ? selected.add(tag) : selected.remove(tag);
        }),
      ),
  ],
);
```

## 주의할 점

- `Row`에서 overflow가 나는 칩 목록은 `Wrap`으로 바꾸면 자동으로 줄이 넘어갑니다.
- 항목이 수백 개라면 `Wrap`은 모두 한 번에 그리므로 `GridView.builder`처럼 지연 생성하는 위젯을 고려합니다.
