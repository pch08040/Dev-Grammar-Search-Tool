---
name: 문자열 보간 · 여러 줄 문자열
cat: Dart 문법
kind: 문법
order: 190
aliases:
  - 문자열 템플릿
  - 문자열 합치기
  - interpolation
  - raw string
  - 따옴표 세 개
  - 이스케이프
summary: '`$변수`나 `${식}`으로 문자열 안에 값을 넣습니다. 따옴표 세 개로 여러 줄 문자열을, `r`을 붙여 이스케이프 없는 문자열을 만듭니다.'
related:
  - string-methods
  - variables
  - spring/string
doc: 'https://dart.dev/language/built-in-types#strings'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| $name | `보간` | 변수 값을 넣음 |
| ${expr} | `보간` | 식의 결과를 넣음 (속성 접근, 계산 등) |
| '''…''' | `여러 줄` | 줄바꿈을 그대로 유지하는 문자열 |
| r'…' | `raw 문자열` | `\`와 `$`를 그대로 둠 (정규식에 유용) |
| \n · \t · \$ | `이스케이프` | 줄바꿈, 탭, `$` 문자 자체 |

## 사용 예시

```dart
void main() {
  const name = 'Kim';
  const price = 12000;
  final items = ['a', 'b'];

  // 변수는 $, 식은 ${}
  print('안녕하세요, $name님');
  print('합계: ${price * 2}원');
  print('항목 수: ${items.length}');     // 속성 접근은 ${} 필요

  // 인접한 문자열은 자동으로 합쳐짐
  const message = '첫 번째 줄과 '
      '이어지는 문장';
  print(message);

  // 여러 줄 문자열
  const sql = '''
SELECT *
FROM users
WHERE name = '$name'
''';
  print(sql);

  // raw 문자열: 정규식
  final phone = RegExp(r'^\d{3}-\d{4}-\d{4}$');
  print(phone.hasMatch('010-1234-5678'));  // true

  // $ 문자 자체
  print('가격: \$10');                    // 가격: $10
}
```

## 주의할 점

- `'$user.name'`은 `user` 뒤에 문자열 `.name`이 붙은 결과가 됩니다. 속성이나 메서드를 넣을 때는 `'${user.name}'`처럼 중괄호로 감쌉니다.
- 같은 문자열을 반복해서 이어 붙일 때는 `+` 대신 `StringBuffer`를 쓰면 성능이 좋습니다.
