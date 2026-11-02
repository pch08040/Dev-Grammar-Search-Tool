---
name: ref.invalidate · ref.refresh
cat: 상태 관리
kind: 메서드
order: 130
aliases:
  - 새로고침
  - 다시 불러오기
  - pull to refresh
  - 캐시 초기화
  - invalidateSelf
  - 상태 리셋
summary: '`ref.invalidate`는 Provider 상태를 버리고 다음에 읽을 때 다시 만들게 하고, `ref.refresh`는 즉시 다시 만들어 새 값을 반환합니다.'
related:
  - async-notifier
  - refresh-indicator
  - async-value
doc: 'https://pub.dev/documentation/flutter_riverpod/latest/flutter_riverpod/WidgetRef/invalidate.html'
---

## 사용 예시

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

final postsProvider = FutureProvider<List<String>>((ref) async {
  await Future<void>.delayed(const Duration(milliseconds: 500));
  return ['글 1', '글 2'];
});

class PostsView extends ConsumerWidget {
  const PostsView({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final posts = ref.watch(postsProvider);
    return RefreshIndicator(
      // refresh는 새 값을 돌려주므로 .future를 기다릴 수 있음
      onRefresh: () => ref.refresh(postsProvider.future),
      child: ListView(
        children: [
          for (final title in posts.value ?? const <String>[])
            ListTile(title: Text(title)),
          TextButton(
            // invalidate: 기다리지 않고 무효화만
            onPressed: () => ref.invalidate(postsProvider),
            child: const Text('다시 불러오기'),
          ),
        ],
      ),
    );
  }
}
```

## 주의할 점

- 새 값이 필요 없으면 `ref.invalidate`를 씁니다. `ref.refresh`는 반환값을 쓰도록 표시되어 있어, 반환값을 버리면 분석기 경고가 납니다.
- Notifier 안에서 자기 자신을 다시 불러오려면 `ref.invalidateSelf()`를 씁니다.
- family Provider는 `ref.invalidate(userProvider)`로 모든 인자를, `ref.invalidate(userProvider(1))`로 특정 인자만 무효화합니다.
