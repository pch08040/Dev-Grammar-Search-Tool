---
name: '@Test · @BeforeEach · @DisplayName'
cat: 테스트
kind: 어노테이션
order: 30
aliases:
  - JUnit 5
  - 단위 테스트
  - '@ParameterizedTest'
  - '@Nested'
  - assertThrows
  - 테스트 메서드
summary: JUnit 5(Jupiter)로 테스트 메서드를 선언하고, 준비 작업과 테스트 이름을 지정합니다.
related:
  - assertj
  - spring-boot-test
  - web-mvc-test
doc: 'https://junit.org/junit5/docs/current/user-guide/'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| @Test | 어노테이션 | 테스트 메서드 선언 |
| @BeforeEach · @AfterEach | 어노테이션 | 각 테스트 전·후에 실행 |
| @BeforeAll · @AfterAll | 어노테이션 | 클래스 전체에서 한 번 실행 (`static` 메서드) |
| @DisplayName | 어노테이션 | 테스트 결과에 보일 이름 |
| @ParameterizedTest | 어노테이션 | 여러 입력값으로 같은 테스트 반복 |
| @Nested | 어노테이션 | 테스트를 상황별로 묶는 내부 클래스 |

## 사용 예시

```java
import static org.assertj.core.api.Assertions.*;

class PriceCalculatorTest {

    PriceCalculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new PriceCalculator(0.1);   // 매 테스트마다 새로 생성
    }

    @Test
    @DisplayName("10% 할인을 적용한다")
    void applyDiscount() {
        assertThat(calculator.discount(10_000)).isEqualTo(9_000);
    }

    @Test
    @DisplayName("음수 금액이면 예외가 난다")
    void negativePrice() {
        assertThatThrownBy(() -> calculator.discount(-1))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @ParameterizedTest
    @CsvSource({"1000, 900", "5000, 4500", "0, 0"})
    void 여러_금액(int price, int expected) {
        assertThat(calculator.discount(price)).isEqualTo(expected);
    }
}
```

## 주의할 점

- `org.junit.Test`(JUnit 4)가 아니라 `org.junit.jupiter.api.Test`를 import해야 합니다. 잘못 import하면 테스트가 실행되지 않습니다.
- JUnit 5에서는 테스트 클래스와 메서드를 `public`으로 선언하지 않아도 됩니다.
- `@BeforeAll`은 기본적으로 `static` 메서드여야 합니다.
