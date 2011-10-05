$(document).ready(function() {
	$('.simpleSlideShow').slideShow({
	interval: 2
	});
				
$(".accordion").each(function(){

   $(this).find('.acc_container').hide();	//Hide/close all containers
   $(this).find('.acc_trigger:first').addClass('active').next().show();	 //Add "active" class to first trigger, then show/open the immediate next container

	//On Click
    
    $(this).find('.acc_trigger').click(function(){
		if( $(this).next().is(':hidden') ) { //If immediate next container is closed...
        $(this).parent().find('.acc_trigger').removeClass('active').next().slideUp(); //Remove all .acc_trigger classes and slide up the immediate next container
        $(this).toggleClass('active').next().slideDown(); //Add .acc_trigger class to clicked trigger and slide down the immediate next container
	}
    $(this).children("a:first").blur();	//remove the dotted box around the anchor
	return false; //Prevent the browser jump to the link anchor
	});
});


// setup ul.tabs to work as tabs for each div directly under div.panes       
$("ul.tabs").tabs("div.panes > div", { history: true });       
});
