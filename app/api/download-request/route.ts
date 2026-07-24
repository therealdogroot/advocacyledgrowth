import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof (body as { email: unknown }).email === "string"
      ? (body as { email: string }).email.trim()
      : "";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    await saveLead(email);
  } catch (err) {
    console.error("saveLead failed:", err);
    return NextResponse.json(
      { error: "Could not send the PDF. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
