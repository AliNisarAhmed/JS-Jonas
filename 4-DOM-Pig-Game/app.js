/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;

// const dice = Math.floor(Math.random() * 6 + 1);


document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


document.querySelector('.dice').style.display = "none";

document.querySelector('.btn-roll').addEventListener('click', () => {
  let dice = Math.floor(Math.random() * 6 + 1);


  // Display the dice roll result - update image
  let diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = `dice-${dice}.png`;

  //update round score and add to current score
  if (dice !== 1) {
    roundScore += dice;
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
  } else {
    activePlayer = activePlayer === 0 ? 1: 0;
    roundScore = 0;
    
    //when 1 appears, make the current score of activePlayer to zero
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // change active player class
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = "none";
  }
})



















