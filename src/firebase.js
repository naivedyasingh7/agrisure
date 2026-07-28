// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCbjfXIAb0I0Zr8sKovnBdfgN5-K-MmUeA",
    authDomain: "bytehounds-2078d.firebaseapp.com",
    projectId: "bytehounds-2078d",
    storageBucket: "bytehounds-2078d.firebasestorage.app",
    messagingSenderId: "863011871292",
    appId: "1:863011871292:web:b77b958314ea40e5bf4139",
    measurementId: "G-EW1V41HJ8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics requires browser environment support checks in some setups
let analytics = null;
isSupported().then((supported) => {
    if (supported) {
        analytics = getAnalytics(app);
    }
});

export { app, analytics };