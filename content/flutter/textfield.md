---
name: TextField
cat: 입력 · 버튼
kind: 위젯
order: 10
aliases:
  - 입력창
  - 텍스트 입력
  - TextEditingController
  - InputDecoration
  - 비밀번호
  - obscureText
summary: 한 줄 또는 여러 줄 텍스트를 입력받는 위젯입니다.
related:
  - button
  - stateful
doc: 'https://api.flutter.dev/flutter/material/TextField-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| controller | `TextEditingController?` | 입력값 읽기·쓰기 |
| decoration | `InputDecoration?` | 라벨, 힌트, 아이콘, 테두리 |
| keyboardType | `TextInputType?` | 키보드 종류 (emailAddress, number …) |
| obscureText | `bool` | 비밀번호처럼 가리기 |
| onChanged / onSubmitted | `ValueChanged<String>?` | 입력·완료 콜백 |

## 사용 예시

```dart
final _emailController = TextEditingController();

@override
void dispose() {
  _emailController.dispose();
  super.dispose();
}

TextField(
  controller: _emailController,
  keyboardType: TextInputType.emailAddress,
  decoration: const InputDecoration(
    labelText: '이메일',
    hintText: 'name@example.com',
    prefixIcon: Icon(Icons.mail_outline),
    border: OutlineInputBorder(),
  ),
  onSubmitted: (value) => debugPrint(value),
);

// 값 읽기
final email = _emailController.text.trim();
```

## 주의할 점

- TextEditingController는 State의 dispose()에서 반드시 해제합니다.
- 유효성 검사가 필요하면 Form + TextFormField(validator:)를 씁니다.
