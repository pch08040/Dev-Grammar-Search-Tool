---
name: CORS 설정
cat: 웹 API
kind: 설정
order: 70
aliases:
  - CORS 오류
  - 교차 출처
  - WebMvcConfigurer
  - addCorsMappings
  - '@CrossOrigin'
  - allowedOrigins
  - preflight
summary: '다른 출처(도메인·포트)의 프론트엔드가 API를 호출할 수 있도록 허용합니다. `WebMvcConfigurer`의 `addCorsMappings`로 전역 설정합니다.'
related:
  - configuration-bean
  - rest-controller
  - profile
doc: 'https://docs.spring.io/spring-framework/reference/web/webmvc-cors.html'
---

## 사용 예시

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173", "https://admin.example.com")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .exposedHeaders("Location")   // 프론트에서 읽어야 하는 응답 헤더
                .allowCredentials(true)       // 쿠키·인증 헤더 허용
                .maxAge(3600);                // preflight 결과 캐시(초)
    }
}

// 특정 컨트롤러만 허용할 때
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/public")
public class PublicController {
}
```

## 주의할 점

- `allowCredentials(true)`와 `allowedOrigins("*")`는 함께 쓸 수 없습니다. 여러 도메인을 패턴으로 허용하려면 `allowedOriginPatterns("https://*.example.com")`을 씁니다.
- Spring Security를 쓰면 보안 필터가 먼저 요청을 막습니다. `http.cors(Customizer.withDefaults())`를 켜고 `CorsConfigurationSource` 빈으로 설정해야 합니다.
- 개발 중에는 Vite의 프록시(`server.proxy`)로 같은 출처처럼 호출하면 CORS 설정 없이도 됩니다.
