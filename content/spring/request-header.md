---
name: '@RequestHeader · @CookieValue'
cat: 웹 API
kind: 어노테이션
order: 50
aliases:
  - 요청 헤더
  - 쿠키
  - Authorization
  - 토큰
  - ResponseCookie
  - Set-Cookie
  - HttpHeaders
summary: '요청 헤더와 쿠키 값을 메서드 파라미터로 받습니다. 응답에 쿠키를 넣을 때는 `ResponseCookie`를 씁니다.'
related:
  - rest-controller
  - path-variable-request-param
  - response-entity
doc: 'https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/requestheader.html'
---

## 사용 예시

```java
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @GetMapping("/me")
    public UserResponse me(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authorization,      // "Bearer xxx"
            @RequestHeader(value = "X-Request-Id", required = false) String requestId) {
        return authService.me(authorization.replaceFirst("^Bearer ", ""));
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(
            @CookieValue(name = "refreshToken", required = false) String refreshToken) {
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        TokenPair tokens = authService.refresh(refreshToken);

        // 응답에 쿠키 설정
        ResponseCookie cookie = ResponseCookie.from("refreshToken", tokens.refreshToken())
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/api/auth")
                .maxAge(Duration.ofDays(14))
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new TokenResponse(tokens.accessToken()));
    }
}
```

## 주의할 점

- 기본값은 `required = true`라서, 헤더나 쿠키가 없으면 400 오류가 납니다. 선택 값은 `required = false`로 지정합니다.
- 인증 헤더 처리가 여러 API에 반복되면 Spring Security나 `HandlerInterceptor`로 한곳에서 처리하는 편이 낫습니다.
