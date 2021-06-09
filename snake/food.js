import {onSnake, expandSnake} from './snake.js'
import {getRandomGridPosition} from './grid.js'
import {EXPANSION_RATE, scoreElement, SPECIAL_FOOD_RATE} from './constants.js'

let food = getFoodPosition()
let Totalscore = 0
let nextScore = 1
let specialFood = false

export function update(){
    if(onSnake(food)){
        expandSnake(EXPANSION_RATE)
        food = getFoodPosition()
        Totalscore += nextScore;
        scoreElement.innerText = 'Score: ' + Totalscore;

        if(Math.random() < SPECIAL_FOOD_RATE){
            specialFood = true
            nextScore = 5
        } 
        else{
            specialFood = false
            nextScore = 1
        } 
    }
}

export function draw(gameBoard){
    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    if(specialFood) foodElement.classList.add('food-special')
    else foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
}

function getFoodPosition(){
    let newFoodPosition
    while(newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = getRandomGridPosition()
    }
    return newFoodPosition
}