---
name: '@Scheduled'
cat: 스케줄 · 비동기
kind: 어노테이션
order: 10
aliases:
  - 스케줄러
  - 주기 실행
  - cron
  - fixedRate
  - fixedDelay
  - '@EnableScheduling'
  - 배치
summary: 메서드를 일정 간격이나 cron 식에 맞춰 자동으로 반복 실행합니다.
related:
  - async
  - configuration-bean
  - transactional
doc: 'https://docs.spring.io/spring-framework/reference/integration/scheduling.html#scheduling-annotation-support-scheduled'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| fixedRate | `long` | 이전 실행 시작 시점부터 간격(ms)마다 실행 |
| fixedDelay | `long` | 이전 실행이 끝난 뒤 간격(ms)만큼 기다렸다 실행 |
| initialDelay | `long` | 앱 시작 후 첫 실행까지 대기 시간(ms) |
| cron | `String` | 초 분 시 일 월 요일 (6자리) |
| zone | `String` | cron 기준 시간대 (`"Asia/Seoul"`) |
| timeUnit | `TimeUnit` | `fixedRate` 등의 단위 (기본 밀리초) |

## 사용 예시

```java
// 1. 스케줄링 켜기
@Configuration
@EnableScheduling
public class SchedulingConfig {
}

// 2. 반복 실행할 메서드 (빈에 등록된 클래스여야 함)
@Slf4j
@Component
@RequiredArgsConstructor
public class OrderScheduler {

    private final OrderService orderService;

    // 매일 새벽 3시 (초 분 시 일 월 요일)
    @Scheduled(cron = "0 0 3 * * *", zone = "Asia/Seoul")
    public void expireOldOrders() {
        int count = orderService.expireBefore(LocalDateTime.now().minusDays(30));
        log.info("만료 처리 {}건", count);
    }

    // 이전 실행이 끝나고 5분 뒤 다시 실행
    @Scheduled(fixedDelay = 5, timeUnit = TimeUnit.MINUTES)
    public void syncStatus() {
        orderService.syncPaymentStatus();
    }
}
```

## 주의할 점

- `@EnableScheduling`이 없으면 아무 오류 없이 실행되지 않습니다.
- 스케줄 메서드는 파라미터가 없고 반환값이 `void`여야 합니다.
- 기본 스케줄러는 스레드가 1개라 한 작업이 오래 걸리면 다른 스케줄도 밀립니다. `spring.task.scheduling.pool.size`로 늘립니다. 서버를 여러 대 띄우면 각 서버에서 중복 실행되므로 ShedLock 같은 분산 락을 검토합니다.
