import {
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
  type User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import type { UserRole } from "@/lib/auth-context";

const googleProvider = new GoogleAuthProvider();

/**
 * Kicks off Google sign-in. Navigates the whole page away to Google's
 * consent screen and back, rather than a popup - popups run into
 * Cross-Origin-Opener-Policy restrictions on Google's own auth handler
 * page that a COOP header on our side can't override.
 */
export async function startGoogleSignIn(): Promise<void> {
  await signInWithRedirect(auth, googleProvider);
}

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
 * Call on mount from any page that renders the Google sign-in button.
 * Checks whether the page just loaded after returning from Google's
 * redirect flow; if so, ensures a Firestore profile exists and returns
 * the role to redirect to. Returns null when there's no pending
 * redirect result (i.e. a normal page load).
 */
export async function completeGoogleRedirectSignIn(): Promise<UserRole | null> {
  const result = await getRedirectResult(auth);
  if (!result) return null;
  return ensureUserDoc(result.user);
}
