import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { divisions } from "@/lib/services";
import { formIds } from "@/lib/site";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Request an Appointment | Archway Integrated",
  description:
    "Request an appointment for drug and alcohol testing, fingerprinting, identity verification, notary, and other services at Archway's St. Louis Regional Hub.",
};

export default function AppointmentsPage() {
  const bookable = divisions
    .filter((division) => division.appointments)
    .map((division) => ({
      ...division,
      services: division.services.filter((s) => s.status === "available"),
    }))
    .filter((division) => division.services.length > 0);

  return (
    <>
      <PageHeader eyebrow="Appointments" title="Request an appointment.">
        Tell us which service you need and when you&apos;re available. Our
        team will confirm your appointment time.
      </PageHeader>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-primary">
                What you can book today
              </h2>
              <div className="mt-5 space-y-6">
                {bookable.map((division) => (
                  <div key={division.slug}>
                    <Link
                      href={`/services/${division.slug}`}
                      className="text-sm font-semibold uppercase tracking-wide text-accent hover:text-primary"
                    >
                      {division.title}
                    </Link>
                    <ul className="mt-3 space-y-2">
                      {division.services.map((service) => (
                        <li
                          key={service.name}
                          className="flex items-start gap-2.5 text-sm text-foreground/80"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          {service.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted p-6 text-sm leading-6 text-foreground/70">
              Booking for a group of employees?{" "}
              <Link
                href="/business-accounts"
                className="font-semibold text-primary hover:text-primary-dark"
              >
                Open a business account
              </Link>{" "}
              to schedule and track services for your whole team.
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-8 sm:p-10">
            <ContactForm
              formId={formIds.appointment}
              formName="Appointment Request Form (on the website)"
            />
          </div>
        </div>
      </section>
    </>
  );
}
