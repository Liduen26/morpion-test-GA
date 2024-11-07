// import test from 'node:test'

let { board, currentPlayer, setBoard, getCurrentPlayer, displayBoard, checkWin, isBoardFull, checkValidPlay, play } = require("../main");

test("Player can't place a pawn in a square already filled", () => {
    // Given
    const row = 0;
    const col = 0;
    board[row][col] = 'X';


    // When
    let valid = checkValidPlay(row, col);

    // Then
    expect(valid).toBe(false);
});

test("Player can't play twice", () => {
    // Given
    const playerFirst = getCurrentPlayer();

    // When
    console.log(currentPlayer);
    play(1, 1);

    // Then
    console.log(currentPlayer);
    
    expect(getCurrentPlayer()).not.toBe(playerFirst);
});


test("Player win if 3 symb are aligned", () => {
    setBoard([
        ['X', ' ', ' '],
        ['X', ' ', ' '],
        ['X', ' ', ' ']
    ]);

    expect(checkWin("X")).toBe(true);
})

test("Game is draw if grid is full and 3 symb aren't aligned", () => {
    setBoard([
        ['X', 'X', 'O'],
        ['O', 'O', 'X'],
        ['X', 'O', 'X']
    ]);

    expect(isBoardFull()).toBe(true);
})