// @ts-ignore
// @ts-nocheck

const TEMP_PASS = "AO!25";

const errorMessages = [
  "Incorrect! Contact me and I'll help you out.",
  "Wrong password, pal. Contact me and I'll help you out.",
  "Not quite right.",
  "Nope, try again.",
  "Contact me and I'll help you out.",
  "You're not getting in that way.",
  "That was close... but no.",
];

const getErrorMessage = () => {
  const index = Math.floor(Math.random() * errorMessages.length);

  return errorMessages[index];
};

function checkAuth() {
  const token = localStorage.getItem("userToken");
  const protectedContent = document.getElementById("protectedContent");
  const nonProtectedContent = document.getElementById("nonProtectedContent");
  if (token) {
    if (protectedContent) {
      protectedContent.style.display = "block";
    }
    if (nonProtectedContent) {
      nonProtectedContent.style.display = "none";
    }
  } else {
    if (protectedContent) {
      protectedContent.style.display = "none";
    }
    if (nonProtectedContent) {
      nonProtectedContent.style.display = "block";
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Initial check
  checkAuth();

  document.getElementById("loginButton").addEventListener("click", function () {
    const password = document.getElementById("passwordInput").value;
    if (password === TEMP_PASS) {
      localStorage.setItem("userToken", TEMP_PASS);
      checkAuth();
    } else {
      alert(getErrorMessage());
    }
  });
});

// Simulate logout
document.getElementById("logoutButton").addEventListener("click", function () {
  localStorage.removeItem("userToken");
  checkAuth();
  // Redirect to the main page
  window.location.href = "/work";
});
