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

function updateDisplay() {
    display.clear();
    player.newPos();    
    player.update();

    barrierY.newPos();
    barrierY.update();

    barrierX.newPos2();
    barrierX.update();

    for (var i = 0; i < points.length; i++) {
        if (points[i].getDeleted()) {
            continue;
        }

        if (IsSameLocation(player, points[i])) {
            points[i].setDeleted();

            playerScore += 100 * pointsMultiplier;
            document.getElementById("playerScore").innerHTML = "Score: " + playerScore;
        } 
    
        else {
            points[i].update();
        }
    }
}