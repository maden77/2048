const boardSize = 4;
let board = Array(boardSize).fill().map(() => Array(boardSize).fill(null));
const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]; // dst

function getNextPrime(value) {
  let index = primes.indexOf(value);
  return primes[index + 1] || value;
}

function addRandomTile() {
  let empty = [];
  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize; c++) {
      if (board[r][c] === null) empty.push({ r, c });
    }
  }
  if (empty.length === 0) return;

  let { r, c } = empty[Math.floor(Math.random() * empty.length)];
  board[r][c] = 2; // Mulai dari bilangan prima pertama
  drawBoard();
}

function drawBoard() {
  const boardDiv = document.getElementById("game-board");
  boardDiv.innerHTML = "";
  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c < boardSize; c++) {
      let tile = document.createElement("div");
      tile.className = "tile";
      tile.textContent = board[r][c] || "";
      boardDiv.appendChild(tile);
    }
  }
}

function moveLeft() {
  for (let r = 0; r < boardSize; r++) {
    let row = board[r].filter(v => v !== null);
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] === row[i + 1]) {
        row[i] = getNextPrime(row[i]);
        row[i + 1] = null;
      }
    }
    row = row.filter(v => v !== null);
    while (row.length < boardSize) row.push(null);
    board[r] = row;
  }
  addRandomTile();
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") moveLeft();
  // Tambah moveRight, moveUp, moveDown jika perlu
  drawBoard();
});

addRandomTile();
addRandomTile();
drawBoard();