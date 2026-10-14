import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-muted">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
          {title}
        </h1>
        {children && (
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/70">
            {children}
          </p>
        )}
      </div>
    </section>
  );
}
