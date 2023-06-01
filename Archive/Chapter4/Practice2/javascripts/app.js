var main = function () {
	"use strict";
	
	var $content = $("<div>Hello world!</div>").hide();
	var $moreContent = $("<div>").text("Goodbye World!").hide();
	
	/*$("body").append($content);
	$content.slideDown(2000);
	
	$("body").append($moreContent);
	$moreContent.fadeIn();*/
	
	$("body").append($content);
	$content.slideDown(2000, function () {
			$("body").append($moreContent);
			$moreContent.fadeIn();
	});
};

$(document).ready(main);
