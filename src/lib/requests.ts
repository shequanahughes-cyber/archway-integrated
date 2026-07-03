export const REQUEST_STATUSES = ["submitted", "in_progress", "completed"] as const;

export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export const statusStyles: Record<string, string> = {
  submitted: "bg-amber-50 text-amber-700",
  in_progress: "bg-blue-50 text-blue-700",
  completed: "bg-green-50 text-green-700",
};

export function formatStatus(status: string): string {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
