---
name: MultipartFile 업로드
cat: 웹 API
kind: 인터페이스
order: 60
aliases:
  - 파일 업로드
  - 이미지 업로드
  - multipart/form-data
  - '@RequestPart'
  - transferTo
  - max-file-size
summary: '`multipart/form-data`로 올라온 파일을 `MultipartFile`로 받아 저장합니다.'
related:
  - rest-controller
  - application-yml
  - value
doc: 'https://docs.spring.io/spring-framework/reference/web/webmvc/mvc-controller/ann-methods/multipart-forms.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| getOriginalFilename() | `String` | 사용자가 올린 원래 파일 이름 (신뢰하면 안 됨) |
| getContentType() | `String` | MIME 타입 (예: image/png) |
| getSize() | `long` | 파일 크기(바이트) |
| isEmpty() | `boolean` | 빈 파일 여부 |
| transferTo(Path) | `void` | 지정한 경로로 저장 |

## 사용 예시

```java
@RestController
@RequestMapping("/api/files")
public class FileController {

    private final Path uploadDir;

    public FileController(@Value("${app.upload-dir}") String uploadDir) {
        this.uploadDir = Path.of(uploadDir);
    }

    // 프론트: FormData에 "file" 이름으로 파일 추가, "title"로 텍스트 추가
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> upload(@RequestParam("file") MultipartFile file,
                                         @RequestParam("title") String title) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("빈 파일입니다.");
        }
        // 원래 이름 대신 UUID로 저장 (경로 조작·이름 중복 방지)
        String ext = StringUtils.getFilenameExtension(file.getOriginalFilename());
        String savedName = UUID.randomUUID() + (ext != null ? "." + ext : "");

        Files.createDirectories(uploadDir);
        file.transferTo(uploadDir.resolve(savedName));

        return ResponseEntity.ok(savedName);
    }
}
```

## 주의할 점

- 기본 업로드 크기 제한은 파일 1MB, 요청 10MB입니다. 더 큰 파일은 `spring.servlet.multipart.max-file-size`, `max-request-size`를 늘립니다.
- `getOriginalFilename()`을 그대로 저장 경로에 쓰면 `../` 같은 경로 조작 공격에 노출됩니다. 저장 이름은 서버에서 새로 만듭니다.
- 파일과 JSON 객체를 함께 받으려면 `@RequestPart`를 쓰고, 프론트에서 JSON 파트의 Content-Type을 `application/json`으로 지정해야 합니다.
