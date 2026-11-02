---
name: Provider
cat: 상태 관리
kind: 클래스
order: 20
aliases:
  - 읽기 전용 Provider
  - 의존성 주입
  - DI
  - 계산된 값
  - 파생 상태
  - Repository 주입
signature: 'final xProvider = Provider<T>((ref) => value);'
summary: 바뀌지 않는 값이나 객체(Repository, API 클라이언트 등)를 제공하고, 다른 Provider를 조합해 계산된 값을 만드는 기본 Provider입니다.
related:
  - riverpod-setup
  - notifier-provider
  - ref-watch-read-listen
doc: 'https://pub.dev/documentation/flutter_riverpod/latest/flutter_riverpod/Provider-class.html'
---

## 사용 예시

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ApiClient {
  ApiClient(this.baseUrl);
  final String baseUrl;
}

class UserRepository {
  UserRepository(this.client);
  final ApiClient client;
}

// 1) 의존성 제공: 객체를 한 곳에서 만들어 공유
final apiClientProvider = Provider<ApiClient>((ref) {
  return ApiClient('https://api.example.com');
});

// 2) 다른 Provider를 조합 (ref.watch로 의존성 주입)
final userRepositoryProvider = Provider<UserRepository>((ref) {
  return UserRepository(ref.watch(apiClientProvider));
});

// 3) 다른 상태로부터 계산된 값
final cartPricesProvider = Provider<List<int>>((ref) => [1200, 3500, 800]);

final cartTotalProvider = Provider<int>((ref) {
  final prices = ref.watch(cartPricesProvider);
  return prices.fold(0, (sum, price) => sum + price);
});
```

## 주의할 점

- `Provider`의 값은 밖에서 바꿀 수 없습니다. 바뀌는 상태는 `Notifier`와 `NotifierProvider`를 씁니다.
- Provider 본문에서 다른 Provider는 `ref.watch`로 읽습니다. `ref.read`로 읽으면 의존 Provider가 바뀌어도 다시 계산되지 않습니다.
- Provider는 전역 `final` 변수로 선언하는 것이 정상입니다. 상태 자체는 `ProviderScope` 안에 보관되므로 전역 변수의 문제가 생기지 않습니다.
