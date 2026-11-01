---
name: Padding
cat: 레이아웃
kind: 위젯
order: 40
aliases:
  - 여백
  - 안쪽 여백
  - EdgeInsets
  - symmetric
  - only
  - fromLTRB
summary: 자식 위젯 주위에 여백을 줍니다. 여백만 필요할 때는 `Container`보다 `Padding`이 가볍습니다.
related:
  - container
  - sized-box
  - safe-area
doc: 'https://api.flutter.dev/flutter/widgets/Padding-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| padding | `EdgeInsetsGeometry` | 여백 (필수) |
| child | `Widget?` | 여백을 줄 위젯 |

## 사용 예시

```dart
// 네 방향 같은 여백
const Padding(
  padding: EdgeInsets.all(16),
  child: Text('본문'),
);

// 가로·세로 따로
Padding(
  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
  child: Row(children: [/* ... */]),
);

// 원하는 방향만
const Padding(
  padding: EdgeInsets.only(left: 16, bottom: 8),
  child: Text('제목'),
);

// 왼쪽, 위, 오른쪽, 아래 순서
const Padding(
  padding: EdgeInsets.fromLTRB(16, 8, 16, 24),
  child: Text('하단 여백이 큰 문단'),
);
```

## 주의할 점

- 오른쪽에서 왼쪽으로 쓰는 언어(아랍어 등)까지 지원하려면 `left`/`right` 대신 `EdgeInsetsDirectional.only(start:, end:)`를 씁니다.
- 위젯 사이 간격만 필요하면 `SizedBox(height: 8)`나 `Column`/`Row`의 `spacing`이 더 간단합니다.
