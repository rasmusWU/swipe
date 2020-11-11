var xStart;
var xEnd;
var yStart;
var yEnd;
var limit = 25;
var tolerance = 125;

var slider = document.querySelector(".slider");
var sliderArea = document.querySelector(".sliderArea");
var body = document.querySelector("body");

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
        body.classList.remove("lightMode");
        body.classList.add("darkMode");
    }
    if ((xEnd - tolerance) > xStart &&
        yEnd < (yStart + limit) &&
        yEnd > (yStart - limit)) {
        slider.classList.add("moved");
        body.classList.remove("darkMode");
        body.classList.add("lightMode");
    } else {
        slider.classList.remove("moved");
    }
});