import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { countByStatus, divisions, serviceStatuses } from "@/lib/services";
import PageHeader from "@/components/PageHeader";
import StatusBadge from "@/components/StatusBadge";
import ActionCards from "@/components/ActionCards";

export const metadata: Metadata = {
  title: "Services | Archway Integrated",
  description:
    "Medical Testing & Screening, Professional Testing Center, Bioscience & Laboratory, Medical Distribution, Workforce Services, Logistics & Drop-Off Hub, and Archway Global.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={`${divisions.length} service divisions, one regional partner.`}
      >
        Every division below is coordinated by the same Archway team. See
        what&apos;s available today, what&apos;s coming soon, and where
        we&apos;re headed next.
      </PageHeader>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {divisions.map((division) => {
            const Icon = division.icon;
            return (
              <Link
                key={division.slug}
                href={`/services/${division.slug}`}
                className="group flex flex-col rounded-xl bg-white p-8 shadow-soft transition-shadow hover:shadow-soft-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-xl font-semibold text-primary">
                  {division.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-foreground/70">
                  {division.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {serviceStatuses.map(({ key }) => {
                    const count = countByStatus(division, key);
                    if (count === 0) return null;
                    return <StatusBadge key={key} status={key} count={count} />;
                  })}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  Explore division
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            How we show our services
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-foreground/70">
            Archway is growing. Every service is labeled so you know exactly
            what we can do for you today.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {serviceStatuses.map((status) => (
              <div
                key={status.key}
                className="rounded-xl bg-white p-8 shadow-soft"
              >
                <StatusBadge status={status.key} />
                <p className="mt-4 text-sm leading-6 text-foreground/70">
                  {status.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
          Ready to get started?
        </h2>
        <div className="mt-10">
          <ActionCards />
        </div>
      </section>
    </>
  );
}
