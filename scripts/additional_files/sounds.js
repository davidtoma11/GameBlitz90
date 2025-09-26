const sounds = {
    hover: new Audio("../../assets/sounds/clicking-interface-select-201946.mp3"),
    drop: new Audio("../../assets/sounds/drop-coin-384921.mp3"),
    drop2: new Audio("../../assets/sounds/ring-drop-263966.mp3"),
    win: new Audio("../../assets/sounds/shine-11-268907.mp3"),
    reset: new Audio("../../assets/sounds/clear-combo-4-394493.mp3"),
    highscore: new Audio("../../assets/sounds/level-up-07-383747.mp3"),
    gameOver: new Audio("../../assets/sounds/mixkit-arcade-retro-game-over-213.wav"),
    menu: new Audio("../../assets/sounds/mixkit-page-back-chime-1108.wav"),
    win_line: new Audio("../../assets/sounds/click-47609.mp3"),
    x: new Audio("../../assets/sounds/37-enter-100035.mp3"),
    info: new Audio("../../assets/sounds/sound-1-167181.mp3"),
    o: new Audio("../../assets/sounds/low-button-click-331780.mp3"),
    light_switch: new Audio("../../assets/sounds/light-switch-81967.mp3")
}


function playSound(sound) {
    if (sounds[sound]) {
        sounds[sound].currentTime = 0;
        sounds[sound].play();
    }
}

// menu button
const menu = document.getElementsByClassName("menu")[0];
menu.addEventListener("click", () => {
    window.location.href = "../gallery/gallery.html";
});
