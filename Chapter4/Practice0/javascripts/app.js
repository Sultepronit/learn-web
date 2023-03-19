var main = function () {
	"use strict";
	
	console.log("Hello!");
	
	var $newUL = $("<ul>");
	
	var $newListItem = $("<li>").text("first element");
	$newUL.append($newListItem);
	$newUL.append($("<li>").text("second element"));
	$newUL.append($("<li>").text("third element"));
	
	$("main").append($newUL);
	$newUL.append($("<li>").text("fourth element"));
	
	var $newHeader = $("<h1>").text("Header");
	var $newParagraph = $("<p>").text("Hello there!");
	
	const func = () => {
		console.log("3s");
		
		$("main").prepend($newHeader);
		
		$newParagraph.appendTo($("footer"));
	};
	setTimeout(func, 3 * 1000);
};

$(document).ready(main);
