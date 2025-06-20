const board = document.getElementById("game-board");
const suaraGeser = new Audio("geser.wav");
const suaraGabung = new Audio("gabung.wav");
const suaraMenang = new Audio("menang.wav");
const suaraKalah = new Audio("kalah.wav");
let hasPlayedWinSound = false;

let score = 0;
let grid = [];

function createEmptyBoard() {
  grid = [];
  for (let i = 0; i < 4; i++) {
    grid[i] = [];
    for (let j = 0; j < 4; j++) {
      grid[i][j] = 0;
    }
  }
}

function drawBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.textContent = grid[i][j] === 0 ? "" : grid[i][j];
      board.appendChild(tile);
    }
  }
  document.getElementById("score").textContent = "Score: " + score;
}

function addRandomTile() {
  let empty = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) empty.push({ x: i, y: j });
    }
  }
  if (empty.length === 0) return;

  let spot = empty[Math.floor(Math.random() * empty.length)];
  grid[spot.x][spot.y] = Math.random() < 0.9 ? 2 : 4;
}

function slide(row) {
  let arr = row.filter(val => val);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2;
      arr[i + 1] = 0;

      mergeSound.play();

      if (arr[i] === 2048 && !hasPlayedWinSound) {
        winSound.play();
        hasPlayedWinSound = true;
      }

      score += arr[i];
    }
  }
  return [...arr.filter(val => val), ...Array(4 - arr.filter(val => val).length).fill(0)];
}

function rotateGrid() {
  let newGrid = [];
  for (let i = 0; i < 4; i++) {
    newGrid[i] = [];
    for (let j = 0; j < 4; j++) {
      newGrid[i][j] = grid[j][3 - i];
    }
  }
  grid = newGrid;
}

function moveLeft() {
  for (let i = 0; i < 4; i++) {
    grid[i] = slide(grid[i]);
  }
}

function moveRight() {
  for (let i = 0; i < 4; i++) {
    grid[i] = slide(grid[i].reverse()).reverse();
  }
}

function moveUp() {
  rotateGrid();
  moveLeft();
  rotateGrid(); rotateGrid(); rotateGrid();
}

function moveDown() {
  rotateGrid();
  moveRight();
  rotateGrid(); rotateGrid(); rotateGrid();
}

function isGameOver(g) {
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      const current = g[y][x];
      if (current === 0) return false;
      if (x < 3 && current === g[y][x + 1]) return false;
      if (y < 3 && current === g[y + 1][x]) return false;
    }
  }
  return true;
}

function handleKey(e) {
  switch (e.key) {
    case "ArrowLeft": moveLeft(); break;
    case "ArrowRight": moveRight(); break;
    case "ArrowUp": moveUp(); break;
    case "ArrowDown": moveDown(); break;
    default: return;
  }
  addRandomTile();
  drawBoard();
  if (isGameOver(grid)) {
    alert("Game Over! Tidak ada langkah lagi.");
  }
}

// ➕ Swipe Support
let startX, startY;

document.addEventListener("touchstart", function(e) {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", function(e) {
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;

  const dx = endX - startX;
  const dy = endY - startY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 30) moveRight();
    else if (dx < -30) moveLeft();
  } else {
    if (dy > 30) moveDown();
    else if (dy < -30) moveUp();
  }

  addRandomTile();
  drawBoard();
  if (isGameOver(grid)) {
    alert("Game Over! Tidak ada langkah lagi.");
  }
});
// Blokir gestur scroll & pull-to-refresh di mobile
document.addEventListener("touchmove", function(e) {
  e.preventDefault();
}, { passive: false });

document.addEventListener("keydown", handleKey);

// Mulai game
createEmptyBoard();
addRandomTile();
addRandomTile();
drawBoard();
