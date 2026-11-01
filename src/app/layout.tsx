import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevRef',
  description: 'Flutter · Dart, Spring · Java에서 자주 쓰는 위젯, 함수, 문법을 빠르게 검색하는 레퍼런스',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// 첫 화면이 그려지기 전에 저장된 테마를 적용해서 깜빡임을 막음
const themeInit = `try{var t=localStorage.getItem('devref.theme');if(t)document.documentElement.dataset.theme=JSON.parse(t)}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
