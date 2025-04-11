import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import{getAuth} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import{getFirestore} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyCx94xs4DnoxBLiONdCjdakcjzCg81lLEU",
    authDomain: "auth-a15d3.firebaseapp.com",
    projectId: "auth-a15d3",
    storageBucket: "auth-a15d3.firebasestorage.app",
    messagingSenderId: "362370838562",
    appId: "1:362370838562:web:2795dfde68d105595a9a7b",
    measurementId: "G-JF19L43RFV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const db = getFirestore(app);
