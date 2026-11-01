---
name: LayoutBuilder
cat: 레이아웃
kind: 위젯
order: 130
aliases:
  - 반응형
  - 부모 크기
  - constraints
  - BoxConstraints
  - 태블릿 레이아웃
  - maxWidth
summary: 부모가 허용한 크기(`BoxConstraints`)를 보고 다른 레이아웃을 그립니다. 화면 전체가 아니라 실제로 차지한 공간에 맞춘 반응형 화면을 만들 때 씁니다.
related:
  - media-query
  - gridview-builder
  - expanded-flexible
doc: 'https://api.flutter.dev/flutter/widgets/LayoutBuilder-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| builder | `(BuildContext, BoxConstraints) => Widget` | 크기 제약을 받아 위젯을 만드는 함수 |
| constraints.maxWidth / maxHeight | `double` | 쓸 수 있는 최대 너비·높이 |
| constraints.minWidth / minHeight | `double` | 최소 너비·높이 |

## 사용 예시

```dart
LayoutBuilder(
  builder: (context, constraints) {
    // 넓으면 목록 + 상세 2단, 좁으면 목록만
    if (constraints.maxWidth >= 720) {
      return Row(
        children: [
          const SizedBox(width: 320, child: ItemList()),
          const VerticalDivider(width: 1),
          Expanded(child: ItemDetail(item: selected)),
        ],
      );
    }
    return const ItemList();
  },
);

// 너비에 따라 열 개수 계산
LayoutBuilder(
  builder: (context, constraints) {
    final columns = (constraints.maxWidth / 180).floor().clamp(2, 6);
    return GridView.count(crossAxisCount: columns, children: cards);
  },
);
```

## 주의할 점

- 스크롤 방향 안에서는 `maxHeight`가 무한(`double.infinity`)일 수 있습니다. `constraints.hasBoundedHeight`로 확인합니다.
- 기기 화면 전체 크기가 필요하면 `MediaQuery.sizeOf(context)`를 씁니다.
