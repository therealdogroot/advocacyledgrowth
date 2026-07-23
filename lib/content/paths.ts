import path from "path";

export const CONTENT_ROOT = path.join(process.cwd(), "Content");
export const CHAPTERS_DIR = path.join(CONTENT_ROOT, "Chapters");
export const REFERENCE_PATH = path.join(
  CONTENT_ROOT,
  "Reference",
  "advocacy-led-growth-llm-reference.md",
);
export const FRONT_MATTER_PATH = path.join(CHAPTERS_DIR, "00-front-matter.md");
