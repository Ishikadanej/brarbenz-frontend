import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  browserPopupRedirectResolver,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXo_YYk3hl2WR2Fq9Sv6HQMYpzobmH8W8",
  authDomain: "spdit-fe.firebaseapp.com",
  projectId: "spdit-fe",
  storageBucket: "spdit-fe.firebasestorage.app",
  messagingSenderId: "442358785154",
  appId: "1:442358785154:web:599debbbf71b8d6aa7c09b",
  measurementId: "G-NS9QMM5M1B",
};

function getFirebaseApp() {
  if (typeof window === "undefined") return null;
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export function getFirebaseAuth() {
  const app = getFirebaseApp();
  if (!app) return;
  return getAuth(app);
}

export const googleProvider = new GoogleAuthProvider();
export const popupResolver = browserPopupRedirectResolver;

export async function initAnalytics() {
  if (typeof window === "undefined") return;
  const app = getFirebaseApp();
  if (!app) return;
  const { getAnalytics, isSupported } = await import("firebase/analytics");
  if (await isSupported()) getAnalytics(app);
}
