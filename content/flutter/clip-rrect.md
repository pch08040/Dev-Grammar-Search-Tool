---
name: ClipRRect
cat: 텍스트 · 이미지
kind: 위젯
order: 60
aliases:
  - 둥근 모서리
  - 이미지 둥글게
  - 자르기
  - ClipOval
  - borderRadius
  - clip
summary: '자식 위젯을 둥근 사각형 모양으로 잘라 냅니다. 이미지 모서리를 둥글게 만들 때 주로 씁니다.'
related:
  - image
  - container
  - card
doc: 'https://api.flutter.dev/flutter/widgets/ClipRRect-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| borderRadius | `BorderRadiusGeometry` | 모서리 둥글기 (기본 0) |
| clipBehavior | `Clip` | 자르는 방식 (기본 antiAlias) |
| child | `Widget?` | 잘라 낼 위젯 |

## 사용 예시

```dart
ClipRRect(
  borderRadius: BorderRadius.circular(12),
  child: Image.network(
    imageUrl,
    width: 160,
    height: 120,
    fit: BoxFit.cover,
  ),
);

// 위쪽 모서리만 둥글게 (카드 상단 이미지)
ClipRRect(
  borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
  child: Image.asset('assets/images/banner.png'),
);

// 완전한 원형으로 자르기
ClipOval(
  child: Image.network(imageUrl, width: 64, height: 64, fit: BoxFit.cover),
);
```

## 주의할 점

- `Container`의 `BoxDecoration(borderRadius: ...)`는 자기 배경만 둥글게 할 뿐 자식 이미지를 자르지 않습니다. 자식까지 자르려면 `ClipRRect`로 감싸거나, `decoration`과 함께 `clipBehavior: Clip.antiAlias`를 지정합니다. `clipBehavior`는 `decoration`이 없으면 assert 오류가 납니다.
