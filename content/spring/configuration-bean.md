---
name: '@Configuration · @Bean'
cat: 앱 구조
kind: 어노테이션
order: 40
aliases:
  - 설정 클래스
  - 빈 등록
  - 수동 빈 등록
  - '@Primary'
  - '@Qualifier'
  - PasswordEncoder
  - bean
summary: '설정 클래스 안의 메서드가 반환하는 객체를 빈으로 등록합니다. 직접 어노테이션을 붙일 수 없는 외부 라이브러리 객체를 등록할 때 주로 씁니다.'
signature: '@Configuration class AppConfig { @Bean Type name() { return ...; } }'
related:
  - component
  - value
  - configuration-properties
doc: 'https://docs.spring.io/spring-framework/reference/core/beans/java/bean-annotation.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| @Configuration | `어노테이션` | 빈 정의 메서드를 담는 설정 클래스 |
| @Bean | `어노테이션` | 메서드 반환값을 빈으로 등록. 기본 빈 이름은 메서드 이름 |
| @Primary | `어노테이션` | 같은 타입 빈이 여러 개일 때 기본으로 주입할 빈 |
| @Qualifier("이름") | `어노테이션` | 주입할 빈을 이름으로 지정 |

## 사용 예시

```java
@Configuration
public class AppConfig {

    // 외부 라이브러리 클래스는 @Component를 붙일 수 없으므로 @Bean으로 등록
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // 테스트에서 시간을 고정할 수 있도록 Clock을 빈으로 등록
    @Bean
    public Clock clock() {
        return Clock.system(ZoneId.of("Asia/Seoul"));
    }

    // 같은 타입 빈이 여러 개일 때
    @Bean
    @Primary
    public ExecutorService defaultExecutor() {
        return Executors.newFixedThreadPool(4);
    }

    @Bean
    public ExecutorService reportExecutor() {
        return Executors.newSingleThreadExecutor();
    }
}

@Service
public class ReportService {
    private final ExecutorService executor;

    // 파라미터 이름이나 @Qualifier로 특정 빈 선택
    public ReportService(@Qualifier("reportExecutor") ExecutorService executor) {
        this.executor = executor;
    }
}
```

## 주의할 점

- `@Bean` 메서드는 `@Configuration` 클래스 안에 두어야 같은 메서드를 여러 번 호출해도 싱글톤이 유지됩니다.
- 직접 만든 클래스는 `@Component` 계열 어노테이션을 붙이는 편이 간단합니다. `@Bean`은 생성 과정을 직접 제어해야 할 때 씁니다.
