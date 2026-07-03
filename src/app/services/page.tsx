import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { serviceCategories } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services | Archway Integrated",
  description:
    "Identity & Compliance, Occupational Health, Medical Logistics, Workforce Solutions, and Transportation & Logistics — five integrated service categories from one regional partner.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Services
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            Five integrated service categories, one regional partner.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/70">
            Every service below is coordinated by the same Archway Integrated
            team, so nothing falls through the cracks between vendors.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-16">
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.slug}
                id={category.slug}
                className="scroll-mt-24 grid gap-8 rounded-xl bg-white p-8 shadow-soft sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold text-primary">
                    {category.title}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-foreground/70">
                    {category.summary}
                  </p>
                </div>
                <ul className="grid content-start gap-3 sm:grid-cols-2">
                  {category.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 rounded-xl bg-muted px-4 py-3 text-sm font-medium text-foreground/80"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border bg-primary">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center text-white">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Not sure which service fits your organization?
          </h2>
          <p className="max-w-xl text-base leading-7 text-white/80">
            Tell us what you&apos;re working on and we&apos;ll match you with
            the right service — or combination of services.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-semibold text-primary transition-colors hover:bg-white/90"
          >
            Partner With Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
