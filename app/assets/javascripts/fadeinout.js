$(function () {
// OPACITY SET TO 50%
    $(".faded").css("opacity", "0.5");

// ON MOUSE OVER
    $(".faded").hover(function () {

// SET OPACITY TO 100%
            $(this).stop().animate({
                opacity:1.0
            }, "slow");
        },

// ON MOUSE OUT
        function () {

// SET OPACITY BACK TO 50%
            $(this).stop().animate({
                opacity:0.5
            }, "slow");
        });
});
