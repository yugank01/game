
let board = new Array(4).fill(null).map(() => new Array(4).fill(0));
let gameOver = false;
let currentScore = 0;
let highestScore = localStorage.getItem("highestScore") || 0; 
window.onload = initializeGame;

function initializeGame() {
    currentScore = 0;
    updateScoreDisplay();
    addRandomTile();
    addRandomTile();
    displayBoard();
    document.addEventListener("keydown", handleKeyPress);
}

function updateScoreDisplay() {
    const currentScoreElement = document.getElementById("current-score");
    const highestScoreElement = document.getElementById("highest-score");

    currentScoreElement.textContent = currentScore;
    highestScoreElement.textContent = highestScore;
    localStorage.setItem("highestScore", highestScore);
}

function addRandomTile() {
    const availableTiles = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                availableTiles.push({ row, col });
            }
        }
    }

    if (availableTiles.length > 0) {
        const { row, col } = availableTiles[Math.floor(Math.random() * availableTiles.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function displayBoard() {
    const gameBoard = document.querySelector(".game-board");
    gameBoard.innerHTML = "";

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.textContent = board[row][col] === 0 ? "" : board[row][col];
            tile.style.backgroundColor = getTileColor(board[row][col]);
            gameBoard.appendChild(tile);
        }
    }
}

function getTileColor(value) {
    switch (value) {
        case 2:
            return "#eee4da";
        case 4:
            return "#ede0c8";
        case 8:
            return "#f2b179";
        case 16:
            return "#f59563";
        case 32:
            return "#f67c5f";
        case 64:
            return "#f65e3b";
        case 128:
            return "#edcf72";
        case 256:
            return "#edcc61";
        case 512:
            return "#edc850";
        case 1024:
            return "#edc53f";
        case 2048:
            return "#edc22e";
        default:
            return "#3c3a32";
    }
}

function handleKeyPress(event) {
    if (!gameOver) {
        switch (event.key) {
            case "ArrowUp":
                moveTilesUp();
                break;
            case "ArrowDown":
                moveTilesDown();
                break;
            case "ArrowLeft":
                moveTilesLeft();
                break;
            case "ArrowRight":
                moveTilesRight();
                break;
        }
        if (isGameOver()) {
            gameOver = true;
            showGameOverMessage();
        } else {
            addRandomTile();
            displayBoard();
        }
    }
}

function moveTilesUp() {
    let mergedValue = 0;

    for (let col = 0; col < 4; col++) {
        for (let row = 1; row < 4; row++) {
            if (board[row][col] !== 0) {
                let currentRow = row;
                while (currentRow > 0 && board[currentRow - 1][col] === 0) {
                    board[currentRow - 1][col] = board[currentRow][col];
                    board[currentRow][col] = 0;
                    currentRow--;
                }

                if (currentRow > 0 && board[currentRow - 1][col] === board[currentRow][col]) {
                    board[currentRow - 1][col] *= 2;
                    mergedValue += board[currentRow - 1][col];
                    board[currentRow][col] = 0;
                }
            }
        }
    }

    currentScore += mergedValue;

    if (currentScore > highestScore) {
        highestScore = currentScore;
    }

    updateScoreDisplay();
}

function moveTilesDown() {
    let mergedValue = 0;

    for (let col = 0; col < 4; col++) {
        for (let row = 2; row >= 0; row--) {
            if (board[row][col] !== 0) {
                let currentRow = row;
                while (currentRow < 3 && board[currentRow + 1][col] === 0) {
                    board[currentRow + 1][col] = board[currentRow][col];
                    board[currentRow][col] = 0;
                    currentRow++;
                }

                if (currentRow < 3 && board[currentRow + 1][col] === board[currentRow][col]) {
                    board[currentRow + 1][col] *= 2;
                    mergedValue += board[currentRow + 1][col];
                    board[currentRow][col] = 0;
                }
            }
        }
    }

    currentScore += mergedValue;

    if (currentScore > highestScore) {
        highestScore = currentScore;
    }

    updateScoreDisplay();
}

function moveTilesLeft() {
    let mergedValue = 0;

    for (let row = 0; row < 4; row++) {
        for (let col = 1; col < 4; col++) {
            if (board[row][col] !== 0) {
                let currentCol = col;
                while (currentCol > 0 && board[row][currentCol - 1] === 0) {
                    board[row][currentCol - 1] = board[row][currentCol];
                    board[row][currentCol] = 0;
                    currentCol--;
                }

                if (currentCol > 0 && board[row][currentCol - 1] === board[row][currentCol]) {
                    board[row][currentCol - 1] *= 2;
                    mergedValue += board[row][currentCol - 1];
                    board[row][currentCol] = 0;
                }
            }
        }
    }

    currentScore += mergedValue;

    if (currentScore > highestScore) {
        highestScore = currentScore;
    }

    updateScoreDisplay();
}

function moveTilesRight() {
    let mergedValue = 0;

    for (let row = 0; row < 4; row++) {
        for (let col = 2; col >= 0; col--) {
            if (board[row][col] !== 0) {
                let currentCol = col;
                while (currentCol < 3 && board[row][currentCol + 1] === 0) {
                    board[row][currentCol + 1] = board[row][currentCol];
                    board[row][currentCol] = 0;
                    currentCol++;
                }

                if (currentCol < 3 && board[row][currentCol + 1] === board[row][currentCol]) {
                    board[row][currentCol + 1] *= 2;
                    mergedValue += board[row][currentCol + 1];
                    board[row][currentCol] = 0;
                }
            }
        }
    }

    currentScore += mergedValue;

    if (currentScore > highestScore) {
        highestScore = currentScore;
    }

    updateScoreDisplay();
}

function isGameOver() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                return false;
            }
        }
    }

    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === board[row][col + 1]) {
                return false;
            }
        }
    }

    for (let col = 0; col < 4; col++) {
        for (let row = 0; row < 3; row++) {
            if (board[row][col] === board[row + 1][col]) {
                return false;
            }
        }
    }

    return true;
}

function showGameOverMessage() {
    const gameOverMessage = document.querySelector(".game-over");
    gameOverMessage.style.display = "block";
}
document.getElementById("restart-button").addEventListener("click", restartGame);
function restartGame() {
    board = new Array(4).fill(null).map(() => new Array(4).fill(0));
    gameOver = false;
    currentScore = 0;
    const gameOverMessage = document.querySelector(".game-over");
    gameOverMessage.style.display = "none";
    initializeGame();
}
