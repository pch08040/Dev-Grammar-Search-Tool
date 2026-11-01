---
name: record
cat: Java 기초
kind: 문법
order: 100
aliases:
  - 레코드
  - DTO
  - 불변 객체
  - 데이터 클래스
  - compact constructor
  - 레코드 패턴
summary: '값을 담는 불변 클래스를 한 줄로 선언합니다. 생성자, 접근자, `equals()`, `hashCode()`, `toString()`이 자동으로 만들어집니다 (Java 16+).'
signature: 'record 이름(타입 필드1, 타입 필드2) { }'
related:
  - class-constructor
  - request-body-valid
  - dto-mapping
  - flutter/records-patterns
doc: 'https://docs.oracle.com/en/java/javase/21/language/records.html'
---

## 사용 예시

```java
// 선언 한 줄로 생성자·접근자·equals·hashCode·toString 생성
public record UserResponse(Long id, String name, String email) {

    // compact 생성자: 검증·정규화
    public UserResponse {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("name은 필수");
        }
        name = name.strip();
    }

    // 정적 팩터리 메서드
    public static UserResponse of(Long id, String name) {
        return new UserResponse(id, name, null);
    }

    // 일반 메서드도 추가 가능
    public boolean hasEmail() {
        return email != null;
    }
}

// 사용
var user = new UserResponse(1L, " Kim ", "kim@example.com");
user.name();        // "Kim"  (getName()이 아니라 name())
user.equals(new UserResponse(1L, "Kim", "kim@example.com")); // true
System.out.println(user); // UserResponse[id=1, name=Kim, email=kim@example.com]

// 값을 바꾸려면 새 객체로
var renamed = new UserResponse(user.id(), "Lee", user.email());

// 레코드 패턴 (Java 21)
Object obj = user;
if (obj instanceof UserResponse(Long id, String name, String email)) {
    System.out.println(id + " " + name);
}
```

## 주의할 점

- 접근자는 `getName()`이 아니라 `name()`입니다. Spring의 JSON 변환(Jackson)은 record를 그대로 지원합니다.
- 필드가 모두 `final`이라 setter가 없습니다. JPA 엔티티로는 쓸 수 없고, 요청·응답 DTO에 씁니다.
