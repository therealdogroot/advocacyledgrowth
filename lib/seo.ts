import type { Metadata } from "next";
import {
  AUTHOR_NAME,
  AUTHOR_SAME_AS,
  BOOK_TITLE,
  DATE_MODIFIED,
  DATE_PUBLISHED,
  KINDLING_URL,
  PUBLISHER_NAME,
  PUBLISHER_SAME_AS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function bookJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        description:
          "The home of Advocacy-Led Growth (ALG) — a free book on turning verified customers into a measurable B2B pipeline channel.",
      },
      {
        "@type": "Book",
        name: BOOK_TITLE,
        author: {
          "@type": "Person",
          name: AUTHOR_NAME,
          sameAs: [...AUTHOR_SAME_AS],
        },
        publisher: {
          "@type": "Organization",
          name: PUBLISHER_NAME,
          url: KINDLING_URL,
          sameAs: [...PUBLISHER_SAME_AS],
        },
        bookEdition: "Second Edition",
        datePublished: DATE_PUBLISHED,
        dateModified: DATE_MODIFIED,
        inLanguage: "en",
        url: `${SITE_URL}/`,
        abstract:
          "A framework for turning your customers into your most credible growth channel.",
      },
      {
        "@type": "DefinedTerm",
        name: "Advocacy-Led Growth",
        alternateName: "ALG",
        description:
          "A B2B go-to-market motion where verified customers create public content on social platforms, turning word-of-mouth into a measurable, scalable pipeline channel.",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Advocacy-Led Growth?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Advocacy-Led Growth (ALG) is a B2B go-to-market motion where verified customers create public content on social platforms, turning word-of-mouth into a measurable, scalable pipeline channel.",
            },
          },
          {
            "@type": "Question",
            name: "How is ALG different from influencer marketing?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Influencer marketing starts with people who have audiences and pays them to talk about a product. ALG starts with verified customers who have genuine experience and gives them a reason and a platform to share it publicly. The verification is what creates the credibility.",
            },
          },
          {
            "@type": "Question",
            name: "Does ALG replace product-led or sales-led growth?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No. ALG is a layer that makes both work better: product-led funnels convert at higher rates when prospects have already seen customers vouching for the product, and sales cycles compress when the buyer's network is already warm.",
            },
          },
          {
            "@type": "Question",
            name: "Is the book free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Every chapter is free to read on this site, and the full book is available as a PDF.",
            },
          },
        ],
      },
    ],
  };
}

export function chapterJsonLd({
  headline,
  description,
  path,
  breadcrumbName,
}: {
  headline: string;
  description: string;
  path: string;
  breadcrumbName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Article", "Chapter"],
        headline,
        author: {
          "@type": "Person",
          name: AUTHOR_NAME,
          sameAs: [...AUTHOR_SAME_AS],
        },
        isPartOf: {
          "@type": "Book",
          name: BOOK_TITLE,
          bookEdition: "Second Edition",
          url: `${SITE_URL}/`,
          datePublished: DATE_PUBLISHED,
          dateModified: DATE_MODIFIED,
          publisher: {
            "@type": "Organization",
            name: PUBLISHER_NAME,
            sameAs: [...PUBLISHER_SAME_AS],
          },
        },
        datePublished: DATE_PUBLISHED,
        dateModified: DATE_MODIFIED,
        inLanguage: "en",
        description,
        url: absoluteUrl(path),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: SITE_NAME,
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Chapters",
            item: `${SITE_URL}/#contents`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: breadcrumbName,
          },
        ],
      },
    ],
  };
}
