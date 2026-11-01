---
name: Slider
cat: 입력 · 버튼
kind: 위젯
order: 80
aliases:
  - 슬라이더
  - 범위 선택
  - 볼륨 조절
  - RangeSlider
  - divisions
  - onChangeEnd
summary: '막대를 끌어서 범위 안의 숫자를 고릅니다. 최솟값과 최댓값 두 개를 고르려면 `RangeSlider`를 씁니다.'
related:
  - stateful
  - checkbox-switch
doc: 'https://api.flutter.dev/flutter/material/Slider-class.html'
---

## 주요 속성

| 이름 | 타입 | 설명 |
|---|---|---|
| value | `double` | 현재 값 (`min`~`max` 사이) |
| min / max | `double` | 범위 (기본 0.0~1.0) |
| divisions | `int?` | 구간 개수, 지정하면 칸 단위로 이동 |
| label | `String?` | 끄는 동안 위에 보이는 말풍선 |
| onChanged | `ValueChanged<double>?` | 끄는 동안 계속 호출, `null`이면 비활성화 |
| onChangeEnd | `ValueChanged<double>?` | 손을 뗐을 때 한 번 호출 |

## 사용 예시

```dart
double _volume = 50;

Slider(
  value: _volume,
  min: 0,
  max: 100,
  divisions: 10, // 10 단위로 이동
  label: _volume.round().toString(),
  onChanged: (v) => setState(() => _volume = v),
  onChangeEnd: (v) => _saveVolume(v), // 저장·API 호출은 여기서 한 번만
);

// 범위 선택
RangeValues _price = const RangeValues(10000, 50000);

RangeSlider(
  values: _price,
  min: 0,
  max: 100000,
  divisions: 20,
  labels: RangeLabels('${_price.start.round()}원', '${_price.end.round()}원'),
  onChanged: (v) => setState(() => _price = v),
);
```

## 주의할 점

- `value`가 `min`~`max` 범위를 벗어나면 assert 오류가 납니다. 서버에서 받은 값은 `clamp(min, max)`로 범위를 맞춥니다.
- `onChanged`는 끄는 동안 수십 번 호출됩니다. 저장이나 API 호출은 `onChangeEnd`에서 합니다.
