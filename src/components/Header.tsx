"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/appointments", label: "Appointments" },
  { href: "/business-accounts", label: "Business Accounts" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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
        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
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
            href="/partners"
            className="whitespace-nowrap rounded-xl bg-accent px-2.5 py-1.5 text-[11px] font-semibold text-white transition-colors duration-200 hover:bg-accent/90 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Partner With Us
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="rounded-lg p-1.5 text-white hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-white/10 px-4 pb-4 pt-2 lg:hidden"
        >
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`block rounded-lg px-3 py-2.5 text-sm ${
                  active
                    ? "bg-white/10 font-semibold text-white"
                    : "font-medium text-white/80 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
