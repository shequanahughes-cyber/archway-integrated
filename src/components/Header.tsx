"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ArchLogo from "@/components/ArchLogo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-primary"
        >
          <ArchLogo className="h-7 w-[26px] overflow-visible sm:h-8 sm:w-[30px]" />
          Archway Integrated
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "text-primary font-semibold"
                    : "text-foreground/80 transition-colors duration-200 hover:text-accent"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/contact"
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-dark"
        >
          Partner With Us
        </Link>
      </div>
    </header>
  );
}
