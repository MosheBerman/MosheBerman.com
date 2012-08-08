
			
//
//	The blog permalinks might redirect to the home page, so 
//	we need to check for them and redirect if this happened
//
					
function redirectIfReferrerIsBlogLink(){
	
	var referrer = document.location.toString();

	var isBlogLink = (referrer.indexOf("mosheberman.com/wordpress") != -1);
				
	if(isBlogLink){

		var postName = referrer;
					
		var pathComponents = referrer.split("/");
		
		var numberOfComponents = pathComponents.length;
		
		var postName = pathComponents[numberOfComponents-1];

		if(postName==""){
			postName = pathComponents[numberOfComponents-2];
		}
		
		document.location = "http://blog.mosheberman.com/" + postName;	
	}
}	
