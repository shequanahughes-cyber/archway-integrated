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
    <header className="sticky top-0 z-50 bg-[#16324F] shadow-[0_4px_16px_rgba(0,0,0,0.35)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <ArchLogo className="h-9 w-[27px] shrink-0 overflow-visible text-accent sm:h-11 sm:w-[33px]" />
          <span className="flex flex-col leading-none">
            <span className="whitespace-nowrap text-sm sm:text-lg">
              <span className="font-bold text-white">Archway</span>{" "}
              <span className="font-normal text-white/50">Integrated</span>
            </span>
            <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-accent sm:inline">
              Integrated Services
            </span>
          </span>
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
                    ? "font-semibold text-white"
                    : "text-white/75 transition-colors duration-200 hover:text-accent"
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
            className="whitespace-nowrap rounded-xl border border-white/70 px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors duration-200 hover:bg-white/10 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Login
          </Link>
          <Link
            href="/contact"
            className="whitespace-nowrap rounded-xl bg-accent px-2.5 py-1.5 text-[11px] font-semibold text-[#16324F] transition-colors duration-200 hover:bg-accent/90 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </header>
  );
}
