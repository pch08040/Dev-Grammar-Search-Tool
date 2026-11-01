---
name: try · catch · 사용자 정의 예외
cat: Java 기초
kind: 문법
order: 120
aliases:
  - 예외 처리
  - try catch
  - finally
  - throw
  - throws
  - try-with-resources
  - 커스텀 예외
  - RuntimeException
summary: '예외를 잡는 `try-catch-finally`, 자원을 자동으로 닫는 try-with-resources, 직접 만드는 예외 클래스입니다.'
related:
  - custom-exception
  - rest-controller-advice
  - transactional
  - flutter/exceptions
doc: 'https://dev.java/learn/exceptions/'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| try / catch / finally | `문` | 예외 잡기, `finally`는 항상 실행 |
| try (자원) { } | `문` | `AutoCloseable` 자원을 자동으로 닫음 |
| throw | `키워드` | 예외 발생 |
| throws | `키워드` | 메서드가 던질 수 있는 체크 예외 선언 |
| Exception | `클래스` | 체크 예외: 처리하거나 `throws`로 선언해야 함 |
| RuntimeException | `클래스` | 언체크 예외: 처리 강제 없음 |

## 사용 예시

```java
// 사용자 정의 예외: 보통 RuntimeException을 상속
public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        super(message);
    }
}

public int parseAge(String input) {
    try {
        int age = Integer.parseInt(input);
        if (age < 0) throw new IllegalArgumentException("음수 불가: " + age);
        return age;
    } catch (NumberFormatException e) {
        // 원래 예외를 cause로 넘기면 원인 추적이 남음
        throw new IllegalArgumentException("숫자가 아님: " + input, e);
    } finally {
        System.out.println("parseAge 종료");   // 성공·실패와 상관없이 실행
    }
}

// 여러 예외를 한 번에
try {
    order.cancel();
} catch (IllegalStateException | IllegalArgumentException e) {
    System.out.println("잘못된 요청: " + e.getMessage());
}

// try-with-resources: 블록이 끝나면 자동으로 close()
public List<String> readLines(Path path) throws IOException {
    try (BufferedReader reader = Files.newBufferedReader(path)) {
        return reader.lines().toList();
    }
}
```

## 주의할 점

- `catch (Exception e) {}`처럼 예외를 잡고 아무것도 하지 않으면 문제가 숨겨집니다. 최소한 로그를 남기거나 다시 던집니다.
- 다른 예외로 바꿔 던질 때는 원래 예외를 생성자의 `cause` 인자로 넘겨야 원인을 추적할 수 있습니다.
- Spring의 `@Transactional`은 기본적으로 `RuntimeException`에서만 롤백합니다. 그래서 사용자 정의 예외는 보통 `RuntimeException`을 상속합니다.
