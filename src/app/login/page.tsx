import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Login | Archway Integrated",
  description: "Client and staff portal access for Archway Integrated.",
};

export default function LoginPage() {
  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        Client & Staff Portal
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
        Portal login is coming soon.
      </h1>
      <p className="mt-4 text-base leading-7 text-foreground/70">
        We&apos;re building a dedicated portal for clients and staff. In the
        meantime, reach out to our team directly for account access or
        assistance.
      </p>
      <Link
        href="/contact"
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark"
      >
        <ArrowLeft className="h-4 w-4" />
        Contact us instead
      </Link>
    </section>
  );
}
