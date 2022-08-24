const foodSound = new Audio("food.mp3");
const gameOverSound = new Audio("gameover.wav");
const movSound = new Audio("turn.wav");
const musicSound = new Audio("background.mp3");
let direction = { x: 0, y: 0 };
let lastPaintTime = 0;
let speed = 4;
let score = 0;
let snakeArray = [{ x: 0, y: 0 }];

food = {
  x: Math.round(2 + (16 - 2) * Math.random()),
  y: Math.round(2 + (16 - 2) * Math.random()),
};

function start() {
  document.getElementById("body2").style.display = "";
  startbt.style.display = "none";
}

function main(currTime) {
  window.requestAnimationFrame(main);
  if ((currTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = currTime;
  gameEngine();
}

function collide(snake) {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y)
      // when snake will bite itself
      return true;
  }

  if (
    snake[0].x <= 0 ||
    snake[0].y <= 0 ||
    snake[0].x >= 18 ||
    snake[0].y >= 18
  )
    return true;

  return false;
}

function gameEngine() {
  if (collide(snakeArray)) {
    direction = { x: 0, y: 0 };

    snakeArray = [{ x: 1, y: 1 }];

    //document.getElementById('overalert').style.display="block";
    //musicSound.play();
    alert("hlo");
    score = 0;
    scoreBox.innerHTML = "Score: " + score;

  }

  if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
    // when snake will eat the food

    // foodSound.play();
    score += 1;

    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore " + hiscoreval;
    }

    scoreBox.innerHTML = " Score " + score;

    snakeArray.unshift({
      x: snakeArray[0].x + direction.x,
      y: snakeArray[0].y + direction.y,
    });
    let a = 2;
    let b = 16;
    // to generate food;

    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(+(b - a) * Math.random()),
    };
  }

  for (let i = snakeArray.length - 2; i >= 0; i--) {
    snakeArray[i + 1] = { ...snakeArray[i] };
  }

  snakeArray[0].x += direction.x;
  snakeArray[0].y += direction.y;

  board.innerHTML = ""; // making board as clear
  snakeArray.forEach((e, index) => {
    snakeElement = document.createElement("div");

    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }

    board.appendChild(snakeElement);
  });

  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore" + hiscore;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  direction = { x: 0, y: 0 }; // starting the game initially
  movSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("up arrow");
      direction.x = 0; // we can give as velocity
      direction.y = -1;
      break;
    case "ArrowDown":
      console.log("down arrow");
      direction.x = 0;
      direction.y = 1;
      break;
    case "ArrowLeft":
      console.log("left arrow");
      direction.x = -1;
      direction.y = 0;
      break;
    case "ArrowRight":
      console.log("right arrow");
      direction.x = 1;
      direction.y = 0;
      break;
    default:
      break;
  }
});
