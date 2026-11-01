---
name: 배열 · Arrays
cat: Java 기초
kind: 문법
order: 60
aliases:
  - 배열
  - array
  - Arrays.sort
  - Arrays.toString
  - Arrays.asList
  - 2차원 배열
  - 배열 복사
  - length
summary: '같은 타입의 값을 고정 길이로 담는 배열과, 정렬·출력·복사를 돕는 `Arrays` 유틸리티입니다.'
related:
  - loops
  - list-map
  - comparator
  - stream
doc: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/Arrays.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| arr.length | `필드` | 배열 길이 (메서드가 아니라 괄호 없음) |
| Arrays.toString(arr) | `메서드` | 배열 내용을 문자열로 |
| Arrays.sort(arr) | `메서드` | 오름차순 정렬 (원본 변경) |
| Arrays.copyOf(arr, n) | `메서드` | 길이 n으로 복사 |
| Arrays.fill(arr, v) | `메서드` | 모든 칸을 v로 채움 |
| Arrays.asList(...) | `메서드` | 크기가 고정된 List로 감싸기 |
| Arrays.stream(arr) | `메서드` | 스트림으로 변환 |

## 사용 예시

```java
int[] nums = {5, 3, 8, 1};
String[] names = new String[3];        // [null, null, null]
int[][] grid = new int[2][3];          // 2행 3열, 0으로 초기화

System.out.println(nums.length);       // 4
System.out.println(nums[0]);           // 5
names[0] = "Kim";

System.out.println(Arrays.toString(nums));   // [5, 3, 8, 1]
Arrays.sort(nums);                           // [1, 3, 5, 8]
int idx = Arrays.binarySearch(nums, 5);      // 2 (정렬된 배열에서만)

int[] copy = Arrays.copyOf(nums, nums.length);
int[] part = Arrays.copyOfRange(nums, 1, 3); // [3, 5]
Arrays.fill(names, "-");

// 배열 → List
List<String> fixed = Arrays.asList("a", "b");             // 크기 고정
List<String> mutable = new ArrayList<>(List.of("a", "b")); // 추가·삭제 가능

// 합계·최댓값
int sum = Arrays.stream(nums).sum();
int max = Arrays.stream(nums).max().orElse(0);

// 2차원 배열 출력
System.out.println(Arrays.deepToString(grid)); // [[0, 0, 0], [0, 0, 0]]

// 내림차순 정렬은 객체 배열(Integer[])에서
Integer[] boxed = {5, 3, 8};
Arrays.sort(boxed, Comparator.reverseOrder());
```

## 주의할 점

- 배열을 `System.out.println(arr)`로 출력하면 `[I@1b6d3586` 같은 값이 나옵니다. `Arrays.toString()`을 씁니다.
- `Arrays.asList()`로 만든 List는 크기를 바꿀 수 없어서 `add()`·`remove()`에서 예외가 납니다. `new ArrayList<>(...)`로 감쌉니다.
- 배열을 `=`로 대입하면 같은 배열을 가리킵니다. 복사가 필요하면 `Arrays.copyOf()`나 `clone()`을 씁니다.
