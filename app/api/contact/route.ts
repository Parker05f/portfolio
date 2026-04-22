import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { site } from "@/lib/site";

// Very small in-memory rate limit. Good enough for a portfolio contact form;
// fine with losing state on cold start.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "rate-limited" },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad-json" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot was tripped → silently succeed so the bot doesn't know
    const flat = parsed.error.flatten();
    if (flat.fieldErrors.website) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { ok: false, error: "validation", fields: flat.fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey) {
    // Stubbed mode: log and tell the client the form is correctly wired but
    // email delivery is not yet configured. Server-side log keeps the content
    // visible while you're setting things up.
    console.log("[contact] stubbed — no RESEND_API_KEY", { name, email, message });
    return NextResponse.json(
      {
        ok: false,
        error: "email-not-configured",
        message:
          "Form works — but email delivery isn't hooked up yet. Add RESEND_API_KEY to env vars.",
      },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio contact — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json(
        { ok: false, error: "send-failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected", err);
    return NextResponse.json(
      { ok: false, error: "server-error" },
      { status: 500 },
    );
  }
}
