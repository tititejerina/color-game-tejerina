
var colors = [];
var pickedColor;
var numSquares = 6;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function generateRandomColors(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push(randomColor());
    }

    return arr;
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
        squares[i].style.opacity = "1";
    }
}

function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();

    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";

    resetButton.textContent = "Nuevos Colores";
    h1.style.backgroundColor = "steelblue";

    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.opacity = "1";
        } else {
            squares[i].style.display = "none";
        }
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            var clickedColor = this.style.backgroundColor;

            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "¡Correcto!";
                resetButton.textContent = "Play Again?";

                h1.style.backgroundColor = pickedColor;
                changeColors(pickedColor);

            } else {
                this.style.opacity = "0";
                messageDisplay.textContent = "Intentalo nuevamente";
            }
        });
    }
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");

            this.classList.add("selected");

            numSquares = this.textContent === "Easy" ? 3 : 6;

            reset();
        });
    }
}

resetButton.addEventListener("click", function() {
    reset();
});

function init() {
    setupSquares();
    setupModeButtons();
    reset();
}

init();
