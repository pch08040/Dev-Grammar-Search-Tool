---
name: Scaffold
cat: 레이아웃
kind: 위젯
order: 10
aliases:
  - 화면 뼈대
  - AppBar
  - 앱바
  - FAB
  - floatingActionButton
  - drawer
  - 하단 탭
summary: '한 화면의 기본 뼈대입니다. 앱바, 본문, 플로팅 버튼, 하단 내비게이션 자리를 제공합니다.'
related:
  - materialapp
  - column-row
doc: 'https://api.flutter.dev/flutter/material/Scaffold-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| appBar | `PreferredSizeWidget?` | 상단 앱바 (보통 AppBar) |
| body | `Widget?` | 본문 |
| floatingActionButton | `Widget?` | 떠 있는 버튼 |
| bottomNavigationBar | `Widget?` | 하단 탭 (NavigationBar 등) |
| drawer | `Widget?` | 왼쪽에서 열리는 메뉴 |

## 사용 예시

```dart
Scaffold(
  appBar: AppBar(title: const Text('홈')),
  body: const Center(child: Text('본문')),
  floatingActionButton: FloatingActionButton(
    onPressed: () {},
    child: const Icon(Icons.add),
  ),
  bottomNavigationBar: NavigationBar(
    selectedIndex: 0,
    destinations: const [
      NavigationDestination(icon: Icon(Icons.home), label: '홈'),
      NavigationDestination(icon: Icon(Icons.person), label: '내 정보'),
    ],
  ),
);
```
