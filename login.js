const userName = document.getElementById("userName")
const userPass = document.getElementById("userPass")
const signBtn = document.getElementById("signBtn")
// Login to home page connection

signBtn.addEventListener("click", () => {
    if (userName.value === "admin" && userPass.value === "admin123") {
        window.location.href = "home.html";
    }

});
