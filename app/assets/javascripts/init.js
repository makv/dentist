$(document).ready(function() {
	$('.simpleSlideShow').slideShow({
	interval: 3
	});
	
$('ul.sf-menu').superfish();				
$('#ajaxloader')
    .hide()  // hide it initially
    .ajaxStart(function() {
        $(this).show();
    })
    .ajaxStop(function() {
        $(this).hide();
    })
;
});
