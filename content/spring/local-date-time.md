---
name: LocalDate · LocalDateTime
cat: 날짜 · 시간
kind: 클래스
order: 10
aliases:
  - 날짜
  - 시간
  - 현재 시간
  - 날짜 계산
  - plusDays
  - LocalTime
  - Duration
  - Period
summary: '날짜(`LocalDate`), 시간(`LocalTime`), 날짜와 시간(`LocalDateTime`)을 다루는 java.time API입니다. 불변 객체라서 계산하면 새 값을 돌려줍니다.'
related:
  - date-time-formatter
  - auditing
doc: 'https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/time/LocalDateTime.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| LocalDate | `클래스` | 날짜 (2025-03-01) |
| LocalTime | `클래스` | 시간 (14:30) |
| LocalDateTime | `클래스` | 날짜 + 시간, 시간대 정보 없음 |
| ZonedDateTime | `클래스` | 시간대 포함 (Asia/Seoul) |
| Duration | `클래스` | 시간 간격 (초·분·시간) |
| Period | `클래스` | 날짜 간격 (년·월·일) |

## 사용 예시

```java
// 현재
LocalDate today = LocalDate.now();
LocalDateTime now = LocalDateTime.now();
ZonedDateTime seoul = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));

// 만들기
LocalDate date = LocalDate.of(2025, 3, 1);
LocalDateTime dt = LocalDateTime.of(2025, 3, 1, 14, 30);
LocalDate parsed = LocalDate.parse("2025-03-01");   // ISO 형식

// 계산 (새 객체 반환)
LocalDate nextWeek = today.plusDays(7);
LocalDate lastMonth = today.minusMonths(1);
LocalDateTime startOfDay = today.atStartOfDay();      // 00:00
LocalDate endOfMonth = today.withDayOfMonth(today.lengthOfMonth());

// 비교
boolean isPast = date.isBefore(today);
boolean same = date.isEqual(parsed);

// 간격
long days = ChronoUnit.DAYS.between(date, today);
int age = Period.between(LocalDate.of(1995, 5, 10), today).getYears();
long minutes = Duration.between(dt, now).toMinutes();

// 요일
DayOfWeek dow = today.getDayOfWeek();
boolean weekend = dow == DayOfWeek.SATURDAY || dow == DayOfWeek.SUNDAY;
```

## 주의할 점

- `plusDays()` 같은 메서드는 원본을 바꾸지 않고 새 객체를 돌려줍니다. 반환값을 변수에 받아야 합니다.
- 서버와 사용자의 시간대가 다르면 `LocalDateTime.now()`가 기대와 다를 수 있습니다. 서버 시간대를 고정하거나 `ZonedDateTime`, `Instant`를 씁니다.
- 예전 `Date`, `Calendar`, `SimpleDateFormat` 대신 java.time API를 씁니다.
