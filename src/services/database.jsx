import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

const firebaseConfigData = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY_DATA,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN_DATA,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID_DATA,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET_DATA,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID_DATA,
  appId: import.meta.env.VITE_FIREBASE_APPID_DATA,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const appData = initializeApp(firebaseConfigData, "data");
export const dbData = getFirestore(appData);
export const authData = getAuth(appData);
