const player = function (name) {
    let score = 0
    let getScore = () => score
    let addScore = () => score++
    return {name, getScore, addScore}
}

const drawer = (function () {
    let player1scoreBoard = document.querySelector("#player1")
    let player2scoreBoard = document.querySelector("#player2")

    const grid = document.querySelectorAll(".cell")
    grid.forEach(x => x.addEventListener("click", (e) => {
        let id = e.target.id
        let row = Math.floor(id / 3)
        let col = id % 3
        game.playTurn(row, col)
    }))

    const fillGrid = function (row, col, symbol) {
        grid[row*3 + col].innerText = symbol

        if (symbol === "X") grid[row*3 + col].style.color = "var(--player1-color)"
        else grid[row*3 + col].style.color = "var(--player2-color)"
    }

    const clearGrid = () => {
        grid.forEach(e => e.innerText = '')
    }

    const drawNamesAnsScores = (player1name, player2name, player1score, player2score) => {
        player1scoreBoard.innerText = `${player1name}: ${player1score}`
        player2scoreBoard.innerText = `${player2name}: ${player2score}`
    }

    const drawNameColors = (isPlayer1Turn) => {
        if (isPlayer1Turn) {
            player1scoreBoard.style.color = "var(--player1-color)"
            player2scoreBoard.style.color = "black"
        }
        else {
            player2scoreBoard.style.color = "var(--player2-color)"
            player1scoreBoard.style.color = "black"
        }
    }


    return {fillGrid, clearGrid, drawNamesAnsScores, drawNameColors}
})()


const game = (function () {
    const filler = " "
    let board = [
        [filler, filler, filler],
        [filler, filler, filler],
        [filler, filler, filler]
    ]

    let player1 = player("Bob")
    let player2 = player("Rob")
    let player1turn = true
    drawer.drawNamesAnsScores(player1.name, player2.name, 0, 0)
    drawer.drawNameColors(player1turn)

    const allEqual = (arr) => new Set(arr).size === 1;


    const clearBoard = function () {
        for (let i = 0; i < 3; i++) {
            board[i].fill(filler)
        }
        drawer.clearGrid()
    }


    const changeNames = (player1name, player2name) => {
        player1.name = player1name
        player2.name = player2name
        drawer.drawNamesAnsScores(player1name, player2name, player1.getScore(), player2.getScore())
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

    const playTurn = (row, col) => {
        let cell = board[row][col]
        if (row < 0 || col < 0 || row > 2 || col > 2 || cell !== filler) {
            return
        }

        board[row][col] = player1turn ? "X" : "O"
        drawer.fillGrid(row, col, player1turn ? "X" : "O")
        player1turn = !player1turn;


        let winnerSign = checkWinnerSign()
        if (winnerSign) {
            let winner = winnerSign === "X" ? player1 : player2
            winner.addScore()
            clearBoard()
            drawer.drawNamesAnsScores(player1.name, player2.name, player1.getScore(), player2.getScore())
        }
        else{
            if (isDraw()) {
                clearBoard()
            }
        }

        drawer.drawNameColors(player1turn)
    }

    return {playTurn, changeNames, checkWinnerSign, clearBoard}
})()


const manager = (function (){
    let player1NameField = document.querySelector("#player-1-name-input")
    let player2NameField = document.querySelector("#player-2-name-input")
    let nameConfirmButton = document.querySelector("#confirm-name-button")
    let dialog = document.querySelector("dialog")

    function setNamesFromInput() {
        let name1 = player1NameField.value
        let name2 = player2NameField.value
        if (name1 && name2) {
            game.changeNames(name1, name2)
            dialog.close()
        }
    }

    nameConfirmButton.addEventListener("click", setNamesFromInput)

    let openNamesMenuButton = document.querySelector("#open-names-menu-button")
    openNamesMenuButton.addEventListener("click", () => {
        dialog.show()
    })


    let restartButton = document.querySelector("#restart")
    restartButton.addEventListener("click", () => {
        game.clearBoard()
    })

    return {}
})()



