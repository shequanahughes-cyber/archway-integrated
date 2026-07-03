import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Archway Integrated",
  description:
    "Partner with Archway Integrated's St. Louis Regional Hub. Reach our team or request a service.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Partner With Us
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            Let&apos;s talk about what your organization needs.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/70">
            Send us a message and a member of our Regional Hub team will
            follow up.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-primary">
                Direct Contact
              </h2>
              <ul className="mt-5 space-y-4 text-sm text-foreground/70">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>
                    Downtown St. Louis Regional Hub
                    <br />
                    <span className="text-foreground/40">
                      Street address — pending from client
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-foreground/40">
                    Phone number — pending from client
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-foreground/40">
                    Email address — pending from client
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-muted p-6 text-sm leading-6 text-foreground/70">
              Serving healthcare, government, transportation, and corporate
              organizations across the region.
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-8 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
