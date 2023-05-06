import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDL2u_s1p-BC8YYk5djN9hxJA1Ip2ecVvk",
  authDomain: "whats-app-cab31.firebaseapp.com",
  projectId: "whats-app-cab31",
  storageBucket: "whats-app-cab31.appspot.com",
  messagingSenderId: "100197247453",
  appId: "1:100197247453:web:bccd30644bd7d253d86e34",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
