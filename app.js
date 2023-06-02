const grid = document.querySelector('.grid')
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const userStart = [230 , 10]
const ballDiameter = 20
const scoreDisplay = document.querySelector('#score')
let currrentPosition =userStart
const start = document.querySelector('#start')
const restart = document.querySelector('#restart')
const ballStart = [270 , 30]
let ballCurrentPosition = ballStart
let timerId
let score = 0
let xDirection =2
let yDirection =2
//create block
class Block{
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis+blockHeight]
        this.topRight = [xAxis+blockWidth, yAxis+blockHeight]
    }
}

//all my blocks
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),  
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
]

// console.log(blocks[0])

//draw my block
function addBlock(){

    for (let i = 0; i < blocks.length ; i++){
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }

}
addBlock()


//add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

//draw user 
function drawUser() {
    user.style.left = currrentPosition[0]+'px'
    user.style.bottom = currrentPosition[1]+'px'
}

//draw ball
function drawBall(){
    ball.style.left = ballCurrentPosition[0]+'px'
    ball.style.bottom = ballCurrentPosition[1]+'px'    
}

//move user

function moveUser(e) {
    switch(e.key){
        case 'ArrowLeft' :
            if(currrentPosition[0]> 10)
            {currrentPosition[0] -= 10
            drawUser()}
            break;
        case 'ArrowRight' :
            if(currrentPosition[0]< boardWidth -10 - blockWidth)
            {currrentPosition[0] += 10
            drawUser()}
            break;

    }
}

document.addEventListener('keydown', moveUser)

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)

//move ball
function moveBall(){
    ballCurrentPosition[0]+=xDirection
    ballCurrentPosition[1]+=yDirection
    drawBall()
    checkForCollisions()
}

start.addEventListener('click', ()=>{
    timerId = setInterval(moveBall,20)
})
restart.addEventListener('click', ()=>{
    
})



function checkForCollisions(){
    //check for block collosion
    for(let i = 0;  i<blocks.length ; i++){
        if(
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0]< blocks[i].bottomRight[0])&&
            ((ballCurrentPosition[1]+ballDiameter)> blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ){
            const allBlock = Array.from(document.querySelectorAll('.block'))
            allBlock[i].classList.remove('block')
            blocks.splice(i, 1)
            changeDirection()
            score++;
            scoreDisplay.innerHTML = score

            //check for win
            if(blocks.length === 0){
                clearInterval(timerId)
                scoreDisplay.innerHTML = 'You Won'
                document.removeEventListener('keydown', moveUser)
            }
        }
    }

    //user Collision
    if((ballCurrentPosition[0]> currrentPosition[0] && ballCurrentPosition[0] < currrentPosition[0]+blockWidth) && 
    (ballCurrentPosition[1] > currrentPosition[1] && ballCurrentPosition[1] < currrentPosition[1]+ blockHeight)
    ){
        changeDirection()
    }

    //check for wall collisions
    if((ballCurrentPosition[0]>=boardWidth-ballDiameter)  || ballCurrentPosition[1] >= (boardHeight-ballDiameter) || (ballCurrentPosition[0]<=0)){
        changeDirection()
    }

    //check for game Over
    if(ballCurrentPosition[1]<=0)
    {
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'You Lose'
        document.removeEventListener('keydown', moveUser)
        
    }
}

function changeDirection(){
    if((xDirection === 2 && yDirection === 2) ){
        yDirection = -2
        return
    }

    if(xDirection === 2 && yDirection === -2){
        xDirection = -2
        return
    }

    if(xDirection === -2 && yDirection === -2){
        yDirection = 2
        return
    }

    if(xDirection === -2 && yDirection === 2){
        xDirection = 2
        return
    }

}