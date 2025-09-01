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
                // playSound("hover");
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
                playSound("drop");
            });

            boardContainer.appendChild(cell);
        }
    }

    updateTurnIndicator();
}


function handleMove(col) {
    let targetRow = -1;

    // find the first empty row
    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) {
            targetRow = r;
            break;
        }
    }

    if (targetRow === -1) return; // coloană plină

    let currentRow = 0;


    // falling animation (recursive)
    function animateDrop() {
        // erase the previous cell
        if (currentRow > 0) {
            const prevCell = document.querySelector(`.cell[data-row="${currentRow - 1}"][data-col="${col}"]`);
            prevCell.classList.remove(currentPlayer);
        }

        // fill the current cell
        const cell = document.querySelector(`.cell[data-row="${currentRow}"][data-col="${col}"]`);
        cell.classList.add(currentPlayer);

        if (currentRow < targetRow) {
            currentRow++;
            setTimeout(animateDrop, 30);
        } else {
            // final point
            board[targetRow][col] = currentPlayer;

            // check for a winning scenario
            const winningCells = checkWinner(targetRow, col);
            if (winningCells) {
                winningCells.forEach(([wr, wc]) => {
                    const winCell = document.querySelector(`.cell[data-row="${wr}"][data-col="${wc}"]`);
                    winCell.classList.remove(currentPlayer);
                    winCell.classList.add("red");
                });

                if (currentPlayer === "orange") {
                    orange_points++;
                    orange_points_EL.textContent = orange_points;
                } else {
                    blue_points++;
                    blue_points_EL.textContent = blue_points;
                }
                
                playSound("win");
                setTimeout(() => resetBoard(), 1000);
                return;
            }

            // draw scenarios
            if (board.flat().every(cell => cell !== null)) {
                setTimeout(() => resetBoard(), 1000);
                return;
            }

            // change player
            currentPlayer = currentPlayer === "orange" ? "blue" : "orange";
            updateTurnIndicator();
        }
    }

    animateDrop();
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
    playSound("reset");
    resetBoard();
});

// "start game"
createBoard();
