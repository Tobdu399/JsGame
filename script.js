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