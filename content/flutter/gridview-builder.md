---
name: GridView.builder
cat: 목록
kind: 위젯
order: 20
aliases:
  - 그리드
  - 격자
  - 바둑판 배열
  - 상품 목록
  - SliverGridDelegateWithFixedCrossAxisCount
  - crossAxisCount
  - childAspectRatio
summary: '항목을 격자 모양으로 배치하는 스크롤 목록입니다. 화면에 보이는 칸만 만들어 그립니다.'
related:
  - listview-builder
  - card
  - expanded-flexible
doc: 'https://api.flutter.dev/flutter/widgets/GridView-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| gridDelegate | `SliverGridDelegate` | 열 개수, 간격, 칸 비율 |
| itemCount | `int?` | 항목 개수 |
| itemBuilder | `NullableIndexedWidgetBuilder` | 각 칸을 만드는 함수 |
| padding | `EdgeInsetsGeometry?` | 바깥 여백 |

## 사용 예시

```dart
GridView.builder(
  padding: const EdgeInsets.all(12),
  itemCount: products.length,
  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount: 2,       // 한 줄에 2칸
    mainAxisSpacing: 12,     // 세로 간격
    crossAxisSpacing: 12,    // 가로 간격
    childAspectRatio: 3 / 4, // 칸의 가로:세로 비율
  ),
  itemBuilder: (context, index) {
    final p = products[index];
    return Card(
      clipBehavior: Clip.antiAlias,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Image.network(p.imageUrl, fit: BoxFit.cover, width: double.infinity),
          ),
          Padding(padding: const EdgeInsets.all(8), child: Text(p.name)),
        ],
      ),
    );
  },
);

// 화면 너비에 따라 열 개수를 자동 조절
GridView.builder(
  gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
    maxCrossAxisExtent: 180, // 한 칸의 최대 너비
  ),
  itemCount: 30,
  itemBuilder: (context, i) => Center(child: Text('$i')),
);
```

## 주의할 점

- 칸 안에서 overflow 오류가 나면 `childAspectRatio`를 조정하거나, 칸 높이를 고정하는 `mainAxisExtent`를 지정합니다.
- `Column` 안에 넣을 때는 `Expanded`로 감쌉니다. `shrinkWrap: true`는 모든 칸을 한 번에 만들어 항목이 많으면 느려집니다.
