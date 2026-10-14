import { serviceStatuses, type ServiceStatus } from "@/lib/services";

const badgeStyles: Record<ServiceStatus, string> = {
  available: "bg-accent/10 text-accent",
  "coming-soon": "bg-amber-50 text-amber-700",
  future: "bg-primary/10 text-primary",
};

export function statusLabel(status: ServiceStatus): string {
  return serviceStatuses.find((s) => s.key === status)?.label ?? status;
}

export default function StatusBadge({
  status,
  count,
}: {
  status: ServiceStatus;
  count?: number;
}) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${badgeStyles[status]}`}
    >
      {count !== undefined && `${count} `}
      {statusLabel(status)}
    </span>
  );
}
