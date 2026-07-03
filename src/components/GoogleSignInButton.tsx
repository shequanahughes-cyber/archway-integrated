"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { completeGoogleRedirectSignIn, startGoogleSignIn } from "@/lib/google-auth";
import GoogleLogo from "@/components/GoogleLogo";

function mapGoogleError(error: unknown): string | null {
  const code = (error as { code?: string } | null)?.code;
  switch (code) {
    // The user backed out of the Google consent screen; not worth surfacing.
    case "auth/redirect-cancelled-by-user":
    case "auth/cancelled-popup-request":
      return null;
    case "auth/account-exists-with-different-credential":
      return "An account already exists with this email using a different sign-in method.";
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

  // Runs after the browser comes back from Google's redirect flow.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const role = await completeGoogleRedirectSignIn();
        if (role && !cancelled) {
          setSubmitting(true);
          router.push(role === "staff" ? "/staff/dashboard" : "/client/dashboard");
        }
      } catch (err) {
        if (!cancelled) {
          const message = mapGoogleError(err);
          if (message) onError(message);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleClick() {
    onError(null);
    setSubmitting(true);

    try {
      await startGoogleSignIn(); // navigates away; nothing after this runs
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
