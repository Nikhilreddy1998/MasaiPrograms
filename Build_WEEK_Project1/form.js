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

const pages = document.querySelectorAll(".page");
const nextButtons = document.querySelectorAll(".next-btn");
const prevButtons = document.querySelectorAll(".prev-btn");
const steps = document.querySelectorAll(".progress-bar .step");
const submitButton = document.getElementById("submit-btn");
const applyButton = document.getElementById("apply-button");

let currentPageIndex = 0;

function showPage(index) {
  pages.forEach((page) => page.classList.remove("active"));
  steps.forEach((step) => step.classList.remove("active"));
  pages[index].classList.add("active");
  for (let i = 0; i <= index; i++) {
    steps[i].classList.add("active");
  }
  currentPageIndex = index;
  updateNavigationButtons();
  if (currentPageIndex === pages.length - 1) {
    checkLoanEligibility();
  }
}

function updateNavigationButtons() {
  nextButtons.forEach((button) => (button.style.display = "none"));
  prevButtons.forEach((button) => (button.style.display = "none"));
  submitButton.style.display = "none";
  applyButton.disabled = true;

  if (currentPageIndex < pages.length - 1) {
    const activePage = pages[currentPageIndex];
    const nextButton = activePage.querySelector(".next-btn");
    if (nextButton) {
      nextButton.style.display = "inline-block";
    }
  }

  if (currentPageIndex > 0) {
    const activePage = pages[currentPageIndex];
    const prevButton = activePage.querySelector(".prev-btn");
    if (prevButton) {
      prevButton.style.display = "inline-block";
    }
  }

  if (currentPageIndex === pages.length - 1) {
    submitButton.style.display = "inline-block";
  }
}

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextPageId = button.getAttribute("data-next");
    const nextPageIndex = Array.from(pages).findIndex(
      (page) => page.id === nextPageId
    );
    if (nextPageIndex !== -1) {
      showPage(nextPageIndex);
    }
  });
});

prevButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const prevPageId = button.getAttribute("data-prev");
    const prevPageIndex = Array.from(pages).findIndex(
      (page) => page.id === prevPageId
    );
    if (prevPageIndex !== -1) {
      showPage(prevPageIndex);
    }
  });
});

function checkLoanEligibility() {
  const income = parseFloat(document.getElementById("income").value);
  const loanAmount = parseFloat(document.getElementById("loan-amount").value);
  const loanTenure = parseInt(document.getElementById("loan-tenure").value);
  const eligibilityMessage = document.getElementById("eligibility-message");
  const eligibleLoansSection = document.getElementById("eligible-loans");
  const ineligibleMessage = document.getElementById("ineligible-message");
  const loanOptionsList = document.getElementById("loan-options");

  loanOptionsList.innerHTML = "";
  eligibleLoansSection.style.display = "none";
  ineligibleMessage.style.display = "none";
  eligibilityMessage.textContent = "Checking loan eligibility...";

  setTimeout(() => {
    let eligible = false;
    const offeredLoans = [];

    if (income >= 30000 && loanAmount <= 500000 && loanTenure <= 36) {
      eligible = true;
      offeredLoans.push("Personal Loan");
    }
    if (income >= 50000 && loanAmount <= 1000000 && loanTenure <= 60) {
      eligible = true;
      offeredLoans.push("Home Improvement Loan");
    }
    if (income >= 25000 && loanAmount <= 200000 && loanTenure <= 24) {
      eligible = true;
      offeredLoans.push("Two-Wheeler Loan");
    }

    eligibilityMessage.textContent = "";
    if (eligible) {
      eligibleLoansSection.style.display = "block";
      offeredLoans.forEach((loan) => {
        const li = document.createElement("li");
        li.textContent = loan;
        loanOptionsList.appendChild(li);
      });
      applyButton.disabled = false;
    } else {
      ineligibleMessage.style.display = "block";
    }
  }, 1500); // Simulate processing time
}

submitButton.addEventListener("click", () => {
  alert("Loan application submitted!");
});

applyButton.addEventListener("click", () => {
  const selectedLoan = document.querySelector(
    "#loan-options li:first-child"
  )?.textContent;
  if (selectedLoan) {
    alert(
      `Applying for a ${selectedLoan}. Further steps will be communicated.`
    );
  } else {
    alert("No eligible loan selected.");
  }
});

showPage(0);

// const submitButton = document.getElementById('submit-btn');

// Listen to submit click
submitButton.addEventListener("click", async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Get form data
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const address = document.getElementById("address").value;

      const income = parseFloat(document.getElementById("income").value);
      const employment = document.getElementById("employment").value;

      const loanAmount = parseFloat(
        document.getElementById("loan-amount").value
      );
      const loanPurpose = document.getElementById("loan-purpose").value;
      const loanTenure = parseInt(document.getElementById("loan-tenure").value);

      // Create document data
      const applicationData = {
        name,
        email,
        phone,
        address,
        income,
        employment,
        loanAmount,
        loanPurpose,
        loanTenure,
        submittedAt: new Date(),
      };

      try {
        // Save to Firestore
        await setDoc(doc(db, "loanApplications", user.uid), applicationData);
        alert("Loan application submitted and saved to Firestore!");
      } catch (error) {
        console.error("Error saving application:", error);
        alert("Failed to save application.");
      }
    } else {
      alert("User not logged in. Please login first.");
    }
  });
});
