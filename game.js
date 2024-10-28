// script.js

const gameArea = document.querySelector('.gameArea');
const car = document.querySelector('.car');
const scoreDisplay = document.getElementById('score');
let carPosition = 175;
let score = 0;
let isGameOver = false;
let obstacleTimer;
let scoreTimer;

// Function to move car
function moveCar(event) {
  if (event.key === 'ArrowLeft' && carPosition > 0) {
    carPosition -= 5;
  } else if (event.key === 'ArrowRight' && carPosition < 350) {
    carPosition += 5;
  }
  car.style.left = carPosition + 'px';
}

// Function to create road lines
function createRoadLine() {
  const line = document.createElement('div');
  line.classList.add('roadLine');
  line.style.top = '0px';
  gameArea.appendChild(line);

  setTimeout(() => {
    gameArea.removeChild(line);
  }, 1000);
}

// Function to create obstacles
function createObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.left = Math.floor(Math.random() * 350) + 'px';
  gameArea.appendChild(obstacle);
  
  let obstaclePosition = 0;
  const speed = Math.random() * 2 + 2; // Random speed between 2 and 4

  const obstacleInterval = setInterval(() => {
    if (isGameOver) {
      clearInterval(obstacleInterval);
      gameArea.removeChild(obstacle);
      return;
    }

    if (obstaclePosition >= 600) {
      clearInterval(obstacleInterval);
      gameArea.removeChild(obstacle);
    } else {
      obstaclePosition += speed;
      obstacle.style.top = obstaclePosition + 'px';

      // Check collision
      if (obstaclePosition > 490 && Math.abs(carPosition - parseInt(obstacle.style.left)) < 50) {
        gameOver();
        clearInterval(obstacleInterval);
      }
    }
  }, 20);
}

// Function to handle game over
function gameOver() {
  isGameOver = true;
  clearInterval(obstacleTimer);
  clearInterval(scoreTimer);
  alert(`Game Over! Final Score: ${score}`);
}

// Function to update score
function updateScore() {
  if (!isGameOver) {
    score += 1;
    scoreDisplay.innerText = score;
  }
}

// Start game loop
document.addEventListener('keydown', const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    speed: 5,
    dx: 0,
    dy: 0
};

let bullets = [];
let targets = [];
let targetSize = 20;
let targetSpawnRate = 1000; // milliseconds

// Move player
function movePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - player.size) player.x = canvas.width - player.size;
    if (player.y < 0) player.y = 0;
    if (player.y > canvas.height - player.size) player.y = canvas.height - player.size;
}

// Shoot bullet
function shootBullet() {
    const bullet = {
        x: player.x + player.size / 2,
        y: player.y,
        size: 5,
        speed: 7
    };
    bullets.push(bullet);
}

// Draw player
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

// Draw bullets
function drawBullets() {
    ctx.fillStyle = 'red';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);
        bullet.y -= bullet.speed;
    });
    bullets = bullets.filter(bullet => bullet.y > 0); // Remove bullets off-screen
}

// Draw targets
function drawTargets() {
    ctx.fillStyle = 'green';
    targets.forEach(target => {
        ctx.fillRect(target.x, target.y, targetSize, targetSize);
        target.y += 2; // Target speed

        // Check collision with player
        if (target.x < player.x + player.size &&
            target.x + targetSize > player.x &&
            target.y < player.y + player.size &&
            target.y + targetSize > player.y) {
            alert("Game Over");
            resetGame();
        }
    });

    targets = targets.filter(target => target.y < canvas.height);
}

// Add new target
function addTarget() {
    const x = Math.random() * (canvas.width - targetSize);
    targets.push({ x, y: -targetSize });
}

// Check bullet collisions
function checkCollisions() {
    bullets.forEach((bullet, bIndex) => {
        targets.forEach((target, tIndex) => {
            if (bullet.x < target.x + targetSize &&
                bullet.x + bullet.size > target.x &&
                bullet.y < target.y + targetSize &&
                bullet.y + bullet.size > target.y) {
                bullets.splice(bIndex, 1);
                targets.splice(tIndex, 1);
            }
        });
    });
}

// Reset game
function resetGame() {
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    bullets = [];
    targets = [];
}

// Update game
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    movePlayer();
    drawPlayer();
    drawBullets();
    drawTargets();
    checkCollisions();

    requestAnimationFrame(update);
}

// Keyboard events
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "d") player.dx = player.speed;
    if (e.key === "ArrowLeft" || e.key === "a") player.dx = -player.speed;
    if (e.key === "ArrowUp" || e.key === "w") player.dy = -player.speed;
    if (e.key === "ArrowDown" || e.key === "s") player.dy = player.speed;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight" || e.key === "d") player.dx = 0;
    if (e.key === "ArrowLeft" || e.key === "a") player.dx = 0;
    if (e.key === "ArrowUp" || e.key === "w") player.dy = 0;
    if (e.key === "ArrowDown" || e.key === "s") player.dy = 0;
});

// Shoot on space key
document.addEventListener("keydown", (e) => {
    if (e.code === "Space") shootBullet();
});

// Start target spawner
setInterval(addTarget, targetSpawnRate);

// Start game
update();
moveCar);
obstacleTimer = setInterval(createObstacle, 1000);
setInterval(createRoadLine, 200); // Create road lines
scoreTimer = setInterval(updateScore, 100); // Update score
