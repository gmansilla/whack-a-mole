var game = {
	time: 10,
	endEasy: 10,
	endMedium: 20,
	endHard: 30,
	speedEasy: 1000,
	speedMedium: 500,
	speedHard: 250,
	startTime: 0
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
        //game.startTime = start.getTime();
        if(newTimer == null) {
            newTimer = jQuery.timer(0, function(timer) {
                    handleMoles();
                    timer.reset(Math.floor(Math.random() * 3000));
                });
        }
    });
});

//hides/shows
function handleMoles() {
    var moles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var index = Math.floor((Math.random() * 10) + 1);
    if ($("#mole" + index).hasClass("hide")) {
        //showMole($(".mole")[index], 500);
        showMole($("#mole" + index), 1000);
        //showMole($("#mole2"), 1000);
    }

    //resetMoles();
}

function showMole(mole, speed) {
    var now = new Date();
    var currentTime = now.getTime();
    $(mole).removeClass("hide");
    $(mole).show("slide", { direction: "down" }, speed);
    creationTime[$(mole).attr('id')] = currentTime;
    console.log("showing");
}

function hideMole(mole, speed) {
	$(mole).hide("slide", { direction: "down" }, speed);
    $(mole).addClass("hide");
    creationTime[$(mole).attr('id')] = 0;
}

function stopGame() {

}

function isGameOver() {
	var now = new Date();
	var currentTime = now.getTime();
	var elapsedTime = currentTime - game.startTime;

	if (elapsedTime > game.time * 1000) {
		return true;
	}
	return false;
}

/*
* Looks for shown moles and hide them if they need to be hidden
*/
function resetMoles() {
    $(".mole").each(function(){
        if (!$(this).hasClass("hide")) {
            var now = new Date();
            var currentTime = now.getTime();
            var elapsedTime = currentTime - creationTime[$(this).attr('id')];
            console.log(elapsedTime/1000);
            if (elapsedTime > 1000) {
                hideMole(this);
            }
        }

    });
}

