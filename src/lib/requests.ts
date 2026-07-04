export const REQUEST_STATUSES = ["submitted", "in_progress", "completed"] as const;

export type RequestStatus = (typeof REQUEST_STATUSES)[number];

export const statusStyles: Record<string, string> = {
  submitted: "bg-amber-50 text-amber-700",
  in_progress: "bg-blue-50 text-blue-700",
  completed: "bg-green-50 text-green-700",
};

// Display labels only - the stored values (submitted/in_progress/completed)
// stay as-is since firestore.rules and existing documents already depend
// on those exact strings. This is just how they read on screen.
const STATUS_LABELS: Record<string, string> = {
  submitted: "New",
  in_progress: "In Progress",
  completed: "Resolved",
};

export function formatStatus(status: string): string {
  return (
    STATUS_LABELS[status] ??
    status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}
