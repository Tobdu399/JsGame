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
            pointsMultiplier += 1;
            document.getElementById("playerMultiplier").innerHTML = "Multiplier: " + pointsMultiplier + "x";
        }
    }

    this.getDeleted = function () {
        return this.deleted;
    }
}