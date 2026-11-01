---
name: MaterialApp
cat: 기본 구조
kind: 위젯
order: 20
aliases:
  - 앱 설정
  - 테마
  - theme
  - 라우트
  - routes
  - 다크모드
summary: 'Material 디자인 앱의 뿌리 위젯입니다. 테마, 라우트, 첫 화면을 설정합니다.'
related:
  - scaffold
  - navigator
doc: 'https://api.flutter.dev/flutter/material/MaterialApp-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| home | `Widget?` | 첫 화면 |
| theme / darkTheme | `ThemeData?` | 라이트·다크 테마 |
| themeMode | `ThemeMode` | system · light · dark |
| routes | `Map<String, WidgetBuilder>` | 이름 기반 라우트 표 |
| initialRoute | `String?` | 시작 라우트 이름 |
| debugShowCheckedModeBanner | `bool` | 오른쪽 위 DEBUG 띠 표시 여부 |

## 사용 예시

```dart
MaterialApp(
  title: 'My App',
  debugShowCheckedModeBanner: false,
  theme: ThemeData(
    colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
    useMaterial3: true,
  ),
  darkTheme: ThemeData.dark(useMaterial3: true),
  themeMode: ThemeMode.system,
  initialRoute: '/',
  routes: {
    '/': (context) => const HomePage(),
    '/detail': (context) => const DetailPage(),
  },
);
```

## 주의할 점

- home과 routes의 '/'를 동시에 지정하면 오류가 납니다. 둘 중 하나만 씁니다.
