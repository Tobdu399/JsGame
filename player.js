var player;

var displayWidth = 580;
var displayHeight = 400;

var playerWidth = 15;
var playerHeight = 15;

var movingUp = 0;
var movingDown = 0;
var movingLeft = 0;
var movingRight = 0;

function startGame() {
    player = new component(playerWidth, playerHeight, "#3ad64d", displayWidth / 2, displayHeight / 2);
    display.start();
    displayPoints();
    displayBarrierY();
    displayBarrierX();
}

// Moving functions
function moveup() {
    if (movingDown == 1) {
        player.speedX = 0;
        player.speedY -= 4;

        movingUp = 1;
        movingDown = 0;
        movingLeft = 0;
        movingRight = 0;
    }

    else if (movingUp == 0) {
        player.speedX  = 0;
        player.speedY -= 2;

        movingUp = 1;
        movingDown = 0;
        movingLeft = 0;
        movingRight = 0;
    }
}

function movedown() {
    if (movingUp == 1) {
        player.speedX = 0;
        player.speedY += 4;

        movingUp = 0;
        movingDown = 1;
        movingLeft = 0;
        movingRight = 0;
    }

    else if (movingDown == 0) {
        player.speedX = 0;
        player.speedY += 2

        movingUp = 0;
        movingDown = 1;
        movingLeft = 0;
        movingRight = 0;
    }
}

function moveleft() {
    if (movingRight == 1) {
        player.speedX -= 4;
        player.speedY = 0;

        movingUp = 0;
        movingDown = 0;
        movingLeft = 1;
        movingRight = 0;
    }

    else if (movingLeft == 0) {
        player.speedX -= 2;
        player.speedY = 0;

        movingUp = 0;
        movingDown = 0;
        movingLeft = 1;
        movingRight = 0;
    }
}

function moveright() {
    if (movingLeft == 1) {
        player.speedX += 4;
        player.speedY = 0;

        movingUp = 0;
        movingDown = 0;
        movingLeft = 0;
        movingRight = 1;
    }

    else if (movingRight == 0) {
        player.speedX += 2;
        player.speedY = 0;

        movingUp = 0;
        movingDown = 0;
        movingLeft = 0;
        movingRight = 1;
    }
}

// End game if player hits wall
function checkPlayer() {
    // Display current location in browser concole
    // console.log(player.x);
    // console.log(player.y);

    if (player.x == 18 || player.x == displayWidth - 18 
        || player.y == 18 || player.y == displayHeight - 18 
        || barrierX.isInside(player) || barrierY.isInside(player)) {
        alert("Game Over! \n You reached " + playerScore + " points");
        playerScore = 0;
        document.getElementById("playerScore").innerHTML = "Score: " + playerScore;

        player.speedX = 0;
        player.speedY = 0;

        movingUp = 0;
        movingDown = 0;
        movingLeft = 0;
        movingRight = 0;

        displayBarrierY();
        displayBarrierX();
        displayPoints();

        for (var i = 0; i < points.length; i++) {
            points[i].update();
        }

        /* Player position is canvas width and height divided by 2 
        meaning that player will respawn in the middle */
        
        player.x = displayWidth / 2;
        player.y = displayHeight / 2;
    }
}

function IsSameLocation (cursor, point) {
    // Compute distance between center point using
    // Pythagoran theorem.
    var r2 = cursor.radius * cursor.radius;
    var xD = cursor.x - point.x;
    var yD = cursor.y - point.y;

    // for better appearance slightly reduce radius.
    var isInside = 0.8 * r2 >= (xD * xD + yD * yD);

    return isInside;
}

// Move player using arrow buttons ----------------------------------------
document.onkeydown = function(e) {
    switch (e.key) {
        case "ArrowUp":
            moveup();
            break;

        case "ArrowDown":
            movedown();
            break;

        case "ArrowLeft":
            moveleft();
            break;

        case "ArrowRight":
            moveright();
            break;
    }
};