const container = document.getElementById("container");
const signUpBtn = document.getElementById("signUp");
const signInBtn = document.getElementById("signIn");

signUpBtn.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

signInBtn.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

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

    setTimeout(() => {
        // ⭐ THIS IS THE CORRECT LOCATION
        window.location.href = "../website/index.html";  
    }, 1200);
}

