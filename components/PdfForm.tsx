"use client";

import { FormEvent, useState } from "react";
import styles from "./PdfForm.module.css";

type PdfFormProps = {
  headline: string;
  subcopy?: string;
  className?: string;
};

export function PdfForm({
  headline,
  subcopy = "Enter your email and we'll send the complete book as a PDF — one email, no newsletter.",
  className,
}: PdfFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/download-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setPending(false);
        return;
      }
      try {
        localStorage.setItem("alg-pdf-email", email);
      } catch {
        /* ignore */
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className={`${styles.card} ${className ?? ""}`}>
      <h2 className={styles.headline}>{headline}</h2>
      <p className={styles.subcopy}>{subcopy}</p>
      {!submitted ? (
        <>
          <form onSubmit={onSubmit} className={styles.form}>
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              disabled={pending}
            />
            <button type="submit" className={styles.submit} disabled={pending}>
              Send me the PDF
            </button>
          </form>
          <p className={styles.privacy}>One email, no newsletter.</p>
          {error ? <p className={styles.error}>{error}</p> : null}
        </>
      ) : (
        <p className={styles.success}>
          Check your inbox — the PDF is on its way.
        </p>
      )}
    </div>
  );
}
