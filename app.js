// Firebase config from your Firebase Console (fill yours in)
const firebaseConfig = {
  apiKey: "AIzaSyDZkY748LmNNlWKi2s24_xOsYD9-SLe4W4",
  authDomain: "smartcents-2b824.firebaseapp.com",
  projectId: "smartcents-2b824",
  storageBucket: "smartcents-2b824.firebasestorage.app",
  messagingSenderId: "411677208238",
  appId: "1:411677208238:web:9d6762aa6d9b2ec336473f"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const emailInput = document.getElementById("emailInput");
const sendOtpBtn = document.getElementById("sendOtpBtn");
const authSection = document.getElementById("authSection");
const dashboard = document.getElementById("dashboard");

// --------------------------
// 1. Send Sign-In Email Link
// --------------------------
sendOtpBtn.addEventListener("click", () => {
  const email = emailInput.value;
  if (!email) return alert("Please enter your email");

  const actionCodeSettings = {
    url: "https://danepretorius.github.io/SmartCents",
    handleCodeInApp: true,
  };

  auth.sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => {
      alert("OTP email sent! Check your inbox.");
      window.localStorage.setItem("emailForSignIn", email);
    })
    .catch(error => alert("Error sending email link: " + error.message));
});

// -----------------------------
// 2. Check if link was clicked
// -----------------------------
window.addEventListener("load", () => {
  if (auth.isSignInWithEmailLink(window.location.href)) {
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = prompt("Please provide your email for confirmation");
    }

    auth.signInWithEmailLink(email, window.location.href)
      .then(() => {
        window.localStorage.removeItem("emailForSignIn");
        authSection.style.display = "none";
        dashboard.style.display = "block";
        loadSavedData();
      })
      .catch(error => {
        console.error(error);
        alert("Error verifying link: " + error.message);
      });
  }
});

// ----------------------
// 3. Budget Calculator
// ----------------------
const netSalaryInput = document.getElementById("netSalary");
const expenseInputs = document.querySelectorAll(".expense");
const balanceOutput = document.getElementById("balanceOutput");

document.getElementById("calculateBalance").addEventListener("click", () => {
  const net = parseFloat(netSalaryInput.value) || 0;
  let totalExpenses = 0;

  expenseInputs.forEach(input => {
    totalExpenses += parseFloat(input.value) || 0;
  });

  const balance = net - totalExpenses;
  balanceOutput.textContent = balance.toFixed(2);

  // Save to localStorage
  saveData(net, totalExpenses, balance);
});

// ----------------------
// 4. Save/Load Functions
// ----------------------
function saveData(net, expenses, balance) {
  const data = {
    net, expenses, balance,
    timestamp: new Date().toISOString()
  };
  localStorage.setItem("smartcents_data", JSON.stringify(data));
}

function loadSavedData() {
  const data = JSON.parse(localStorage.getItem("smartcents_data"));
  if (!data) return;

  netSalaryInput.value = data.net;
  const values = Object.values(data);
  balanceOutput.textContent = data.balance.toFixed(2);
}
