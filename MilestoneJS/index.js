// Variables
var numSelected = null; // The currently selected number
var tileSelected = null; // The currently selected tile
var error = 0; // Number of mistakes made by the user

// Initial board configuration
var board = [
  "-5-314-6-",
  "87---94-3",
  "6435-7192",
  "--78-521-",
  "41-9-----",
  "-25-619-7",
  "79-25-84-",
  "--4-96--5",
  "-3-1-867-",
];

// Solution for the Sudoku puzzle
var solution = [
  "259314768",
  "871629453",
  "643587192",
  "967835214",
  "418972536",
  "325461987",
  "796253841",
  "184796325",
  "532148679",
];

// Track which numbers have been used in each column and box
var usedNumbersInColumn = Array.from({ length: 9 }, () => Array.from({ length: 10 }, () => false));
var usedNumbersInBox = Array.from({ length: 3 }, () =>
  Array.from({ length: 3 }, () => Array.from({ length: 10 }, () => false))
);

window.onload = function () {
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
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.addEventListener("click", selectNumber);
    number.classList.add("number");
    document.getElementById("digits").appendChild(number);
  }
}

// Create the Sudoku board
function createBoard() {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      if (board[r][c] != "-") {
        tile.innerText = board[r][c];
        tile.classList.add("tile-start");
        updateUsedNumbers(r, c, board[r][c]);
      }
      if (r == 2 || r == 5) {
        tile.classList.add("horizontal-line");
      }
      if (c == 2 || c == 5) {
        tile.classList.add("vertical-line");
      }
      tile.addEventListener("click", selectTile);
      tile.classList.add("tile");
      document.getElementById("board").append(tile);
    }
  }
}

// Handle number selection by the user
function selectNumber() {
  if (numSelected != null) {
    numSelected.classList.remove("number-selected");
  }
  numSelected = this;
  numSelected.classList.add("number-selected");
}

// Handle tile selection by the user
function selectTile() {
  if (numSelected) {
    if (this.innerText != "") {
      return; // Prevent overriding existing numbers
    }
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    if (solution[r][c] == numSelected.id && !isNumberUsedInColumn(c, numSelected.id) && !isNumberUsedInBox(r, c, numSelected.id)) {
      this.innerText = numSelected.id; // Fill in the selected number
      updateUsedNumbers(r, c, numSelected.id); // Update used numbers in column and box
    } else {
      error += 1;
      document.getElementById("error").innerText = error; // Increment error count
    }
  }
}

// Update used numbers in the column and box
function updateUsedNumbers(row, column, number) {
  usedNumbersInColumn[column][number] = true;
  usedNumbersInBox[Math.floor(row / 3)][Math.floor(column / 3)][number] = true;
}

// Check if a number is already used in the column
function isNumberUsedInColumn(column, number) {
  return usedNumbersInColumn[column][number];
}

// Check if a number is already used in the 3x3 box
function isNumberUsedInBox(row, column, number) {
  return usedNumbersInBox[Math.floor(row / 3)][Math.floor(column / 3)][number];
}

function checkWinCondtion() {
    if (board = solution){
        showWinPrompt();
    }
}

function showWinPrompt() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const promptBox = document.createElement('div');
    promptBox.className = 'prompt-box';

    const WinMessage = document.createElement('p');
    WinMessage.textContent = 'You Win!';

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', resetBoard);

    promptBox.appendChild(WinMessage);
    promptBox.appendChild(resetButton);
    overlay.appendChild(promptBox);
    document.body.appendChild(overlay);
}


//let errorCount = 0;

//check lose condition
function checkLoseCondtion() {
    if (error > 3) {
        // showLosePrompt();
        console.log (error, " error less than 3")
    }
    else {
        console.log (error, " more then 3")
    }
}


//game loss window prompt

function showLosePrompt() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';

    const promptBox = document.createElement('div');
    promptBox.className = 'prompt-box';

    const loseMessage = document.createElement('p');
    loseMessage.textContent = 'You lose';

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', resetBoard);

    promptBox.appendChild(loseMessage);
    promptBox.appendChild(resetButton);
    overlay.appendChild(promptBox);
    document.body.appendChild(overlay);
}

 // Reset the game board
 function resetBoard() {
    const overlay = document.querySelector('.overlay');
    document.body.removeChild(overlay);
     return setGame();
 }
     // Remove the prompt overlay
    // const overlay = document.querySelector('.overlay');
    // document.body.removeChild(overlay);
 