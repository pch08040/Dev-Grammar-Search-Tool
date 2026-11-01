---
name: Card
cat: 레이아웃
kind: 위젯
order: 100
aliases:
  - 카드
  - 그림자
  - elevation
  - 둥근 모서리
  - 카드 목록
summary: 둥근 모서리와 그림자가 있는 Material 카드입니다. 관련 정보를 한 덩어리로 묶어 보여 줄 때 씁니다.
related:
  - list-tile
  - container
  - padding
doc: 'https://api.flutter.dev/flutter/material/Card-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| child | `Widget?` | 카드 내용 |
| elevation | `double?` | 그림자 깊이 |
| color | `Color?` | 배경색 |
| shape | `ShapeBorder?` | 모양 (모서리 둥글기, 테두리) |
| margin | `EdgeInsetsGeometry?` | 카드 바깥 여백 (기본 4) |
| clipBehavior | `Clip?` | 내용이 둥근 모서리 밖으로 나가지 않게 자르기 |

## 사용 예시

```dart
Card(
  margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
  elevation: 1,
  clipBehavior: Clip.antiAlias, // 위쪽 이미지가 모서리를 따라 잘리게
  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
  child: InkWell(
    onTap: () => openDetail(item),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Image.network(item.imageUrl, height: 160, width: double.infinity, fit: BoxFit.cover),
        Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(item.title, style: Theme.of(context).textTheme.titleMedium),
              const SizedBox(height: 4),
              Text(item.description, maxLines: 2, overflow: TextOverflow.ellipsis),
            ],
          ),
        ),
      ],
    ),
  ),
);
```

## 주의할 점

- 카드 안의 이미지가 둥근 모서리를 넘어 보이면 `clipBehavior: Clip.antiAlias`를 줍니다.
- 카드 전체를 눌리게 하려면 `child`를 `InkWell`로 감싸야 물결 효과가 카드 모양에 맞게 보입니다.
