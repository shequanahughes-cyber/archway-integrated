import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { UserRole } from "@/lib/auth-context";

const googleProvider = new GoogleAuthProvider();

/**
 * Signs the user in with a Google popup. If this is their first time
 * signing in, creates a matching `users/{uid}` doc with role "client"
 * (Google sign-in is only offered on the client/staff-shared login and
 * signup pages, and self-service accounts always default to "client").
 * Returns the user's role so the caller can redirect appropriately.
 */
export async function signInWithGoogle(): Promise<UserRole> {
  const credential = await signInWithPopup(auth, googleProvider);
  const userRef = doc(db, "users", credential.user.uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    return (snapshot.data().role as UserRole | undefined) ?? "client";
  }

  await setDoc(userRef, {
    uid: credential.user.uid,
    name: credential.user.displayName ?? "",
    email: credential.user.email ?? "",
    role: "client",
    createdAt: serverTimestamp(),
  });

  return "client";
}
