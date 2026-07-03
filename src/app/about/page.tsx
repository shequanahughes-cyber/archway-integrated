import type { Metadata } from "next";
import Image from "next/image";
import { Building2, ShieldCheck, Truck, Users2 } from "lucide-react";
import { photos } from "@/lib/images";

export const metadata: Metadata = {
  title: "About | Archway Integrated",
  description:
    "Archway Integrated is a centralized regional hub serving healthcare providers, employers, government contractors, and logistics partners.",
};

const audiences = [
  {
    icon: ShieldCheck,
    title: "Healthcare Providers",
    description:
      "Compliance, testing, and logistics support that keeps clinical teams focused on patient care.",
  },
  {
    icon: Building2,
    title: "Employers",
    description:
      "Onboarding, screening, and administrative programs that scale with a growing workforce.",
  },
  {
    icon: Users2,
    title: "Government Contractors",
    description:
      "Identity verification and compliance coordination built to meet contract requirements.",
  },
  {
    icon: Truck,
    title: "Logistics Partners",
    description:
      "Dispatch, distribution, and route coordination for regional transportation networks.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            About Archway Integrated
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
            A centralized regional hub, built to simplify how you work.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/70">
            Archway Integrated brings identity, health, logistics, and
            workforce services together under one roof, so the organizations
            that keep our region running have a single, accountable partner
            instead of a patchwork of vendors.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
              Who We Are
            </h2>
            <p className="mt-4 text-base leading-7 text-foreground/70">
              Archway Integrated Services connects organizations with
              dependable operational support through one centralized regional
              hub. We help healthcare providers, employers, government
              contractors, and logistics partners streamline operations,
              improve compliance, and expand their reach through scalable
              service solutions.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-soft">
            <Image
              src={photos.officeTeamDiscussion}
              alt="Diverse team of colleagues discussing work in an office"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-t border-border">
        <Image
          src={photos.warehouseLogisticsTeam}
          alt="Logistics team walking through a warehouse"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#16324F]/40" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="max-w-md rounded-xl bg-primary p-8 text-white shadow-soft-lg sm:p-10">
            <h2 className="text-2xl font-semibold sm:text-3xl">Our Vision</h2>
            <p className="mt-5 text-lg leading-8 text-white/80">
              To build a national network of Regional Hubs that strengthen
              healthcare, workforce, logistics, and public-sector operations
              across the United States.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
              Who we help
            </h2>
            <p className="mt-4 text-base leading-7 text-foreground/70">
              From clinical teams to dispatch floors, our partners rely on us
              to handle the compliance, health, and logistics work that keeps
              their operations moving.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((audience) => {
              const Icon = audience.icon;
              return (
                <div
                  key={audience.title}
                  className="rounded-xl bg-white p-8 shadow-soft sm:p-10"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-primary">
                    {audience.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-foreground/70">
                    {audience.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
