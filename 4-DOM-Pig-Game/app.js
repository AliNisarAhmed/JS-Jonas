/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying, lastRoll; //gamePlaying is a state Var

init();  //starts the game


document.querySelector('.btn-roll').addEventListener('click', () => {
  if(gamePlaying) {
    let dice = Math.floor(Math.random() * 6 + 1);
    console.log("dice: ", dice);
    console.log("lastRoll: ", lastRoll);

    // Display the dice roll result - update image
    let diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = `dice-${dice}.png`;

    //update round score and add to current score
    if (dice === 1) {
      nextPlayer();
    } else if (lastRoll === 6 && dice === 6 ) {
      scores[activePlayer] = 0;
      console.log('player scores: ', scores);  
      document.querySelector(`#score-${activePlayer}`).textContent = 0;
      nextPlayer();
    } else {
      lastRoll = dice;
      roundScore += dice;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
    }
  }
});
  
  

document.querySelector('.btn-hold').addEventListener('click', () => {
  if(gamePlaying) {
    // Add current score to global score

    scores[activePlayer] += roundScore;

    // update the UI

    document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
    
    // check if the holding player won the game

    if(scores[activePlayer] >= 100) {
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
      document.querySelector('.dice').style.display = "none";
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');

      gamePlaying = false;

    } else {
      // give turn to next player
      nextPlayer();

    }
  }

  
});

function nextPlayer() {
  activePlayer = activePlayer === 0 ? 1: 0;
  roundScore = 0;
  lastRoll = 0;
  
  //when 1 appears, make the current score of activePlayer to zero
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  // change active player class
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = "none";
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  lastRoll = 0;

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.dice').style.display = "none";

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector(`.player-0-panel`).classList.remove('winner');
  document.querySelector(`.player-1-panel`).classList.remove('winner');
  document.querySelector(`.player-0-panel`).classList.remove('active');
  document.querySelector(`.player-0-panel`).classList.add('active');
  document.querySelector(`.player-1-panel`).classList.remove('active');
}










