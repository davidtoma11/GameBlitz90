const rows = 6;
const cols = 7;
const board = document.querySelector('.board');

// create board
for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
}


board.addEventListener('click', e => {
    if (e.target.classList.contains('cell')) {
        e.target.classList.toggle('red');
    }
});