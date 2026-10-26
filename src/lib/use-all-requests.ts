"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { normalizeStatus, type RequestStatus } from "@/lib/requests";

export interface StaffServiceRequest {
  id: string;
  clientName: string;
  clientEmail?: string;
  company: string;
  category: string;
  description: string;
  // Canonical status, or null if the stored value isn't recognized.
  status: RequestStatus | null;
  // The value exactly as stored, for display when status is null.
  rawStatus: string;
  createdAt: Date | null;
}

function toDate(value: unknown): Date | null {
  if (value instanceof Timestamp) return value.toDate();
  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  return null;
}

// Live list of every request, most recent first. Shared by the staff and
// admin dashboards. Sorted in the browser rather than with
// orderBy("createdAt"), because Firestore's orderBy silently drops any
// document missing that field - this way every request shows up.
export function useAllRequests() {
  const [requests, setRequests] = useState<StaffServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "requests"),
      (snapshot) => {
        const rows = snapshot.docs.map((docSnapshot) => {
          // "estimate" fills in a just-written serverTimestamp() locally
          // instead of null, so null below really means "no date stored".
          const data = docSnapshot.data({ serverTimestamps: "estimate" });
          return {
            id: docSnapshot.id,
            clientName: data.clientName ?? "",
            clientEmail: data.clientEmail,
            company: data.company ?? "",
            category: data.category ?? "",
            description: data.description ?? "",
            status: normalizeStatus(data.status),
            rawStatus: typeof data.status === "string" ? data.status : "",
            createdAt: toDate(data.createdAt),
          };
        });
        // Undated requests sort last.
        rows.sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
        setRequests(rows);
        setLoading(false);
      },
      (err) => {
        console.error("[requests] error loading all requests:", err);
        setError("Couldn't load requests. Please refresh the page.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { requests, loading, error };
}
