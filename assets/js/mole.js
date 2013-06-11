$(document).ready(function() {

    //$("#mole2").slideToggle();
    //$("#mole1").addClass("show-up");
    $("#hole2").hover(function(){
        console.log("fuck");
        $("#hole-mole2").slideToggle(124241);
    }, function(){
        $("#hole-mole2").slideToggle(12414212);
    });
});

function showMole(element) {
    var position = $(element).position();
    console.log(position.top);

}

function hideMole() {

}