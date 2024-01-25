/* Global Variables */
const symbols = ["Paper", "Rock", "Scissor"];
let playerScore = 0;
let computerScore = 0;
const scoreToWin = 1;

/* Select Elements */
let playerOptions = document.querySelectorAll(".playerOption");
let selection = document.querySelector(".selection");
let rockComputer = document.querySelector(".rockComputer");
let paperComputer = document.querySelector(".paperComputer");
let scissorComputer = document.querySelector(".scissorComputer");
let result = document.querySelector(".result");
let computerScoreDOM = document.querySelector(".computerScore");
let playerScoreDOM = document.querySelector(".playerSore");

/* Logic */
for (let b of playerOptions) {
  b.addEventListener("mouseover", () => {
    b.classList.add("selected");
    let text = b.classList.contains("rock")
      ? "Rock"
      : b.classList.contains("paper")
      ? "Paper"
      : "Scissor";
    selection.innerHTML = text;
  });

  b.addEventListener("mouseout", () => {
    b.classList.remove("selected");
    selection.innerHTML = "?";
  });

  b.addEventListener("click", () => {
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
  });
}

/* computer choice */
const getComputerChoice = () => {
  let choice = Math.floor(Math.random() * 3);
  /*
  switch (choice) {
    case 0:
      rockComputer.classList.add("selectedComputer");
      break;
    case 1:
      paperComputer.classList.add("selectedComputer");
      break;
    case 2:
      scissorComputer.classList.add("selectedComputer");
      break;
    default:
      console.log("unexpected");
  }
  */
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

  // Player wins
  // Computer wins
  if (
    (playerSelectionNew === "scissor" && computerSelectionNew === "paper") ||
    (playerSelectionNew === "paper" && computerSelectionNew === "rock") ||
    (playerSelectionNew === "rock" && computerSelectionNew === "scissor")
  ) {
    result = `You Win! ${playerSelection} beats ${computerSelection}`;
    playerScore++;
    //result = `player`;
  }

  // Tie
  if (playerSelectionNew === computerSelectionNew) {
    result = `Tie`;
  }

  console.log(result);

  return result;
};

/* */

const updateUI = (result) => {
  playerScoreDOM.innerHTML = "1";
  console.log("hello");
  if (playerScore == scoreToWin) {
    result.innerHTML = "You have won the game";
    playerScoreDOM.innerHTML = 0;
    computerScoreDOM.innerHTML = 0;
  } else if (computerScore == scoreToWin) {
    result.innerHTML = "You have lost the game";
    playerScoreDOM.innerHTML = 0;
    computerScoreDOM.innerHTML = 0;
  } else {
    playerScoreDOM.innerHTML = playerScore;
    computerScoreDOM.innerHTML = computerScore;
    //rockComputer.classList.remove("selectedComputer");
    //paperComputer.classList.remove("selectedComputer");
    //scissorComputer.classList.remove("selectedComputer");
  }
};
