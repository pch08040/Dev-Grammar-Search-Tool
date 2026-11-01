---
name: GestureDetector · InkWell
cat: 입력 · 버튼
kind: 위젯
order: 70
aliases:
  - 탭
  - 클릭
  - 터치 이벤트
  - 길게 누르기
  - 드래그
  - 물결 효과
  - ripple
  - onTap
summary: '아무 위젯이나 탭, 더블 탭, 길게 누르기, 드래그를 감지하게 만듭니다. 물결(ripple) 효과가 필요하면 `InkWell`을 씁니다.'
related:
  - button
  - icon-button
  - card
doc: 'https://api.flutter.dev/flutter/widgets/GestureDetector-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| onTap | `GestureTapCallback?` | 탭 |
| onDoubleTap | `GestureTapCallback?` | 더블 탭 |
| onLongPress | `GestureLongPressCallback?` | 길게 누르기 |
| onPanUpdate | `GestureDragUpdateCallback?` | 드래그 중 위치 변화 |
| behavior | `HitTestBehavior?` | 빈 영역도 터치를 받을지 (GestureDetector) |
| borderRadius | `BorderRadius?` | 물결 효과 모양 (InkWell) |

## 사용 예시

```dart
// 물결 효과가 있는 탭 영역
InkWell(
  onTap: () => Navigator.push(
    context,
    MaterialPageRoute(builder: (_) => DetailPage(id: item.id)),
  ),
  borderRadius: BorderRadius.circular(12),
  child: Padding(
    padding: const EdgeInsets.all(16),
    child: Text(item.title),
  ),
);

// 효과 없이 제스처만 감지
GestureDetector(
  behavior: HitTestBehavior.opaque, // 빈 공간도 탭 받기
  onTap: () => FocusScope.of(context).unfocus(), // 바깥 탭하면 키보드 닫기
  onDoubleTap: () => debugPrint('더블 탭'),
  onLongPress: () => debugPrint('길게 누름'),
  child: const SizedBox(height: 120, child: Center(child: Text('터치 영역'))),
);

// 드래그로 위치 옮기기
GestureDetector(
  onPanUpdate: (details) => setState(() => _offset += details.delta),
  child: Transform.translate(offset: _offset, child: const FlutterLogo(size: 60)),
);
```

## 주의할 점

- `InkWell`의 물결은 상위 `Material` 위에 그려집니다. 자식 `Container`에 배경색을 주면 물결이 가려지므로, 배경색은 `Material(color: ...)`이나 `Ink(decoration: ...)`로 지정합니다.
- `GestureDetector`는 기본적으로 자식이 그려진 부분만 터치를 받습니다. 빈 영역까지 받으려면 `behavior: HitTestBehavior.opaque`를 지정합니다.
