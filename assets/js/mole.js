var game = {
	time: 10,
	endEasy: 10,
	endMedium: 20,
	endHard: 30,
	speedEasy: 1000,
	speedMedium: 500,
	speedHard: 250,
	startTime: 0,
    currentTime: 0,
    score: 0
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
        var start = new Date();
        game.startTime = start.getTime();
        game.score = 0;
        console.log("starting game");
        $(".mole").each(function(){
            $(this).click(function() {
                game.score++;
                hideMole($(this), 100);
            });
        });

        if(newTimer == null) {
            newTimer = jQuery.timer(0, function(timer) {
                    var currentTime = new Date();
                    game.currentTime = currentTime.getTime();
                    if ((game.currentTime - game.startTime) / 1000 < game.time) { //game in not over
                        handleMoles();
                        timer.reset(Math.floor(Math.random() * 1000));
                    } else {
                        if(newTimer != null) {
                            newTimer.stop();
                        }
                        newTimer = null;
                        console.log("game is over");
                        resetMoles(false);

                    }
                });
        }
    });
});

//hides/shows
function handleMoles() {
    var index = Math.floor((Math.random() * 10) + 1);
    showMole($("#mole" + index), 1000);
    resetMoles(true);
}

function showMole(mole, speed) {
    var now = new Date();
    var currentTime = now.getTime();
    $(mole).removeClass("hide");
    $(mole).show("slide", { direction: "down" }, speed);
    creationTime[$(mole).attr('id')] = currentTime;
}

function hideMole(mole, speed) {
	$(mole).hide("slide", { direction: "down" }, speed);
    creationTime[$(mole).attr('id')] = 0;
}

/*
* Looks for shown moles and hide them if they need to be hidden
*/
function resetMoles(useWait) {
    //console.log("resetting");
    $(".mole").each(function(){
        if (!$(this).hasClass("hide")) {
            if (useWait) {
                var now = new Date();
                var currentTime = now.getTime();
                var elapsedTime = currentTime - creationTime[$(this).attr('id')];
                if (elapsedTime > 1300) {
                    hideMole(this, 1000);
                }
            } else {
                hideMole(this, 100);
            }
        }
    });
}