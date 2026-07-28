"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo-white.png"
            alt="Archway Medical & Integrated Services"
            width={1080}
            height={855}
            priority
            className="h-12 w-auto sm:h-14"
          />
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
                    : "text-white/75 transition-colors duration-200 hover:text-accent-light"
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
            className="whitespace-nowrap rounded-xl bg-accent px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors duration-200 hover:bg-accent/90 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </header>
  );
}
