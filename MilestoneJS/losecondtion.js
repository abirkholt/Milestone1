/** @format */

// Variables
var numSelected = null; // The currently selected number
var tileSelected = null; // The currently selected tile
var error = 0; // Number of mistakes made by the user

// Initial board configuration
var board = [
  '-5-314-6-',
  '87---94-3',
  '6435-7192',
  '--78-521-',
  '41-9-----',
  '-25-619-7',
  '79-25-84-',
  '--4-96--5',
  '-3-1-867-',
];

// Solution for the Sudoku puzzle
var solution = [
  '259314768',
  '871629453',
  '643587192',
  '967835214',
  '418972536',
  '325461987',
  '796253841',
  '184796325',
  '532148679',
];

// Track which numbers have been used in each column and box
var usedNumbersInColumn = Array.from({ length: 9 }, () =>
  Array.from({ length: 10 }, () => false)
);
var usedNumbersInBox = Array.from({ length: 3 }, () =>
  Array.from({ length: 3 }, () => Array.from({ length: 10 }, () => false))
);

window.onload = function() {
  setGame(); // Initialize the Sudoku game
};

// Set up the Sudoku game
function setGame() {
  createNumberButtons(); // Create number buttons for user selection
  createBoard(); // Create the Sudoku board
}

// Create number buttons for user selection
function createNumberButtons() {
  for (let i = 1; i <= 9; i++) {
    let number = document.createElement('div');
    number.id = i;
    number.innerText = i;
    number.addEventListener('click', selectNumber);
    number.classList.add('number');
    document.getElementById('digits').appendChild(number);
  }
}

// Create the Sudoku board
// Create the Sudoku board
// Create the Sudoku board
function createBoard() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement('div');
      tile.id = r.toString() + '-' + c.toString();
      if (board[r][c] !== '-') {
        tile.innerText = board[r][c];
        tile.classList.add('tile-start');
        updateUsedNumbers(r, c, board[r][c]);
      }
      if (r === 2 || r === 5) {
        tile.classList.add('horizontal-line');
      }
      if (c === 2 || c === 5) {
        tile.classList.add('vertical-line');
      }
      tile.addEventListener('click', selectTile);
      tile.classList.add('tile');
      document.getElementById('board').append(tile);
    }
  }
}

// Handle number selection by the user
function selectNumber() {
  if (numSelected != null) {
    numSelected.classList.remove('number-selected');
  }
  numSelected = this;
  numSelected.classList.add('number-selected');
}

// Handle tile selection by the user
function selectTile() {
  if (numSelected) {
    if (this.innerText != '') {
      return; // Prevent overriding existing numbers
    }
    let coords = this.id.split('-');
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    if (
      solution[r][c] == numSelected.id &&
      !isNumberUsedInColumn(c, numSelected.id) &&
      !isNumberUsedInBox(r, c, numSelected.id)
    ) {
      this.innerText = numSelected.id;
      this.classList.add('tile-filled');
      updateUsedNumbers(r, c, numSelected.id);
      checkWinCondition();
    } else {
      error++;
      if (error >= 3) {
        alert('You made too many mistakes. Game Over!');
        resetGame();
      } else {
        document.getElementById('error').innerText = error.toString();
      }
    }
  }
}

// Update the used numbers in the column and box
function updateUsedNumbers(row, col, number) {
  usedNumbersInColumn[col][number] = true;
  usedNumbersInBox[Math.floor(row / 3)][Math.floor(col / 3)][number] = true;
}

// Check if a number is used in the column
function isNumberUsedInColumn(col, number) {
  return usedNumbersInColumn[col][number];
}

// Check if a number is used in the 3x3 box
function isNumberUsedInBox(row, col, number) {
  return usedNumbersInBox[Math.floor(row / 3)][Math.floor(col / 3)][number];
}

// Check if the player has won the game
// Check if the player has won the game
function checkWinCondition() {
  let filledTiles = document.getElementsByClassName('tile-filled');
  if (filledTiles.length == 81) {
    // Check if the user's solution matches the actual solution
    let isCorrect = true;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        let tile = document.getElementById(r.toString() + '-' + c.toString());
        if (tile.innerText != solution[r][c]) {
          isCorrect = false;
          break;
        }
      }
      if (!isCorrect) {
        break;
      }
    }

    if (isCorrect) {
      alert('Congratulations! You won the game!');
      resetGame();
    }
  }
}
function resetBoard() {
  const overlay = document.querySelector('.overlay');
  overlay.remove();

  // Clear the numbers from the board
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.getElementById(r.toString() + '-' + c.toString());
      tile.innerText = '';
    }
  }

  setGame();
}

// Reset the game
function resetGame() {
    // Clear the board
    let tiles = document.getElementsByClassName('tile');
    for (let i = 0; i < tiles.length; i++) {
      tiles[i].innerText = '';
      tiles[i].classList.remove('tile-filled', 'tile-start');
    }
  
    // Reset variables and error count
    numSelected = null;
    tileSelected = null;
    error = 0;
    document.getElementById('error').innerText = '0';
  
    // Clear used numbers in columns and boxes
    usedNumbersInColumn = Array.from({ length: 9 }, () =>
      Array.from({ length: 10 }, () => false)
    );
    usedNumbersInBox = Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => Array.from({ length: 10 }, () => false))
    );
  
    // Remove the overlay if it exists
    const overlay = document.querySelector('.overlay');
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  
    setGame();
  }
// Reset variables and error count
numSelected = null;
tileSelected = null;
error = 0;
document.getElementById('error').innerText = '0';

// Clear used numbers in columns and boxes
usedNumbersInColumn = Array.from({ length: 9 }, () =>
  Array.from({ length: 10 }, () => false)
);
usedNumbersInBox = Array.from({ length: 3 }, () =>
  Array.from({ length: 3 }, () => Array.from({ length: 10 }, () => false))
);

let resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', resetBoard);
