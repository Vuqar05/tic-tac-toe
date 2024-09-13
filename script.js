let player = function (name) {
    let score = 0
    let getScore = () => score
    let addScore = () => score++
    return {name, getScore, addScore}
}

const game = (function () {
    let filler = " "
    let board = [
        [filler, filler, filler],
        [filler, filler, filler],
        [filler, filler, filler]
    ]
    let player1name = "john"
    let player2name = "bob"

    let player1 = player(player1name)
    let player2 = player(player2name)
    let player1turn = true

    const allEqual = (arr) => new Set(arr).size === 1;


    const clearBoard = () => {board[0] = board[1] = board[2] = [filler, filler, filler]}


    const changeNames = (player1name, player2name) => {
        player1.name = player1name
        player2.name = player2name
    }

    const checkWinnerSign = () => {
        for (let i = 0; i < 3; i++) {
            // Rows
            if (allEqual(board[i]) && board[i][0] !== filler) return board[i][0];

            // Columns
            if (allEqual([board[0][i], board[1][i], board[2][i]]) && board[0][i] !== filler) return board[0][i]

        }
        //diagonals
        if (allEqual([board[0][0], board[1][1], board[2][2]]) && board[1][1] !== filler) return board[1][1]
        if (allEqual([board[0][2], board[1][1], board[2][0]]) && board[1][1] !== filler) return board[1][1]
    }

    const playTurn = (row, col) => {
        let cell = board[row][col]
        if (cell < 0 || cell > 8){
            console.log("ERROR: Illegal cell number")
            return
        }
        if (cell !== filler) {
            console.log("ERROR: occupied cell")
            return
        }

        board[row][col] = player1turn ? "X" : "O"
        player1turn = !player1turn;

        let winnerSign = checkWinnerSign()
        if (winnerSign) {
            console.log(winnerSign + " won!")
            clearBoard()
        }
        drawGrid()
    }

    let drawGrid = () => {
        board.forEach(row => {
            console.log(row.join("|"))})
    }

    return {drawGrid, playTurn, changeNames}
})()

