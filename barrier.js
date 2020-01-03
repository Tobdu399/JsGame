var barrierY;
var barrierX;

function displayBarrierY() {
    var wallHeight = 100;
    
    var wallDeployX = displayWidth - 80;

    var wallX = Math.random() * wallDeployX + 40;
    var wallY = displayHeight;

    barrierY = new barrier(15, wallHeight, "#ff787a", wallX, wallY);
    moveBarrier();

    // delay = setTimeout(displayBarrierY, 1500);
}

function displayBarrierX() {
    var wallWidth = 100;

    var wallDeployY = displayHeight - 40;

    var wallX = displayWidth;
    var wallY = Math.random() * wallDeployY + 20;

    barrierX = new barrier(wallWidth, 15, "#ff787a", wallX, wallY);
    moveBarrier();

    // delay = setTimeout(displayBarrierX, 2000);
}

function barrier(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedY = 0;
    this.speedX = 0;
    this.x = x;
    this.y = y;

    this.update = function() {
        ctx = display.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.newPos = function() {
        this.y += this.speedY;

        if (barrierY.y <= -100) {
            displayBarrierY();
        }

        else if (barrierX.x <= -100) {
            displayBarrierX();
        }
    }

    this.newPos2 = function() {
        this.x += this.speedX;
    }

    this.isInside = function(player) {
        var isInside = player.x >= this.x && player.x < this.x + this.width 
            && player.y >= this.y && player.y < this.y + this.height;

        return isInside;
    }
}

function moveBarrier() {
    if (barrierY.speedY == 0) {
        barrierY.speedY -= 8;
    }

    else if (barrierX.speedX == 0) {
        barrierX.speedX -= 8;
    }
}