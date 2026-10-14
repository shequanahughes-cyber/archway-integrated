import Link from "next/link";
import { ArrowRight, Building2, CalendarCheck, Handshake } from "lucide-react";

const actions = [
  {
    href: "/appointments",
    icon: CalendarCheck,
    title: "Request an Appointment",
    description:
      "Book testing, fingerprinting, notary, or other in-person services.",
  },
  {
    href: "/business-accounts",
    icon: Building2,
    title: "Open a Business Account",
    description:
      "Set up ongoing services for your employees and track every request.",
  },
  {
    href: "/partners",
    icon: Handshake,
    title: "Become a Partner",
    description:
      "Networks, health systems, and corporations - let's build together.",
  },
];

export default function ActionCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.href}
            href={action.href}
            className="group flex flex-col rounded-xl bg-white p-8 shadow-soft transition-shadow hover:shadow-soft-lg"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-primary">
              {action.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-foreground/70">
              {action.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
              Get started
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
