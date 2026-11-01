---
name: '계층 구조 (Controller · Service · Repository)'
cat: 앱 구조
kind: 패턴
order: 50
aliases:
  - 패키지 구조
  - 레이어드 아키텍처
  - 프로젝트 구조
  - 컨트롤러 서비스 리포지토리
  - 폴더 구조
  - layered architecture
summary: 'Spring Boot 프로젝트에서 가장 흔한 3계층 구조입니다. Controller는 HTTP, Service는 비즈니스 로직과 트랜잭션, Repository는 DB 접근을 맡습니다.'
related:
  - rest-controller
  - service
  - jpa-repository
  - dto-mapping
doc: 'https://docs.spring.io/spring-boot/reference/using/structuring-your-code.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| Controller | `@RestController` | 요청 파라미터 받기, 검증, 응답 코드 결정. 로직은 넣지 않음 |
| Service | `@Service` | 비즈니스 규칙, 트랜잭션 경계(`@Transactional`) |
| Repository | `JpaRepository` | 엔티티 조회·저장 |
| DTO | `record` | 계층 간·외부와 주고받는 데이터. 엔티티를 그대로 노출하지 않음 |
| Entity | `@Entity` | 테이블과 매핑되는 도메인 객체 |

## 사용 예시

```java
// 기능(도메인) 기준 패키지 구조 예시
// com.example.shop
// ├── ShopApplication.java          // @SpringBootApplication (최상위 패키지)
// ├── global
// │   ├── config/                   // @Configuration
// │   └── error/                    // ErrorCode, @RestControllerAdvice
// └── order
//     ├── OrderController.java      // HTTP 요청·응답
//     ├── OrderService.java         // 비즈니스 로직, 트랜잭션
//     ├── OrderRepository.java      // DB 접근
//     ├── Order.java                // @Entity
//     └── dto/
//         ├── CreateOrderRequest.java
//         └── OrderResponse.java

// 호출 방향: Controller → Service → Repository (반대 방향 호출 금지)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> create(@Valid @RequestBody CreateOrderRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.create(req));
    }
}
```

## 주의할 점

- Controller에 비즈니스 로직이나 Repository 호출을 넣지 않습니다. 트랜잭션이 걸리지 않고 테스트도 어려워집니다.
- 엔티티를 Controller 응답으로 그대로 반환하지 않고 DTO로 바꿔서 반환합니다.
