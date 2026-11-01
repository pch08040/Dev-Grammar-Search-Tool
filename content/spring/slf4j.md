---
name: '@Slf4j'
cat: Lombok
kind: 어노테이션
order: 40
aliases:
  - 로그
  - 로깅
  - log.info
  - Logger
  - 로그 레벨
  - Lombok
summary: 클래스에 `log`라는 SLF4J 로거 필드를 자동으로 만들어 줍니다.
related:
  - application-yml
  - service
doc: 'https://projectlombok.org/features/log'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| log.error | 메서드 | 오류, 즉시 확인이 필요한 상황 |
| log.warn | 메서드 | 경고, 처리는 됐지만 확인이 필요한 상황 |
| log.info | 메서드 | 주요 흐름 기록 (기본 출력 레벨) |
| log.debug · log.trace | 메서드 | 개발 중 상세 정보 (기본 설정에서는 출력 안 됨) |

## 사용 예시

```java
@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public Long order(Long memberId, int price) {
        // {} 자리에 값이 순서대로 들어감 (문자열 + 연결보다 빠름)
        log.info("주문 요청 memberId={}, price={}", memberId, price);

        try {
            Order saved = orderRepository.save(new Order(price));
            log.debug("주문 저장 완료 orderId={}", saved.getId());
            return saved.getId();
        } catch (Exception e) {
            // 마지막 인자로 예외를 넘기면 스택 트레이스까지 출력
            log.error("주문 실패 memberId={}", memberId, e);
            throw e;
        }
    }
}

// application.yml에서 패키지별 로그 레벨 지정
// logging.level.com.example.order: debug
```

## 주의할 점

- `log.info("값: " + value)`처럼 문자열을 이어 붙이지 말고 `{}` 자리표시자를 씁니다. 로그 레벨이 꺼져 있을 때 불필요한 문자열 생성을 막습니다.
- 예외는 `e.getMessage()`만 남기지 말고 마지막 인자로 `e`를 넘겨야 원인 위치(스택 트레이스)가 기록됩니다.
- 비밀번호, 토큰, 개인정보는 로그에 남기지 않습니다.
