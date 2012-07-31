
//
//	Vertically center the wrapper
//


function center(){
	var content = $('#outerWrapper');
	
	content.css('position', 'relative');
	content.css('top', ($(window).height()-content.height())/2 + "px");
}
		
//
//	Center initially and ensure we stay that way
//
		
function centerVertically(){

	center();

	$(window).bind('resize', function(){
		center();
	});
}
