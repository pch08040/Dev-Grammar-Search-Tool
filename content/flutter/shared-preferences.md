---
name: SharedPreferences
cat: 네트워크 · 저장소
kind: 패키지
order: 20
aliases:
  - 로컬 저장
  - 설정 저장
  - 자동 로그인
  - 키값 저장
  - SharedPreferencesAsync
  - SharedPreferencesWithCache
  - shared_preferences
summary: 간단한 값(설정, 플래그, 최근 검색어)을 기기에 키·값으로 저장합니다. 새 코드에서는 `SharedPreferencesAsync` 또는 `SharedPreferencesWithCache`를 씁니다.
related:
  - async-await
  - json
  - main
doc: 'https://pub.dev/packages/shared_preferences'
---

## 구성 요소

| 이름 | 타입 | 설명 |
|---|---|---|
| SharedPreferencesAsync() | 클래스 | 읽기·쓰기 모두 `await`. 항상 저장소의 최신 값을 읽음 |
| SharedPreferencesWithCache.create() | 클래스 | 시작할 때 한 번 불러오고, 읽기는 동기(`get...`)로 빠르게 |
| setString / setInt / setBool / setStringList | 메서드 | 값 저장 |
| getString / getInt / getBool / getStringList | 메서드 | 값 읽기 (없으면 `null`) |
| remove(key) | 메서드 | 값 삭제 |

## 사용 예시

```dart
// pubspec.yaml: shared_preferences: ^2.5.6
import 'package:shared_preferences/shared_preferences.dart';

// 1) 매번 await로 읽고 쓰기
final prefs = SharedPreferencesAsync();

Future<void> saveSettings() async {
  await prefs.setBool('darkMode', true);
  await prefs.setStringList('recentKeywords', ['flutter', 'spring']);
}

Future<bool> loadDarkMode() async {
  return await prefs.getBool('darkMode') ?? false; // 없으면 기본값
}

// 2) 앱 시작 시 한 번 불러오고 동기로 읽기
late final SharedPreferencesWithCache cache;

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  cache = await SharedPreferencesWithCache.create(
    cacheOptions: const SharedPreferencesWithCacheOptions(
      allowList: {'darkMode', 'onboardingDone'}, // 쓸 키를 미리 지정
    ),
  );
  runApp(MyApp(showOnboarding: !(cache.getBool('onboardingDone') ?? false)));
}
```

## 주의할 점

- 예전 API인 `SharedPreferences.getInstance()`는 앞으로 deprecated될 예정이라, 새 코드에서는 `SharedPreferencesAsync`나 `SharedPreferencesWithCache`를 씁니다.
- 토큰이나 비밀번호처럼 민감한 값은 암호화되지 않으므로 저장하지 않습니다. 이런 값은 `flutter_secure_storage` 같은 보안 저장소를 씁니다.
- `SharedPreferencesWithCache`에 `allowList`를 지정하면 목록에 없는 키는 쓸 수 없습니다.
