import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-10 font-mono text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
          <span>
            © {year} {site.name}. Built in public.
          </span>
        </p>
        <div className="flex gap-5">
          {site.socials.github && (
            <Link
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              github
            </Link>
          )}
          <Link href={`mailto:${site.email}`} className="link-underline">
            email
          </Link>
          <Link href="/contact" className="link-underline">
            contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
