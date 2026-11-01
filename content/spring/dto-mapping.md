---
name: DTO 변환 패턴
cat: 앱 구조
kind: 패턴
order: 60
aliases:
  - DTO
  - 엔티티 변환
  - 응답 객체
  - from
  - toEntity
  - record
  - MapStruct
summary: '엔티티와 요청·응답 DTO를 서로 변환하는 패턴입니다. `record`에 정적 팩터리 `from()`과 `toEntity()`를 두는 방식이 가장 간단합니다.'
related:
  - layered-structure
  - record
  - request-body-valid
  - entity
doc: 'https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/responsebody.html'
---

## 사용 예시

```java
// 요청 DTO → 엔티티
public record CreateUserRequest(
        @NotBlank String name,
        @NotBlank @Email String email
) {
    public User toEntity() {
        return new User(name, email);
    }
}

// 엔티티 → 응답 DTO
public record UserResponse(Long id, String name, String email, LocalDateTime createdAt) {

    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getCreatedAt());
    }
}

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public UserResponse create(CreateUserRequest req) {
        return UserResponse.from(userRepository.save(req.toEntity()));
    }

    public List<UserResponse> findAll() {
        return userRepository.findAll().stream()
                .map(UserResponse::from)   // 목록 변환
                .toList();
    }

    public Page<UserResponse> findPage(Pageable pageable) {
        return userRepository.findAll(pageable).map(UserResponse::from); // 페이지 변환
    }
}
```

## 주의할 점

- 엔티티를 그대로 응답하면 지연 로딩 예외, 양방향 연관관계의 무한 순환, 내부 필드 노출 문제가 생깁니다. 항상 DTO로 바꿔서 반환합니다.
- 변환은 트랜잭션 안(Service)에서 끝냅니다. 트랜잭션이 끝난 뒤 지연 로딩 필드를 읽으면 `LazyInitializationException`이 납니다.
- 변환할 필드가 많고 DTO가 많아지면 MapStruct 같은 매핑 라이브러리를 고려합니다.
