---
name: '@SpringBootTest'
cat: 테스트
kind: 어노테이션
order: 10
aliases:
  - 통합 테스트
  - 테스트
  - '@MockitoBean'
  - '@Transactional 테스트'
  - '@ActiveProfiles'
  - 롤백
summary: 실제 앱과 같은 스프링 컨텍스트를 모두 띄워서 여러 계층을 함께 검증하는 통합 테스트입니다.
related:
  - web-mvc-test
  - junit
  - assertj
  - profile
doc: 'https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| webEnvironment | `WebEnvironment` | `MOCK`(기본), `RANDOM_PORT`(실제 서버 실행) 등 |
| properties | `String[]` | 테스트에서만 쓸 설정값 (`"app.feature=true"`) |
| @MockitoBean | 어노테이션 | 컨텍스트의 빈을 Mockito 목으로 교체 |
| @Transactional | 어노테이션 | 테스트가 끝나면 DB 변경을 롤백 |
| @ActiveProfiles("test") | 어노테이션 | 테스트용 프로필 설정 적용 |

## 사용 예시

```java
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@SpringBootTest
@ActiveProfiles("test")
@Transactional                       // 테스트마다 DB 변경 롤백
class OrderServiceTest {

    @Autowired
    OrderService orderService;

    @Autowired
    OrderRepository orderRepository;

    @MockitoBean                     // 외부 결제 API는 목으로 교체
    PaymentClient paymentClient;

    @Test
    void 주문하면_결제를_요청하고_상태가_PAID가_된다() {
        given(paymentClient.pay(anyLong(), anyInt())).willReturn(true);

        Long orderId = orderService.order(1L, 10_000);

        Order order = orderRepository.findById(orderId).orElseThrow();
        assertThat(order.getStatus()).isEqualTo(OrderStatus.PAID);
        then(paymentClient).should().pay(orderId, 10_000);
    }
}
```

## 주의할 점

- `@MockBean`은 Spring Boot 3.4부터 deprecated입니다. `@MockitoBean`(`org.springframework.test.context.bean.override.mockito`)을 씁니다.
- 컨텍스트 전체를 띄우므로 느립니다. 컨트롤러만 검증할 때는 `@WebMvcTest`, 리포지토리만 검증할 때는 `@DataJpaTest`를 씁니다.
- `webEnvironment = RANDOM_PORT`로 실제 서버를 띄우면 요청이 다른 스레드에서 처리되어 테스트의 `@Transactional` 롤백이 적용되지 않습니다.
