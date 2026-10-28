import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { divisions, getDivision, serviceStatuses } from "@/lib/services";
import StatusBadge from "@/components/StatusBadge";

export const dynamicParams = false;

export function generateStaticParams() {
  return divisions.map((division) => ({ slug: division.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const division = getDivision(slug);
  if (!division) return {};
  return {
    title: `${division.title} | Archway Integrated`,
    description: division.summary,
  };
}

export default async function DivisionPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const division = getDivision(slug);
  if (!division) notFound();

  const Icon = division.icon;
  const otherDivisions = divisions.filter((d) => d.slug !== division.slug);
  const hasAvailable = division.services.some((s) => s.status === "available");

  return (
    <>
      <section className="border-b border-border bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All services
          </Link>
          <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon className="h-7 w-7" />
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            {division.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/70">
            {division.overview}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="grid gap-12">
            {serviceStatuses.map((status) => {
              const services = division.services.filter(
                (service) => service.status === status.key
              );
              if (services.length === 0) return null;
              return (
                <div key={status.key}>
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-semibold text-primary">
                      {status.label}
                    </h2>
                    <StatusBadge status={status.key} count={services.length} />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-foreground/60">
                    {status.description}
                  </p>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {services.map((service) => (
                      <li
                        key={service.name}
                        className="rounded-xl bg-white p-6 shadow-soft"
                      >
                        <div className="flex items-start gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                          <h3 className="text-base font-semibold text-primary">
                            {service.name}
                          </h3>
                        </div>
                        <p className="mt-2 pl-6.5 text-sm leading-6 text-foreground/70">
                          {service.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <aside className="h-fit rounded-xl bg-primary p-8 text-white lg:sticky lg:top-32">
            <h2 className="text-xl font-semibold">
              {hasAvailable ? "Work with this division" : "Interested in what's next?"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-white/80">
              {hasAvailable
                ? "Book a visit, set up services for your organization, or talk to us about a partnership."
                : "These services are still being built. Partners and organizations can reach out now to help shape them."}
            </p>
            <div className="mt-6 grid gap-3">
              {division.appointments && hasAvailable && (
                <Link
                  href="/appointments"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-white/90"
                >
                  Request an Appointment
                </Link>
              )}
              {hasAvailable && (
                <Link
                  href="/business-accounts"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/70 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Open a Business Account
                </Link>
              )}
              <Link
                href="/partners"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/70 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Become a Partner
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold text-primary">
            Other divisions
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherDivisions.map((other) => {
              const OtherIcon = other.icon;
              return (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group flex items-center gap-4 rounded-xl bg-white p-5 shadow-soft transition-shadow hover:shadow-soft-lg"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <OtherIcon className="h-5 w-5" />
                  </div>
                  <span className="flex-1 text-sm font-semibold text-primary">
                    {other.title}
                  </span>
                  <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
