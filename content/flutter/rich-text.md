---
name: Text.rich · TextSpan
cat: 텍스트 · 이미지
kind: 위젯
order: 20
aliases:
  - 부분 스타일
  - 글자 일부 색
  - 링크 텍스트
  - RichText
  - TextSpan
  - WidgetSpan
  - TapGestureRecognizer
summary: '한 문장 안에서 일부 글자만 색, 굵기, 밑줄을 다르게 하거나 탭할 수 있게 만듭니다.'
related:
  - text
  - gesture-detector
doc: 'https://api.flutter.dev/flutter/painting/TextSpan-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| text | `String?` | 이 조각의 문자열 |
| style | `TextStyle?` | 이 조각과 하위 조각에 적용할 스타일 |
| children | `List<InlineSpan>?` | 이어 붙일 하위 조각 (TextSpan, WidgetSpan) |
| recognizer | `GestureRecognizer?` | 탭 등 제스처 처리 |

## 사용 예시

```dart
import 'package:flutter/gestures.dart'; // TapGestureRecognizer

// State 안에서 생성하고 dispose에서 해제
late final TapGestureRecognizer _termsRecognizer = TapGestureRecognizer()
  ..onTap = () => debugPrint('약관 보기');

@override
void dispose() {
  _termsRecognizer.dispose();
  super.dispose();
}

Text.rich(
  TextSpan(
    style: const TextStyle(fontSize: 15, color: Colors.black87), // 기본 스타일
    children: [
      const TextSpan(text: '회원가입 시 '),
      TextSpan(
        text: '이용약관',
        style: const TextStyle(
          color: Colors.blue,
          decoration: TextDecoration.underline,
        ),
        recognizer: _termsRecognizer, // 이 부분만 탭 가능
      ),
      const TextSpan(text: '에 동의합니다. '),
      const WidgetSpan(
        alignment: PlaceholderAlignment.middle,
        child: Icon(Icons.info_outline, size: 16), // 문장 사이에 위젯 넣기
      ),
    ],
  ),
);
```

## 주의할 점

- `TapGestureRecognizer`는 `build()` 안에서 만들지 말고 State 필드로 두고, `dispose()`에서 반드시 해제합니다.
- 하위 `TextSpan`은 상위 `style`을 물려받습니다. 바꿀 속성만 지정하면 됩니다.
