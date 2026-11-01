import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>404</h1>
      <p>찾는 항목이 없습니다.</p>
      <Link href="/">검색으로 돌아가기</Link>
    </main>
  );
}
