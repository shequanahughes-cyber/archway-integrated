"use client";

import { useMemo, useState, useEffect } from "react";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth, type UserRole } from "@/lib/auth-context";

interface AdminUserRow {
  uid: string;
  name: string;
  email: string;
  company: string;
  role: UserRole;
}

const ROLE_OPTIONS: UserRole[] = ["client", "staff", "admin"];

function formatRole(role: string): string {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export default function AdminUsersTable() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [rowError, setRowError] = useState<{ id: string; message: string } | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        setUsers(
          snapshot.docs.map((docSnapshot) => {
            const data = docSnapshot.data();
            return {
              uid: docSnapshot.id,
              name: data.name ?? "",
              email: data.email ?? "",
              company: data.company ?? "",
              role: (data.role as UserRole) ?? "client",
            };
          })
        );
        setLoading(false);
      },
      (err) => {
        console.error("[admin] error loading users:", err);
        setError("Couldn't load users. Please refresh the page.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return users;
    return users.filter(
      (u) => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)
    );
  }, [users, search]);

  async function handleRoleChange(uid: string, role: UserRole) {
    setUpdatingId(uid);
    setRowError(null);

    try {
      await updateDoc(doc(db, "users", uid), { role });
    } catch (err) {
      console.error("[admin] error updating role:", err);
      setRowError({ id: uid, message: "Couldn't update role. Please try again." });
    } finally {
      setUpdatingId(null);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-border bg-white p-8 text-center text-sm text-foreground/60 sm:p-10">
        Loading users...
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

  return (
    <div>
      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search by name or email..."
        className="mb-4 w-full max-w-sm rounded-lg border border-border px-4 py-2.5 text-sm outline-none focus:border-primary"
      />

      {filteredUsers.length === 0 ? (
        <div className="rounded-2xl border border-border bg-muted p-8 text-center text-sm text-foreground/60 sm:p-10">
          {users.length === 0 ? "No users yet." : "No users match your search."}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border bg-muted/50 text-xs font-semibold uppercase tracking-wide text-foreground/50">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((row) => {
                  const isSelf = row.uid === currentUser?.uid;
                  return (
                    <tr key={row.uid}>
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-primary">
                        {row.name || "—"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-foreground/70">
                        {row.email || "—"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-foreground/70">
                        {row.company || "—"}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={row.role}
                          onChange={(event) =>
                            handleRoleChange(row.uid, event.target.value as UserRole)
                          }
                          disabled={updatingId === row.uid || isSelf}
                          title={isSelf ? "You can't change your own role" : undefined}
                          className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-foreground/80 outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {ROLE_OPTIONS.map((role) => (
                            <option key={role} value={role}>
                              {formatRole(role)}
                            </option>
                          ))}
                        </select>
                        {isSelf && (
                          <p className="mt-1.5 text-xs text-foreground/40">This is you</p>
                        )}
                        {rowError && rowError.id === row.uid && (
                          <p className="mt-1.5 text-xs text-red-700">{rowError.message}</p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
