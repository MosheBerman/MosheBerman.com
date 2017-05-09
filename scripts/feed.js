//
//	Load apps from the iTunes Search API.
//

function loadApps(data) {

	showLoadingIndicator("#loadingApps");
	data = data["results"];

	for(var i = 0; i <data.length; i++){
		
		var item = data[i];
		
		console.log(item);

		/* Set up the properties */	
		var app = new Object();
		app.title = item.trackCensoredName;
		app.link = item.trackViewUrl;
		app.description = item.description;
		app.bundleId = item.bundleId;

		if (item.kind === "mac-software")
		{
			app.platform = "macOS";
		}
		else 
		{
			app.platform = "iOS";
		}

		console.log(app)

		addItemToList(app, "#appList");
	}

	removeLoadingIndicator("#loadingApps"); 	 			
}

//
//	Load the blog feed and parse it into the list view
//

function loadBlog(posts){

	showLoadingIndicator("#loadingFeed");

	for (var i = posts.length - 1; i >= 0; i--) {
		var item = posts[i]

		var post = new Object();
		post.title = item.title;
		post.tags = item.tags;
		post.slug = item.url;

		addItemToList(post, "#feedList");
	};

	removeLoadingIndicator("#loadingFeed"); 
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
	
	else if(item["name"]){
		title = item["name"].trim();
	}
	
	if(title == "Bitachon.org" || (title == "Nippon" && list == "#repoList")){
		return;
	}
	
	if(item["link"]){
		link = item["link"];
	}
	else if (item["slug"])
	{
		link = "https://blog.mosheberman.com" + item["slug"];
	}
	
	if(item["html_url"]){
		link = item["html_url"];
	}
	
	//
	//	Add a link to the list of links
	//

	if(item['bundleId']){
		image = "https://mosheberman.com/images/icons/" + item['bundleId'] + ".jpg";
	}
	else 
	{
		image = "https://mosheberman.com/images/icons/icon.png";	
	}
	
	if(list == "#appList")
	{
		$(list).append('<li class="row"><a href="'+link+'"><img src="'+image+'" data-rjs="'+image+'" class="icon '+iconSelectorForPlatform(item['platform']) +'" /><span class="label">' + title + '</span></a></li>');
	}
	else 
	{
		$(list).append('<li class="row"><a href="'+link+'"><span class="label">' + title + '</span></a></li>');
	}
	
}

//
//
//

function iconSelectorForPlatform(platform){
	if (platform === "macOS")
	{
		return "icon-macos";
	}

	return "icon-ios";
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