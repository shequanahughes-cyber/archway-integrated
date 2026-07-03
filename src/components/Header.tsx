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
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 whitespace-nowrap text-xs font-semibold tracking-tight text-primary sm:text-lg"
        >
          <ArchLogo className="h-7 w-[26px] shrink-0 overflow-visible sm:h-8 sm:w-[30px]" />
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
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <Link
            href="/login"
            className="whitespace-nowrap rounded-xl border border-primary px-2.5 py-1.5 text-[11px] font-semibold text-primary transition-colors duration-200 hover:bg-primary/5 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Login
          </Link>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-xl bg-primary px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors duration-200 hover:bg-primary-dark sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </header>
  );
}
