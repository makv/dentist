$(document).ready(function() {
	//$.noConflict();
	$("a[rel^='prettyPhoto[homegallery]']").prettyPhoto();
	$('.simpleSlideShow').slideShow({
		interval: 3
		});
	$("#first-paragraph a[title]").tooltip();
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
