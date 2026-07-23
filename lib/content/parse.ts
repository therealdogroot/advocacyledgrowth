export type TitleBlock = {
  eyebrow: string;
  title: string;
  dek: string;
  bodyMarkdown: string;
  rawMarkdown: string;
};

export function filenameToSlug(filename: string): string | null {
  if (!filename.endsWith(".md")) return null;
  const base = filename.replace(/\.md$/, "");
  if (base === "00-front-matter") return null;
  const withoutOrder = base.replace(/^\d{2}-/, "");
  const slug = withoutOrder.replace(/^ch\d+(half)?-/, "");
  return slug;
}

export function parseOrderPrefix(filename: string): number {
  const m = filename.match(/^(\d{2})-/);
  return m ? Number(m[1]) : Number.MAX_SAFE_INTEGER;
}

export function parseTitleBlock(rawMarkdown: string): TitleBlock {
  const lines = rawMarkdown.replace(/\r\n/g, "\n").split("\n");
  let i = 0;
  while (i < lines.length && lines[i].trim() === "") i += 1;

  const h1Line = lines[i] ?? "";
  if (!h1Line.startsWith("# ")) {
    throw new Error("Chapter markdown missing H1");
  }
  const h1 = h1Line.slice(2).trim();
  i += 1;

  let eyebrow: string;
  let title: string;
  const colonIdx = h1.indexOf(": ");
  if (h1.startsWith("Chapter ") && colonIdx !== -1) {
    eyebrow = h1.slice(0, colonIdx);
    title = h1.slice(colonIdx + 2);
  } else {
    eyebrow = h1;
    title = h1;
  }

  while (i < lines.length && lines[i].trim() === "") i += 1;

  let dek = "";
  if (lines[i]?.startsWith("## ")) {
    dek = lines[i].slice(3).trim();
    i += 1;
  }

  while (i < lines.length && lines[i].trim() === "") i += 1;
  const bodyMarkdown = lines.slice(i).join("\n");

  return { eyebrow, title, dek, bodyMarkdown, rawMarkdown };
}

/** Truncate at a sentence boundary for meta descriptions. */
export function descriptionFromParagraph(
  bodyMarkdown: string,
  fallback: string,
  maxLen = 158,
): string {
  const lines = bodyMarkdown.replace(/\r\n/g, "\n").split("\n");
  let paragraph = "";
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (paragraph) break;
      continue;
    }
    if (
      trimmed.startsWith("#") ||
      trimmed.startsWith(">") ||
      trimmed.startsWith("- ") ||
      trimmed.startsWith("* ") ||
      trimmed.startsWith("```")
    ) {
      if (paragraph) break;
      continue;
    }
    paragraph = (paragraph ? `${paragraph} ${trimmed}` : trimmed).replace(
      /\s+/g,
      " ",
    );
  }

  // Skip italic-only edition notes / asides as meta descriptions.
  const isItalicAside =
    (/^\*.*\*$/.test(paragraph) || /^_.*_$/.test(paragraph)) &&
    !paragraph.includes("\n");
  if (!paragraph || isItalicAside) return fallback;
  if (paragraph.length <= maxLen) return paragraph;

  const slice = paragraph.slice(0, maxLen + 1);
  const sentenceEnd = Math.max(
    slice.lastIndexOf(". "),
    slice.lastIndexOf("? "),
    slice.lastIndexOf("! "),
  );
  if (sentenceEnd > 40) {
    return slice.slice(0, sentenceEnd + 1).trim();
  }
  const space = slice.lastIndexOf(" ");
  return `${(space > 40 ? slice.slice(0, space) : slice.slice(0, maxLen)).trim()}…`;
}

export function estimateReadMinutes(markdown: string): number {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`\[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export type ContentsEntry = {
  heading: string;
  subtitle: string;
};

/** Parse ## Contents from front-matter: **Heading** then description line. */
export function parseContentsSubtitles(frontMatterMarkdown: string): ContentsEntry[] {
  const text = frontMatterMarkdown.replace(/\r\n/g, "\n");
  const start = text.indexOf("## Contents");
  if (start === -1) return [];
  const section = text.slice(start);
  const entries: ContentsEntry[] = [];
  const re = /\*\*(.+?)\*\*\n([^\n*]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(section)) !== null) {
    entries.push({
      heading: m[1].trim(),
      subtitle: m[2].trim(),
    });
  }
  return entries;
}

export function tocNumFromEyebrow(eyebrow: string): string {
  if (eyebrow === "Foreword") return "FW";
  if (eyebrow === "Afterword") return "AW";
  if (eyebrow === "Notes") return "N";
  const half = eyebrow.match(/^Chapter\s+(\d+)½$/);
  if (half) return `${half[1]}½`;
  const n = eyebrow.match(/^Chapter\s+(\d+)$/);
  if (n) return n[1];
  return eyebrow;
}
