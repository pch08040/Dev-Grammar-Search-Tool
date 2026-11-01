---
name: '@Transactional'
cat: 트랜잭션 · 예외
kind: 어노테이션
order: 10
aliases:
  - 트랜잭션
  - 롤백
  - readOnly
  - rollbackFor
  - 더티 체킹
  - commit
summary: 메서드를 하나의 트랜잭션으로 묶습니다. 예외가 나면 롤백합니다.
related:
  - service
  - entity
doc: >-
  https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html
---

## 사용 예시

```java
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)           // 기본: 읽기 전용
public class OrderService {

    private final OrderRepository orderRepository;

    @Transactional                        // 쓰기 메서드만 따로 지정
    public void cancel(Long orderId) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.cancel();                   // 변경 감지로 UPDATE 자동 실행
    }

    @Transactional(rollbackFor = Exception.class) // 체크 예외도 롤백
    public void importFile(MultipartFile file) throws IOException { /* ... */ }
}
```

## 주의할 점

- 기본적으로 RuntimeException과 Error에서만 롤백합니다.
- 같은 클래스 안에서 this.method()로 호출하면 프록시를 거치지 않아 @Transactional이 적용되지 않습니다.
