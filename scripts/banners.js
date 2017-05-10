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
	
	var omer = Banner("https://itunes.apple.com/us/app/ultimate-omer-2-the-sefira-app-you-can-count-on/id366802811?mt=8", "./images/banners/apps/ultimateomer.png", "Ultimate Omer");
	var zmanim = Banner("https://itunes.apple.com/us/app/ultimate-zmanim/id452921604?mt=8", "./images/banners/apps/ZmanimColor.png", "Ultimate Zmanim");		
	var gabbai = Banner("https://itunes.apple.com/us/app/gabbai-synagogue-display/id568239297?mt=8", "./images/banners/apps/gabbai.png", "Gabbai");

	//
	//	Load the banners into an array
	//
	
	var banners = [zmanim, omer, gabbai];

	//
	//	Precache some elements
	//	
	
	var bannerContainer = document.getElementById("innerBanner");
	var dotContainer = document.getElementById("buttonWrapper");
	var dots = document.getElementsByClassName("dot");

	//
	//	Remove old banners and dots.
	//

	while(bannerContainer.firstChild)
	{
		bannerContainer.removeChild(bannerContainer.firstChild);
	}

	while(dotContainer.firstChild)
	{
		dotContainer.removeChild(dotContainer.firstChild);
	}

	//
	//	Create new banners and dots.
	//

	banners.forEach(function(banner){
		
		var tag = createTagForBanner(banner);
		bannerContainer.appendChild(tag);

		var dot = dotElement(); 
		if(banners.indexOf(banner) == 0)
		{
			dot.id = "first";
		}
		else if (banners.indexOf(banner) == banners.length-1)
		{
			dot.id = "last";
		}
		else
		{
			dot.className += " middle";
		}

		dotContainer.appendChild(dot);

	});

	//	Grab the "real" dot nodes. See the link below for more.
	var numberOfDots = countTheKids(dotContainer);

	var sampleDotStyle = dotContainer.firstChild.style;
	var width = 14;
	var newWidth = numberOfDots * width;

	$(dotContainer).css("width", newWidth + "px");

	//
	//	Resize the banner scroller
	//

	var bannerViewportWidth = $("#innerBanner").width();
	var size = String(countTheKids(bannerContainer) * bannerViewportWidth) + "px";
	$(bannerContainer).css("width", size);
	$(bannerContainer.parent).css("height", "200px");
}

//
//
//

function scrollBanner()
{
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

//
//	Create a tag and return it
//

function createTagForBanner(banner){

	var bannerTag = document.createElement("div");
	bannerTag.className = "banner";

	var link = document.createElement("a");
	link.href = banner.href;
	link.className = "bannerLink";

	var bannerViewportWidth = $("#bannerWrapper").width();

	var image = document.createElement("img");
	image.src = bannerURLFromBanner(banner);
	image.height = 200;
	image.width = bannerViewportWidth;
	image.alt = banner.title;
	image.className = "bannerImage";
	image.setAttribute('data-rjs', 2); // For retina.js to know what our max image is

	link.appendChild(image);
	bannerTag.appendChild(link);

	return bannerTag;
}

//
//
//

function dotElement() {
	var dot = document.createElement("span");
	dot.className = " dot";
	return dot;
}

/**
 *	This wonderfully named function comes from this webpage:
 *
 *	http://blog.tegneblokken.net/2009/08/counting-childnodes-with-javascript-the-whitespace-incident/
 *
 *	Apparently the DOM is funny about whitespace.
 */
 function countTheKids(parent){
 	var realKids = 0;
 	var kids = parent.childNodes.length;
 	var i = 0;
 	while(i < kids){
 		if(parent.childNodes[i].nodeType != 3){
 			realKids++;
 		}
 		i++;
 	}
 	return realKids;
 }

/**
*
*/

function bannerURLFromBanner(banner) 
{
	var bannerURL = banner.src;

	if (isSmallScreen === true)
	{
		// bannerURL = mobileURLFromBanner(banner);
	}

	return bannerURL;
}

function mobileURLFromBanner(banner) 
{
	var modifier = isPortrait ? "portrait" : "landscape";
	modifier = "-"+modifier+".";
	var components = banner.src.split(".");
	var index = components.length - 1;
	components.splice(index, 0, modifier);
	components.splice(0, 0, ".");
	return components.join("");
}