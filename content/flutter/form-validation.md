---
name: Form · TextFormField
cat: 입력 · 버튼
kind: 위젯
order: 30
aliases:
  - 폼
  - 유효성 검사
  - 입력 검증
  - validator
  - GlobalKey<FormState>
  - autovalidateMode
  - 회원가입 폼
summary: '여러 입력 필드를 하나의 폼으로 묶고, `validator`로 값을 검사한 뒤 한 번에 제출합니다.'
related:
  - textfield
  - button
  - key
doc: 'https://api.flutter.dev/flutter/material/TextFormField-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| key (Form) | `GlobalKey<FormState>` | `validate()`, `save()`, `reset()` 호출에 사용 |
| autovalidateMode | `AutovalidateMode?` | 자동 검사 시점 (disabled, onUserInteraction, always) |
| validator | `FormFieldValidator<String>?` | 오류 메시지를 반환하면 실패, `null`이면 통과 |
| onSaved | `FormFieldSetter<String>?` | `save()` 호출 시 값 전달 |
| controller | `TextEditingController?` | 값 읽기·쓰기 (`initialValue`와 동시 사용 불가) |

## 사용 예시

```dart
final _formKey = GlobalKey<FormState>(); // State 필드로 선언
final _emailController = TextEditingController();

Form(
  key: _formKey,
  autovalidateMode: AutovalidateMode.onUserInteraction, // 입력하면서 검사
  child: Column(
    children: [
      TextFormField(
        controller: _emailController,
        keyboardType: TextInputType.emailAddress,
        decoration: const InputDecoration(labelText: '이메일'),
        validator: (value) {
          if (value == null || value.trim().isEmpty) return '이메일을 입력하세요';
          if (!value.contains('@')) return '이메일 형식이 아닙니다';
          return null; // 통과
        },
      ),
      TextFormField(
        obscureText: true,
        decoration: const InputDecoration(labelText: '비밀번호'),
        validator: (value) => (value ?? '').length < 8 ? '8자 이상 입력하세요' : null,
      ),
      const SizedBox(height: 16),
      FilledButton(
        onPressed: () {
          if (_formKey.currentState!.validate()) {
            debugPrint('가입: ${_emailController.text}'); // 모든 필드 통과
          }
        },
        child: const Text('가입하기'),
      ),
    ],
  ),
);
```

## 주의할 점

- `GlobalKey<FormState>`를 `build()` 안에서 만들면 다시 그릴 때마다 폼 상태가 초기화됩니다. State 필드로 선언합니다.
- `controller`와 `initialValue`를 함께 지정하면 assert 오류가 납니다. 초기값은 `TextEditingController(text: '...')`로 넣습니다.
- `validator`는 통과할 때 반드시 `null`을 반환해야 합니다. 빈 문자열(`''`)을 반환하면 실패로 처리됩니다.
