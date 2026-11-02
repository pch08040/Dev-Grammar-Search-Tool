---
name: family (인자를 받는 Provider)
cat: 상태 관리
kind: 문법
order: 100
aliases:
  - 매개변수
  - 인자 전달
  - id별 조회
  - 상세 조회
  - parameter
  - Provider에 값 넘기기
summary: 같은 종류의 상태를 인자(id, 검색어 등)별로 따로 만들 때 `.family`를 붙입니다. `provider(인자)` 형태로 읽으며, 인자마다 별도의 상태가 캐시됩니다.
related:
  - future-provider
  - notifier-provider
  - riverpod-auto-dispose
  - riverpod-generator
doc: 'https://riverpod.dev/docs/concepts2/family'
---

## 사용 예시

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

class User {
  const User(this.id, this.name);
  final int id;
  final String name;
}

Future<User> fetchUser(int id) async => User(id, 'user$id');

// 1) FutureProvider.family: 마지막 타입 인자가 인자 타입
final userProvider = FutureProvider.family<User, int>((ref, id) {
  return fetchUser(id);
});

// 2) Notifier의 family: 인자는 생성자로 받음 (Riverpod 3)
class Quantity extends Notifier<int> {
  Quantity(this.productId);
  final String productId;

  @override
  int build() => 1;

  void increase() => state++;
}

final quantityProvider =
    NotifierProvider.family<Quantity, int, String>(Quantity.new);

// 3) 여러 값은 Record로 넘김 (값이 같으면 같은 캐시)
final searchProvider =
    FutureProvider.family<List<String>, ({String query, int page})>((ref, args) async {
  return ['${args.query} ${args.page}페이지 결과'];
});

// 위젯에서
// final user = ref.watch(userProvider(42));
// ref.read(quantityProvider('p-001').notifier).increase();
// ref.watch(searchProvider((query: 'flutter', page: 1)));
```

## 주의할 점

- 인자로 객체를 넘길 때는 `==`과 `hashCode`가 구현되어 있어야 합니다. 매번 새 `List`나 `Map`을 넘기면 매번 새 상태가 만들어집니다. 여러 값은 Record로 넘깁니다.
- 인자 종류가 많아질 수 있으므로 보통 `autoDispose`와 함께 씁니다. 코드 생성 방식은 기본이 autoDispose입니다.
