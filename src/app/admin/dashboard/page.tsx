"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import AdminUsersTable from "@/components/AdminUsersTable";

export default function AdminDashboardPage() {
  const { profile, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Admin Portal
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

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-primary">All Users</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Manage account roles across the portal.
        </p>
        <div className="mt-4">
          <AdminUsersTable />
        </div>
      </div>
    </section>
  );
}
