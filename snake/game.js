import {
    update as updateSnake,
    draw as drawSnake,
    getSnakeHead,
    snakeIntersection,
} from './snake.js'

import {
    update as updateFood,
    draw as drawFood
} from './food.js'

import {outsideGrid} from './grid.js'

import {gameBoard, SNAKE_SPEED} from './constants.js'


let lastRenderTime = 0
let gameOver = false

function main(currentTime){
    if(gameOver){
        if(confirm(`Game Over! Press OK to restart`)){
            location.reload()
        }
        return
    }

    window.requestAnimationFrame(main)
    const timeDiff = currentTime - lastRenderTime
    if(timeDiff < 1000/SNAKE_SPEED) return
    lastRenderTime = currentTime

    update()
    draw()
}

window.requestAnimationFrame(main)

function update(){
    updateSnake()
    checkDeath()
    updateFood()
}

function draw(){
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection(getSnakeHead())
}