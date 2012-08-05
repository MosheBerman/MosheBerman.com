
//
//	Vertically center the wrapper
//


function center(){
	var content = $('#outerWrapper');
	
	content.css('position', 'relative');
	
	var center = ($(window).height()-content.height())/2;
	
	content.animate({'margin-top' : center}, 300, null);
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
