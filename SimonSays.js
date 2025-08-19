// margins script 
const colors = ["#FFCA3F", "#2DB34A", "#68CFF1", "#D32D20"];
const left = document.querySelector(".lines-left");
const right = document.querySelector(".lines-right");

function generateLines(container, count, align) {
    for (let i = 0; i < count; i++) {
        const line = document.createElement("div");
        line.classList.add("line");

        // random size
        const length = (Math.random() * (10 - 5) + 5).toFixed(1);
        line.style.width = length + "vw";

        // random color
        line.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        line.style.alignSelf = align;

        container.appendChild(line);
    }
}

generateLines(left, 36, "flex-start");
generateLines(right, 36, "flex-end");

// light transition effect
const lines = document.querySelectorAll(".line");
lines.forEach(line => {
    line.addEventListener('click', () => {
        line.classList.toggle('clicked');

        line.style.filter = 'opacity(0.1)';

        setTimeout(() => {
            line.classList.toggle('clicked');
            line.style.filter = '';
        }, 5000);
    });

});


// main squares
const pads = {
    red: document.getElementById("red"),
    green: document.getElementById("green"),
    blue: document.getElementById("blue"),
    yellow: document.getElementById("yellow")
}

let sequence = [];
let mySequence = [];
let score = 0;
let highscore = 0;
const scoreEL = document.getElementById("score")
const highscoreEL = document.getElementById("highscore");
const game_colors = ["red", "green", "blue", "yellow"];
let canHover = true; 


function flashPad(color) {
    const square = pads[color];
    square.classList.toggle("active");
    setTimeout(() => { square.classList.toggle("active"); }, 200)
}

// point 0 of game
function startGame() {
    score = 0;
    sequence = [];
    nextRound();
}


function nextRound() {
    mySequence = [];
    scoreEL.innerHTML = score;
    const randomColor = game_colors[Math.floor(Math.random() * game_colors.length)];
    sequence.push(randomColor);
    showSequence();
}

function showSequence() {
    // disable hover
    hover_toogle(false); 
    for (let i = 0; i < sequence.length; i++) {
        setTimeout(() => {
            flashPad(sequence[i]);
            if (i === sequence.length - 1) {
                setTimeout(() => hover_toogle(true), 800); // enable hover
            }
        }, i * 500);
    }
}


// click on a pad
Object.keys(pads).forEach(color => {
    pads[color].addEventListener("click", () => handleClick(color));
});


function handleClick(color) {
    // player pov
    mySequence.push(color);
    const step = mySequence.length - 1;

    // for mistake
    if (mySequence[step] !== sequence[step]) {
        gameOver();
        return;
    }

    // for complete sequence => next
    if (mySequence.length === sequence.length) {
        score++;
        setTimeout(nextRound, 1500);
    }
}

function gameOver() {
    // update highscore
    if (score > highscore) {
        highscore = score;
        highscoreEL.innerHTML = "Highscore: " + highscore;
        scoreEL.innerHTML = "X";
    }

    // new game
    setTimeout(startGame, 1000);
}

// visual bug
function hover_toogle(enable) {
    canHover = enable;
    for (let color in pads) {
        if (enable) {
            pads[color].classList.add("hoverable");
        } else {
            pads[color].classList.remove("hoverable");
        }
    }
}



startGame();

// reset button
const reset_button = document.getElementsByClassName("reset")[0];
reset_button.addEventListener("click", () => { gameOver(); highscore = 0; highscoreEL.innerHTML = "Highscore: " + highscore; })