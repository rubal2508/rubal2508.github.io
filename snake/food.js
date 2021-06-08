import {onSnake, expandSnake} from './snake.js'
import {getRandomGridPosition} from './grid.js'
import {EXPANSION_RATE} from './constants.js'

let food = getFoodPosition()

export function update(){
    if(onSnake(food)){
        expandSnake(EXPANSION_RATE)
        food = getFoodPosition()
    }
}

export function draw(gameBoard){
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
}

function getFoodPosition(){
    let newFoodPosition
    while(newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = getRandomGridPosition()
    }
    return newFoodPosition
}