// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLXPI4Zw7edU77h3lAmEI1RxUEMOHpOPM",
  authDomain: "my-jym-db.firebaseapp.com",
  projectId: "my-jym-db",
  storageBucket: "my-jym-db.firebasestorage.app",
  messagingSenderId: "706360406699",
  appId: "1:706360406699:web:67fe84d15c41b5bba4fdee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services taake pure project mein use ho saken
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;