---
name: Drawer
cat: 화면 이동
kind: 위젯
order: 70
aliases:
  - 사이드 메뉴
  - 햄버거 메뉴
  - 왼쪽 메뉴
  - 내비게이션 드로어
  - DrawerHeader
  - openDrawer
summary: 왼쪽에서 밀려 나오는 메뉴 패널입니다. `Scaffold(drawer:)`에 넣으면 앱바에 메뉴 버튼이 자동으로 생깁니다.
related:
  - scaffold
  - list-tile
  - navigator
  - tab-bar
doc: 'https://api.flutter.dev/flutter/material/Drawer-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| child | `Widget?` | 메뉴 내용 (보통 `ListView`) |
| width | `double?` | 패널 너비 |
| backgroundColor | `Color?` | 배경색 |
| Scaffold.drawer / endDrawer | `Widget?` | 왼쪽 / 오른쪽 메뉴 자리 |

## 사용 예시

```dart
Scaffold(
  appBar: AppBar(title: const Text('홈')), // 메뉴 버튼이 자동으로 생김
  drawer: Drawer(
    child: ListView(
      padding: EdgeInsets.zero, // 상단 상태 표시줄까지 헤더를 채움
      children: [
        const DrawerHeader(
          decoration: BoxDecoration(color: Colors.indigo),
          child: Text('홍길동님', style: TextStyle(color: Colors.white, fontSize: 18)),
        ),
        ListTile(
          leading: const Icon(Icons.person),
          title: const Text('내 정보'),
          onTap: () {
            Navigator.pop(context); // 메뉴부터 닫고
            Navigator.push(context, MaterialPageRoute(builder: (_) => const ProfilePage()));
          },
        ),
        ListTile(
          leading: const Icon(Icons.logout),
          title: const Text('로그아웃'),
          onTap: () => Navigator.pop(context),
        ),
      ],
    ),
  ),
  body: const Center(child: Text('본문')),
);
```

## 주의할 점

- 메뉴 항목을 눌러 다른 화면으로 갈 때는 `Navigator.pop(context)`로 메뉴를 먼저 닫아야, 돌아왔을 때 메뉴가 열려 있지 않습니다.
- 버튼으로 직접 열 때 `Scaffold.of(context).openDrawer()`는 `Scaffold` 아래에 있는 context에서만 동작합니다. 같은 `build()`의 context라면 `Builder`로 감싸서 씁니다.
- Material 3 스타일 메뉴가 필요하면 `NavigationDrawer`도 쓸 수 있습니다.
