---
name: '? · ! · ?? · late'
cat: Dart 문법
kind: 문법
order: 10
aliases:
  - null safety
  - 널 안전
  - nullable
  - null 체크
  - 기본값
  - required
summary: Dart의 null 안전 문법입니다. null이 될 수 있는 타입과 없는 타입을 구분합니다.
related:
  - class-constructor
doc: 'https://dart.dev/null-safety'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| String? | `타입` | null을 허용하는 타입 |
| value! | `연산자` | 절대 null이 아님을 단언 (null이면 런타임 오류) |
| a ?? b | `연산자` | a가 null이면 b |
| a ??= b | `연산자` | a가 null일 때만 b를 대입 |
| obj?.prop | `연산자` | obj가 null이면 null 반환 |
| late | `키워드` | 선언 후 나중에 초기화 |

## 사용 예시

```dart
String? nickname;              // null 가능
String name = 'Kim';           // null 불가

final display = nickname ?? '익명';   // 기본값
final len = nickname?.length ?? 0;    // 안전한 접근
nickname ??= 'guest';                 // null일 때만 대입

late final String token;       // 나중에 한 번 초기화
void init() => token = 'abc';

void greet({required String name, int? age}) {
  if (age != null) {
    print('$name ($age)');     // 여기서 age는 int로 승격
  }
}
```

## 주의할 점

- ! 연산자는 꼭 필요한 곳에만 씁니다. 대부분 ?? 또는 if (x != null) 로 대체할 수 있습니다.
