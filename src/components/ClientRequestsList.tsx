"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";

interface ServiceRequest {
  id: string;
  category: string;
  description: string;
  status: string;
  createdAt: Timestamp | null;
}

const statusStyles: Record<string, string> = {
  submitted: "bg-amber-50 text-amber-700",
  in_progress: "bg-blue-50 text-blue-700",
  completed: "bg-green-50 text-green-700",
};

function formatStatus(status: string) {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function ClientRequestsList() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const requestsQuery = query(
      collection(db, "requests"),
      where("clientId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      requestsQuery,
      (snapshot) => {
        setRequests(
          snapshot.docs.map((docSnapshot) => ({
            id: docSnapshot.id,
            ...(docSnapshot.data() as Omit<ServiceRequest, "id">),
          }))
        );
        setLoading(false);
      },
      (err) => {
        console.error("[requests] error loading requests:", err);
        setError("Couldn't load your requests. Please refresh the page.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user]);

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center text-sm text-foreground/60 sm:p-10">
        Loading your requests...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 sm:p-10">
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-muted p-8 text-center text-sm text-foreground/60 sm:p-10">
        You haven&apos;t submitted any requests yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-wide text-foreground/50">
            <tr>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 font-medium text-primary">
                  {request.category}
                </td>
                <td className="max-w-xs px-6 py-4 text-foreground/70">
                  {request.description}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyles[request.status] ?? "bg-muted text-foreground/60"
                    }`}
                  >
                    {formatStatus(request.status)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-foreground/60">
                  {request.createdAt
                    ? request.createdAt.toDate().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Just now"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
