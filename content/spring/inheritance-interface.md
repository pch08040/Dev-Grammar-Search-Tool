---
name: 상속 · 인터페이스 · abstract
cat: Java 기초
kind: 문법
order: 80
aliases:
  - 상속
  - extends
  - implements
  - 인터페이스
  - 추상 클래스
  - 오버라이드
  - super
  - 다형성
summary: '`extends`로 클래스를 상속하고 `implements`로 인터페이스를 구현하는 방법, 추상 클래스와 메서드 재정의(`@Override`)입니다.'
related:
  - class-constructor
  - modifiers
  - generics
  - flutter/inheritance-mixin
doc: 'https://dev.java/learn/inheritance/'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| extends | `키워드` | 클래스 상속 (하나만 가능) |
| implements | `키워드` | 인터페이스 구현 (여러 개 가능) |
| abstract | `키워드` | 객체를 만들 수 없는 클래스, 구현이 없는 메서드 |
| @Override | `어노테이션` | 부모 메서드를 재정의했는지 컴파일러가 확인 |
| super | `키워드` | 부모 생성자·메서드 호출 |
| default | `키워드` | 인터페이스 안의 기본 구현 메서드 |
| sealed / permits | `키워드` | 상속할 수 있는 하위 타입 제한 (Java 17+) |

## 사용 예시

```java
// 인터페이스: 할 수 있는 일(계약)
public interface Notifier {
    void send(String to, String message);

    default void sendAll(List<String> targets, String message) {
        targets.forEach(t -> send(t, message));
    }
}

public class EmailNotifier implements Notifier {
    @Override
    public void send(String to, String message) {
        System.out.println("메일 → " + to + ": " + message);
    }
}

// 추상 클래스: 공통 필드·로직 + 하위 클래스가 채울 부분
public abstract class Shape {
    protected final String name;

    protected Shape(String name) { this.name = name; }

    public abstract double area();          // 하위 클래스가 구현

    public String describe() {
        return name + " 넓이: " + area();
    }
}

public class Circle extends Shape {
    private final double r;

    public Circle(double r) {
        super("원");                        // 부모 생성자 호출
        this.r = r;
    }

    @Override
    public double area() { return Math.PI * r * r; }
}

// 다형성: 부모 타입으로 다루기
Notifier notifier = new EmailNotifier();
notifier.send("a@b.com", "가입 완료");
Shape shape = new Circle(2);
System.out.println(shape.describe());
```

## 주의할 점

- Java 클래스는 하나만 상속할 수 있습니다. 여러 역할이 필요하면 인터페이스를 여러 개 구현합니다.
- 부모 메서드를 재정의할 때는 `@Override`를 붙입니다. 메서드 이름이나 매개변수가 틀리면 컴파일 오류로 알려 줍니다.
- Spring에서 서비스마다 인터페이스를 두는 것은 필수가 아닙니다. 구현체가 하나뿐이면 클래스만 두어도 됩니다.
