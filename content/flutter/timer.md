---
name: Timer
cat: 비동기
kind: 클래스
order: 30
aliases:
  - 타이머
  - 반복 실행
  - 지연 실행
  - 카운트다운
  - 디바운스
  - Timer.periodic
summary: 일정 시간 뒤에 한 번, 또는 일정 간격으로 반복해서 코드를 실행합니다. `dart:async`에 들어 있습니다.
signature: 'Timer(Duration duration, void Function() callback) · Timer.periodic(Duration period, void Function(Timer) callback)'
related:
  - lifecycle
  - stream-builder
  - async-await
doc: 'https://api.dart.dev/stable/dart-async/Timer-class.html'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| Timer(duration, callback) | 생성자 | `duration` 뒤에 한 번 실행 |
| Timer.periodic(period, callback) | 생성자 | `period` 간격으로 반복 실행 |
| cancel() | 메서드 | 타이머 중지 |
| isActive | `bool` | 아직 실행 대기 중인지 |
| tick | `int` | 반복 타이머가 실행된 횟수 |

## 사용 예시

```dart
import 'dart:async';

class _CountdownState extends State<Countdown> {
  Timer? _timer;
  Timer? _debounce;
  int _left = 60;

  void _start() {
    _timer?.cancel();
    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (_left == 0) {
        timer.cancel();
        return;
      }
      setState(() => _left--);
    });
  }

  // 검색어 입력이 0.4초 동안 멈추면 한 번만 검색 (디바운스)
  void _onSearchChanged(String keyword) {
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 400), () => _search(keyword));
  }

  @override
  void dispose() {
    _timer?.cancel(); // 화면이 사라지면 반드시 중지
    _debounce?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => Text('남은 시간: $_left초');
}
```

## 주의할 점

- `dispose()`에서 `cancel()`하지 않으면 화면이 닫힌 뒤에도 콜백이 실행되어 `setState() called after dispose()` 오류가 납니다.
- 한 번 지연 실행만 필요하고 취소할 일이 없다면 `await Future.delayed(...)`가 더 간단합니다.
