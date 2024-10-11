let jumping = false;
let gameOver = false;
let score = 0;
let obstacleInterval;

function startGame() {
    const player = document.getElementById("player");
    const obstacle = document.getElementById("obstacle");
    const scoreElement = document.getElementById("score");

    // Ganti gambar player
    document.getElementById("imageUploader").addEventListener("change", function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            player.style.backgroundImage = `url(${e.target.result})`; // Ganti gambar player
        };
        
        if (file) {
            reader.readAsDataURL(file); // Membaca file gambar
        }
    });

    function jump() {
        if (jumping) return;
        jumping = true;
        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
            if (jumpHeight >= 150) {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    if (jumpHeight <= 0) {
                        clearInterval(fallInterval);
                        jumping = false;
                        player.style.bottom = `${jumpHeight}px`;
                    }
                    jumpHeight -= 5;
                    player.style.bottom = `${jumpHeight}px`;
                }, 20);
            } else {
                jumpHeight += 5;
                player.style.bottom = `${jumpHeight}px`;
            }
        }, 20);
    }

    function moveObstacle() {
        let obstaclePosition = 800;
        obstacle.style.right = obstaclePosition + "px";

        obstacleInterval = setInterval(() => {
            if (gameOver) {
                clearInterval(obstacleInterval);
                alert("Game Over! Your score: " + score);
                window.location.reload();
            }

            if (obstaclePosition <= 0) {
                obstaclePosition = 800;
                score++;
                scoreElement.innerText = "Score: " + score;
            }

            obstaclePosition -= 10; // Gerakan rintangan ke kiri
            obstacle.style.right = obstaclePosition + "px";

            // Deteksi tabrakan
            const playerLeft = 400 - 25; 
            if (obstaclePosition <= playerLeft + 50 && obstaclePosition >= playerLeft && player.style.bottom === "0px") {
                gameOver = true;
            }
        }, 20);
    }

    document.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
            jump();
        }
    });

    document.addEventListener("click", () => {
        jump();
    });

    moveObstacle(); // Memulai pergerakan rintangan
}
