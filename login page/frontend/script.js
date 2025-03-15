async function signup() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const result = await response.json();
    if (response.ok) {
        alert("Signup successful!");
        window.location.href = "login.html";
    } else {
        alert(result.error);
    }
}

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result.user));
        window.location.href = "profile.html";
    } else {
        alert(result.error);
    }
}
// Load profile details from localStorage
function loadProfile() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.name || !user.email) {
        alert("No user data found. Please log in.");
        window.location.href = "login.html";
        return;
    }

    // Display user data on the profile page
    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-email").textContent = user.email;
}

// Ensure this runs only on the profile page
if (window.location.pathname.includes("profile.html")) {
    loadProfile();
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}
