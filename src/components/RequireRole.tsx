"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type UserRole } from "@/lib/auth-context";

function LoadingScreen() {
  return (
    <section className="mx-auto flex max-w-6xl items-center justify-center px-6 py-32">
      <p className="text-sm text-foreground/60">Loading...</p>
    </section>
  );
}

export default function RequireRole({
  role,
  children,
}: {
  role: UserRole;
  children: ReactNode;
}) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (profile && profile.role !== role) {
      router.replace(`/${profile.role}/dashboard`);
    }
  }, [loading, user, profile, role, router]);

  if (loading || !user) {
    return <LoadingScreen />;
  }

  if (!profile) {
    return (
      <section className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold text-primary">
          Your account isn&apos;t fully set up yet.
        </h1>
        <p className="mt-4 text-base leading-7 text-foreground/70">
          We couldn&apos;t find a profile for your account. Please contact an
          administrator for assistance.
        </p>
      </section>
    );
  }

  if (profile.role !== role) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
