import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardList, LayoutDashboard, UserCheck } from "lucide-react";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Business Accounts | Archway Integrated",
  description:
    "Establish a business account with Archway Integrated to request and track testing, screening, workforce, and logistics services for your organization.",
};

const benefits = [
  {
    icon: ClipboardList,
    title: "Request services online",
    description:
      "Submit service requests for any Archway division from one place, any time.",
  },
  {
    icon: LayoutDashboard,
    title: "Track every request",
    description:
      "See the status of each request - New, In Progress, or Resolved - in your dashboard.",
  },
  {
    icon: UserCheck,
    title: "One accountable team",
    description:
      "Our Regional Hub team follows up personally on every request your organization makes.",
  },
];

const steps = [
  "Create your account with your name, organization, and email.",
  "Submit your first service request from your dashboard.",
  "Our team follows up to confirm details and set up ongoing services.",
];

export default function BusinessAccountsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Business Accounts"
        title="Establish a business account."
      >
        Employers, agencies, and healthcare organizations can open an account
        to request and track Archway services for their teams.
      </PageHeader>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="rounded-xl bg-white p-8 shadow-soft"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-primary">
                  {benefit.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-foreground/70">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border bg-muted">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
              How it works
            </h2>
            <ol className="mt-6 space-y-4">
              {steps.map((step, index) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-base leading-7 text-foreground/80">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-soft sm:p-10">
            <h2 className="text-xl font-semibold text-primary">
              Get started in minutes
            </h2>
            <p className="mt-3 text-sm leading-6 text-foreground/70">
              Create your account online, then request services for your
              organization from your dashboard.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                Create Business Account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="text-sm font-semibold text-primary hover:text-primary-dark"
              >
                Already have an account? Log in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
