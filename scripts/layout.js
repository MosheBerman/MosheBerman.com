/**
*	Includes some code to determine if we're on a small display or not.
*/

var isSmallScreen = $(window).width() < 768;
var isLandscape = $(window).width() > $(window).height();
var isPortrait = !isLandscape;

/**
*
*/
function handleLayout() 
{
	loadBanners();
	console.log("Layout");
}