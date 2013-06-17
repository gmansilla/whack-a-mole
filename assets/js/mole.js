var game = {
	time: 10,
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
    $(".startButton").click(function() {
        initializeBoard();
        $(".mole").each(function(){
            $(this).click(function() {
                $("#sound-hit")[0].play();
                $("#sound-hit")[0].currentTime = 0;
                game.score++;
                hideMole($(this), 100);
                $("#score").text("Current Score: " + game.score);
            });
        });

        if(newTimer == null) {
            newTimer = jQuery.timer(0, function(timer) {
                    var currentTime = new Date();
                    game.currentTime = currentTime.getTime();
                    var elapsedTime = (game.currentTime - game.startTime) / 1000 ;
                    if (elapsedTime < game.time) { //game is not over
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
                    }
                });
        }
    });
});

//hides/shows
function handleMoles() {
    var index = Math.floor((Math.random() * 10) + 1);
    showMole($("#mole" + index), 900);
    resetMoles(true);
}

function showMole(mole, speed) {
    var now = new Date();
    var currentTime = now.getTime();
    $(mole).removeClass("hide");
    $(mole).show("slide", { direction: "down" }, speed);
    creationTime[$(mole).attr('id')] = currentTime;
    game.molesShown++;
}

function hideMole(mole, speed) {
	$(mole).hide("slide", { direction: "down" }, speed);
    creationTime[$(mole).attr('id')] = 0;
}

/*
* Looks for shown moles and hide them if they need to be hidden
*/
function resetMoles(useWait) {
    $(".mole").each(function(){
        if (!$(this).hasClass("hide")) {
            if (useWait) {
                var now = new Date();
                var currentTime = now.getTime();
                var elapsedTime = currentTime - creationTime[$(this).attr('id')];
                if (elapsedTime > 1100) {
                    hideMole(this, 800);
                }
            } else {
                hideMole(this, 100);
                $(this).unbind('click');
            }
        }
    });
}

function initializeBoard() {
    var start = new Date();
    game.startTime = start.getTime();
    game.score = 0;
    $("#sound-background")[0].play();
    $("#sound-background")[0].volume = 0.5;
    $("#score").text("Current Score: 0");
}