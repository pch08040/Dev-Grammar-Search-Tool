---
name: Record · 패턴 매칭
cat: Dart 문법
kind: 문법
order: 130
aliases:
  - 레코드
  - 튜플
  - 여러 값 반환
  - 구조 분해
  - destructuring
  - pattern
  - if-case
summary: 여러 값을 하나로 묶는 Record와, 값을 분해하고 모양을 검사하는 패턴입니다. Dart 3부터 사용할 수 있습니다.
related:
  - control-flow
  - inheritance-mixin
  - json
  - spring/record
doc: 'https://dart.dev/language/patterns'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| (1, 'a') | `위치 Record` | `$1`, `$2`로 접근 |
| (x: 1, y: 2) | `이름 있는 Record` | `.x`, `.y`로 접근 |
| var (a, b) = r | `구조 분해` | Record를 변수 여러 개로 분해 |
| if (x case 패턴) | `if-case` | 모양이 맞을 때만 실행하고 값을 꺼냄 |
| Point(:x, :y) | `객체 패턴` | getter 값을 같은 이름의 변수로 꺼냄 |

## 사용 예시

```dart
// 여러 값 반환
(int, String) fetchStatus() => (200, 'OK');

({double lat, double lng}) location() => (lat: 37.56, lng: 126.97);

void main() {
  // 구조 분해
  final (code, message) = fetchStatus();
  print('$code $message');

  final loc = location();
  print(loc.lat);

  // 변수 값 맞바꾸기
  var a = 1, b = 2;
  (a, b) = (b, a);

  // JSON 모양 검사와 값 꺼내기
  final Object json = {'name': 'Kim', 'age': 30};
  if (json case {'name': String name, 'age': int age}) {
    print('$name ($age)');
  }

  // 리스트 패턴
  final list = [1, 2, 3, 4];
  if (list case [final first, ...final rest]) {
    print('$first $rest');               // 1 [2, 3, 4]
  }

  // switch 식 + 패턴
  final point = (0, 5);
  final where = switch (point) {
    (0, 0) => '원점',
    (0, _) => 'y축 위',
    (_, 0) => 'x축 위',
    _ => '그 외',
  };
  print('$where $a $b');
}
```

## 주의할 점

- Record는 값이 같으면 `==`가 true입니다. 하지만 필드 이름을 붙일 수 없는 곳이 많고 의미가 흐려지기 쉬워서, 여러 곳에서 쓰는 데이터는 클래스로 만드는 편이 좋습니다.
- `if-case`에서 모양이 맞지 않으면 예외 없이 건너뜁니다. 서버 응답 검사에 쓰면 `as` 형변환보다 안전합니다.
