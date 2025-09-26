// variables
cells = document.querySelectorAll(".cell");
const reset_button = document.getElementsByClassName("reset")[0];
let currentPlayer = Math.random() < 0.5 ? "X" : "O"; // random currentPlayer player
let board = Array(9).fill(null); // game board
let x_points = 0, o_points = 0;
let x_points_EL = document.getElementById("x_points");
let o_points_EL = document.getElementById("0_points");
const winningLine = document.getElementById("winning-line");
let winningCombo = [];


const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]           // diagonal
];

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {

        if (board[index]) return; // to avoid overwriting
        cell.classList.add('active', currentPlayer); 
        if(currentPlayer === "X")
            playSound("x");
        else
            playSound("x");

        board[index] = currentPlayer; // fill the cell

        if (checkWinner(currentPlayer)) {
            if (currentPlayer === "X") {
                x_points++;
                x_points_EL.innerHTML = x_points;
            } else {
                o_points++;
                o_points_EL.innerHTML = o_points;
            }

            drawWinningLine(winningCombo);

            setTimeout(() => {
                resetTable();
            }, 2000); 

            return;
        }

        if (board.every(cell => cell)) {
            resetTable();
            return;
        }

        // change player
        currentPlayer = (currentPlayer === "X") ? "O" : "X";
    });
});


// check for a winning combo
function checkWinner(player) {
    for (let combo of winningCombos) {
        if (combo.every(index => board[index] === player)) {
            winningCombo = combo; // find the winning combo
            return true;
        }
    }
    return false;
}

// reset game
function resetTable() {
    board = Array(9).fill(null); // reset table
    cells.forEach(cell => {
        cell.classList.remove("active", "X", "O");
    });

    winningLine.classList.remove('visible'); // remove the line
    currentPlayer = Math.random() < 0.5 ? "X" : "O"; // new first player
    startAnimation(currentPlayer);
}
reset_button.addEventListener("click", () => { playSound("reset"); resetTable(); x_points = 0; o_points = 0; x_points_EL.innerHTML = x_points; o_points_EL.innerHTML = o_points; })



function drawWinningLine(combo) {
    playSound("win_line");

    const startCell = cells[combo[0]];
    const endCell = cells[combo[combo.length - 1]];

    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    let startX, startY, endX, endY;
    let transformOrigin = "left center";

    // horizontal
    if (startRect.top === endRect.top) {
        startX = startRect.left;
        startY = startRect.top + startRect.height / 2;
        endX = endRect.right;
        endY = startY;
    }
    // vertical
    else if (startRect.left === endRect.left) {
        startX = startRect.left + startRect.width / 2;
        startY = startRect.top;
        endX = startX;
        endY = endRect.bottom;
    }
    // diagonals
    else {
        // ↗
        if (combo[0] === 0) { 
            startX = startRect.left;
            startY = startRect.top;
            endX = endRect.right;
            endY = endRect.bottom;
        } 
        // ↘
        else { 
            startX = startRect.right;
            startY = startRect.top;
            endX = endRect.left;
            endY = endRect.bottom;
        }

        transformOrigin = "top left";
    }

    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

    winningLine.style.transition = "none";
    winningLine.style.width = "0px";
    winningLine.style.top = startY + "px";
    winningLine.style.left = startX + "px";
    winningLine.style.transformOrigin = transformOrigin;
    winningLine.style.transform = `rotate(${angle}deg)`;

    void winningLine.offsetWidth;

    winningLine.style.transition = "width 0.3s ease";
    winningLine.style.width = length + "px";

    winningLine.classList.add("visible");
}


// to identify who is first
function startAnimation(currentPlayer, opacity = 0.2, duration = 0.3) {

    // currentPlayer blink
    cells.forEach(cell => {
        cell.classList.add("active");
        cell.classList.add(currentPlayer);
        cell.style.opacity = opacity;
    });

    setTimeout(() => {
        cells.forEach(cell => {
            cell.style.opacity = "";
            cell.classList.remove(currentPlayer);
            cell.classList.remove("active");
        });
    }, 1000 * duration);

    // second blink
    setTimeout(() => {
        cells.forEach(cell => {
            cell.classList.add("active");
            cell.classList.add(currentPlayer);
            cell.style.opacity = opacity;
        });
    }, 2000 * duration);

    setTimeout(() => {
        cells.forEach(cell => {
            cell.style.opacity = "";
            cell.classList.remove(currentPlayer);
            cell.classList.remove("active");
        });
    }, 3000 * duration);
}


startAnimation(currentPlayer);



