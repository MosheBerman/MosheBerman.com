//
//	Load apps from the iTunes Search API.
//

function loadApps(data) {

	showLoadingIndicator("#loadingApps");
	data = data["results"];

	for(var i = 0; i <data.length; i++){
		
		var item = data[i];
		
		if (item.kind === "mac-software")
		{
			continue;
		}

		/* Set up the properties */	
		var app = new Object();
		app.title = item.trackCensoredName;
		app.link = item.trackViewUrl;
		app.description = item.description;
		app.image = item.artworkUrl512;

		addItemToList(app, "#appList");
	}

	removeLoadingIndicator("#loadingApps"); 	 			
}

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
	var image;
	
	//	If the item has a title property
	if(item["title"]){
		title = item["title"].trim();
	}
	
	//Otherwise, check for a name property
	
	if(item["name"]){
		title = item["name"].trim();
	}
	
	if(title == "Bitachon.org" || (title == "Nippon" && list == "#repoList")){
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

	if(item['image']){
		image = item['image'];
	}
	
	if(list == "#appList"){
		$(list).append('<li class="row"><a href="'+link+'"><img src="'+image+'" data-rjs="'+image+'" class="icon" /><span class="label">' + title + '</span></a></li>');
	}else{
		$(list).append('<li class="row"><a href="'+link+'"><span class="label">' + title + '</span></a></li>');
	}
	
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
//	Display a given loading indicator
//

function showLoadingIndicator(indicator){
	$(indicator).css("display", "block");
}

//
//	Expand the height of the views as necessary, to show the columns
//
//	Values used here are magic numbers.
//

function expandColumns(){
	$(".column").animate({'height': '347px'}, 300);
	$("#outerWrapper").animate({'height':'640px'},300, function(){center();});
}