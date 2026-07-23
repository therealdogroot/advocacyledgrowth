import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PdfForm } from "@/components/PdfForm";
import { buildPageMetadata } from "@/lib/seo";
import styles from "./download.module.css";

export const metadata = buildPageMetadata({
  title: "Download the PDF — The Advocacy Operating System",
  description:
    "Enter your email to download The Advocacy Operating System (Second Edition) as a PDF. One email, no newsletter.",
  path: "/download",
});

export default function DownloadPage() {
  return (
    <div className="page-shell">
      <SiteNav variant="book" pdfHref="/download" />
      <main className={styles.main}>
        <div className={styles.inner}>
          <p className="section-label">PDF download</p>
          <PdfForm headline="Prefer to read it offline?" />
        </div>
      </main>
      <SiteFooter machineReadableHref="/llms.txt" maxWidth={960} />
    </div>
  );
}
