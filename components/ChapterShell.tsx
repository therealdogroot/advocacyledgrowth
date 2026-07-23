import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ReadingProgress } from "@/components/ReadingProgress";
import { PdfForm } from "@/components/PdfForm";
import type { Chapter } from "@/lib/content/chapters";
import { AUTHOR_NAME, BOOK_TITLE } from "@/lib/site";
import styles from "./ChapterShell.module.css";

function sidebarLabel(ch: Chapter): string {
  if (ch.tocNum === "FW" || ch.tocNum === "AW" || ch.tocNum === "N") {
    return ch.title;
  }
  return `${ch.tocNum} · ${ch.title}`;
}

type ChapterShellProps = {
  chapters: Chapter[];
  currentSlug: string | null;
  eyebrow: string;
  title: string;
  dek: string;
  readMinutes?: number;
  breadcrumbLabel: string;
  machineReadableHref: string;
  showProgress?: boolean;
  showByline?: boolean;
  prev?: { href: string; label: string } | null;
  next?: { href: string; label: string } | null;
  children: React.ReactNode;
};

export function ChapterShell({
  chapters,
  currentSlug,
  eyebrow,
  title,
  dek,
  readMinutes,
  breadcrumbLabel,
  machineReadableHref,
  showProgress = true,
  showByline = true,
  prev = null,
  next = null,
  children,
}: ChapterShellProps) {
  return (
    <div className="page-shell">
      {showProgress ? <ReadingProgress /> : null}
      <SiteNav variant="book" pdfHref="/download" />
      <div className={styles.layout}>
        <aside className={`toc-sidebar ${styles.sidebar}`}>
          <p className="section-label">Contents</p>
          <div className={styles.tocList}>
            {chapters.map((ch) => {
              const current = ch.slug === currentSlug;
              const label = sidebarLabel(ch);
              if (current) {
                return (
                  <span key={ch.slug} className={styles.tocCurrent}>
                    {label}
                  </span>
                );
              }
              return (
                <Link key={ch.slug} href={ch.href} className={styles.tocLink}>
                  {label}
                </Link>
              );
            })}
          </div>
        </aside>

        <article className={styles.article}>
          <p className={styles.breadcrumbs}>
            <Link href="/" className={styles.crumb}>
              Home
            </Link>{" "}
            <span className={styles.sep}>/</span>{" "}
            <Link href="/#contents" className={styles.crumb}>
              Chapters
            </Link>{" "}
            <span className={styles.sep}>/</span>{" "}
            <span className={styles.crumbCurrent}>{breadcrumbLabel}</span>
          </p>
          <p className="section-label">{eyebrow}</p>
          <h1 className={styles.h1}>{title}</h1>
          {dek ? <p className={styles.dek}>{dek}</p> : null}
          {showByline ? (
            <p className={styles.byline}>
              By <strong>{AUTHOR_NAME}</strong>
              {readMinutes != null ? ` · ${readMinutes} min read` : null} · From{" "}
              <em>{BOOK_TITLE}</em>, Second Edition
            </p>
          ) : null}

          <div className="prose">{children}</div>

          {prev || next ? (
            <div className={styles.prevNext}>
              {prev ? (
                <Link href={prev.href} className={styles.prev}>
                  <p className={styles.pnLabel}>← Previous</p>
                  <p className={styles.pnTitle}>{prev.label}</p>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={next.href} className={styles.next}>
                  <p className={styles.pnLabel}>Next →</p>
                  <p className={styles.pnTitle}>{next.label}</p>
                </Link>
              ) : null}
            </div>
          ) : null}

          <div className={styles.pdfWrap}>
            <PdfForm
              headline="Read the whole book offline"
              subcopy="Enter your email and we'll send the complete book as a PDF — one email, no newsletter."
              className={styles.pdfInner}
            />
          </div>
        </article>
      </div>
      <SiteFooter machineReadableHref={machineReadableHref} maxWidth={1100} />
    </div>
  );
}
