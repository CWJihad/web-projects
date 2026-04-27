const cells = document.querySelectorAll(".cell");
const titleHeader = document.querySelector("#titleHeader");
const xPlayerDisplay = document.querySelector("#xPlayerDisplay");
const oPlayerDisplay = document.querySelector("#oPlayerDisplay");
const restartBtn = document.querySelector("#restartBtn");
const turnIndicator = document.querySelector("#turnIndicator");

// Declare variables for the game
let player = "X";
let isPauseGame = false;
let isGameStart = false;
const clickSound = new Audio('public/sound/click.mp3')
const tapCellSound = new Audio('public/sound/tap-cell.mp3')
const gameOverSound = new Audio('public/sound/game-over.mp3')
const letGoSound = new Audio('public/sound/lets-go.mp3')

// Array of win conditions
const inputCells = ["", "", "", "", "", "", "", "", ""];

// Array of win conditions
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columns
  [0, 4, 8],
  [2, 4, 6], // Angels
];

// Add click event listeners to each cell
cells.forEach((cell, index) => {
  cell.addEventListener("click", () =>
    {
      tapCellSound.play()
      tapCell(cell, index)
    }) 
});

function tapCell(cell, index) {
  if (cell.textContent !== "" || isPauseGame) return;

  isGameStart = true;
  updateCell(cell, index);

  // Do a random pic if there are no results
  if (checkWinner()) return;

  changePlayer();

  updateTurnIndicator("Computer Thinking...")
  
  randomPick();
}

function updateCell(cell, index) {
  inputCells[index] = player;
  renderCell(cell);
}

function renderCell(cell) {
  cell.textContent = player;
  cell.style.color = player === "X" ? "#1892ea" : "#a737ff";
}

function changePlayer() {
  player = player === "X" ? "O" : "X";
}

function randomPick() {
  // Pause the game to allow Computer to pick
  isPauseGame = true;

  if (inputCells.every((cell) => cell !== "")) return;

  setTimeout(() => {
    let emptyIndexes = inputCells
      .map((val, i) => (val === "" ? i : null))
      .filter((i) => i !== null);

    let randomIndex =
      emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

    // Update the cell with computer move
    updateCell(cells[randomIndex], randomIndex);

    // Check if computer not won
    if (!checkWinner()) {
      changePlayer();
      // Switch back to Human player
      updateTurnIndicator()
      isPauseGame = false;
    }
  }, 500);
}

function checkWinner() {
  for (const [a, b, c] of winConditions) {
    // Check each winning condition

    if (
      inputCells[a] == player &&
      inputCells[b] == player &&
      inputCells[c] == player
    ) {
      declareWinner([a, b, c]);
      return true;
    }
  }

  // check for a draw (if all cells are filled)
  if (inputCells.every((cell) => cell != "")) {
    declareDraw();
    return true;
  }
  return false;
}

function declareWinner(winningIndexes) {
  gameOverSound.play()
  titleHeader.textContent = `${player} Won`;
  isPauseGame = true;

  // Highlight winning cells
  winningIndexes.forEach(
    (index) => (cells[index].style.background = "#2a2343"),
  );

  restartBtn.style.visibility = "visible";
  turnIndicator.textContent = ''

}

function declareDraw() {
  gameOverSound.play()
  titleHeader.textContent = "Draw!";
  isPauseGame = true;
  restartBtn.style.visibility = "visible";
  turnIndicator.textContent = ''

}

function choosePlayer(selectedPlayer) {
  // confirm that the game isn't started
  if (!isGameStart) {
    // Override the selected player value
    player = selectedPlayer;
    
    if (player == "X") {
      // Highlight X Display
      clickSound.play()
      xPlayerDisplay.classList.add("player-active");
      oPlayerDisplay.classList.remove("player-active");
    } else {
      // Highlight O Display
      clickSound.play()
      oPlayerDisplay.classList.add("player-active");
      xPlayerDisplay.classList.remove("player-active");
    }
    updateTurnIndicator()
  }
}

function updateTurnIndicator(text = null) {
    if (text) {
        turnIndicator.textContent = text
        return
    }

    turnIndicator.textContent = `${player}'s Turn`
    
}

updateTurnIndicator()

xPlayerDisplay.addEventListener("click", () => choosePlayer("X"));
oPlayerDisplay.addEventListener("click", () => choosePlayer("O"));

restartBtn.addEventListener("click", () => {
  letGoSound.play()
  restartBtn.style.visibility = "hidden";
  inputCells.fill("");

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.background = "";
  });

  isPauseGame = false;
  isGameStart = false;
  player = 'X'
  
  titleHeader.textContent = "Choose";
  turnIndicator.textContent = ''
  updateTurnIndicator()

});
