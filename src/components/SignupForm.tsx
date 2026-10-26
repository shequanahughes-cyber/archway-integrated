"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import GoogleSignInButton from "@/components/GoogleSignInButton";

function mapFirebaseError(error: unknown): string {
  const code = (error as { code?: string } | null)?.code;
  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists. Try logging in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return "Password is too weak. Please use at least 6 characters.";
    default:
      return "Something went wrong creating your account. Please try again.";
  }
}

export default function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credential.user, { displayName: name });
      await setDoc(doc(db, "users", credential.user.uid), {
        uid: credential.user.uid,
        name,
        email,
        company,
        role: "client",
        createdAt: serverTimestamp(),
      });
      router.push("/client/dashboard");
    } catch (err) {
      setError(mapFirebaseError(err));
      setSubmitting(false);
    }
  }

  return (
    <>
      <div className="grid gap-5 rounded-2xl border border-border bg-white p-8 sm:p-10">
        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <GoogleSignInButton onError={setError} />

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium uppercase tracking-wide text-foreground/40">
            or
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground/80"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="grid gap-1.5">
              <label
                htmlFor="company"
                className="text-sm font-medium text-foreground/80"
              >
                Company / Organization
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className="rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

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

          <div className="grid gap-5 sm:grid-cols-2">
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
            <div className="grid gap-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-foreground/80"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Create Account"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-foreground/70">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:text-primary-dark"
        >
          Log in
        </Link>
      </p>
    </>
  );
}
