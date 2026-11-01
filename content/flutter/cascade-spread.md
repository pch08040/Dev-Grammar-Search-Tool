---
name: '.. 캐스케이드 · ... 스프레드'
cat: Dart 문법
kind: 문법
order: 160
aliases:
  - cascade
  - spread
  - 연쇄 호출
  - 리스트 합치기
  - collection if
  - collection for
  - '...?'
summary: '`..`는 같은 객체에 여러 작업을 이어서 하고, `...`는 리스트·맵의 원소를 다른 컬렉션 안에 펼쳐 넣습니다.'
related:
  - list-methods
  - map-set
  - column-row
doc: 'https://dart.dev/language/operators#cascade-notation'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| obj..a()..b() | `캐스케이드` | `obj`에 `a()`, `b()`를 차례로 호출하고 `obj`를 반환 |
| obj?..a() | `null 인식 캐스케이드` | `obj`가 null이면 전체를 건너뜀 |
| [...list] | `스프레드` | 원소를 펼쳐 넣음 |
| [...?list] | `null 인식 스프레드` | `list`가 null이면 아무것도 넣지 않음 |
| [if (조건) x] | `collection if` | 조건이 참일 때만 원소 추가 |
| [for (x in xs) f(x)] | `collection for` | 반복하면서 원소 추가 |

## 사용 예시

```dart
void main() {
  // 캐스케이드: 객체를 만들고 바로 여러 설정
  final buffer = StringBuffer()
    ..write('Hello')
    ..write(', ')
    ..write('Dart');
  print(buffer);                        // Hello, Dart

  final numbers = [3, 1, 2]
    ..sort()
    ..add(4);                           // sort()의 반환값이 아니라 리스트 자체
  print(numbers);                       // [1, 2, 3, 4]

  // 스프레드: 리스트 합치기
  final base = ['home', 'search'];
  List<String>? extra;
  const isAdmin = true;

  final menus = [
    ...base,
    ...?extra,                          // null이면 무시
    if (isAdmin) 'admin',
    for (final n in [1, 2]) 'item$n',
  ];
  print(menus);  // [home, search, admin, item1, item2]

  // 맵 합치기 (뒤쪽 값이 우선)
  final defaults = {'theme': 'light', 'lang': 'ko'};
  final user = {'theme': 'dark'};
  print({...defaults, ...user});        // {theme: dark, lang: ko}
}
```

## 주의할 점

- `list..sort()`는 정렬된 리스트를 돌려주지만, `list.sort()`는 `void`라서 결과를 변수에 담을 수 없습니다. 원본을 유지하려면 `[...list]..sort()`처럼 복사한 뒤 정렬합니다.
- Flutter의 `children`에서 조건에 따라 위젯을 넣을 때도 `if`와 `...[]`를 그대로 쓸 수 있습니다.
