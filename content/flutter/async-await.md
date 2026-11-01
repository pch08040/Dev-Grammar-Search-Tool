---
name: Future · async · await
cat: Dart 문법
kind: 문법
order: 20
aliases:
  - 비동기
  - Future.wait
  - try catch
  - Future.delayed
  - Stream
summary: '시간이 걸리는 작업(네트워크, 파일)을 기다렸다가 결과를 받는 문법입니다.'
related:
  - futurebuilder
  - class-constructor
doc: 'https://dart.dev/libraries/async/async-await'
---

## 사용 예시

```dart
Future<User> fetchUser(int id) async {
  final res = await http.get(Uri.parse('https://api.example.com/users/$id'));
  if (res.statusCode != 200) {
    throw Exception('조회 실패: ${res.statusCode}');
  }
  return User.fromJson(jsonDecode(res.body));
}

Future<void> load() async {
  try {
    final user = await fetchUser(1);
    print(user.name);
  } catch (e) {
    print('오류: $e');
  } finally {
    print('완료');
  }
}

// 여러 요청 동시에
final results = await Future.wait([fetchUser(1), fetchUser(2)]);

// 지연
await Future.delayed(const Duration(seconds: 1));
```
