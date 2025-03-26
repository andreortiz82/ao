// @ts-ignore
// @ts-nocheck

const TEMP_PASS = "xxx";

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
      alert("Invalid password");
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
