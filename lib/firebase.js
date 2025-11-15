import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  browserPopupRedirectResolver,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyChQNlkVYOmKgS0rvdAJiPqPYiIHqW8FFo",
    authDomain: "beanbenz-2618.firebaseapp.com",
    projectId: "beanbenz-2618",
    storageBucket: "beanbenz-2618.firebasestorage.app",
    messagingSenderId: "650231320064",
    appId: "1:650231320064:web:abe69eda14942e0c8e52e5",
    measurementId: "G-94M2SHPPHC"
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
