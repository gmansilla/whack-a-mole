var game = {
	time: 20,
    objective: 30,
	startTime: 0,
    currentTime: 0,
    score: 0,
    molesShown: 0
};
var creationTime = {
    mole1: 0,
    mole2: 0,
    mole3: 0,
    mole4: 0,
    mole5: 0,
    mole6: 0,
    mole7: 0,
    mole8: 0,
    mole9: 0,
    mole10: 0
}
var newTimer;
$(document).ready(function() {
    $("#score-board").hide();
    $("#controls").show();
    $("#showBoard").click(function() {
        $("#welcome").hide("slide", { direction: "down" }, 100);
        $("#wrap").show();
    });

    $(".mole").click(function(){
        game.score++;
        $("#sound-hit")[0].play();
        hideMole($(this), 100);
        $("#counterHits").flipCounter("setNumber", game.score);
        $("#sound-hit")[0].currentTime = 0;
    });

    $(".startButton").click(function() {
        initializeBoard();
        if(newTimer == null) {
            newTimer = jQuery.timer(0, function(timer) {
                    var currentTime = new Date();
                    game.currentTime = currentTime.getTime();
                    var elapsedTime = (game.currentTime - game.startTime) / 1000 ;
                    if (elapsedTime < game.time) { //game is not over
                        $("#counterTime").flipCounter("setNumber", game.time - elapsedTime);
                        handleMoles();
                        timer.reset(Math.floor(Math.random() * 1000));
                    } else {
                        if(newTimer != null) {
                            newTimer.stop();
                        }
                        newTimer = null;
                        $("#sound-background")[0].currentTime = 0;
                        $("#sound-background")[0].pause();
                        resetMoles(false);
                        $("#counterTime").flipCounter("setNumber", 0);
                    }
                });
        }
    });


});

/**
 * Shows a mole in a random position.
 * Then calls to resetMoles function in order to hide some moles.
 */
function handleMoles() {
    var index = Math.floor((Math.random() * 10) + 1);
    showMole($("#mole" + index), 500);
    resetMoles(true);
}

/**
 * Shows a mole at a given speed
 * @param mole to be shown
 * @param speed to be used in the animation
 */
function showMole(mole, speed) {
    var now = new Date();
    var currentTime = now.getTime();
    if (creationTime[$(mole).attr('id')] == 0) {
        $(mole).show("slide", { direction: "down" }, speed);
        creationTime[$(mole).attr('id')] = currentTime;
        game.molesShown++;
    }
}

/**
 * Hides a mole at a given speed
 * @param mole to be hidden
 * @param speed to be used in the animation
 */
function hideMole(mole, speed) {
	$(mole).hide("slide", { direction: "down" }, speed);
    creationTime[$(mole).attr('id')] = 0;
}

/**
 * Handles the hiding of moles. A mole will be hidden if they have been shown for more than 1400 milliseconds.
 * when useWait param is true, we hide all moles and reset the game.
 * @param useWait
 */
function resetMoles(useWait) {
    $(".mole").each(function(){
        if (!$(this).hasClass("hide")) {
            if (useWait) {
                var now = new Date();
                var currentTime = now.getTime();
                var elapsedTime = currentTime - creationTime[$(this).attr('id')];
                if (elapsedTime > 1400) {
                    hideMole(this, 500);
                }
            } else { //reset game
                hideMole(this, 100);
                $("#controls").show("slide", {direction: "right"}, 1000);
                $("p.stats").text(game.molesShown + " moles were shown, you hit on " + game.score);
                if (game.score >= game.objective) { //you win
                    $('#modalWinner').modal('show');
                    $("#sound-win")[0].play();
                } else {
                    $('#modalLooser').modal('show');
                    $("#sound-lose")[0].play();
                }
            }
        }
    });
}

/**
 * Handles the initialization of the board.
 * Sets counters to 0, set startTime to 0.
 */
function initializeBoard() {
    $("#score-board").show("slide", { direction: "right" }, 800);
    $("#controls").hide("slide", {direction: "left"}, 800);
    var start = new Date();
    game.startTime = start.getTime();
    game.score = 0;
    game.molesShown = 0;
    $("#sound-background")[0].play();
    $("#sound-background")[0].volume = 0.5;
    $(".counter").flipCounter({
        number:0, // the initial number the counter should display, overrides the hidden field
        numIntegralDigits:2, // number of places left of the decimal point to maintain
        digitHeight:40, // the height of each digit in the flipCounter-medium.png sprite image
        digitWidth:30, // the width of each digit in the flipCounter-medium.png sprite image
        imagePath:"assets/img/flipCounter-medium.png", // the path to the sprite image relative to your html document
        easing: false, // the easing function to apply to animations, you can override this with a jQuery.easing method
        duration:1000 // duration of animations
    });
    $(".counter").flipCounter("setNumber", 0);
}