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

// Older or hand-edited documents (e.g. added in the Firebase Console) may
// use a display label or different casing instead of the stored value.
// Each variant maps onto one of the three canonical statuses.
const STATUS_ALIASES: Record<string, RequestStatus> = {
  submitted: "submitted",
  new: "submitted",
  open: "submitted",
  pending: "submitted",
  in_progress: "in_progress",
  inprogress: "in_progress",
  started: "in_progress",
  working: "in_progress",
  completed: "completed",
  complete: "completed",
  resolved: "completed",
  done: "completed",
  closed: "completed",
};

// Returns the canonical status, or null if the value isn't recognized.
// A missing/blank status counts as "submitted" (New) - nobody has
// picked the request up yet.
export function normalizeStatus(raw: unknown): RequestStatus | null {
  if (typeof raw !== "string" || raw.trim() === "") return "submitted";
  const key = raw.trim().toLowerCase().replace(/[\s-]+/g, "_");
  return STATUS_ALIASES[key] ?? null;
}

export function formatStatus(status: string): string {
  return (
    STATUS_LABELS[normalizeStatus(status) ?? status] ??
    status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}
