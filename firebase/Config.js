// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkNHqCiVBe3Eleuvx08RE65GKdXyxeWFQ",
  authDomain: "ecommerce-2b15a.firebaseapp.com",
  projectId: "ecommerce-2b15a",
  storageBucket: "ecommerce-2b15a.appspot.com",
  messagingSenderId: "780853580479",
  appId: "1:780853580479:web:0192f5d2092ce5da83ec0a",
  measurementId: "G-19RPPCMXQX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export default storage;
