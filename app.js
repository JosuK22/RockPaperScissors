// Prevent animation on load
setTimeout(() => {
    document.body.classList.remove("preload");
  }, 500);
  
  // DOM
  const btnRules = document.querySelector(".rules-btn");
  const btnClose = document.querySelector(".close-btn");
  const modalRules = document.querySelector(".rules");
  
  const CHOICES = [
    {
      name: "paper",
      beats: "rock",
    },
    {
      name: "scissors",
      beats: "paper",
    },
    {
      name: "rock",
      beats: "scissors",
    },
  ];
  const choiceButtons = document.querySelectorAll(".choice-btn");
  const gameDiv = document.querySelector(".game");
  const resultsDiv = document.querySelector(".results");
  const resultDivs = document.querySelectorAll(".results__result");
  
  const resultWinner = document.querySelector(".results__winner");
  const resultText = document.querySelector(".results__text");
  
  const playAgainBtn = document.querySelector(".play-again");
  const resetBtn = document.querySelector(".reset-game");
  
  const userscoreNumber = document.querySelector(".user_score__number");
  const aiscoreNumber = document.querySelector(".cpu_score__number");
  
  let user_score = 0;
  let ai_score = 0;
  
  // Game Logic
  choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const choiceName = button.dataset.choice;
      const choice = CHOICES.find((choice) => choice.name === choiceName);
      choose(choice);
    });
  });
  
  function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
  }
  
  function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
  }
  
  function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
      setTimeout(() => {
        resultDiv.innerHTML = `
          <div class="choice ${results[idx].name}">
            <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
          </div>
        `;
      }, idx * 1000);
    });
  
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
  }
  
  function displayWinner(results) {
    setTimeout(() => {
      const userWins = isWinner(results);
      const aiWins = isWinner(results.reverse());
  
      if (userWins) {
        resultText.innerText = "You win!";
        resultDivs[0].classList.toggle("winner");
        UserScore(1);
        if(user_score === 5) {
          resultText.innerText = "You win the game!";
          // resultWinner.classList.toggle("hidden");
          document.querySelector(".reset-game").classList.remove("hidden");
          document.querySelector(".play-again").classList.add("hidden");
        }
      } else if (aiWins) {
        resultText.innerText = "You lose!";
        resultDivs[1].classList.toggle("winner");
        CPUScore(1);
        if(ai_score === 5) {
          resultText.innerText = "You lose the game!";
          // resultWinner.classList.toggle("hidden");
          document.querySelector(".reset-game").classList.remove("hidden");
          document.querySelector(".play-again").classList.add("hidden");
        }
      } else {
        resultText.innerText = "Draw";
      }
      resultWinner.classList.toggle("hidden");
      resultsDiv.classList.toggle("show-winner");
    }, 1000);
  
  }
  
  function isWinner(results) {
    return results[0].beats === results[1].name;
  }
  
  function UserScore(point) {
    user_score += point;
    userscoreNumber.innerText = user_score;
  }
  
  function CPUScore(point) {
    ai_score += point;
    aiscoreNumber.innerText = ai_score;
  }
  
  
  
  // Play Again
  playAgainBtn.addEventListener("click", () => {
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
  
    resultDivs.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
    });
  
    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  });
  
  // Show/Hide Rules
  btnRules.addEventListener("click", () => {
    modalRules.classList.toggle("show-rules");
  });
  btnClose.addEventListener("click", () => {
    modalRules.classList.toggle("show-rules");
  });
  
  document.querySelector(".reset-game").addEventListener("click", () => {
    // Reset scores
    user_score = 0;
    ai_score = 0;
    userscoreNumber.innerText = user_score;
    aiscoreNumber.innerText = ai_score;
  
    // Hide result elements
    resultText.innerText = "";
    resultWinner.classList.add("hidden");
    resultsDiv.classList.remove("show-winner");
  
    // Show game elements
    gameDiv.classList.remove("hidden");
    resultsDiv.classList.add("hidden");
  
    // Reset choices
    resultDivs.forEach((resultDiv) => {
      resultDiv.innerHTML = "";
      resultDiv.classList.remove("winner");
    });
  
    // Reset play again button
    document.querySelector(".play-again").classList.remove("hidden");
    document.querySelector(".reset-game").classList.add("hidden");
  });