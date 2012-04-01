$(document).ready(function () {

    $("a[rel^='prettyPhoto[homegallery]']").prettyPhoto();
    $('.simpleSlideShow').slideShow({
        interval:3
    });
    $("#first-paragraph a[title]").tooltip({ position:"center right", effect:"fade" });
    $('ul.sf-menu').superfish();
    $('#ajaxloader')
        .hide()// hide it initially
        .ajaxStart(function () {
            $(this).show();
        })
        .ajaxStop(function () {
            $(this).hide();
        });
    toTop();
});

function toTop () {
    $(function() {
        $(window).scroll(function() {
            if($(this).scrollTop() != 0) {
                $('#toTop').fadeIn();   
            } else {
                $('#toTop').fadeOut();
            }
        });
     
        $('#toTop').click(function() {
            $('body,html').animate({scrollTop:0},800);
        }); 
    });
}