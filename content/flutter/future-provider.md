---
name: FutureProvider
cat: 상태 관리
kind: 클래스
order: 70
aliases:
  - API 호출
  - 비동기 데이터
  - 서버 조회
  - 로딩 표시
  - 읽기 전용 비동기
  - Future
signature: 'final p = FutureProvider<T>((ref) async => ...);'
summary: '`Future`를 반환하는 읽기 전용 비동기 Provider입니다. 위젯에서 `ref.watch`하면 로딩, 오류, 데이터 상태를 `AsyncValue`로 받습니다.'
related:
  - async-value
  - async-notifier
  - riverpod-family
  - futurebuilder
doc: 'https://pub.dev/documentation/flutter_riverpod/latest/flutter_riverpod/FutureProvider-class.html'
---

## 사용 예시

```dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;

final postsProvider = FutureProvider<List<String>>((ref) async {
  final res = await http.get(Uri.parse('https://jsonplaceholder.typicode.com/posts'));
  if (res.statusCode != 200) throw Exception('조회 실패: ${res.statusCode}');
  final list = jsonDecode(res.body) as List<dynamic>;
  return [for (final item in list) (item as Map<String, dynamic>)['title'] as String];
});

class PostsPage extends ConsumerWidget {
  const PostsPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final posts = ref.watch(postsProvider);
    return switch (posts) {
      AsyncData(:final value) => ListView(
          children: [for (final title in value) ListTile(title: Text(title))],
        ),
      AsyncError(:final error) => Center(child: Text('오류: $error')),
      _ => const Center(child: CircularProgressIndicator()),
    };
  }
}
```

## 주의할 점

- Riverpod 3는 실패한 Provider를 자동으로 재시도합니다. 필요 없으면 `ProviderScope`나 Provider의 `retry` 인자로 끕니다.
- 값을 바꾸는 기능(추가, 수정, 삭제)이 필요하면 `AsyncNotifierProvider`를 씁니다.
- 다른 비동기 Provider의 결과가 필요하면 Provider 본문에서 `await ref.watch(otherProvider.future)`로 기다립니다.
