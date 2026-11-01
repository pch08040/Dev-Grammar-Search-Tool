import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import RefApp from '@/components/RefApp';
import { getEntries, getEntry } from '@/lib/content';

// 항목마다 /flutter/listview-builder 같은 정적 페이지를 미리 생성
export const dynamicParams = false;

export function generateStaticParams() {
  return getEntries().map((e) => ({ stack: e.stack, slug: e.slug }));
}

type Props = { params: Promise<{ stack: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stack, slug } = await params;
  const entry = getEntry(stack, slug);
  return entry ? { title: `${entry.name} · DevRef`, description: entry.summary } : {};
}

export default async function EntryPage({ params }: Props) {
  const { stack, slug } = await params;
  const entry = getEntry(stack, slug);
  if (!entry) notFound();
  return <RefApp initialEntry={entry} />;
}
