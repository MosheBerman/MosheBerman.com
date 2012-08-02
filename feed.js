//
//	Load the blog feed and parse it into the list view
//

function loadFeedFromURL(rssurl){

	var articles = {};
	var articleID = 0;
	
		showLoadingIndicator("#loadingFeed");
	
	$.get(rssurl, function(data) {
	    
	    var $xml = $(data);
	    
   	 	$xml.find("item").each(function() {
    	    var $this = $(this),
        	    item = {
            	    title: $this.find("title").text(),
                	link: $this.find("link").text(),
                	description: $this.find("description").text(),
	                pubDate: $this.find("pubdate").text(),
    	            author: $this.find("creator").text()
        		}
        		
            articles[articleID] = item;
	        articleID++;	        
	        
	        //
	        //	Display the item
	        //	
	        
	       	addItemToList(item, "#feedList");
	        
    	});
    	
    	removeLoadingIndicator("#loadingFeed"); 	
	});
}

//
//	Load the git repos using github
//

function loadGitReposFromURL(url){

	showLoadingIndicator("#loadingGit");

	$.getJSON(url, null ,function(data){
	
		data = data.data;
		
		var size = data.length;
		
		$.each(data, function(){
		
			var item = $(this)[0];
			
			console.log(item);
			
	       	addItemToList(item, "#repoList");
	       	
		});
		
		removeLoadingIndicator("#loadingGit"); 	 			
	});
}

//
//	Add the item to the list as applicable
//

function addItemToList(item, list){
	var title;
	var link;
	
	//	If the item has a title property
	if(item["title"]){
		title = item["title"].trim();
	}
	
	//Otherwise, check for a name property
	
	if(item["name"]){
		title = item["name"].trim();
	}
	
	if(title == "Bitachon.org" || title == "Nippon"){
	 	return;
	}
	
	if(item["link"]){
		link = item["link"];
	}
	
	if(item["html_url"]){
		link = item["html_url"];
	}
	
	//
	//	Add a link to the list of links
	//
	
	$(list).append('<li class="row"><a href="'+link+'">' + title + '</a></li>');
}

//
//	Hide the loading indicator
//

function removeLoadingIndicator(indicator){
    	//
    	//	Fade out the loading indicator and fade in the list
    	//    	
    	
    	$(indicator).fadeOut(200, function(){
    		$(indicator).css("display", "none");
    	});   
}

//
//
//

function showLoadingIndicator(indicator){
	$(indicator).css("display", "block");
}