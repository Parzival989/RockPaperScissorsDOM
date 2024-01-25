/* Global Variables */
const symbols = ["Paper", "Rock", "Scissor"];
let playerScore = 0;
let computerScore = 0;
const scoreToWin = 1;
let gameState = 0;

/* Select Elements */
let playerOptions = document.querySelectorAll(".playerOption");
let selection = document.querySelector(".selection");
let rockComputer = document.querySelector(".rockComputer");
let paperComputer = document.querySelector(".paperComputer");
let scissorComputer = document.querySelector(".scissorComputer");
let resultMessage = document.querySelector(".resultMessage");
let computerScoreDOM = document.querySelector(".computerScore");
let playerScoreDOM = document.querySelector(".playerSore");
let actionButton = document.querySelector(".actionButton");

/* Logic */
for (let b of playerOptions) {
  b.addEventListener("mouseover", () => {
    if (gameState == 1) {
      b.classList.add("selected");
      let text = b.classList.contains("rock")
        ? "Rock"
        : b.classList.contains("paper")
        ? "Paper"
        : "Scissor";
      selection.innerHTML = text;
    }
  });

  b.addEventListener("mouseout", () => {
    if (gameState == 1) {
      b.classList.remove("selected");
      selection.innerHTML = "?";
    }
  });

  b.addEventListener("click", () => {
    if (gameState == 1) {
      let text = b.classList.contains("rock")
        ? "Rock"
        : b.classList.contains("paper")
        ? "Paper"
        : "Scissor";
      selection.innerHTML = text;
      alert(`You have selected ${text}`);
      let computerChoice = getComputerChoice();
      alert(`The Computer has selected ${computerChoice}`);
      result = evaluateSelections(computerChoice, text);
      alert(result);
      updateUI(result);
    }
  });
}

/* computer choice */
const getComputerChoice = () => {
  let choice = Math.floor(Math.random() * 3);
  return symbols[choice];
};

/*Evaluate Choice */
const evaluateSelections = (computerSelection, playerSelection) => {
  let result = "";
  computerSelectionNew = computerSelection.toLowerCase();
  playerSelectionNew = playerSelection.toLowerCase();

  // Computer wins
  if (
    (computerSelectionNew === "scissor" && playerSelectionNew === "paper") ||
    (computerSelectionNew === "paper" && playerSelectionNew === "rock") ||
    (computerSelectionNew === "rock" && playerSelectionNew === "scissor")
  ) {
    //result = "computer";
    result = `You Lose! ${computerSelection} beats ${playerSelection}`;
    computerScore++;
  }

  if (
    (playerSelectionNew === "scissor" && computerSelectionNew === "paper") ||
    (playerSelectionNew === "paper" && computerSelectionNew === "rock") ||
    (playerSelectionNew === "rock" && computerSelectionNew === "scissor")
  ) {
    result = `You Win! ${playerSelection} beats ${computerSelection}`;
    playerScore++;
  }

  // Tie
  if (playerSelectionNew === computerSelectionNew) {
    result = `Tie`;
  }
  return result;
};

const updateUI = (result) => {
  playerScoreDOM.innerHTML = playerScore;
  computerScoreDOM.innerHTML = computerScore;
  if (playerScore == scoreToWin) {
    resetGame("You have won the game");
  } else if (computerScore == scoreToWin) {
    resetGame("You have lost the game");
  }
};

actionButton.addEventListener("click", () => {
  if (gameState == 0) {
    gameState = 1;
    actionButton.innerHTML = "Stop Game";
    resultMessage.innerHTML = "Game is running";
  } else if (gameState == 1) {
    gameState = 0;
    actionButton.innerHTML = "Start Game";
    resultMessage.innerHTML = "Game is paused";
  } else {
    gameState = 1;
    playerScoreDOM.innerHTML = 0;
    computerScoreDOM.innerHTML = 0;
    computerScore = 0;
    playerScore = 0;
  }
});

const resetGame = (message) => {
  //result.innerHTML = "You have lost the game";
  resultMessage.innerHTML = message;
  gameState = 2;
  actionButton.innerHTML = "Play again";
  resetPlayerSelections();
};

const resetPlayerSelections = () => {
  for (let a of playerOptions) {
    if (a.classList.contains("selected")) {
      a.classList.remove("selected");
    }
  }
};
