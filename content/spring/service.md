---
name: '@Service · 생성자 주입'
cat: 앱 구조
kind: 어노테이션
order: 20
aliases:
  - 서비스
  - DI
  - 의존성 주입
  - '@RequiredArgsConstructor'
  - '@Autowired'
  - '@Component'
  - Lombok
summary: '비즈니스 로직 계층을 빈으로 등록하고, 필요한 의존성을 생성자로 주입받습니다.'
related:
  - jpa-repository
  - transactional
  - rest-controller
doc: >-
  https://docs.spring.io/spring-framework/reference/core/beans/dependencies/factory-collaborators.html
---

## 사용 예시

```java
@Service
@RequiredArgsConstructor           // Lombok: final 필드로 생성자 생성
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    public UserResponse getUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("user " + id));
        return UserResponse.from(user);
    }

    @Transactional
    public Long create(CreateUserRequest req) {
        User saved = userRepository.save(new User(req.name(), req.email()));
        return saved.getId();
    }
}
```

## 주의할 점

- 필드 주입(@Autowired 필드)보다 생성자 주입을 권장합니다. 테스트하기 쉽고 final로 불변을 보장합니다.
