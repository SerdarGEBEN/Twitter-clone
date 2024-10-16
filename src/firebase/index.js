import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCuwz8gFAsUjsydiv79o75sGymooR3-1NM",
  authDomain: "hi-twitter-d52c8.firebaseapp.com",
  projectId: "hi-twitter-d52c8",
  storageBucket: "hi-twitter-d52c8.appspot.com",
  messagingSenderId: "710644651056",
  appId: "1:710644651056:web:f0f090dcf714035b4d09f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth referansını al
export const auth = getAuth(app);

//google sağlayıcısını kur
export const provider = new GoogleAuthProvider();

// veri tabanının referansını al
export const db = getFirestore(app);

//storage referansını al
export const storage = getStorage(app);
