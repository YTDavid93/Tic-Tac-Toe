// setting up the gameBoardModule
const gameBoardModule = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""]; // Represnt the 3 *3 game board

  const getGameBoard = () => gameboard; // The purpose of this function is to return the gameboard

  // Defining the renderBoard function
  const renderBoard = () => {
    let boardHTML = "";
    gameboard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.getElementById("boardContainer").innerHTML = boardHTML;

    const squares = document.querySelectorAll(".square");
    squares.forEach((square) => {
      square.addEventListener("click", game.handelClick);
    });
  };

  const update = (index, value) => {
    gameboard[index] = value;
    renderBoard();
  };

  return { renderBoard, update, getGameBoard };
})();

// setting up the displayControllerModule
const displayController = (() => {

  const renderMessage = (message) => {
     document.querySelector('.message').innerHTML = message
  }

  return {
    renderMessage
  }

})();

// Setting up the player factory function
let createPlayer = (name, mark) => {
  return { name, mark };
};

const game = (() => {
  let players = [];
  let currentPlayerIndex = 0;
  let gameOver = false;

  const startGame = () => {
    players = [
      createPlayer(document.getElementById("player1").value, "X"),
      createPlayer(document.getElementById("player2").value, "O"),
    ];

    currentPlayerIndex = 0;
    gameOver = false;
    gameBoardModule.renderBoard();
  };

  const handelClick = (event) => {
    if (gameOver) {
      return;
    }
    let index = parseInt(event.target.id.split("-")[1]);

    if (gameBoardModule.getGameBoard()[index] !== "")
    return;

      //Update the game board
    gameBoardModule.update(index, players[currentPlayerIndex].mark);

     if (checkForWinner( gameBoardModule.getGameBoard(),players[currentPlayerIndex].mark)) {
        gameOver = true;
       displayController.renderMessage(`${players[currentPlayerIndex].name} wins!🏆`);
     } else if (checkFortie(gameBoardModule.getGameBoard())) {
      gameOver =  true
      displayController.renderMessage("It's a tie🥺")
     }
       // switch player
       currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };


  // This function is clears the gameboard array
  const restart = () => {
    for (let i = 0; i < 9 ; i++) {
      gameBoardModule.update(i, ""); 
    }
    gameBoardModule.renderBoard();
    gameOver =  false;
    document.querySelector('.message').innerHTML = ''
    currentPlayerIndex = 0 //reset the current player to X
  }

  return { startGame, handelClick, restart };
})();

 function checkForWinner(board) {
   // combining the winning possibilities in tic tac toe
   const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
   ]

   for (let i = 0; i < winningCombination.length; i++) {
     const [a, b, c] = winningCombination[i]; // Destructring to get the the cell indices

     if (board[a] && board[a] === board[b] && board[a] === board[c]) {
       return true;
     }
   }
   return false;
 }

 // This function checks for tie 
 function checkFortie(board) {
    return board.every(cell => cell !== '') 
 }

document.addEventListener("DOMContentLoaded", () => {
  // This is the startgame section
  let twoPlayers = document.querySelector(".btn-players");
  let aiPlayers = document.querySelector(".ai-players");
  let playerName = document.querySelector(".new-player-form");
  let closeButton = document.querySelector(".cross-button");
  let startButton = document.querySelector(".start-btn");
  let restartButton = document.querySelector('.rst-btn')

  let startGamebtn = document.querySelector(".btn-start");
  startGamebtn.addEventListener("click", () => {
    twoPlayers.style.display = "block";
    aiPlayers.style.display = "block";
  });

  twoPlayers.addEventListener("click", () => {
    playerName.style.display = "block";
  });

  playerName.addEventListener("submit", (e) => {
    e.preventDefault();
    startGamebtn.style.display = "none";
  });

  aiPlayers.addEventListener("click", () => {
    alert("Hi");
  });

  startButton.addEventListener("click", () => {
    let player1Input = document.getElementById("player1").value;
    let player2Input = document.getElementById("player2").value;

    if (player1Input === "" || player2Input === "") {
      alert("Please enter your name to continue the game");
    } else {
      playerName.style.display = "none"; 
      document.querySelector(".player1NameDisplay").textContent = `Player One: ${player1Input}`;
      document.querySelector(".player2NameDisplay").textContent = `Player Two: ${player2Input}`;
      game.startGame();
    }
    restartButton.style.display = "block";
  });

  restartButton.addEventListener('click', () => {
     game.restart()
  })

  closeButton.addEventListener("click", () => {
    closeForm();
  });
});

function closeForm() {
  document.querySelector(".new-player-form").style.display = "none";
}
