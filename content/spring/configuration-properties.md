---
name: '@ConfigurationProperties'
cat: 설정 · 프로퍼티
kind: 어노테이션
order: 30
aliases:
  - 설정 묶음
  - 타입 안전 설정
  - prefix
  - '@ConfigurationPropertiesScan'
  - '@EnableConfigurationProperties'
  - 설정 클래스
  - record
summary: '같은 접두사(prefix)로 묶인 설정값들을 하나의 객체로 바인딩합니다. 여러 설정을 타입 안전하게 다룰 수 있습니다.'
signature: '@ConfigurationProperties(prefix = "app.jwt") record JwtProperties(...)'
related:
  - value
  - application-yml
  - configuration-bean
doc: 'https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties'
---

## 사용 예시

```java
// application.yml
// app:
//   jwt:
//     secret: ${JWT_SECRET}
//     access-token-validity: 30m
//     refresh-token-validity: 14d

@ConfigurationProperties(prefix = "app.jwt")
public record JwtProperties(
        String secret,
        Duration accessTokenValidity,     // "30m", "14d" 같은 값을 Duration으로 변환
        @DefaultValue("14d") Duration refreshTokenValidity
) {}

// 메인 클래스에 스캔을 켜면 @ConfigurationProperties 클래스를 자동 등록
@SpringBootApplication
@ConfigurationPropertiesScan
public class ShopApplication {
    public static void main(String[] args) {
        SpringApplication.run(ShopApplication.class, args);
    }
}

@Component
@RequiredArgsConstructor
public class JwtProvider {
    private final JwtProperties props;

    public Instant accessTokenExpiry() {
        return Instant.now().plus(props.accessTokenValidity());
    }
}
```

## 주의할 점

- 클래스를 만들기만 하면 등록되지 않습니다. `@ConfigurationPropertiesScan`이나 `@EnableConfigurationProperties(JwtProperties.class)`로 등록해야 합니다.
- yml의 `access-token-validity`처럼 케밥 표기는 자바의 `accessTokenValidity`에 자동으로 연결됩니다.
- `spring-boot-configuration-processor` 의존성을 추가하면 IDE에서 yml 키 자동 완성이 됩니다.
