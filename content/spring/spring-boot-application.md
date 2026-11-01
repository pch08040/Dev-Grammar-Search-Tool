---
name: '@SpringBootApplication'
cat: 앱 구조
kind: 어노테이션
order: 10
aliases:
  - 메인 클래스
  - 진입점
  - SpringApplication.run
  - 자동 설정
  - 컴포넌트 스캔
summary: Spring Boot 앱의 시작 클래스입니다. 자동 설정과 컴포넌트 스캔을 함께 켭니다.
signature: >-
  @SpringBootApplication = @Configuration + @EnableAutoConfiguration +
  @ComponentScan
related:
  - service
  - rest-controller
doc: >-
  https://docs.spring.io/spring-boot/reference/using/using-the-springbootapplication-annotation.html
---

## 사용 예시

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

## 주의할 점

- 컴포넌트 스캔은 이 클래스의 패키지와 하위 패키지만 대상으로 합니다. 메인 클래스는 최상위 패키지에 둡니다.
