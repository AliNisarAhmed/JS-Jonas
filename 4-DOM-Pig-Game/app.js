/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gamePlaying, lastRoll_1, lastRoll_2, winningScore; //gamePlaying is a state Var

init();  //starts the game

// document.querySelector('#input').addEventListener('submit', (event) => {
//   console.log(event.target);
// });


document.querySelector('.btn-roll').addEventListener('click', () => {
  if(gamePlaying) {
    let dice_1 = Math.floor(Math.random() * 6 + 1);
    let dice_2 = Math.floor(Math.random() * 6 + 1);

    // Display the dice roll result - update image
    let diceDOM_1 = document.querySelector('.dice-1');
    let diceDOM_2 = document.querySelector('.dice-2');
    diceDOM_1.style.display = 'block';
    diceDOM_2.style.display = 'block';
    diceDOM_1.src = `dice-${dice_1}.png`;
    diceDOM_2.src = `dice-${dice_2}.png`;

    //update round score and add to current score
    if (dice_1 === 1 || dice_2 === 1) {
      nextPlayer();
    } else if (lastRoll_1 === 6 && dice_1 === 6 && lastRoll_2 === 6 && dice_2 === 6 ) {
      scores[activePlayer] = 0;
      document.querySelector(`#score-${activePlayer}`).textContent = 0;
      nextPlayer();
    } else {
      lastRoll_1 = dice_1;
      lastRoll_2 = dice_2;
      roundScore += dice_1 + dice_2;
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

    let input = document.querySelector('#input').value;

    winningScore = input ? input: 100;

    if(scores[activePlayer] >= winningScore) {
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';

      document.querySelector('.dice-1').style.display = "none";
      document.querySelector('.dice-2').style.display = "none";

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
  lastRoll_1 = 0;
  lastRoll_2 = 0;
  
  //when 1 appears, make the current score of activePlayer to zero
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  // change active player class
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice-1').style.display = "none";
  document.querySelector('.dice-2').style.display = "none";
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  lastRoll = 0;

  // winningScore = document.querySelector('#input').value || 100;
  // console.log(winningScore);

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.dice-2').style.display = "none";
  document.querySelector('.dice-1').style.display = "none";

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector(`.player-0-panel`).classList.remove('winner');
  document.querySelector(`.player-1-panel`).classList.remove('winner');
  document.querySelector(`.player-0-panel`).classList.remove('active');
  document.querySelector(`.player-0-panel`).classList.add('active');
  document.querySelector(`.player-1-panel`).classList.remove('active');
}










