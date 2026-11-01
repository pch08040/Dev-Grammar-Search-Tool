---
name: 클래스 · 생성자
cat: Java 기초
kind: 문법
order: 70
aliases:
  - 클래스
  - 객체
  - 생성자
  - this
  - 생성자 오버로딩
  - new
  - 인스턴스
  - getter
summary: '필드와 메서드를 묶는 클래스 선언, 객체를 만드는 생성자, `this`와 생성자 오버로딩입니다.'
related:
  - inheritance-interface
  - modifiers
  - record
  - flutter/class-constructor
doc: 'https://dev.java/learn/classes-objects/'
---

## 사용 예시

```java
public class Member {

    // 필드
    private final Long id;
    private String name;
    private int age;

    // 생성자
    public Member(Long id, String name, int age) {
        if (age < 0) throw new IllegalArgumentException("나이는 0 이상");
        this.id = id;          // this: 필드와 매개변수 이름 구분
        this.name = name;
        this.age = age;
    }

    // 생성자 오버로딩: 다른 생성자 호출
    public Member(Long id, String name) {
        this(id, name, 0);
    }

    // 메서드
    public void rename(String newName) {
        this.name = newName;
    }

    public boolean isAdult() {
        return age >= 19;
    }

    // getter
    public Long getId() { return id; }
    public String getName() { return name; }

    @Override
    public String toString() {
        return "Member{id=" + id + ", name=" + name + "}";
    }
}

// 사용
Member m = new Member(1L, "Kim", 20);
m.rename("Lee");
System.out.println(m);   // Member{id=1, name=Lee}
```

## 주의할 점

- 생성자를 하나라도 직접 만들면 매개변수 없는 기본 생성자는 자동으로 생기지 않습니다. JPA 엔티티처럼 기본 생성자가 필요하면 직접 추가합니다.
- 객체를 `==`로 비교하면 같은 객체인지를 봅니다. 값으로 비교하려면 `equals()`와 `hashCode()`를 함께 재정의하거나 `record`를 씁니다.
