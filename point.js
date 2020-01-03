var points = [];
var pointsAmount = 10;

var pointsMultiplier = 1;

var displayWidth = 580;
var displayHeight = 400;

var playerScore = 0;

var deployPointX;
var deployPointY;

var pointWidth = 4;
var pointHeight = 4;

function displayPoints() {
    for (i = 0; i < pointsAmount; i++) {
        deployPointX = displayWidth - 80;
        deployPointY = displayHeight - 80;

        var pointPositionX = Math.random() * deployPointX + 40;
        var pointPositionY = Math.random() * deployPointY + 40;

        points[i] = new component(pointWidth, pointHeight, "#333333", pointPositionX.toFixed(0), pointPositionY.toFixed(0));
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