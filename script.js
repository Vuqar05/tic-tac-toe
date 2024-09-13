let player = function (name) {
    let score = 0
    let getScore = () => score
    let addScore = () => score++
    return {name, getScore, addScore}
}

const drawer = (function () {
    const grid = document.querySelectorAll(".cell")
    grid.forEach(x => x.addEventListener("click", (e) => {
        let id = e.target.id
        let row = Math.floor(id / 3)
        let col = id % 3
        game.playTurn(row, col)
    }))

    const fillGrid = function (row, col, symbol) {
        grid[row*3 + col].innerText = symbol
    }

    const clearGrid = () => {
        grid.forEach(e => e.innerText = "")
    }

    return {fillGrid, clearGrid}
})()


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


    const clearBoard = function () {
        for (let i = 0; i < 3; i++) {
            board[i].fill(filler)
        }
    }


    const changeNames = (player1name, player2name) => {
        player1.name = player1name
        player2.name = player2name
    }

    const checkWinnerSign = function () {
        for (let i = 0; i < 3; i++) {
            // Rows
            if (allEqual(board[i]) && board[i][0] !== filler) return board[i][0];

            // Columns
            if (allEqual([board[0][i], board[1][i], board[2][i]]) && board[0][i] !== filler) return board[0][i]

        }
        //diagonals
        if (allEqual([board[0][0], board[1][1], board[2][2]]) && board[1][1] !== filler) return board[1][1]
        if (allEqual([board[0][2], board[1][1], board[2][0]]) && board[1][1] !== filler) return board[1][1]
        return null
    }
    
    const isDraw = function () {
        for (let i = 0; i < 3; i++) {
            if (board[i].includes(filler)) return false
        }
        return true
    }

    let playTurn = (row, col) => {
        let cell = board[row][col]
        if (row < 0 || col < 0 || row > 2 || col > 2){
            console.log("ERROR: Illegal row/col number")
            return
        }
        if (cell !== filler) {
            console.log("ERROR: occupied cell")
            return
        }

        board[row][col] = player1turn ? "X" : "O"
        drawer.fillGrid(row, col, player1turn ? "X" : "O")
        player1turn = !player1turn;

        let winnerSign = checkWinnerSign()
        console.log(checkWinnerSign())
        if (winnerSign) {
            let winner = winnerSign === "X" ? player1 : player2
            winner.addScore()
            console.log(`${winner.name} won!
             \nScore: ${player1.name} - ${player1.getScore()} | ${player2.name} - ${player2.getScore()}`)
            clearBoard()
            drawer.clearGrid()
        }
        else{
            if (isDraw()) {
                clearBoard()
                drawer.clearGrid()
            }
        }
    }

    let drawGrid = () => {
        board.forEach(row => {
            console.log(row.join("|"))})
    }
    return {drawGrid, playTurn, changeNames, checkWinnerSign}
})()



