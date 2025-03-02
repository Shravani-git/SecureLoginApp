document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    fetch("http://localhost:3000/admin/add-user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("regMessage").textContent = data.msg;
        if (data.msg === "User added successfully!") {
            showLogin();
        }
    })
    .catch(error => console.error("Error:", error));
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.msg.startsWith("Welcome")) {
            document.getElementById("welcomeMessage").textContent = data.msg;
            showWelcome();
        } else {
            document.getElementById("loginMessage").textContent = data.msg;
        }
    })
    .catch(error => console.error("Error:", error));
});

function showLogin() {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("loginForm").style.display = "block";
}

function showWelcome() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("welcome").style.display = "block";
}

function logout() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}
