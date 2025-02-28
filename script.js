const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const resetButton = document.querySelector(".reset");
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Winning combinations
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
];

// Handle Cell Click
function handleCellClick(event) {
    const index = event.target.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("taken");

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
        gameActive = false;
    } else if (board.includes("")) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    } else {
        statusText.textContent = "It's a Draw! 😐";
        gameActive = false;
    }
}

// Check for a Winner
function checkWin() {
    return winPatterns.some((pattern) => {
        return pattern.every((index) => board[index] === currentPlayer);
    });
}

// Reset Game
function resetGame() {
    board.fill("");
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Player X's turn`;
    cells.forEach((cell) => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
}

// Event Listeners
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
