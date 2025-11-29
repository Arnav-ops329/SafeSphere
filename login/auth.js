console.log("auth.js loaded");

// SWITCH PANELS
const container = document.getElementById("container");
const signUpBtn = document.getElementById("signUp");
const signInBtn = document.getElementById("signIn");

signUpBtn.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signInBtn.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

// LOGIN FUNCTION
function loginUser() {
    let email = document.getElementById("loginEmail").value;
    let pass = document.getElementById("loginPass").value;
    let msg = document.getElementById("loginMsg");

    if (email === "" || pass === "") {
        msg.textContent = "All fields required!";
        return;
    }

    msg.style.color = "green";
    msg.textContent = "Login successful! Redirecting...";

    // Store login flag
    localStorage.setItem("loggedIn", "true");

    setTimeout(() => {
        // ✔ Correct Redirect Path
        window.location.href = "/Frontend/index.html";
    }, 1200);
}

// SIGNUP FUNCTION
function signupUser() {
    let n = document.getElementById("signupName").value;
    let e = document.getElementById("signupEmail").value;
    let p = document.getElementById("signupPass").value;
    let msg = document.getElementById("signupMsg");

    if (n === "" || e === "" || p === "") {
        msg.textContent = "All fields required!";
        return;
    }

    msg.style.color = "green";
    msg.textContent = "Account created!";
}
