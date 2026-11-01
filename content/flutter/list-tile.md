---
name: ListTile
cat: 목록
kind: 위젯
order: 30
aliases:
  - 목록 항목
  - 리스트 아이템
  - 설정 화면
  - leading
  - trailing
  - subtitle
summary: '아이콘, 제목, 부제목, 오른쪽 위젯을 정해진 배치로 보여 주는 목록 한 줄입니다. 설정 화면과 목록에서 가장 많이 씁니다.'
related:
  - listview-builder
  - circle-avatar
  - checkbox-switch
doc: 'https://api.flutter.dev/flutter/material/ListTile-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| leading | `Widget?` | 왼쪽 위젯 (아이콘, 아바타) |
| title | `Widget?` | 제목 |
| subtitle | `Widget?` | 제목 아래 보조 문구 |
| trailing | `Widget?` | 오른쪽 위젯 (화살표, 스위치) |
| onTap | `GestureTapCallback?` | 탭했을 때 호출 |
| dense | `bool?` | 높이를 줄인 촘촘한 모양 |

## 사용 예시

```dart
ListTile(
  leading: const CircleAvatar(child: Icon(Icons.person)),
  title: const Text('홍길동'),
  subtitle: const Text('마지막 접속 5분 전'),
  trailing: const Icon(Icons.chevron_right),
  onTap: () => debugPrint('상세 이동'),
);

// 설정 화면 스타일
ListView(
  children: [
    const ListTile(title: Text('계정'), dense: true),
    ListTile(
      leading: const Icon(Icons.lock_outline),
      title: const Text('비밀번호 변경'),
      onTap: () {},
    ),
    const Divider(height: 1),
    ListTile(
      leading: const Icon(Icons.logout, color: Colors.red),
      title: const Text('로그아웃', style: TextStyle(color: Colors.red)),
      onTap: () {},
    ),
  ],
);
```

## 주의할 점

- `Row` 안에 `ListTile`을 그대로 넣으면 너비가 정해지지 않아 오류가 납니다. `Expanded`로 감쌉니다.
- 배경색은 감싼 `Container`가 아니라 `tileColor`로 지정해야 탭 물결 효과가 가려지지 않습니다.
