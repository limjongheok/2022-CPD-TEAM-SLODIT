// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from  "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIDnKX0ET6xrpTjak2XLQJMao6PUk7Fwk",
  authDomain: "cpd-team-slowdit.firebaseapp.com",
  databaseURL: "https://cpd-team-slowdit-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "cpd-team-slowdit",
  storageBucket: "cpd-team-slowdit.appspot.com",
  messagingSenderId: "995305833470",
  appId: "1:995305833470:web:576ace7a6e10e5c03db6af",
  measurementId: "G-MC0TTKEYBN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);