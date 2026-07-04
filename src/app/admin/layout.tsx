import type { Metadata } from "next";
import RequireRole from "@/components/RequireRole";

export const metadata: Metadata = {
  title: "Admin Portal | Archway Integrated",
  description: "Admin dashboard for Archway Integrated team members.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireRole role="admin">{children}</RequireRole>;
}
