window.onload = function() {
	var gameState = 'notStarted',
	    player = {
	        name: '',
	        score: 0
	    },
	    computer = {
	        score: 0
	    };
	var newGameBtn = document.getElementById('js-newGameButton');
	var pickRock = document.getElementById('js-playerPick_rock'),
     	pickPaper = document.getElementById('js-playerPick_paper'),
     	pickScissors = document.getElementById('js-playerPick_scissors');
    var newGameElem = document.getElementById('js-newGameElement'),
	    pickElem = document.getElementById('js-playerPickElement'),
	    resultsElem = document.getElementById('js-resultsTableElement');
	var playerPointsElem = document.getElementById('js-playerPoints'),
	    playerNameElem = document.getElementById('js-playerName'),
	    computerPointsElem = document.getElementById('js-computerPoints');
	var playerPickElem = document.getElementById('js-playerPick'),
	    computerPickElem = document.getElementById('js-computerPick'),
	    playerResultElem = document.getElementById('js-playerResult'),
	    computerResultElem = document.getElementById('js-computerResult');
	var winningAlert = document.getElementById('js-result'),
		winningAlertHeading = winningAlert.firstElementChild;

    function setGameElements() {
  	switch(gameState) {
	    case 'started':
	        newGameElem.style.display = 'none';
	        pickElem.style.display = 'block';
	        resultsElem.style.display = 'block';
	        winningAlert.style.display = 'none';
	      break;
	    case 'ended':
	        newGameBtn.innerText = 'Once again?';
	        newGameElem.style.display = 'block';
	        winningAlert.style.display = 'block';
	      break;
	    case 'notStarted':
	    default:
	        newGameElem.style.display = 'block';
	        pickElem.style.display = 'none';
	        resultsElem.style.display = 'none';
	        winningAlert.style.display = 'none';
  		}
	}

	function newGame() {
  		player.name = prompt('Please enter your name', 'imię gracza');
	  	if (player.name) {
		    player.score = computer.score = 0;
		    gameState = 'started';
		    setGameElements();
		    playerNameElem.innerHTML = player.name;
  		}
	}
	
	function playerPick(playerPick) {
    	var computerPick = getComputerPick();
    	playerPickElem.innerHTML = playerPick;
    	computerPickElem.innerHTML = computerPick;
    	checkRoundWinner(playerPick, computerPick);
    	setGamePoints();
	}

	function getComputerPick() {
    	var possiblePicks = ['rock', 'paper', 'scissors'];
    	return possiblePicks[Math.floor(Math.random()*3)];
	}

	function checkRoundWinner(playerPick, computerPick) {
  		playerResultElem.innerHTML = computerResultElem.innerHTML = '';
  		var winnerIs = 'player';
	    if (playerPick == computerPick) {
	        winnerIs = 'noone'; // remis
	    } else if (
	        (computerPick == 'rock' &&  playerPick == 'scissors') ||
	        (computerPick == 'scissors' &&  playerPick == 'paper') ||
	        (computerPick == 'paper' &&  playerPick == 'rock')) {

	        winnerIs = 'computer';
	    }
	    if (winnerIs == 'player') {
	        playerResultElem.innerHTML = "Win!";
	        player.score++;
	    } else if (winnerIs == 'computer') {
	        computerResultElem.innerHTML = "Win!";
	        computer.score++;
	    }
	}

	function setGamePoints() {
	    playerPointsElem.innerHTML = player.score;
	    computerPointsElem.innerHTML = computer.score;
	    checkGameState(player.score, computer.score);
	}

	function checkGameState(playerPoints, computerPoints) {
		console.log('sprawdzam');
		var weHaveWinner = true;
		playerPoints > 9 ? winningAlertHeading.innerHTML += player.name + "!" : computerPoints > 9 ? winningAlertHeading.innerHTML += "computer!" : weHaveWinner = false;
		if(weHaveWinner) {
			gameState = 'ended';
			setGameElements();
		}
	}

	newGameBtn.addEventListener('click', newGame);
	pickRock.addEventListener('click', function() { playerPick('rock') });
	pickPaper.addEventListener('click', function() { playerPick('paper') });
	pickScissors.addEventListener('click', function() { playerPick('scissors') });
	setGameElements();
}
