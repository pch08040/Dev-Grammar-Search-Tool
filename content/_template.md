---
# 이 파일을 content/flutter/ 또는 content/spring/ 에 복사해서 쓰세요.
# 파일 이름이 URL이 됩니다. 예: content/flutter/listview-builder.md → /flutter/listview-builder
# 밑줄(_)로 시작하는 파일은 빌드에서 제외됩니다.

name: ListView.builder              # 필수. 화면에 보이는 이름
cat: 목록                            # 필수. src/lib/categories.ts에 있는 분류 이름
kind: 위젯                           # 필수. 위젯 · 클래스 · 함수 · 메서드 · 문법 · 어노테이션 · 인터페이스 등
order: 10                            # 선택. 같은 분류 안에서의 정렬 순서 (작을수록 위)
aliases: [리스트, 목록, 스크롤]       # 필수. 한글·영문 검색어. 검색 품질은 여기에 달려 있습니다
summary: 한 줄 설명                   # 필수. `백틱`으로 감싸면 코드로 표시됩니다
signature: 'ListView.builder({required itemBuilder, itemCount})'   # 선택. 형태 한 줄
related: [column-row, spring/stream] # 선택. 같은 스택은 파일 이름만, 다른 스택은 stack/파일이름
doc: https://api.flutter.dev/       # 필수. 공식 문서 URL
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| itemCount | `int?` | 항목 개수 |

## 사용 예시

```dart
// 필수. 코드 블록 하나. 언어: dart, java, yaml, groovy, kotlin, json, sql, xml, properties, bash
```

## 주의할 점

- 선택. 한 줄에 하나씩
