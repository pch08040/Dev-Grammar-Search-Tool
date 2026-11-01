---
name: '@Value'
cat: 설정 · 프로퍼티
kind: 어노테이션
order: 20
aliases:
  - 설정값 읽기
  - 프로퍼티 주입
  - 기본값
  - 환경 변수
  - application.yml 값
  - placeholder
summary: '`application.yml`의 설정값 하나를 필드나 생성자 파라미터로 주입받습니다. `${키:기본값}` 형태로 기본값을 줄 수 있습니다.'
signature: '@Value("${app.upload-dir}") String uploadDir'
related:
  - application-yml
  - configuration-properties
  - profile
doc: 'https://docs.spring.io/spring-framework/reference/core/beans/annotation-config/value-annotations.html'
---

## 사용 예시

```java
// application.yml
// app:
//   upload-dir: /var/shop/uploads
//   page-size: 20
//   allowed-types: jpg,png,pdf

@Service
public class FileService {

    private final Path uploadDir;
    private final int pageSize;
    private final List<String> allowedTypes;

    // 생성자 파라미터로 주입 (final 필드로 유지할 수 있어 권장)
    public FileService(
            @Value("${app.upload-dir}") String uploadDir,
            @Value("${app.page-size:20}") int pageSize,              // 없으면 기본값 20
            @Value("${app.allowed-types}") List<String> allowedTypes // 쉼표로 구분된 값은 목록으로 변환
    ) {
        this.uploadDir = Path.of(uploadDir);
        this.pageSize = pageSize;
        this.allowedTypes = allowedTypes;
    }
}
```

## 주의할 점

- `static` 필드에는 주입되지 않습니다. 인스턴스 필드나 생성자 파라미터에 씁니다.
- `"${...}"`의 `$`를 빠뜨리면 문자열 그대로 들어갑니다.
- 관련된 설정이 여러 개라면 `@ConfigurationProperties`로 묶는 편이 타입 안전하고 관리하기 쉽습니다.
