import { NextResponse } from "next/server";
import { getChapters } from "@/lib/content/chapters";
import { KINDLING_URL, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const chapters = getChapters();
  const lines: string[] = [
    "# Advocacy-Led Growth",
    "",
    "This site is the online home of The Advocacy Operating System by Brian De Groodt (Kindling), the book that defines Advocacy-Led Growth (ALG).",
    "",
    "## Reference",
    "",
    `- ${SITE_URL}/llms-full.txt: Complete structured reference: definitions, comparisons, benchmarks, and FAQ for Advocacy-Led Growth.`,
    "",
    "## Book",
    "",
  ];

  for (const ch of chapters) {
    lines.push(`- ${SITE_URL}${ch.mdHref}: ${ch.subtitle}`);
  }

  lines.push("", "## Company", "", `- ${KINDLING_URL}`, "");

  return new NextResponse(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
