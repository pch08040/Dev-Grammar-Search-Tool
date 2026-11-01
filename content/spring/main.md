---
name: public static void main
cat: Java 기초
kind: 문법
order: 10
aliases:
  - 진입점
  - 메인 메서드
  - Hello World
  - class
  - 실행
summary: Java 프로그램의 진입점입니다. JVM이 이 메서드부터 실행합니다.
signature: 'public static void main(String[] args)'
related:
  - string
  - spring-boot-application
doc: 'https://dev.java/learn/'
---

## 사용 예시

```java
public class Main {
    public static void main(String[] args) {
        String name = "Java";
        int count = 3;

        for (int i = 0; i < count; i++) {
            System.out.println("Hello, " + name + " " + i);
        }

        var list = java.util.List.of("a", "b"); // var: 지역 변수 타입 추론
        System.out.printf("size=%d%n", list.size());
    }
}
```
