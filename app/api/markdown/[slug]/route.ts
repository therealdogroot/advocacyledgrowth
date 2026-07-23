import { NextResponse } from "next/server";
import {
  getChapterSlugs,
  getRawChapterMarkdown,
} from "@/lib/content/chapters";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getChapterSlugs().map((slug) => ({ slug }));
}

type RouteProps = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const markdown = getRawChapterMarkdown(slug);
  if (markdown == null) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${SITE_URL}/book/${slug}>; rel="canonical"`,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
