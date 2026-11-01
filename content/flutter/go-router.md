---
name: go_router
cat: 화면 이동
kind: 패키지
order: 20
aliases:
  - 라우터
  - URL 라우팅
  - 페이지 이동
  - GoRouter
  - GoRoute
  - context.go
  - context.push
  - 경로 파라미터
summary: URL 경로 기반으로 화면을 이동하는 공식 라우팅 패키지입니다. 웹 주소, 딥링크, 경로 파라미터를 `Navigator`보다 간단하게 다룹니다.
signature: 'MaterialApp.router(routerConfig: GoRouter(routes: [...]))'
related:
  - navigator
  - materialapp
  - tab-bar
doc: 'https://pub.dev/packages/go_router'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| GoRouter | `GoRouter` | 라우트 목록과 초기 경로를 가진 라우터 |
| GoRoute | `GoRoute` | `path`와 `builder`로 경로 하나를 정의 |
| context.go(path) | 메서드 | 해당 경로로 이동 (스택을 경로에 맞게 교체) |
| context.push(path) | 메서드 | 현재 화면 위에 쌓기 (뒤로가기 가능) |
| context.pop([result]) | 메서드 | 현재 화면 닫기 |
| state.pathParameters | `Map<String, String>` | `/users/:id`의 `id` 값 |
| state.uri.queryParameters | `Map<String, String>` | `?tab=info` 같은 쿼리 값 |

## 사용 예시

```dart
// pubspec.yaml: go_router: ^18.1.2
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

final _router = GoRouter(
  initialLocation: '/',
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const HomePage(),
      routes: [
        // 하위 경로: /users/3?tab=info
        GoRoute(
          path: 'users/:id',
          builder: (context, state) {
            final id = int.parse(state.pathParameters['id']!);
            final tab = state.uri.queryParameters['tab'] ?? 'info';
            return UserPage(id: id, tab: tab);
          },
        ),
      ],
    ),
    GoRoute(path: '/login', builder: (context, state) => const LoginPage()),
  ],
);

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(routerConfig: _router);
  }
}

// 이동
context.go('/login');              // 스택 교체
context.push('/users/3?tab=posts'); // 위에 쌓기
context.pop();                      // 닫기
```

## 주의할 점

- `GoRouter` 인스턴스는 `build()` 안에서 만들지 말고 전역이나 상위 상태에 한 번만 만듭니다. 매번 새로 만들면 화면이 다시 그려질 때 첫 화면으로 돌아갑니다.
- `context.go()`는 스택을 경로에 맞게 바꾸므로 뒤로가기가 기대와 다를 수 있습니다. 상세 화면처럼 돌아와야 하는 이동은 `context.push()`를 씁니다.
- 로그인 여부에 따른 이동은 각 화면에서 처리하지 말고 `GoRouter(redirect: ...)`에 모아 둡니다.
