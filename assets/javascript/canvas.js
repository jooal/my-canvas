//grabbing canvas element
var getCanvas = document.getElementById("myCanvas");
//actual tool used to draw on canvas
var context = getCanvas.getContext("2d"); 

//setting coordinates of ball starting position
var x = getCanvas.width/2;
var y = getCanvas.height-30;

//adding small value to make it appear ball is moving that will be called in intervals
var dx = 2; 
var dy = -2;
var ballRadius = 10;

//defining paddle
var paddleHeight = 10;
var paddleWidth = 85;
var paddleX = 200;

//setting and drawing bricks 
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//paddle movement
var rightArrow = false;
var leftArrow = false;

//score
var score =0;
var lives = 3;


//-------------------------------------------//

//create an object for bricks with a loop to create new bricks
var bricks = [];
for (var i = 0; i<brickColumnCount; i++) {
    bricks[i] = [];
    for (var a = 0; a < brickRowCount; a++){
        bricks[i][a] = {x:0, y:0, status: 1};
        //add status here so if status is 1 then draw brick, if status is 0 brick has been hit and we want to delete it
    }
}

document.onkeyup = function (event) {
    if(event.keyCode == 39) {
        rightArrow = false;
    }
    else if (event.keyCode==37) {
        leftArrow= false;
    }
}

document.onkeydown = function(event) {
    if (event.keyCode ==39) {
        rightArrow = true;
    }
    else if (event.keyCode == 37) {
        leftArrow = true;
    } 
}

//function to collide with bricks 
//create a for loop that identifies position of bricks and ball : 
// The x position of the ball is greater than the x position of the brick.
// The x position of the ball is less than the x position of the brick plus its width.
// The y position of the ball is greater than the y position of the brick.
// The y position of the ball is less than the y position of the brick plus its height.
function collide() {
    for(var i=0; i<brickColumnCount; i++) {
        for(var a=0; a<brickRowCount; a++) {
            var b = bricks[i][a];
            if (b.status==1) {
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
                b.status=0
                score++;
                document.getElementById("scoreKeeper").innerHTML="Score: " + score;
                }
            }
        }
    }
}

function drawBall() {
    context.beginPath();
    context.arc(x, y, ballRadius, 0, Math.PI*2);
    context.fillStyle = "#0095DD";
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath();
    context.rect(paddleX, getCanvas.height-paddleHeight, paddleWidth, paddleHeight);
    context.fillStyle="#0095DD";
    context.fill();
    context.closePath();
    //drawPaddle();
}

function drawBricks() {
    for(var i=0; i<brickColumnCount; i++) {
        for(var a=0; a<brickRowCount; a++) {
            if (bricks[i][a].status==1){
            var brickX = (i*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (a*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[i][a].x = brickX;
            bricks[i][a].y = brickY;
            context.beginPath();
            context.rect(brickX, brickY, brickWidth, brickHeight);
            context.fillStyle = "#7682EA";
            context.fill();
            context.closePath();
            }
        }
    }
}


function draw() {
    //clearing the path of the ball so it doesnt leave a trace, first two coordinates are x&y of
    //top left corner and second pair of coordinates are x&y of bottom right corner
    context.clearRect(0, 0, getCanvas.width, getCanvas.height);
    drawBricks();
    collide();
    drawBall();
    drawPaddle();
    gameWon();
    //adding the movement 

    if(rightArrow && paddleX < getCanvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftArrow && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    

//preventing ball from running off page
//remember coordinatres of canvas start with left top corner 

//if y value is less than zero 
    if (y + dy < ballRadius) {
//setting it to the negative of itself will make it bounce backwards at same direction and speed
        dy = -dy; 
    }

    //bottom edge, y value is the top left corner that starts at 0
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > getCanvas.height-ballRadius) {
        //if the ball hits paddle bounce off
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
        //if ball misses paddle, game over
            lives--;
            document.getElementById("lives").innerHTML="Lives: " + lives;
            x = getCanvas.width/2;
            y = getCanvas.height-30;
            dx = 2;
            dy = -2;
            paddleX = (getCanvas.width-paddleWidth)/2;
          
        

        }if (lives == 0) {
                alert("Game Over");
                document.location.reload();

                
        }
            
    }


    //left and right edge
    if (x + dx < ballRadius) {
        dx = -dx;
    }

    if (x + dx > getCanvas.width-ballRadius) {
        dx = -dx;
    }
};
setInterval(draw, 15); //every 20 milliseconds 

function gameWon() {
    if (score== 15) {
        alert("You won!");
        document.location.reload();
    }
};







