---
name: ElevatedButton
cat: 입력 · 버튼
kind: 위젯
order: 20
aliases:
  - 버튼
  - button
  - onPressed
  - TextButton
  - OutlinedButton
  - FilledButton
  - 비활성화
summary: 눌림 효과가 있는 기본 버튼입니다. onPressed가 null이면 비활성화됩니다.
related:
  - textfield
doc: 'https://api.flutter.dev/flutter/material/ElevatedButton-class.html'
---

## 사용 예시

```dart
ElevatedButton(
  onPressed: isLoading ? null : _submit, // null이면 비활성화
  style: ElevatedButton.styleFrom(
    minimumSize: const Size.fromHeight(48),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
  ),
  child: isLoading
      ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2))
      : const Text('저장'),
);

// 같은 사용법의 다른 버튼
TextButton(onPressed: () {}, child: const Text('취소'));
OutlinedButton(onPressed: () {}, child: const Text('보조'));
FilledButton(onPressed: () {}, child: const Text('강조'));
```
