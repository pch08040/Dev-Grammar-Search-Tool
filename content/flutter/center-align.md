---
name: Center · Align
cat: 레이아웃
kind: 위젯
order: 80
aliases:
  - 가운데 정렬
  - 정렬
  - Alignment
  - 오른쪽 위
  - 중앙
  - topRight
summary: 자식 위젯을 부모 영역 안에서 정렬합니다. `Center`는 가운데, `Align`은 `Alignment`로 원하는 위치에 둡니다.
related:
  - stack-positioned
  - column-row
  - container
doc: 'https://api.flutter.dev/flutter/widgets/Align-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| alignment | `AlignmentGeometry` | Align 전용. `Alignment.topRight`, `Alignment(x, y)` 등 (기본 center) |
| widthFactor / heightFactor | `double?` | 자식 크기의 몇 배로 자신의 크기를 정할지 |
| child | `Widget?` | 정렬할 위젯 |

## 사용 예시

```dart
// 화면 가운데에 로딩 표시
const Center(child: CircularProgressIndicator());

// 오른쪽 아래에 버튼
Align(
  alignment: Alignment.bottomRight,
  child: Padding(
    padding: const EdgeInsets.all(16),
    child: FloatingActionButton(onPressed: () {}, child: const Icon(Icons.add)),
  ),
);

// 좌표로 지정: x, y 모두 -1(왼쪽·위) ~ 1(오른쪽·아래)
const Align(
  alignment: Alignment(0, -0.5), // 가로 가운데, 세로 위쪽 1/4 지점
  child: Text('안내 문구'),
);
```

## 주의할 점

- `Center`는 부모가 허용하는 만큼 최대한 커집니다. `Column` 안에서 가로 가운데 정렬만 원하면 `crossAxisAlignment: CrossAxisAlignment.center`가 더 맞습니다.
- 언어 방향에 따라 좌우가 바뀌어야 하면 `AlignmentDirectional.centerStart`처럼 Directional 버전을 씁니다.
