import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterShell } from "@/components/ChapterShell";
import { JsonLd } from "@/components/JsonLd";
import {
  getAdjacent,
  getChapter,
  getChapterHtml,
  getChapterSlugs,
  getChapters,
} from "@/lib/content/chapters";
import { buildPageMetadata, chapterJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getChapterSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) return {};
  const title =
    chapter.eyebrow === chapter.title
      ? `${chapter.title} — Advocacy-Led Growth`
      : `${chapter.eyebrow}: ${chapter.title} — Advocacy-Led Growth`;
  return buildPageMetadata({
    title,
    description: chapter.description,
    path: chapter.href,
  });
}

export default async function ChapterPage({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const chapters = getChapters();
  const { prev, next } = getAdjacent(slug);
  const html = await getChapterHtml(slug);

  const breadcrumbLabel =
    chapter.eyebrow === chapter.title ? chapter.title : chapter.eyebrow;

  const prevNav = prev
    ? {
        href: prev.href,
        label:
          prev.eyebrow === prev.title
            ? prev.title
            : `${prev.eyebrow}: ${prev.title}`,
      }
    : null;
  const nextNav = next
    ? {
        href: next.href,
        label:
          next.eyebrow === next.title
            ? next.title
            : `${next.eyebrow}: ${next.title}`,
      }
    : null;

  return (
    <>
      <JsonLd
        data={chapterJsonLd({
          headline: chapter.title,
          description: chapter.description,
          path: chapter.href,
          breadcrumbName:
            chapter.eyebrow === chapter.title
              ? chapter.title
              : `${chapter.eyebrow}: ${chapter.title}`,
        })}
      />
      <ChapterShell
        chapters={chapters}
        currentSlug={chapter.slug}
        eyebrow={chapter.eyebrow}
        title={chapter.title}
        dek={chapter.dek}
        readMinutes={chapter.readMinutes}
        breadcrumbLabel={breadcrumbLabel}
        machineReadableHref={chapter.mdHref}
        prev={prevNav}
        next={nextNav}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </ChapterShell>
    </>
  );
}
