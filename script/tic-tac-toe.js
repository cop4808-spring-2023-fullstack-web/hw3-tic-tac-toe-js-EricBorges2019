const statusDisplay = document.querySelector('.status');
const Scoreboard = document.querySelector('.Scoreboard');

const cell1 = document.querySelector('#c1');
const cell2 = document.querySelector('#c2');
const cell3 = document.querySelector('#c3');
const cell4 = document.querySelector('#c4');
const cell5 = document.querySelector('#c5');
const cell6 = document.querySelector('#c6');
const cell7 = document.querySelector('#c7');
const cell8 = document.querySelector('#c8');
const cell9 = document.querySelector('#c9');
const cells = document.querySelectorAll('.cell');

//copied above const cells whatever from main.js to make stuff easier


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

const currentScore = () => `X - ${XScore}\nO - ${OScore}`;


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

if (currentPlayer === "O") {
    computerPlayer();
    currentPlayer = "X"; 
    statusDisplay.innerHTML = currentPlayerTurn();
}

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

            if (currentPlayer === "X" && roundWon) {
            XScore = XScore + 1;
            Scoreboard.innerHTML = currentScore();
            
            

            
            } else if (currentPlayer === "O" && roundWon) {

            OScore = OScore + 1;
            Scoreboard.innerHTML = currentScore();
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
    ChoosePlayer();
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");

    if (currentPlayer === "O") {
        computerPlayer();
        currentPlayer = "X"; 
    }
    

}

function computerPlayer() { //computer player ai

    console.log("Computer Player called!");

    
    
    let moveIsValid = false;
    let currentMoveNumber = 0;



    while (!moveIsValid) { //used while loop as specified
        currentMoveNumber += 1;
        console.log(currentMoveNumber);
        

        computerMove = Math.round(Math.random() * 8);

        console.log(computerMove);

        if (gameState[computerMove] == "") {
            
            moveIsValid = true; //breaks loop
            
            console.log("move was valid");

            

            handleCellPlayed(computerMove, computerMove);

            
            handleResultValidation();
            cells[computerMove].innerHTML = "O";
            

            handlePlayerChange();
            
        }
        
        
        
        else {
            console.log("move was invalid");
        return
        }

        currentPlayer = "X";
        
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