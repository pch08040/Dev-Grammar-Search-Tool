---
name: Image.network · Image.asset
cat: 텍스트 · 이미지
kind: 위젯
order: 30
aliases:
  - 이미지
  - 사진
  - 네트워크 이미지
  - 에셋
  - BoxFit
  - loadingBuilder
  - errorBuilder
summary: '인터넷 주소(`Image.network`)나 앱에 포함된 파일(`Image.asset`)의 이미지를 표시합니다.'
related:
  - clip-rrect
  - circle-avatar
  - aspect-ratio
doc: 'https://api.flutter.dev/flutter/widgets/Image-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| src / name | `String` | 이미지 URL 또는 에셋 경로 (첫 번째 위치 인자) |
| width / height | `double?` | 표시 크기 |
| fit | `BoxFit?` | 영역 채우는 방식 (cover, contain, fill …) |
| loadingBuilder | `ImageLoadingBuilder?` | 불러오는 중 표시할 위젯 (network) |
| errorBuilder | `ImageErrorWidgetBuilder?` | 실패했을 때 표시할 위젯 |

## 사용 예시

```dart
// 네트워크 이미지
Image.network(
  'https://picsum.photos/400/300',
  width: double.infinity,
  height: 200,
  fit: BoxFit.cover, // 비율 유지하며 영역을 꽉 채움 (넘치는 부분 잘림)
  loadingBuilder: (context, child, progress) {
    if (progress == null) return child; // 로딩 완료
    return const SizedBox(
      height: 200,
      child: Center(child: CircularProgressIndicator()),
    );
  },
  errorBuilder: (context, error, stackTrace) =>
      const Icon(Icons.broken_image, size: 48),
);

// 앱에 포함된 이미지 — pubspec.yaml에 폴더 등록 필요
// flutter:
//   assets:
//     - assets/images/
Image.asset('assets/images/logo.png', width: 120);
```

## 주의할 점

- 에셋은 `pubspec.yaml`의 `assets`에 등록해야 하고, 등록 후에는 핫 리로드가 아니라 앱을 다시 실행해야 반영됩니다.
- Android 릴리스 빌드에서 네트워크 이미지가 안 보이면 `AndroidManifest.xml`에 `INTERNET` 권한이 있는지 확인합니다. 디버그 빌드에는 자동으로 들어가서 놓치기 쉽습니다.
- 목록에서 같은 이미지를 자주 다시 불러온다면 `cached_network_image` 패키지로 디스크 캐시를 씁니다.
