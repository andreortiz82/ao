// @ts-ignore
// @ts-nocheck

const TEMP_PASS = "xxx";

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

document.addEventListener("DOMContentLoaded", function () {
  //setloading
  function checkAuth() {
    const token = localStorage.getItem("userToken");
    if (token) {
      document.getElementById("protectedContent").style.display = "block";
      document.getElementById("nonProtectedContent").style.display = "none";
    } else {
      document.getElementById("protectedContent").style.display = "none";
      document.getElementById("nonProtectedContent").style.display = "block";
    }
  }

  // Initial check
  checkAuth();

  // Get the value from passwordInput and compare it to fakeToken
  document.getElementById("loginButton").addEventListener("click", function () {
    const password = document.getElementById("passwordInput").value;
    if (password === TEMP_PASS) {
      localStorage.setItem("userToken", TEMP_PASS);
      checkAuth();
    } else {
      alert(getErrorMessage());
    }
  });

  // Simulate login

  // Simulate logout
  document
    .getElementById("logoutButton")
    .addEventListener("click", function () {
      localStorage.removeItem("userToken");
      checkAuth();
    });
});
