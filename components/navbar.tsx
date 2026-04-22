"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/theme-toggle";

const nav = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
  { href: "/contact", label: "contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-mono text-sm tracking-tight link-underline"
          data-active={pathname === "/"}
        >
          {site.name.toLowerCase()}
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="flex items-center gap-3 sm:gap-5 font-mono text-xs sm:text-sm">
            {nav.slice(1).map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline py-1"
                    data-active={active}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
