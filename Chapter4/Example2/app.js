function addNewComment() {
	//console.log("Hello World!");
	
	var comment_text = $(".comment-input input").val();
	var $new_comment;
	
	if(comment_text !== "") {
		$new_comment = $("<p>").text(comment_text);
		$(".comments").append($new_comment);
		$(".comment-input input").val("");
	}
}

var main = function () {
	"use strict";
	
	$(".comment-input button").on("click", function (event) {
		addNewComment();
	});
	
	$(".comment-input input").on("keypress", function (event) {
		//console.log("keyCode: " + event.keyCode);
		if(event.keyCode === 13) {
			//console.log("Enter!");
			addNewComment();
		}
	});
};

$(document).ready(main);
