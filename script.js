
// setting up the gameBoardModule
let gameBoardModule = (() => {
  let gameboard = ['X', 'O', 'X', 'O', 'X', 'O', 'X', 'O', 'X']; // Represn the 3 *3 game board

  // Defining the renderBoard function 

  const renderBoard = () => {
       const boardContainer = document.getElementById(".boardContainer");

          gameboard.forEach((cellvalue, index) => {
          const cell = document.createElement('div')
          cell.classList.add('cell'); // This line adds the class `cell` to newly created div
          cell.textContent = cellvalue;
          boardContainer.appendChild(cell)
       })
  }

  return { renderBoard }; 
})();

gameboard.renderBoard();

// setting up the displayControllerModule
let displayController = (() => {

})();


// Setting up the player factory function
let createPlayer = (name, symbol) => {
  return { name, symbol}
}



document.addEventListener("DOMContentLoaded", () => {
  // This is the startgame section
  let twoPlayers = document.querySelector(".btn-players");
  let aiPlayers = document.querySelector(".ai-players");
  let playerName = document.querySelector(".new-player-form");
  let closeButton = document.querySelector(".cross-button");
  let startButton = document.querySelector('.start-btn')

  let startGamebtn = document.querySelector(".btn-start");
    startGamebtn.addEventListener("click", () => {
    twoPlayers.style.display = "block";
    aiPlayers.style.display = "block";
  });

  twoPlayers.addEventListener("click", () => {
     playerName.style.display = "block"
  });

  playerName.addEventListener('submit', (e) => {
    e.preventDefault();
  })

  aiPlayers.addEventListener("click", () => {
    alert("Hi");
  });

  startButton.addEventListener('click', () => {
     let player1Input = document.getElementById('player1').value;
     let playe2Input = document.getElementById('player2').value;

     if (player1Input === "" || playe2Input === "") {
       alert("Please enter the name for both players");
     } else {
       playerName.style.display = "none";
     }
  })

  closeButton.addEventListener("click", () => {
    closeForm()
  })
   gameBoardModule.renderBoard();
})

function closeForm() {
  document.querySelector(".new-player-form").style.display = "none";
}