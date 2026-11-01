---
name: Text · TextStyle
cat: 텍스트 · 이미지
kind: 위젯
order: 10
aliases:
  - 텍스트
  - 글자
  - 폰트
  - 글씨 크기
  - 말줄임
  - TextStyle
  - textTheme
  - ellipsis
summary: '문자열을 화면에 표시하는 가장 기본 위젯입니다. `TextStyle`로 크기, 굵기, 색, 줄 간격을 지정합니다.'
related:
  - rich-text
  - column-row
  - expanded-flexible
doc: 'https://api.flutter.dev/flutter/widgets/Text-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| data | `String` | 표시할 문자열 (첫 번째 위치 인자) |
| style | `TextStyle?` | 글자 크기, 굵기, 색, 줄 높이 등 |
| textAlign | `TextAlign?` | 정렬 (start, center, end …) |
| maxLines | `int?` | 최대 줄 수 |
| overflow | `TextOverflow?` | 넘칠 때 처리 (ellipsis, clip, fade) |
| softWrap | `bool?` | 자동 줄바꿈 여부 |

## 사용 예시

```dart
Text(
  '안녕하세요, Flutter!',
  textAlign: TextAlign.center,
  maxLines: 2,
  overflow: TextOverflow.ellipsis, // 넘치면 … 표시
  style: const TextStyle(
    fontSize: 18,
    fontWeight: FontWeight.w600,
    color: Colors.indigo,
    letterSpacing: 0.2,
    height: 1.4, // 줄 높이 (fontSize의 배수)
  ),
);

// 테마의 글꼴 스타일을 기반으로 일부만 바꾸기
Text(
  '섹션 제목',
  style: Theme.of(context).textTheme.titleMedium?.copyWith(
        color: Theme.of(context).colorScheme.primary,
      ),
);
```

## 주의할 점

- `overflow: TextOverflow.ellipsis`는 너비가 제한되어 있어야 동작합니다. `Row` 안에서는 `Text`를 `Expanded`로 감쌉니다.
- 글꼴 크기를 곳곳에 숫자로 쓰기보다 `Theme.of(context).textTheme`의 스타일을 `copyWith`로 고쳐 쓰면 화면 전체의 일관성을 지킬 수 있습니다.
