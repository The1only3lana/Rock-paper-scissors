// ELEMENT REFERENCES
const overlay = document.getElementById("overlay");
const continueBtn = document.getElementById("continueBtn");
const intro = document.getElementById("intro");
const gameArea = document.querySelector(".game");
const scoreboard = document.getElementById("scoreboard");
const choicesContainer = document.querySelector(".choices");

// ON PAGE LOAD:
// overlay = visible (from CSS)
// game = blurred (from HTML class)
// start button + intro = visible (HTML)

// WHEN START GAME IS PRESSED
document.getElementById("startGame").addEventListener("click", () => {
    intro.style.display = "none";          // hide intro + start button
    overlay.style.display = "flex";        // keep instructions visible
    gameArea.classList.add("blurred");     // keep blur
    scoreboard.classList.add("blurred");
    choicesContainer.classList.add("blurred");
});

// WHEN CONTINUE IS PRESSED
continueBtn.addEventListener("click", () => {
    overlay.style.display = "none";        // hide instructions
    gameArea.classList.remove("blurred");  // unblur game
    scoreboard.classList.remove("blurred");
    choicesContainer.classList.remove("blurred");
});

// GAME VARIABLES
let playerScore = 0;
let computerScore = 0;
const choices = ["rock", "paper", "scissors"];

// BUTTON LISTENERS
document.getElementById("rock").onclick = () => play("rock");
document.getElementById("paper").onclick = () => play("paper");
document.getElementById("scissors").onclick = () => play("scissors");
document.getElementById("playAgain").onclick = resetRound;

// MAIN GAME FUNCTION
function play(playerChoice) {
    if (playerScore === 5 || computerScore === 5) return;

    const countdown = document.getElementById("countdown");
    const playerImg = document.getElementById("playerImg");
    const computerImg = document.getElementById("computerImg");

    // COUNTDOWN
    playerImg.style.display = "none";
    computerImg.style.display = "none";

    document.getElementById("rock").disabled = true;
    document.getElementById("paper").disabled = true;
    document.getElementById("scissors").disabled = true;

    let count = 3;
    countdown.style.display = "block";
    countdown.textContent = count;

    const timer = setInterval(() => {
        count--;
        if (count > 0) {
            countdown.textContent = count;
        } else {
            clearInterval(timer);
            countdown.style.display = "none";

            document.getElementById("rock").disabled = false;
            document.getElementById("paper").disabled = false;
            document.getElementById("scissors").disabled = false;

            const computerChoice = choices[Math.floor(Math.random() * 3)];

            playerImg.style.display = "block";
            computerImg.style.display = "block";

            playerImg.classList.add("shake");
            computerImg.classList.add("shake");

            setTimeout(() => {
                playerImg.classList.remove("shake");
                computerImg.classList.remove("shake");

                playerImg.src = `images/${playerChoice} - L.png`;
                computerImg.src = `images/${computerChoice} - R.png`;

                let result = "";

                if (playerChoice === computerChoice) {
                    result = "tie";
                } else if (
                    (playerChoice === "rock" && computerChoice === "scissors") ||
                    (playerChoice === "paper" && computerChoice === "rock") ||
                    (playerChoice === "scissors" && computerChoice === "paper")
                ) {
                    result = "player";
                    playerScore++;
                } else {
                    result = "computer";
                    computerScore++;
                }

                updateScoreboard();
                animateWinner(result);

                if (playerScore === 5 || computerScore === 5) {
                    endMatch();
                }

            }, 500);
        }
    }, 1000);
}

// UPDATE SCOREBOARD
function updateScoreboard() {
    document.getElementById("playerScore").textContent = playerScore;
    document.getElementById("computerScore").textContent = computerScore;
}

// WINNER ANIMATION
function animateWinner(winner) {
    const playerImg = document.getElementById("playerImg");
    const computerImg = document.getElementById("computerImg");

    if (winner === "player") {
        playerImg.classList.add("winner");
        setTimeout(() => playerImg.classList.remove("winner"), 600);
    } else if (winner === "computer") {
        computerImg.classList.add("winner");
        setTimeout(() => computerImg.classList.remove("winner"), 600);
    }
}

// END MATCH
function endMatch() {
    const winnerText =
        playerScore === 5 ? "You win the match!" : "Computer wins the match!";

    alert(winnerText);

    document.getElementById("rock").disabled = true;
    document.getElementById("paper").disabled = true;
    document.getElementById("scissors").disabled = true;

    document.getElementById("playAgain").style.display = "inline-block";
}

// RESET GAME
function resetRound() {
    const playerImg = document.getElementById("playerImg");
    const computerImg = document.getElementById("computerImg");

    playerScore = 0;
    computerScore = 0;
    updateScoreboard();

    playerImg.style.display = "none";
    computerImg.style.display = "none";

    document.getElementById("rock").disabled = false;
    document.getElementById("paper").disabled = false;
    document.getElementById("scissors").disabled = false;

    document.getElementById("playAgain").style.display = "none";

    // Re-blur game
    gameArea.classList.add("blurred");
    scoreboard.classList.add("blurred");
    choicesContainer.classList.add("blurred");

    // Show instructions again
    overlay.style.display = "flex";
}
