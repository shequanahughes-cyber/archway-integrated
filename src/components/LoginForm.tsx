"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

function mapFirebaseError(error: unknown): string {
  const code = (error as { code?: string } | null)?.code;
  switch (code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password. Please try again.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    default:
      return "Something went wrong logging in. Please try again.";
  }
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const snapshot = await getDoc(doc(db, "users", credential.user.uid));

      if (!snapshot.exists()) {
        setError(
          "We couldn't find a profile for this account. Please contact an administrator."
        );
        setSubmitting(false);
        return;
      }

      const role = snapshot.data().role;
      router.push(role === "staff" ? "/staff/dashboard" : "/client/dashboard");
    } catch (err) {
      setError(mapFirebaseError(err));
      setSubmitting(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid gap-5 rounded-2xl border border-border bg-white p-8 sm:p-10"
      >
        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="grid gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-foreground/80"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="grid gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-foreground/80"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Logging in..." : "Log In"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground/70">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-primary hover:text-primary-dark"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
