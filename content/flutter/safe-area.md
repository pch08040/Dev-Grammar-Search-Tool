---
name: SafeArea
cat: 레이아웃
kind: 위젯
order: 110
aliases:
  - 노치
  - 상태 표시줄
  - 홈 인디케이터
  - 안전 영역
  - 가려짐
  - padding
summary: 노치, 상태 표시줄, 홈 인디케이터처럼 기기가 가리는 영역을 피해 자식을 배치합니다.
related:
  - media-query
  - scaffold
  - padding
doc: 'https://api.flutter.dev/flutter/widgets/SafeArea-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| child | `Widget` | 안전 영역 안에 둘 위젯 |
| top / bottom / left / right | `bool` | 방향별 적용 여부 (기본 모두 true) |
| minimum | `EdgeInsets` | 안전 영역이 없어도 최소한 줄 여백 |

## 사용 예시

```dart
// AppBar가 없는 화면은 상태 표시줄과 겹치지 않게 SafeArea로 감쌈
Scaffold(
  body: SafeArea(
    child: Column(
      children: [
        const Text('환영합니다'),
        const Spacer(),
        FilledButton(onPressed: () {}, child: const Text('시작하기')),
      ],
    ),
  ),
);

// 하단 고정 버튼: 아래쪽만 안전 영역 적용, 최소 여백 16
SafeArea(
  top: false,
  minimum: const EdgeInsets.all(16),
  child: SizedBox(
    width: double.infinity,
    child: FilledButton(onPressed: () {}, child: const Text('결제하기')),
  ),
);
```

## 주의할 점

- `Scaffold`의 `appBar`가 있으면 위쪽은 이미 처리되므로 `body`에서는 `top: false`로 둬도 됩니다.
- `ListView`는 자체적으로 안전 영역 여백을 넣으므로, 전체를 `SafeArea`로 또 감싸면 여백이 두 번 생길 수 있습니다.
