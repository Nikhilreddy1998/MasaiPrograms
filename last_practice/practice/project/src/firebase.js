import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCgYM5ILJYexxxxxxxxxxxxxxxxxxxx",
  authDomain: "food-hygiene-explorer.firebaseapp.com",
  databaseURL: "https://food-hygiene-explorer-default-rtdb.firebaseio.com",
  projectId: "food-hygiene-explorer",
  storageBucket: "food-hygiene-explorer.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef1234567890abcdef"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);