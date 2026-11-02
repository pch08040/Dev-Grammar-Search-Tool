---
name: select · selectAsync
cat: 상태 관리
kind: 메서드
order: 120
aliases:
  - 부분 구독
  - 성능 최적화
  - 불필요한 리빌드
  - 특정 필드만 watch
  - rebuild 줄이기
summary: 상태 객체의 일부 값만 구독합니다. 고른 값이 바뀔 때만 다시 그려서 불필요한 리빌드를 줄입니다.
related:
  - ref-watch-read-listen
  - notifier-provider
  - future-provider
doc: 'https://riverpod.dev/docs/concepts2/refs'
---

## 사용 예시

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class Profile {
  const Profile({required this.name, required this.bio});
  final String name;
  final String bio;
}

class ProfileNotifier extends Notifier<Profile> {
  @override
  Profile build() => const Profile(name: 'Kim', bio: '');

  void setBio(String bio) => state = Profile(name: state.name, bio: bio);
}

final profileProvider = NotifierProvider<ProfileNotifier, Profile>(ProfileNotifier.new);

class NameText extends ConsumerWidget {
  const NameText({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // bio가 바뀌어도 name이 같으면 다시 그리지 않음
    final name = ref.watch(profileProvider.select((p) => p.name));
    return Text(name);
  }
}

// 비동기 Provider에서는 selectAsync로 일부만 기다림
final remoteProfileProvider = FutureProvider<Profile>(
  (ref) async => const Profile(name: 'Lee', bio: ''),
);

final remoteNameProvider = FutureProvider<String>((ref) {
  return ref.watch(remoteProfileProvider.selectAsync((p) => p.name));
});
```

## 주의할 점

- `select`가 반환하는 값은 `==`로 비교합니다. 매번 새 `List`나 객체를 만들어 반환하면 효과가 없습니다.
