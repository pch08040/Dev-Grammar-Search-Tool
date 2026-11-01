---
name: Optional
cat: 컬렉션 · 스트림
kind: 클래스
order: 30
aliases:
  - null 처리
  - orElse
  - orElseThrow
  - ifPresent
  - ofNullable
  - NPE
summary: 값이 없을 수 있음을 타입으로 표현합니다. Repository 조회 결과에서 자주 만납니다.
related:
  - jpa-repository
  - stream
doc: >-
  https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Optional.html
---

## 사용 예시

```java
Optional<User> found = userRepository.findByEmail(email);

User user = found.orElseThrow(
        () -> new NotFoundException("사용자 없음: " + email));

String name = found.map(User::getName).orElse("익명");

found.ifPresent(u -> log.info("found {}", u.getId()));

Optional<String> maybe = Optional.ofNullable(request.getNickname());
```

## 주의할 점

- Optional은 반환 타입으로만 쓰고, 필드나 메서드 파라미터로는 쓰지 않는 것이 관례입니다.
- get()은 값이 없으면 예외가 나므로 orElseThrow()를 명시적으로 씁니다.
