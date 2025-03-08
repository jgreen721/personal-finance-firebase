import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9Vf5uTxggSRU7eUElFZj7ZG5uMT9FzOM",
  authDomain: "financial-tracker-app-89d41.firebaseapp.com",
  projectId: "financial-tracker-app-89d41",
  storageBucket: "financial-tracker-app-89d41.firebasestorage.app",
  messagingSenderId: "881770353495",
  appId: "1:881770353495:web:98a222db77456c1bb46412",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const app = "offline";

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
