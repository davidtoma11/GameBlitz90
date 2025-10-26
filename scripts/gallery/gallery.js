const logo = document.getElementById("logo");
const light_button = document.getElementById("brightness_toogle");

logo.addEventListener('dblclick', () => {
    logo.classList.toggle('bright');
});

light_button.addEventListener('click', () => {
    document.querySelectorAll(".box").forEach(el => {
        el.classList.toggle("bright");
    });
    logo.classList.toggle('bright');
    light_button.classList.toggle("bright");
    playSound("info");
});

