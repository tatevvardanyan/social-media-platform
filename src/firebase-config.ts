import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvbKXFhrgpyTPsG5HApJO9mJ2DheRLjKE",
  authDomain: "small-social-media-platform.firebaseapp.com",
  projectId: "small-social-media-platform",
  storageBucket: "small-social-media-platform.appspot.com",
  messagingSenderId: "178521738333",
  appId: "1:178521738333:web:e95b1b57c17db654b1d1b4",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
