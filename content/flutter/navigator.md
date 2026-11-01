---
name: Navigator.push · pop
cat: 화면 이동
kind: 클래스
order: 10
aliases:
  - 화면 이동
  - 페이지 이동
  - 뒤로가기
  - MaterialPageRoute
  - 결과 받기
  - pushNamed
summary: '새 화면을 쌓아 올리고(push), 닫으면서(pop) 이전 화면으로 값을 돌려줍니다.'
related:
  - materialapp
doc: 'https://api.flutter.dev/flutter/widgets/Navigator-class.html'
---

## 사용 예시

```dart
// 이동하면서 결과 기다리기
final result = await Navigator.push<String>(
  context,
  MaterialPageRoute(builder: (_) => const EditPage(id: 3)),
);
if (result != null) debugPrint('받은 값: $result');

// EditPage에서 값 돌려주며 닫기
Navigator.pop(context, '저장 완료');

// 이름 기반 이동 (MaterialApp.routes에 등록 필요)
Navigator.pushNamed(context, '/detail');

// 로그인 후 이전 화면 모두 제거
Navigator.pushAndRemoveUntil(
  context,
  MaterialPageRoute(builder: (_) => const HomePage()),
  (route) => false,
);
```

## 주의할 점

- 라우트가 많아지면 go_router 패키지로 URL 기반 라우팅을 쓰는 것이 관리하기 쉽습니다.
