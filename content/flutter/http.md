---
name: http.get · http.post
cat: 네트워크 · 저장소
kind: 패키지
order: 10
aliases:
  - API 호출
  - 네트워크 요청
  - REST
  - GET
  - POST
  - 서버 통신
  - 한글 깨짐
summary: Dart 공식 `http` 패키지로 REST API를 호출합니다. 응답 본문은 `jsonDecode()`로 Map으로 바꿔서 씁니다.
signature: 'Future<Response> http.get(Uri url, {Map<String, String>? headers})'
related:
  - json
  - async-await
  - futurebuilder
  - class-constructor
doc: 'https://pub.dev/packages/http'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| http.get / post / put / delete | 함수 | HTTP 요청 보내기 |
| Uri.parse(url) · Uri.https(host, path, query) | `Uri` | 요청 주소 만들기 |
| response.statusCode | `int` | 응답 상태 코드 |
| response.body | `String` | 응답 본문 문자열 |
| response.bodyBytes | `Uint8List` | 응답 본문 바이트 (인코딩 직접 처리) |

## 사용 예시

```dart
// pubspec.yaml: http: ^1.6.0
import 'dart:convert';
import 'package:http/http.dart' as http;

const _baseUrl = 'https://api.example.com';

Future<List<User>> fetchUsers({String? keyword}) async {
  final uri = Uri.parse('$_baseUrl/users').replace(
    queryParameters: {if (keyword != null) 'keyword': keyword},
  );
  final res = await http
      .get(uri, headers: {'Authorization': 'Bearer $token'})
      .timeout(const Duration(seconds: 10));

  if (res.statusCode != 200) {
    throw Exception('조회 실패: ${res.statusCode}');
  }
  // 서버가 charset을 안 보내도 한글이 깨지지 않게 UTF-8로 직접 디코딩
  final list = jsonDecode(utf8.decode(res.bodyBytes)) as List<dynamic>;
  return list.map((e) => User.fromJson(e as Map<String, dynamic>)).toList();
}

Future<void> createUser(String name) async {
  final res = await http.post(
    Uri.parse('$_baseUrl/users'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode({'name': name}),
  );
  if (res.statusCode != 201) throw Exception('생성 실패: ${res.body}');
}
```

## 주의할 점

- 응답의 `Content-Type`에 `charset=utf-8`이 없으면 `res.body`에서 한글이 깨집니다. `utf8.decode(res.bodyBytes)`로 디코딩합니다.
- Android 릴리스 빌드에서는 `AndroidManifest.xml`에 `INTERNET` 권한이 없으면 요청이 실패합니다. 또 `http://` 주소는 Android와 iOS 모두 기본으로 막혀 있으니 `https://`를 씁니다.
- 같은 서버에 여러 번 요청한다면 `http.Client()`를 하나 만들어 재사용하고, 다 쓰면 `close()`합니다.
