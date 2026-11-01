---
name: DropdownButton · DropdownMenu
cat: 입력 · 버튼
kind: 위젯
order: 50
aliases:
  - 드롭다운
  - 셀렉트 박스
  - 선택 목록
  - 콤보박스
  - DropdownMenuItem
  - DropdownButtonFormField
  - DropdownMenuEntry
summary: '여러 값 중 하나를 고르는 펼침 목록입니다. Material 3 스타일은 `DropdownMenu`, 폼 검증이 필요하면 `DropdownButtonFormField`를 씁니다.'
related:
  - form-validation
  - checkbox-switch
doc: 'https://api.flutter.dev/flutter/material/DropdownButton-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| value | `T?` | 선택된 값 (DropdownButton) |
| items | `List<DropdownMenuItem<T>>?` | 선택지 목록 (DropdownButton) |
| onChanged | `ValueChanged<T?>?` | 선택 시 호출, `null`이면 비활성화 |
| initialSelection | `T?` | 처음 선택 값 (DropdownMenu) |
| dropdownMenuEntries | `List<DropdownMenuEntry<T>>` | 선택지 목록 (DropdownMenu) |
| onSelected | `ValueChanged<T?>?` | 선택 시 호출 (DropdownMenu) |

## 사용 예시

```dart
static const _cities = ['서울', '부산', '대구'];
String? _city = '서울';

// 기본 드롭다운
DropdownButton<String>(
  value: _city,
  hint: const Text('도시 선택'),
  items: _cities.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList(),
  onChanged: (v) => setState(() => _city = v),
);

// Material 3 스타일 (입력해서 찾기 가능)
DropdownMenu<String>(
  initialSelection: _city,
  label: const Text('도시'),
  onSelected: (v) => setState(() => _city = v),
  dropdownMenuEntries: [
    for (final c in _cities) DropdownMenuEntry(value: c, label: c),
  ],
);

// Form 안에서 검증까지
DropdownButtonFormField<String>(
  initialValue: _city,
  items: _cities.map((c) => DropdownMenuItem(value: c, child: Text(c))).toList(),
  onChanged: (v) => setState(() => _city = v),
  validator: (v) => v == null ? '도시를 선택하세요' : null,
);
```

## 주의할 점

- `value`는 `items` 중 정확히 하나의 값과 같아야 합니다. 목록에 없거나 같은 값이 두 번 들어 있으면 assert 오류가 납니다.
- 직접 만든 클래스를 값으로 쓸 때는 `==`과 `hashCode`를 구현하거나 id 같은 단순 값을 씁니다. 다시 생성된 객체는 다른 값으로 취급됩니다.
