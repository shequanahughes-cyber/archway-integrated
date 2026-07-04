"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/google-auth";
import { dashboardPathForRole } from "@/lib/auth-context";
import GoogleLogo from "@/components/GoogleLogo";

function mapGoogleError(error: unknown): string | null {
  console.error("[google-auth] error:", error);
  const code = (error as { code?: string } | null)?.code;
  switch (code) {
    // The user closed the popup or opened a second one; not an error worth surfacing.
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return null;
    case "auth/popup-blocked":
      return "Your browser blocked the sign-in popup. Please allow popups and try again.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using a different sign-in method.";
    default:
      return "Something went wrong signing in with Google. Please try again.";
  }
}

// Chrome blocks the Firebase SDK's popup.closed polling under
// Cross-Origin-Opener-Policy, so if the user closes the popup without
// completing sign-in, signInWithPopup's promise never settles - the SDK
// has no way to notice the popup is gone. Race it against a timeout so
// the button can never hang forever.
const SIGN_IN_TIMEOUT_MS = 45_000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("GOOGLE_SIGN_IN_TIMEOUT")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
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
      const role = await withTimeout(signInWithGoogle(), SIGN_IN_TIMEOUT_MS);
      router.push(dashboardPathForRole(role));
    } catch (err) {
      if (err instanceof Error && err.message === "GOOGLE_SIGN_IN_TIMEOUT") {
        onError(
          "Sign-in is taking too long. If you closed the Google sign-in window, please try again."
        );
      } else {
        const message = mapGoogleError(err);
        if (message) onError(message);
      }
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
