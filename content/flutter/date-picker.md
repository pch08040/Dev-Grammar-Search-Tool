---
name: showDatePicker
cat: 입력 · 버튼
kind: 함수
order: 90
aliases:
  - 날짜 선택
  - 달력
  - 시간 선택
  - 기간 선택
  - showTimePicker
  - showDateRangePicker
  - DateTime
summary: '달력 대화상자를 띄워 날짜를 고르게 하고, 선택한 `DateTime`을 돌려줍니다. 취소하면 `null`입니다.'
signature: 'Future<DateTime?> showDatePicker({required BuildContext context, DateTime? initialDate, required DateTime firstDate, required DateTime lastDate})'
related:
  - show-dialog
  - materialapp
  - async-await
doc: 'https://api.flutter.dev/flutter/material/showDatePicker.html'
---

## 사용 예시

```dart
DateTime? _selected;

Future<void> _pickDate() async {
  final now = DateTime.now();
  final picked = await showDatePicker(
    context: context,
    initialDate: _selected ?? now,
    firstDate: DateTime(now.year - 1),
    lastDate: DateTime(now.year + 1, 12, 31),
    helpText: '예약 날짜 선택',
  );
  if (picked == null || !mounted) return; // 취소했거나 화면이 닫힘
  setState(() => _selected = picked);
}

Future<void> _pickTime() async {
  final time = await showTimePicker(
    context: context,
    initialTime: TimeOfDay.now(),
  );
  if (time != null) debugPrint('${time.hour}:${time.minute}');
}

Future<void> _pickRange() async {
  final range = await showDateRangePicker(
    context: context,
    firstDate: DateTime(2020),
    lastDate: DateTime(2030),
  );
  if (range != null) debugPrint('${range.start} ~ ${range.end}');
}
```

## 주의할 점

- `initialDate`가 `firstDate`~`lastDate` 범위를 벗어나면 assert 오류가 납니다.
- 달력을 한국어로 표시하려면 `flutter_localizations` 패키지를 추가하고, `MaterialApp`에 `localizationsDelegates`와 `supportedLocales`를 설정합니다.
