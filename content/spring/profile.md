---
name: '프로필 · @Profile'
cat: 설정 · 프로퍼티
kind: 어노테이션
order: 40
aliases:
  - 환경별 설정
  - 개발 운영 분리
  - spring.profiles.active
  - application-dev.yml
  - local dev prod
  - SPRING_PROFILES_ACTIVE
summary: '개발·운영처럼 실행 환경마다 다른 설정과 빈을 쓰게 합니다. `application-{프로필}.yml` 파일과 `@Profile`로 나눕니다.'
related:
  - application-yml
  - value
  - configuration-bean
doc: 'https://docs.spring.io/spring-boot/reference/features/profiles.html'
---

## 사용 예시

```java
// src/main/resources/
// ├── application.yml         // 모든 환경 공통 + 기본 프로필 지정
// ├── application-local.yml   // 로컬 개발용 (예: H2, 상세 로그)
// └── application-prod.yml    // 운영용 (예: MySQL, 환경 변수)
//
// application.yml
// spring:
//   profiles:
//     active: local           // 아무것도 지정하지 않았을 때 쓸 프로필

// 실행할 때 프로필 지정
// ./gradlew bootRun --args='--spring.profiles.active=prod'
// java -jar app.jar --spring.profiles.active=prod
// SPRING_PROFILES_ACTIVE=prod java -jar app.jar

// 특정 프로필에서만 등록되는 빈
@Configuration
public class MailConfig {

    @Bean
    @Profile("prod")
    public MailSender smtpMailSender() {
        return new SmtpMailSender();
    }

    @Bean
    @Profile("!prod")              // prod가 아닐 때 (로컬, 테스트)
    public MailSender consoleMailSender() {
        return new ConsoleMailSender();
    }
}
```

## 주의할 점

- `application.yml`의 공통 설정을 먼저 읽고, 활성 프로필 파일의 같은 키가 그 값을 덮어씁니다.
- 테스트에서는 `@ActiveProfiles("test")`로 프로필을 지정합니다.
- 운영 서버에서 프로필 지정을 빠뜨리면 기본 프로필(예: local) 설정으로 뜰 수 있습니다. 배포 스크립트에서 환경 변수로 명시합니다.
