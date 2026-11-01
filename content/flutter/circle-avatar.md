---
name: CircleAvatar
cat: 텍스트 · 이미지
kind: 위젯
order: 50
aliases:
  - 프로필 사진
  - 원형 이미지
  - 아바타
  - 이니셜
  - NetworkImage
  - AssetImage
summary: '프로필 사진이나 이니셜을 원 안에 표시합니다. 이미지가 없을 때 대신 보여 줄 글자나 아이콘을 넣을 수 있습니다.'
related:
  - image
  - clip-rrect
  - list-tile
doc: 'https://api.flutter.dev/flutter/material/CircleAvatar-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| radius | `double?` | 반지름 (기본 20) |
| backgroundImage | `ImageProvider?` | 배경 이미지 (`NetworkImage`, `AssetImage`) |
| child | `Widget?` | 원 위에 그릴 위젯 (이니셜, 아이콘) |
| backgroundColor | `Color?` | 배경색 |
| onBackgroundImageError | `ImageErrorListener?` | 이미지 불러오기 실패 시 호출 |

## 사용 예시

```dart
final photoUrl = user.photoUrl; // String?

// 사진이 있으면 사진, 없으면 이니셜
CircleAvatar(
  radius: 28,
  backgroundColor: Colors.grey.shade200,
  backgroundImage: photoUrl != null ? NetworkImage(photoUrl) : null,
  child: photoUrl == null ? Text(user.name.characters.first) : null,
);

// 에셋 이미지
const CircleAvatar(
  radius: 20,
  backgroundImage: AssetImage('assets/images/avatar.png'),
);

// 아이콘 아바타
const CircleAvatar(child: Icon(Icons.person));
```

## 주의할 점

- `child`는 이미지 위에 겹쳐 그려집니다. 이미지가 있을 때는 `child`를 `null`로 둡니다.
- `onBackgroundImageError`는 `backgroundImage`가 있을 때만 지정할 수 있습니다. 없을 때 지정하면 assert 오류가 납니다.
