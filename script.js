"use strict";

// Game Rule constants
const minNeighbors = 2; // Minimum neighbors required to survive. default 2
const maxNeighbors = 3; // Maximum neighbors before a cell dies. default 3
const requiredNeighbors = 3; // neighbors required to come to life. default 3
const lives = 1; // default 1

const
  $=(x)=>{return document.querySelector(x)},
  canvas = $("#canvas"),
  ctx = canvas.getContext("2d"),
  blockSize = 10,
  boardWidth = 100,
  boardHeight = 50;

var board = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
];

canvas.width = boardWidth * blockSize;
canvas.height= boardHeight * blockSize;

let zerofilled = [];
while (zerofilled.length < (boardWidth)) {
  zerofilled.push(0);
}
console.log(zerofilled);

while (board.length < boardHeight) {
  board.push([...zerofilled]);
}

for (let i = 0; i < boardHeight; i++) {
  while (board[i].length < boardWidth) {
    board[i].push(0);
  }
}

function render() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      ctx.fillStyle = `hsl(0, 0%, ${100*(1-board[i][j]/lives)}%)`
      ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
    }
  }
}

function calculate() {
  let boardCopy = structuredClone(board);
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      let neighbors = 0;
      if (i > 0 && j > 0 && boardCopy[i-1][j-1]) { neighbors++; }
      if (i > 0 && boardCopy[i-1][j]) { neighbors++; }
      if (i > 0 && j < boardCopy[i].length-1 && boardCopy[i-1][j+1]) { neighbors++; }

      if (j > 0 && boardCopy[i][j-1]) { neighbors++; }
      if (j < boardCopy[i].length-1 && boardCopy[i][j+1]) { neighbors++; }

      if (i < boardCopy.length-1 && j > 0 && boardCopy[i+1][j-1]) { neighbors++; }
      if (i < boardCopy.length-1 && boardCopy[i+1][j]) { neighbors++; }
      if (i < boardCopy.length-1 && j < boardCopy[i].length-1 && boardCopy[i+1][j+1]) { neighbors++; }

      if (boardCopy[i][j]) {
        board[i][j] = (neighbors < minNeighbors || neighbors > maxNeighbors) ? board[i][j]-1 : board[i][j];
      } else {
        board[i][j] = (neighbors == requiredNeighbors) ? lives : 0;
      }
    }
  }
}

render();
document.onkeydown = (e) => {
  if (e.key) {calculate(); render()}
}

