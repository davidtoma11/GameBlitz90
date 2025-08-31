// variables
const rows = 6;
const cols = 7;
const board = [];
let currentPlayer = Math.random() < 0.5 ? "orange" : "blue";

let orange_points = 0;
let blue_points = 0;

const orange_points_EL = document.getElementById("orange_points");
const blue_points_EL = document.getElementById("blue_points");

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

            // click on a collumn -> fill the empty slot (the lowest)
            cell.addEventListener("click", () => handleMove(c));
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


            if (checkWinner(r, col)) {
                if (currentPlayer === "orange") {
                    orange_points++;
                    orange_points_EL.textContent = orange_points;
                } else {
                    blue_points++;
                    blue_points_EL.textContent = blue_points;
                }
                setTimeout(() => resetBoard(), 2000);
                return;
            }

            // check for draw
            if (board.flat().every(cell => cell !== null)) {
                setTimeout(() => resetBoard(), 2000);
                return;
            }

            // change player
            currentPlayer = currentPlayer === "orange" ? "blue" : "orange";
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

        // one way
        let rr = row + dr, cc = col + dc;
        while (rr >= 0 && rr < rows && cc >= 0 && cc < cols && board[rr][cc] === player) {
            count++;
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

        if (count >= 4) return true;
    }
    return false;
}


// new round
function resetBoard() {
    createBoard();
    currentPlayer = Math.random() < 0.5 ? "orange" : "blue";
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
