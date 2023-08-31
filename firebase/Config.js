// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQR8Zo0VNqdf3vtIgih3PSjLIUXZlW34U",
  authDomain: "ecommerce-next-d1325.firebaseapp.com",
  projectId: "ecommerce-next-d1325",
  storageBucket: "ecommerce-next-d1325.appspot.com",
  messagingSenderId: "1098110268969",
  appId: "1:1098110268969:web:8925e593581dcb3fb60e38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export default storage