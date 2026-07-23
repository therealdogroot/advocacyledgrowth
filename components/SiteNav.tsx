import Link from "next/link";
import styles from "./SiteNav.module.css";

type SiteNavProps = {
  variant?: "home" | "book";
  pdfHref?: string;
};

export function SiteNav({
  variant = "book",
  pdfHref = "/download",
}: SiteNavProps) {
  return (
    <nav className={styles.nav}>
      <div
        className={variant === "home" ? styles.innerHome : styles.innerBook}
      >
        <Link href={variant === "home" ? "#top" : "/"} className={styles.logo}>
          Advocacy-Led Growth
        </Link>
        {variant === "home" ? (
          <div className={`hide-mobile ${styles.links}`}>
            <a href="#definition" className={styles.link}>
              The idea
            </a>
            <a href="#contents" className={styles.link}>
              Chapters
            </a>
            <a href="#author" className={styles.link}>
              Author
            </a>
            <a href="#faq" className={styles.link}>
              FAQ
            </a>
          </div>
        ) : null}
        <Link href={pdfHref} className="btn-outline">
          Get the PDF
        </Link>
      </div>
    </nav>
  );
}
