// ********************************************** var

const crossTop = document.querySelector(".cross-top")
const crossLeft = document.querySelector(".cross-left")
const crossBottom = document.querySelector(".cross-bottom")
const crossRight = document.querySelector(".cross-right")

const buttonSelect = document.querySelector(".button--select ")
const buttonStart = document.querySelector(".button--start")
const buttonSS = document.querySelectorAll(".buttonSS")
const gameboyStart = document.querySelector(".screen-container .screen-game img")
const screenGame = document.querySelector(".screen-container .screen-game")
const scoreParagraphe = document.querySelector(".score--paragraphe")
const powerLight = document.querySelector(".screen-container .power")
let gameBoyIsOn = false

var canvas, ctx;
var score = 0
var scoreHtml = document.querySelectorAll(".score--number")
var gameHover = document.querySelector(".game-hover")
var count = 0
var biteBool = false

var firstOn = false



// ********************************************** functions

function keyRightDown() {
    console.log("right");
    crossRight.style.boxShadow = "0 4px 3px 1px #FCFCFC"
}

function keyTopDown() {
    console.log("top");
}

function keyLeftDown() {
    console.log("left");

}

function keyBottomDown() {
    console.log("bottom");
}

function stopGameboy() {
    scoreParagraphe.style.opacity = "0"
    gameboyStart.style.opacity = "0.8"
    screenGame.style.backgroundColor = "rgb(84, 100, 82)"
    canvas.style.opacity = "0"

    setTimeout(() => {
        powerLight.classList.replace("power--On", "power--off")
        screenGame.style.backgroundColor = "rgb(52, 58, 51)"
        gameboyStart.style.opacity = "0"
        gameBoyIsOn = false
        firstOn = true
    }, 3000);
}


function startGameboy() {
    setTimeout(() => {
        gameboyStart.style.opacity = "0.8"
        screenGame.style.backgroundColor = "rgb(84, 100, 82)"
    }, 400);
    setTimeout(() => {
        if (firstOn == true) {
            canvas.style.opacity = "1"
        }
        gameboyStart.style.opacity = "0"
        powerLight.classList.replace("power--off", "power--On")
        gameboyStart.style.opacity = "0"
        scoreParagraphe.style.opacity = "0.6"
        gameBoyIsOn = true
        play()
    }, 3000);
}

// ********************************************** scripts

for (let button of buttonSS) {
    button.addEventListener("mousedown", () => {
        button.style.boxShadow = "0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 0 #CECFD1, inset 0 0 4px 4px #CECFD1"
    })
    button.addEventListener("mouseup", () => {
        button.style.boxShadow = "0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 0 #CECFD1, inset 0 0 2px 2px #CECFD1"
    })
}


buttonStart.addEventListener("mousedown", () => {
    if (gameBoyIsOn == false) {
        startGameboy()
    } else {
        stopGameboy()
    }
})




scoreHtml.innerHTML = score

function play() {
    if (firstOn == false) {
        canvas = document.querySelector("canvas");
        ctx = canvas.getContext("2d");

        document.addEventListener("keydown", keyDownEvent);

        // render X times per second
        var x = 8;
        setInterval(draw, 1000 / x);
    }
};

// play()

// game world
var gridSize = (tileSize = 13); // 20 x 20 = 400
var nextX = (nextY = 0);

// snake
var defaultTailSize = 3;
var tailSize = defaultTailSize;
var snakeTrail = [];
var snakeX = (snakeY = 10);

// apple
var appleX = (appleY = 12);

function showScore(score) {
    for (let a of scoreHtml) {
        a.innerHTML = score
    }
}
showScore(score)

// draw
function draw() {

    if (biteBool == false) {
        // move snake in next pos
        snakeX += nextX;
        snakeY += nextY;

        // snake over game world?
        if (snakeX < 0) {
            snakeX = gridSize - 1;
        }
        if (snakeX > gridSize - 1) {
            snakeX = 0;
        }

        if (snakeY < 0) {
            snakeY = gridSize - 1;
        }
        if (snakeY > gridSize - 1) {
            snakeY = 0;

        }
    }

    //snake bite apple?
    if (snakeX == appleX && snakeY == appleY) {
        tailSize++;
        score++;
        showScore(score)


        appleX = Math.floor(Math.random() * gridSize);
        appleY = Math.floor(Math.random() * gridSize);
    }

    //paint background
    ctx.fillStyle = "#829781";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // paint snake
    if (biteBool == false) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    } else {
        ctx.fillStyle = "#829781";
    }

    for (var i = 0; i < snakeTrail.length; i++) {
        ctx.fillRect(
            snakeTrail[i].x * tileSize,
            snakeTrail[i].y * tileSize,
            tileSize,
            tileSize
        );

        //snake bites
        if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY && snakeX != 10) {
            tailSize = defaultTailSize;
            showScore(score)
            gameHover.style.opacity = ".6"
            biteBool = true
            snakeX = (snakeY = 10);
            appleX = (appleY = 12);

            setTimeout(() => {
                score = 0;
                showScore(score)
                gameHover.style.opacity = "0"
                biteBool = false
            }, 3000);
        }
    }

    // paint apple

    if (biteBool == false) {
        ctx.fillStyle = "rgba(255, 0, 0, 0.507)";
    } else {
        ctx.fillStyle = "#829781";
    }
    ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);

    //set snake trail
    snakeTrail.push({
        x: snakeX,
        y: snakeY
    });
    while (snakeTrail.length > tailSize) {
        snakeTrail.shift();
    }
}

// input
function keyDownEvent(e) {
    switch (e.keyCode) {
        // left
        case 37:
            keyLeftDown()
            nextX = -1;
            nextY = 0;
            break;
            // top
        case 38:
            keyTopDown()
            nextX = 0;
            nextY = -1;
            break;
            // right 
        case 39:
            keyRightDown()
            nextX = 1;
            nextY = 0;
            break;
            // bottom
        case 40:
            keyBottomDown()
            nextX = 0;
            nextY = 1;
            break;
    }
}