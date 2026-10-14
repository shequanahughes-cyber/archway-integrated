import {
  ClipboardCheck,
  FlaskConical,
  Globe,
  Microscope,
  PackageCheck,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

// To add a service, append it to a division's `services` list. To add a
// division, append a new entry to `divisions` - its page at
// /services/<slug> is generated automatically.

export type ServiceStatus = "available" | "coming-soon" | "future";

export const serviceStatuses: {
  key: ServiceStatus;
  label: string;
  description: string;
}[] = [
  {
    key: "available",
    label: "Available Now",
    description:
      "Services Archway is fully prepared and authorized to provide today.",
  },
  {
    key: "coming-soon",
    label: "Coming Soon",
    description:
      "Services awaiting partnerships, approvals, equipment, or training.",
  },
  {
    key: "future",
    label: "Future Expansion",
    description:
      "Bioscience expansion, international operations, and larger medical distribution contracts.",
  },
];

export type Service = {
  name: string;
  description: string;
  status: ServiceStatus;
};

export type Division = {
  slug: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  overview: string;
  // Whether individuals can book this division's services through the
  // appointment request page (vs. business accounts / partnerships only).
  appointments: boolean;
  services: Service[];
};

export const divisions: Division[] = [
  {
    slug: "medical-testing-screening",
    title: "Medical Testing & Screening",
    icon: Microscope,
    summary:
      "Drug, alcohol, and health screening for individuals and employer programs.",
    overview:
      "Our Medical Testing & Screening division handles DOT and non-DOT drug and alcohol testing, specimen collection, and employer screening programs. Individuals can book a visit, and employers can set up ongoing testing programs through a business account.",
    appointments: true,
    services: [
      {
        name: "Drug & Alcohol Testing",
        description: "Pre-employment, random, post-accident, and reasonable-suspicion testing.",
        status: "available",
      },
      {
        name: "DOT & Non-DOT Collections",
        description: "Collections that follow federal DOT procedures and employer-specific policies.",
        status: "available",
      },
      {
        name: "Specimen Collection Coordination",
        description: "Collection, chain-of-custody, and hand-off to certified laboratories.",
        status: "available",
      },
      {
        name: "Employer Testing Programs",
        description: "Ongoing screening programs managed for employers of every size.",
        status: "available",
      },
      {
        name: "DOT Physicals",
        description: "Commercial driver medical examinations.",
        status: "coming-soon",
      },
      {
        name: "Health Screenings & Phlebotomy",
        description: "Blood draws and wellness screenings for individuals and employers.",
        status: "coming-soon",
      },
    ],
  },
  {
    slug: "professional-testing-center",
    title: "Professional Testing Center",
    icon: ClipboardCheck,
    summary:
      "Fingerprinting, identity verification, notary, and proctored exams in one place.",
    overview:
      "The Professional Testing Center is where people come to verify who they are and prove what they know. We provide fingerprinting, identity verification, and notary services today, with proctored certification and licensing exams on the way.",
    appointments: true,
    services: [
      {
        name: "Fingerprinting",
        description: "Fingerprint capture for employment, licensing, and background checks.",
        status: "available",
      },
      {
        name: "Identity Verification",
        description: "In-person identity verification for employers and agencies.",
        status: "available",
      },
      {
        name: "Background Screening Coordination",
        description: "Coordinating background checks with the right screening providers.",
        status: "available",
      },
      {
        name: "Notary Services",
        description: "Notarization of documents for individuals and businesses.",
        status: "available",
      },
      {
        name: "Proctored Certification & Licensing Exams",
        description: "A secure, proctored setting for professional certification and licensing exams.",
        status: "coming-soon",
      },
    ],
  },
  {
    slug: "bioscience-laboratory",
    title: "Bioscience & Laboratory",
    icon: FlaskConical,
    summary:
      "Specimen processing and laboratory partnerships, growing into bioscience.",
    overview:
      "Bioscience & Laboratory builds on our specimen collection work. We're establishing laboratory partnerships first, with a longer-term plan to expand into bioscience research support.",
    appointments: false,
    services: [
      {
        name: "Specimen Processing & Lab Hand-Off",
        description: "Preparing and routing specimens to partner laboratories.",
        status: "coming-soon",
      },
      {
        name: "Laboratory Partnerships",
        description: "Formal partnerships with regional and national laboratories.",
        status: "coming-soon",
      },
      {
        name: "Bioscience Research Support",
        description: "Supporting research organizations and clinical studies.",
        status: "future",
      },
    ],
  },
  {
    slug: "medical-distribution",
    title: "Medical Distribution",
    icon: PackageCheck,
    summary:
      "Medical supply, DME, and courier coordination for healthcare partners.",
    overview:
      "Medical Distribution gets supplies and equipment where they need to go. We coordinate medical supply distribution, durable medical equipment, and courier services today, and we're working toward larger distribution contracts.",
    appointments: false,
    services: [
      {
        name: "Medical Supply Distribution",
        description: "Sourcing and distributing medical supplies to healthcare partners.",
        status: "available",
      },
      {
        name: "DME Coordination",
        description: "Coordinating durable medical equipment orders and delivery.",
        status: "available",
      },
      {
        name: "Medical Courier Coordination",
        description: "Time-sensitive courier service for specimens, records, and supplies.",
        status: "available",
      },
      {
        name: "Large-Scale Distribution Contracts",
        description: "Distribution contracts with health systems and government agencies.",
        status: "future",
      },
    ],
  },
  {
    slug: "workforce-services",
    title: "Workforce Services",
    icon: Users,
    summary:
      "Onboarding, I-9, credentialing, and compliance support for growing teams.",
    overview:
      "Workforce Services handles the administrative side of hiring and keeping a compliant workforce, from I-9 verification and onboarding to credential tracking.",
    appointments: false,
    services: [
      {
        name: "Employee Onboarding",
        description: "New-hire paperwork, verification, and onboarding coordination.",
        status: "available",
      },
      {
        name: "I-9 Verification",
        description: "In-person Form I-9 document verification for employers.",
        status: "available",
      },
      {
        name: "Credential Management",
        description: "Tracking licenses, certifications, and renewal dates.",
        status: "available",
      },
      {
        name: "Compliance & Administrative Support",
        description: "Keeping employee records and compliance documentation audit-ready.",
        status: "available",
      },
      {
        name: "Workforce Training Programs",
        description: "Training and certification programs for partner organizations.",
        status: "coming-soon",
      },
    ],
  },
  {
    slug: "logistics-drop-off-hub",
    title: "Logistics & Drop-Off Hub",
    icon: Truck,
    summary:
      "Last-mile delivery, dispatch, and a central drop-off point for the region.",
    overview:
      "The Logistics & Drop-Off Hub is the regional center for moving things. We coordinate last-mile healthcare delivery, dispatch, and driver onboarding, and we're building out a drop-off and pick-up hub for partners.",
    appointments: false,
    services: [
      {
        name: "Last-Mile Healthcare Delivery",
        description: "Final-leg delivery for healthcare supplies and equipment.",
        status: "available",
      },
      {
        name: "Dispatch & Route Coordination",
        description: "Dispatch support and route planning for regional networks.",
        status: "available",
      },
      {
        name: "Driver Onboarding",
        description: "Screening and onboarding drivers for logistics partners.",
        status: "available",
      },
      {
        name: "Drop-Off & Pick-Up Hub",
        description: "A central location for partners to drop off and collect packages and specimens.",
        status: "coming-soon",
      },
    ],
  },
  {
    slug: "archway-global",
    title: "Archway Global",
    icon: Globe,
    summary:
      "Taking the Archway model to international operations and partners.",
    overview:
      "Archway Global is our long-term plan to bring the Regional Hub model beyond the United States, through international operations, global supply partnerships, and cross-border medical distribution.",
    appointments: false,
    services: [
      {
        name: "International Operations",
        description: "Regional Hubs and service delivery outside the United States.",
        status: "future",
      },
      {
        name: "Global Supply Partnerships",
        description: "Partnerships with international manufacturers and suppliers.",
        status: "future",
      },
      {
        name: "International Medical Distribution",
        description: "Cross-border distribution of medical supplies and equipment.",
        status: "future",
      },
    ],
  },
];

export function getDivision(slug: string): Division | undefined {
  return divisions.find((division) => division.slug === slug);
}

// The most-available status of any service in the division, e.g. a
// division with one available service reads as "Available Now".
export function divisionStatus(division: Division): ServiceStatus {
  return (
    serviceStatuses.find(({ key }) => countByStatus(division, key) > 0)?.key ??
    "future"
  );
}

export function countByStatus(
  division: Division,
  status: ServiceStatus
): number {
  return division.services.filter((service) => service.status === status)
    .length;
}
