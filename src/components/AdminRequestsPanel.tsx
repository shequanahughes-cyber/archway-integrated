"use client";

import { useEffect, useMemo, useState } from "react";
import AllRequestsTable from "@/components/AllRequestsTable";
import { formatStatus, REQUEST_STATUSES, type RequestStatus } from "@/lib/requests";
import { useAllRequests } from "@/lib/use-all-requests";

// A request still "New" (stored as "submitted") this long after it was
// submitted is flagged as Needs Attention.
const NEEDS_ATTENTION_MS = 2 * 24 * 60 * 60 * 1000;

// "other" = a stored status that normalizeStatus() doesn't recognize. It
// gets its own card and filter (only when non-zero) so the cards always
// add up to the total.
type StatusFilter = "all" | RequestStatus | "other";

function filterLabel(filter: StatusFilter): string {
  if (filter === "all") return "All";
  if (filter === "other") return "Other";
  return formatStatus(filter);
}

export default function AdminRequestsPanel() {
  const { requests, loading, error } = useAllRequests();
  const [filter, setFilter] = useState<StatusFilter>("all");
  // Re-evaluated every minute so a request crosses the 2-day line without a reload.
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const counts = useMemo(() => {
    const result: Record<RequestStatus | "other", number> = {
      submitted: 0,
      in_progress: 0,
      completed: 0,
      other: 0,
    };
    for (const request of requests) {
      result[request.status ?? "other"] += 1;
    }
    return result;
  }, [requests]);

  const needsAttentionIds = useMemo(
    () =>
      new Set(
        requests
          .filter(
            (request) =>
              request.status === "submitted" &&
              request.createdAt !== null &&
              now - request.createdAt.getTime() > NEEDS_ATTENTION_MS
          )
          .map((request) => request.id)
      ),
    [requests, now]
  );

  const filteredRequests = useMemo(
    () =>
      filter === "all"
        ? requests
        : requests.filter((request) => (request.status ?? "other") === filter),
    [requests, filter]
  );

  const hasOther = counts.other > 0;
  const filterOptions: StatusFilter[] = [
    "all",
    ...REQUEST_STATUSES,
    ...(hasOther ? (["other"] as const) : []),
  ];

  const cards = [
    { label: "New", value: counts.submitted },
    { label: "In Progress", value: counts.in_progress },
    { label: "Resolved", value: counts.completed },
    ...(hasOther ? [{ label: "Other", value: counts.other }] : []),
  ];

  return (
    <div>
      <div
        className={`grid gap-4 sm:grid-cols-2 ${hasOther ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}
      >
        {cards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-border bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-foreground/50">
              {card.label}
            </p>
            <p className="mt-2 text-3xl font-semibold text-primary">
              {loading ? "—" : card.value}
            </p>
          </div>
        ))}
        <div
          className={`rounded-2xl border p-6 ${
            needsAttentionIds.size > 0
              ? "border-amber-200 bg-amber-50"
              : "border-border bg-white"
          }`}
        >
          <p
            className={`text-xs font-semibold uppercase tracking-wide ${
              needsAttentionIds.size > 0 ? "text-amber-700" : "text-foreground/50"
            }`}
          >
            Needs Attention
          </p>
          <p
            className={`mt-2 text-3xl font-semibold ${
              needsAttentionIds.size > 0 ? "text-amber-700" : "text-primary"
            }`}
          >
            {loading ? "—" : needsAttentionIds.size}
          </p>
          <p className="mt-1 text-xs text-foreground/50">New for more than 2 days</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by status">
        {filterOptions.map((option) => {
          const active = filter === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                active
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-white text-foreground/70 hover:border-accent hover:text-accent"
              }`}
            >
              {filterLabel(option)}
            </button>
          );
        })}
        {!loading && (
          <span className="ml-auto text-xs text-foreground/50">
            Showing {filteredRequests.length} of {requests.length} requests
          </span>
        )}
      </div>

      <div className="mt-4">
        <AllRequestsTable
          requests={filteredRequests}
          loading={loading}
          error={error}
          highlightedIds={needsAttentionIds}
          emptyMessage={
            requests.length === 0
              ? "No client requests yet."
              : `No ${filterLabel(filter)} requests.`
          }
        />
      </div>
    </div>
  );
}
