// for info button
const overlay = document.getElementById("overlay");
const closeOverlayBtn = document.getElementById("closeOverlay");

// open info
document.querySelector(".button.info").addEventListener("click", () => {
    overlay.classList.add("show");
    playSound("info");
});

// close info 
closeOverlayBtn.addEventListener("click", () => {
    overlay.classList.remove("show");
    playSound("info");
});
