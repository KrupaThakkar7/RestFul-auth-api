const toggleBtn = document.getElementById('toggle-btn');
const toggleSpan = document.getElementById('toggle-span');

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");
    toggleBtn.innerHTML = isLight ? `<i class='fa-sharp fa-regular fa-moon'></i>` : `<i class='fa-sharp fa-regular fa-sun-bright'></i>`;
    toggleSpan.innerText = isLight ? "Switch to Dark theme" : "switch to light theme";
});