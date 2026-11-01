---
name: ListView.builder
cat: 목록
kind: 위젯
order: 10
aliases:
  - 리스트
  - 목록
  - 스크롤
  - itemBuilder
  - separated
  - 무한 스크롤
summary: 화면에 보이는 항목만 그때그때 만들어 그리는 스크롤 목록입니다. 항목이 많을 때 씁니다.
related:
  - column-row
  - futurebuilder
doc: 'https://api.flutter.dev/flutter/widgets/ListView-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| itemCount | `int?` | 항목 개수 |
| itemBuilder | `(context, index) => Widget` | 각 항목을 만드는 함수 |
| padding | `EdgeInsetsGeometry?` | 목록 여백 |
| controller | `ScrollController?` | 스크롤 위치 제어 |

## 사용 예시

```dart
final users = ['Kim', 'Lee', 'Park'];

ListView.separated(
  padding: const EdgeInsets.all(16),
  itemCount: users.length,
  separatorBuilder: (_, __) => const Divider(height: 1),
  itemBuilder: (context, index) {
    final name = users[index];
    return ListTile(
      leading: CircleAvatar(child: Text(name[0])),
      title: Text(name),
      trailing: const Icon(Icons.chevron_right),
      onTap: () => debugPrint('tap $name'),
    );
  },
);
```

## 주의할 점

- Column 안에 ListView를 넣으면 높이 오류가 납니다. ListView를 Expanded로 감쌉니다.
