import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import {
  browserLocalPersistence,
  browserPopupRedirectResolver,
  getAuth,
  initializeAuth,
  type Auth,
} from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// The Firebase JS SDK (Auth in particular) touches browser-only globals
// during initialization, which crashes Next.js's server-side prerendering.
// Only initialize when actually running in the browser; on the server
// these stay undefined, which is fine since every consumer is a client
// component that only calls into `auth`/`db` from effects or event
// handlers (i.e. after hydration, never at module load).
let app: FirebaseApp | undefined;
let authInstance: Auth | undefined;
let dbInstance: Firestore | undefined;

if (typeof window !== "undefined") {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  // Explicitly pin persistence to browserLocalPersistence (localStorage)
  // rather than relying on getAuth()'s automatic persistence-hierarchy
  // fallback, so the signed-in/pending-redirect state is written and read
  // back the same way on every page load. Must also pass
  // browserPopupRedirectResolver explicitly - getAuth() includes it by
  // default, but initializeAuth() does not, and without it
  // signInWithRedirect/getRedirectResult throw auth/argument-error.
  // initializeAuth can only be called once per app - if this module
  // re-evaluates (e.g. Fast Refresh) and auth is already set up, fall
  // back to getAuth() for the existing instance instead of throwing.
  try {
    authInstance = initializeAuth(app, {
      persistence: [browserLocalPersistence],
      popupRedirectResolver: browserPopupRedirectResolver,
    });
  } catch {
    authInstance = getAuth(app);
  }

  dbInstance = getFirestore(app);

  console.log("[firebase] initialized:", {
    appName: app.name,
    projectId: app.options.projectId,
    authDomain: app.options.authDomain,
    totalApps: getApps().length,
  });
}

export const auth = authInstance as Auth;
export const db = dbInstance as Firestore;
export default app;
