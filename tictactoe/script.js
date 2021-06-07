const player = document.getElementById("status")
const gameTable = document.getElementById("game-area").children[0]
const buttonReset = document.getElementById("restart")

const STARTED = 0;
const ENDED = 1;

const game = {
    state : STARTED,
    turn : 'X',
    moves : 0
}

function nextTurn(){
    if(game.turn === 'X') game.turn = 'O'
    else game.turn = 'X'
    player.textContent = 'Turn: Player ' + game.turn
}


function resetTable(){
    if (Math.random() > 0.5) game.turn = 'O'
    else game.turn = 'X'
    player.textContent = 'Turn: Player ' + game.turn
    game.state = STARTED
    game.moves = 0

    Array.from(document.getElementsByTagName('td')).forEach(cell => {
        cell.textContent = ''
    })
}

function checkSeq(arr){
    winningSeq = game.turn + game.turn + game.turn
    arrSeq = arr.map(i => i.textContent).join('')
    return arrSeq === winningSeq
}

function checkWinner(row, col){
    rowSeq = Array.from(gameTable.children[row].children)
    colSeq = [
        gameTable.children[0].children[col],
        gameTable.children[1].children[col],
        gameTable.children[2].children[col]
    ]
    diaSeq1 = [
        
            gameTable.children[0].children[0],
            gameTable.children[1].children[1],
            gameTable.children[2].children[2]
        
    ]
    diaSeq2 = [
        
            gameTable.children[0].children[2],
            gameTable.children[1].children[1],
            gameTable.children[2].children[0]
        
    ]
    return checkSeq(rowSeq) || checkSeq(colSeq) || checkSeq(diaSeq1) || checkSeq(diaSeq2)
}

function boxClicked(row, col){

    clickedBox = gameTable.children[row].children[col]    
    if(game.state === ENDED || clickedBox.textContent) return
    else clickedBox.textContent = game.turn;

    game.moves++;

    console.log(game.moves)

    if(checkWinner(row, col)){
        player.textContent = 'Player ' + game.turn + ' Won'
        game.state = ENDED
    }

    else if (game.moves === 9){
        player.textContent = 'Game Over'
        game.state = ENDED
    }

    else nextTurn();

}