const toggleBtn = document.getElementById('toggle-btn');
const toggleSpan = document.getElementById('toggle-span');

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");
    toggleBtn.innerHTML = isLight ? `<i class='fa-sharp fa-regular fa-moon'></i>` : `<i class='fa-sharp fa-regular fa-sun-bright'></i>`;
    toggleSpan.innerText = isLight ? "Switch to Dark theme" : "switch to light theme";
});

let registrationForm = document.getElementById('registration-form');

registrationForm.addEventListener("submit", (e) => {

    let pswd = document.getElementById('pswd').value;
    let cpswd = document.getElementById('cpswd').value;

    if (pswd !== cpswd) {
        alert("Password should be same !");
        e.preventDefault();
    }
})



