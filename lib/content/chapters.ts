import fs from "fs";
import path from "path";
import { CHAPTERS_DIR, FRONT_MATTER_PATH, REFERENCE_PATH } from "./paths";
import {
  descriptionFromParagraph,
  estimateReadMinutes,
  filenameToSlug,
  parseContentsSubtitles,
  parseOrderPrefix,
  parseTitleBlock,
  tocNumFromEyebrow,
  type TitleBlock,
} from "./parse";
import { markdownToHtml } from "./markdown";

export type Chapter = {
  order: number;
  filename: string;
  slug: string;
  filepath: string;
  eyebrow: string;
  title: string;
  dek: string;
  subtitle: string;
  tocNum: string;
  bodyMarkdown: string;
  rawMarkdown: string;
  description: string;
  readMinutes: number;
  href: string;
  mdHref: string;
};

function loadFrontMatterSubtitles(): string[] {
  const raw = fs.readFileSync(FRONT_MATTER_PATH, "utf8");
  return parseContentsSubtitles(raw).map((e) => e.subtitle);
}

let cachedChapters: Chapter[] | null = null;

export function getChapters(): Chapter[] {
  if (cachedChapters) return cachedChapters;

  const subtitles = loadFrontMatterSubtitles();
  const files = fs
    .readdirSync(CHAPTERS_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort((a, b) => parseOrderPrefix(a) - parseOrderPrefix(b));

  const chapters: Chapter[] = [];
  let subtitleIndex = 0;

  for (const filename of files) {
    const slug = filenameToSlug(filename);
    if (!slug) continue;

    const filepath = path.join(CHAPTERS_DIR, filename);
    const rawMarkdown = fs.readFileSync(filepath, "utf8");
    const block: TitleBlock = parseTitleBlock(rawMarkdown);
    const subtitle = subtitles[subtitleIndex] ?? block.dek;
    subtitleIndex += 1;

    const description = descriptionFromParagraph(block.bodyMarkdown, subtitle);

    chapters.push({
      order: parseOrderPrefix(filename),
      filename,
      slug,
      filepath,
      eyebrow: block.eyebrow,
      title: block.title,
      dek: block.dek,
      subtitle,
      tocNum: tocNumFromEyebrow(block.eyebrow),
      bodyMarkdown: block.bodyMarkdown,
      rawMarkdown,
      description,
      readMinutes: estimateReadMinutes(block.bodyMarkdown),
      href: `/book/${slug}`,
      mdHref: `/book/${slug}.md`,
    });
  }

  cachedChapters = chapters;
  return chapters;
}

export function getChapter(slug: string): Chapter | undefined {
  return getChapters().find((c) => c.slug === slug);
}

export function getAdjacent(slug: string): {
  prev: Chapter | null;
  next: Chapter | null;
} {
  const chapters = getChapters();
  const idx = chapters.findIndex((c) => c.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? chapters[idx - 1] : null,
    next: idx < chapters.length - 1 ? chapters[idx + 1] : null,
  };
}

export function getChapterSlugs(): string[] {
  return getChapters().map((c) => c.slug);
}

export async function getChapterHtml(slug: string): Promise<string> {
  const chapter = getChapter(slug);
  if (!chapter) throw new Error(`Unknown chapter: ${slug}`);
  return markdownToHtml(chapter.bodyMarkdown);
}

export function getRawChapterMarkdown(slug: string): string | null {
  const chapter = getChapter(slug);
  if (!chapter) return null;
  return fs.readFileSync(chapter.filepath, "utf8");
}

export function getReferenceMarkdown(): string {
  return fs.readFileSync(REFERENCE_PATH, "utf8");
}

export async function getReferenceHtml(): Promise<string> {
  return markdownToHtml(getReferenceMarkdown());
}

export type ReferenceDoc = {
  title: string;
  dek: string;
  description: string;
  bodyHtml: string;
  rawMarkdown: string;
};

export async function getReferenceDoc(): Promise<ReferenceDoc> {
  const rawMarkdown = getReferenceMarkdown();
  const block = parseTitleBlock(rawMarkdown);
  // Reference uses H1 then metadata; use summary line as dek when present.
  const summaryMatch = rawMarkdown.match(/\*\*Summary:\*\*\s*(.+)/);
  const dek =
    summaryMatch?.[1]?.trim() ??
    "Complete structured reference for Advocacy-Led Growth.";
  const description = descriptionFromParagraph(
    block.bodyMarkdown,
    dek.slice(0, 158),
  );
  // Render full document including H1 as body for /reference — but page chrome
  // owns the title. Strip the first H1 and keep the rest verbatim.
  const withoutH1 = rawMarkdown.replace(/^#\s+.+\n+/, "");
  const bodyHtml = await markdownToHtml(withoutH1);
  return {
    title: block.title,
    dek,
    description,
    bodyHtml,
    rawMarkdown,
  };
}
