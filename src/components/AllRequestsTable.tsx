"use client";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { formatStatus, REQUEST_STATUSES, type RequestStatus } from "@/lib/requests";
import type { StaffServiceRequest } from "@/lib/use-all-requests";

interface AllRequestsTableProps {
  requests: StaffServiceRequest[];
  loading: boolean;
  error: string | null;
  // Rows to tint with a warning color (e.g. admin "Needs Attention").
  highlightedIds?: ReadonlySet<string>;
  emptyMessage?: string;
}

export default function AllRequestsTable({
  requests,
  loading,
  error,
  highlightedIds,
  emptyMessage = "No client requests yet.",
}: AllRequestsTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [rowError, setRowError] = useState<{ id: string; message: string } | null>(null);

  async function handleStatusChange(requestId: string, status: RequestStatus) {
    setUpdatingId(requestId);
    setRowError(null);

    try {
      await updateDoc(doc(db, "requests", requestId), { status });
    } catch (err) {
      console.error("[requests] error updating status:", err);
      setRowError({ id: requestId, message: "Couldn't update status. Please try again." });
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center text-sm text-foreground/60 sm:p-10">
        Loading requests...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 sm:p-10">
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-muted p-8 text-center text-sm text-foreground/60 sm:p-10">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-wide text-foreground/50">
            <tr>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {requests.map((request) => {
              const highlighted = highlightedIds?.has(request.id) ?? false;
              return (
                <tr key={request.id} className={highlighted ? "bg-amber-50/70" : undefined}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="font-medium text-primary">{request.clientName}</span>
                    {request.clientEmail && (
                      <span className="block text-xs text-foreground/50">
                        {request.clientEmail}
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-foreground/70">
                    {request.company || "—"}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-foreground/70">
                    {request.category}
                  </td>
                  <td className="max-w-xs px-6 py-4 text-foreground/70">
                    {request.description}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={request.status ?? ""}
                      onChange={(event) =>
                        handleStatusChange(request.id, event.target.value as RequestStatus)
                      }
                      disabled={updatingId === request.id}
                      className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground/80 outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {request.status === null && (
                        <option value="" disabled>
                          {request.rawStatus} (unrecognized)
                        </option>
                      )}
                      {REQUEST_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {formatStatus(status)}
                        </option>
                      ))}
                    </select>
                    {rowError && rowError.id === request.id && (
                      <p className="mt-1.5 text-xs text-red-700">{rowError.message}</p>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-foreground/60">
                    {request.createdAt
                      ? request.createdAt.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "—"}
                    {highlighted && (
                      <span className="mt-1 block text-xs font-semibold text-amber-700">
                        Needs attention
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
