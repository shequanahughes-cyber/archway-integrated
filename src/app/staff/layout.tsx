import type { Metadata } from "next";
import RequireRole from "@/components/RequireRole";

export const metadata: Metadata = {
  title: "Staff Portal | Archway Integrated",
  description: "Staff dashboard for Archway Integrated team members.",
};

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireRole role="staff">{children}</RequireRole>;
}
