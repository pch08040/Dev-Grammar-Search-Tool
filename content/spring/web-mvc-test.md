---
name: '@WebMvcTest · MockMvc'
cat: 테스트
kind: 어노테이션
order: 20
aliases:
  - 컨트롤러 테스트
  - API 테스트
  - MockMvc
  - perform
  - jsonPath
  - 슬라이스 테스트
summary: 웹 계층(컨트롤러, 예외 처리, 검증)만 띄워서 HTTP 요청과 응답을 빠르게 검증합니다.
related:
  - spring-boot-test
  - rest-controller
  - junit
doc: 'https://docs.spring.io/spring-boot/reference/testing/spring-boot-applications.html#testing.spring-boot-applications.spring-mvc-tests'
---

## 사용 예시

```java
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)        // 이 컨트롤러와 웹 관련 빈만 로드
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean                         // 서비스는 직접 등록해야 함
    UserService userService;

    @Test
    void 사용자_조회() throws Exception {
        given(userService.getUser(1L)).willReturn(new UserResponse(1L, "Kim"));

        mockMvc.perform(get("/api/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Kim"));
    }

    @Test
    void 이름이_비어_있으면_400() throws Exception {
        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name": "", "email": "kim@example.com"}
                                """))
                .andExpect(status().isBadRequest());
    }
}
```

## 주의할 점

- `@WebMvcTest`는 `@Service`, `@Repository`를 로드하지 않습니다. 컨트롤러가 의존하는 빈은 `@MockitoBean`으로 등록해야 컨텍스트가 뜹니다.
- 메인 클래스에 `@EnableJpaAuditing`을 붙이면 JPA 빈이 없어 `@WebMvcTest`가 실패합니다. 설정은 별도 `@Configuration` 클래스로 분리합니다.
- Spring Security를 쓰면 기본적으로 인증이 걸려 401·403이 납니다. `@WithMockUser`를 붙이거나 보안 설정을 함께 로드합니다.
