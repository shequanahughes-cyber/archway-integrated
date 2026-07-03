"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/google-auth";
import GoogleLogo from "@/components/GoogleLogo";

function mapGoogleError(error: unknown): string | null {
  const code = (error as { code?: string } | null)?.code;
  switch (code) {
    // The user closed the popup or opened a second one; not an error worth surfacing.
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return null;
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in popup. Please allow popups and try again.";
    default:
      return "Something went wrong signing in with Google. Please try again.";
  }
}

export default function GoogleSignInButton({
  onError,
}: {
  onError: (message: string | null) => void;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  async function handleClick() {
    onError(null);
    setSubmitting(true);

    try {
      const role = await signInWithGoogle();
      router.push(role === "staff" ? "/staff/dashboard" : "/client/dashboard");
    } catch (err) {
      const message = mapGoogleError(err);
      if (message) onError(message);
      setSubmitting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={submitting}
      className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-border bg-white px-7 py-3 text-sm font-semibold text-foreground/80 shadow-sm transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
    >
      <GoogleLogo className="h-5 w-5 shrink-0" />
      {submitting ? "Signing in..." : "Continue with Google"}
    </button>
  );
}
