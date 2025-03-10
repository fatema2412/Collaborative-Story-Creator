// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCujqAwg6F0RnZfOzfhYnAZBSsh4g3rtXs",
  authDomain: "story-creation-6aff7.firebaseapp.com",
  projectId: "story-creation-6aff7",
  storageBucket: "story-creation-6aff7.firebasestorage.app",
  messagingSenderId: "175320498303",
  appId: "1:175320498303:web:18d4c89dfd68f1c555bf4a"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
 export const auth=getAuth(app)