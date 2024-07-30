document.addEventListener('DOMContentLoaded', () => {
  let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };
  
  updateScoreElement();
  
  let isAutoPlaying = false;
  let intervalId = null;
  
  function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;
    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }
  
  document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
      playGame('rock')
    });
  
  document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
      playGame('paper')
    });
  
  document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
      playGame('scissors')
    });
    
  document.querySelector('.js-reset-button')
    .addEventListener('click', () => {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
      if (isAutoPlaying) {
        clearInterval(intervalId);
        isAutoPlaying = false;
      }
    });
  
  document.querySelector('.js-auto-play-button')
    .addEventListener('click', () => {
      autoPlay();
    });
  
  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
      playGame('rock');
  
    } else if (event.key === 'p') {
      playGame('paper');
  
    } else if (event.key === 's') {
      playGame('scissors');
      
    } else if (event.key === 'Backspace') {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem('score');
      updateScoreElement();
      if (isAutoPlaying) {
        clearInterval(intervalId);
        isAutoPlaying = false;
      }
  
    } else if (event.key === 'a') {
      autoPlay();
    }
  });
  
  function determineGameResult(playerMove, computerMove) {
    const outcomes = {
      rock: { rock: 'Tie', paper: 'You lose', scissors: 'You win' },
      paper: { rock: 'You win', paper: 'Tie', scissors: 'You lose' },
      scissors: { rock: 'You lose', paper: 'You win', scissors: 'Tie' },
    };
  
    return outcomes[playerMove][computerMove];
  }
  
  function updateScore(result) {
    if (result === 'You win') {
      score.wins += 1;
    } else if (result === 'You lose') {
      score.losses += 1;
    } else if (result === 'Tie') {
      score.ties += 1;
    }
  
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
  }
  
  function playGame(playerMove) {
    const computerMove = pickComputerMove();
    const result = determineGameResult(playerMove, computerMove);
  
    updateScore(result);
  
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon"> <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;
  }
  
  function updateScoreElement() {
  document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
  }
  
  
  function pickComputerMove() {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    const randomNumber = randomBuffer[0] / 0xffffffff;
  
    let computerMove = '';
  
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
    }
  
    return computerMove;
  }
  
  const toggleThemeButton = document.querySelector('.js-toggle-theme-button');
  
  toggleThemeButton.textContent = 'Light Theme';
  
  toggleThemeButton.addEventListener('click', toggleTheme);

  document.addEventListener('keydown', (e) => {
    if (e.key === 't') {
      toggleTheme();
    }
  });

  function toggleTheme() {
    const body = document.body;
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark-mode' ? 'light-mode' : 'dark-mode';
      body.setAttribute('data-theme', newTheme);

      toggleThemeButton.textContent = newTheme === 'light-mode' ? 'Dark Theme' : 'Light Theme';
  }
});