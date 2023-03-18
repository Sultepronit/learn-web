var main = function () {
	"use strict";
	
	$(".comment-input button").on("click", function (event) {
		//console.log("Hello World!");
		//$(".comments").append("<p>this is a new comment</p>");
		
		var $new_comment = $("<p>");
		//$new_comment.text("this is a new comment!");
		
		var comment_text = $(".comment-input input").val();
		$new_comment.text(comment_text);
		
		$(".comments").append($new_comment);
		
		
	});
};

$(document).ready(main);
