import { NextResponse } from "next/server";
import { getReferenceMarkdown } from "@/lib/content/chapters";

export const dynamic = "force-static";

export async function GET() {
  const body = getReferenceMarkdown();
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
