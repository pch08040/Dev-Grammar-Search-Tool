---
name: main() · runApp()
cat: 기본 구조
kind: 함수
order: 10
aliases:
  - 진입점
  - 앱 시작
  - entry point
  - runApp
  - ensureInitialized
summary: 앱의 진입점입니다. runApp()에 최상위 위젯을 넘기면 화면을 그리기 시작합니다.
signature: void main() => runApp(const MyApp());
related:
  - materialapp
  - stateless
doc: 'https://api.flutter.dev/flutter/widgets/runApp.html'
---

## 사용 예시

```dart
import 'package:flutter/material.dart';

void main() {
  // Firebase 등 비동기 초기화가 있다면 먼저 호출
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Scaffold(
        body: Center(child: Text('Hello Flutter')),
      ),
    );
  }
}
```

## 주의할 점

- main()을 async로 만들고 await Firebase.initializeApp()을 호출하기 전에는 반드시 WidgetsFlutterBinding.ensureInitialized()를 먼저 호출합니다.
