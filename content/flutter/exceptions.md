---
name: try · catch · throw
cat: Dart 문법
kind: 문법
order: 150
aliases:
  - 예외 처리
  - 에러 처리
  - on Exception
  - finally
  - rethrow
  - 사용자 정의 예외
  - StackTrace
summary: 오류가 날 수 있는 코드를 `try`로 감싸고, `on`·`catch`로 예외 종류별로 처리합니다. `throw`로 직접 예외를 던질 수 있습니다.
related:
  - async-await
  - inheritance-mixin
  - spring/exceptions
doc: 'https://dart.dev/language/error-handling'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| try | `키워드` | 예외가 날 수 있는 코드 블록 |
| on 타입 | `키워드` | 특정 타입의 예외만 처리 |
| catch (e, s) | `키워드` | 예외 객체 `e`와 스택 트레이스 `s`를 받음 |
| finally | `키워드` | 성공·실패와 관계없이 항상 실행 |
| throw | `키워드` | 예외를 던짐 |
| rethrow | `키워드` | 받은 예외를 그대로 다시 던짐 |

## 사용 예시

```dart
// 사용자 정의 예외
class ApiException implements Exception {
  ApiException(this.statusCode, this.message);

  final int statusCode;
  final String message;

  @override
  String toString() => 'ApiException($statusCode): $message';
}

int parseAge(String input) {
  final age = int.tryParse(input);
  if (age == null) throw FormatException('숫자가 아닙니다: $input');
  if (age < 0) throw ArgumentError.value(age, 'age', '0 이상이어야 합니다');
  return age;
}

void main() {
  try {
    parseAge('abc');
  } on FormatException catch (e) {
    print('형식 오류: ${e.message}');
  } on ArgumentError catch (e) {
    print('값 오류: $e');
  } catch (e, stackTrace) {
    print('알 수 없는 오류: $e');
    print(stackTrace);
  } finally {
    print('검사 종료');
  }

  try {
    throw ApiException(404, '사용자 없음');
  } on ApiException catch (e) {
    print(e);                         // ApiException(404): 사용자 없음
  }
}
```

## 주의할 점

- `await`를 빼고 비동기 함수를 호출하면 그 안의 예외는 `try`에서 잡히지 않습니다. `try` 안에서 반드시 `await`합니다.
- 예외를 잡아서 로그만 남기고 다시 위로 보내려면 `throw e` 대신 `rethrow`를 씁니다. 원래 스택 트레이스가 유지됩니다.
