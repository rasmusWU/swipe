var xStart;
var xEnd;
var yStart;
var yEnd;
var limit = 20;
var tolerance = 30;
// var stepX = 0;
// var stepY = 0;

var slider = document.querySelector(".slider");
var sliderArea = document.querySelector(".sliderArea");
var body = document.querySelector("body");

var moveMe = document.querySelectorAll(".moveMe");
var wrapper = document.querySelector(".wrapper");

moveMe.forEach(function(div) {
    div.addEventListener("touchstart", startTouch)
    div.addEventListener("touchend", endTouch);
});


function startTouch (event) {
    xStart = event.changedTouches[0].pageX;
    yStart = event.changedTouches[0].pageY;
}

function endTouch (event) {
    xEnd = event.changedTouches[0].pageX;
    yEnd = event.changedTouches[0].pageY;

    var stepX = parseInt(event.target.dataset.x);
    var stepY = parseInt(event.target.dataset.y);

    // Move on X-axis
    if ((xEnd + tolerance) < xStart &&
        yEnd < (yStart + limit) &&
        yEnd > (yStart - limit)) {
        stepX = stepX - 200;
        if (isOccupied(stepX, stepY)) return;
        if (stepX <= 0) stepX = 0;
        event.target.style.transform = `translate(${stepX}px, ${stepY}px)`;
        event.target.dataset.x = stepX;
    }
    if ((xEnd - tolerance) > xStart &&
        yEnd < (yStart + limit) &&
        yEnd > (yStart - limit)) {
        stepX = stepX + 200;
        if (isOccupied(stepX, stepY)) return;
        if (stepX >= 400) stepX = 400;
        event.target.style.transform = `translate(${stepX}px, ${stepY}px)`;
        event.target.dataset.x = stepX;
    }

    // Move on Y-axis
    if ((yEnd + tolerance) < yStart &&
        xEnd < (xStart + limit) &&
        xEnd > (xStart - limit)) {
        stepY = stepY - 200;
        if (isOccupied(stepX, stepY)) return;
        if (stepY <= 0) stepY = 0;
        event.target.style.transform = `translate(${stepX}px, ${stepY}px)`;
        event.target.dataset.y = stepY;
    }
    if ((yEnd - tolerance) > yStart &&
        xEnd < (xStart + limit) &&
        xEnd > (xStart - limit)) {
        stepY = stepY + 200;
        if (isOccupied(stepX, stepY)) return;
        if (stepY >= 400) stepY = 400;
        event.target.style.transform = `translate(${stepX}px, ${stepY}px)`;
        event.target.dataset.y = stepY;
    }
}

function isOccupied(x, y) {
    var toggle = false;

    moveMe.forEach(function(div) {
        if (div.dataset.x == x && div.dataset.y == y) {
            toggle = true;
        }
        
    });

    return toggle
}

// IIFE Immediately Invoked Function Expression

(function() {
    moveMe.forEach(function(div) {
        div.style.transform = `translate(${div.dataset.x}px, ${div.dataset.y}px)`
    })
})();

sliderArea.addEventListener("touchstart", function (event) {
    xStart = event.changedTouches[0].pageX;
    yStart = event.changedTouches[0].pageY;
});

sliderArea.addEventListener("touchend", function (event) {
    xEnd = event.changedTouches[0].pageX;
    yEnd = event.changedTouches[0].pageY;

    if ((xEnd + tolerance) < xStart &&
        yEnd < (yStart + limit) &&
        yEnd > (yStart - limit)) {
        slider.classList.remove("moved");
        moveMe.forEach(function(image) {
        image.classList.add("puzzle1");
        image.classList.remove("puzzle2");
        });
    }
    if ((xEnd - tolerance) > xStart &&
        yEnd < (yStart + limit) &&
        yEnd > (yStart - limit)) {
        slider.classList.add("moved");
        moveMe.forEach(function(image) {
        image.classList.remove("puzzle1");
        image.classList.add("puzzle2");
        });
    } else {
        slider.classList.remove("moved");
    }
});