const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const gameContainer = document.getElementById("game-container");
const loginContainer = document.getElementById("login-container");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        loginContainer.style.display = "none";
        gameContainer.style.display = "flex";
        startGame();
    } else {
        loginMessage.style.display = "block";
    }
});
