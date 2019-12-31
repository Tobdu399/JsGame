var player;
var playerScore = 0;

var pointsAmount = 10;

var points = [];

var displayWidth = 580;
var displayHeight = 400;

var movingUp = 0;
var movingDown = 0;
var movingLeft = 0;
var movingRight = 0;

var playerWidth = 15;
var playerHeight = 15;

var deployPointX;
var deployPointY;

var pointWidth = 4;
var pointHeight = 4;

function startGame() {
    player = new component(playerWidth, playerHeight, "#3ad64d", displayWidth / 2, displayHeight / 2);
    display.start();
}

function displayPoints() {
    for (i = 0; i < pointsAmount; i++) {
        deployPointX = displayWidth - 80;
        deployPointY = displayHeight - 80;

        var pointPositionX = Math.random() * deployPointX + 40;
        var pointPositionY = Math.random() * deployPointY + 40;

        points[i] = new component(pointWidth, pointHeight, "#333333", pointPositionX.toFixed(0), pointPositionY.toFixed(0));
    }
}

var display = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = displayWidth;
        this.canvas.height = displayHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateDisplay, 20);
    },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.radius = Math.sqrt(height*height + width*width);    

    this.update = function() {
        ctx = display.context;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        // This makes player and points squares:
        // ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;

        checkPlayer();
    }
    this.setDeleted = function() {
        this.deleted = true;
        pointsRemaining = getRemainingPoints();
        console.log(pointsRemaining);

        if (pointsRemaining == 0) {
            displayPoints();
        }
    }
    this.getDeleted = function () {
        return this.deleted;
    }
}

function getRemainingPoints() {
    var deletedPoints = 0;
    
    for (i = 0; i < points.length; i++) {
        if (points[i].getDeleted()) {
            deletedPoints++;
        }
    }

    return points.length - deletedPoints;
}

function updateDisplay() {
    display.clear();
    player.newPos();    
    player.update();

    for (var i = 0; i < points.length; i++) {
        if (points[i].getDeleted()) {
            continue;
        }

        if (IsSameLocation(player, points[i])) {
            points[i].setDeleted();

            playerScore += 100;
            document.getElementById("playerScore").innerHTML = "Score: " + playerScore;
        } 
    
        else {
            points[i].update();
        }
    }
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

    if (player.x == 18 || player.x == displayWidth - 18 || player.y == 18 || player.y == displayHeight - 18) {
        alert("Game Over! \n You reached " + playerScore + " points");
        playerScore = 0;
        document.getElementById("playerScore").innerHTML = "Score: " + playerScore;

        player.speedX = 0;
        player.speedY = 0;

        movingUp = 0;
        movingDown = 0;
        movingLeft = 0;
        movingRight = 0;

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

// Generate locations for points
displayPoints();