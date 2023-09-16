import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBjLKAIy_Mgw8lbjb2C32VJyUMm-zPtURI",
  authDomain: "talkitout-23913.firebaseapp.com",
  projectId: "talkitout-23913",
  storageBucket: "talkitout-23913.appspot.com",
  messagingSenderId: "595758044244",
  appId: "1:595758044244:web:7a9d7493a72bb885e509c1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();

