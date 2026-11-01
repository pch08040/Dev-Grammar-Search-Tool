---
name: RestClient
cat: 웹 API
kind: 클래스
order: 90
aliases:
  - 외부 API 호출
  - HTTP 클라이언트
  - RestTemplate 대체
  - retrieve
  - onStatus
  - ParameterizedTypeReference
summary: '서버에서 외부 HTTP API를 호출하는 동기식 클라이언트입니다. Spring 6.1부터 제공되며 `RestTemplate`을 대신합니다.'
signature: 'restClient.get().uri("/users/{id}", id).retrieve().body(User.class)'
related:
  - configuration-bean
  - custom-exception
  - value
doc: 'https://docs.spring.io/spring-framework/reference/integration/rest-clients.html'
---

## 사용 예시

```java
@Configuration
public class ClientConfig {

    // Spring Boot가 만들어 둔 RestClient.Builder를 받아 기본 설정 추가
    @Bean
    public RestClient githubClient(RestClient.Builder builder) {
        return builder
                .baseUrl("https://api.github.com")
                .defaultHeader(HttpHeaders.ACCEPT, "application/vnd.github+json")
                .build();
    }
}

@Service
@RequiredArgsConstructor
public class GithubService {

    private final RestClient githubClient;

    public GithubUser getUser(String username) {
        return githubClient.get()
                .uri("/users/{username}", username)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, (req, res) -> {
                    throw new IllegalArgumentException("사용자 없음: " + username);
                })
                .body(GithubUser.class);
    }

    public List<GithubRepo> getRepos(String username) {
        return githubClient.get()
                .uri("/users/{username}/repos", username)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});   // 제네릭 목록 타입
    }

    public void createIssue(String repo, IssueRequest request) {
        githubClient.post()
                .uri("/repos/{repo}/issues", repo)
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .toBodilessEntity();
    }
}
```

## 주의할 점

- 4xx·5xx 응답이 오면 기본적으로 `RestClientResponseException`이 발생합니다. 상태별로 처리하려면 `onStatus()`를 씁니다.
- `RestClient.create()`로 직접 만들기보다 Spring Boot가 주입해 주는 `RestClient.Builder`를 쓰면 메시지 변환기 등 공통 설정이 적용됩니다.
