---
name: enum
cat: Dart 문법
kind: 문법
order: 100
aliases:
  - 열거형
  - enhanced enum
  - values
  - byName
  - 상태값
  - 상수 목록
summary: 정해진 값 목록을 타입으로 만듭니다. Dart 2.17부터는 필드, 생성자, 메서드를 가진 enhanced enum을 쓸 수 있습니다.
related:
  - control-flow
  - records-patterns
  - spring/enum
doc: 'https://dart.dev/language/enums'
---

## 사용 예시

```dart
// 기본 enum
enum Status { pending, approved, rejected }

// 필드와 메서드를 가진 enum
enum Role {
  admin('관리자', 3),
  manager('매니저', 2),
  user('사용자', 1);

  const Role(this.label, this.level);

  final String label;
  final int level;

  bool canManage(Role other) => level > other.level;
}

void main() {
  const status = Status.approved;
  print(status.name);                     // 'approved'
  print(status.index);                    // 1
  print(Status.values);                   // 모든 값

  // 문자열 → enum (서버 응답 변환 등)
  final parsed = Status.values.byName('rejected');

  // switch 식: 모든 값을 처리해야 컴파일됨
  final message = switch (parsed) {
    Status.pending => '대기 중',
    Status.approved => '승인',
    Status.rejected => '반려',
  };
  print(message);

  print(Role.admin.label);                // '관리자'
  print(Role.admin.canManage(Role.user)); // true
}
```

## 주의할 점

- `values.byName()`은 없는 이름이면 예외를 던집니다. 서버 값처럼 바뀔 수 있는 문자열은 `values.where((e) => e.name == s).firstOrNull`로 안전하게 찾습니다.
- `index`는 선언 순서라서 순서를 바꾸면 값이 달라집니다. DB나 서버에는 `index` 대신 `name`을 저장합니다.
