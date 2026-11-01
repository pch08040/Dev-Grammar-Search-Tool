---
name: Stack · Positioned
cat: 레이아웃
kind: 위젯
order: 70
aliases:
  - 겹치기
  - 위에 올리기
  - 배지
  - 절대 위치
  - Positioned.fill
  - 오버레이
summary: 위젯을 겹쳐 쌓습니다. `Positioned`로 각 자식의 위치를 `Stack`의 가장자리 기준으로 지정합니다.
related:
  - center-align
  - container
  - circle-avatar
doc: 'https://api.flutter.dev/flutter/widgets/Stack-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| children | `List<Widget>` | 아래부터 위로 쌓을 위젯들 (뒤에 있을수록 위) |
| alignment | `AlignmentGeometry` | 위치를 지정하지 않은 자식의 정렬 (기본 왼쪽 위) |
| fit | `StackFit` | 위치 미지정 자식의 크기 (`loose`, `expand`) |
| clipBehavior | `Clip` | 영역 밖으로 나간 부분 자르기 (기본 `hardEdge`) |
| Positioned(top, left, right, bottom, width, height) | `double?` | 자식 위치·크기 |

## 사용 예시

```dart
// 아이콘 오른쪽 위에 알림 배지
Stack(
  clipBehavior: Clip.none, // 배지가 밖으로 살짝 나가도 보이게
  children: [
    const Icon(Icons.notifications, size: 32),
    Positioned(
      top: -4,
      right: -4,
      child: Container(
        padding: const EdgeInsets.all(4),
        decoration: const BoxDecoration(color: Colors.red, shape: BoxShape.circle),
        child: Text('$count', style: const TextStyle(color: Colors.white, fontSize: 10)),
      ),
    ),
  ],
);

// 이미지 위에 반투명 그라데이션과 제목
Stack(
  children: [
    Image.network(url, fit: BoxFit.cover),
    Positioned.fill(
      child: DecoratedBox(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Colors.transparent, Colors.black.withValues(alpha: 0.6)],
          ),
        ),
      ),
    ),
    const Positioned(left: 16, bottom: 16, child: Text('제목', style: TextStyle(color: Colors.white))),
  ],
);
```

## 주의할 점

- `Positioned`는 `Stack`의 직접 자식이어야 합니다.
- 위치를 지정한 자식만 있으면 `Stack`의 크기가 0이 될 수 있습니다. 위치를 지정하지 않은 자식을 하나 두거나 `SizedBox`로 크기를 정합니다.
