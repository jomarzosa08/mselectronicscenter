// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYQ162i5V1wT6LmZ85uFPkyh6Upf8zI9w",
  authDomain: "ms-electronics-center.firebaseapp.com",
  databaseURL: "https://ms-electronics-center-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ms-electronics-center",
  storageBucket: "ms-electronics-center.firebasestorage.app",
  messagingSenderId: "3178386689",
  appId: "1:3178386689:web:8f69f85bbf78b17281f700",
  measurementId: "G-0KLNY0JR4Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);