const apiUrl = "http://localhost:3000";

// function to check if the user is logged in

function checkAuth() {
  const token = localStorage.getItem("token");

  if (token) {
    // show logout section hide login and signup forms
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("logout-section").style.display = "block";
  } else {
    // show login form by default and hide others
    document.getElementById("login-form").style.display = "block";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("logout-section").style.display = "none";
  }
}

function showSignup() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("signup-form").style.display = "block";
}

function showLogin() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("signup-form").style.display = "none";
}

// handle user signup

async function signup() {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const response = await fetch(`${apiUrl}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    console.log(data);
    alert(data.message || data.error);
    if (data.message) {
      showLogin();
    }
  } catch (error) {
    alert("error signing up");
  }
}

// handle user loginn

const login = async () => {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  try {
    const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("login successful");
      checkAuth();
    } else {
      alert(data.error);
    }
  } catch (error) {
    alert("error logging in");
  }
};

// handle user logout

async function logout() {
  localStorage.removeItem("token");
  alert("logged out successfully");
  checkAuth();
}

document.addEventListener("DOMContentLoaded", checkAuth);
