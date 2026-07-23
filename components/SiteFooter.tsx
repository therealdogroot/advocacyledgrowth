import Link from "next/link";
import { KINDLING_URL } from "@/lib/site";
import styles from "./SiteFooter.module.css";

type SiteFooterProps = {
  machineReadableHref: string;
  maxWidth?: 960 | 1100;
};

export function SiteFooter({
  machineReadableHref,
  maxWidth = 1100,
}: SiteFooterProps) {
  return (
    <footer className={styles.footer}>
      <div
        className={styles.inner}
        style={{ maxWidth: maxWidth === 960 ? 960 : 1100 }}
      >
        <p className={styles.copy}>
          © 2026 advocacyledgrowth.com ·{" "}
          <em>The Advocacy Operating System</em>, Second Edition
        </p>
        <p className={styles.links}>
          An educational project by the team at{" "}
          <a href={KINDLING_URL} className={styles.mutedLink}>
            Kindling
          </a>
          {" · "}
          <Link href="/download" className={styles.mutedLink}>
            Download the PDF
          </Link>
          {" · "}
          <a href={machineReadableHref} className={styles.mutedLink}>
            Machine-readable version
          </a>
        </p>
      </div>
    </footer>
  );
}
