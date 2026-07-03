"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import ServiceRequestForm from "@/components/ServiceRequestForm";
import ClientRequestsList from "@/components/ClientRequestsList";

export default function ClientDashboardPage() {
  const { profile, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Client Portal
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            Welcome, {profile?.name}
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex shrink-0 items-center justify-center rounded-xl border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary/5"
        >
          Log out
        </button>
      </div>

      <div className="mt-10 grid gap-10">
        <ServiceRequestForm />

        <div>
          <h2 className="text-xl font-semibold text-primary">My Requests</h2>
          <p className="mt-1 text-sm text-foreground/70">
            Your submitted service requests, most recent first.
          </p>
          <div className="mt-4">
            <ClientRequestsList />
          </div>
        </div>
      </div>
    </section>
  );
}
