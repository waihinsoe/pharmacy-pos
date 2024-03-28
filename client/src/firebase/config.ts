// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCd_J3RWOr1eWX7p-agP6flPctEetaizAs",
  authDomain: "pharmacy-pos-56ae6.firebaseapp.com",
  projectId: "pharmacy-pos-56ae6",
  storageBucket: "pharmacy-pos-56ae6.appspot.com",
  messagingSenderId: "536738006326",
  appId: "1:536738006326:web:c552473183d711f38e1f97",
  measurementId: "G-RPZSCFG9C7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const imageDB = getStorage(app);
