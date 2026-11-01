---
name: jsonDecode · jsonEncode
cat: Dart 문법
kind: 함수
order: 180
aliases:
  - JSON
  - 파싱
  - 직렬화
  - 역직렬화
  - dart:convert
  - Map<String, dynamic>
  - fromJson
summary: '`dart:convert`의 `jsonDecode()`는 JSON 문자열을 Map·List로, `jsonEncode()`는 Map·List를 JSON 문자열로 바꿉니다.'
related:
  - class-constructor
  - records-patterns
  - http
  - map-set
doc: 'https://api.dart.dev/stable/dart-convert/jsonDecode.html'
---

## 사용 예시

```dart
import 'dart:convert';

class User {
  const User({required this.id, required this.name, this.tags = const []});

  final int id;
  final String name;
  final List<String> tags;

  factory User.fromJson(Map<String, dynamic> json) => User(
        id: json['id'] as int,
        name: json['name'] as String,
        tags: (json['tags'] as List<dynamic>? ?? []).cast<String>(),
      );

  Map<String, dynamic> toJson() => {'id': id, 'name': name, 'tags': tags};
}

void main() {
  const body = '{"id": 1, "name": "Kim", "tags": ["dev"]}';

  // 문자열 → Map
  final map = jsonDecode(body) as Map<String, dynamic>;
  final user = User.fromJson(map);
  print(user.name);                       // Kim

  // 목록 응답
  const listBody = '[{"id": 1, "name": "Kim"}, {"id": 2, "name": "Lee"}]';
  final users = (jsonDecode(listBody) as List<dynamic>)
      .map((e) => User.fromJson(e as Map<String, dynamic>))
      .toList();
  print(users.length);                    // 2

  // 객체 → 문자열 (toJson()이 있으면 자동 호출)
  print(jsonEncode(user));                // {"id":1,"name":"Kim","tags":["dev"]}

  // 보기 좋게 출력
  print(const JsonEncoder.withIndent('  ').convert(user.toJson()));
}
```

## 주의할 점

- `jsonDecode()`의 결과는 `dynamic`입니다. 리스트 안의 값도 `List<dynamic>`이라서 `List<String>`으로 바로 대입하면 오류가 납니다. `.cast<String>()`이나 `List<String>.from()`으로 변환합니다.
- JSON의 숫자 `1`은 `int`, `1.0`은 `double`로 읽힙니다. `double` 필드는 `(json['x'] as num).toDouble()`로 받으면 안전합니다.
