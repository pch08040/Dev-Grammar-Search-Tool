---
name: assertThat (AssertJ)
cat: 테스트
kind: 메서드
order: 40
aliases:
  - 검증
  - 단언
  - isEqualTo
  - assertThatThrownBy
  - extracting
  - containsExactly
summary: 테스트 결과를 `assertThat(실제값).검증메서드(기대값)` 형태로 읽기 쉽게 검증합니다.
related:
  - junit
  - spring-boot-test
doc: 'https://assertj.github.io/doc/'
---

## 사용 예시

```java
import static org.assertj.core.api.Assertions.*;

// 기본 값
assertThat(user.getName()).isEqualTo("Kim");
assertThat(user.getAge()).isGreaterThan(19).isLessThanOrEqualTo(100);
assertThat(user.getEmail()).isNotBlank().contains("@");
assertThat(result).isNull();
assertThat(isActive).isTrue();

// 컬렉션
assertThat(names).hasSize(3).contains("Kim").doesNotContain("Park");
assertThat(names).containsExactly("Kim", "Lee", "Choi");      // 순서까지 일치

// 객체 목록에서 필드만 뽑아 비교
assertThat(users)
        .extracting(User::getName, User::getAge)
        .containsExactly(tuple("Kim", 20), tuple("Lee", 30));

// Optional
assertThat(userRepository.findByEmail("kim@example.com")).isPresent();

// 예외
assertThatThrownBy(() -> service.withdraw(1L, -100))
        .isInstanceOf(IllegalArgumentException.class)
        .hasMessageContaining("금액");

// 예외가 없어야 함
assertThatNoException().isThrownBy(() -> service.withdraw(1L, 100));
```

## 주의할 점

- `assertThat(a)`만 쓰고 검증 메서드를 붙이지 않으면 아무것도 검사하지 않고 통과합니다.
- JUnit의 `Assertions.assertEquals(expected, actual)`와 인자 순서가 반대입니다. AssertJ는 실제값을 먼저 넣습니다.
