import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { PdfForm } from "@/components/PdfForm";
import { JsonLd } from "@/components/JsonLd";
import { getChapters } from "@/lib/content/chapters";
import { bookJsonLd, buildPageMetadata } from "@/lib/seo";
import styles from "./home.module.css";

export const metadata = buildPageMetadata({
  title: "Advocacy-Led Growth — The Advocacy Operating System, free to read",
  description:
    "Advocacy-Led Growth (ALG) is a B2B go-to-market motion where verified customers create public content on social platforms, turning word-of-mouth into a measurable pipeline channel. Read the full book, chapter by chapter, free.",
  path: "/",
});

export default function HomePage() {
  const chapters = getChapters();
  const firstChapter = chapters.find((c) => c.slug === "the-trust-shift");

  return (
    <div className="page-shell">
      <JsonLd data={bookJsonLd()} />
      <SiteNav variant="home" pdfHref="#download" />

      <header id="top" className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={`section-label fade-up`}>
            A free book on the next era of B2B growth
          </p>
          <h1 className={`${styles.heroH1} fade-up`}>
            Your customers are more credible than your marketing team.
          </h1>
          <p className={`${styles.heroLead} fade-up`}>
            Over 90% of B2B buyers trust peers when making purchase decisions.
            Only 29% trust salespeople. <em>The Advocacy Operating System</em>{" "}
            is a chapter-by-chapter framework for building on that gap — turning
            genuine customer voice into a measurable growth channel.
          </p>
          <div className={`${styles.ctaRow} fade-up`}>
            <Link
              href={firstChapter?.href ?? "/book/the-trust-shift"}
              className="btn-primary"
            >
              Start reading — Chapter 1
            </Link>
            <a href="#contents" className="btn-secondary">
              Browse the contents
            </a>
          </div>
          <p className={`${styles.meta} fade-up`}>
            Second Edition · July 2026 · Free to read, no signup required
          </p>
        </div>
      </header>

      <section id="definition" className={styles.section}>
        <div className={styles.narrow}>
          <p className="section-label">The definition</p>
          <h2 className={styles.h2}>What is Advocacy-Led Growth?</h2>
          <div className={styles.definition}>
            <p>
              <strong>Advocacy-Led Growth</strong> is a B2B go-to-market motion
              where <em>verified customers</em> create <em>public content</em>{" "}
              on social platforms, turning word-of-mouth into a{" "}
              <em>measurable, scalable pipeline channel</em>.
            </p>
          </div>
          <p className={styles.muted}>
            Every word in that definition is deliberate. Verified customers —
            not hired creators or affiliates. Public content — on the platforms
            where buyers actually form opinions, not gated portals. A measurable
            channel — with the infrastructure of a real growth motion, not a
            happy accident. <a href="#contents">Chapter 3</a> unpacks each term,
            and what ALG is not.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wide}>
          <div className={styles.narrow} style={{ margin: 0 }}>
            <p className="section-label">Why now</p>
            <h2 className={styles.h2Tight}>
              The trust shift is structural, not a trend
            </h2>
            <p className={styles.mutedTop}>
              Buyers are increasingly relying on other buyers — not vendors —
              for the information they need to make decisions. The research is
              consistent across every major study of B2B buying behavior.
            </p>
          </div>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <p className={styles.statNum}>90%+</p>
              <p className={styles.statTitle}>
                of B2B buyers trust peers in their industry
              </p>
              <p className={styles.statSource}>
                Forrester B2B Brand and Communications Survey, 2023
              </p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statNum}>29%</p>
              <p className={styles.statTitle}>
                trust salespeople from vendors — the bottom of the ranking
              </p>
              <p className={styles.statSource}>
                Forrester B2B Brand and Communications Survey, 2023
              </p>
            </div>
            <div className={styles.statCard}>
              <p className={styles.statNum}>23%</p>
              <p className={styles.statTitle}>
                spoke with a vendor-supplied reference; the rest asked their own
                network
              </p>
              <p className={styles.statSource}>
                TrustRadius B2B Buying Disconnect, 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contents" className={styles.section}>
        <div className={styles.narrow}>
          <p className="section-label">The book</p>
          <h2 className={styles.h2Tight}>The Advocacy Operating System</h2>
          <p className={styles.mutedTop}>
            Seventeen chapters, from the research behind the trust shift to the
            operational anatomy of running an ALG program. Every chapter is free
            to read, start to finish.
          </p>
          <div className={styles.chapterList}>
            {chapters.map((ch) => (
              <Link key={ch.slug} href={ch.href} className={styles.chapterLink}>
                <span className={styles.chapterNum}>{ch.tocNum}</span>
                <span className={styles.chapterBody}>
                  <span className={styles.chapterTitle}>{ch.title}</span>
                  <span className={styles.chapterDesc}>{ch.subtitle}</span>
                </span>
                <span className={styles.chapterMeta}>
                  {ch.readMinutes} min · Read →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="author" className={styles.section}>
        <div className={styles.authorRow}>
          <Image
            src="/images/author-headshot.webp"
            alt="Brian De Groodt"
            width={140}
            height={140}
            className={styles.headshot}
            priority
          />
          <div className={styles.authorCopy}>
            <p className="section-label">About the author</p>
            <h2 className={styles.h2Tight}>Brian De Groodt</h2>
            <p className={styles.faqA} style={{ marginBottom: "1rem" }}>
              Brian spent 25 years selling enterprise software at SAP, Medallia,
              Cornerstone, and ADP, closing north of $250 million in deals. The
              pattern he watched repeat for two decades — the buyer&apos;s
              unscheduled reference call that tipped every deal — is the
              observation this book is built on.
            </p>
            <p className={styles.faqA}>
              He writes from Boulder, Colorado. Where he cites research,
              it&apos;s real. Where he shares observations, they come from
              direct experience. Where he speculates, he&apos;ll tell you.
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className={styles.section}>
        <div className={styles.narrow}>
          <p className="section-label">Common questions</p>
          <h2 className={styles.h2} style={{ marginBottom: "2.5rem" }}>
            Frequently asked questions
          </h2>
          <div className={styles.faqList}>
            <div>
              <h3 className={styles.faqH3}>What is Advocacy-Led Growth?</h3>
              <p className={styles.faqA}>
                Advocacy-Led Growth (ALG) is a B2B go-to-market motion where
                verified customers create public content on social platforms,
                turning word-of-mouth into a measurable, scalable pipeline
                channel.
              </p>
            </div>
            <div>
              <h3 className={styles.faqH3}>
                How is ALG different from influencer marketing?
              </h3>
              <p className={styles.faqA}>
                Influencer marketing starts with people who have audiences and
                pays them to talk about a product. ALG starts with verified
                customers who have genuine experience and gives them a reason
                and a platform to share it publicly. The verification is what
                creates the credibility — without it, you&apos;re doing
                influencer marketing.
              </p>
            </div>
            <div>
              <h3 className={styles.faqH3}>
                Does ALG replace product-led or sales-led growth?
              </h3>
              <p className={styles.faqA}>
                No. ALG is a layer that makes both work better. Product-led
                funnels convert at higher rates when prospects have already seen
                customers vouching for the product, and sales cycles compress
                when the buyer&apos;s network is already warm.
              </p>
            </div>
            <div>
              <h3 className={styles.faqH3}>Is the book free?</h3>
              <p className={styles.faqA}>
                Yes. Every chapter is free to read here, no signup required. If
                you&apos;d like the whole book in one file, you can{" "}
                <a href="#download">get the PDF</a> by leaving your email.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="download" className={styles.sectionLast}>
        <div className={styles.narrow}>
          <PdfForm headline="Prefer to read it offline?" />
        </div>
      </section>

      <SiteFooter machineReadableHref="/llms.txt" maxWidth={960} />
    </div>
  );
}
