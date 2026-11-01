---
name: MediaQuery
cat: 기본 구조
kind: 클래스
order: 60
aliases:
  - 화면 크기
  - 화면 너비
  - 반응형
  - sizeOf
  - viewInsetsOf
  - 키보드 높이
  - 노치
summary: 화면 크기, 안전 영역, 키보드 높이, 글자 배율 같은 기기 정보를 읽습니다. `MediaQuery.sizeOf(context)`처럼 필요한 값만 읽는 메서드를 씁니다.
related:
  - layout-builder
  - safe-area
  - build-context
doc: 'https://api.flutter.dev/flutter/widgets/MediaQuery-class.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| MediaQuery.sizeOf(context) | `Size` | 화면 전체 크기 (논리 픽셀) |
| MediaQuery.paddingOf(context) | `EdgeInsets` | 상태 표시줄·노치 등 가려지는 영역 |
| MediaQuery.viewInsetsOf(context) | `EdgeInsets` | 키보드 등이 덮은 영역 (bottom = 키보드 높이) |
| MediaQuery.orientationOf(context) | `Orientation` | 세로·가로 방향 |
| MediaQuery.textScalerOf(context) | `TextScaler` | 사용자 글자 크기 설정 |

## 사용 예시

```dart
@override
Widget build(BuildContext context) {
  final size = MediaQuery.sizeOf(context);
  final keyboard = MediaQuery.viewInsetsOf(context).bottom;
  final isTablet = size.shortestSide >= 600;

  return Scaffold(
    body: Padding(
      // 키보드가 올라오면 그만큼 아래 여백 추가
      padding: EdgeInsets.only(bottom: keyboard),
      child: GridView.count(
        crossAxisCount: isTablet ? 4 : 2,
        children: const [/* ... */],
      ),
    ),
  );
}
```

## 주의할 점

- `MediaQuery.of(context).size` 대신 `MediaQuery.sizeOf(context)`를 씁니다. `of()`는 키보드 등 무관한 값이 바뀔 때도 다시 그려집니다.
- 부모 위젯이 차지한 공간에 맞추려면 화면 전체 크기인 MediaQuery 대신 `LayoutBuilder`를 씁니다.
