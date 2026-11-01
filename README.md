# DevRef

Flutter · Dart, Spring · Java에서 자주 쓰는 위젯, 함수, 문법을 빠르게 검색하는 레퍼런스예요.
Next.js 정적 내보내기(`output: 'export'`)로 빌드해서 Firebase Hosting에 올려요.

## 실행

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # out/ 폴더에 정적 파일 생성
npm run preview    # out/ 폴더를 로컬에서 확인
```

## 항목 추가

1. `content/_template.md`를 `content/flutter/` 또는 `content/spring/`에 복사해요.
2. 파일 이름이 URL이 돼요. `content/flutter/listview-builder.md` → `/flutter/listview-builder`
3. `npm run dev` 화면에서 바로 확인해요.

빌드할 때 형식을 검사해요. 필수 항목이 빠졌거나, 없는 분류를 썼거나, `related`에 없는 항목을 적으면 빌드가 실패하고 어느 파일이 문제인지 알려 줘요.
분류를 추가하려면 `src/lib/categories.ts`를 고쳐요.

## 구조

```
content/{flutter,spring}/*.md   항목 원본 (Git으로 관리)
src/lib/content.ts              .md 읽기, 형식 검사, 코드 강조
src/app/entries.json/route.ts   빌드 시 out/entries.json 생성 (검색용 데이터)
src/app/[stack]/[slug]/page.tsx 항목마다 정적 페이지 생성
src/components/RefApp.tsx       검색 화면
```

## Firebase 배포

```bash
firebase login
firebase use --add      # 처음 한 번, Firebase 프로젝트 선택
npm run deploy          # 빌드 후 Hosting 배포
```
