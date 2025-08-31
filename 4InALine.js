// variables
const rows = 6;
const cols = 7;
const board = [];
let currentPlayer = Math.random() < 0.5 ? "orange" : "blue";

let orange_points = 0;
let blue_points = 0;

const orange_points_EL = document.getElementById("orange_points");
const blue_points_EL = document.getElementById("blue_points");

const orangeImg = document.getElementById("orange_img");
const blueImg = document.getElementById("blue_img");

const boardContainer = document.querySelector(".board");
const reset_button = document.querySelector(".reset");

// board initialization
function createBoard() {
    boardContainer.innerHTML = "";
    for (let r = 0; r < rows; r++) {
        board[r] = [];
        for (let c = 0; c < cols; c++) {
            board[r][c] = null;

            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;

            // hover: color empty cells in the same column
            cell.addEventListener("mouseenter", () => {
                for (let rr = 0; rr < rows; rr++) {
                    if (!board[rr][c]) {
                        document.querySelector(`.cell[data-row="${rr}"][data-col="${c}"]`).classList.add("available");
                    }
                }
            });

            // remove hover effect when mouse leaves
            cell.addEventListener("mouseleave", () => {
                for (let rr = 0; rr < rows; rr++) {
                    document.querySelector(`.cell[data-row="${rr}"][data-col="${c}"]`).classList.remove("available");
                }
            });

            // click on a collumn -> fill the empty slot (the lowest)
            cell.addEventListener("click", () => { 
                handleMove(c); 
                for (let rr = 0; rr < rows; rr++) {
                    document.querySelector(`.cell[data-row="${rr}"][data-col="${c}"]`).classList.remove("available");
                }
            });

            boardContainer.appendChild(cell);
        }
    }
}


function handleMove(col) {
    // searching for an empty slot (bottom up)
    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) {

            // update the board
            board[r][col] = currentPlayer;
            const cell = document.querySelector(
                `.cell[data-row="${r}"][data-col="${col}"]`
            );
            cell.classList.add(currentPlayer);

            // winning case
            const winningCells = checkWinner(r, col);
            if (winningCells) {
                // highlight the winning line
                winningCells.forEach(([wr, wc]) => {
                    const cell = document.querySelector(`.cell[data-row="${wr}"][data-col="${wc}"]`);
                    cell.classList.remove(currentPlayer);
                    cell.classList.add("red");
                });

                // update score
                if (currentPlayer === "orange") {
                    orange_points++;
                    orange_points_EL.textContent = orange_points;
                } else {
                    blue_points++;
                    blue_points_EL.textContent = blue_points;
                }

                // next round
                setTimeout(() => {
                    resetBoard();
                }, 1500);

                return;
            }

            // check for draw
            if (board.flat().every(cell => cell !== null)) {
                setTimeout(() => resetBoard(), 1000);
                return;
            }

            // change player
            currentPlayer = currentPlayer === "orange" ? "blue" : "orange";
            updateTurnIndicator();
            return;
        }
    }
}

function checkWinner(row, col) {
    const player = board[row][col];
    const directions = [
        [0, 1],   // - (1 step right)
        [1, 0],   // | (1 step down)
        [1, 1],   // ↘ (1 step right + 1 step down)
        [1, -1]   // ↙ (1 step left + 1 step down)
    ];

    for (let [dr, dc] of directions) {
        let count = 1;
        const cells = [[row, col]]; // array of consecutive cells

        // one way
        let rr = row + dr, cc = col + dc;
        while (rr >= 0 && rr < rows && cc >= 0 && cc < cols && board[rr][cc] === player) {
            // increase the number
            count++;
            cells.push([rr, cc])

            // continue the path in that way
            rr += dr;
            cc += dc;
        }

        // the other way
        rr = row - dr; cc = col - dc;
        while (rr >= 0 && rr < rows && cc >= 0 && cc < cols && board[rr][cc] === player) {
            count++;
            rr -= dr;
            cc -= dc;
        }

        if (count >= 4) return cells;
    }
    return null;
}


// new round
function resetBoard() {
    createBoard();
    currentPlayer = Math.random() < 0.5 ? "orange" : "blue";
    updateTurnIndicator();
}

// to see whose turn it is
function updateTurnIndicator() {
    orangeImg.classList.remove("active-turn");
    blueImg.classList.remove("active-turn");

    // update it
    if (currentPlayer === "orange") {
        orangeImg.classList.add("active-turn");
    } else {
        blueImg.classList.add("active-turn");
    }
}


// reset button
reset_button.addEventListener("click", () => {
    orange_points = 0;
    blue_points = 0;
    orange_points_EL.textContent = orange_points;
    blue_points_EL.textContent = blue_points;
    resetBoard();
});

// "start game"
createBoard();
