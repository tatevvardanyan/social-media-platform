import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXlRr38cPBEHvX54uRtdQEAGOnr7uUv54",
  authDomain: "smmp-1a858.firebaseapp.com",
  projectId: "smmp-1a858",
  storageBucket: "smmp-1a858.appspot.com",
  messagingSenderId: "321158608181",
  appId: "1:321158608181:web:756e73520598b6285a487c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
