var main = function () {
	"use strict";
	
	$(".comment-input button").on("click", function (event) {
		//console.log("Hello World!");
		
		var comment_text = $(".comment-input input").val();
		var $new_comment;
		
		if(comment_text !== "") {
			$new_comment = $("<p>").text(comment_text);
			$(".comments").append($new_comment);
		}
		
		
	});
};

$(document).ready(main);
