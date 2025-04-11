import { auth, db } from "./firebase-config.js";
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-btn");
  const signupBtn = document.getElementById("signup-btn");
  const logout = document.getElementById("logout-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // redirect the user dashboard page
        window.open("index.html", "_blank");
      } catch (error) {
        document.getElementById("login-message").innerText =
          "Error in loggin in";
      }
    });
  }

  // sign up
  if (signupBtn) {
    signupBtn.addEventListener("click", async () => {
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const role = document.getElementById("role").value;
      // authenticate the user
      try {
        const usercredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        alert('User loggen In succesfully')
        //store the data in cloud firestore database;
        await setDoc(doc(db, "users", usercredential.user.uid), {
          email,
          role,
        });
        //redirect the user to login page
        window.location.href = "login.html";
      } catch (error) {
        document.getElementById("signup-message").innerText = error.message;
      }
    });
  }

  //   logout
  if (logout) {
    logout.addEventListener("click", async () => {
      await signOut(auth);
      window.location.href = "index.html";
    });
  }
});
