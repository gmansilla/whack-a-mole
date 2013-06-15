$(document).ready(function() {



});

function showMole(mole, level) {
    $(mole).show("slide", { direction: "down" }, level);

}

function hideMole(mole, level) {
    $(mole).hide("slide", { direction: "down" }, level);
}