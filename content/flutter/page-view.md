---
name: PageView
cat: 목록
kind: 위젯
order: 60
aliases:
  - 페이지 넘기기
  - 슬라이드
  - 배너
  - 캐러셀
  - 온보딩
  - PageController
  - viewportFraction
summary: '한 화면씩 좌우로 넘기는 스크롤 위젯입니다. 배너, 온보딩, 이미지 슬라이드에 씁니다.'
related:
  - listview-builder
  - scroll-controller
  - sized-box
doc: 'https://api.flutter.dev/flutter/widgets/PageView-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| controller | `PageController?` | 현재 페이지 제어, `viewportFraction`으로 옆 페이지 노출 |
| itemCount | `int?` | 페이지 개수 (builder) |
| itemBuilder | `NullableIndexedWidgetBuilder` | 각 페이지를 만드는 함수 (builder) |
| onPageChanged | `ValueChanged<int>?` | 페이지가 바뀌면 호출 |
| scrollDirection | `Axis` | 넘기는 방향 (기본 가로) |

## 사용 예시

```dart
final _pageController = PageController(viewportFraction: 0.9); // 옆 배너가 살짝 보임
int _page = 0;

Column(
  children: [
    SizedBox(
      height: 200, // PageView는 높이가 정해져야 함
      child: PageView.builder(
        controller: _pageController,
        itemCount: banners.length,
        onPageChanged: (i) => setState(() => _page = i),
        itemBuilder: (context, i) => Padding(
          padding: const EdgeInsets.symmetric(horizontal: 6),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: Image.network(banners[i], fit: BoxFit.cover),
          ),
        ),
      ),
    ),
    const SizedBox(height: 8),
    Text('${_page + 1} / ${banners.length}'),
    TextButton(
      onPressed: () => _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      ),
      child: const Text('다음'),
    ),
  ],
);
```

## 주의할 점

- `Column` 안에서는 높이가 정해지지 않아 오류가 납니다. `SizedBox`로 높이를 주거나 `Expanded`로 감쌉니다.
- `PageController`는 State 필드로 만들고 `dispose()`에서 해제합니다.
