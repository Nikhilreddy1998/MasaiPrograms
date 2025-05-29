import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBSWGbvXBrhTclMd6cg2vJYwQ5ArdpnX8g",
  authDomain: "react-redux-2d261.firebaseapp.com",
  databaseURL: "https://react-redux-2d261-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "react-redux-2d261",
  storageBucket: "react-redux-2d261.firebasestorage.app",
  messagingSenderId: "1048320111989",
  appId: "1:1048320111989:web:00e78eb975ef28ad000f3c",
  measurementId: "G-T2Y6ZSWVMC"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const BOOKMARKS_NODE = 'bookmarkedPremises';
export { database };