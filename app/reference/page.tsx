import { ChapterShell } from "@/components/ChapterShell";
import { JsonLd } from "@/components/JsonLd";
import { getChapters, getReferenceDoc } from "@/lib/content/chapters";
import { buildPageMetadata, chapterJsonLd } from "@/lib/seo";

export async function generateMetadata() {
  const doc = await getReferenceDoc();
  return buildPageMetadata({
    title: `${doc.title} — Advocacy-Led Growth`,
    description: doc.description,
    path: "/reference",
  });
}

export default async function ReferencePage() {
  const chapters = getChapters();
  const doc = await getReferenceDoc();

  return (
    <>
      <JsonLd
        data={chapterJsonLd({
          headline: doc.title,
          description: doc.description,
          path: "/reference",
          breadcrumbName: "Reference",
        })}
      />
      <ChapterShell
        chapters={chapters}
        currentSlug={null}
        eyebrow="Reference"
        title={doc.title}
        dek={doc.dek}
        breadcrumbLabel="Reference"
        machineReadableHref="/llms-full.txt"
        showProgress
        showByline
        prev={null}
        next={null}
      >
        <div dangerouslySetInnerHTML={{ __html: doc.bodyHtml }} />
      </ChapterShell>
    </>
  );
}
