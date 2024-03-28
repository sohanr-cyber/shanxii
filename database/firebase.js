// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlh5u67gjlPf7_FkUp5mfNHq5fK1tzrF0",
  authDomain: "lms-926e5.firebaseapp.com",
  projectId: "lms-926e5",
  storageBucket: "lms-926e5.appspot.com",
  messagingSenderId: "204689245006",
  appId: "1:204689245006:web:7bdc95c8af0e6c276d941f",
  measurementId: "G-BGDW55GPW7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
