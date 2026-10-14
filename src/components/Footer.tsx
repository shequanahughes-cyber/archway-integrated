import Image from "next/image";
import Link from "next/link";
import { divisions } from "@/lib/services";
import { contactInfo } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/appointments", label: "Request an Appointment" },
  { href: "/business-accounts", label: "Business Accounts" },
  { href: "/partners", label: "Become a Partner" },
  { href: "/contact", label: "Contact Us" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-primary-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/logo-white.png"
            alt="Archway Medical & Integrated Services"
            width={1080}
            height={855}
            className="h-14 w-auto"
          />
          <p className="mt-3 text-sm leading-6 text-white/70">
            One Partner. Multiple Solutions. Regional Impact.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Services
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {divisions.map((division) => (
              <li key={division.slug}>
                <Link
                  href={`/services/${division.slug}`}
                  className="hover:text-white"
                >
                  {division.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>{contactInfo.location}</li>
            {contactInfo.address && <li>{contactInfo.address}</li>}
            <li className={contactInfo.phone ? undefined : "text-white/40"}>
              {contactInfo.phone ?? "Phone - TBD"}
            </li>
            <li className={contactInfo.email ? undefined : "text-white/40"}>
              {contactInfo.email ?? "Email - TBD"}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Archway Integrated. All rights reserved.
      </div>
    </footer>
  );
}
