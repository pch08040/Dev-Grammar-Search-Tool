import type { Stack } from './types';

export const STACKS: Stack[] = ['flutter', 'spring', 'infra'];

export const STACK_LABEL: Record<Stack, string> = {
  flutter: 'Flutter · Dart',
  spring: 'Spring · Java',
  infra: '터미널 · 인프라',
};

/** 목록 배지에 쓰는 짧은 이름 */
export const STACK_SHORT: Record<Stack, string> = {
  flutter: 'Flutter',
  spring: 'Spring',
  infra: 'Terminal',
};

/** 분류와 표시 순서. .md의 cat 값은 반드시 여기 있는 이름 중 하나여야 함 */
export const CATEGORIES: Record<Stack, string[]> = {
  flutter: [
    '기본 구조',
    '레이아웃',
    '텍스트 · 이미지',
    '입력 · 버튼',
    '목록',
    '화면 이동',
    '상태 관리',
    '비동기',
    '애니메이션',
    '테마 · 스타일',
    '네트워크 · 저장소',
    'Dart 문법',
  ],
  spring: [
    'Java 기초',
    '컬렉션 · 스트림',
    '날짜 · 시간',
    '앱 구조',
    '설정 · 프로퍼티',
    '웹 API',
    '데이터 (JPA)',
    '트랜잭션 · 예외',
    '보안',
    '테스트',
    '스케줄 · 비동기',
    'Lombok',
  ],
  infra: [
    '개념',
    '터미널 기초',
    '프로세스 · 시스템',
    '네트워크 · IP',
    '원격 서버 · SSH',
    '로그 · 모니터링',
    '서버 운영',
    'Docker',
  ],
};
