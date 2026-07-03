import {
  Fingerprint,
  HeartPulse,
  Truck,
  Users,
  Route,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory = {
  slug: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  items: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "identity-compliance",
    title: "Identity & Compliance",
    icon: Fingerprint,
    summary:
      "Verification and compliance services that keep organizations audit-ready.",
    items: [
      "Fingerprinting",
      "Identity Verification",
      "Background Screening Coordination",
      "I-9 Verification",
      "Notary Services",
    ],
  },
  {
    slug: "occupational-health",
    title: "Occupational Health",
    icon: HeartPulse,
    summary:
      "DOT and non-DOT testing programs coordinated for employers of every size.",
    items: [
      "Drug & Alcohol Testing",
      "DOT & Non-DOT Collections",
      "Specimen Collection Coordination",
      "Employer Testing Programs",
    ],
  },
  {
    slug: "medical-logistics",
    title: "Medical Logistics",
    icon: Truck,
    summary:
      "Reliable courier and delivery coordination for healthcare partners.",
    items: [
      "Medical Courier Coordination",
      "Medical Supply Distribution",
      "DME Coordination",
      "Last-Mile Healthcare Delivery",
    ],
  },
  {
    slug: "workforce-solutions",
    title: "Workforce Solutions",
    icon: Users,
    summary:
      "Onboarding and administrative support that keeps your workforce compliant.",
    items: [
      "Employee Onboarding",
      "Compliance Support",
      "Credential Management",
      "Administrative Services",
    ],
  },
  {
    slug: "transportation-logistics",
    title: "Transportation & Logistics",
    icon: Route,
    summary:
      "Driver and dispatch coordination built for regional distribution networks.",
    items: [
      "Driver Onboarding",
      "Dispatch Support",
      "Distribution Partnerships",
      "Route Coordination",
    ],
  },
];
