import { getEntries } from '@/lib/content';

// 빌드 시 out/entries.json 정적 파일로 생성됨. 클라이언트 검색이 이 파일을 한 번 불러옴
export const dynamic = 'force-static';

export function GET() {
  return Response.json(getEntries());
}
