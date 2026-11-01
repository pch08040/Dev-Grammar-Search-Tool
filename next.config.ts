import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 빌드 결과를 out/ 폴더의 정적 파일로 내보냄 (Firebase Hosting용)
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
