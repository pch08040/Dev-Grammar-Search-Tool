---
name: Expanded · Flexible
cat: 레이아웃
kind: 위젯
order: 60
aliases:
  - 남은 공간 채우기
  - 비율 배치
  - flex
  - overflow 해결
  - FlexFit
  - 가로 꽉 채우기
summary: '`Row`·`Column` 안에서 남은 공간을 나눠 가집니다. `Expanded`는 공간을 반드시 채우고, `Flexible`은 필요한 만큼만 쓰되 최대 그만큼까지 커집니다.'
related:
  - column-row
  - spacer-divider
  - sized-box
doc: 'https://api.flutter.dev/flutter/widgets/Expanded-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| flex | `int` | 공간을 나누는 비율 (기본 1) |
| fit | `FlexFit` | Flexible 전용. `loose`(기본, 필요한 만큼) 또는 `tight`(꽉 채움) |
| child | `Widget` | 배치할 위젯 |

## 사용 예시

```dart
Row(
  children: [
    // 1 : 2 비율로 나누기
    Expanded(flex: 1, child: Container(height: 40, color: Colors.blue)),
    Expanded(flex: 2, child: Container(height: 40, color: Colors.green)),
  ],
);

// 긴 텍스트가 넘치지 않게
Row(
  children: [
    const Icon(Icons.place),
    const SizedBox(width: 8),
    Expanded(
      child: Text(
        address,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
      ),
    ),
    TextButton(onPressed: () {}, child: const Text('변경')),
  ],
);

// 짧으면 짧게, 길면 남은 공간까지만
Row(
  children: [
    Flexible(child: Text(name, overflow: TextOverflow.ellipsis)),
    const Icon(Icons.verified, size: 16),
  ],
);
```

## 주의할 점

- `Expanded`와 `Flexible`은 `Row`, `Column`, `Flex`의 직접 자식으로만 쓸 수 있습니다. 다른 위젯 안에 넣으면 오류가 납니다.
- 스크롤 가능한 방향(예: `ListView` 안의 `Column` 세로 방향)에는 남은 공간이 무한이라 `Expanded`를 쓸 수 없습니다.
