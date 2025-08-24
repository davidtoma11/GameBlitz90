// variables
cells = document.querySelectorAll(".cell");
const reset_button = document.getElementsByClassName("reset")[0];
let currentPlayer = Math.random() < 0.5 ? "X" : "O"; // random currentPlayer player
let board = Array(9).fill(null); // game board
let x_points = 0, o_points = 0;
let x_points_EL = document.getElementById("x_points");
let o_points_EL = document.getElementById("0_points");


const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonal
];


cells.forEach((cell,index) => {
    cell.addEventListener('click', () => {

        // avoid overwriting
        if(board[index]) return;

        cell.classList.add('active');
        cell.classList.add(currentPlayer);
        board[index] = currentPlayer;

        if(checkWinner(currentPlayer)){
            if(currentPlayer === "X"){
                x_points ++;
                x_points_EL.innerHTML = x_points;
            }
            else{
                o_points ++;
                o_points_EL.innerHTML = o_points;
            }
            resetTable();
            return;
        }

        // draw scenario
        if(board.every(cell => cell)){
            resetTable();
            return;
        }

        // change player
        if(currentPlayer === "X"){
            currentPlayer = "O";
        }
        else
            currentPlayer = "X"

    });
});

// check for a winning combo
function checkWinner(player) {
    return winningCombos.some(combo => 
        combo.every(index => board[index] === player)
    );
}

// reset game
function resetTable() {
    board = Array(9).fill(null); // reset table
    cells.forEach(cell => {
        cell.classList.remove("active", "X", "O");
    });

    currentPlayer = Math.random() < 0.5 ? "X" : "O"; // new first player
}

reset_button.addEventListener("click", () => { resetTable(); })


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


startAnimation(currentPlayer)