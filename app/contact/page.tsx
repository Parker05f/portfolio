import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact/contact-form";
import { PageTransition } from "@/components/motion/page-transition";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Say hi. I read everything.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <section className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
        <header className="mb-10">
          <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            contact
          </p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl leading-none">
            Say hi.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground text-pretty">
            The form sends email. I read everything and reply to the ones I
            can. If you&apos;d rather skip the form, email{" "}
            <Link
              href={`mailto:${site.email}`}
              className="text-foreground underline decoration-signal decoration-2 underline-offset-4"
            >
              {site.email}
            </Link>
            .
          </p>
        </header>

        <ContactForm />
      </section>
    </PageTransition>
  );
}
