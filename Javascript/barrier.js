function displayBarrierY() {
    var wallHeight = 100;
    
    var wallDeployX = displayWidth - 80;

    var wallX = Math.random() * wallDeployX + 40;
    var wallY = displayHeight;

    barrierY = new barrier(15, wallHeight, "#ff787a", wallX, wallY);
    moveBarrier();
}

function displayBarrierX() {
    var wallWidth = 100;

    var wallDeployY = displayHeight - 40;

    var wallX = displayWidth;
    var wallY = Math.random() * wallDeployY + 20;

    barrierX = new barrier(wallWidth, 15, "#ff787a", wallX, wallY);
    moveBarrier();
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
        // Player coordinates
        var radius = 0.7 * player.radius;

        var p1x = player.x - radius; 
        var p1y = player.y - radius;

        var p2x = player.x + radius;
        var p2y = player.y - radius;

        var p3x = player.x - radius;
        var p3y = player.y + radius;

        var p4x = player.x + radius;
        var p4y = player.y + radius;

        // Barrier coordinates
        var b1x = this.x;
        var b1y = this.y;

        var b2x = this.x + this.width;
        var b2y = this.y;

        var b3x = this.x;
        var b3y = this.y + this.height;

        var b4x = this.x + this.width;
        var b4y = this.y + this.height;

        var isInside = p1x <= b1x && b1x < p2x
            && p1y <= b1y && b1y < p3y;

        if (isInside) {
            return isInside;
        }

        isInside = p1x <= b2x && b2x < p2x
            && p1y <= b2y && b2y < p3y;

        if (isInside) {
            return isInside;
        }

        isInside = p1x <= b3x && b3x < p2x
            && p1y <= b3y && b3y < p3y;

        if (isInside) {
            return isInside;
        }

        isInside = p1x <= b4x && b4x < p2x
            && p1y <= b4y && b4y < p3y;

        // var isInside = player.x >= this.x && player.x < this.x + this.width 
        //     && player.y >= this.y && player.y < this.y + this.height;

        return isInside;
    }
}

function moveBarrier() {
    if (barrierY.speedY == 0) {
        barrierY.speedY -= 2 + playerStage * speedIncrement;
    }

    else if (barrierX.speedX == 0) {
        barrierX.speedX -= 2 + playerStage * speedIncrement;
    }
}