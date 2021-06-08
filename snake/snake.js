import { getInputDirection } from "./input.js"

export const SNAKE_SPEED = 5

const snakeBody = [
    {x:10, y:11}
]

export function update(){
    expandSnake()
    const inputDirection = getInputDirection()

    for(let i = snakeBody.length - 2; i>=0; i--){
        snakeBody[i+1] = {...snakeBody[i]}
    }
    
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard){
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}

export function expandSnake(amount){
    for(let i=0; i<amount; i++){
        snakeBody.push({...snakeBody[snakeBody.length - 1]})
    }
}

export function onSnake(position){
    return snakeBody.some(segment =>{
        return segment.x === position.x && segment.y === position.y
    })
}

export function getSnakeHead(){
    return snakeBody[0]
}

export function snakeIntersection(position){
    return snakeBody.some((segment, index) =>{
        if(index===0) return false
        return segment.x === position.x && segment.y === position.y
    })
}
