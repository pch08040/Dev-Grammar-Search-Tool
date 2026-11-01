---
name: Icon · Icons
cat: 텍스트 · 이미지
kind: 위젯
order: 40
aliases:
  - 아이콘
  - 머티리얼 아이콘
  - IconTheme
  - CupertinoIcons
  - Icons.outlined
summary: 'Material 아이콘을 표시합니다. 아이콘 모양은 `Icons` 클래스의 상수로 고릅니다.'
related:
  - icon-button
  - image
doc: 'https://api.flutter.dev/flutter/widgets/Icon-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| icon | `IconData?` | 아이콘 모양 (첫 번째 위치 인자, 예: `Icons.home`) |
| size | `double?` | 크기 (기본 24) |
| color | `Color?` | 색 |
| semanticLabel | `String?` | 스크린 리더가 읽을 설명 |

## 사용 예시

```dart
const Icon(Icons.favorite, color: Colors.red, size: 28);

// 텍스트 옆 아이콘
Row(
  children: [
    const Icon(Icons.location_on_outlined, size: 18),
    const SizedBox(width: 4),
    Text('서울시 강남구', style: Theme.of(context).textTheme.bodySmall),
  ],
);

// 하위 아이콘들의 크기·색을 한 번에 지정
IconTheme(
  data: IconThemeData(
    color: Theme.of(context).colorScheme.primary,
    size: 20,
  ),
  child: const Row(
    children: [Icon(Icons.star), Icon(Icons.star), Icon(Icons.star_half)],
  ),
);

// iOS 스타일 아이콘
// import 'package:flutter/cupertino.dart';
const Icon(CupertinoIcons.heart);
```

## 주의할 점

- `Icon`은 눌리지 않습니다. 탭이 필요하면 `IconButton`을 씁니다.
- 같은 아이콘에도 `_outlined`, `_rounded`, `_sharp` 변형이 있습니다. 앱 안에서는 한 가지 스타일로 통일합니다.
