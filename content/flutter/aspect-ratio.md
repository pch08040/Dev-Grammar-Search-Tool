---
name: AspectRatio
cat: 레이아웃
kind: 위젯
order: 150
aliases:
  - 비율 유지
  - 16:9
  - 정사각형
  - 썸네일
  - 영상 비율
  - 가로세로 비율
summary: 너비에 맞춰 높이를 정해진 가로세로 비율로 맞춥니다. 썸네일, 배너, 영상 영역처럼 비율이 고정된 영역에 씁니다.
related:
  - image
  - sized-box
  - layout-builder
doc: 'https://api.flutter.dev/flutter/widgets/AspectRatio-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| aspectRatio | `double` | 너비 ÷ 높이 (예: 16 / 9) |
| child | `Widget?` | 비율에 맞출 위젯 |

## 사용 예시

```dart
Column(
  children: [
    // 화면 너비에 맞춘 16:9 배너
    AspectRatio(
      aspectRatio: 16 / 9,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: Image.network(bannerUrl, fit: BoxFit.cover),
      ),
    ),
    const SizedBox(height: 16),
    // 정사각형 썸네일 3개
    Row(
      spacing: 8,
      children: [
        for (final url in thumbnails.take(3))
          Expanded(
            child: AspectRatio(
              aspectRatio: 1,
              child: Image.network(url, fit: BoxFit.cover),
            ),
          ),
      ],
    ),
  ],
);
```

## 주의할 점

- 이미지가 비율 영역을 꽉 채우게 하려면 `Image`에 `fit: BoxFit.cover`를 함께 줍니다.
- 부모가 너비와 높이를 모두 강제하는 곳(예: 크기가 고정된 `SizedBox` 안)에서는 비율이 지켜지지 않을 수 있습니다.
