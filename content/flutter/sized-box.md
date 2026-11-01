---
name: SizedBox
cat: 레이아웃
kind: 위젯
order: 50
aliases:
  - 간격
  - 빈 공간
  - 고정 크기
  - SizedBox.shrink
  - SizedBox.expand
  - 높이 지정
summary: 크기를 고정하거나 위젯 사이에 빈 간격을 넣는 가장 가벼운 위젯입니다.
related:
  - padding
  - expanded-flexible
  - column-row
doc: 'https://api.flutter.dev/flutter/widgets/SizedBox-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| width / height | `double?` | 고정할 너비·높이 (`double.infinity`면 가능한 만큼) |
| child | `Widget?` | 크기를 맞출 위젯 |
| SizedBox.shrink() | 생성자 | 크기 0인 빈 위젯 |
| SizedBox.expand() | 생성자 | 부모가 허용하는 최대 크기 |
| SizedBox.square(dimension:) | 생성자 | 정사각형 |

## 사용 예시

```dart
Column(
  children: [
    const Text('이메일'),
    const SizedBox(height: 8), // 세로 간격
    const TextField(),
    const SizedBox(height: 24),
    // 버튼을 가로로 꽉 채우기
    SizedBox(
      width: double.infinity,
      height: 48,
      child: FilledButton(onPressed: () {}, child: const Text('로그인')),
    ),
    // 조건에 따라 아무것도 그리지 않을 때
    if (errorText == null) const SizedBox.shrink() else Text(errorText!),
  ],
);
```

## 주의할 점

- 같은 간격을 여러 번 넣는다면 `Column(spacing: 8, ...)`처럼 `spacing` 속성을 쓰면 코드가 짧아집니다 (Flutter 3.27 이상).
- 부모가 크기를 강제하는 곳(예: `Expanded` 안)에서는 `SizedBox`의 크기가 무시될 수 있습니다.
