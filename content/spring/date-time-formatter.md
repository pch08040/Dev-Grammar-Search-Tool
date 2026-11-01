---
name: DateTimeFormatter
cat: 날짜 · 시간
kind: 클래스
order: 20
aliases:
  - 날짜 포맷
  - 날짜 형식
  - format
  - parse
  - 문자열을 날짜로
  - ofPattern
  - '@JsonFormat'
  - yyyy-MM-dd
summary: '날짜·시간을 원하는 형식의 문자열로 바꾸거나(`format()`), 문자열을 날짜로 읽을 때(`parse()`) 쓰는 형식 지정 클래스입니다.'
related:
  - local-date-time
  - string
doc: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/format/DateTimeFormatter.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| yyyy | `패턴` | 연도 4자리 |
| MM / dd | `패턴` | 월·일 2자리 |
| HH / mm / ss | `패턴` | 시(0~23)·분·초 |
| h / a | `패턴` | 시(1~12)·오전/오후 |
| E | `패턴` | 요일 (토, Sat) |
| ISO_LOCAL_DATE | `상수` | 2025-03-01 형식 |

## 사용 예시

```java
DateTimeFormatter dateFmt = DateTimeFormatter.ofPattern("yyyy-MM-dd");
DateTimeFormatter dateTimeFmt = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
DateTimeFormatter koreanFmt =
        DateTimeFormatter.ofPattern("yyyy년 M월 d일 (E) a h시 mm분", Locale.KOREAN);

LocalDateTime now = LocalDateTime.of(2025, 3, 1, 14, 5, 0);

// 날짜 → 문자열
now.format(dateFmt);          // "2025-03-01"
now.format(dateTimeFmt);      // "2025-03-01 14:05:00"
now.format(koreanFmt);        // "2025년 3월 1일 (토) 오후 2시 05분"

// 문자열 → 날짜
LocalDate date = LocalDate.parse("2025-03-01", dateFmt);
LocalDateTime dt = LocalDateTime.parse("2025-03-01 14:05:00", dateTimeFmt);

// 미리 정의된 ISO 형식
now.format(DateTimeFormatter.ISO_LOCAL_DATE);   // "2025-03-01"

// 형식이 맞지 않으면 예외
try {
    LocalDate.parse("2025/03/01", dateFmt);
} catch (DateTimeParseException e) {
    System.out.println("형식 오류: " + e.getParsedString());
}

// Spring 응답 DTO에서 JSON 날짜 형식 지정 (Jackson)
public record EventResponse(
        String title,
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime startAt
) {}
```

## 주의할 점

- 월은 대문자 `MM`, 분은 소문자 `mm`입니다. 바꿔 쓰면 오류 없이 엉뚱한 값이 나옵니다.
- 연도는 `yyyy`를 씁니다. 대문자 `YYYY`는 주 단위 연도라서 연말·연초에 연도가 틀어집니다.
- `DateTimeFormatter`는 스레드에 안전하므로 `static final` 상수로 만들어 재사용합니다.
