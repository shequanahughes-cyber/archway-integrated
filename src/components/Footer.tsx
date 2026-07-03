import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-primary-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">Archway Integrated</p>
          <p className="mt-3 text-sm leading-6 text-white/70">
            One Partner. Multiple Solutions. Regional Impact.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/50">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>Downtown St. Louis Regional Hub</li>
            <li className="text-white/40">Phone — TBD</li>
            <li className="text-white/40">Email — TBD</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Archway Integrated. All rights reserved.
      </div>
    </footer>
  );
}
