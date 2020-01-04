function clearCanvas() {
    var canvas = document.getElementById('fakeCanvas');
    canvas.parentNode.removeChild(canvas);

    return false;
}

function removeButton() {
    var button = document.getElementById("startBtn");
    button.parentNode.removeChild(button);

    return false;
}

function retry() {
    if (gameOver == true) {
        gameOver = false;

        document.getElementById("gameDisplay").style.WebkitFilter="grayscale(0%)";

        player.x = displayWidth / 2;
        player.y = displayHeight / 2;

        playerScore = 0;
        pointsMultiplier = 1;

        document.getElementById("playerScore").innerHTML = "Score: " + playerScore;
        document.getElementById("playerMultiplier").innerHTML = "Mulitplier: " + pointsMultiplier + "x";

        player.speedX = 0;
        player.speedY = 0;

        barrierX.speedX = 0;
        barrierY.speedY = 0;

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
    }

    else {
        return;
    }
}