// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app"; // <-- UPDATED: Added getApp and getApps
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
// 1. IMPORT AUTH UTILITIES
import { getAuth } from 'firebase/auth';

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

// Initialize Firebase safely without throwing duplicate application node errors
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Optional: Initialize analytics if you plan to use it in your app
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export const database = getDatabase(app);
// 2. EXPORT THE AUTH INSTANCE
export const auth = getAuth(app);