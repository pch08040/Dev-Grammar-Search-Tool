---
name: Spacer · Divider
cat: 레이아웃
kind: 위젯
order: 140
aliases:
  - 빈 공간 밀기
  - 구분선
  - 가로선
  - VerticalDivider
  - 양끝 정렬
  - 선 긋기
summary: '`Spacer`는 `Row`·`Column`에서 남은 공간을 차지해 다른 위젯을 끝으로 밀고, `Divider`는 가로 구분선을 그립니다.'
related:
  - column-row
  - expanded-flexible
  - list-tile
doc: 'https://api.flutter.dev/flutter/widgets/Spacer-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| Spacer(flex) | `int` | 남은 공간을 나눌 비율 (기본 1) |
| Divider(height) | `double?` | 구분선이 차지하는 전체 높이 (선 위아래 여백 포함) |
| Divider(thickness) | `double?` | 선 두께 |
| Divider(indent / endIndent) | `double?` | 시작·끝 쪽 들여쓰기 |
| Divider(color) | `Color?` | 선 색 |

## 사용 예시

```dart
Column(
  children: [
    Row(
      children: [
        const Text('총 금액'),
        const Spacer(), // 가격을 오른쪽 끝으로 밀기
        Text('$total원', style: const TextStyle(fontWeight: FontWeight.bold)),
      ],
    ),
    const Divider(height: 32, thickness: 1),
    const Row(
      children: [
        Text('왼쪽'),
        Spacer(flex: 2),
        Text('가운데 쪽'),
        Spacer(),
        Text('오른쪽'),
      ],
    ),
  ],
);

// Row 안의 세로 구분선은 높이가 정해져 있어야 보임
const SizedBox(
  height: 24,
  child: Row(children: [Text('A'), VerticalDivider(), Text('B')]),
);
```

## 주의할 점

- `Divider`의 `height`는 선 두께가 아니라 위아래 여백까지 포함한 높이입니다. 선 두께는 `thickness`로 정합니다.
- `Spacer`도 `Expanded`처럼 `Row`·`Column`의 직접 자식이어야 하고, 스크롤 방향에서는 쓸 수 없습니다.
