// Game Constants & Variables

const foodSound = new Audio("./public/sound/food.mp3");
const collideSound = new Audio("./public/sound/collide.mp3");
const moveSound = new Audio("./public/sound/move.mp3");
const bgSound = new Audio("./public/sound/bgsound.mp3");
const paused = new Audio("./public/sound/pause.mp3");
const resume = new Audio("./public/sound/resume.mp3");
const gameOver = new Audio("./public/sound/game-over.mp3");
const letsGo = new Audio("./public/sound/lets-go.mp3");
const clickSound = new Audio("./public/sound/click.mp3");

let inputDir = { x: 0, y: 0 };
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 10, y: 10 }];
let food = { x: 13, y: 15 };
let score = 0;
let highScore = 0;
let isPaused = false;
let isGameOver = false;
let currentLevel = "easy";
let isGameStarted = false;

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);

  if ( isPaused || isGameOver) return;

  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }

  lastPaintTime = ctime;
  gameEngine();
}


function isCollide(snake) {
  // if you bump into yourself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  // if you bump into the wall
  if (
    snake[0].x >= 19 ||
    snake[0].x <= 0 ||
    snake[0].y >= 19 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

// speed control and set high score based on speed level
function setSpeed(level) {
  if (level === "easy") speed = 5;
  if (level === "medium") speed = 10;
  if (level === "hard") speed = 15;
}

function getHighScore(level) {
  let hs = localStorage.getItem(level + "-high-score");
  return hs ? JSON.parse(hs) : 0;
}

function setHighScore(level, score) {
  localStorage.setItem(level + "-high-score", JSON.stringify(score));
}

function updateStartHighScore() {
  let hs = getHighScore(currentLevel);

  let levelName = currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1);

  document.getElementById("levelHighScore").innerText =
    `High Score (${levelName}): ${hs}`;
}

function gameEngine() {
  // Part 1: updating the snake array & food

  if (isCollide(snakeArr)) {
    collideSound.play();
    setTimeout(() => {
      gameOver.play();
    }, 500);

    isGameOver = true;
    isPaused = true;

    document.getElementById("finalScore").innerText = "Your Score: " + score;
    document.getElementById("finalHighScore").innerText =
      "High Score: " + highScore;

    document.getElementById("gameOverOverlay").classList.remove("visibility");

    // Animation part
    let popupBox = document.querySelector(".game-over-box");
    // popupBox.classList.remove('animate-popup')
    // void popupBox.offsetWidth;
    popupBox.classList.add("animate-popup");

    return;
  }

  // if snake ate food then increment score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    // console.log(`before unshift`);
    // console.log(`x: ${inputDir.x}, y: ${inputDir.y}`);
    // console.log(`x: ${snakeArr[0].x}, y: ${snakeArr[0].y}`);
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    // console.log(`after unshift`);
    // console.log(`x: ${inputDir.x}, y: ${inputDir.y}`);
    // console.log(`x: ${snakeArr[0].x}, y: ${snakeArr[0].y}`);
    score += 1;

    if (score > highScore) {
      highScore = score;
      setHighScore(currentLevel, score);
    }

    scoreBox.innerHTML = `Score: ${score}`;
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: display the snake and food

  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");

    snakeElement.style.gridRowStart = e.x;
    snakeElement.style.gridColumnStart = e.y;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }

    board.appendChild(snakeElement);
  });

  // Display the food
  foodElement = document.createElement("div");

  foodElement.style.gridRowStart = food.x;
  foodElement.style.gridColumnStart = food.y;
  foodElement.classList.add("food");

  board.appendChild(foodElement);
}

// Main logic starts

function resetGame() {
  snakeArr = [{ x: 10, y: 10 }];
  inputDir = { x: 0, y: 0 };
  score = 0;

  scoreBox.innerHTML = "Score: 0";

  isGameOver = false;
  isPaused = false;
}

//Restart Game with Play Again button
document.getElementById("playAgainBtn").addEventListener("click", () => {
  // Reset Game
  letsGo.play();
  resetGame();

  // Hide Overlay
  document.getElementById("gameOverOverlay").classList.add("visibility");
});

// Level Selection (cards)
let cards = document.querySelectorAll(".level-card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    clickSound.play();
    cards.forEach((c) => c.classList.remove("active"));
    card.classList.add("active");

    currentLevel = card.dataset.level;
    updateStartHighScore();
  });
});

// Play button
document.getElementById("playBtn").addEventListener("click", () => {
  letsGo.play();
  setSpeed(currentLevel);
  highScore = getHighScore(currentLevel);

  hiscoreBox.innerHTML = "High Score: " + highScore;

  document.getElementById("startScreen").style.display = "none";

  isGameStarted = true;
});

//logic for change level

document.getElementById("changeLevelBtn").addEventListener("click", () => {
  paused.play();
  document.getElementById("gameOverOverlay").classList.add("visibility");
  document.getElementById("startScreen").style.display = "flex";

  updateStartHighScore();

  isGameOver = false;
  isPaused = true;

  resetGame();
});

// this is my game loop
window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  // pause and resume

  if (inputDir.x !== 0 || inputDir.y !== 0) {
    // not will be paused when game is not start

    if (e.key.toLocaleLowerCase() === "p" && !isGameOver) {
      if (!isPaused) paused.play(); // not always time work
      isPaused = true;

      document.getElementById("pauseOverlay").classList.remove("visibility");
      return;
    }
  }

  if (e.key.toLocaleLowerCase() === "r" && isPaused) {
    console.log("R press");
    console.log(isPaused);

    if (isPaused) resume.play(); // not always time work
    isPaused = false;
    document.getElementById("pauseOverlay").classList.add("visibility");
    return;
  }

  if (isPaused || !isGameStarted) return;

 let keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

 keys.forEach((key) => {
   if (e.key === key) {
     moveSound.play();
   }
 });

      // moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    default:
      break;
  }
});

updateStartHighScore();
