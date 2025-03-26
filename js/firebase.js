// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEhnj7j-Y6ItDLUJQmMnf_4FMJF72DZ28",
  authDomain: "fe24-vs-grupp1-slutprojekt.firebaseapp.com",
  projectId: "fe24-vs-grupp1-slutprojekt",
  storageBucket: "fe24-vs-grupp1-slutprojekt.firebasestorage.app",
  messagingSenderId: "590958696412",
  appId: "1:590958696412:web:ba8e575607c490a89c6119"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);