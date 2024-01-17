"use strict";

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
      ctx.fillStyle = (board[i][j] ? "black": "white");
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
        board[i][j] = (neighbors < 2 || neighbors > 3) ? 0 : 1;
      } else {
        board[i][j] = (neighbors == 3) ? 1 : 0;
      }
    }
  }
}

render();
document.onkeydown = (e) => {
  if (e.key) {calculate(); render()}
}

