import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceCategories } from "@/lib/services";
import LocationCallout from "@/components/LocationCallout";

export default function Home() {
  return (
    <>
      <section className="border-b border-border bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            One Partner. Multiple Solutions. Regional Impact.
          </p>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            Integrated compliance, health, and logistics support for the
            organizations that keep your region running.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-foreground/70">
            Archway Integrated brings identity verification, occupational
            health, medical logistics, workforce, and transportation services
            together under a single regional partner, so your teams spend
            less time managing vendors and more time doing the work that
            matters.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              Partner With Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
              Who we are
            </h2>
            <p className="mt-4 text-base leading-7 text-foreground/70">
              Archway Integrated is a centralized regional hub built to
              simplify how organizations manage compliance, health, and
              logistics services. Instead of coordinating a dozen vendors, our
              partners work with one accountable team that understands the
              full picture — from onboarding a new hire to delivering
              time-sensitive medical supplies.
            </p>
          </div>
          <LocationCallout />
        </div>
      </section>

      <section className="border-t border-border bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
                What we do
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-7 text-foreground/70">
                Five integrated service categories, one regional partner.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark"
            >
              View all services
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.slug}
                  href={`/services#${category.slug}`}
                  className="group flex flex-col rounded-xl bg-white p-8 shadow-soft transition-shadow hover:shadow-soft-lg sm:p-10"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-primary">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-foreground/70">
                    {category.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
