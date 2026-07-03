import type { Metadata } from "next";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up | Archway Integrated",
  description: "Create a client account with Archway Integrated's Regional Hub.",
};

export default function SignupPage() {
  return (
    <section className="mx-auto max-w-xl px-6 py-20">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">
        Client & Staff Portal
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
        Create your account.
      </h1>
      <p className="mt-4 text-base leading-7 text-foreground/70">
        Sign up to manage your services and requests with your Archway
        Integrated Regional Hub team.
      </p>

      <div className="mt-8">
        <SignupForm />
      </div>
    </section>
  );
}
