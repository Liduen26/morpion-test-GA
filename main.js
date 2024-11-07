const prompt = require('prompt-sync')({sigint: true});


// Initialisation de la grille (3x3)
let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];
function setBoard(newBoard) {
    board = newBoard;
}

let currentPlayer = 'X';

function getCurrentPlayer() {
    return currentPlayer;
}

// Fonction pour afficher la grille dans la console
function displayBoard() {
    console.clear();
    console.log('  0   1   2');
    board.forEach((row, index) => {
        console.log(index + ' ' + row.join(' | '));
        if (index < 2) console.log('  ---------');
    });
}

// Fonction pour vérifier si un joueur a gagné
function checkWin(player) {
    // Vérifie les lignes, colonnes et diagonales
    return (
        board.some(row => 
            row.every(cell => cell === player)) || // Lignes
            [0, 1, 2].some(col => board[0][col] === player && board[1][col] === player && board[2][col] === player) || // Colonnes
            (board[0][0] === player && board[1][1] === player && board[2][2] === player) || // Diagonale 1
            (board[0][2] === player && board[1][1] === player && board[2][0] === player) // Diagonale 2
    );
}

// Fonction pour vérifier si la grille est pleine (match nul)
function isBoardFull() {
    return board.flat().every(cell => cell !== ' ');
}

function checkValidPlay(row, col) {
    // Vérifie la validité du coup
    if (isNaN(row) || isNaN(col) || 
        row < 0 || row > 2 || col < 0 || col > 2 || 
        board[row][col] !== ' ') {
        console.log('Coup invalide, essayez à nouveau.');
        return false;
    }
    return true;
}

// Fonction principale du jeu
function play(row, col) {

    if (!checkValidPlay(row, col)) {
        return false;
    }

    // Place le coup sur la grille
    board[row][col] = currentPlayer;

    // Change de joueur
    console.log(currentPlayer);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    console.log(currentPlayer);
    

    return true;
}

function main() {

    while (true) {
        displayBoard();
        console.log(`Joueur ${currentPlayer}, entrez votre coup (ligne et colonne) :`);

        let row = parseInt(prompt('Ligne (0, 1 ou 2) :'));
        let col = parseInt(prompt('Colonne (0, 1 ou 2) :'));

        if (!play(row, col)) {
            continue;
        }

        // Vérifie si le joueur actuel a gagné
        if (checkWin(currentPlayer)) {
            displayBoard();
            console.log(`Joueur ${currentPlayer} a gagné !`);
            break;
        }

        // Vérifie si la grille est pleine
        if (isBoardFull()) {
            displayBoard();
            console.log("Match nul !");
            break;
        }
    }
}

// main();

// Exportation des fonctions et de la grille
module.exports = { board, currentPlayer, setBoard, getCurrentPlayer, displayBoard, checkWin, isBoardFull, checkValidPlay, play };