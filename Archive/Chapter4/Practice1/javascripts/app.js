var main = function () {
	"use strict";
	$("button").on("click", function () {
		$("header p").text("You clicked!");
	});
	$("button").on("dblclick", function () {
		$("header p").text("you double-clicked!");
	});
};

$(document).ready(main);
