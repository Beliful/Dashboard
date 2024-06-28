// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ6z93-P7PigROg1WCCh73UD8pn9bkrIs",
  authDomain: "plansdemo-91f02.firebaseapp.com",
  projectId: "plansdemo-91f02",
  storageBucket: "plansdemo-91f02.appspot.com",
  messagingSenderId: "753473006786",
  appId: "1:753473006786:web:4d30f335468dc7924f1f5b",
  measurementId: "G-F67K03C1BX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);