---
name: for · while · for-each
cat: Java 기초
kind: 문법
order: 50
aliases:
  - 반복문
  - for문
  - while
  - do while
  - 향상된 for
  - break
  - continue
  - 레이블
summary: '같은 작업을 반복하는 `for`, 향상된 `for`(for-each), `while`, `do-while`과 반복을 제어하는 `break`·`continue`입니다.'
related:
  - conditionals
  - arrays
  - list-map
  - stream
doc: 'https://dev.java/learn/language-basics/controlling-flow/'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| for (초기; 조건; 증감) | `문` | 횟수가 정해진 반복 |
| for (T x : 컬렉션) | `문` | 배열·컬렉션 전체 순회 |
| while (조건) | `문` | 조건이 참인 동안 반복 |
| do { } while (조건) | `문` | 최소 1번 실행한 뒤 조건 검사 |
| break / continue | `키워드` | 반복 종료 / 다음 반복으로 건너뛰기 |

## 사용 예시

```java
// 기본 for
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}

// for-each: 배열·List·Set
List<String> names = List.of("Kim", "Lee", "Park");
for (String name : names) {
    System.out.println(name);
}

// 인덱스가 필요하면 기본 for
for (int i = 0; i < names.size(); i++) {
    System.out.println(i + ": " + names.get(i));
}

// while
int n = 10;
while (n > 0) {
    n -= 3;
}

// do-while: 최소 1번 실행
int tries = 0;
do {
    tries++;
} while (tries < 3);

// break / continue
for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) continue;   // 짝수 건너뛰기
    if (i > 7) break;           // 7보다 크면 종료
    System.out.println(i);      // 1 3 5 7
}

// 중첩 반복을 한 번에 빠져나오기 (레이블)
outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (i * j == 2) break outer;
    }
}

// Map 순회
Map<String, Integer> scores = Map.of("Kim", 90, "Lee", 80);
for (var entry : scores.entrySet()) {
    System.out.println(entry.getKey() + "=" + entry.getValue());
}
```

## 주의할 점

- for-each로 순회하는 도중 `list.remove()`를 호출하면 `ConcurrentModificationException`이 납니다. `removeIf()`나 `Iterator.remove()`를 씁니다.
- 반복 안에서 문자열을 `+`로 계속 이어 붙이면 느려집니다. `StringBuilder`를 씁니다.
