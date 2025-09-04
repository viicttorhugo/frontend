// Inicialização do Firebase para Web
// Se você já tem um arquivo parecido, mantenha o seu e apenas garanta que esteja sendo importado em main.tsx.
import { initializeApp, getApps } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider } from "firebase/auth";

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

if (!getApps().length) {
  initializeApp(cfg);
  // persistência local para manter login
  const auth = getAuth();
  setPersistence(auth, browserLocalPersistence);
}

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
