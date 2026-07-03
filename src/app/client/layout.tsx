import type { Metadata } from "next";
import RequireRole from "@/components/RequireRole";

export const metadata: Metadata = {
  title: "Client Portal | Archway Integrated",
  description: "Client dashboard for Archway Integrated partners.",
};

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireRole role="client">{children}</RequireRole>;
}
