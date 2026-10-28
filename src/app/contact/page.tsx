import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { contactInfo, phoneHref } from "@/lib/site";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Archway Integrated",
  description:
    "Contact Archway Integrated's St. Louis Regional Hub - location, phone, email, and operating hours.",
};

function Pending({ label }: { label: string }) {
  return <span className="text-foreground/40">{label} - pending from client</span>;
}

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact Us" title="We're here to help.">
        Visit our Regional Hub, give us a call, or send a message and a
        member of our team will follow up.
      </PageHeader>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-primary">
                Location & Contact
              </h2>
              <ul className="mt-5 space-y-4 text-sm text-foreground/70">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>
                    {contactInfo.location}
                    <br />
                    {contactInfo.address ?? <Pending label="Street address" />}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {contactInfo.phone ? (
                    <a href={phoneHref(contactInfo.phone)} className="hover:text-primary">
                      {contactInfo.phone}
                    </a>
                  ) : (
                    <Pending label="Phone number" />
                  )}
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {contactInfo.email ? (
                    <a href={`mailto:${contactInfo.email}`} className="hover:text-primary">
                      {contactInfo.email}
                    </a>
                  ) : (
                    <Pending label="Email address" />
                  )}
                </li>
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-primary">
                <Clock className="h-5 w-5 text-accent" />
                Operating Hours
              </h2>
              {contactInfo.hours ? (
                <dl className="mt-5 space-y-2 text-sm">
                  {contactInfo.hours.map((row) => (
                    <div key={row.days} className="flex justify-between gap-4 border-b border-border pb-2">
                      <dt className="font-medium text-foreground/80">{row.days}</dt>
                      <dd className="text-foreground/70">{row.time}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-5 text-sm">
                  <Pending label="Operating hours" />
                </p>
              )}
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
