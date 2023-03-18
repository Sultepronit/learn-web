var addNewComment = function () {
	
	var comment_text = $(".comment-input input").val();
	var $new_comment;
	
	if(comment_text !== "") {
		$new_comment = $("<p>").text(comment_text);
		$new_comment.hide();
		$(".comments").append($new_comment);
		$new_comment.fadeIn();
		$(".comment-input input").val("");
	}
};

var main = function () {
	"use strict";
	
	$(".comment-input button").on("click", function (event) {
		addNewComment();
	});
	
	$(".comment-input input").on("keypress", function (event) {
		if(event.keyCode === 13) {
			addNewComment();
		}
	});
};

$(document).ready(main);
