const statusDisplay = document.querySelector('.status');
const XScoreDisplay = document.querySelector('.XScore');
const OScoreDisplay = document.querySelector('.OScore');


let gameActive = true;
let currentPlayer = "X";    //don't initialize without a value
ChoosePlayer();
let gameState = ["", "", "", "", "", "", "", "", ""];
let computerMove = 4;         //don't initialize without a value

let XScore = 0;
let OScore = 0;

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

const updateXScore = () => XScore.innerHTML = XScore;
const updateOScore = () => OScore.innerHTML = OScore;




statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;

            if (currentPlayer === "X") {
            XScore += 1;
            updateXScore();
            
            } else {
            OScore += 1;
            updateOScore();
            }



            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
  

    gameActive = true;
    ChoosePlayer(); //didn't choose player when New Game button was clicked
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    

}

function computerPlayer() { //computer player ai
    
    let moveIsValid = false;


    while (!moveIsValid) { //used while loop as specified
        computerMove = Math.round(Math.random() * 9);
        
        if (gameState[computerMove] == "") {
            moveIsValid = true;
            handleCellPlayed(cell, computerMove);
            
            handleResultValidation();
        }
    }            
    
}

function ChoosePlayer() {
    if (Math.round(Math.random()) == 0) {   // rounds to 0 or 1 to choose who goes first
        
        currentPlayer = 'X';

}   else { currentPlayer = 'O'; }
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);