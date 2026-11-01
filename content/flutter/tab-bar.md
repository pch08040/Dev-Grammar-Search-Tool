---
name: TabBar · TabBarView
cat: 화면 이동
kind: 위젯
order: 60
aliases:
  - 탭
  - 상단 탭
  - 탭 메뉴
  - DefaultTabController
  - TabController
  - Tab
summary: 상단 탭 버튼(`TabBar`)과 탭별 화면(`TabBarView`)을 연결합니다. 가장 간단하게는 `DefaultTabController`로 감싸서 씁니다.
related:
  - scaffold
  - page-view
  - drawer
  - go-router
doc: 'https://api.flutter.dev/flutter/material/TabBar-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| DefaultTabController.length | `int` | 탭 개수 (`tabs`, `children` 개수와 같아야 함) |
| TabBar.tabs | `List<Widget>` | 탭 버튼 목록 (보통 `Tab`) |
| TabBar.isScrollable | `bool` | 탭이 많을 때 가로 스크롤 |
| TabBar.onTap | `ValueChanged<int>?` | 탭을 눌렀을 때 |
| TabBarView.children | `List<Widget>` | 탭별 화면 |

## 사용 예시

```dart
class OrderPage extends StatelessWidget {
  const OrderPage({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3, // 탭 개수와 children 개수를 맞춤
      child: Scaffold(
        appBar: AppBar(
          title: const Text('주문 내역'),
          bottom: const TabBar(
            tabs: [
              Tab(text: '전체'),
              Tab(text: '진행 중'),
              Tab(icon: Icon(Icons.check), text: '완료'),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            OrderList(status: null),
            OrderList(status: 'progress'),
            OrderList(status: 'done'),
          ],
        ),
      ),
    );
  }
}
```

## 주의할 점

- `length`, `tabs` 개수, `children` 개수가 다르면 오류가 납니다.
- 코드로 탭을 바꾸거나 현재 탭 번호를 알아야 하면 `DefaultTabController.of(context)`를 쓰거나, `StatefulWidget`에서 `TabController`를 직접 만들고 `dispose()`에서 해제합니다.
- 탭을 바꿀 때 이전 탭의 스크롤 위치가 초기화되면, 탭 화면 `State`에 `AutomaticKeepAliveClientMixin`을 적용합니다.
