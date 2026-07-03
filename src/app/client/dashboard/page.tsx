"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

export default function ClientDashboardPage() {
  const { profile, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        Client Portal
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
        Welcome, {profile?.name}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-foreground/70">
        Your dashboard is coming soon. This is where you&apos;ll manage
        services, requests, and account details with your Archway Integrated
        Regional Hub team.
      </p>
      <button
        onClick={handleLogout}
        className="mt-8 rounded-xl border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors duration-200 hover:bg-primary/5"
      >
        Log out
      </button>
    </section>
  );
}
