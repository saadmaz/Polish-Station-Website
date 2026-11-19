// Client-side Firebase app for writing directly into the Polish Station OS's
// Firestore project (pos-polishstation). Submissions here show up on the
// OS's "Inquiries" screen. This config is a public web app identifier, not
// a secret - same as any other Firebase web API key (see .env.example).
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
};

// Unset in a build without the Firebase values; the contact form then asks
// people to call or WhatsApp instead of failing on submit.
export const firebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

export const db = firebaseConfigured
  ? getFirestore(getApps().length ? getApp() : initializeApp(firebaseConfig))
  : null;
