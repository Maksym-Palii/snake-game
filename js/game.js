// Завантажуємо зображення для змійки та їжі
const snakeImage = new Image();
snakeImage.src = "../images/snake.png";

const foodImage = new Image();
foodImage.src = "../images/cherry.png";

// Отримуємо елементи з DOM
const canvas = document.querySelector(".game-canvas");
const context = canvas.getContext("2d");
const scoreElement = document.querySelector(".game-score");
const startButton = document.querySelector(".game-start");
const resetButton = document.querySelector(".game-reset");

// Обробник натискання кнопок управління
document.querySelectorAll(".game-navigation-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.direction;
    changeDirection(direction);
  });
});

// Розмір кожного блоку змійки та їжі
const blockSize = 20;

// Розмір поля гри
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Кількість блоків на полі гри
const blockWidth = canvasWidth / blockSize;
const blockHeight = canvasHeight / blockSize;

// Початкова позиція змійки
let snake = [{ x: 10, y: 10 }];

// Початкова позиція їжі
let food = { x: 15, y: 10 };

// Початкова швидкість змійки (час між кроками)
let speed = 200;

// Напрямок руху змійки
let direction = "right";

// Очки гравця
let score = 0;

// Змінна, що визначає, чи гра активна
let isPlaying = false;

// Функція для малювання змійки та їжі на полі
function draw() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  // Малюємо змійку
  snake.forEach((block) => {
    context.drawImage(
      snakeImage,
      block.x * blockSize,
      block.y * blockSize,
      blockSize,
      blockSize
    );
  });

  // Малюємо їжу
  context.drawImage(
    foodImage,
    food.x * blockSize,
    food.y * blockSize,
    blockSize,
    blockSize
  );

  // Малюємо рахунок гравця
  scoreElement.textContent = ` Очки: ${score}`;
}

// Функція для руху змійки
function move() {
  let head = { x: snake[0].x, y: snake[0].y };

  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  // Перевірка на колізії з межами поля гри
  if (
    head.x < 0 ||
    head.x >= blockWidth ||
    head.y < 0 ||
    head.y >= blockHeight
  ) {
    gameOver();
    return;
  }

  // Перевірка на колізії з самою собою
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      gameOver();
      return;
    }
  }

  // Перевірка, чи їсть змійка їжу
  if (head.x === food.x && head.y === food.y) {
    // Збільшення рахунку
    score++;

    // Генеруємо нову позицію для їжі
    food = {
      x: Math.floor(Math.random() * blockWidth),
      y: Math.floor(Math.random() * blockHeight),
    };

    // Змінюємо швидкість, щоб змійка рухалась повільніше
    speed -= 5;
  } else {
    // Видаляємо останній блок змійки, якщо не їсть їжу
    snake.pop();
  }

  // Додаємо новий блок у масив змійки
  snake.unshift(head);

  // Малюємо змійку та їжу на полі
  draw();

  // Рух змійки
  if (isPlaying) {
    setTimeout(move, speed);
  }
}

// Функція для зміни напрямку руху змійки
function changeDirection(newDirection) {
  switch (newDirection) {
    case "up":
      if (direction !== "down") direction = "up";
      break;
    case "down":
      if (direction !== "up") direction = "down";
      break;
    case "left":
      if (direction !== "right") direction = "left";
      break;
    case "right":
      if (direction !== "left") direction = "right";
      break;
  }
}

// Функція для запуску гри
function startGame() {
  if (!isPlaying) {
    isPlaying = true;
    snake = [{ x: 10, y: 10 }];
    direction = "right";
    score = 0;
    speed = 200;
    move();
  }
}

// Функція для завершення гри
function gameOver() {
  isPlaying = false;
  alert("Гра закінчена! Ваш рахунок: " + score);
}

// Обробник натискання клавіш
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
    case "ArrowLeft":
      if (direction !== "right") direction = "left";
      break;
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
  }
});

// Обробник натискання кнопки "Старт"
startButton.addEventListener("click", () => {
  startGame();
});

// Обробник натискання кнопки "Перезапуск"
resetButton.addEventListener("click", () => {
  startGame();
});

// При запуску гри малюємо змійку та їжу на полі
draw();
