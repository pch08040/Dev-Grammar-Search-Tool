---
name: SingleChildScrollView
cat: 레이아웃
kind: 위젯
order: 120
aliases:
  - 스크롤
  - 화면 넘침
  - 키보드 가림
  - overflow 해결
  - 폼 스크롤
  - 가로 스크롤
summary: 자식 하나를 스크롤 가능하게 만듭니다. 내용이 화면보다 길어질 수 있는 폼이나 상세 화면에 씁니다.
related:
  - listview-builder
  - scroll-controller
  - form-validation
doc: 'https://api.flutter.dev/flutter/widgets/SingleChildScrollView-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| child | `Widget?` | 스크롤할 내용 (보통 Column) |
| scrollDirection | `Axis` | 스크롤 방향 (기본 vertical) |
| padding | `EdgeInsetsGeometry?` | 스크롤 영역 안쪽 여백 |
| controller | `ScrollController?` | 스크롤 위치 제어 |
| keyboardDismissBehavior | `ScrollViewKeyboardDismissBehavior` | `onDrag`면 스크롤할 때 키보드 닫기 |

## 사용 예시

```dart
Scaffold(
  appBar: AppBar(title: const Text('회원가입')),
  body: SingleChildScrollView(
    padding: const EdgeInsets.all(16),
    keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      spacing: 12,
      children: [
        const TextField(decoration: InputDecoration(labelText: '이름')),
        const TextField(decoration: InputDecoration(labelText: '이메일')),
        const TextField(decoration: InputDecoration(labelText: '비밀번호'), obscureText: true),
        FilledButton(onPressed: () {}, child: const Text('가입하기')),
      ],
    ),
  ),
);
```

## 주의할 점

- 자식을 한 번에 모두 그리므로 항목이 많은 목록에는 `ListView.builder`를 씁니다.
- 안쪽 `Column`에서 `Expanded`나 `Spacer`는 쓸 수 없습니다. 스크롤 방향의 높이가 무한이기 때문입니다.
- 키보드가 입력창을 가리면 이 위젯으로 감싸서 스크롤되게 합니다.
