---
name: Container
cat: 레이아웃
kind: 위젯
order: 20
aliases:
  - 박스
  - padding
  - margin
  - 배경색
  - 테두리
  - BoxDecoration
  - 둥근 모서리
summary: '크기, 여백, 배경, 테두리를 한 번에 지정하는 범용 박스 위젯입니다.'
related:
  - column-row
doc: 'https://api.flutter.dev/flutter/widgets/Container-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| width / height | `double?` | 크기 |
| padding / margin | `EdgeInsetsGeometry?` | 안쪽·바깥 여백 |
| color | `Color?` | 배경색 (decoration과 동시 사용 불가) |
| decoration | `Decoration?` | 테두리, 둥근 모서리, 그림자 |
| alignment | `AlignmentGeometry?` | 자식 정렬 |

## 사용 예시

```dart
Container(
  width: double.infinity,
  margin: const EdgeInsets.all(16),
  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
    border: Border.all(color: Colors.black12),
    boxShadow: const [
      BoxShadow(color: Colors.black12, blurRadius: 8, offset: Offset(0, 2)),
    ],
  ),
  child: const Text('카드'),
);
```

## 주의할 점

- color와 decoration을 함께 쓰면 오류가 납니다. 배경색은 BoxDecoration(color: ...) 안에 넣습니다.
- 여백만 필요하면 Padding, 크기만 필요하면 SizedBox가 더 가볍습니다.
