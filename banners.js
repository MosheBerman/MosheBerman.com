/* Banner timer reference */
var bannerTimer = null;

/* Banner class */
function Banner(href, src, title){

	return {
		href: href,
		src: src,
		title: title
	};

}

function loadBanners(){
	
	var omer = Banner("http://itunes.com/apps/sefira", "./images/ultimateomer.png", "Ultimate Omer");
	var zmanim = Banner("http://itunes.com/apps/zmanim", "./images/zmanim.png", "Zmanim");	
	var nippon = Banner("http://itunes.com/apps/nippon", "./images/nippon.png", "Nippon");	
	
	//
	//	Load the banners into an array
	//
	
	var banners = [omer, nippon, zmanim];
	
	//
	//	Precache some elements
	//	
	
	var bannerContainer = document.getElementById("innerBanner");
	var dotContainer = document.getElementById("buttonWrapper");
	var dots = document.getElementsByClassName("dot");

	//
	//	
	//
	
	var size = (banners.size * 960) + "px";
	$("innerBanner").css("width", size);
	
}

function scrollBanner(){

	//
	//	After 5 seconds, scroll
	//
	
	bannerTimer = setTimeout(function(){
		
		var banner = $("#innerBanner");
		var wrapper = $("#bannerWrapper");
		
		var left = parseInt(banner.css("margin-left"));
		var wrapperWidth = parseInt(wrapper.css("width"));
		var bannerWidth = parseInt(banner.css("width"));
		
		//
		//	Calculate the new position and reset to the first slide if necessary
		//
		
		var newLeft = left - wrapperWidth;

		if(newLeft < -(bannerWidth - wrapperWidth)){
			newLeft = 0;
		}

		/*  */
		
		var index = (-newLeft)/wrapperWidth;
			
		scrollToIndex(index);
	
		clearTimeout(bannerTimer);	
		scrollBanner();	
			
	}, 5000);
}

//
//	Scroll to banner at a given index
//

function  scrollToIndex(index){

		var banner = $("#innerBanner");
		var wrapper = $("#bannerWrapper");
		
		var left = parseInt(banner.css("margin-left"));
		var wrapperWidth = parseInt(wrapper.css("width"));
		var bannerWidth = parseInt(banner.css("width"));
		
		//
		//	Calculate the new position and reset to the first slide if necessary
		//
		
		var newLeft = -(wrapperWidth * index);
		
		//
		//	Perform the animation
		//
		
		banner.animate({'margin-left': newLeft}, 300, function(){
		
			//
			//	Select the correct dot
			//
			
			var dots = $('.dot');
			
			dots.removeClass('selectedDot');
			
			dots.eq(index).addClass('selectedDot');	
		});	
}

//
//
//

function configureBannerSelect(){
	$('.dot').click(function(){
		
		scrollToIndex($(this).index());
		
	});
}
