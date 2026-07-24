const LOOPS_TRANSACTIONAL_URL = "https://app.loops.so/api/v1/transactional";
const LOOPS_TRANSACTIONAL_ID = "cmry6krs302dt0jvnf4edvv49";

/**
 * Send the PDF transactional email via Loops and add the contact to the audience.
 */
export async function saveLead(email: string): Promise<void> {
  const apiKey = process.env.LOOPS_API_KEY;
  if (!apiKey) {
    throw new Error("LOOPS_API_KEY is not configured");
  }

  const response = await fetch(LOOPS_TRANSACTIONAL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transactionalId: LOOPS_TRANSACTIONAL_ID,
      email,
      addToAudience: true,
    }),
  });

  if (!response.ok) {
    let detail = `Loops responded with ${response.status}`;
    try {
      const data = (await response.json()) as { message?: string };
      if (data.message) detail = data.message;
    } catch {
      /* ignore parse errors */
    }
    throw new Error(detail);
  }
}
