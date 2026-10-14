import type { Metadata } from "next";
import { Check } from "lucide-react";
import { formIds } from "@/lib/site";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Become a Partner | Archway Integrated",
  description:
    "Healthcare networks, laboratories, distributors, and corporations can partner with Archway Integrated to expand services across the region and beyond.",
};

const partnerTypes = [
  "Healthcare networks and health systems",
  "Laboratories and testing providers",
  "Medical suppliers and distributors",
  "Employers and corporations",
  "Government agencies and contractors",
  "Logistics and transportation networks",
];

export default function PartnersPage() {
  return (
    <>
      <PageHeader eyebrow="Become a Partner" title="Let's build Archway together.">
        Many of our upcoming services depend on the right partnerships.
        Networks and corporations can reach our leadership team directly.
      </PageHeader>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-primary">
                Who we partner with
              </h2>
              <ul className="mt-5 space-y-3">
                {partnerTypes.map((type) => (
                  <li
                    key={type}
                    className="flex items-start gap-2.5 text-sm text-foreground/80"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {type}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-muted p-6 text-sm leading-6 text-foreground/70">
              Partners help us bring Coming Soon and Future Expansion
              services online - from laboratory partnerships and bioscience
              to large-scale medical distribution and international
              operations.
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-8 sm:p-10">
            <ContactForm
              formId={formIds.partner}
              formName="Partner Inquiry Form (on the website)"
            />
          </div>
        </div>
      </section>
    </>
  );
}
