import { GoogleAuthProvider, signInWithPopup, type User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { UserRole } from "@/lib/auth-context";

const googleProvider = new GoogleAuthProvider();

/**
 * If this is the user's first time signing in, creates a matching
 * `users/{uid}` doc with role "client" (self-service accounts always
 * default to "client"; staff accounts are created manually). Returns
 * the user's role either way.
 */
async function ensureUserDoc(user: User): Promise<UserRole> {
  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (snapshot.exists()) {
    return (snapshot.data().role as UserRole | undefined) ?? "client";
  }

  await setDoc(userRef, {
    uid: user.uid,
    name: user.displayName ?? "",
    email: user.email ?? "",
    role: "client",
    createdAt: serverTimestamp(),
  });

  return "client";
}

/**
 * Signs the user in with a Google popup and resolves with their role.
 * signInWithRedirect was tried instead of this (to dodge a
 * Cross-Origin-Opener-Policy console warning on the popup path), but it
 * ran into a worse problem: Chrome's Bounce Tracking Mitigation purges
 * storage for archway-integrated.firebaseapp.com since it's only ever
 * used as a pass-through hop in the redirect chain, which broke
 * getRedirectResult() outright. The COOP warning here only blocks the
 * SDK's popup.closed polling (used to detect a manually-closed popup);
 * the actual result handoff goes over postMessage, which COOP doesn't
 * touch, so sign-in itself isn't affected by it.
 */
export async function signInWithGoogle(): Promise<UserRole> {
  const credential = await signInWithPopup(auth, googleProvider);
  return ensureUserDoc(credential.user);
}
