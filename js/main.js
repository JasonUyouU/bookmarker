document.getElementById('formButton').addEventListener('click', saveBookmark);
document.getElementById('body').addEventListener('keydown', function(e) {
	if(e.keyCode == 13 || e.which == 13) {
		saveBookmark();
	}
});

function saveBookmark() {
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!validateForm(siteName, siteUrl)) {
		return false;
	}

	var bookmark = {
		name: siteName,
		url: siteUrl
	};

	//Test if bookmarks is null
	if (localStorage.getItem('bookmarks') === null) {
		//Init array
		var bookmarks = [];
		//Add to bookmarks array
		bookmarks.push(bookmark);
		//Set to Local Storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		//Get bookmarks from Local Storage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add bookmark to array
		bookmarks.push(bookmark);
		//Re-set back to Local Storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//Clear form
	document.getElementById('myForm').reset();
	
	//Re-fetch bookmarks from Local Storage
	getBookmarks();
};

//Delete bookmark
function deleteBookmark(url) {
	//Get bookmarks from Local Storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//Loop through bookmarks
	for(i = 0; i < bookmarks.length; i++) {
		if(bookmarks[i].url == url) {
			//Remove from array
			bookmarks.splice(i, 1);
		}
	}
	//Re-set back to Local Storage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));		
	//Re-fetch bookmarks from Local Storage
	getBookmarks();
}

function getBookmarks() {
	//Get bookmarks from Local Storage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//Get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	//Build output
	bookmarksResults.innerHTML = '';
	for(i = 0; i < bookmarks.length; i++) {
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;
		var nameUp = name.toUpperCase();

		bookmarksResults.innerHTML += '<div>' + 
									  '<h3>' +nameUp+
									  '<a class="btn btn-default ml-3" target="_blank" href="'+url+'">Visit</a>' +
									  '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger">Delete</a>' +
									  '</h3>' +
									  '</div>';
	}
}

function validateForm(siteName, siteUrl) {
	if(!siteName || !siteUrl) {
		alert('Fill in the form');
		return false;
	}

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)) {
		alert('Please use a valid URL');
		return false;
	}

	return true;
}