"use client";

import { useState, type FormEvent } from "react";
import { serviceCategories } from "@/lib/services";

// TODO: wire this up to a real submission target (e.g. an API route, Formspree,
// or Netlify Forms) once the client confirms how leads should be delivered.
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border bg-muted p-8 text-center">
        <h3 className="text-lg font-semibold text-primary">
          Thanks for reaching out.
        </h3>
        <p className="mt-2 text-sm leading-6 text-foreground/70">
          Your message has been received. Our team will follow up shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-foreground/80">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="company" className="text-sm font-medium text-foreground/80">
            Company / Organization
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-foreground/80">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-foreground/80">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="service" className="text-sm font-medium text-foreground/80">
          Request a Service <span className="text-foreground/40">(optional)</span>
        </label>
        <select
          id="service"
          name="service"
          defaultValue=""
          className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm outline-none focus:border-primary"
        >
          <option value="">Select a service category</option>
          {serviceCategories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground/80">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
        />
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex w-fit items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Send Message
      </button>
    </form>
  );
}
