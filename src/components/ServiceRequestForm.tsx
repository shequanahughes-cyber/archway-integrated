"use client";

import { useState, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { serviceCategories } from "@/lib/services";

export default function ServiceRequestForm() {
  const { user, profile } = useAuth();
  const [category, setCategory] = useState(serviceCategories[0].title);
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || !profile) return;

    setError(null);
    setSuccess(false);
    setSubmitting(true);

    try {
      await addDoc(collection(db, "requests"), {
        clientId: user.uid,
        clientName: profile.name,
        clientEmail: profile.email,
        company: profile.company ?? "",
        category,
        description,
        status: "submitted",
        createdAt: serverTimestamp(),
      });
      setDescription("");
      setSuccess(true);
    } catch (err) {
      console.error("[requests] error creating request:", err);
      setError("Something went wrong submitting your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-8 sm:p-10">
      <h2 className="text-xl font-semibold text-primary">New Service Request</h2>
      <p className="mt-2 text-sm leading-6 text-foreground/70">
        Tell us what you need and a member of our Regional Hub team will
        follow up.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-5">
        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
        {success && (
          <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            Request submitted. Our team will be in touch shortly.
          </p>
        )}

        <div className="grid gap-1.5">
          <label
            htmlFor="category"
            className="text-sm font-medium text-foreground/80"
          >
            Service Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-primary"
          >
            {serviceCategories.map((serviceCategory) => (
              <option key={serviceCategory.slug} value={serviceCategory.title}>
                {serviceCategory.title}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-1.5">
          <label
            htmlFor="description"
            className="text-sm font-medium text-foreground/80"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Briefly describe what you need..."
            className="rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
