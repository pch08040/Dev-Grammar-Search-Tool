---
name: Checkbox · Switch
cat: 입력 · 버튼
kind: 위젯
order: 40
aliases:
  - 체크박스
  - 토글
  - 스위치
  - 동의 체크
  - CheckboxListTile
  - SwitchListTile
  - Switch.adaptive
summary: '켜고 끄는 값을 입력받습니다. 라벨까지 함께 눌리게 하려면 `CheckboxListTile`, `SwitchListTile`을 씁니다.'
related:
  - stateful
  - list-tile
  - form-validation
doc: 'https://api.flutter.dev/flutter/material/Checkbox-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| value | `bool? / bool` | 현재 상태 (Checkbox는 `bool?`, Switch는 `bool`) |
| onChanged | `ValueChanged<bool?>? / ValueChanged<bool>?` | 바뀐 값 전달, `null`이면 비활성화 |
| tristate | `bool` | Checkbox에서 `null`(중간 상태) 허용 여부 |
| title / subtitle | `Widget?` | ListTile 버전의 라벨 |

## 사용 예시

```dart
bool _agree = false;
bool _notification = true;

// 단독 체크박스
Checkbox(
  value: _agree,
  onChanged: (v) => setState(() => _agree = v ?? false),
);

// 라벨까지 눌리는 체크박스
CheckboxListTile(
  value: _agree,
  onChanged: (v) => setState(() => _agree = v ?? false),
  title: const Text('이용약관에 동의합니다'),
  controlAffinity: ListTileControlAffinity.leading, // 체크박스를 왼쪽에
);

// 스위치
SwitchListTile(
  value: _notification,
  onChanged: (v) => setState(() => _notification = v),
  title: const Text('알림 받기'),
  subtitle: const Text('새 소식이 있으면 알려 드립니다'),
);

// 플랫폼에 맞는 모양 (iOS에서는 Cupertino 스타일)
Switch.adaptive(value: _notification, onChanged: null); // onChanged가 null이면 비활성화
```

## 주의할 점

- 위젯이 값을 직접 바꾸지 않습니다. `onChanged`에서 `setState`로 상태를 바꿔야 화면이 바뀝니다.
- `Checkbox`의 `onChanged`는 `tristate` 때문에 `bool?`를 넘깁니다. `v ?? false`처럼 null을 처리합니다.
