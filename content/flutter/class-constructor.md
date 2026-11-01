---
name: class · 생성자 · factory
cat: Dart 문법
kind: 문법
order: 40
aliases:
  - 클래스
  - 모델
  - fromJson
  - toJson
  - copyWith
  - named constructor
  - DTO
summary: 모델 클래스를 만들 때 쓰는 생성자 문법과 JSON 변환 패턴입니다.
related:
  - null-safety
  - async-await
doc: 'https://dart.dev/language/constructors'
---

## 사용 예시

```dart
class User {
  final int id;
  final String name;
  final String? email;

  const User({required this.id, required this.name, this.email});

  // 이름 있는 생성자
  const User.guest() : id = 0, name = 'guest', email = null;

  factory User.fromJson(Map<String, dynamic> json) => User(
        id: json['id'] as int,
        name: json['name'] as String,
        email: json['email'] as String?,
      );

  Map<String, dynamic> toJson() => {'id': id, 'name': name, 'email': email};

  User copyWith({String? name, String? email}) =>
      User(id: id, name: name ?? this.name, email: email ?? this.email);
}
```

## 주의할 점

- 모델이 많아지면 json_serializable이나 freezed 패키지로 코드를 자동 생성할 수 있습니다.
