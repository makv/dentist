$(document).ready(function() {
	$('.simpleSlideShow').slideShow({
	interval: 2
	});
	
$('ul.sf-menu').superfish();				

// setup ul.tabs to work as tabs for each div directly under div.panes       
// $("ul.tabs").tabs("div.panes > div", { history: true });

});
