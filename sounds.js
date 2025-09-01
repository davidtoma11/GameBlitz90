const sounds = {
    hover: new Audio("sounds/clicking-interface-select-201946.mp3"),
    drop: new Audio("sounds/drop-coin-384921.mp3"),
    drop2: new Audio("sounds/ring-drop-263966.mp3"),
    win: new Audio("sounds/shine-11-268907.mp3"),
    reset: new Audio("sounds/clear-combo-4-394493.mp3"),
    highscore: new Audio("sounds/level-up-07-383747.mp3"),
    gameOver: new Audio("sounds/mixkit-arcade-retro-game-over-213.wav"),
    menu: new Audio("sounds/mixkit-page-back-chime-1108.wav"),
    win_line: new Audio("sounds/click-47609.mp3"),
    x: new Audio("sounds/sound-1-167181.mp3"),
    o: new Audio("sounds/low-button-click-331780.mp3")
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
    window.location.href = "gallery.html";
});
