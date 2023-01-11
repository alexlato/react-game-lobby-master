import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBYPK2dWqIXU4i6jn5tjqMN4sYcw2rKcQM",
  authDomain: "react-game-lobby-ece8f.firebaseapp.com",
  projectId: "react-game-lobby-ece8f",
  storageBucket: "react-game-lobby-ece8f.appspot.com",
  messagingSenderId: "525928660250",
  appId: "1:525928660250:web:5502b5196e09706b7280a3",
  measurementId: "G-KXE7JMQE3M",
});

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = app.auth();
export default app;
