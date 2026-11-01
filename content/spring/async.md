---
name: '@Async'
cat: 스케줄 · 비동기
kind: 어노테이션
order: 20
aliases:
  - 비동기 실행
  - 별도 스레드
  - '@EnableAsync'
  - CompletableFuture
  - 메일 발송
  - 스레드 풀
summary: 메서드를 별도 스레드에서 실행해, 호출한 쪽이 결과를 기다리지 않고 바로 다음 작업을 진행하게 합니다.
related:
  - scheduled
  - configuration-bean
  - transactional
doc: 'https://docs.spring.io/spring-framework/reference/integration/scheduling.html#scheduling-annotation-support-async'
---

## 사용 예시

```java
// 1. 비동기 켜기 + 스레드 풀 설정
@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean
    public ThreadPoolTaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(4);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-");
        executor.initialize();
        return executor;
    }
}

// 2. 별도 빈의 public 메서드에 @Async
@Slf4j
@Service
public class MailService {

    @Async
    public void sendWelcomeMail(String email) {      // 반환값 없음: 실행만 위임
        log.info("메일 발송 {}", email);
    }

    @Async
    public CompletableFuture<Boolean> checkSpam(String email) { // 결과가 필요할 때
        return CompletableFuture.completedFuture(email.endsWith("@spam.com"));
    }
}

// 3. 다른 빈에서 호출: 바로 반환되고 메일은 백그라운드에서 발송
mailService.sendWelcomeMail(member.getEmail());
```

## 주의할 점

- 같은 클래스 안에서 `this.sendMail()`로 호출하면 프록시를 거치지 않아 동기로 실행됩니다. `@Async` 메서드는 다른 빈에 두고 주입받아 호출합니다.
- `@Async` 메서드는 호출한 쪽과 다른 스레드에서 실행되므로 호출한 쪽의 `@Transactional`이 이어지지 않습니다.
- `void` 메서드에서 난 예외는 호출한 쪽으로 전달되지 않습니다. 로그를 남기거나 `AsyncUncaughtExceptionHandler`를 설정합니다.
